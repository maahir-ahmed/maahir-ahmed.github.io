FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json prisma.config.mjs ./
COPY prisma ./prisma
# postinstall runs `prisma generate`, which only needs a syntactically valid URL
RUN DATABASE_URL=postgresql://placeholder npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
# node, not root: db push and the seed only talk to Postgres, and next's cache
# writes stay under /app, which node owns.
COPY --from=build --chown=node:node /app ./
USER node
EXPOSE 3000
# db push keeps the schema current; the seed only fills tables that are empty,
# so redeploys never overwrite content edited in /admin.
CMD ["sh", "-c", "npx prisma db push && node prisma/seed.mjs && npm start"]
