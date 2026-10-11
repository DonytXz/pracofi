# Pracofi

Pracofi is a Spanish-language appointment web app for clients, accountants, and administrators, built with React and Vite. The web app v2 work is scoped to this repository; it preserves the existing API endpoints and payload contracts.

## Requirements

- Node.js 24 (see `.nvmrc`; also used in CI)
- npm

Install dependencies with `npm ci`.

## Environment

Copy `.env.example` to `.env` and configure the `VITE_*` values for your
environment. Only variables prefixed with `VITE_` are exposed to browser code.
Do not put secrets in these variables. The router uses Vite's `/pracofi/` base path.

## Available scripts

- `npm run dev` starts the Vite development server.
- `npm start` is an alias for the development server.
- `npm run build` creates a production build in `dist`.
- `npm run preview` serves the production build locally.
- `npm test` starts Vitest in watch mode.
- `npm run test:run` runs the test suite once.
- `npm run lint` checks source files and React Hook dependencies.
- `npm run check:build` verifies the GitHub Pages fallback, asset base paths, and initial JavaScript size after a build.
- `npm run dev:fixtures` starts a local preview with an in-memory appointment API.

## Local fixture preview

Open `http://127.0.0.1:5174/pracofi/` after running `npm run dev:fixtures`. The fixture API uses port 5175. Its data resets when the process restarts.

Use `demo-pracofi` as the password with one of these accounts:

| Role | Email |
| --- | --- |
| Client | `cliente@example.test` |
| Accountant | `contador@example.test` |
| Administrator | `admin@example.test` |

Appointment and account operations use synthetic local records. The public contact form retains the existing external Formspree destination; do not submit it when testing fixtures. Automated contact tests mock submissions.

## Web app structure

- `src/app`: routing, session provider, role guards, and error boundary.
- `src/components/global`: shared responsive shell and browser printing.
- `src/features/bookings`: controlled booking wizard, appointment lists, editing, and deletion confirmation.
- `src/features/accounts`: login, registration, profile submission, and user administration.
- `src/services`: the existing API contracts and shared authenticated HTTP client.
- `src/shared`: session storage and user-facing error handling.

Protected pages check roles before mounting. Session expiry clears the matching session and returns the user to login. Route guards improve navigation; authorization must still be enforced by the existing API.

Booking lists support search and date/area filtering. Booking forms preserve entered values on failure and prevent duplicate submissions. Date-only values are preserved without UTC day shifts, and appointment comparisons use `America/Mexico_City`.

## Existing API limitations

The interface does not promise appointment availability, reminders, or free-text description storage because the existing contracts do not provide them. Profile entry is a submission flow, not an editable profile readback. Editing a user requires an explicit replacement password because the existing full-update contract does not establish safe password omission semantics.

See `docs/web-app-v2-plan.md` for scope and decisions.
See `docs/web-app-v2-validation.md` for verified results and remaining limitations.

## Validation and deployment

Run `npm run lint`, `npm run test:run`, `npm run build`, and `npm run check:build` before publishing. Tests use mocked services or local storage; they do not mutate production records.

CI runs these checks on pull requests and feature branch pushes. The existing GitHub Pages deployment remains tied to the main/master branches. Production builds include a `404.html` copy of `index.html` for direct route navigation under `/pracofi/`.
