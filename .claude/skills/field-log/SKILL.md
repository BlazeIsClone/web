---
name: field-log
description: Draft, review, or refine field log posts for blaze64.dev (src/posts/<slug>/index.mdx). Encodes the site's voice, the banned-word list, heading rules, trade-off framing, E-E-A-T requirements, and the metadata.json schema. Use when writing a new post, turning raw notes or a debugging session into a post, reviewing a draft for tone, tightening prose that reads as machine-written, or checking a post before publishing.
---

# Field log writing

Posts live in `src/posts/<slug>/`: `index.mdx` (body), `metadata.json`, and that post's images, colocated. The directory name is the slug and the URL.

The voice is a developer talking to another developer over coffee. Not a conference talk. Not a tutorial site.

## Voice

Write like you're typing fast and you know the thing.

- **First person.** "I", "my", "me". This is a personal log.
- **Short paragraphs.** Mix one-sentence paragraphs with 2-3 sentence runs. Never a wall.
- **Incomplete sentences are fine.** "Wild." "Not great." Parentheticals welcome.
- **Punchy standalone lines.** "That's it." "This is the whole game."
- **Name specifics.** Real file names, real function names, real numbers, real error text. Specificity is the entire credibility mechanism.
- **Be direct about quality.** "Well-designed." "This is a mess." Make the judgment, don't circle it.
- **Have strong opinions.** A post with no position is a manpage.
- **Stay curious, not lecturing.** "What's interesting here is..." beats "It is important to understand...".
- **Subtle playfulness.** Some. Not a bit. Don't try too hard.
- **End with what to do.** Give the action.
- **Technical but not over-explained.** The reader is a competent developer.

## Never write these

**Em dashes.** Anywhere. Not in prose, not in `metadata.json` (a summary em dash shows up verbatim in the SERP), not in code comments. Use a comma, a period, a colon, parentheses, or `...`.

**AI vocabulary:** delve, crucial, robust, comprehensive, nuanced, multifaceted, furthermore, moreover, additionally, pivotal, landscape, tapestry, underscore, foster, showcase, intricate, vibrant, fundamental, significant, interplay.

**Banned phrases:** "here's the kicker", "here's the thing", "plot twist", "let me break this down", "the bottom line", "make no mistake", "can't stress this enough".

**Throat-clearing openers:** "In today's world", "When it comes to", "Let's dive in."

**The contrastive reversal:** "It's not X, it's Y." "This isn't about X. It's about Y." Occasionally earns its place. As a habit it's filler dressed up as insight.

**Epigrammatic clinchers.** Sections are allowed to just stop when the point is made. Not every one needs a closing line that lands a lesson.

**Rule-of-three lists** used for rhythm rather than because there are exactly three things.

Also: no arrow characters (→) in copy or link text. Standard capitalization in headings and copy, not all-lowercase. Route paths (`/logs`, `/whoami`, `/resume`) stay lowercase because they're literal paths.

## Headings

Headings carry the scanning load, for humans skimming and for AI systems pulling passages.

- **Sentence case.** Proper nouns and terms of art only.
- **Two to five words.** No colons, no questions, no trailing punctuation.
- **Say what the section delivers**, not what it covers. "Making repeat visits immediate" tells you the payoff. "Caching" doesn't.
- **Vary the shape.** Noun phrases and gerunds can mix. Don't force one mold.
- **No bare labels.** "Setup", "Implementation", "Conclusion", or a lone tool name waste the slot.
- **Start at `##`.** The title renders as the page `h1`, so opening at `###` skips a level.

The test: read only the headings, top to bottom. They should trace the arc of the post on their own. If they read as a topic list instead of a progression, rewrite them.

## Never fabricate experience

This is the hard rule, and it outranks every style rule above.

Do not invent lessons learned, near-misses, metrics, timelines, or epiphanies to give a post an arc. If a technical quirk is interesting, describe it as a property of the system. It becomes a lesson only if the author actually says they learned it.

"I tried this and it worked, nothing dramatic happened" is worth more than an invented near-disaster.

If a detail is uncertain, say so in the draft or ask. Don't write something plausible.

**Cite by linking.** When a post rests on a repo, a spec, a vendor doc, or a Stack Overflow answer, link it inline with descriptive anchor text. Naming a source without linking wastes the signal. "read more" or a bare URL wastes the anchor.

**Write to be useful, not to rank.** No padding to hit a length. A tight 400-word post that fully answers its question beats 1,200 words of scaffolding.

## Name the trade-offs

Every choice in the post cost something. Say what.

A post that lists only what a decision bought reads like a vendor page, and the reader can't do the one thing they came to do: work out whether the same call fits their situation. Naming the cost is also the strongest credibility signal in the post. Someone who only saw the upside hasn't run the thing.

- **State the exchange, not the verdict.** "Short-lived tokens in exchange for an extra round trip before every API call." The reader weighs it. `jwt-microservice-auth` and `ansible-cloud-config` both do this well, read them.
- **Say when it flips.** A trade-off is only real with the conditions attached. Cheap at one tab, expensive at real concurrency. Fine for a solo box, wrong for a team.
- **Keep the thing that didn't work.** The approach that got abandoned, the constraint that forced the design, the workaround still sitting in the code. That is the post. Cutting it for a cleaner narrative is the exact failure this rule exists to stop.
- **Flag the known-imperfect as known.** If something in the shipped code is wrong or fragile, name it in the present tense as a live cost, not as a lesson learned later. `jwt-microservice-auth` calls out a broken retry guard this way, without dressing it up as a catch.
- **Say when you don't know the cost.** "I haven't run this past a few hundred users, so I don't know where it falls over" is a real sentence. Silence reads as a claim.
- **Don't manufacture balance.** If the choice was obvious and cost nothing worth naming, say that and move on. Bolting an "on the other hand" onto every paragraph is padding, and inventing a downside is fabrication, same rule as above.

Trade-offs belong inline, at the decision. A "Trade-offs" section at the bottom is where they go to be skipped.

## Process

1. **Find the story.** What happened? What broke, what got built, what surprised you?
2. **Find the hook.** Open on the surprising result, the frustrating moment, or the bold claim. Not on context-setting.
3. **Structure for flow.** Problem, exploration, resolution or honest failure. That arc works, but it's not a mold. If the work had no tidy ending, don't manufacture one.
4. **Price every decision.** Walk the choices the post makes and check each one names what it cost. Anything that reads as pure upside is either under-reported or was never a decision.
5. **Cut.** Remove every sentence that adds neither information nor energy.
6. **Read it aloud in your head.** Stiff or robotic means rewrite.

If the input is too sparse to work with, ask one focused question: the "what happened" or the "so what". Not a questionnaire.

If handed a draft whose substance is good but tone is off, rewrite the style and preserve the technical content. Don't gut it.

## References

Load these when the task needs them, not upfront:

- `references/voice-examples.md` before drafting anything. Real openers from the corpus that work and ones that don't, with the reason. Voice is imitative, read it.
- `references/metadata.md` when writing or editing `metadata.json`. Field-by-field rules, character targets, and what each field actually feeds.
- `references/mdx.md` when the post has images or you're setting up the MDX body. `PostImage`, the priority rule, code blocks.
- `references/checklist.md` before delivering any post. Run it.
