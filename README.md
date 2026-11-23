# Belajar Vibe Coding - REST API

REST API project dibangun menggunakan **Bun**, **ElysiaJS**, **Drizzle ORM**, dan **MySQL**.

## Tech Stack

- **Runtime:** [Bun](https://bun.sh/)
- **Web Framework:** [ElysiaJS](https://elysiajs.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database Driver:** `mysql2`
- **Database:** MySQL

## Struktur Project

```
├── drizzle/              # Generated SQL migrations
├── src/
│   ├── index.ts          # Entry point & Elysia server listener
│   ├── db/
│   │   ├── index.ts      # Database connection (mysql2 + Drizzle)
│   │   └── schema.ts     # Drizzle schema definitions (Users table)
│   └── routes/
│       ├── index.ts      # Main router
│       └── users.ts      # CRUD routes untuk /users
├── test/
│   └── api.test.ts       # Test endpoint dengan bun:test
├── .env.example          # Template konfigurasi environment
├── drizzle.config.ts     # Konfigurasi Drizzle Kit
├── package.json
└── tsconfig.json
```

## Memulai

### 1. Salin Environment

```bash
cp .env.example .env
```
Sesuaikan konfigurasi host, port, user, password, dan nama database di `.env`.

### 2. Database Migration

Generate dan jalankan migrasi database ke MySQL:

```bash
# Generate file migrasi baru dari schema
bun run db:generate

# Push schema langsung ke database
bun run db:push
```

### 3. Menjalankan Server

```bash
# Development mode (dengan hot reload)
bun run dev

# Production mode
bun run start
```

Server default berjalan di `http://localhost:3000`.

### 4. Menjalankan Test

```bash
bun test
```

## API Endpoints

| Method | Endpoint | Keterangan |
|---|---|---|
| `GET` | `/` | Health check / Welcome message |
| `GET` | `/users` | List semua user |
| `GET` | `/users/:id` | Detail user berdasarkan ID |
| `POST` | `/users` | Buat user baru (`{ name, email }`) |
| `PUT` | `/users/:id` | Update data user |
| `DELETE` | `/users/:id` | Hapus user berdasarkan ID |
