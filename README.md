# AI-for-good

A single-product repository gồm:
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + MongoDB (đặt tại `server/`)

## Project structure

```text
.
├── public/
├── server/
│   ├── app.js
│   ├── index.js
│   ├── controllers/
│   ├── models/
│   ├── utils/
│   └── .env.example
├── src/
│   ├── app/
│   ├── features/
│   ├── shared/
│   └── styles/
├── package.json
└── vite.config.ts
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB đang chạy (local hoặc remote)

## Install

Frontend dependencies (root):

```bash
npm install
```

Backend dependencies:

```bash
npm install --prefix server
```

## Run

Chạy backend:

```bash
npm run server
```

Hoặc dev mode backend:

```bash
npm run server:dev
```

Chạy frontend:

```bash
npm run dev
```

Build frontend:

```bash
npm run build
```

## Backend environment

Copy file mẫu:

```bash
cp server/.env.example server/.env
```

Biến môi trường chính:
- `PORT` (default `3001`)
- `MONGODB_URI`
- `SECRET`
- `GEMINI_API_KEY`

## API proxy

Frontend gọi `/api/*` và được proxy qua backend tại `http://127.0.0.1:3001` (xem `vite.config.ts`).

## Generated folders (không commit)

- `node_modules/`
- `build/`
- `dist/`
- `__MACOSX/`
- `server/.env`

## Lockfile note

Repo hiện có cả `package-lock.json` và `pnpm-lock.yaml` từ lịch sử dự án.
Package manager chính đang dùng trong workflow hiện tại là `npm`.
