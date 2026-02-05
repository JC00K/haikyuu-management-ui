# Haikyuu Spring Boot UI - TypeScript Frontend

## 📋 Overview

This is a React + TypeScript + Vite frontend for the Haikyuu Spring Boot API. It provides a type-safe, well-structured interface for managing volleyball team characters, rosters, and schools.

## 🎯 What We've Built

### ✅ Complete Type System

- **Enums**: All Java enums converted to TypeScript with helper functions
  - `Role`, `Year`, `Position`, `CoachingStyle`, `CoachRole`, `ManagementRole`
- **DTOs**: Full TypeScript interfaces matching Java DTOs
  - `CharacterDTO`, `PlayerDTO`, `CoachDTO`, `ManagementDTO`, `FanDTO`, `AlumniDTO`
  - `RosterDTO`, `SchoolDTO`, `SchoolLookupDTO`
- **Error Types**: Complete error handling system
  - `ApiErrorResponse`, `ApiError`, `NetworkError`, `FormValidationError`
- **API Types**: Request/response types and React Query keys

### ✅ API Layer

- **HTTP Client**: Configured Axios instance with interceptors
- **Error Handling**: Automatic error transformation and logging
- **Type Safety**: Generic request helpers (get, post, patch, delete)
- **Service Layer**: Player service (example - more to come)

### ✅ Best Practices Implemented

1. **Type Safety**: No `any` types, strict TypeScript configuration
2. **Separation of Concerns**: API, types, services, components separated
3. **Code Reusability**: Barrel exports, helper functions, type guards
4. **Error Handling**: Comprehensive error system with user-friendly messages
5. **Developer Experience**: Helpful utility functions, display name converters

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18.x
npm or pnpm
```

### Installation

1. **Create Vite project** (if not already done):

```bash
npm create vite@latest haikyuu-ui -- --template react-swc-ts
cd haikyuu-ui
```

2. **Install dependencies**:

```bash
npm install
npm install axios
npm install @tanstack/react-query
npm install react-router-dom
```

3. **Install dev dependencies**:

```bash
npm install -D @types/node
```

4. **Copy the type files** from this structure into your project

5. **Create environment file** (`.env.development`):

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_VERSION=v1
```

6. **Update `vite.config.ts`**:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

7. **Update `tsconfig.json`**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting - STRICT */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── client.ts          # Axios configuration
│   └── services/          # API services
│       └── player.service.ts
├── types/                 # TypeScript types
│   ├── enums/            # Enums
│   ├── dto/              # DTOs
│   ├── error.types.ts    # Error types
│   ├── api.types.ts      # API types
│   └── index.ts          # Barrel export
├── constants/            # Constants
│   └── api.constants.ts
└── (components, hooks, pages to come...)
```

## 💡 Usage Examples

### Using Enums

```typescript
import { Position, getPositionDisplayName } from "@/types/enums";

// Use enum value
const position = Position.SETTER;

// Get display name
const displayName = getPositionDisplayName(Position.MIDDLE_BLOCKER);
// Returns: "Middle Blocker"

// Get all positions
const positions = getAllPositions(); // excludes NONE
const allPositions = getAllPositions(true); // includes NONE
```

### Making API Calls

```typescript
import { playerService } from "@/api/services/player.service";
import { Position, Year } from "@/types/enums";

// Get all players
const players = await playerService.getAllPlayers();

// Get players by position
const setters = await playerService.getByPosition(Position.SETTER);

// Create a new player
const newPlayer = await playerService.createPlayer({
  name: "Shoyo Hinata",
  height: 162.8,
  age: 16,
  year: Year.FIRST,
  schoolId: 1,
  imgUrl: "https://example.com/hinata.jpg",
  position: Position.MIDDLE_BLOCKER,
  jerseyNumber: 10,
});
```

### Error Handling

```typescript
import { ApiError, HttpStatus } from "@/types/error.types";
import { playerService } from "@/api/services/player.service";

try {
  const player = await playerService.getByJerseyNumber(10);
} catch (error) {
  if (error instanceof ApiError) {
    // Check specific error types
    if (error.isNotFound()) {
      console.log("Player not found");
    } else if (error.isConflict()) {
      console.log("Player already exists");
    }

    // Get user-friendly message
    const message = error.getUserMessage();

    // Get formatted timestamp
    const timestamp = error.getFormattedTimestamp();
  }
}
```

### Type Guards

```typescript
import { isPlayer, isCoach, isManagement } from "@/types/dto/roster.types";
import type { RosterMember } from "@/types/dto/roster.types";

const handleMember = (member: RosterMember) => {
  if (isPlayer(member)) {
    console.log(`Jersey #${member.jerseyNumber}`);
  } else if (isCoach(member)) {
    console.log(`Coach: ${member.coachRole}`);
  } else if (isManagement(member)) {
    console.log(`Management: ${member.managementRole}`);
  }
};
```

## 🎨 Next Steps

### Immediate TODOs:

1. **Complete Service Layer**
   - [ ] Create `character.service.ts`
   - [ ] Create `coach.service.ts`
   - [ ] Create `management.service.ts`
   - [ ] Create `fan.service.ts`
   - [ ] Create `alumni.service.ts`
   - [ ] Create `roster.service.ts`
   - [ ] Create `school.service.ts`

2. **React Query Integration**
   - [ ] Set up QueryClient provider
   - [ ] Create custom hooks using query keys
   - [ ] Implement mutations for POST/PATCH/DELETE

3. **Components**
   - [ ] Create reusable components (DataTable, Card, Modal)
   - [ ] Create feature-specific components
   - [ ] Create forms with validation

4. **Routing**
   - [ ] Set up React Router
   - [ ] Create page components
   - [ ] Implement navigation

5. **State Management**
   - [ ] Global state (if needed beyond React Query)
   - [ ] Form state management

## 🔧 Configuration

### Environment Variables

Create `.env.development` and `.env.production`:

```env
# Development
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_VERSION=v1

# Production
VITE_API_BASE_URL=https://api.yourapp.com/api
VITE_API_VERSION=v1
```

### CORS Configuration

Ensure your Spring Boot application has CORS configured:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173") // Vite dev server
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
            .allowedHeaders("*");
    }
}
```

## 📚 Key Patterns

### 1. Barrel Exports

All type directories have `index.ts` for clean imports:

```typescript
// Instead of:
import { PlayerDTO } from "@/types/dto/player.types";
import { CoachDTO } from "@/types/dto/coach.types";

// You can do:
import { PlayerDTO, CoachDTO } from "@/types/dto";
```

### 2. Type Guards

Use type guards to safely narrow types:

```typescript
if (isApiErrorResponse(error)) {
  // TypeScript knows error is ApiErrorResponse
}
```

### 3. Read-only Fields

DTOs use `readonly` for backend-managed fields:

```typescript
interface PlayerDTO {
  readonly id?: number; // Backend assigns
  readonly schoolName?: string; // Backend populates
  name: string; // User provides
}
```

### 4. Helper Functions

Enums include display name converters:

```typescript
getPositionDisplayName(Position.SETTER); // "Setter"
getRoleDisplayName(Role.PLAYER); // "Player"
```

## 🐛 Debugging

### Enable API Logging

API requests/responses are automatically logged in development mode.

### Check Network Tab

All API calls go through Axios interceptors for consistent logging.

### Error Details

All errors include timestamps and detailed messages.

## 📖 Documentation

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [Axios Docs](https://axios-http.com/docs/intro)
- [Vite Guide](https://vitejs.dev/guide/)

## ✨ Code Quality

### Type Safety

- ✅ Strict TypeScript mode enabled
- ✅ No `any` types (except where unavoidable)
- ✅ Proper null/undefined handling
- ✅ Generic types where appropriate

### Error Handling

- ✅ Custom error classes
- ✅ Type guards for errors
- ✅ User-friendly messages
- ✅ Detailed logging in development

### Code Organization

- ✅ Clear folder structure
- ✅ Separation of concerns
- ✅ Consistent naming conventions
- ✅ Barrel exports

## 🤝 Contributing

When adding new features:

1. Create types first in `types/dto/`
2. Add API endpoints to `constants/api.constants.ts`
3. Create service in `api/services/`
4. Add query keys to `types/api.types.ts`
5. Create custom hooks
6. Build components

---

**Built with ❤️ using React, TypeScript, and Vite**
