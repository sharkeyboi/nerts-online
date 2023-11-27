from node:18-slim as base

WORKDIR /app
RUN npm install -g pnpm

FROM base AS dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml  ./
RUN pnpm i

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build

FROM node:18-slim as deploy

WORKDIR /app
COPY --from=build /app/.output/ ./.output/
ENTRYPOINT [ "node", ".output/server/index.mjs"]

