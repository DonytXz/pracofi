# Web app v2 validation

Validated locally on 2026-10-10 on `feature/web-app-v2`.

## Implemented scope

- Shared responsive public and authenticated navigation, Spanish copy, keyboard menu controls, and print styles.
- Session parsing, logout, role guards, expired-session handling, lazy routes, and an error boundary.
- Controlled appointment wizard with retained values, review step, validation, and duplicate-submit protection.
- Appointment search, period/area filters, sorting, retry states, assignment refresh, deletion confirmation, and safe editing of existing owner/date values.
- Login return navigation, registration, profile submission, and user management using the existing API contracts.
- Regression tests, lint rules, CI, GitHub Pages build checks, and a local in-memory fixture preview.

No backend implementation or production data was changed. These changes have not been deployed.

## Automated results

| Check | Result |
| --- | --- |
| `npm run lint` | Pass, no warnings |
| `npm run test:run` | 71 tests pass across 10 files |
| `npm run build` | Pass |
| `npm run check:build` | Pass: `/pracofi/` asset paths and identical SPA fallback |
| Initial JavaScript including static dependencies | 75.74 kB gzip; baseline 160.18 kB, approximately 53% smaller |
| `git diff --check` | Pass |
| `npm audit --omit=dev` | Zero reported vulnerabilities |

Tests cover session storage and expiry, role restrictions, booking failures and retries, retained form data, duplicate writes, repeated deletion, owner preservation, route changes while records load, account operations, navigation, and mocked contact submissions.

Vitest uses a single thread worker because the two-worker run on this Windows host encountered worker-startup timeouts. The complete single-worker run passed without unhandled errors.

## Remaining verification and limitations

- Visual browser verification of the redesigned app remains pending. Automatic approval review rejected reopening the local fixture preview after an earlier credit-blocked attempt and required specific authorization. No alternative browser path was used.
- Contact submissions are mocked in tests. The local fixture server does not intercept the external Formspree destination.
- Production API smoke testing and real role/authorization enforcement were not exercised. Frontend guards are not a substitute for backend authorization.
- The full dependency audit reports seven development-only advisories (five high, two moderate) in the Tailwind 3 dependency chain. A compatible source-map patch was applied. The suggested Tailwind 4 major migration is deferred to avoid combining a styling-toolchain migration with this implementation.
- Appointment availability, reminders, description persistence, profile readback, and password-preserving user updates remain limited by the existing API contracts, as documented in the plan and README.
