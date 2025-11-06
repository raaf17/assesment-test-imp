# Post Management Application

A full-stack **Post Management System** built with **Laravel 12 (Backend API)** and **Next.js 16 App Router (Frontend)**.


## 🚀 Features

### Backend (Laravel)

* RESTful API with JWT Authentication
* Service Layer Architecture
* Eloquent ORM with Relationships
* Form Request Validation
* Database Seeding
* Clean Code & SOLID Principles

### Frontend (Next.js)

* Next.js 16 App Router
* TypeScript
* TailwindCSS + DaisyUI
* React Hook Form + Zod Validation
* JWT Authentication
* Responsive Design

### Infrastructure

* Docker Compose orchestration
* MySQL 8.0 Database
* Nginx Reverse Proxy (optional)
* Auto-migration & seeding


## 📋 Prerequisites

* Docker & Docker Compose
* Git

**OR for development without Docker:**

* PHP 8.2+
* Composer
* Node.js 18+
* MySQL 8.0+


## 🐳 Quick Start with Docker

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

### 3. Build & Run with Docker Compose

```bash
docker-compose up -d --build
```

This will:

* Build Laravel & Next.js containers
* Setup MySQL database
* Run migrations & seeders
* Start all services

### 4. Access Applications

* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **Backend API**: [http://localhost:8000/api](http://localhost:8000/api)
* **Nginx (if enabled)**: [http://localhost](http://localhost)

### 5. Demo Login

```bash
Email: john@example.com
Password: password123

or

Email: admin@example.com
Password: admin123
```


## 💻 Development Without Docker

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret

# Setup database in .env
# DB_HOST=127.0.0.1
# DB_DATABASE=post_management
# DB_USERNAME=root
# DB_PASSWORD=your_password

php artisan migrate:fresh --seed
php artisan serve
```

Backend running at: [http://localhost:8000](http://localhost:8000)

### Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api

npm run dev
```

Frontend running at: [http://localhost:3000](http://localhost:3000)


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


## 🧪 Testing API with cURL

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

   * Change all default passwords
   * Generate strong JWT secret
   * Use production database credentials
   * Set `APP_DEBUG=false` in Laravel

2. **CORS Configuration**

   * Configure allowed origins in Laravel
   * Update frontend API URL

3. **HTTPS**

   * Use SSL certificates
   * Configure Nginx for HTTPS
   * Update all URLs to `https://`

4. **Database**

   * Use strong passwords
   * Restrict database access
   * Schedule regular backups

5. **Docker**

   * Use production-optimized Dockerfiles
   * Implement proper secrets management
   * Perform regular security updates


## ⚡ Performance Optimization

### Backend

* Database indexing (implemented)
* Query optimization with eager loading
* API response caching
* Rate limiting (configurable)

### Frontend

* Next.js automatic code splitting
* Image optimization
* Server Components for data fetching
* Client Components only for interactivity

### Infrastructure

* Nginx caching
* Database connection pooling
* Container resource limits


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

# Access container and clear config
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


## 📊 **Architecture Diagram**

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


## ✅ **Implementation Checklist**

### Backend Laravel ✓

* [x] Authentication (Register, Login, Logout)
* [x] JWT Token implementation
* [x] User model with relationships
* [x] Post model with relationships
* [x] Migration files
* [x] Database seeder
* [x] Form Request Validation
* [x] Service Layer (AuthService, PostService)
* [x] API Controllers
* [x] RESTful API routes
* [x] Middleware authentication
* [x] CORS configuration
* [x] Error handling
* [x] Dockerfile
* [x] README documentation

### Frontend Next.js ✓

* [x] Authentication pages (Login, Register)
* [x] Protected routes with middleware
* [x] Dashboard/Home page
* [x] Posts listing with pagination
* [x] Post detail page
* [x] Create post page
* [x] Edit post page
* [x] Navbar component
* [x] PostCard component
* [x] Pagination component
* [x] PostForm component
* [x] API service layer
* [x] Auth utilities
* [x] TypeScript types
* [x] Form validation (Zod)
* [x] TailwindCSS + DaisyUI styling
* [x] Responsive design
* [x] Error handling
* [x] Loading states
* [x] Dockerfile
* [x] README documentation

### Docker Setup ✓

* [x] docker-compose.yml
* [x] MySQL service
* [x] Backend configuration
* [x] Frontend configuration
* [x] Nginx reverse proxy (optional)
* [x] Networks & volumes
* [x] Health checks
* [x] Auto-migration & seeding


## 💡 **Key Features & Best Practices**

### Clean Architecture

* **Separation of Concerns**: Controller → Service → Model
* **Single Responsibility**: Each class has one purpose
* **Dependency Injection**: Services injected into controllers

### Security

* Password Hashing with Bcrypt
* JWT-based Authentication
* CSRF Protection (Laravel built-in)
* Input Validation (Form Requests & Zod)
* SQL Injection Prevention (Eloquent ORM)

### Performance

* Database Indexing (FK & frequent queries)
* Eager Loading with `with()`
* Pagination for data efficiency
* Automatic code splitting (Next.js)

### Scalability

* Stateless RESTful API
* Backend & Frontend separation
* Dockerized for horizontal scaling
* Service Layer for business logic


## 📚 Documentation

* [Laravel Docs](https://laravel.com/docs)
* [Next.js Docs](https://nextjs.org/docs)
* [Docker Docs](https://docs.docker.com)
* [TailwindCSS Docs](https://tailwindcss.com/docs)
* [DaisyUI Components](https://daisyui.com/components/)


## 🤝 Contributing

1. Fork this project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📝 License

This project is open-source and licensed under the **MIT License**.


## 👨‍💻 Author

Developed with ❤️ using **Laravel**, **Next.js**, and **Docker**.


## ⭐ Support

If this project helps you, please give it a ⭐ on the repository!