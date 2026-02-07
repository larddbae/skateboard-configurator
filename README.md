# 🛹 Skateboard AI Configurator

A full-stack custom skateboard builder with AI-powered style recommendations, built with **Next.js 15** and **Laravel 11**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Laravel](https://img.shields.io/badge/Laravel-11-red?logo=laravel)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwind-css)

## ✨ Features

- 🎨 **3D Skateboard Configurator** - Real-time preview with Three.js
- 🤖 **AI Style Assistant** - Get personalized recommendations via OpenRouter AI
- 👤 **User Authentication** - Register, login, and manage your account
- 💾 **My Garage** - Save and load your custom skateboard designs
- 🛒 **Checkout & Orders** - Complete order flow with history
- 📱 **Responsive Design** - Works on desktop and mobile

## 🏗️ Tech Stack

### Frontend (`/skateboard-frontend`)
- Next.js 15 (App Router, Turbopack)
- React 19 + TypeScript
- Three.js / React Three Fiber
- TailwindCSS
- Vercel AI SDK + OpenRouter

### Backend (`/skateboard-backend`)
- Laravel 11
- Laravel Sanctum (API Authentication)
- MySQL / SQLite
- RESTful API

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PHP 8.2+
- Composer
- MySQL (or SQLite)

### Backend Setup

```bash
cd skateboard-backend

# Install dependencies
composer install

# Configure environment
cp .env.example .env
php artisan key:generate

# Setup database
php artisan migrate --seed

# Start server
php artisan serve
```

### Frontend Setup

```bash
cd skateboard-frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Start dev server
npm run dev
```

### Environment Variables

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
OPENROUTER_API_KEY=your_openrouter_key
```

**Backend** (`.env`):
```env
DB_CONNECTION=mysql
DB_DATABASE=skateboard_db
SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

## 📁 Project Structure

```
skateboard-configurator/
├── skateboard-frontend/     # Next.js frontend
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # React components
│   │   ├── context/        # React contexts
│   │   └── lib/            # Utilities & API
│   └── public/             # Static assets
│
└── skateboard-backend/      # Laravel backend
    ├── app/
    │   ├── Http/Controllers/Api/
    │   └── Models/
    ├── database/migrations/
    └── routes/api.php
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/user` | Get current user |
| GET | `/api/parts` | Get all skateboard parts |
| GET | `/api/saved-designs` | Get user's saved designs |
| POST | `/api/saved-designs` | Save a new design |
| DELETE | `/api/saved-designs/{id}` | Delete a design |
| POST | `/api/checkout` | Create an order |
| GET | `/api/orders` | Get user's orders |

## 📸 Screenshots

> Coming soon

## 📝 License

This project is for educational purposes.

## 👤 Author

**larddbae**

---

⭐ Star this repo if you found it helpful!
