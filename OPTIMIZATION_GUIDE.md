# Aura Weds - Optimization & Improvements Guide

**Date**: June 12, 2026  
**Version**: 1.0  
**Priority**: Organized by impact and urgency

---

## 📋 Table of Contents

1. [Architecture & Database](#1-architecture--database)
2. [Backend Optimizations](#2-backend-optimizations)
3. [Frontend Optimizations](#3-frontend-optimizations)
4. [Security Enhancements](#4-security-enhancements)
5. [Testing & Quality](#5-testing--quality)
6. [Performance & Caching](#6-performance--caching)
7. [Monitoring & Logging](#7-monitoring--logging)
8. [DevOps & Deployment](#8-devops--deployment)

---

## 1. Architecture & Database

### 1.1 Consolidate Database Strategy (HIGH PRIORITY)

**Current Problem**: Supporting 3 databases (MongoDB, MySQL, Postgres) creates:
- Code duplication across `db.mongo.ts`, `db.mysql.ts`, `db.postgres.ts`
- Maintenance overhead for migrations and schema updates
- Unclear which is the production database

**Recommendation**: Standardize on **PostgreSQL** (most reliable for relational matrimony data)

**Action Items**:

```typescript
// backend/src/config/database.ts - SINGLE SOURCE OF TRUTH
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
```

**Benefits**:
- Single migration strategy
- Reduced codebase (remove Mongoose entirely)
- Better transaction support
- Easier to scale

**Migration Path**:
1. Week 1: Create Postgres migration scripts from current MySQL/Mongo schemas
2. Week 2: Run parallel deployment (both DBs active)
3. Week 3: Sunset MongoDB and MySQL
4. Week 4: Cleanup old database code

---

### 1.2 Reorganize Backend Structure (MEDIUM PRIORITY)

**Current**: Flat controller/model structure mixed with multiple database implementations

**Proposed Structure**:

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts          (single DB config)
│   │   ├── env.ts               (environment validation)
│   │   └── server.ts            (server config)
│   ├── models/                  (Sequelize models only)
│   │   ├── User.ts
│   │   ├── Profile.ts
│   │   ├── Message.ts
│   │   ├── Interest.ts
│   │   ├── Match.ts
│   │   └── Master/              (master data)
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── profile.controller.ts
│   │   ├── match.controller.ts
│   │   ├── message.controller.ts
│   │   └── admin.controller.ts
│   ├── services/                (NEW - business logic layer)
│   │   ├── auth.service.ts
│   │   ├── profile.service.ts
│   │   ├── match.service.ts
│   │   └── notification.service.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── upload.middleware.ts
│   │   ├── errorHandler.ts      (NEW)
│   │   └── validation.ts        (NEW)
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── profile.routes.ts
│   │   ├── match.routes.ts
│   │   └── admin.routes.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── helpers.ts
│   │   └── constants.ts
│   ├── types/
│   │   └── index.ts             (TypeScript interfaces)
│   ├── websocket/               (NEW - Socket.io handlers)
│   │   ├── handlers.ts
│   │   └── events.ts
│   ├── scripts/
│   │   ├── seedMasterData.ts
│   │   └── migrateData.ts
│   └── server.ts
├── tests/                       (NEW)
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── .env.example
├── tsconfig.json
└── package.json
```

---

## 2. Backend Optimizations

### 2.1 Create Service Layer (HIGH PRIORITY)

**Problem**: Controllers are handling business logic directly, making testing and reuse difficult.

**Solution**: Extract business logic to services

```typescript
// backend/src/services/profile.service.ts
import { Profile, User, Master } from '../models';
import { IProfileCreateInput, IProfileResponse } from '../types';

export class ProfileService {
  async createProfile(userId: string, data: IProfileCreateInput): Promise<IProfileResponse> {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const profile = await Profile.create({
      userId,
      ...data,
    });

    return this.formatProfile(profile);
  }

  async getProfile(userId: string): Promise<IProfileResponse | null> {
    const profile = await Profile.findOne({ where: { userId } });
    return profile ? this.formatProfile(profile) : null;
  }

  async updateProfile(userId: string, data: Partial<IProfileCreateInput>) {
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) throw new Error('Profile not found');

    await profile.update(data);
    return this.formatProfile(profile);
  }

  private formatProfile(profile: any): IProfileResponse {
    return {
      id: profile.id,
      userId: profile.userId,
      fullName: profile.fullName,
      age: this.calculateAge(profile.dateOfBirth),
      profileImage: profile.profileImage,
      gender: profile.gender,
      // ... other fields
    };
  }

  private calculateAge(dob: Date): number {
    return Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  }
}
```

```typescript
// backend/src/controllers/profile.controller.ts
import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service';

const profileService = new ProfileService();

export const createProfile = async (req: Request, res: Response) => {
  try {
    const profile = await profileService.createProfile(req.user.id, req.body);
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await profileService.getProfile(req.user.id);
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
```

---

### 2.2 Add Global Error Handler (HIGH PRIORITY)

**Current**: Error handling is inconsistent across routes

```typescript
// backend/src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  // Log error
  console.error(`[${new Date().toISOString()}] ${statusCode}: ${message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Usage in server.ts
app.use(globalErrorHandler);
```

---

### 2.3 Add Request Validation Middleware (HIGH PRIORITY)

```typescript
// backend/src/middlewares/validation.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors,
      });
    }
  };
};
```

```typescript
// backend/src/routes/profile.routes.ts
import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middlewares/validation';
import * as profileController from '../controllers/profile.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const profileSchema = z.object({
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date'),
  gender: z.enum(['Male', 'Female']),
  motherTongue: z.string().min(1),
  height: z.string(),
  religion: z.string(),
  caste: z.string(),
  maritalStatus: z.enum(['Never Married', 'Widower', 'Awaiting Divorce', 'Divorced']),
  childrenCount: z.number().optional(),
  education: z.string(),
  employmentType: z.string(),
  occupation: z.string(),
  annualIncome: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  about: z.string().min(10).max(500),
});

router.post(
  '/create',
  authMiddleware,
  validateRequest(profileSchema),
  profileController.createProfile
);

export default router;
```

---

### 2.4 Optimize Database Queries (HIGH PRIORITY)

**Problem**: N+1 queries, missing indexes, no pagination

```typescript
// backend/src/models/Profile.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Profile extends Model {
  declare id: string;
  declare userId: string;
  declare fullName: string;
  declare dateOfBirth: Date;
  declare gender: 'Male' | 'Female';
  declare motherTongue: string;
  declare height: string;
  declare religion: string;
  declare caste: string;
  declare profileImage: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Eager load relations
  static async findWithUser(id: string) {
    return this.findByPk(id, {
      include: [{ model: User, attributes: ['id', 'email', 'phoneNumber'] }],
    });
  }

  // Pagination helper
  static async findPaginated(page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });
    return { total: count, data: rows, page, totalPages: Math.ceil(count / limit) };
  }
}

Profile.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: 'id' } },
    fullName: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.DATE, allowNull: false },
    gender: { type: DataTypes.ENUM('Male', 'Female'), allowNull: false },
    motherTongue: { type: DataTypes.STRING, allowNull: false },
    height: { type: DataTypes.STRING },
    religion: { type: DataTypes.STRING, allowNull: false },
    caste: { type: DataTypes.STRING, allowNull: false },
    profileImage: { type: DataTypes.STRING },
  },
  {
    sequelize,
    tableName: 'profiles',
    timestamps: true,
    indexes: [
      { fields: ['userId'], unique: true },
      { fields: ['gender', 'religion', 'caste'], name: 'idx_profile_filters' },
      { fields: ['createdAt'], name: 'idx_profile_created' },
    ],
  }
);

Profile.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Profile, { foreignKey: 'userId' });

export default Profile;
```

---

### 2.5 Implement Connection Pooling & Caching (MEDIUM PRIORITY)

```typescript
// backend/src/config/redis.ts
import Redis from 'redis';

const redisClient = Redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

export const getCached = async (key: string) => {
  return await redisClient.get(key);
};

export const setCached = async (key: string, value: any, ttl: number = 3600) => {
  await redisClient.setEx(key, ttl, JSON.stringify(value));
};

export default redisClient;
```

```typescript
// Use in services
export class MasterDataService {
  async getCountries(forceRefresh = false) {
    const cacheKey = 'master:countries';

    if (!forceRefresh) {
      const cached = await getCached(cacheKey);
      if (cached) return JSON.parse(cached);
    }

    const countries = await Country.findAll({ attributes: ['id', 'name', 'code'] });
    await setCached(cacheKey, countries, 86400); // 24 hours
    return countries;
  }
}
```

---

### 2.6 Add Pagination to All List Endpoints (HIGH PRIORITY)

```typescript
// backend/src/controllers/match.controller.ts
export const getMatches = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const matches = await matchService.getMatchesForUser(req.user.id, page, limit);
    
    res.json({
      success: true,
      data: matches.data,
      pagination: {
        page: matches.page,
        limit,
        total: matches.total,
        totalPages: matches.totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

---

### 2.7 Improve File Upload Security (HIGH PRIORITY)

```typescript
// backend/src/middlewares/uploadMiddleware.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
  // Only allow images
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
  }

  cb(null, true);
};

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
```

---

### 2.8 Add Rate Limiting (MEDIUM PRIORITY)

```typescript
// backend/src/middlewares/rateLimit.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redisClient from '../config/redis';

export const authLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:auth:',
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many login attempts, please try again later',
});

export const generalLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:general:',
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
});
```

---

## 3. Frontend Optimizations

### 3.1 Improve Form State Management (HIGH PRIORITY)

**Problem**: Multi-step form loses state on navigation or refresh

```typescript
// frontend/src/contexts/FormContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FormState {
  step1: Record<string, any>;
  step2: Record<string, any>;
  step3: Record<string, any>;
  step4: Record<string, any>;
  step5: Record<string, any>;
  step6: Record<string, any>;
}

const initialState: FormState = {
  step1: {},
  step2: {},
  step3: {},
  step4: {},
  step5: {},
  step6: {},
};

const FormContext = createContext<{
  formData: FormState;
  updateStep: (step: keyof FormState, data: Record<string, any>) => void;
  getCurrentStep: (step: keyof FormState) => Record<string, any>;
  resetForm: () => void;
  loadFromStorage: () => void;
} | null>(null);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormState>(initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('registrationForm');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('registrationForm', JSON.stringify(formData));
  }, [formData]);

  const updateStep = (step: keyof FormState, data: Record<string, any>) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  const getCurrentStep = (step: keyof FormState) => formData[step];

  const resetForm = () => setFormData(initialState);

  const loadFromStorage = () => {
    const saved = localStorage.getItem('registrationForm');
    if (saved) setFormData(JSON.parse(saved));
  };

  return (
    <FormContext.Provider value={{ formData, updateStep, getCurrentStep, resetForm, loadFromStorage }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};
```

---

### 3.2 Create Reusable Form Components (MEDIUM PRIORITY)

```typescript
// frontend/src/components/forms/FormStepTemplate.tsx
import React from 'react';

interface FormStepProps {
  step: number;
  totalSteps: number;
  title: string;
  description?: string;
  onNext: () => void;
  onPrev?: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const FormStepTemplate: React.FC<FormStepProps> = ({
  step,
  totalSteps,
  title,
  description,
  onNext,
  onPrev,
  isLoading,
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <span className="text-sm text-gray-600">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
          {description && <p className="text-gray-600 mt-3">{description}</p>}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">{children}</div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {onPrev && (
            <button
              onClick={onPrev}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
          )}
          <button
            onClick={onNext}
            disabled={isLoading}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 ml-auto"
          >
            {isLoading ? 'Loading...' : step === totalSteps ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

### 3.3 Add Skeleton Loaders (MEDIUM PRIORITY)

```typescript
// frontend/src/components/ui/FormSkeleton.tsx
export const FormSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-12 bg-gray-200 rounded"></div>
    <div className="h-12 bg-gray-200 rounded"></div>
    <div className="h-40 bg-gray-200 rounded"></div>
  </div>
);

// Use in components
{isLoading ? <FormSkeleton /> : <ActualForm />}
```

---

### 3.4 Implement Error Boundaries (MEDIUM PRIORITY)

```typescript
// frontend/src/components/ErrorBoundary.tsx
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h2 className="text-red-800 font-bold">Something went wrong</h2>
            <p className="text-red-700">{this.state.error?.message}</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

---

### 3.5 Optimize Image Loading (MEDIUM PRIORITY)

```typescript
// frontend/src/components/OptimizedImage.tsx
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage: React.FC<Props> = ({ src, alt, className }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      className={className}
      priority={false}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Crect fill='%23e5e7eb' width='500' height='500'/%3E%3C/svg%3E"
    />
  );
};
```

---

### 3.6 Add Loading States (MEDIUM PRIORITY)

```typescript
// frontend/src/hooks/useAsync.ts
import { useState, useEffect } from 'react';

interface State<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
): State<T> {
  const [state, setState] = useState<State<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await asyncFunction();
      setState({ data: response, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return state;
}
```

---

## 4. Security Enhancements

### 4.1 Implement CSRF Protection (HIGH PRIORITY)

```typescript
// backend/src/middlewares/csrf.ts
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

export const csrfProtection = [cookieParser(), csrf({ cookie: true })];

export const csrfToken = (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
};

// Usage in routes
app.get('/api/csrf-token', csrfToken);
app.post('/api/auth/register', csrfProtection, registerController);
```

---

### 4.2 Add CORS Security (HIGH PRIORITY)

```typescript
// backend/src/config/cors.ts
import cors from 'cors';

export const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);

// Usage
app.use(corsMiddleware);
```

---

### 4.3 Secure Headers (HIGH PRIORITY)

```typescript
// backend/src/middlewares/secureHeaders.ts
import helmet from 'helmet';

export const secureHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
});

// Usage
app.use(secureHeaders);
```

---

### 4.4 Password Security (HIGH PRIORITY)

```typescript
// backend/src/utils/passwordValidator.ts
export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain a number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain a special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
```

---

### 4.5 Input Sanitization (HIGH PRIORITY)

```typescript
// backend/src/middlewares/sanitization.ts
import DOMPurify from 'isomorphic-dompurify';

export const sanitizeInput = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  next();
};

const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') {
    return DOMPurify.sanitize(obj);
  }
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = sanitizeObject(obj[key]);
      return acc;
    }, Array.isArray(obj) ? [] : {});
  }
  return obj;
};

// Usage
app.use(sanitizeInput);
```

---

### 4.6 Implement JWT Refresh Token Rotation (HIGH PRIORITY)

```typescript
// backend/src/services/auth.service.ts
import jwt from 'jsonwebtoken';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  generateTokens(userId: string): Tokens {
    const accessToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
  }

  async refreshAccessToken(refreshToken: string): Promise<Tokens> {
    try {
      const decoded = this.verifyRefreshToken(refreshToken);
      return this.generateTokens(decoded.userId);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
```

---

## 5. Testing & Quality

### 5.1 Add Unit Tests (HIGH PRIORITY)

```typescript
// backend/tests/unit/services/profile.service.test.ts
import { ProfileService } from '../../../src/services/profile.service';
import { Profile, User } from '../../../src/models';

jest.mock('../../../src/models');

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    service = new ProfileService();
    jest.clearAllMocks();
  });

  describe('createProfile', () => {
    it('should create a profile for a valid user', async () => {
      const userId = 'user-123';
      const profileData = {
        fullName: 'John Doe',
        gender: 'Male',
        dateOfBirth: new Date('1995-01-01'),
        religion: 'Hindu',
        caste: 'Brahmin',
      };

      (User.findByPk as jest.Mock).mockResolvedValue({ id: userId });
      (Profile.create as jest.Mock).mockResolvedValue({ id: 'profile-123', ...profileData });

      const result = await service.createProfile(userId, profileData);

      expect(result).toBeDefined();
      expect(User.findByPk).toHaveBeenCalledWith(userId);
      expect(Profile.create).toHaveBeenCalledWith(expect.objectContaining({ userId, ...profileData }));
    });

    it('should throw error if user not found', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(service.createProfile('invalid-user', {})).rejects.toThrow('User not found');
    });
  });
});
```

---

### 5.2 Add Integration Tests (MEDIUM PRIORITY)

```typescript
// backend/tests/integration/auth.test.ts
import request from 'supertest';
import app from '../../../src/server';
import sequelize from '../../../src/config/database';

describe('Auth Routes', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app).post('/api/auth/register').send({
        fullName: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        password: 'SecurePass123!',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.userId).toBeDefined();
    });

    it('should reject duplicate email', async () => {
      const email = 'duplicate@example.com';

      // Create first user
      await request(app).post('/api/auth/register').send({
        fullName: 'User One',
        email,
        phoneNumber: '1234567890',
        password: 'SecurePass123!',
      });

      // Try to create duplicate
      const res = await request(app).post('/api/auth/register').send({
        fullName: 'User Two',
        email,
        phoneNumber: '9876543210',
        password: 'SecurePass123!',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
```

---

### 5.3 Update Backend package.json with Test Scripts (HIGH PRIORITY)

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest --testPathPattern=integration"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "@types/jest": "^29.5.0",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1"
  }
}
```

---

### 5.4 Add ESLint Configuration (MEDIUM PRIORITY)

```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-var": "error",
    "prefer-const": "error"
  }
}
```

---

## 6. Performance & Caching

### 6.1 Add Request Caching (MEDIUM PRIORITY)

```typescript
// backend/src/utils/cache.ts
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 min default

export const getCacheKey = (...args: any[]): string => {
  return args.join(':');
};

export const getFromCache = <T>(key: string): T | undefined => {
  return cache.get<T>(key);
};

export const setInCache = <T>(key: string, value: T, ttl?: number): void => {
  cache.set(key, value, ttl);
};

export const deleteFromCache = (key: string): void => {
  cache.del(key);
};

export const clearCache = (): void => {
  cache.flushAll();
};
```

---

### 6.2 Add API Response Compression (MEDIUM PRIORITY)

```typescript
// backend/src/server.ts
import compression from 'compression';

app.use(compression());
```

---

### 6.3 Lazy Load Frontend Routes (MEDIUM PRIORITY)

```typescript
// frontend/src/app/(platform)/layout.tsx
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('@/components/Sidebar'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

const Dashboard = dynamic(() => import('@/components/Dashboard'), {
  loading: () => <div>Loading dashboard...</div>,
  ssr: true,
});
```

---

### 6.4 Database Query Optimization (HIGH PRIORITY)

```typescript
// backend/src/models/Match.ts - Add indexes and lean queries
class Match extends Model {
  static async findCompatibleProfiles(
    userId: string,
    filters: any,
    page: number = 1,
    limit: number = 20
  ) {
    const offset = (page - 1) * limit;

    // Use lean query (read-only, faster)
    const matches = await this.findAll({
      where: { userId, ...filters },
      attributes: ['id', 'profileId', 'compatibility', 'createdAt'],
      include: [
        {
          model: Profile,
          attributes: ['id', 'fullName', 'age', 'religion', 'city', 'profileImage'],
          required: true,
        },
      ],
      offset,
      limit,
      order: [['compatibility', 'DESC']],
      raw: true, // Returns plain objects, much faster
    });

    return matches;
  }
}
```

---

## 7. Monitoring & Logging

### 7.1 Add Winston Logger (HIGH PRIORITY)

```typescript
// backend/src/utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'aura-weds-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
```

---

### 7.2 Add Request Logging Middleware (MEDIUM PRIORITY)

```typescript
// backend/src/middlewares/logging.ts
import logger from '../utils/logger';

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user?.id,
    });
  });

  next();
};
```

---

### 7.3 Add API Monitoring (MEDIUM PRIORITY)

```typescript
// Create prometheus metrics
import prometheus from 'prom-client';

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

export const metricsMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });

  next();
};
```

---

## 8. DevOps & Deployment

### 8.1 Docker Configuration (HIGH PRIORITY)

```dockerfile
# Dockerfile for backend
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]
```

```dockerfile
# Dockerfile for frontend
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

EXPOSE 3000

CMD ["npm", "start"]
```

---

### 8.2 Docker Compose Setup (HIGH PRIORITY)

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

  backend:
    build: ./backend
    environment:
      DB_HOST: postgres
      REDIS_HOST: redis
      NODE_ENV: development
    ports:
      - '5000:5000'
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend/src:/app/src

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API_URL: http://backend:5000
    ports:
      - '3000:3000'
    depends_on:
      - backend

volumes:
  postgres_data:
  redis_data:
```

---

### 8.3 Environment Configuration (HIGH PRIORITY)

```bash
# .env.example for backend
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=matrimony_user
DB_PASSWORD=secure_password
DB_NAME=aura_weds

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your_jwt_secret_key_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_key_min_32_chars
JWT_EXPIRY=15m

# File Upload
MAX_FILE_SIZE=5242880 # 5MB
UPLOAD_DIR=./uploads

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Security
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Logging
LOG_LEVEL=info
```

---

### 8.4 CI/CD Pipeline (MEDIUM PRIORITY)

```yaml
# .github/workflows/deploy.yml
name: Deploy Aura Weds

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_pass
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies (backend)
        run: cd backend && npm ci

      - name: Run linter (backend)
        run: cd backend && npm run lint

      - name: Run tests (backend)
        run: cd backend && npm test
        env:
          DB_HOST: localhost
          DB_USER: test_user
          DB_PASSWORD: test_pass
          DB_NAME: test_db

      - name: Build (backend)
        run: cd backend && npm run build

      - name: Install dependencies (frontend)
        run: cd frontend && npm ci

      - name: Build (frontend)
        run: cd frontend && npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Vercel (Frontend)
        run: |
          npm i -g vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
        working-directory: frontend

      - name: Deploy to Heroku (Backend)
        run: |
          echo "${{ secrets.HEROKU_API_KEY }}" | docker login --username=_ --password-stdin registry.heroku.com
          docker build -t registry.heroku.com/${{ secrets.HEROKU_APP_NAME }}/web:latest ./backend
          docker push registry.heroku.com/${{ secrets.HEROKU_APP_NAME }}/web:latest
```

---

### 8.5 Health Check Endpoint (MEDIUM PRIORITY)

```typescript
// backend/src/routes/health.routes.ts
import { Router } from 'express';
import sequelize from '../config/database';
import redisClient from '../config/redis';

const router = Router();

router.get('/health', async (req, res) => {
  try {
    // Check database
    await sequelize.authenticate();

    // Check Redis
    await redisClient.ping();

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
```

---

## Implementation Priority Summary

### 🔴 CRITICAL (Do First)
- [ ] Consolidate to single database (PostgreSQL)
- [ ] Add global error handler
- [ ] Implement request validation middleware
- [ ] Add service layer abstraction
- [ ] Implement CSRF and CORS protection
- [ ] Setup Docker & Docker Compose
- [ ] Add unit and integration tests

### 🟡 HIGH (Do Next)
- [ ] Optimize database queries with indexes and pagination
- [ ] Improve file upload security
- [ ] Add form state persistence
- [ ] Implement JWT refresh token rotation
- [ ] Setup Winston logging
- [ ] Create CI/CD pipeline
- [ ] Add password strength validation

### 🟢 MEDIUM (Nice to Have)
- [ ] Add Redis caching layer
- [ ] Rate limiting
- [ ] Create reusable form components
- [ ] Implement error boundaries
- [ ] Add request compression
- [ ] API monitoring with Prometheus
- [ ] Lazy load frontend routes

---

## File Structure After Implementation

```
aura-weds/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── redis.ts
│   │   │   ├── env.ts
│   │   │   └── server.ts
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── websocket/
│   │   ├── scripts/
│   │   └── server.ts
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── logs/
│   ├── uploads/
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── features/
│   │   ├── hooks/
│   │   └── utils/
│   ├── Dockerfile
│   ├── next.config.js
│   └── package.json
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── deploy.yml
├── OPTIMIZATION_GUIDE.md
└── README.md
```

---

## Testing Checklist

- [ ] Unit tests for all services (>80% coverage)
- [ ] Integration tests for critical flows
- [ ] End-to-end tests for user journeys
- [ ] Performance tests for database queries
- [ ] Security tests (OWASP top 10)
- [ ] Load testing with k6/JMeter

---

## Security Checklist

- [ ] HTTPS enforced in production
- [ ] CSRF tokens on all state-changing operations
- [ ] Input validation & sanitization
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] Rate limiting enabled
- [ ] Secure headers configured
- [ ] JWT tokens secured (httpOnly cookies)
- [ ] Password policy enforced
- [ ] Sensitive data not logged

---

## Performance Targets

- API response time: < 200ms (p95)
- Frontend FCP: < 1.5s
- Frontend LCP: < 2.5s
- Database query time: < 100ms (p95)
- Cache hit rate: > 80% for master data
- Backend CPU: < 70% under load

---

## Conclusion

This optimization guide provides a roadmap to transform Aura Weds from a functional MVP into a production-ready platform. Focus on the critical items first, then progressively implement medium and low-priority items based on your deployment timeline and team capacity.

**Estimated Implementation Time**: 4-6 weeks with a team of 2-3 developers

