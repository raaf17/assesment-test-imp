# Post Management API - Laravel

RESTful API untuk Post Management System menggunakan Laravel 11 dengan JWT Authentication.

## 🚀 Features

- JWT Authentication (Register, Login, Logout, Refresh)
- Post CRUD Operations
- Service Layer Architecture
- Form Request Validation
- Eloquent ORM with Relationships
- Database Seeding
- Clean Code & SOLID Principles

## 📋 Requirements

- PHP 8.2+
- Composer
- MySQL 8.0+
- Laravel 11

## ⚙️ Installation

### 1. Clone & Install Dependencies
```bash
cd backend
composer install
```

### 2. Environment Setup
```bash
cp .env.example .env
php artisan key:generate
```

Update `.env` dengan database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=post_management
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 3. JWT Setup
```bash
php artisan jwt:secret
```

### 4. Database Migration & Seeding
```bash
php artisan migrate:fresh --seed
```

### 5. Run Development Server
```bash
php artisan serve
```

API akan berjalan di `http://localhost:8000`

## 🧪 Demo Credentials
```
Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123

Email: admin@example.com
Password: admin123
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get authenticated user |
| POST | `/api/auth/refresh` | Refresh JWT token |

### Posts (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts (paginated) |
| GET | `/api/posts/{id}` | Get single post |
| POST | `/api/posts` | Create new post |
| PUT/PATCH | `/api/posts/{id}` | Update post |
| DELETE | `/api/posts/{id}` | Delete post |

## 📝 Request Examples

### Register
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Posts
```bash
curl -X GET http://localhost:8000/api/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Post
```bash
curl -X POST http://localhost:8000/api/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Post",
    "content": "This is the post content..."
  }'
```

## 🏗️ Architecture
```
app/
├── Http/
│   ├── Controllers/API/    # API Controllers
│   ├── Requests/           # Form Request Validation
│   └── Middleware/         # Custom Middleware
├── Models/                 # Eloquent Models
└── Services/               # Business Logic Layer
```

### Design Patterns

- **Service Layer Pattern**: Memisahkan business logic dari controller
- **Repository Pattern**: Abstraksi database operations
- **Dependency Injection**: Meningkatkan testability
- **Form Request Validation**: Validasi terpusat dan reusable

## 🔒 Security Features

- Password hashing dengan bcrypt
- JWT token authentication
- CSRF protection
- SQL injection prevention via Eloquent ORM
- XSS protection via input validation
- Rate limiting (can be configured)

## 🎯 Performance Optimization

- Eager loading relationships (`with()`)
- Database indexing pada foreign keys
- Pagination untuk large datasets
- Query optimization dengan scopes

## 📚 Additional Commands
```bash
# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Run tests (if implemented)
php artisan test

# Database refresh
php artisan migrate:fresh --seed
```

## 🐛 Troubleshooting

### JWT Token Issues
```bash
php artisan jwt:secret
php artisan config:cache
```

### Database Connection Issues
- Pastikan MySQL service running
- Check credentials di `.env`
- Verify database exists

### Permission Issues
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

## 📖 Documentation

- [Laravel Documentation](https://laravel.com/docs)
- [JWT Auth Package](https://jwt-auth.readthedocs.io/)
- [API Best Practices](https://restfulapi.net/)
```

---

# 🔵 **FRONTEND - NEXT.JS APP ROUTER**

## **1. Struktur Folder Next.js**
```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── posts/
│   │   │       ├── page.tsx
│   │   │       ├── [id]/
│   │   │       │   └── page.tsx
│   │   │       ├── create/
│   │   │       │   └── page.tsx
│   │   │       └── edit/
│   │   │           └── [id]/
│   │   │               └── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Navbar.tsx
│   │   │   ├── PostCard.tsx
│   │   │   └── Pagination.tsx
│   │   └── forms/
│   │       └── PostForm.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── public/
├── .env.local
├── Dockerfile
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md