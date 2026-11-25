# Resume Maker

A frontend-only resume builder made with React and Vite. It includes an ATS-friendly single-column preview, automatic browser draft saving, and print-to-PDF export.

## Run locally

1. Install Node.js 20 or newer.
2. In this folder, run `npm install`.
3. Run `npm run dev`.
4. Open the local URL printed in the terminal (usually `http://localhost:5173`).

Resume drafts are saved in the current browser using local storage. They are not uploaded or synced to another device.

## Build for deployment

Run `npm run build`. Upload the generated `dist/` folder to a static hosting service. No backend or database is needed. For local build preview, run `npm run preview`.

## Export

Choose **Export PDF** or **Download PDF**, then select **Save as PDF** in the browser print dialog.
