# Liam Harte identity-search action register

**Started:** 7 August 2026
**Objective:** Help search systems distinguish Liam Harte, founder of Rephobia,
from other people with the same name and establish the strongest legitimate
conditions for a founder-focused exact-name result or knowledge feature.

Google controls rankings and search features. This programme cannot guarantee
that a scholar feature for another legitimate Liam Harte will disappear. The
measurable goal is a coherent, well-corroborated entity whose official site,
profiles and independent sources consistently identify the same person.

## Status vocabulary

- **Complete:** Implemented and verified.
- **In progress:** Work is currently authorised and underway.
- **Waiting:** Submitted to an external system and awaiting processing.
- **Needs Liam:** A factual choice, authentication step or send approval is
  required from Liam.
- **Recurring:** Must be reviewed on a schedule rather than completed once.

## A. Ownership, crawling and indexing

| ID | Priority | Action | Status | Evidence or next condition |
| --- | --- | --- | --- | --- |
| A01 | Critical | Own the website source and hosting | Complete | Public GitHub repository and VPS deployment are live. |
| A02 | Critical | Enforce one HTTPS canonical host | Complete | HTTP and `www` redirect to `https://liamharte.com/`. |
| A03 | Critical | Verify the Search Console domain property | Complete | Verified under `liamharte04@gmail.com`; Google confirmation email received. Keep the IONOS TXT record. |
| A04 | Critical | Submit the XML sitemap | Complete | `https://liamharte.com/sitemap.xml` submitted on 7 August 2026. |
| A05 | Critical | Request a homepage recrawl | Complete | Search Console says the homepage is indexed and accepted it into the priority crawl queue. |
| A06 | Critical | Request biography indexing | Complete | `/about/` was discovered but not indexed; priority crawl request accepted. |
| A07 | High | Confirm sitemap processing succeeds | Complete | Search Console reports `Success`; the expanded seven-page sitemap was resubmitted successfully after deployment. Recheck Google's discovered-page count on 14 August. |
| A08 | High | Confirm all identity pages are indexed | Waiting | Homepage and `/about/` priority requests were accepted. `/recognition/` returned a generic request error twice, so the successful sitemap is the active discovery route for all three new pages. |
| A09 | High | Confirm there are no manual actions or security issues | Complete | Search Console reports no manual actions and no security issues. |
| A10 | Medium | Review Core Web Vitals from field data | Waiting | New property currently has no collected field data. |
| A11 | Medium | Preserve Search Console ownership | Recurring | Keep the IONOS verification TXT record and `liamharte04@gmail.com` owner access in place. |

## B. First-party entity foundation

| ID | Priority | Action | Status | Evidence or next condition |
| --- | --- | --- | --- | --- |
| B01 | Critical | Make `Liam Harte` the homepage H1 | Complete | One homepage H1, placed in the hero. |
| B02 | Critical | Publish a separately indexable biography | Complete | `/about/` is live with one H1 and a canonical URL. |
| B03 | Critical | Publish stable `Person` and `ProfilePage` identifiers | Complete | JSON-LD uses a stable `https://liamharte.com/#person` identifier. |
| B04 | High | Expand the person graph with verified affiliations and profiles | Complete | One `#person` ID links Rephobia, QUB, LinkedIn, the new GitHub profile and verified subject coverage. |
| B05 | High | Add a substantial recognition and press page | Complete | `/recognition/` consolidates seven official sources without duplicating press copy. |
| B06 | High | Add a Rephobia founder page | Complete | `/rephobia-founder/` explains Liam's role, product boundaries and verified development evidence. |
| B07 | High | Add a speaking and programme-delivery page | Complete | `/speaking/` provides topics, formats, evidence and a stable organiser URL. |
| B08 | High | Add `BreadcrumbList` and page-level structured data | Complete | New pages include valid page, person, service or organisation graphs and breadcrumbs. |
| B09 | High | Expand internal navigation and contextual links | Complete | The homepage, biography, new pages and shared footers form a crawlable identity cluster. |
| B10 | High | Expand the sitemap and deployment checks | Complete | All seven canonical public pages are listed and the deployment workflow checks the three new pages. |
| B11 | Medium | Create a reusable short, medium and long official biography | Complete | Short and expanded copy is on `/recognition/`; the full narrative is on `/about/`. |
| B12 | Medium | Maintain a consistent primary portrait and image descriptions | Complete | Existing licensed site portraits are reused with specific alt text and image sitemap entries. |
| B13 | Medium | Publish meaningful updates under Liam's name | Recurring | Prefer evidence-led founder updates over thin keyword pages. |
| B14 | High | Publish a reciprocal founder entity graph on Rephobia | Complete | Rephobia's live Organization and `/who-we-are` ProfilePage schemas reuse `https://liamharte.com/#person` and link it to the controlled LinkedIn and GitHub profiles. Verified on Sites, apex and `www`. |
| B15 | High | Remove disputed personal-location signals until confirmed | Complete | Location-neutral titles, descriptions, biography copy, footers and Person schema replaced the conflicting Belfast claim. QUB and Rephobia's verified Belfast connections remain accurately described. |

## C. Independent evidence and backlinks

| ID | Priority | Action | Status | Evidence or next condition |
| --- | --- | --- | --- | --- |
| C01 | Critical | Preserve and cite Peter Jones Foundation recognition | Complete | Official 2025 National Entrepreneur of the Year article identified. |
| C02 | Critical | Preserve and cite Unity recognition | Complete | Official Unity article identifies Liam as founder of Rephobia. |
| C03 | Critical | Preserve and cite Queen's University Belfast coverage | Complete | InQUBate profile and School of EEECS news identified. |
| C04 | Critical | Preserve and cite Enterprise Ireland recognition | Complete | Official 2026 High Achieving Merit Award article identified. |
| C05 | High | Add Belfast Telegraph, Simply Business and ACT evidence | Complete | All three are linked from `/recognition/`; award facts are limited to the source record. |
| C06 | High | Ask key publishers to link to `liamharte.com` | Needs Liam | Seven targeted drafts, contacts and a send protocol are prepared in `IDENTITY_OUTREACH.md`; Liam must approve actual sending. |
| C07 | High | Ask future speaker and award pages to use the official URL | Recurring | Include the preferred bio and URL in every organiser pack. |
| C08 | Medium | Seek a small number of substantive founder interviews | Needs Liam | A Belfast Telegraph follow-up template is prepared, but it must wait for a concrete news hook and Liam's approval. |
| C09 | Medium | Ask Rephobia partners to identify Liam consistently | Needs Liam | Confirm which partner relationships may be described publicly. |
| C10 | Low | Avoid low-quality directories and paid link schemes | Recurring | No bulk profile creation, link exchanges or reputation manipulation. |

## D. Controlled profiles

| ID | Priority | Action | Status | Evidence or next condition |
| --- | --- | --- | --- | --- |
| D01 | Critical | Align Liam's LinkedIn headline and About section | Needs Liam | Search currently foregrounds Mercedes AMG HPP and Northampton. The owned site is now location-neutral; confirm the accurate current role and location before editing LinkedIn. |
| D02 | Critical | Set LinkedIn's website to `liamharte.com` | Complete | Personal contact information now lists `liamharte.com` as Personal while retaining `rephobia.com` as Company. Verified on 8 August 2026. |
| D03 | High | Align the Rephobia LinkedIn company page | Complete | Website corrected to `https://rephobia.com`, year to 2024 and type to `Privately Held`; verified in public member view on 8 August 2026. |
| D04 | High | Add an identity-led GitHub profile README | Complete | Created public profile repository `liamharte04/liamharte04` with official site, Rephobia, LinkedIn and recognition links. |
| D05 | Medium | Audit programme, university and speaker profiles | Complete | Findings, controllable fields, editorial dependencies and factual conflicts are recorded in `IDENTITY_PROFILE_AUDIT_2026-08-07.md`. |
| D06 | Medium | Keep portraits and biography wording consistent | Recurring | Use the official biography pack for future profiles. |
| D07 | Low | Do not create an ORCID or Scholar profile for SEO | Complete | These would blur the distinction from the academic entity. |
| D08 | Low | Do not create a self-promotional Wikipedia article | Complete | Reconsider only if independent notability supports uninvolved editorial coverage. |

## E. Knowledge feature and search monitoring

| ID | Priority | Action | Status | Evidence or next condition |
| --- | --- | --- | --- | --- |
| E01 | High | Capture an unpersonalised exact-name baseline | Complete | Dated exact-name, qualified-query and first-party baseline is recorded in `SEARCH_BASELINE_2026-08-07.md`. |
| E02 | High | Track branded query impressions and clicks | Waiting | Search Console needs time to collect performance data. |
| E03 | High | Check periodically for a claimable Liam Harte panel | Recurring | Claim only a panel that actually represents this Liam Harte. |
| E04 | High | Report genuine entity conflation | Recurring | Use Google feedback only when facts, images or links are assigned to the wrong person. |
| E05 | Medium | Track `Liam Harte Rephobia`, `Liam Harte entrepreneur` and `Liam Harte Belfast` | Recurring | Review monthly alongside the ambiguous exact-name query. |
| E06 | Medium | Record authoritative new coverage | Recurring | Add durable sources to the recognition page and structured data after verification. |
| E07 | Medium | Review this programme monthly for three months | Recurring | Checkpoints are recorded for 14 August, 7 September, 7 October and 7 November 2026. |

## Current factual blockers

1. Confirm whether Liam is currently based in Belfast, Northampton or another
   location, and how Mercedes AMG High Performance Powertrains should appear in
   the public biography.
2. Approve which messages in `IDENTITY_OUTREACH.md` may actually be sent.
3. Confirm any additional personally controlled public profiles that should be
   connected through `sameAs`.

GitHub's public profile README is complete. Updating the account-level bio and
website fields through the CLI additionally requires GitHub's `user` OAuth
scope. This is optional because the visible profile README now carries the
official identity links.

The reciprocal Rephobia identity link is complete. The live founder section now
links to `liamharte.com` and the controlled `liamharte04` LinkedIn profile. The
previous link to another person's same-name LinkedIn profile has been removed
from both public Rephobia hostnames.

## Supporting records

- [`SEARCH_BASELINE_2026-08-07.md`](SEARCH_BASELINE_2026-08-07.md)
- [`IDENTITY_PROFILE_AUDIT_2026-08-07.md`](IDENTITY_PROFILE_AUDIT_2026-08-07.md)
- [`IDENTITY_OUTREACH.md`](IDENTITY_OUTREACH.md)

## Measures of progress

- The homepage and biography show the new identity wording in Google's index.
- Every first-party identity page is indexed and canonical.
- Search Console records impressions for Liam's name and founder qualifiers.
- LinkedIn and other controlled profiles use the same entity-defining facts.
- Major independent sources link to either `liamharte.com` or Rephobia while
  identifying Liam by founder role.
- Google no longer conflates the founder with the academic in facts, images or
  links, regardless of whether the academic's legitimate Scholar feature remains.
