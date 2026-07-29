# Pracofi

Pracofi is a React application built with Vite and tested with Vitest.

## Requirements

- Node.js 20.19 or newer (Node.js 22.12+ is also supported)
- npm

## Environment

Copy `.env.example` to `.env` and configure the `VITE_*` values for your
environment. Only variables prefixed with `VITE_` are exposed to browser code.

## Available scripts

- `npm run dev` starts the Vite development server.
- `npm start` is an alias for the development server.
- `npm run build` creates a production build in `dist`.
- `npm run preview` serves the production build locally.
- `npm test` starts Vitest in watch mode.
- `npm run test:run` runs the test suite once.
