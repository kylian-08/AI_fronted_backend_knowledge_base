import type { BackendItem } from '@/types/catalog'

export const backendRegistry = {
  version: '1.1.0',
  categories: {
    node: {
      name: { 'zh-CN': 'Node.js', 'en-US': 'Node.js' },
      key: 'node',
      items: ['nestjs-crud', 'nestjs-auth', 'express-crud', 'express-middleware'],
    },
    python: {
      name: { 'zh-CN': 'Python', 'en-US': 'Python' },
      key: 'python',
      items: ['fastapi-crud', 'fastapi-auth', 'django-drf'],
    },
    go: {
      name: { 'zh-CN': 'Go', 'en-US': 'Go' },
      key: 'go',
      items: ['gin-crud', 'gin-auth'],
    },
    java: {
      name: { 'zh-CN': 'Java', 'en-US': 'Java' },
      key: 'java',
      items: ['spring-crud', 'spring-security'],
    },
  },
} as const

export const backendItems: BackendItem[] = [
  {
    id: 'nestjs-crud',
    slug: 'nestjs-crud',
    kind: 'backend',
    category: 'node',
    framework: 'nestjs',
    patterns: ['crud', 'rest'],
    status: 'ready',
    title: { 'zh-CN': 'NestJS REST CRUD', 'en-US': 'NestJS REST CRUD' },
    description: {
      'zh-CN': 'NestJS + Prisma 完整 CRUD API 模块模板。',
      'en-US': 'NestJS + Prisma full CRUD API module template.',
    },
    tags: ['nestjs', 'prisma', 'crud', 'rest'],
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'TypeScript'],
    prompt: {
      'zh-CN': `生成 NestJS REST CRUD 模块：

Framework: NestJS 10 + TypeScript strict
ORM: Prisma + PostgreSQL
模块: Users（id, email, name, createdAt）
端点: GET /users, GET /users/:id, POST /users, PATCH /users/:id, DELETE /users/:id
验证: class-validator DTO（CreateUserDto, UpdateUserDto）
错误: 404 Not Found, 409 Conflict（重复 email）
分页: GET /users?page=1&limit=20，返回 { data, total, page, limit }
项目结构:
  src/users/users.module.ts
  src/users/users.controller.ts
  src/users/users.service.ts
  src/users/dto/create-user.dto.ts`,
      'en-US': `Generate NestJS REST CRUD module:

Framework: NestJS 10 + TypeScript strict
ORM: Prisma + PostgreSQL
Module: Users (id, email, name, createdAt)
Endpoints: GET /users, GET /users/:id, POST, PATCH, DELETE
Validation: class-validator DTOs
Errors: 404 Not Found, 409 Conflict (duplicate email)
Pagination: GET /users?page=1&limit=20 → { data, total, page, limit }`,
    },
  },
  {
    id: 'nestjs-auth',
    slug: 'nestjs-auth',
    kind: 'backend',
    category: 'node',
    framework: 'nestjs',
    patterns: ['auth', 'jwt'],
    status: 'ready',
    title: { 'zh-CN': 'NestJS JWT 鉴权', 'en-US': 'NestJS JWT Auth' },
    description: {
      'zh-CN': 'JWT 登录注册 + Guard 保护路由。',
      'en-US': 'JWT sign-up/sign-in with route Guards.',
    },
    tags: ['nestjs', 'jwt', 'auth', 'passport'],
    stack: ['NestJS', 'Passport', 'JWT', 'bcrypt'],
    prompt: {
      'zh-CN': `生成 NestJS JWT 鉴权模块：

Framework: NestJS 10 + @nestjs/passport + @nestjs/jwt
端点: POST /auth/register, POST /auth/login, GET /auth/profile（需 JWT）
密码: bcrypt hash, salt rounds 10
JWT: access token 15min, refresh token 7d（httpOnly cookie）
Guard: JwtAuthGuard 保护 /users/* 路由
DTO: RegisterDto(email, password min 8), LoginDto(email, password)`,
      'en-US': `Generate NestJS JWT Auth module:

Framework: NestJS 10 + @nestjs/passport + @nestjs/jwt
Endpoints: POST /auth/register, POST /auth/login, GET /auth/profile (JWT required)
Password: bcrypt hash, salt rounds 10
JWT: access 15min, refresh 7d (httpOnly cookie)
Guard: JwtAuthGuard on /users/* routes`,
    },
  },
  {
    id: 'fastapi-crud',
    slug: 'fastapi-crud',
    kind: 'backend',
    category: 'python',
    framework: 'fastapi',
    patterns: ['crud', 'async'],
    status: 'ready',
    title: { 'zh-CN': 'FastAPI 异步 CRUD', 'en-US': 'FastAPI Async CRUD' },
    description: {
      'zh-CN': 'FastAPI + SQLAlchemy 2.0 异步 CRUD。',
      'en-US': 'FastAPI + SQLAlchemy 2.0 async CRUD.',
    },
    tags: ['fastapi', 'sqlalchemy', 'async', 'pydantic'],
    stack: ['FastAPI', 'SQLAlchemy', 'Pydantic v2', 'PostgreSQL'],
    prompt: {
      'zh-CN': `生成 FastAPI 异步 CRUD API：

Framework: FastAPI 0.110+ + Python 3.12
ORM: SQLAlchemy 2.0 async + asyncpg
模型: Item(id: UUID, title: str, description: str | None, created_at: datetime)
Schema: Pydantic v2（ItemCreate, ItemUpdate, ItemResponse）
路由: /api/v1/items — 完整 CRUD + 分页
依赖注入: get_db() async session
OpenAPI: 自动生成文档 /docs`,
      'en-US': `Generate FastAPI Async CRUD API:

Framework: FastAPI 0.110+ + Python 3.12
ORM: SQLAlchemy 2.0 async + asyncpg
Model: Item(id UUID, title str, description optional, created_at datetime)
Schema: Pydantic v2 (ItemCreate, ItemUpdate, ItemResponse)
Routes: /api/v1/items — full CRUD + pagination
DI: get_db() async session`,
    },
  },
  {
    id: 'fastapi-auth',
    slug: 'fastapi-auth',
    kind: 'backend',
    category: 'python',
    framework: 'fastapi',
    patterns: ['auth', 'oauth2'],
    status: 'ready',
    title: { 'zh-CN': 'FastAPI OAuth2 鉴权', 'en-US': 'FastAPI OAuth2 Auth' },
    description: {
      'zh-CN': 'OAuth2 Password Bearer + JWT 令牌。',
      'en-US': 'OAuth2 Password Bearer flow with JWT tokens.',
    },
    tags: ['fastapi', 'oauth2', 'jwt'],
    stack: ['FastAPI', 'python-jose', 'passlib'],
    prompt: {
      'zh-CN': `生成 FastAPI OAuth2 鉴权：

Framework: FastAPI + python-jose + passlib[bcrypt]
Flow: OAuth2PasswordBearer + OAuth2PasswordRequestForm
端点: POST /token, GET /users/me
JWT: HS256, exp 30min
依赖: get_current_user() → 401 if invalid
密码哈希: passlib CryptContext(schemes=["bcrypt"])`,
      'en-US': `Generate FastAPI OAuth2 Auth:

Framework: FastAPI + python-jose + passlib[bcrypt]
Flow: OAuth2PasswordBearer + OAuth2PasswordRequestForm
Endpoints: POST /token, GET /users/me
JWT: HS256, exp 30min
Dependency: get_current_user() → 401 if invalid`,
    },
  },
  {
    id: 'express-crud',
    slug: 'express-crud',
    kind: 'backend',
    category: 'node',
    framework: 'express',
    patterns: ['crud', 'mongodb'],
    status: 'ready',
    title: { 'zh-CN': 'Express + MongoDB CRUD', 'en-US': 'Express + MongoDB CRUD' },
    description: {
      'zh-CN': 'Express 中间件链 + Mongoose CRUD。',
      'en-US': 'Express middleware chain with Mongoose CRUD.',
    },
    tags: ['express', 'mongodb', 'mongoose'],
    stack: ['Express', 'Mongoose', 'MongoDB', 'TypeScript'],
    prompt: {
      'zh-CN': `生成 Express + MongoDB CRUD API：

Framework: Express 4 + TypeScript + Mongoose 8
中间件: cors, helmet, express.json(), morgan, errorHandler
模型: Product(name, price, category, stock, timestamps)
路由: /api/products — CRUD + 查询过滤 ?category=&minPrice=
错误处理: 集中 errorHandler middleware，返回 { error, statusCode }
验证: express-validator on POST/PATCH`,
      'en-US': `Generate Express + MongoDB CRUD API:

Framework: Express 4 + TypeScript + Mongoose 8
Middleware: cors, helmet, express.json(), morgan, errorHandler
Model: Product(name, price, category, stock, timestamps)
Routes: /api/products — CRUD + filter ?category=&minPrice=
Error: centralized errorHandler → { error, statusCode }`,
    },
  },
  {
    id: 'express-middleware',
    slug: 'express-middleware',
    kind: 'backend',
    category: 'node',
    framework: 'express',
    patterns: ['middleware', 'logging'],
    status: 'ready',
    title: { 'zh-CN': 'Express 中间件链', 'en-US': 'Express Middleware Chain' },
    description: {
      'zh-CN': '可组合中间件：鉴权、限流、请求日志。',
      'en-US': 'Composable middleware: auth, rate-limit, request logging.',
    },
    tags: ['express', 'middleware', 'rate-limit'],
    stack: ['Express', 'express-rate-limit', 'winston'],
    prompt: {
      'zh-CN': `生成 Express 中间件链模板：

中间件顺序: requestId → logger → rateLimiter → auth → routes → errorHandler
rateLimiter: express-rate-limit 100req/15min per IP
auth: Bearer token 验证 middleware，跳过 /health
logger: winston JSON 格式，含 requestId
health: GET /health → { status: "ok", uptime }`,
      'en-US': `Generate Express Middleware Chain:

Order: requestId → logger → rateLimiter → auth → routes → errorHandler
rateLimiter: express-rate-limit 100req/15min per IP
auth: Bearer token middleware, skip /health
logger: winston JSON with requestId
health: GET /health → { status: "ok", uptime }`,
    },
  },
  {
    id: 'django-drf',
    slug: 'django-drf',
    kind: 'backend',
    category: 'python',
    framework: 'django',
    patterns: ['crud', 'permissions'],
    status: 'ready',
    title: { 'zh-CN': 'Django REST ViewSet', 'en-US': 'Django REST ViewSet' },
    description: {
      'zh-CN': 'DRF ModelViewSet + 权限与分页。',
      'en-US': 'DRF ModelViewSet with permissions and pagination.',
    },
    tags: ['django', 'drf', 'viewset'],
    stack: ['Django', 'DRF', 'PostgreSQL'],
    prompt: {
      'zh-CN': `生成 Django REST Framework ViewSet：

Framework: Django 5 + DRF 3.15
模型: Article(title, content, author FK, published, created_at)
ViewSet: ArticleViewSet(ModelViewSet)
Serializer: ArticleSerializer（嵌套 author 简要信息）
权限: IsAuthenticatedOrReadOnly
分页: PageNumberPagination, page_size=20
过滤: django-filter（title icontains, published）
路由: DefaultRouter → /api/articles/`,
      'en-US': `Generate Django REST ViewSet:

Framework: Django 5 + DRF 3.15
Model: Article(title, content, author FK, published, created_at)
ViewSet: ArticleViewSet(ModelViewSet)
Permissions: IsAuthenticatedOrReadOnly
Pagination: PageNumberPagination, page_size=20
Filter: django-filter (title icontains, published)`,
    },
  },
  {
    id: 'gin-crud',
    slug: 'gin-crud',
    kind: 'backend',
    category: 'go',
    framework: 'gin',
    patterns: ['crud', 'rest'],
    status: 'ready',
    title: { 'zh-CN': 'Gin REST CRUD', 'en-US': 'Gin REST CRUD' },
    description: {
      'zh-CN': 'Gin + GORM 完整 CRUD API 模块。',
      'en-US': 'Gin + GORM full CRUD API module.',
    },
    tags: ['gin', 'gorm', 'crud', 'go'],
    stack: ['Gin', 'GORM', 'PostgreSQL', 'Go 1.22'],
    prompt: {
      'zh-CN': `生成 Gin REST CRUD 模块：

Framework: Gin 1.9 + Go 1.22
ORM: GORM + PostgreSQL
模型: User(ID uint, Email string unique, Name string, CreatedAt time)
路由: GET/POST /api/users, GET/PUT/DELETE /api/users/:id
中间件: RequestID, Logger, Recovery, CORS
响应: 统一 JSON { data, error, meta }
验证: binding tag + 自定义 validator
测试: httptest 覆盖 CRUD  happy path`,
      'en-US': `Generate Gin REST CRUD module:

Framework: Gin 1.9 + Go 1.22, GORM + PostgreSQL
Model: User(ID, Email unique, Name, CreatedAt)
Routes: full CRUD under /api/users
Middleware: RequestID, Logger, Recovery, CORS
Response envelope: { data, error, meta }
Validation: binding tags + custom validators
Tests: httptest for CRUD happy path`,
    },
  },
  {
    id: 'gin-auth',
    slug: 'gin-auth',
    kind: 'backend',
    category: 'go',
    framework: 'gin',
    patterns: ['auth', 'jwt'],
    status: 'ready',
    title: { 'zh-CN': 'Gin JWT 认证', 'en-US': 'Gin JWT Auth' },
    description: {
      'zh-CN': 'Gin JWT 登录/注册/刷新 Token 与鉴权中间件。',
      'en-US': 'Gin JWT login/register/refresh and auth middleware.',
    },
    tags: ['gin', 'jwt', 'auth', 'go'],
    stack: ['Gin', 'jwt-go', 'bcrypt', 'Go 1.22'],
    prompt: {
      'zh-CN': `生成 Gin JWT 认证模块：

端点: POST /auth/register, /auth/login, POST /auth/refresh, GET /auth/me
Token: access 15min + refresh 7d, HttpOnly cookie 或 Bearer header
中间件: AuthRequired 解析 JWT，注入 userID 到 context
密码: bcrypt cost 12
安全: 限流登录, 统一错误码, 不泄露用户是否存在`,
      'en-US': `Generate Gin JWT auth module:

Endpoints: register, login, refresh, me
Tokens: access 15min + refresh 7d, cookie or Bearer
Middleware: AuthRequired with userID in context
Password: bcrypt cost 12
Security: login rate limit, opaque errors`,
    },
  },
  {
    id: 'spring-crud',
    slug: 'spring-crud',
    kind: 'backend',
    category: 'java',
    framework: 'spring',
    patterns: ['crud', 'rest'],
    status: 'ready',
    title: { 'zh-CN': 'Spring Boot REST CRUD', 'en-US': 'Spring Boot REST CRUD' },
    description: {
      'zh-CN': 'Spring Boot 3 + JPA 标准 CRUD REST API。',
      'en-US': 'Spring Boot 3 + JPA standard CRUD REST API.',
    },
    tags: ['spring', 'jpa', 'crud', 'java'],
    stack: ['Spring Boot 3', 'Spring Data JPA', 'PostgreSQL', 'Java 21'],
    prompt: {
      'zh-CN': `生成 Spring Boot REST CRUD：

Framework: Spring Boot 3.2 + Java 21
Entity: Product(id, name, price, stock, createdAt) JPA
Repository: ProductRepository extends JpaRepository
Service: ProductService 事务边界 + 业务校验
Controller: ProductController @RestController /api/products
DTO: 请求/响应分离, @Valid + MethodArgumentNotValidException 处理
分页: Pageable, Sort
OpenAPI: springdoc 注解`,
      'en-US': `Generate Spring Boot REST CRUD:

Spring Boot 3.2 + Java 21, JPA Product entity
Repository + Service + @RestController
DTOs with @Valid, global exception handler
Pagination: Pageable, Sort
OpenAPI via springdoc`,
    },
  },
  {
    id: 'spring-security',
    slug: 'spring-security',
    kind: 'backend',
    category: 'java',
    framework: 'spring',
    patterns: ['auth', 'security'],
    status: 'ready',
    title: { 'zh-CN': 'Spring Security JWT', 'en-US': 'Spring Security JWT' },
    description: {
      'zh-CN': 'Spring Security 6 + JWT 无状态认证配置。',
      'en-US': 'Spring Security 6 stateless JWT authentication.',
    },
    tags: ['spring', 'security', 'jwt', 'java'],
    stack: ['Spring Boot 3', 'Spring Security 6', 'jjwt', 'Java 21'],
    prompt: {
      'zh-CN': `生成 Spring Security JWT 配置：

SecurityFilterChain: 无状态, CSRF 关闭, /api/auth/** permitAll
JwtService: 签发/验证 HS256, claims sub+roles
Filter: JwtAuthFilter 在 UsernamePasswordAuthenticationFilter 之前
UserDetailsService + BCryptPasswordEncoder
端点: register/login 返回 accessToken + refreshToken
异常: 401/403 统一 JSON 错误体`,
      'en-US': `Generate Spring Security JWT setup:

SecurityFilterChain: stateless, CSRF off, auth endpoints public
JwtService: sign/verify HS256 with roles claim
JwtAuthFilter before UsernamePasswordAuthenticationFilter
UserDetailsService + BCrypt
Register/login return access + refresh tokens
401/403 JSON error responses`,
    },
  },
]

export function getBackendById(id: string): BackendItem | undefined {
  return backendItems.find((b) => b.id === id || b.slug === id)
}
