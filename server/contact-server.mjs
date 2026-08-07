import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

const port = Number(process.env.CONTACT_PORT || 3217);
const apiKey = process.env.RESEND_API_KEY || "";
const contactTo = process.env.CONTACT_TO || "liam@rephobia.com";
const contactFrom = process.env.CONTACT_FROM || "Liam Harte website <contact@rephobia.com>";
const allowedOrigins = new Set(
  (process.env.CONTACT_ALLOWED_ORIGINS || "https://liamharte.com,https://www.liamharte.com")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
);
const windowMs = 15 * 60 * 1000;
const maxRequests = 5;
const requestLog = new Map();

const json = (response, status, body) => {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff"
  });
  response.end(JSON.stringify(body));
};

const escapeHtml = (value) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;"
  })[character]);

const getIp = (request) =>
  String(request.headers["cf-connecting-ip"] || request.headers["x-forwarded-for"] || request.socket.remoteAddress || "unknown")
    .split(",")[0]
    .trim();

const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((time) => now - time < windowMs);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > maxRequests;
};

const readBody = (request) => new Promise((resolve, reject) => {
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
    if (body.length > 12_000) {
      reject(new Error("too_large"));
      request.destroy();
    }
  });
  request.on("end", () => resolve(body));
  request.on("error", reject);
});

const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const server = createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    return json(response, 200, { ok: true, emailConfigured: Boolean(apiKey) });
  }

  if (request.method !== "POST" || request.url !== "/api/contact") {
    return json(response, 404, { error: "Not found." });
  }

  const origin = request.headers.origin;
  if (origin && !allowedOrigins.has(origin)) {
    return json(response, 403, { error: "This request origin is not allowed." });
  }

  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return json(response, 429, { error: "Too many messages. Please wait before trying again." });
  }

  if (!String(request.headers["content-type"] || "").toLowerCase().startsWith("application/json")) {
    return json(response, 415, { error: "The message format is not supported." });
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(request));
  } catch (error) {
    const status = error.message === "too_large" ? 413 : 400;
    return json(response, status, { error: "The message could not be read." });
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim().toLowerCase();
  const message = String(payload.message || "").trim();
  const company = String(payload.company || "").trim();

  if (company) return json(response, 200, { ok: true });
  if (!payload.consent) return json(response, 400, { error: "Please confirm that Liam may respond to your enquiry." });
  if (name.length < 2 || name.length > 100) return json(response, 400, { error: "Please enter your name." });
  if (email.length > 200 || !validEmail(email)) return json(response, 400, { error: "Please enter a valid email address." });
  if (message.length < 20 || message.length > 4000) return json(response, 400, { error: "Please enter a message between 20 and 4,000 characters." });
  if (!apiKey) {
    console.error("contact_email_not_configured");
    return json(response, 503, { error: "Messaging is temporarily unavailable. Please use the booking link." });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  let resendResponse;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
        "idempotency-key": `liamharte-contact-${randomUUID()}`,
        "user-agent": "LiamHarte-Contact/1.0"
      },
      body: JSON.stringify({
        from: contactFrom,
        to: [contactTo],
        reply_to: email,
        subject: `Website enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<h1>Website enquiry</h1><p><strong>Name:</strong> ${safeName}<br><strong>Email:</strong> ${safeEmail}</p><p>${safeMessage}</p>`
      })
    });
  } catch {
    console.error("contact_email_network_failed");
    return json(response, 502, { error: "Your message could not be delivered. Please try again or use the booking link." });
  }

  if (!resendResponse.ok) {
    const providerStatus = resendResponse.status;
    console.error("contact_email_failed", { providerStatus });
    return json(response, 502, { error: "Your message could not be delivered. Please try again or use the booking link." });
  }

  console.info("contact_email_sent", { requestId: randomUUID() });
  return json(response, 200, { ok: true });
});

server.listen(port, "127.0.0.1", () => {
  console.info(`liamharte_contact_listening port=${port}`);
});
