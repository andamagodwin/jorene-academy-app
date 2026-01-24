# Jorene Academy Authentication System

## Overview

This is a professional authentication system built with Supabase, Zustand, and Expo Router following atomic design principles.

## Architecture

### State Management
- **Zustand Store** (`store/authStore.ts`): Centralized authentication state
  - User session management
  - Automatic session persistence with AsyncStorage
  - Auto-refresh tokens
  - Sign in, sign up, and sign out methods

### Atomic Design Components

#### Atoms (Basic Building Blocks)
- `Input`: Reusable text input with error state
- `Button`: Multi-variant button with loading state
- `Label`: Form label with required indicator
- `ErrorText`: Error message display

#### Molecules (Simple Component Groups)
- `InputField`: Input + Label + ErrorText combined

#### Organisms (Complex Components)
- `LoginForm`: Complete login form with validation
- `SignUpForm`: Complete signup form with validation

### Screens
- `welcome.tsx`: Landing page with sign in/up options
- `login.tsx`: Login screen
- `signup.tsx`: Registration screen
- `(tabs)/index.tsx`: Protected home screen
- `(tabs)/two.tsx`: Protected profile screen

### Route Protection

The root layout (`_layout.tsx`) implements route protection:
1. Initializes auth on app start
2. Listens for auth state changes
3. Redirects unauthenticated users to welcome screen
4. Redirects authenticated users to home

## Features

✅ **Session Persistence**: Users stay logged in across app restarts
✅ **Auto Token Refresh**: Automatic token refresh before expiration
✅ **Protected Routes**: Unauthenticated users cannot access app screens
✅ **Form Validation**: Client-side validation for all inputs
✅ **Professional UI**: Clean, accessible, and responsive design
✅ **Error Handling**: User-friendly error messages
✅ **Loading States**: Visual feedback during async operations

## Setup Instructions

### 1. Environment Variables

Create a `.env` file with your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

### 2. Supabase Configuration

Ensure your Supabase project has:
- Email authentication enabled
- Email confirmation disabled (for development) or configured
- Proper email templates set up

### 3. Running the App

```bash
npm install
npm start
```

## Usage

### Sign Up
1. Launch app → Welcome screen
2. Tap "Create Account"
3. Fill in full name, email, and password
4. Tap "Sign Up"

### Sign In
1. Launch app → Welcome screen
2. Tap "Sign In"
3. Enter email and password
4. Tap "Sign In"

### Sign Out
- From Home: Tap "Logout" in header
- From Profile: Tap "Sign Out" button

## Component Usage Examples

### Using the Button Component
```tsx
import { Button } from '~/components/atoms/Button';

<Button 
  title="Click Me" 
  variant="primary" 
  onPress={() => {}} 
  loading={false}
  fullWidth
/>
```

### Using the InputField Component
```tsx
import { InputField } from '~/components/molecules/InputField';

<InputField
  label="Email"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
  placeholder="Enter your email"
  required
/>
```

### Using the Auth Store
```tsx
import { useAuthStore } from '~/store/authStore';

function MyComponent() {
  const { user, signOut, isLoading } = useAuthStore();
  
  return (
    <View>
      <Text>Welcome, {user?.email}</Text>
      <Button title="Logout" onPress={signOut} loading={isLoading} />
    </View>
  );
}
```

## Security Features

- Passwords are hashed by Supabase (never stored in plain text)
- Secure session tokens stored in AsyncStorage
- HTTPS-only communication with Supabase
- Automatic session expiration and refresh
- Protected routes prevent unauthorized access

## File Structure

```
app/
├── _layout.tsx              # Root layout with auth protection
├── welcome.tsx              # Landing screen
├── login.tsx                # Login screen
├── signup.tsx               # Signup screen
└── (tabs)/
    ├── _layout.tsx          # Tab navigation
    ├── index.tsx            # Home screen (protected)
    └── two.tsx              # Profile screen (protected)

components/
├── atoms/
│   ├── Button.tsx           # Reusable button
│   ├── Input.tsx            # Reusable input
│   ├── Label.tsx            # Form label
│   └── ErrorText.tsx        # Error message
├── molecules/
│   └── InputField.tsx       # Input with label and error
├── organisms/
│   ├── LoginForm.tsx        # Complete login form
│   └── SignUpForm.tsx       # Complete signup form
└── index.ts                 # Component exports

store/
├── authStore.ts             # Authentication state management
└── store.ts                 # Other stores

utils/
└── supabase.ts              # Supabase client configuration
```

## Best Practices Implemented

1. **Separation of Concerns**: Components are organized by complexity
2. **Type Safety**: Full TypeScript support
3. **Reusability**: Atomic components can be reused anywhere
4. **Accessibility**: Proper labels and error messages
5. **User Experience**: Loading states, validation, and clear feedback
6. **Security**: Protected routes and secure session management
7. **Maintainability**: Clean code structure and documentation

## Troubleshooting

### "Cannot find module 'react-native-worklets-core'"
```bash
npm install react-native-worklets-core
```

### Session not persisting
- Check AsyncStorage permissions
- Verify Supabase client configuration
- Clear app data and test again

### Routes not protecting
- Ensure `initialize()` is called in root layout
- Check that `isInitialized` is true before navigation
- Verify Supabase environment variables

## License

MIT
