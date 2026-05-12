# Authentication Implementation Guide

This document outlines the complete email/password authentication flow implemented using Supabase SSR.

## Architecture Overview

### Supabase Clients

Three specialized Supabase client utilities have been created:

#### 1. **Server Client** (`src/lib/supabase/server.ts`)
- Used in **Server Components** and **Server Actions**
- Uses `@supabase/ssr` for proper cookie handling
- Automatically manages auth tokens via cookies
- Used in:
  - Server Components (e.g., `projects/page.tsx`)
  - Server Actions (e.g., `signIn`, `signUp`, `getUser`)

#### 2. **Middleware Client** (`src/lib/supabase/middleware.ts`)
- Used exclusively in `src/middleware.ts`
- Handles session refresh on every request
- Protects routes and manages redirects
- Integrates Request/Response objects for cookie management

#### 3. **Deprecated Browser Client** (`src/lib/supabase.ts`)
- Kept for backward compatibility during migration
- Re-exports `createClient` from the new server utilities
- Should not be used in new code

## File Structure

```
src/
├── app/
│   ├── (auth)/                          # Auth route group (no sidebar)
│   │   ├── layout.tsx                   # Auth layout (centered card UI)
│   │   └── login/
│   │       └── page.tsx                 # Login page
│   ├── actions.ts                       # Server actions (signIn, signUp, signOut, getUser, createProject)
│   ├── layout.tsx                       # Root layout (now async, fetches user)
│   ├── projects/
│   │   ├── page.tsx                     # Projects listing (authenticated only)
│   │   └── new/
│   │       └── page.tsx                 # Create project page
│   └── api/
│       └── projects/
│           └── route.ts                 # API endpoint for project creation
├── components/
│   ├── app-sidebar.tsx                  # Sidebar with sign out button
│   ├── login-form.tsx                   # Login/signup form with tabs
│   ├── project-form.tsx                 # Project creation form
│   └── ui/
│       └── tabs.tsx                     # New Tabs component
├── lib/
│   ├── supabase/
│   │   ├── server.ts                    # Server-side client factory
│   │   └── middleware.ts                # Middleware client factory
│   ├── schemas.ts                       # Zod schemas
│   └── utils.ts                         # Utility functions
└── middleware.ts                        # Next.js middleware for auth & routing
```

## Server Actions

### `signIn(email, password)`
- Authenticates user with email/password
- Returns `{ success: boolean; error?: string }`
- Called from the login form

### `signUp(email, password)`
- Creates new user account
- Sends confirmation email
- Returns `{ success: boolean; error?: string }`
- Called from the login form

### `signOut()`
- Signs out the current user
- Clears auth cookies
- Redirects to `/login` automatically
- Called from the sidebar sign out button

### `getUser()`
- Returns the currently authenticated user
- Returns `User | null`
- Called from:
  - Root layout to pass user to sidebar
  - Projects page for authorization checks
  - Any component that needs user context

### `createProject(data)`
- Creates a new project in Supabase
- Validates data against ProjectSchema (Zod)
- Automatically adds `user_id` field for RLS
- Returns `{ success: boolean; error?: string }`
- Called from project form API endpoint

## Middleware Flow

The middleware (`src/middleware.ts`) runs on **every request** and performs these actions:

1. **Creates authenticated Supabase client**
2. **Calls `getUser()`** to refresh session and verify authentication
3. **Routes protection logic**:
   - Protected routes (`/projects`, `/settings`) → require authentication
   - Auth routes (`/login`) → redirect to `/projects` if already authenticated
   - Public routes (`/`) → always accessible

If unauthenticated user tries to access `/projects`:
```
Request → Middleware → Check auth → Redirect to /login
```

If authenticated user tries to access `/login`:
```
Request → Middleware → Check auth → Redirect to /projects
```

## Route Structure

### Public Routes
- `/` — Home/overview (no auth required)
- `/login` — Login/signup form (redirects to `/projects` if authenticated)

### Protected Routes (Require Authentication)
- `/projects` — Project dashboard (lists user's projects)
- `/projects/new` — Create project form
- `/settings` — Settings page

## Database Schema Requirements

The implementation expects the following table structure in Supabase:

### `projects` Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Row Level Security (RLS) Policy
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects"
  ON projects
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects"
  ON projects
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects
  FOR DELETE
  USING (auth.uid() = user_id);
```

## Environment Variables

Create a `.env.local` file (copy from `.env.local.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Get these values from:
1. Go to your Supabase project settings
2. Under "API", find:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Public (Anon) Key** → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Component Flow

### Login Form (`login-form.tsx`)
- **Client Component** (uses tabs, form state)
- Shows two tabs: "Sign In" and "Sign Up"
- On sign in/sign up:
  1. Calls server action (`signIn` or `signUp`)
  2. Displays toast notification
  3. Redirects to `/projects` on success
  4. Shows error toast on failure

### Root Layout (`app/layout.tsx`)
- **Server Component** (async)
- Calls `getUser()` to fetch current user
- Passes user to `<AppSidebar user={user} />`
- Wraps all routes except auth group

### App Sidebar (`app-sidebar.tsx`)
- **Client Component** (uses navigation, onClick handlers)
- Displays user email when authenticated
- Shows "Sign Out" button that calls `signOut()` server action
- "Sign Out" button only visible when `user` prop is provided
- Sidebar hidden on `/login` route (uses separate auth layout)

### Projects Page (`projects/page.tsx`)
- **Server Component** (async)
- Creates authenticated Supabase client
- Gets current user for authorization
- Queries projects filtered by `user_id`
- RLS policies ensure users only see their own projects

## Type Safety

All components use TypeScript with strict mode:
- User type imported from `@supabase/supabase-js`
- Server actions have explicit return types
- Zod schemas validate all data

## Error Handling

- **Invalid credentials** → Sign in returns error message
- **Email already exists** → Sign up returns error message
- **Unauthenticated access to protected route** → Middleware redirects to `/login`
- **Network errors** → Toast notifications display error messages
- **Database RLS violations** → API returns 400 with error

## Security Considerations

1. **Never expose the service role key** — Only use the Publishable/Anon key
2. **RLS policies protect data** — Users can only query their own projects
3. **Auth tokens in cookies** — Automatically managed by @supabase/ssr
4. **Middleware refreshes sessions** — Keeps auth state fresh across requests
5. **Server actions validate input** — Zod schemas prevent invalid data

## Testing

### Sign In Flow
1. Navigate to `/login`
2. Enter email/password
3. Click "Sign In"
4. Should redirect to `/projects` and show user email in sidebar

### Sign Up Flow
1. Navigate to `/login`
2. Click "Sign Up" tab
3. Enter email/password/confirm
4. Should show confirmation toast

### Route Protection
1. Sign out
2. Try to access `/projects`
3. Should redirect to `/login`

### Unauthenticated Access
1. Sign out
2. Try to access `/projects/new`
3. Should redirect to `/login`

## Future Enhancements

- Email verification flow
- Password reset functionality
- OAuth providers (Google, GitHub)
- User profile management
- 2FA/MFA
- Social authentication
