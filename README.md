# DichBox

<p align="center">
  <a target="blank"><img src="https://raw.githubusercontent.com/Andrew1407/DichBox/main/client/src/styles/imgs/full-logo.png" width="140" alt="DichBox Logo" /></a>
</p>

Storage web-service for editing boxes (storages) and their entries.

**Components**:
  + [container](#container)
  + [server](https://github.com/Andrew1407/DichBox/tree/main/server)
  + [browser client](https://github.com/Andrew1407/DichBox/tree/main/client)
  + [mobile client](https://github.com/Andrew1407/DichBoxMobile)

---

## Showcase

A static demo of the browser client is published to GitHub Pages
(`.github/workflows/pages.yml`): https://andrew1407.github.io/DichBox/

It runs the full client UI without a server: API requests are answered by an
in-browser imitation (`client/src/demo`), with two demo users (the first one is
signed in) and seeded boxes with text files and images. All data lives in memory,
so reloading the page restores the initial state.

Build/run it locally (Node.js 26):
> cd client && npm ci && npm run build:demo   # output: client/demo-dist

> cd client && npm run start:demo

---

## Container

### Setup

To run DichBox using docker-compose create environment file with fields:
  + **PORT** - app server port
  + **DB_USERNAME** - database owner
  + **DB_PASSWD** - user's password
  + **DB_NAME** - database name

Run test container (and database one) with specified environment file:
> docker-compose -f docker-compose.test.yaml --env-file [environment file path] up --exit-code-from test; docker container rm dichbox_test_1 && docker rmi dichbox_test:latest

For example (using .env file from the server):
> docker-compose -f docker-compose.test.yaml --env-file ./server/.env.example up --exit-code-from test; docker container rm dichbox_test_1 && docker rmi dichbox_test:latest

---

Run docker-compose with specified environment file:
> docker-compose --env-file [environment file path] up

For example (using .env file from the server):
> docker-compose --env-file ./server/.env.example up

### Versions

**1.0.0** (server v2.0.0, browser client v1.0.1):
  + database and app services;
  + container test;
  + github workflows;
  + documentation;
