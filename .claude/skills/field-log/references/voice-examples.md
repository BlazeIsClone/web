# Voice, by example

The 21 existing posts are not a uniform corpus. Roughly half are in the voice, half drifted into product-brochure or documentation register. "Match the existing posts" is bad advice on its own. Match *these* posts.

## The reference set

Read one of these before drafting. They are the target.

- `src/posts/init/` and `src/posts/a41sl-bot/` for the personal, fast-typed register
- `src/posts/wordpress-survival-guide/` for opening in scene
- `src/posts/building-on-premise-server/` for narrating a build with real numbers
- `src/posts/monitoring-system/` for a plain declarative open

## Openers that work

Cold open, in scene, no setup:

> Late 2023. One of my clients wakes up, checks their site… and to their surprise, it's redirecting to some random Japanese site. Google search results? Full of gibberish titles and hijacked meta descriptions. It's total chaos.

Sentence fragment for a date. A rhetorical question answered immediately. "It's total chaos" as its own judgment. Nothing explains what the post will cover, because the scene does it.

Motivation plus the number that made it real:

> I wanted to venture into Kubernetes, so I kicked off on Google Kubernetes Engine (GKE) and the 300 USD credits they give you as a head start.
>
> Well two months in I happen to run out of it all, naturally during the learning process I happened to abuse their node autoscaler with a multi region cluster but nonetheless It soon got me to realize how expensive it was to run even a couple node cluster with a little spec.

"300 USD" and "two months" carry the whole argument. A generic post says cloud costs add up. This one says how much and how fast.

Trailing off, then landing:

> I've had many attempts at creating my own website in the past, had many visions of what I wanted it to look like...
>
> Tried building websites before with all these fancy ideas... but a decade later, I finally thought to my self, "You know what, I'm just gonna make something that works."

This is where the `...` substitute for an em dash comes from. It's already the house style. Note the second paragraph opens with a bare verb, no subject. That's the "typing fast" register working.

A flat declarative that earns its place:

> Logs are our paper trail. When something goes wrong, we need them to be accessible and simple to search, they turn guesswork into evidence and speed resolution.

Seven words, then the payoff. No throat-clearing.

## Openers that don't

Product brochure. This is the most common failure in the corpus:

> Backup CLI is an interactive CLI tool for capturing database snapshots and application files, then securely transfers them to your local storage via SFTP. Perfect for developers looking for a lightweight, no-nonsense backup strategy.

Third person about your own tool. "Perfect for developers looking for" is landing page copy. Feature bullets titled "Zero Guesswork" belong on a pricing page. Nobody is in this post.

The 90-word corporate paragraph:

> Within our team software defect management felt like a chore, spending unnecessary time and effort wrangling shared spreadsheets for defect tracking, leading to missed critical defects and poor accountability.

Real problem, buried. "Software defect management felt like a chore" wants to be "Tracking bugs in a shared spreadsheet was miserable."

Encyclopedia voice:

> To understand distributed systems we need to move away from the "single computer" mindset and embracing that...

"We need to understand" is lecturing. No author in the sentence. `cloud-backup-pipeline`, `building-chamilion-2025`, and `ai-lead-capture-n8n` open the same way, with zero first-person markers in the entire post.

## There is no grep for this

Counting first-person markers looks like it should work. It doesn't.

| post | markers | words | verdict |
|---|---|---|---|
| `building-on-premise-server` | 23 | 787 | good voice |
| `a41sl-bot` | 10 | 306 | good voice |
| `init` | 6 | 86 | good voice |
| `wordpress-survival-guide` | 2 | 527 | good voice |
| `monitoring-system` | 0 | 309 | good voice |
| `distributed-architecture` | 0 | 478 | drifted |
| `cloud-backup-pipeline` | 0 | 155 | drifted |
| `backup-cli` | 0 | 134 | drifted |

`monitoring-system` opens with "Logs are our paper trail" and has zero "I" in it. `wordpress-survival-guide` has two across 527 words and is the best opener in the corpus. Meanwhile every drifted post also sits at zero. The metric separates nothing.

What actually separates them is register, and you have to read for it:

- **Is anyone home?** Not "does the word I appear", but does the text come from someone who was there. "One of my clients wakes up" has a person in it. "Uses AWS-compatible S3 storage to store application databases" does not.
- **Is it selling or reporting?** "Perfect for developers looking for a lightweight, no-nonsense backup strategy" is selling. "Two months in I happen to run out of it all" is reporting.
- **Is it explaining to a peer or to a beginner?** "To understand distributed systems we need to move away from the single computer mindset" is teaching a class. The log talks to someone who already knows what a distributed system is.

Read the first three sentences out loud. If they sound like a README, a landing page, or a textbook, rewrite them before going further. Everything downstream inherits the register of the opener.

## Trade-offs, by example

Framed, with the cost and the condition attached:

> That's a real trade-off worth naming: the access token never sits in JS-reachable memory or localStorage, which shrinks what an XSS payload could steal, at the cost of an extra round trip to the IDP before every API call.

The gain and the price are in one sentence, and the price is specific enough to argue with.

> Worth flagging as-is rather than as a mistake I caught later: the retry guard in that response interceptor (`let refresh = false`) is scoped inside the function, so it resets on every call [...] Small detail, but the kind of thing that matters more once there's real concurrent traffic instead of a single tab making one request at a time.

A live defect, named in the present tense, with the condition that makes it bite. No invented arc where the author heroically catches it.

> Unlike a [bare-metal homelab server](/logs/building-on-premise-server), a VPS trades hands-on hardware control for managed compute.

"Trades X for Y" against a named alternative. The reader can place themselves on either side of it.

> Spot Instances are there for workloads that can tolerate interruption in exchange for a steep discount.

The condition ("can tolerate interruption") is what makes this useful instead of a feature blurb.

Silently dropped, the failure mode:

> Backup CLI is an interactive CLI tool for capturing database snapshots and application files, then securely transfers them to your local storage via SFTP. Perfect for developers looking for a lightweight, no-nonsense backup strategy.

SFTP to local storage was a choice over an object store, and it cost something: a box you have to keep alive and back up yourself. The post doesn't say, so the reader can't tell whether it fits them. Pure upside reads as marketing even when the tool is good.
