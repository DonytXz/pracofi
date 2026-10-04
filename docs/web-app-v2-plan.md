# Pracofi web app improvement plan

Improve the existing web app into a reliable, consistent appointment workspace for clients, accountants, and administrators. Prioritize the client booking journey, then staff operations, while retaining the Pracofi brand and Spanish interface. Build incrementally on the current React, Vite, and Tailwind application.

This is an implementation plan, not an implementation. The planning branch is `plan/web-app-v2`, based on `main` at `ed67c7d`. The baseline was reviewed on October 3, 2026. The user has authorized proceeding without routine project confirmations; the choices below are working defaults.

## Scope and boundaries

In scope: web navigation, layouts, forms, client session handling, booking and user interfaces, accessibility, frontend state, performance, frontend tests, and the web deployment pipeline. Frontend adapters may normalize existing responses and errors.

Keep existing API endpoints, HTTP methods, request fields, role values, and the `token` header compatible. No changes to `pracofi-api`, database models, server authorization, or server deployment belong in this version. A contract gap should reduce or defer the affected UI feature rather than introduce an API requirement into the release.

Defer new password recovery, reminders, payments, document uploads, live slot availability, calendar synchronization, server pagination, durable consent records, and a new authentication protocol. Do not promise a confirmed reservation or new booking statuses unless the existing API response supports that claim. Client route guards improve navigation but do not establish server authorization.

## Current baseline and evidence

The application has public pages plus client (`USER`), accountant (`CONTADOR`), and administrator (`ADMIN`) workflows. It already uses React 19, Vite 8, Tailwind 3, and Vitest. A framework rewrite is unnecessary for this scope.

- **Session handling can fail before redirecting.** `src/pages/Bookings.jsx:23` reads a missing stored ID during rendering; role headers make similar assumptions about the stored name. `src/services/AutService.js:29` clears only the token on logout, and token parsing has no malformed-data recovery. `src/app/App.jsx` has no central protected-route wrapper or unknown-route view.
- **Changing list sizes can break rendering.** `src/components/bookingsAdmin/List.jsx:118` and `src/components/bookingsAcoutnMan/MyBookingsAcountMan.jsx:106` call `useState` inside a row loop. Assignment and repeated deletion also leave stale lists. `src/components/users/List.jsx` calls an undefined `setLoading` and discards the refetch result after deletion.
- **The booking form and request disagree.** `src/pages/ScheduleBooking.jsx:63` submits topic, date, time, area, and RFC through `RegisterBookingUser`; the required case-description step is not sent. The checkbox in `src/components/scheduleBooking/Step3.jsx:94` does not gate submission. Cancel calls logout, and request failures are hidden.
- **Editing may submit blank replacements.** `src/pages/BookingDetail.jsx` and `src/components/editBookingAdmin/Edit.jsx` keep fetched records separate from blank editable state. The admin editor also derives the submitted owner from the logged-in user. Actual server update behavior was not exercised; preserve loaded values and ownership in the frontend payload.
- **Forms and navigation need consistent interaction.** `src/components/global/Menu.jsx:10` uses a clickable image for the menu toggle; several icon actions lack accessible names. Registration requires a surname but only sends the given name. The public header has no direct sign-in action.
- **Some routes are unfinished or duplicate existing work.** `src/pages/AcountManBookingDetail.jsx` contains placeholder content. `src/pages/RegisterAcoutnMan.jsx` navigates on submission without creating the account, while `src/components/register/AcountMan.jsx` contains an actual registration flow.
- **Quality coverage is narrow.** `src/app/App.test.jsx` has one landing-page smoke test. `.github/workflows/gh-pages.yml` builds and deploys but does not test pull requests. All route pages are eagerly imported.

Verification performed for this plan:

- Fetched `origin`; local `main` matched `origin/main` at `ed67c7d`.
- `npm run build` passed. The main JavaScript asset was **541.84 kB minified / 160.18 kB gzip**, with a chunk-size warning; CSS was **15.30 kB / 3.94 kB gzip**. These are build sizes, not measured user load times.
- `npm run test:run` could not execute a test: the Vitest forks worker timed out. A second run outside the sandbox had the same result. Treat the test baseline as unresolved, not passing or an application assertion failure.
- Viewed the public landing page in the local browser. Authenticated workflows were reviewed in source only; no production records were created, edited, assigned, or deleted. API behavior and mobile layouts have not been verified end to end.

## Proposed experience

### Public pages

Use a clear service introduction, a primary **Agendar una cita** action, and a visible **Iniciar sesión** action. Keep **Inicio**, **Servicios**, and **Contacto** easy to find. Improve the existing service copy without inventing prices, guarantees, credentials, or business claims. Keep contact delivery on the existing service and provide Spanish pending, success, and error feedback.

### Client workspace

Make **Mis citas** the home after login: upcoming appointments first, with date, time, topic, and available actions easy to scan. Provide **Agendar cita** and **Perfil** in the shared navigation. Split upcoming and past appointments using both date and time; chronological grouping must not imply a server-managed appointment status.

Replace the current wizard with three coherent steps:

1. **Datos de la cita:** topic, date, and time.
2. **Datos del servicio:** area and RFC using the established field requirements.
3. **Revisar y enviar:** the exact submitted values, editable through Back, with a submission acknowledgement and clear pending/error feedback.

Remove the unsaved case-description requirement for this version. Do not silently append it to another API field. Keep the draft in memory while navigating between steps. Cancel returns to the role's appointment list without ending the session. An acknowledgement can gate submission locally, but must not be presented as a stored consent record.

### Accountant and administrator workspaces

For accountants, use **Citas** and **Mis citas**. Label a list **Citas disponibles** only if existing response fields reliably distinguish unassigned appointments. For administrators, use **Citas** and **Usuarios**. Provide search, sorting, and filtering over the already fetched data and state that scope where results could otherwise appear exhaustive.

Use one appointment detail presentation with actions determined by the existing role and supported contract. Keep selection controls only if a real action uses them; defer bulk mutations. Preserve existing links through route aliases or redirects when consolidating screens.

### Visual direction

Retain the logo and navy/cyan brand palette. Use light, readable work surfaces, restrained decorative imagery, consistent typography and spacing, and one prominent primary action per screen. Standardize fields, buttons, status messages, dialogs, and appointment rows. Use a compact table on wide screens and a readable stacked layout on narrow screens. Target 360, 768, and 1440 pixel widths and usable 200% zoom.

## Implementation sequence

Deliver the following as small changes on the improvement branch, with reviewable checkpoints. Each checkpoint includes the regression tests for the behavior it changes. The sequence is a dependency order, not a calendar commitment.

### 1 Restore a trustworthy frontend baseline

Resolve the Vitest worker startup problem and establish a reproducible supported Node environment. Add pull-request checks for clean dependency installation, linting including Hook rules, tests, and the production build. Record sanitized fixtures for the response shapes already consumed by the web services, including empty and error cases. Do not claim fixture data proves live server behavior.

Fix Hooks inside row loops, invalid DOM selection calls, and undefined state setters. Remove unused selection controls when there is no supported bulk action. Establish shared loading, empty, failure, and retry states.

Acceptance: the existing smoke test executes and passes, followed by passing regression tests and CI checks; lint catches invalid Hook placement; lists render across 0 to several rows and shrink after deletion without crashing; PR checks do not deploy the site.

### 2 Unify session handling and the application shell

Introduce a session provider with defensive storage parsing and complete logout. Define a route-to-role matrix and add route guards, a shared role-aware layout, return-to navigation after login, a not-found page, and an error boundary. Preserve the existing token header. Normalize expired-session handling; show permission errors without treating every failure as logout.

Build the shared form and feedback components here. Make menus keyboard operable, give controls accessible names and associated labels, and include visible focus styles. Retain current supported role registration behavior; changing who may become an accountant is a separate policy and server-authorization concern.

Acceptance: absent, partial, and malformed session data cannot crash protected routes; signed-out users reach login before protected content renders; wrong-role direct links show access denied or redirect before mounting the screen or starting its requests; each role sees its intended navigation; logout clears identity and role data; unknown URLs show a recovery action.

### 3 Complete the client booking journey

Implement the controlled wizard above with per-step validation and preserved values. Validate established required fields and preserve existing optionality where requirements are unverified; do not infer requiredness from a request shape or invent RFC validation, operating hours, or slot rules. Disable duplicate in-flight submission, show an explicit review, and display success only after a successful API response. Preserve input on failure and allow deliberate retry. Do not automatically retry uncertain writes.

Initialize edit drafts from fetched records. Preserve unchanged fields and the original booking owner. Handle not-found and load failures before enabling save. Delete dialogs should identify the appointment and perform the existing deletion only after the user's in-app confirmation; refresh the view after success.

Acceptance: Back preserves every field; Cancel preserves login; double clicks create one in-flight request; failure retains input; a one-field edit preserves every other payload value; two successive deletions both update the list. The submitted shape remains compatible with `src/services/Bookings.js`.

### 4 Make staff operations dependable

Consolidate duplicated appointment lists and details. Refresh all affected views after assignment or deletion, and display per-action pending and failure states. Reuse a single date/time adapter for sorting and upcoming/past classification. Add client-side search and filters over fetched records. Replace unfinished accountant routes with functioning supported screens or redirects.

Acceptance: assigning an appointment updates the relevant list state; a rejected assignment does not appear successful; same-day appointments are classified by time; mobile layouts expose every action; empty and failed requests have distinct recovery paths.

### 5 Finish accounts and public pages

Use a full-name registration field mapped to the existing `nombre` contract. Consolidate duplicate registration UI while preserving existing role values. Populate user edit forms from an existing supported read result, preserve unchanged fields, and display known role choices. Verify password-update semantics before enabling an optional password change; never guess that an empty password means unchanged.

Improve profile form labels, validation, submission feedback, and accessible layout. The current profile service exposes a POST operation; do not claim the page can reload or update a saved profile unless that behavior is supported by the existing contract. If it is unavailable, keep a clearly described supported submission flow and defer unsupported editing.

Polish public navigation, sign-in discovery, service content, and contact feedback. Avoid requiring new external services.

Acceptance: all persisted registration values map to existing payload fields while password confirmation and acknowledgements remain client-side; user edits preserve loaded values; successful deletion removes the user row; forms show actionable errors; the public booking-to-login-to-booking path is coherent.

### 6 Optimize and verify the release

Lazy-load authenticated route groups, optimize assets actually included in the build, and measure all JavaScript required for the initial landing load, including shared and preloaded chunks, against the recorded baseline. Do not spend time optimizing unused source assets. Remove unused dependencies only after checking imports and build output. Keep router and date-library migrations separate unless a demonstrated blocker requires them.

Add print styles and an accurate **Imprimir / Guardar como PDF** action for appointment summaries. Verify `/pracofi/` asset paths, links, and refreshed nested routes against the GitHub Pages deployment behavior, including the generated `404.html`. Keep publishing tied to the established release branch, with the previous working build available for rollback.

Acceptance: total JavaScript needed for the initial landing load is smaller than the 160.18 kB gzip baseline and authenticated route code loads on demand; print output omits navigation and action controls; nested-route refresh works; all release checks below pass. A stronger performance budget can be set after comparable browser measurements.

## Frontend structure

Move code as each feature is touched rather than doing a separate whole-repository reorganization.

- `src/app`: routing, providers, session handling, layouts, and error boundaries.
- `src/features/auth`, `bookings`, `users`, and `profile`: feature screens, controlled form state, and data hooks.
- `src/shared/ui`: reusable form controls, messages, dialogs, and responsive list primitives.
- `src/shared`: date/time helpers and other genuinely shared functions.
- `src/services`: the current HTTP client and endpoint wrappers, with response adapters and consistent errors.

Keep React, Vite, Tailwind, and the current router for the first delivery. Use small shared data hooks initially; add a data-cache or form dependency only if actual repeated complexity justifies it. Fix internal spelling and naming as files move while preserving externally reachable URLs. Avoid a simultaneous framework, router, styling, and data-library migration.

## Release checks

- Automated route/session tests cover absent and corrupt storage, all roles, logout, permission errors, and expired sessions.
- Component/integration tests cover changing list sizes, repeated deletion, assignment refresh, edit preservation, failed reads, failed writes, wizard Back/Cancel, and duplicate submission prevention.
- Date tests include later today, earlier today, midnight boundaries, and the observed API date/time formats.
- Browser smoke tests use mocked responses for client, accountant, and admin journeys. Live write verification uses only a designated disposable test environment when available; lack of one remains an explicit release limitation.
- Manual keyboard and responsive checks cover menus, forms, dialogs, error focus, visible focus, labels, zoom, and narrow-screen actions. Automated accessibility checks supplement these checks.
- Build and deployment checks cover the base path, generated `404.html`, direct nested links, route loading, missing records, print output, and production configuration.

## Working assumptions and deferred contract questions

These defaults allow work to proceed without routine confirmations. Record any contradiction discovered during implementation rather than silently inventing server behavior.

- **Priority:** client appointment creation and management first, then accountant and admin efficiency.
- **Brand and language:** retain Pracofi identity and Spanish copy; this is a product improvement, not a rebrand.
- **Time:** provisionally use `America/Mexico_City` for displayed business time, based on the app's Guadalajara context. Verify how existing `fecha_cita` and `hora` values encode time before changing conversions; retain their wire format and do not shift legacy appointments speculatively.
- **Availability:** the user selects a requested time; no availability guarantee or operating-hours enforcement is added without existing support.
- **Registration:** preserve existing public client/accountant registration behavior and role values. A future staff-onboarding policy change is separate from frontend route visibility.
- **Unsupported data:** defer case descriptions and durable consent storage; do not add fields or overload `motivo`. Profile read/update behavior and password-edit semantics require contract evidence before exposing those promises.

The first implementation checkpoint should be **Restore a trustworthy frontend baseline**, followed by session handling and the shared shell. This gives the redesigned booking flow a stable foundation and keeps every release step inside the web app scope.
