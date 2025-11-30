# E-Commerce Product Catalogue Frontend

**ELECTROCO** is a production-grade e-commerce product catalog: a Next.js (App Router) + TypeScript frontend paired with a Django REST Framework backend. The repository contains the frontend application. It focuses on fast product browsing, filtering, search, sorting, pagination, and JWT-based authentication.

---

## Key Features

- Browse products with pagination and responsive product grid
- Dynamic filtering by category, price range, and reviews
- Search functionality in name and description
- Sorting by price, rating, and newest
- JWT authentication (login / register / refresh) and global auth state
- Product detail pages with image galleries and reviews
- Reusable UI components and Redux Toolkit state management

---

## Tech Stack

- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS
- State: Redux Toolkit
- HTTP: Axios
- Backend (API): Django REST Framework + SimpleJWT (separate repo)
- Dev tooling: ESLint, TypeScript, Prettier

---

## Quickstart (Frontend)

Prerequisites

- Node.js 18+ and npm or yarn
- API backend running (see backend README in the backend repo)

Install dependencies

```bash
cd ecom_frontend
npm install
# or
# yarn
```

Run the development server

```bash
npm run dev
# opens at http://localhost:3000 by default
```

Build for production

```bash
npm run build
npm run start
```

Type-check and lint

```bash
npm run type-check
npm run lint
```

---

## Environment Variables

Create a `.env.local` in the `ecom_frontend` root (or set these in your environment):

- `NEXT_PUBLIC_API_URL` — URL to the backend API (e.g. `http://localhost:8000/api`)

Example `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Notes

- The backend is expected to manage real JWT secrets and httpOnly cookies for production security.
- Do not commit `.env.local` to source control.

---

## Project Structure (frontend)

- `src/app/` — Next.js App Router pages and layout
- `src/components/` — Reusable UI components (products, auth, common, ui)
- `src/lib/` — API clients, helpers, and types
- `src/store/` — Redux slices and store wiring

---

## Authentication Flow (high level)

- User logs in via API → backend returns access & refresh tokens
- Frontend stores tokens according to app config (prefer httpOnly cookies)
- `authSlice` in Redux holds `isAuthenticated`, `user`, and token state
- Axios client attaches the access token to requests and handles refresh

---

## Filtering, Search & Sorting

The product listing supports URL query parameters so pages are shareable and bookmarkable:

- `?search=` — keyword search
- `?category=` — category id
- `?min_price=` / `?max_price=` — price range
- `?ordering=` — ordering fields (e.g., `-price` for descending)
- `?page=` — pagination

---

## CI / Deployment Notes

- CI typically runs lint, type-check, and `next build`.
- For production, the monorepo uses a Docker multi-stage build. Adjust environment variables for production API endpoints.

## Live sites / Deployments

- **Staging:** [https://ecom-staging.sakachris.com](https://ecom-staging.sakachris.com)
- **Production:** [https://ecom.sakachris.com](https://ecom.sakachris.com)

This project is automatically deployed:

- Push to the `staging` branch → deploys to the **staging** site above.
- Push to the `main` branch → deploys to the **production** site above.

Common env vars for CI/CD

- `REGISTRY_USER`, `REGISTRY_TOKEN`, `IMAGE_NAME`, `GITHUB_REF_NAME`

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- Fork and create a branch: `git checkout -b feature/your-feature`
- Follow code formatting and lint rules
- Add tests if you add significant logic
- Open a Pull Request and ensure CI passes

Please keep commits logical and small for easier review.

---

## Troubleshooting

- 500s from the frontend usually indicate the backend API is not reachable or misconfigured `NEXT_PUBLIC_API_URL`.
- Check browser console and network tab for failing API calls.
- Run `npm run lint` and `npm run type-check` to surface common issues early.

---

## License

MIT License © 2025 Chrispine

---

## Contact

Chris Saka - sakachris90@gmail.com

Project Link: https://github.com/sakachris/ecom_frontend

---
