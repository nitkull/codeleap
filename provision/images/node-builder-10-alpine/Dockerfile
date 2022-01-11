# syntax = docker/dockerfile:experimental
# ===== Builder =====
# ===================
FROM node:12.22.6-alpine AS builder

RUN apk --no-cache add \
  g++ make python git \
  && yarn global add node-gyp \
  && rm -rf /var/cache/apk/*
