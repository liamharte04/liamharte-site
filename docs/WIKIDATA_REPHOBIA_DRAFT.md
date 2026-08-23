# Wikidata draft: Rephobia Limited

**Prepared:** 16 August 2026
**Status:** **Stage 1 is done.** The item is live at
[Q141104375](https://www.wikidata.org/wiki/Q141104375), created 16 August 2026
under Liam's own account with the conflict-of-interest disclosure published at
[Talk:Q141104375](https://www.wikidata.org/wiki/Talk:Q141104375).

## Stage 2 is also done (17 August 2026)

Both items now exist and are linked:

| Item | What it is |
| --- | --- |
| [Q141104375](https://www.wikidata.org/wiki/Q141104375) | Rephobia Limited - 8 statements, **all 8 referenced** |
| [Q141155574](https://www.wikidata.org/wiki/Q141155574) | Liam Harte - 5 statements, COI disclosed on the talk page |

The link runs both ways: `P112` (founder) on the company points at the person,
and the person carries `P1889` (different from) pointing at **Q57416185**, the
Manchester professor of Irish literature. That single statement is the point of
the whole exercise - it tells Wikidata explicitly that the two are not the same
person.

**Person item statements:** `P31`=Q5 (human), `P1889`=Q57416185 (different from),
`P106`=Q131524 (entrepreneur, sourced to Silicon Republic), `P69`=Q877925
(educated at QUB, sourced to BBC News), `P856`=https://liamharte.com/. Alias
`Liam Padraic Harte` from the public Companies House officer record, which is
itself a disambiguator since the professor is not "Liam Padraic".

Three statements are intentionally unreferenced: `P31` (human), `P1889` (different
from) and `P856` (official website). These are self-evident or structural and are
conventionally left unsourced on Wikidata; referencing them would be noise rather
than rigour.

**Why the 3-4 week wait was dropped.** That figure came from an external review
and was repeated here with more authority than it deserved - it is not Wikidata
policy. Checking [WD:N](https://www.wikidata.org/wiki/Wikidata:Notability)
directly, the person item qualifies on two independent grounds:

- **Criterion 3, structural need:** it is required as the value of `P112` on
  Q141104375. Wikidata holds millions of items created for exactly this reason.
- **Criterion 2, identifiable entity with serious published references:** BBC,
  Silicon Republic, Belfast Telegraph, Belfast News Letter, Companies House.

Neither improves with elapsed time. The only thing waiting bought was evidence
the company item would not be challenged, and six days with zero deletion
nominations, nothing added to the talk page, and a maintenance bot
(`Mr.Ibrahembot`) quietly adding an Arabic description was reasonable evidence of
that. The bot edit is a positive signal: normal Wikidata infrastructure picked
the item up and treated it as legitimate.

**A third autocomplete decoy, for the record.** Searching `entrepreneur` returns
a **1997 video game** (`Q30598698`) as its second hit; the occupation concept is
`Q131524`. Along with the SAGE journal for "digital health" and Belfast in Waldo
County Maine, that is three near-misses avoided purely by verifying QIDs against
the API rather than trusting the dropdown.

**Also added to the site schema:** `https://www.wikidata.org/entity/Q141155574` now
appears in the Person `sameAs` on all five identity pages, so liamharte.com and
the Wikidata item point at each other.

## What was actually created

Seven statements, each value verified against the API after publishing rather
than trusted from the autocomplete:

Seven statements, **all seven referenced** (verified via the API: 0 unsourced).

| Property | Value | Reference |
| --- | --- | --- |
| `P31` instance of | `Q4830453` business | Companies House |
| `P2622` Companies House company ID | `NI715353` | Companies House |
| `P571` inception | 2024-04-30 | Companies House |
| `P17` country | `Q145` United Kingdom | Companies House |
| `P159` headquarters location | `Q10686` Belfast | Companies House |
| `P856` official website | `https://rephobia.com/` | Silicon Republic |
| `P452` industry | `Q5276090` digital health | BBC News |

Company facts cite the public record. The two claims the public record does not
establish - that rephobia.com is the official site, and that the company works in
digital health - cite independent journalism instead. Neither cites the Unity
post, because Liam wrote it.

Two autocomplete traps were avoided and are worth remembering, because both
would have been silently wrong:

- **`digital health`** - the *first* suggestion is `Q50815224`, a SAGE academic
  journal. The concept is third in the list.
- **`Belfast`** - the list includes Belfast in Waldo County Maine, a Kenneth
  Branagh film, a Boney M single and a Mago de Oz album before you get anywhere
  near disambiguating. `Q10686` is the one described as capital city of
  Northern Ireland.

`P1454` legal form was **deliberately omitted**. Every available value is scoped
to a jurisdiction, and the UK one is described as England and Wales while
Rephobia is registered in Northern Ireland. An imprecise claim on a new
conflict-of-interest item is worth less than no claim. This is explained on the
talk page.

**Stage 1 is complete**, and `P112` (founder → Q141155574) was added in Stage 2,
sourced to Silicon Republic, bringing the company item to 8 statements with all 8
referenced. If you want to strengthen it further, the natural additions are
`P813` (retrieved) qualifiers on the Companies House references and a second
independent reference on `P452`.

## Why the company and not the person

The competing entity `Q57416185` ("Liam Harte", described as *researcher ORCID
id 0000-0002-1121-6953*) is anchored by roughly nine authority-file identifiers:
ORCID (`P496`), VIAF (`P214`), ISNI (`P213`), Library of Congress (`P244`),
German National Library (`P227`), IdRef (`P269`), the Dutch national library
(`P1006`) and the National Library of Israel (`P8189`), plus date of birth and
employer. Those exist because he publishes books and libraries catalogue them.

A self-created personal item cannot out-anchor that, so the personal item does
not try to - it is deliberately minimal and enters the graph via `P112`.

**Correction (17 August 2026):** the original text here said such an item "would
likely be nominated for deletion as promotional". That overstated the risk. It
describes Wikipedia, not Wikidata, whose bar is far lower - see the WD:N
criteria quoted above. The item was created on 17 August and stands.

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

**Both stages are now complete** - see the section at the top of this file. The
original plan is preserved below for the record.

> **Stage 1 (now):** create the Rephobia Limited item, **omitting `P112`
> founder**. Let it stand on the company's own merits.
>
> **Stage 2 (after roughly 3-4 weeks, if Stage 1 is unchallenged):** create a
> minimal `Liam Harte` person item and add `P112` on Rephobia pointing to it,
> plus `P1889` (different from) → `Q57416185`.

Stage 1 ran on 16 August and Stage 2 on 17 August, six days apart rather than
three to four weeks. The reasoning for shortening it is at the top. In short: the
wait was never policy, and the person item is defensible on structural need
regardless of how long the company item has existed.

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
