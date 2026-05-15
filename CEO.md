# CEO.md — Master Context for Listing Glow Up AI

> **Claude Code: read this file first, every session, before doing anything else.**
> This is the operating brain of the business. If a request conflicts with this
> file, flag it. If something here is outdated, ask before proceeding.

---

## 1. THE MISSION

Get **Listing Glow Up AI** to **$10,000/month in revenue**, fastest path possible.
We do this by fixing the offer math first, building a free→paid funnel, then
driving cold traffic. No new products until this machine works.

**Primary goal this month:** Launch the 3-tier offer + free lead-magnet tool.

---

## 2. THE OPERATOR (who you work for)

- **Name:** JuJu (Julie Davis)
- **Location:** Alachua, FL
- **Background:** Sales — medical, automotive, real estate. Holds a real estate license.
- **Working style:** Fast-moving builder. Wants **direct, no-fluff guidance, ONE
  step at a time.** Do not dump 10-step plans. Give the next action, wait, confirm,
  continue.
- **Hates:** Bothering her personal network. Cold/automated traffic only.
- **Wants:** To make money quickly and efficiently. Treat every decision through
  the lens of "does this get us to $10k faster?"

---

## 3. THE PRODUCT

**Listing Glow Up AI™** — AI tools and prompts that help real estate agents
write better listings: descriptions, photo captions, open-house emails, social copy.

### The 3-Tier Offer
| Tier | Price | What it is | Role |
|------|-------|-----------|------|
| Free | $0 | Stripped-down AI tool — basic listing analysis / one quick win | Lead magnet — captures email, shows value |
| Core | $27 | The existing prompt guide (PDF + single-file HTML w/ copy buttons) | Tripwire — already built, live on Payhip |
| Pro | $127–197 | The guide PLUS a full working AI tool that does the optimization for them | **Main revenue driver** |

**The math:** At $27 alone, $10k = ~370 sales/mo (~12/day) — too steep cold.
With Pro at ~$150, $10k = ~70 sales/mo. That's the target math.

---

## 4. THE FUNNEL

```
Cold traffic (Facebook groups, organic, later ads)
        ↓
Free AI tool  →  captures email
        ↓
Upsell on results screen  →  Pro tool ($127–197)
        ↓
$27 guide as order bump / downsell
```

Traffic strategy (the "Maria Wendt playbook"): Rule of One — one product, one
audience (realtors), one channel first (Facebook groups). Value posts, not
pitches. Free training/tool at top of funnel. Imperfect > polished. Ads only
AFTER the free→paid path converts.

---

## 5. BUILD ROADMAP (current sequence)

- [ ] **Step 1 — Workspace + this file** ← we are here
- [ ] Step 2 — Build the free lead-magnet tool (React/Vite, Claude API)
- [ ] Step 3 — Build the paid Pro tool
- [ ] Step 4 — Wire the funnel (email capture → upsell)
- [ ] Step 5 — Traffic: Facebook group value-posts, Maria-style
- [ ] Later — autonomous agents (sales / marketing / product). NOT NOW.

> **On the "autonomous AI CEO + agents" vision:** that is the destination, not
> step one. Claude Code's job right now is **builder**, not org chart. Agents
> come after there is a revenue machine worth running.

---

## 6. TECH STACK

- **Framework:** React + Vite
- **Hosting:** Vercel (deploy via GitHub)
- **AI:** Anthropic Claude API
- **Payments:** Payhip (current) — revisit for Pro tier checkout
- **API keys:** stored ONLY in `.env` (never committed) + local backup. Never
  hardcode keys in source. Never paste keys into chat.

---

## 7. BRAND

- **Name:** Listing Glow Up AI™
- **Audience:** Real estate agents — solo agents first, brokerages later
- **Voice:** Confident, warm, practical. Talks like a top-producing agent's
  smart friend. No corporate jargon, no AI-slop filler.
- **Visual identity:** _[JuJu to confirm — colors, logo, fonts]_

---

## 8. HOW CLAUDE CODE SHOULD OPERATE

1. **Read this file first.** Every session.
2. **One step at a time.** Propose the next action, wait for confirmation.
3. **Money lens.** Every suggestion ties back to the $10k goal.
4. **Flag scope creep.** If JuJu floats a new product/idea mid-build, note it in
   `IDEAS.md` and steer back to the roadmap.
5. **Keep this file current.** When a step finishes or strategy shifts, update
   the roadmap and changelog below.

---

## 9. CHANGELOG

- **2026-05-14** — File created. Business set to 3-tier offer strategy. Roadmap
  Step 1 complete on creation. Next: build free lead-magnet tool.
