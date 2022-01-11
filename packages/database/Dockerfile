FROM node:12.22.6-alpine AS builder

RUN apk --no-cache add \
  g++ make python git \
  && yarn global add node-gyp \
  && rm -rf /var/cache/apk/*

WORKDIR /app/

ADD packages/database/package.json    packages/database/
ADD package.json                      .
ADD yarn.lock                         .
RUN yarn install --production --pure-lockfile

ADD packages/database packages/database

FROM node:12.22.6-alpine AS image
WORKDIR /app/
COPY --from=builder /app/ .
