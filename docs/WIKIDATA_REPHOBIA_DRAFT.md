# Wikidata draft: Rephobia Limited

**Prepared:** 16 August 2026
**Status:** Draft for Liam's review. **Nothing has been created on Wikidata.**

## Why the company and not the person

The competing entity `Q57416185` ("Liam Harte", described as *researcher ORCID
id 0000-0002-1121-6953*) is anchored by roughly nine authority-file identifiers:
ORCID (`P496`), VIAF (`P214`), ISNI (`P213`), Library of Congress (`P244`),
German National Library (`P227`), IdRef (`P269`), the Dutch national library
(`P1006`) and the National Library of Israel (`P8189`), plus date of birth and
employer. Those exist because he publishes books and libraries catalogue them.

A self-created personal item cannot out-anchor that, and would likely be
nominated for deletion as promotional. A deletion log is worse than no item.

Rephobia Limited is a different case: a registered company with a definite public
record and substantial independent coverage. It clears Wikidata's notability bar
on its own terms. Liam then enters the graph through `P112` (founder) - as the
founder of a notable company, rather than as a self-declared notable person.

## Conflict of interest

This is an item about Liam's own company, created by Liam. Wikimedia projects do
not forbid that, but they do expect it to be **disclosed**. Undisclosed
self-promotional editing is the single most common reason items like this get
deleted.

Put this in the edit summary on creation, and on the item's talk page:

> Disclosure: I am the founder of Rephobia Limited. Creating this item with a
> conflict of interest. All statements are sourced to Companies House and
> independent published coverage; please correct or challenge anything that does
> not meet Wikidata's standards.

## Staged plan - do NOT do it all at once

**Stage 1 (now):** create the Rephobia Limited item with the statements below,
**omitting `P112` founder**. Let it stand on the company's own merits.

**Stage 2 (after roughly 3-4 weeks, if Stage 1 is unchallenged):** create a
minimal `Liam Harte` person item and add `P112` on Rephobia pointing to it, plus
`P1889` (different from) → `Q57416185` to explicitly separate the two.

Doing both at once makes the whole thing look like a personal promotion vehicle
and puts the strong company item at risk alongside the weak personal one.

## Stage 1 - item statements

**Label (en):** `Rephobia Limited`
**Description (en):** `British virtual reality healthcare company`
**Aliases (en):** `Rephobia`

Every property and value QID below was verified against the live Wikidata API on
16 August 2026.

| Property | Value | Notes |
| --- | --- | --- |
| `P31` instance of | `Q4830453` (business) | Safe, standard. |
| `P1454` legal form | `Q6832945` (private company limited by shares) | **Not** `Q15646299` - that is the Czech legal form. |
| `P17` country | `Q145` (United Kingdom) | |
| `P159` headquarters location | `Q10686` (Belfast) | Registered office is in Belfast. |
| `P571` inception | `30 April 2024` | Companies House "Incorporated on". |
| `P2622` Companies House company ID | `NI715353` | The single strongest identifier available. |
| `P856` official website | `https://rephobia.com/` | |
| `P452` industry | `Q5276090` (digital health) | Optionally also `Q170519` (virtual reality). |
| `P112` founder | *omit in Stage 1* | See staged plan. |

Do not add a founder-as-string workaround. `P112` takes an item; leaving it out
is cleaner than faking it.

## References

Attach a reference to every statement. Use `P248` (stated in) where a Wikidata
item exists for the publisher, otherwise `P854` (reference URL) plus `P813`
(retrieved).

**For the company facts** (inception, company ID, legal form, headquarters):

- `P854` → `https://find-and-update.company-information.service.gov.uk/company/NI715353`
- `P813` → date of creation

**For notability**, cite the independent coverage. All 15 URLs were verified to
return 200 on 16 August 2026 and are listed in `PRESS_COVERAGE` in
`rephobia-site/src/lib/seo.ts`. The strongest three to lead with:

1. BBC News - `https://www.bbc.co.uk/news/articles/clyg9ew3q00o` (8 March 2026)
2. Unity Technologies - `https://unity.com/blog/rephobia-therapy-led-vr-technology-overcome-phobias` (19 September 2025). Note this is a **guest post authored by Liam**, so it is weaker evidence of independence - do not lead with it.
3. Silicon Republic - `https://www.siliconrepublic.com/start-ups/rephobia-phobias-therapy-vr-health` (2 June 2025)

Belfast Telegraph and Belfast News Letter are both usable and genuinely
independent. Belfast Telegraph is paywalled, which does not disqualify it.

## Procedure

1. Log in to Wikidata (or create an account) **as yourself**.
2. `Special:NewItem` - set label, description, alias as above.
3. Add statements one at a time, attaching the reference before saving.
4. Put the COI disclosure in the edit summary and on the talk page.
5. Do not create the personal item in the same session.

## Honest risk assessment

- A Wikidata item **does not guarantee a Google knowledge panel.** It is a strong
  input, not a switch.
- The item is public and community-editable. Others can amend, merge or nominate
  it for deletion. You do not control it the way you control liamharte.com.
- **Anonymous (logged-out) editing publishes your IP address publicly and
  permanently.** Do not create this while logged out.
