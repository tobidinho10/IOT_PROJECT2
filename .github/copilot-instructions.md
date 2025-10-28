## Quick context (what this repo is)

- This is a minimal full-stack e‑commerce starter. The `README.md` states the backend is Node.js (Express) + LowDB (file-based JSON DB) and the frontend is plain HTML/CSS/JS in `frontend/`.
- At the time of inspection the repo contains only `README.md` and an empty `frontend/index.html`. No `package.json`, server files, or DB files were found — search for them before assuming runtime commands.

## High-level architecture the agent should expect

- Backend: Express REST API (README says it exposes product and order resources). Look for typical entry files: `server.js`, `app.js`, `index.js` and a `package.json` at repo root.
- Data: LowDB (file-based JSON). Expect a JSON file (commonly `db.json` or `data/db.json`) used as the data store.
- Frontend: static site under `frontend/` (vanilla JS). `index.html` should fetch from backend endpoints (e.g., `/products`, `/orders`) and implement cart + mock checkout.

## What to check first (concrete steps)

1. Search repo root for `package.json`. If present, use scripts found there (usually `npm start`/`dev`/`start:server`). If not present, do not assume npm usage — report that the project lacks a manifest.
2. Look for server entry points: `server.js`, `app.js`, `index.js`. Open them to confirm ports, endpoints, CORS usage, and where LowDB is initialized.
3. Locate any JSON DB file (e.g., `db.json`, `data/*.json`). If missing, note that the README expects LowDB but the DB file may not be committed.
4. Inspect `frontend/index.html` and any `.js` files under `frontend/` to see how the UI calls the API (endpoint paths, expected payload shapes). At present `frontend/index.html` is empty — call this out in any change proposals.

## Patterns & conventions observed (from repo)

- REST resources: README explicitly mentions product and order APIs. Expect endpoints like `/products` and `/orders` and JSON request/response bodies.
- Simple, file-based persistence: LowDB implies code will read/write a JSON file synchronously or via lowdb adapters — search for `lowdb` import or `.write()` usage.
- Frontend is plain JS: avoid framework-specific assumptions. Prefer minimal, dependency-free solutions for UI work unless a package manifest indicates otherwise.

## Guidance for code changes and PRs

- When creating or modifying backend code, include or update a small `README.md` snippet in the same folder explaining how to run the server locally (port, env vars, db file location).
- If you add a `package.json`, include `start` and `dev` scripts and a short `npm install && npm start` example in the root README.
- When implementing endpoints, add a minimal API contract example in comments or as a `docs/api.md` (request/response shape for `/products` and `/orders`).

## Debugging tips specific to this repo

- If you can't find running instructions, search the repo for `PORT` or `process.env` to find which port the server expects.
- If LowDB is used but no JSON file is present, create a minimal seed file (e.g., `{ "products": [], "orders": [] }`) and document it in the README.

## If something is missing

- The README indicates features but many runtime files are absent in the current tree. Report missing artifacts (no `package.json`, no server files, empty `frontend/index.html`) before making assumptions.

---
If any part of this guidance is unclear or you want it expanded (for example: exact starter commands to include when scaffolding `package.json`, or a suggested `db.json` seed), tell me which area to iterate on and I will update this file.
