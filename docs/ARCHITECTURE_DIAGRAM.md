# Authentication Flow Diagram

## User Journey Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        APP LAUNCH                                        │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │  Auth Initialization  │
                    │  (Check Session)      │
                    └───────────┬───────────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
         ┌──────▼──────┐               ┌───────▼────────┐
         │  No Session │               │ Has Session    │
         │  (Logged Out)│               │ (Logged In)    │
         └──────┬──────┘               └───────┬────────┘
                │                               │
         ┌──────▼──────┐                       │
         │   WELCOME    │                       │
         │   SCREEN     │                       │
         └──────┬──────┘                       │
                │                               │
      ┌─────────┴─────────┐                    │
      │                   │                    │
┌─────▼──────┐    ┌──────▼──────┐            │
│   LOGIN     │    │   SIGNUP     │            │
│   SCREEN    │    │   SCREEN     │            │
└─────┬──────┘    └──────┬──────┘            │
      │                   │                    │
      │  ┌────────────────┘                    │
      │  │                                     │
      └──┴─────────────────────────────────────┤
                                               │
                                        ┌──────▼──────┐
                                        │   HOME       │
                                        │   (TABS)     │
                                        │              │
                                        │ • Home Tab   │
                                        │ • Profile    │
                                        └──────┬──────┘
                                               │
                                        ┌──────▼──────┐
                                        │   LOGOUT     │
                                        └──────┬──────┘
                                               │
                                        ┌──────▼──────┐
                                        │   WELCOME    │
                                        │   SCREEN     │
                                        └─────────────┘
```

## Component Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         ATOMIC DESIGN                                 │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ ATOMS (Basic Building Blocks)                                │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  • Button (primary, secondary, outline)                      │   │
│  │  • Input (with error state)                                  │   │
│  │  • Label (with required indicator)                           │   │
│  │  • ErrorText (conditional display)                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                            ▲                                          │
│                            │ Used By                                  │
│                            │                                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ MOLECULES (Simple Combinations)                              │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  • InputField = Label + Input + ErrorText                    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                            ▲                                          │
│                            │ Used By                                  │
│                            │                                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ ORGANISMS (Complex Components)                               │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  • LoginForm (validation + API calls)                        │   │
│  │  • SignUpForm (validation + API calls)                       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                            ▲                                          │
│                            │ Used In                                  │
│                            │                                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ SCREENS (Pages)                                              │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  • login.tsx                                                 │   │
│  │  • signup.tsx                                                │   │
│  │  • welcome.tsx                                               │   │
│  │  • (tabs)/index.tsx                                          │   │
│  │  • (tabs)/two.tsx                                            │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

## State Management Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      ZUSTAND AUTH STORE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  STATE:                                                          │
│  • user: User | null                                            │
│  • session: Session | null                                      │
│  • isLoading: boolean                                           │
│  • isInitialized: boolean                                       │
│                                                                  │
│  ACTIONS:                                                        │
│  • initialize() → Load saved session                            │
│  • signIn(email, password) → Login user                         │
│  • signUp(email, password, name) → Create account               │
│  • signOut() → Clear session                                    │
│                                                                  │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   │ Persists via
                   │
┌──────────────────▼──────────────────────────────────────────────┐
│                    SUPABASE CLIENT                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  STORAGE: AsyncStorage                                          │
│  • autoRefreshToken: true                                       │
│  • persistSession: true                                         │
│                                                                  │
│  FEATURES:                                                       │
│  • Automatic token refresh                                      │
│  • Session persistence across app restarts                      │
│  • Secure credential storage                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Route Protection Logic

```
┌─────────────────────────────────────────────────────────────┐
│                    ROOT LAYOUT (_layout.tsx)                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. App Starts                                              │
│     ↓                                                        │
│  2. initialize() called                                     │
│     ↓                                                        │
│  3. Check isInitialized & user state                        │
│     ↓                                                        │
│     ┌──────────────────┐        ┌──────────────────┐       │
│     │  user = null     │        │  user exists     │       │
│     │  (Not logged in) │        │  (Logged in)     │       │
│     └────────┬─────────┘        └────────┬─────────┘       │
│              │                           │                  │
│     ┌────────▼─────────┐        ┌────────▼─────────┐       │
│     │ In protected     │        │ In auth screens  │       │
│     │ route (tabs)?    │        │ (welcome/login)? │       │
│     │                  │        │                  │       │
│     │ YES → Redirect   │        │ YES → Redirect   │       │
│     │ to /welcome      │        │ to /(tabs)       │       │
│     │                  │        │                  │       │
│     │ NO → Allow       │        │ NO → Allow       │       │
│     └──────────────────┘        └──────────────────┘       │
│                                                              │
│  4. Listen for auth state changes                           │
│     → Auto-redirect when login/logout happens               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Example: Login

```
1. User enters email/password in LoginForm
   ↓
2. Tap "Sign In" button
   ↓
3. validate() → Check email format, password length
   ↓
4. Valid? → Call authStore.signIn(email, password)
   ↓
5. authStore → Call supabase.auth.signInWithPassword()
   ↓
6. Supabase → Verify credentials, return session
   ↓
7. authStore → Save user & session to state
   ↓
8. authStore → Supabase automatically saves to AsyncStorage
   ↓
9. Root Layout → Detects user change
   ↓
10. Root Layout → Redirect to /(tabs)
    ↓
11. User sees Home screen ✅
```

## Security Layers

```
┌──────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                          │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  LAYER 1: Route Protection                                   │
│  • Root layout checks auth before rendering                  │
│  • Unauthenticated users redirected to welcome               │
│                                                               │
│  LAYER 2: Session Management                                 │
│  • Tokens stored securely in AsyncStorage                    │
│  • Auto-refresh before expiration                            │
│  • HTTPS-only communication                                  │
│                                                               │
│  LAYER 3: Password Security                                  │
│  • Hashed by Supabase (SHA-256)                              │
│  • Never stored in plain text                                │
│  • Minimum length validation                                 │
│                                                               │
│  LAYER 4: Input Validation                                   │
│  • Email format validation                                   │
│  • Password strength requirements                            │
│  • Client-side + server-side validation                      │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```
