# Pre-ship checklist

Run this before delivering any post, drafted or reviewed. Check, don't assume.

## Voice

- [ ] Does the opening line make you want to keep reading? Or is it context-setting?
- [ ] Casual and energetic throughout, or does it drift formal partway down?
- [ ] Paragraphs short? One-sentence paragraphs mixed with 2-3 sentence runs?
- [ ] Any padding or throat-clearing to cut?
- [ ] Does it take a position, or does it just describe?
- [ ] Does it end with an action?

## Banned strings

Grep, don't eyeball:

```sh
grep -nE '—|→' src/posts/<slug>/index.mdx src/posts/<slug>/metadata.json
grep -niE 'delve|crucial|robust|comprehensive|nuanced|multifaceted|furthermore|moreover|additionally|pivotal|landscape|tapestry|underscore|foster|showcase|intricate|vibrant|fundamental|significant|interplay' src/posts/<slug>/index.mdx
grep -niE "here's the kicker|here's the thing|plot twist|let me break this down|the bottom line|make no mistake|can't stress this enough" src/posts/<slug>/index.mdx
```

- [ ] No em dashes or arrows, in the body or the metadata
- [ ] No AI vocabulary
- [ ] No banned phrases
- [ ] No "not X, it's Y" reversals
- [ ] No tacked-on closing epigrams

## Truth

- [ ] Every claim about what the author did, learned, or observed is actually true
- [ ] Nothing invented for narrative effect. No fabricated metrics, timelines, or near-misses
- [ ] Technical details accurate and precise
- [ ] Uncertain details flagged, not smoothed over
- [ ] Sources the post rests on are linked inline, with descriptive anchor text

## Trade-offs

- [ ] Every decision the post makes names what it cost, inline, at the decision
- [ ] Costs are stated as an exchange with conditions ("X for Y, until Z"), not a verdict
- [ ] Abandoned approaches, constraints, and live workarounds are still in the post, not trimmed for a cleaner arc
- [ ] Anything known to be fragile in the shipped code is named as a present cost, not as a lesson caught later
- [ ] Unknown costs are stated as unknown
- [ ] No manufactured balance, and no invented downside to look even-handed

## Headings

- [ ] Read top to bottom on their own, they trace the post's arc
- [ ] Sentence case, two to five words, no trailing punctuation
- [ ] No bare labels ("Setup", "Conclusion", a lone tool name)
- [ ] Start at `##`, no skipped levels

## metadata.json

- [ ] `title`, `publishedAt`, `summary` present
- [ ] `metaTitle` present and 50 to 60 characters. **Counted.**
- [ ] `summary` 120 to 160 characters. **Counted.** Not a restatement of the title, not a teaser
- [ ] `updatedAt` present only if the revision was substantive
- [ ] `draft: true` if the post isn't finished

Count them:

```sh
node -e 'const m=require("./src/posts/<slug>/metadata.json");for(const k of ["metaTitle","summary"])console.log(k,m[k]?.length)'
```

## Images

- [ ] Exactly the first `PostImage` has `priority`, every later one omits it
- [ ] Animated GIFs have `unoptimized`
- [ ] No hardcoded width/height
- [ ] Alt text describes the image, not the file

Check the priority rule across every post:

```sh
for f in src/posts/*/index.mdx; do
  grep -q '<PostImage' "$f" || continue
  first=$(grep -m1 '<PostImage' "$f")
  case "$first" in *priority*) ;; *) echo "MISSING priority: $f";; esac
  grep '<PostImage' "$f" | tail -n +2 | grep -q priority && echo "EXTRA priority: $f"
done
```
