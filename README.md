# FindIt — Campus Lost & Found System

**FindIt** is a centralized, responsive campus lost-and-found web application designed for college students who have lost or found personal or academic belongings on campus[span_3](start_span)[span_3](end_span). Built with zero frameworks and zero build tools in three static files (`index.html`, `style.css`, and `script.js`), it runs directly in the browser and deploys cleanly on GitHub Pages.

## Why FindIt? (User Research Background)

FindIt was shaped by five past-behaviour student interviews (P01–P05) covering lost chargers, ID cards, lab notebooks, earbuds, and bike keys[span_4](start_span)[span_4](end_span). Research confirmed three recurring campus pain points[span_5](start_span)[span_5](end_span):

* **Fragmented physical desks (4/5 participants):** Lost belongings are scattered across library drawers, department offices, hostel wardens, and security cabins that do not share records, forcing students to walk between buildings[span_6](start_span)[span_6](end_span).
* **Unreliable informal workarounds (4/5 participants):** WhatsApp group posts get buried quickly, physical flyers are removed by maintenance staff, and social media posts attract trolls or false claims on valuable items[span_7](start_span)[span_7](end_span)[span_8](start_span)[span_8](end_span).
* **High time, financial, and academic costs (5/5 participants):** Students lost hours searching across campus, paid for replacement items or extra transport, missed work shifts, or had to rewrite months of lab data[span_9](start_span)[span_9](end_span)[span_10](start_span)[span_10](end_span).

### From V1 to V2 Design
An initial **V1 wireframe** featuring public item photos and open comment threads was discarded after review because exposing brands and identifying marks makes false ownership claims and trolling easy[span_11](start_span)[span_11](end_span)[span_12](start_span)[span_12](end_span). The **V2 design** implemented in this app introduces prominent custody-status badges (informed by P01), vague public item titles, private hidden photos, a secret verification question gate, finder approval, and unlocked private handover details (informed by P04)[span_13](start_span)[span_13](end_span)[span_14](start_span)[span_14](end_span).

---

## Core MVP Features

FindIt focuses strictly on four validated Must-Have workflows[span_15](start_span)[span_15](end_span):

1. **Centralized Searchable Board & Filters[span_16](start_span)[span_16](end_span)**
   * Live keyword search alongside **Category**, **Campus Zone**, **Custody Status**, and **Listing Status** (`Active`, `Recovered`, `All`) filters.
   * Dashboard summary metrics tracking total reports, active listings, and recovered items.
2. **Found-Item Reporting with Clear Custody Status[span_17](start_span)[span_17](end_span)**
   * Prompts finders for a **Vague Public Title (Hide brand/marks)** and general description[span_18](start_span)[span_18](end_span)[span_19](start_span)[span_19](end_span).
   * Displays one of three explicit custody badges on every card: **Held by Finder**, **At Specific Guard Booth**, or **Left on Bench**[span_20](start_span)[span_20](end_span)[span_21](start_span)[span_21](end_span).
   * Supports an optional private photo upload that stays hidden from public view until verification is approved[span_22](start_span)[span_22](end_span)[span_23](start_span)[span_23](end_span)[span_24](start_span)[span_24](end_span).
3. **Private Ownership Verification Gate[span_25](start_span)[span_25](end_span)[span_26](start_span)[span_26](end_span)**
   * Public item views never expose the finder's secret answer, private photo, or contact information[span_27](start_span)[span_27](end_span)[span_28](start_span)[span_28](end_span)[span_29](start_span)[span_29](end_span).
   * Claimants must answer the finder's secret verification question to submit a claim[span_30](start_span)[span_30](end_span)[span_31](start_span)[span_31](end_span).
   * Finders review incoming claims in **My Reports**, compare answers against their stored private answer, and either **Approve** or **Reject** claims[span_32](start_span)[span_32](end_span).
4. **Verified Handover & Recovery Tracking[span_33](start_span)[span_33](end_span)[span_34](start_span)[span_34](end_span)**
   * Approving a claim unlocks the agreed pickup location, date, time, private handover instructions, and any private photo attached by the finder[span_35](start_span)[span_35](end_span)[span_36](start_span)[span_36](end_span).
   * Marking an item as **Recovered** closes the listing, moves it to recovered records, and updates dashboard statistics.
   * Includes in-app notifications for submitted reports, new claims, approvals, rejections, and recoveries.

**Intentionally Out of MVP Scope:** Public comment threads, publicly visible identifying photos/brands, AI image matching, cash reward escrow, and Bluetooth/GPS hardware tags[span_37](start_span)[span_37](end_span)[span_38](start_span)[span_38](end_span).

---

## Project Structure

```text
findit-campus-lost-and-found/
├── index.html   # Semantic application views, modals, navigation & forms
├── style.css    # Responsive desktop, tablet & mobile styling
└── script.js    # State management, filtering, verification logic & localStorage persistence
```

No external packages, frameworks, build steps, or backend servers are required.

---

## Getting Started

### Run Locally
1. Clone or download this repository:
   ```bash
   git clone [https://github.com/](https://github.com/)<your-username>/findit-campus-lost-and-found.git
   ```
2. Open `index.html` directly in any modern web browser.

### Host on GitHub Pages
1. Push `index.html`, `style.css`, and `script.js` to the root of a public GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then click **Save**.
5. Access the live app at `https://<your-username>.github.io/<repository-name>/`.

---

## Testing the End-to-End Demo Flow

The app ships with realistic campus sample items and three built-in demonstration student profiles (**Tanmay Gupta**, **Riya Sharma**, and **Arjun Mehta**) so you can test both sides of the workflow on one device:

1. **Test Search & Filtering:** Search `"charger"` or filter by campus zone (`Library`, `Science Block`, `Cafeteria`, `Main Gate`, `Sports Complex`) in **Browse Items**.
2. **Test Reporting:** Open **Report Found Item**, add a vague title, choose a custody badge, set a secret question/answer, and submit.
3. **Test Claiming as Another Student:** Go to **Profile**, switch to another demo student, open your new item in **Browse Items**, and click **Claim This Item**.
4. **Test Finder Review & Handover:** Switch back to the original finder in **Profile**, open **My Reports → Review Claim**, compare the submitted answer with your private answer, and click **Approve Claim** (or **Reject Claim**).
5. **Test Recovery:** On the **Verified Handover** screen, click **Mark as Recovered** and verify that the item moves out of active listings and updates dashboard statistics.
6. **Reset Anytime:** Use **Profile → Reset Demo Data** to restore the default sample dataset.

---

## Demonstration Scope vs. Production

This repository is a **client-side demonstration prototype** using browser `localStorage` (`findit_campus_demo_v2`) so changes persist across refreshes on the same browser. It does **not** implement real campus SSO authentication, server-side encryption of private verification answers/photos, or cross-device database synchronization. In a production campus deployment, verification records, private images, and handover details would be stored and access-controlled on a secure backend API.

---

## Course & Project Info

* **Course:** MSOT — Product Development[span_39](start_span)[span_39](end_span)
* **Project:** FindIt — Campus Lost & Found System[span_40](start_span)[span_40](end_span)
* **Author:** Tanmay Gupta (`MAINS-43925`)[span_41](start_span)[span_41](end_span)
