# Nephrostomy Needle Guidance Study Survey

This repository contains a web-based survey tool for the research study:

**"Evaluating Needle Guidance in Simulated Nephrostomy: A Comparison of Freehand and Low-Cost Guidance Techniques"**

## Study Overview

This study investigates whether low-cost needle guidance systems improve performance in ultrasound-guided needle placement for nephrostomy procedures, compared to conventional freehand techniques.

### Study Protocol

- Participants perform simulated nephrostomy needle placements using three techniques:
  1. Freehand
  2. In-plane needle guide
  3. Out-of-plane needle guide
- Each participant completes a series of tasks and then fills out this survey.

### Survey Structure

The survey collects:

- **Demographics & Experience:**
  - Initials (for anonymized tracking)
  - Training level
  - Years of experience with ultrasound
  - Estimated number of ultrasound-guided needle placements performed
- **NASA-TLX Task Load Index:**
  - Workload assessment for each technique (mental, physical, temporal demand, performance, effort, frustration)
- **Post-Session Evaluation:**
  - Preferred technique for future use (with optional reasoning)
  - Technique perceived as most accurate (with optional reasoning)
  - Technique chosen for clinical cases (with optional reasoning)

### Data Handling

Survey responses are submitted to a secure Google Sheet for analysis. No personally identifying information is collected beyond participant initials.

## Running the Survey App

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

### Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure Google Sheets endpoint:**
   - Set the Google Sheets script URL in the code (see `src/services/googleSheets.ts`).
   - No authentication is required for the survey app itself.
3. **Start the development server:**
   ```sh
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```sh
npm run build
```

## Repository Structure

- `src/components/Survey.tsx` — Main survey flow
- `src/components/sections/Demographics.tsx` — Demographics & experience questions
- `src/components/sections/NasaTLX.tsx` — NASA-TLX workload assessment
- `src/components/sections/PostEval.tsx` — Post-session evaluation questions
- `src/services/googleSheets.ts` — Handles survey submission to Google Sheets

## Contact

For questions about this study or the survey tool, contact:

- **Principal Investigator:** [Add Name/Email]
- **Developer:** MahaK21 (GitHub)

---

_This project is for research purposes only. Please do not use for clinical decision-making._
