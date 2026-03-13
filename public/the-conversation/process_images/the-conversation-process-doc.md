# The Conversation — Process Case Study

## Purpose

This document is a spec for building a **process case study page** on my portfolio site (liamksheehan.com, hosted on GitHub Pages). The page should walk visitors through how I designed and built "The Conversation," an Articulate Storyline 360 branching scenario module. The tone should be confident, specific, and practitioner-facing — written for hiring managers, L&D leaders, and fellow IDs who want to see how I think and work, not just what I shipped.

---

## Page Structure & Content

### Hero Section

**Title:** The Conversation: Building a Branching Scenario from Concept to Deploy in One Day

**Subtitle/Tagline:** A visual novel-style Storyline module targeting new people managers — designed to prove that empathy-driven soft skills training can be engaging, polished, and instructionally rigorous without a massive budget or timeline.

**Hero image:** Use `Title Screen.png` as a full-width hero image or background with overlay. This is the module's title screen and immediately establishes the visual novel aesthetic.

**Key stats to display prominently (use a row of cards or similar):**
- **Timeline:** ~1 full day, concept to deploy
- **Tool:** Articulate Storyline 360
- **Format:** Branching scenario, 4 decision points
- **AI-Assisted:** Midjourney for art, Claude for build planning & development support
- **~140 images generated** across iterative Midjourney sessions to produce final character and background assets

---

### Section 1: The Problem I Was Solving

This wasn't a client project — it was a deliberate portfolio piece designed to fill a gap. I already had CyberWise (a custom-built, gamified cybersecurity module) in my portfolio, which demonstrated technical depth and complex interactivity. What I needed was a complementary piece that showed:

- **Tool fluency** with industry-standard authoring tools (Storyline 360)
- **Soft skills domain** expertise (people management, difficult conversations)
- **Empathy-driven instructional design** — no gamification crutch, just strong scenario writing and meaningful consequences
- **Tight scope execution** — proof I can ship polished work fast, not just build ambitious projects over months

The two pieces together tell a story: I can build from scratch when the project demands it, and I can deliver within standard tooling when it doesn't. Technical range + design fundamentals.

---

### Section 2: Instructional Design Approach

**Learning Objectives:**
1. Apply a structured approach to initiating a difficult performance conversation
2. Demonstrate active listening and empathy when an employee reacts emotionally
3. Analyze root causes of performance decline through effective questioning
4. Develop a collaborative, actionable improvement plan

**Core design decisions:**

- **No single fail state.** Real conversations don't have game-over screens. Instead, the learner's choices accumulate — Yuki's reactions shift based on how much trust the learner has built or eroded. This mirrors how actual difficult conversations work: one bad move doesn't end things, but a pattern of bad moves does.
- **Cumulative scoring (max 12 points)** across 4 decision points, with 3 tiers at debrief: Supportive Leader (10-12), Mixed Signals (6-9), Missed Opportunity (3-5).
- **Variable-driven character state system.** A `yuki_state` variable tracks the learner's cumulative approach (+1 for empathetic choices, -1 for dismissive ones). Yuki's character sprite and dialogue tone shift accordingly — the learner *sees* the impact of their choices in her body language and openness before they ever reach the debrief.
- **SBI+I framework** (Situation, Behavior, Impact, Intent) taught in the debrief — the scenario is designed so the learner experiences *why* the framework matters before they're told what it is.
- **Feedback after every decision point** — brief instructional callouts explaining the principle at play, shown regardless of which choice was made. This keeps it instructional rather than purely experiential.

---

### Section 3: Visual Design & Art Direction

**Why anime visual novel style?**

Corporate eLearning has an aesthetic problem. Stock photos of people in blazers pointing at whiteboards don't create emotional engagement, and they actively signal "skip this." I chose a visual novel aesthetic deliberately — it's a format built for dialogue-driven storytelling with character expression states, which maps perfectly onto a branching conversation scenario. It differentiates the piece immediately and signals creative intentionality.

**Design system:**
- **Palette:** Navy (#1E3A5F) and amber (#D97706) — professional but warm, high contrast
- **Typography:** Serif (Cormorant Garamond style) for titles, clean sans-serif for body/dialogue
- **Dialogue UI:** Semi-transparent navy box with amber top stripe accent and character name tag
- **Choice buttons:** Custom amber gradient (4 stops: #F5B942 → #D97706 → #B45309 → #92400E), hover state inverts to navy gradient with amber border
- **Project dimensions:** 1280×720, 16:9

**IMAGE: Finished character showcase.** Display `finalYuki3.png` and `finalYuki4.png` side by side here, captioned as examples of the final character design with expression states. These show Yuki in her final outfit (dark knit sweater over striped collared shirt) at different emotional states. Use these to visually anchor the design system description above.

---

### Section 4: AI-Assisted Asset Creation with Midjourney

This is where the process gets interesting — and where I want to be transparent about what AI art generation actually looks like in practice.

**The numbers:** I generated approximately **140 images** across multiple iterative Midjourney sessions to arrive at the final assets used in the module. That's not a typo. AI image generation is not "type a prompt, get a result." It's an iterative creative process with its own skill curve.

**Character design workflow (Yuki Tanaka):**

**IMAGE: Reference sheet.** Display `character_ref.png` here — this is the Midjourney character reference sheet that established Yuki's base design. Caption: "The initial character reference sheet generated in Midjourney Niji 6. This became the foundation for all subsequent expression generations."

1. **Reference sheet generation.** Started with a detailed descriptive prompt establishing Yuki as a Japanese woman in her late 20s, long black hair, black-rimmed glasses, smart casual sweater over collared shirt. Generated multiple batches to find a strong base.
2. **Face crop for consistency lock.** Selected the strongest result and cropped to a tight face close-up — this becomes the anchor for all subsequent generations.
3. **Omni Reference (--cref) pipeline.** Used the face crop as a character reference in all subsequent prompts, which locks Midjourney onto the established character design across different expressions and poses.
4. **Expression state generation.** Generated 6 states needed for the scenario: neutral, guarded/defensive (arms crossed), receptive/open, relieved/engaged, shut down/checked out, and compliant/transactional. Each of these required multiple generation rounds to get right.
5. **Background removal.** Processed all final character assets through remove.bg for transparent PNG export.

**IMAGE: Early iterations grid.** Display `earlyYuki1.png`, `earlyYuki2.png`, `earlyYuki3.png`, `earlyYuki4.png`, and `earlyYuki5.png` as a grid (3+2 or a scrollable row). Caption: "A sampling of early Midjourney generations. Note the inconsistencies across outputs — outfit shifts from sweater to blazer, expression range varies, poses drift. Each of these was generated with similar prompts but different seeds and parameter tweaks." These early iterations use a more formal blazer look and different styling, which visually contrasts with the finals to show the evolution.

**IMAGE: Anatomy/drift problem callout.** Display `yukiAnatomyProblem.png` as a callout or aside near the "Prompt engineering lessons learned" section. Caption: "An example of Niji 6 drift — anatomical inconsistencies and unwanted style shifts were common without careful negative prompting. Issues like these are why the 140-image count is realistic, not excessive." This image illustrates why `--no` flags and careful prompting were necessary.

**Prompt engineering lessons learned:**

- **Negative prompts are critical.** Added `--no ponytail, multiple characters, open collar` to prevent common Niji 6 drift — without these, the model would frequently change Yuki's hairstyle, add extra characters, or alter her outfit in ways that broke consistency.
- **Describe emotions through physicality, not labels.** "Eyes downcast, head slightly bowed" produces more consistent, nuanced results than "sad." Emotion words are too ambiguous for the model.
- **Closed-mouth expressions require specific language.** "Warm eyes, soft gaze" gets you a subtle positive expression. "Smile" almost always produces open-mouth toothy grins that look uncanny on anime characters.
- **140 images for ~8 final assets** is a realistic ratio. Character consistency across expressions is genuinely hard. Each expression state went through multiple rounds of generation, upscaling, evaluation, and re-prompting.

**IMAGE: Before → After comparison.** This is the visual centerpiece of this section. Create a side-by-side or slider-style comparison layout:
- **Left / "Before" side:** 2-3 of the early iterations (`earlyYuki1.png`, `earlyYuki2.png`, `earlyYuki3.png`) labeled "Early iterations — inconsistent outfit, expression, and styling"
- **Right / "After" side:** The final assets (`finalYuki1.png`, `finalYuki2.png`, `finalYuki3.png`, `finalYuki4.png`) labeled "Final expression states — consistent character design locked via --cref pipeline"
- **Between them:** A visual indicator of the funnel — something like "~140 generated → 8 selected" with an arrow or funnel graphic

This comparison is the strongest visual proof that AI-assisted asset creation is a skilled process, not a one-click shortcut.

**Background assets:**

Generated using Midjourney Niji 6. The main background prompt: modern office interior, 1:1 meeting room, two chairs across a desk, large window with natural light, city view, bookshelves, warm afternoon lighting, muted navy/slate tones. A second background with cooler blue-hour tones was generated for the debrief screen.

---

### Section 5: Storyline Technical Build

**Player configuration:** Modern player style, all navigation stripped except volume control. No prev/next, no seekbar, no menu — the learner progresses through dialogue and choices only, reinforcing the visual novel feel.

**Variable architecture:**
- `score` (Number, default 0) — cumulative across all decision points
- `yuki_state` (Number, default 0) — tracks character receptiveness
- `dp1_choice` through `dp4_choice` (Text) — stores choice labels for the results page

**Trigger logic per decision point:**
- Best choice: score +3, yuki_state +1
- Acceptable choice: score +2, yuki_state unchanged
- Poor choice: score +1, yuki_state -1
- All choices trigger the same feedback layer, then advance

**Character state system:** Each reaction slide has a single Yuki image object with 3 built-in states (Receptive, Neutral, Guarded). On timeline start, conditional triggers read `yuki_state` and switch to the appropriate state — so the learner sees Yuki's body language shift based on their cumulative choices.

**Debrief system:**
- Score tier display: single text box with 3 states, set by conditional triggers on timeline start
- Dynamic score display using `%score%` variable reference
- Typewriter effect on narrator text using Storyline's appear-by-letter animation

**Results page integration:**
- JavaScript trigger on the final slide reads all variables via `GetPlayer()`
- Constructs a URL with score and choice data as query parameters
- Opens an external results page in a new tab
- The results page (built as a standalone HTML/vanilla JS file) parses URL parameters and renders a choice review panel showing what the learner picked vs. the optimal response at each decision point, with color-coded badges and rationale text — all in the same navy/amber design system

---

### Section 6: Deployment

- Storyline module published as SCORM, hosted on SCORM Cloud with anonymous access enabled
- External results page hosted as a static site
- Both linked from portfolio at liamksheehan.com

---

### Section 7: Tools & Credits

| Tool | Use |
|------|-----|
| Articulate Storyline 360 | Module authoring, interactions, triggers, states |
| Midjourney (Niji 6) | Character sprites and background art generation |
| Remove.bg | Background removal on character assets |
| Claude (Anthropic) | Build planning, prompt engineering strategy, Storyline troubleshooting, results page code |
| SCORM Cloud | Hosting and deployment |

---

### Section 8: What I'd Do Differently / Phase 2

- **Storyline/Rise interactives** — the current debrief is functional but could benefit from interactive elements (e.g., drag-and-drop SBI+I framework practice)
- **Voice acting** — the module is currently text-only by design (accessibility, fast review for portfolio visitors), but audio narration would strengthen the visual novel feel
- **Expanded branching** — the current 4-point linear branch structure could expand into a more complex tree where early choices open or close later options entirely

---

## Design & Implementation Notes for Claude Code

### Image Assets

All images should be placed in the site's assets/images directory (or equivalent based on existing site structure). Here is the complete manifest:

| Filename | Section | Role |
|----------|---------|------|
| `Title Screen.png` | Hero | Full-width hero image, module title screen |
| `finalYuki3.png` | Section 3 (Visual Design) | Finished character showcase, side by side with finalYuki4 |
| `finalYuki4.png` | Section 3 (Visual Design) | Finished character showcase, side by side with finalYuki3 |
| `character_ref.png` | Section 4, Step 1 | Midjourney reference sheet, workflow illustration |
| `earlyYuki1.png` | Section 4, early iterations grid | Early iteration example |
| `earlyYuki2.png` | Section 4, early iterations grid | Early iteration example |
| `earlyYuki3.png` | Section 4, early iterations grid | Early iteration example |
| `earlyYuki4.png` | Section 4, early iterations grid | Early iteration example |
| `earlyYuki5.png` | Section 4, early iterations grid | Early iteration example |
| `yukiAnatomyProblem.png` | Section 4, callout near prompt engineering lessons | Niji 6 drift/anatomy problem example |
| `finalYuki1.png` | Section 4, before/after comparison (after side) | Final expression state |
| `finalYuki2.png` | Section 4, before/after comparison (after side) | Final expression state |
| `finalYuki3.png` | Section 4, before/after comparison (after side) | Final expression state (reused from Section 3) |
| `finalYuki4.png` | Section 4, before/after comparison (after side) | Final expression state (reused from Section 3) |

### Layout & Styling

- Match the existing site design system on liamksheehan.com (check current styles, fonts, layout patterns)
- This should be a standalone case study page, likely at a route like `/the-conversation` or `/portfolio/the-conversation`
- The stat cards in the hero should be visually prominent — these are the hook for skimmers
- The Midjourney section (Section 4) is the most image-heavy section and should get the strongest visual treatment — the before/after comparison and the iteration funnel visualization are the centerpieces
- Image grids should be responsive — 3-across on desktop, 2-across on tablet, single column on mobile
- All character images have transparent backgrounds — display them on a subtle dark or navy background to match the module's aesthetic
- Keep the writing voice as-is — first person, direct, practitioner-to-practitioner. Don't soften it into generic portfolio copy.
- Responsive design required — this will be viewed on mobile by recruiters
