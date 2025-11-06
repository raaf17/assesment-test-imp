# Post Management Application

Full-stack Post Management System dengan Laravel 12 (Backend API) dan Next.js 16 App Router (Frontend).

## 🚀 Features

### Backend (Laravel)

- RESTful API dengan JWT Authentication
- Service Layer Architecture
- Eloquent ORM dengan Relationships
- Form Request Validation
- Database Seeding
- Clean Code & SOLID Principles

### Frontend (Next.js)

- Next.js 16 App Router
- TypeScript
- TailwindCSS + DaisyUI
- React Hook Form + Zod Validation
- JWT Authentication
- Responsive Design

### Infrastructure

- Docker Compose orchestration
- MySQL 8.0 Database
- Nginx Reverse Proxy (optional)
- Auto-migration & seeding

## 📋 Prerequisites

- Docker & Docker Compose
- Git

**OR untuk development tanpa Docker:**

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+

## 🐳 Quick Start dengan Docker

### 1. Clone Repository

```bash
git clone <repository-url>
cd post-management-app
```

### 2. Setup Environment Files

**Backend:**

```bash
cd backend
cp .env.example .env
cd ..
```

**Frontend:**

```bash
cd frontend
cp .env.local.example .env.local
cd ..
```

### 3. Build & Run dengan Docker Compose

```bash
docker-compose up -d --build
```

Proses ini akan:

- Build Laravel & Next.js containers
- Setup MySQL database
- Run migrations & seeders
- Start semua services

### 4. Access Applications

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Nginx (if enabled)**: http://localhost

### 5. Demo Login

```bash
Email: john@example.com
Password: password123

atau

Email: admin@example.com
Password: admin123
```

## 💻 Development tanpa Docker

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret

# Setup database di .env
# DB_HOST=127.0.0.1
# DB_DATABASE=post_management
# DB_USERNAME=root
# DB_PASSWORD=your_password

php artisan migrate:fresh --seed
php artisan serve
```

Backend running di: http://localhost:8000

### Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api

npm run dev
```

Frontend running di: http://localhost:3000

## 📁 Project Structure

```md
post-management-app/
├── backend/              # Laravel 12 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/API/
│   │   │   └── Requests/
│   │   ├── Models/
│   │   └── Services/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   ├── Dockerfile
│   └── README.md
│
├── frontend/             # Next.js 16 App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   └── (dashboard)/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── Dockerfile
│   └── README.md
│
├── nginx/
│   └── nginx.conf
│
├── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

### Authentication

```bash
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
POST   /api/auth/logout      - Logout user (protected)
GET    /api/auth/me          - Get current user (protected)
POST   /api/auth/refresh     - Refresh JWT token (protected)
```

### Posts (Protected)

```bash
GET    /api/posts            - Get all posts (paginated)
GET    /api/posts/{id}       - Get single post
POST   /api/posts            - Create new post
PUT    /api/posts/{id}       - Update post (owner only)
DELETE /api/posts/{id}       - Delete post (owner only)
```

## 🧪 Testing API dengan cURL

### Register

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
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

### Get Posts (with token)

```bash
curl -X GET http://localhost:8000/api/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🛠️ Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up -d --build

# Access backend container
docker exec -it post_management_backend bash

# Access frontend container
docker exec -it post_management_frontend sh

# Access MySQL
docker exec -it post_management_mysql mysql -u root -p

# Reset database
docker-compose exec backend php artisan migrate:fresh --seed
```

## 🔧 Maintenance Commands

### Backend (Laravel)

```bash
# Clear cache
docker-compose exec backend php artisan cache:clear
docker-compose exec backend php artisan config:clear
docker-compose exec backend php artisan route:clear

# Run migrations
docker-compose exec backend php artisan migrate

# Seed database
docker-compose exec backend php artisan db:seed

# Generate new JWT secret
docker-compose exec backend php artisan jwt:secret
```

### Frontend (Next.js)

```bash
# Rebuild
docker-compose exec frontend npm run build

# Clear cache
docker-compose exec frontend rm -rf .next
```

## 🔒 Security Considerations

### Production Deployment

1. **Environment Variables**

   - Change all default passwords
   - Generate strong JWT secret
   - Use production database credentials
   - Set `APP_DEBUG=false` in Laravel
2. **CORS Configuration**

   - Configure allowed origins in Laravel
   - Update frontend API URL
3. **HTTPS**

   - Use SSL certificates
   - Configure Nginx for HTTPS
   - Update all URLs to https://
4. **Database**

   - Use strong passwords
   - Restrict database access
   - Regular backups
5. **Docker**

   - Use production-optimized Dockerfiles
   - Implement proper secrets management
   - Regular security updates

## ⚡ Performance Optimization

### Backend

- Database indexing (sudah implemented)
- Query optimization dengan eager loading
- API response caching
- Rate limiting (dapat dikonfigurasi)

### Frontend

- Next.js automatic code splitting
- Image optimization
- Server Components untuk data fetching
- Client Components hanya untuk interactivity

### Infrastructure

- Nginx caching
- Database connection pooling
- Container resource limits

## 🐛 Troubleshooting

### Database Connection Failed

```bash
# Check MySQL status
docker-compose ps mysql

# View MySQL logs
docker-compose logs mysql

# Restart MySQL
docker-compose restart mysql
```

### Backend API Not Responding

```bash
# Check backend logs
docker-compose logs backend

# Restart backend
docker-compose restart backend

# Access container and check
docker exec -it post_management_backend bash
php artisan config:clear
```

### Frontend Build Issues

```bash
# Rebuild frontend
docker-compose up -d --build frontend

# Check logs
docker-compose logs frontend
```

### Port Already in Use

```bash
# Check ports
lsof -i :3000
lsof -i :8000
lsof -i :3306

# Change ports in docker-compose.yml
```

## 📊 **ARCHITECTURE DIAGRAM**

```bash
┌─────────────────────────────────────────────────────────┐
│                     NGINX (Port 80)                      │
│                   Reverse Proxy Layer                    │
└────────────┬───────────────────────────┬─────────────────┘
             │                           │
             ├───── Frontend Routes      └───── API Routes
             │      (/)                         (/api)
             │                                  │
   ┌─────────▼────────────┐         ┌──────────▼────────────┐
   │   Next.js Frontend   │         │   Laravel Backend    │
   │   (Port 3000)        │◄────────┤   (Port 8000)        │
   │                      │   JWT   │                      │
   │  - App Router        │  Auth   │  - RESTful API       │
   │  - TypeScript        │         │  - JWT Auth          │
   │  - TailwindCSS       │         │  - Service Layer     │
   │  - DaisyUI           │         │  - Eloquent ORM      │
   └──────────────────────┘         └──────────┬───────────┘
                                              │
                                              │
                                    ┌─────────▼──────────┐
                                    │   MySQL Database   │
                                    │   (Port 3306)      │
                                    │                    │
                                    │  - users           │
                                    │  - posts           │
                                    └────────────────────┘
```

---

## ✅ **CHECKLIST IMPLEMENTASI**

### Backend Laravel ✓

- [X] Authentication (Register, Login, Logout)
- [X] JWT Token implementation
- [X] User model dengan relationships
- [X] Post model dengan relationships
- [X] Migration files
- [X] Database seeder
- [X] Form Request Validation
- [X] Service Layer (AuthService, PostService)
- [X] API Controllers
- [X] RESTful API routes
- [X] Middleware authentication
- [X] CORS configuration
- [X] Error handling
- [X] Dockerfile
- [X] README documentation

### Frontend Next.js ✓

- [X] Authentication pages (Login, Register)
- [X] Protected routes dengan middleware
- [X] Dashboard/Home page
- [X] Posts listing dengan pagination
- [X] Post detail page
- [X] Create post page
- [X] Edit post page
- [X] Navbar component
- [X] PostCard component
- [X] Pagination component
- [X] PostForm component
- [X] API service layer
- [X] Auth utilities
- [X] TypeScript types
- [X] Form validation (Zod)
- [X] TailwindCSS + DaisyUI styling
- [X] Responsive design
- [X] Error handling
- [X] Loading states
- [X] Dockerfile
- [X] README documentation

### Docker Setup ✓

- [X] docker-compose.yml
- [X] MySQL service
- [X] Backend service configuration
- [X] Frontend service configuration
- [X] Nginx reverse proxy (optional)
- [X] Networks configuration
- [X] Volumes configuration
- [X] Health checks
- [X] Auto-migration & seeding

### Documentation ✓

- [X] Root README dengan quickstart
- [X] Backend README
- [X] Frontend README
- [X] API documentation
- [X] Docker commands
- [X] Troubleshooting guide
- [X] Security considerations
- [X] Performance optimization tips

---

## 💡 **KEY FEATURES & BEST PRACTICES**

### Clean Architecture

- **Separation of Concerns**: Controller → Service → Model
- **Single Responsibility**: Setiap class punya satu tugas spesifik
- **Dependency Injection**: Services di-inject ke controllers

### Security

- **Password Hashing**: Bcrypt untuk password
- **JWT Authentication**: Token-based auth
- **CSRF Protection**: Built-in Laravel
- **Input Validation**: Form Requests & Zod
- **SQL Injection Prevention**: Eloquent ORM

### Performance

- **Database Indexing**: Foreign keys & frequently queried columns
- **Eager Loading**: `with()` untuk prevent N+1 queries
- **Pagination**: Efficient data loading
- **Code Splitting**: Next.js automatic optimization

### Scalability

- **Stateless API**: RESTful design
- **Microservices Ready**: Separated backend & frontend
- **Docker Containers**: Easy horizontal scaling
- **Service Layer**: Business logic separation

---

## 📚 Documentation

- [Laravel Documentation](https://laravel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is open-source and available under the MIT License.

## 👨‍💻 Author

Developed with ❤️ using Laravel, Next.js, and Docker

## 🎯 Roadmap

- [ ] Unit & Integration Tests
- [ ] Image upload for posts
- [ ] Comments system
- [ ] User profiles
- [ ] Search & filtering
- [ ] Tags/categories
- [ ] Social sharing
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics

## ⭐ Support

Jika project ini membantu, berikan ⭐ di repository!