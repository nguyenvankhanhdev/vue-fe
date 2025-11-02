# Shared Composables

Các composable **dùng chung** cho cả Admin và Client.

## Files

- **useAuth.js** - Xác thực người dùng (login, logout, register, verify email)
- **useLoading.js** - Quản lý trạng thái loading toàn cục
- **useApi.js** - API client wrapper (axios interceptors, error handling)

## Usage

```javascript
import { useAuth, useLoading, useApi } from '@/composables'
```

## Features

- ✅ Centralized authentication
- ✅ Token management
- ✅ Global loading state
- ✅ API error handling
- ✅ Request/Response interceptors
