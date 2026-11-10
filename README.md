# maahirahmed.com

Personal site: portfolio, university and production pages, a candidate page, and a
small CTF for people who open dev tools. Content is edited at `/admin` and stored in
Postgres; nothing content-related is hardcoded in components.

## Stack

Next.js (App Router, JavaScript), Prisma 7 on Postgres, plain CSS. No UI framework.

## Running it

```bash
cp .env.example .env        # fill in the three values it explains
docker compose up -d --build
```

The container runs `prisma db push` and the seed on every start; the seed only fills
tables that are empty, so redeploys never overwrite `/admin` edits.

Local development:

```bash
npm install
npm run dev                 # needs DATABASE_URL pointing at a Postgres
npm test                    # node --test over src/lib
npm run lint
```

## Deploying

Pushing `main` runs tests, lint and a build on GitHub's runners, then a self-hosted
runner on the box rebuilds the stack (`.github/workflows/deploy.yml`). Secrets live in
the deploy directory's `.env` on the server, never in git.

## Layout

    src/app            routes; /admin is the editor, /api/ctf the CTF backend
    src/components     page components (shared shell in shared/PageShell.jsx)
    src/lib            auth, content loading, CTF logic — tested in *.test.mjs
    prisma             schema and the fill-only-when-empty seed
