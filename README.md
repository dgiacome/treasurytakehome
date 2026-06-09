# Treasury Label Verification Prototype

This workspace contains a React + TypeScript + Vite prototype for an AI-assisted alcohol label verification workflow aimed at TTB compliance review.

## What is included

- A simple compliance-review interface for label inspection.
- A batch queue view to reflect import-heavy review periods.
- A clear, accessible UI designed for agents with different comfort levels using digital tools.
- A lightweight demo analysis flow that emphasizes speed, clarity, and review status rather than deep OCR integration.

## Assumptions and trade-offs

- The prototype intentionally uses deterministic demo analysis and sample label data instead of a live cloud OCR endpoint. This keeps the experience fast and avoids dependency on outbound ML traffic, which is important in government environments.
- File upload handling is intentionally lightweight for this proof of concept; the current UI focuses on the review workflow and status cues rather than full image-processing accuracy.
- The interface is designed for a compliance review scenario, not a full production system integration with COLA or external identity systems.

## Run locally

1. Install dependencies: npm install
2. Start the app: npm run dev
3. Open the local URL shown by Vite (typically http://localhost:5173)

## Build for verification

- npm run build

## Notes

- The current prototype is best viewed as a usability and workflow demonstration for the compliance team.
- Future iterations can add real OCR extraction, confidence scoring, and live batch-processing integrations.
