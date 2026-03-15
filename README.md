# AI-for-good

## 1) Project overview
`AI-for-good` là project full-stack gồm:
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + MongoDB (thư mục `server/`)

Ứng dụng tập trung vào:
- Bản đồ văn hoá lịch sử (map + marker + info panel + timeline)
- Auth cơ bản (đăng ký / đăng nhập)
- Chatbot gọi backend API (`/api/chat`)

## 2) Project structure

```text
.
├── src/                 # Frontend source (React + TS)
├── public/              # Static assets (ví dụ map images)
├── server/              # Backend Express + MongoDB
│   ├── controllers/
│   ├── models/
│   ├── utils/
│   ├── app.js
│   ├── index.js
│   └── .env.example
├── package.json         # Frontend scripts
├── package-lock.json
└── vite.config.ts       # Vite config + /api proxy
```

## 3) Prerequisites

- Node.js 18+ (khuyến nghị Node 18 hoặc 20)
- npm
- MongoDB (local service hoặc Docker)
- Gemini API key (chỉ bắt buộc nếu muốn dùng chatbot)

## 4) Environment setup

Tạo file env cho backend từ mẫu:

```bash
cp server/.env.example server/.env
```

Ví dụ nội dung `server/.env`:

```env
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/ai-for-good
SECRET=change-this-secret
GEMINI_API_KEY=your_gemini_api_key
```

Lưu ý:
- Nếu không có `GEMINI_API_KEY`, app vẫn chạy được map/auth.
- Chatbot sẽ không hoạt động đúng khi thiếu `GEMINI_API_KEY`.

## 5) MongoDB setup

### Cách 1: MongoDB local
- Cài MongoDB Community Server.
- Bật MongoDB service trước khi chạy backend.

### Cách 2: Docker

```bash
docker run -d --name ai-for-good-mongo -p 27017:27017 mongo:7
```

## 6) Step-by-step run guide

### Step 1 — Clone repository
```bash
git clone <your-repo-url>
cd AI-for-good
```

### Step 2 — Install frontend dependencies (root)
```bash
npm install
```

### Step 3 — Install backend dependencies
```bash
npm install --prefix server
```

### Step 4 — Create backend env file
```bash
cp server/.env.example server/.env
```
Sau đó chỉnh giá trị `MONGODB_URI`, `SECRET`, `GEMINI_API_KEY` theo môi trường của bạn.

### Step 5 — Start MongoDB
- Dùng MongoDB local service hoặc Docker (mục 5).

### Step 6 — Start backend (khuyến nghị)
```bash
npm run server:dev
```
Lệnh này chạy backend ở chế độ watch từ root (`server/index.js`).

### Step 7 — Start frontend (terminal mới)
```bash
npm run dev
```

### Step 8 — Open app in browser
- Mở frontend URL ở mục bên dưới.

## 7) App URLs

- Frontend (Vite): `http://localhost:3000`
- Backend (Express): `http://127.0.0.1:3001`
- Proxy: frontend gọi `/api/*` và Vite sẽ forward sang `http://127.0.0.1:3001` (theo `vite.config.ts`)

## 8) Quick verification checklist

Sau khi chạy app:
- Mở được frontend ở `http://localhost:3000`
- Đăng ký tài khoản mới được
- Đăng nhập được
- Map hiển thị marker và click marker mở info panel
- Timeline và panel hoạt động bình thường
- Chatbot hoạt động khi đã cấu hình `GEMINI_API_KEY`

## 9) Build commands

### Frontend build
```bash
npm run build
```

### Backend syntax check
```bash
cd server
node --check app.js
node --check controllers/users.js
node --check controllers/login.js
node --check controllers/chat.js
node --check utils/middleware.js
```

## 10) Troubleshooting

- MongoDB chưa chạy:
  - Kiểm tra service local hoặc container Docker đang up.
- Thiếu `GEMINI_API_KEY`:
  - Chatbot lỗi hoặc không phản hồi đúng, nhưng map/auth vẫn chạy.
- Port 3000 hoặc 3001 bị bận:
  - Tắt process đang chiếm port hoặc đổi port phù hợp.
- Quên tạo `server/.env`:
  - Backend sẽ thiếu config và có thể không khởi động đúng.
- Chưa cài dependencies:
  - Chạy lại `npm install` và `npm install --prefix server`.

## 11) Windows note

- Nếu dùng Windows và không có lệnh `cp`, hãy copy `server/.env.example` thành `server/.env` bằng File Explorer hoặc PowerShell.

## 12) Submission cleanliness note

Khi nộp source, không nên kèm:
- `node_modules/`
- `server/node_modules/`
- `.git/`
- `build/`, `dist/`
- `__MACOSX/`
