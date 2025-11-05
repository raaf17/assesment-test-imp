# Post Management Frontend - Next.js 14

Modern, responsive frontend untuk Post Management System menggunakan Next.js 14 App Router, TypeScript, TailwindCSS, dan DaisyUI.

## 🚀 Features

- Next.js 14 dengan App Router
- TypeScript untuk type safety
- TailwindCSS + DaisyUI untuk styling
- JWT Authentication dengan Cookies
- React Hook Form + Zod validation
- Axios untuk API calls
- Responsive design
- Clean Architecture

## 📋 Requirements

- Node.js 18+
- npm atau yarn
- Backend API running

## ⚙️ Installation

### 1. Clone & Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Setup
```bash
cp .env.local.example .env.local
```

Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Run Development Server
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm start
```

## 🧪 Demo Credentials
```
Email: john@example.com
Password: password123
```

## 📁 Project Structure
```
src/
├── app/
│   ├── (auth)/          # Authentication pages (login, register)
│   ├── (dashboard)/     # Protected dashboard pages
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/
│   ├── ui/              # Reusable UI components
│   └── forms/           # Form components
├── lib/
│   ├── api.ts           # API service layer
│   ├── auth.ts          # Authentication utilities
│   └── utils.ts         # Helper functions
└── types/
    └── index.ts         # TypeScript types
```

## 🎨 Pages

### Public Pages
- `/login` - User login
- `/register` - User registration

### Protected Pages
- `/` - Homepage/Dashboard
- `/posts` - All posts (paginated)
- `/posts/[id]` - Post detail
- `/posts/create` - Create new post
- `/posts/edit/[id]` - Edit post

## 🏗️ Architecture

### Route Groups
- `(auth)` - Public authentication pages
- `(dashboard)` - Protected pages with navbar

### API Integration
```typescript
// src/lib/api.ts
- Axios instance dengan interceptors
- Automatic token injection
- Error handling
- Response transformation
```

### Authentication Flow
```typescript
// src/lib/auth.ts
- Token management (Cookies)
- User data (LocalStorage)
- Auth state checking
- Logout functionality
```

### Form Validation
```typescript
// React Hook Form + Zod
- Type-safe validation
- Real-time error display
- Clean form state management
```

## 🎯 Features Detail

### Authentication
- JWT token stored in httpOnly cookies
- User data in localStorage
- Automatic redirect on unauthorized access
- Protected routes with middleware

### Posts Management
- CRUD operations
- Pagination
- Owner-only edit/delete
- Rich post detail view
- Responsive post cards

### UI/UX
- DaisyUI components
- Responsive design (mobile-first)
- Loading states
- Error handling
- Toast notifications

## 🔒 Security

- JWT token in httpOnly cookies
- CSRF protection
- XSS prevention
- Input validation with Zod
- API request interceptors
- Automatic token refresh

## 📚 Key Technologies

### Core
- Next.js 14 (App Router)
- TypeScript
- React 18

### Styling
- TailwindCSS
- DaisyUI

### State & Forms
- React Hook Form
- Zod

### HTTP Client
- Axios

### Storage
- js-cookie (tokens)
-