# Quick Setup Guide

## 🚀 Getting Started

Your authentication system is now fully configured! Follow these steps to start using it:

### 1. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=your-anon-key
```

Get these values from your [Supabase Dashboard](https://app.supabase.com) → Project Settings → API

### 2. Configure Supabase Authentication

In your Supabase Dashboard:

1. Go to **Authentication** → **Providers** → **Email**
2. Enable Email authentication
3. (Optional) Disable email confirmation for development
4. Save changes

### 3. Start the App

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm start
```

Then press:
- `a` for Android
- `i` for iOS
- `w` for web

## 📱 Testing the Flow

### First Time User:
1. App opens → **Welcome Screen**
2. Tap "Create Account" → **Sign Up Screen**
3. Enter details:
   - Full Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
4. Tap "Sign Up"
5. ✅ Automatically redirected to **Home Screen**

### Returning User:
1. App opens → **Welcome Screen**
2. Tap "Sign In" → **Login Screen**
3. Enter credentials
4. Tap "Sign In"
5. ✅ Redirected to **Home Screen**

### Session Persistence:
1. Close the app completely
2. Reopen the app
3. ✅ Automatically logged in (goes straight to Home)

### Sign Out:
- **Option 1**: Tap "Logout" in Home screen header
- **Option 2**: Go to Profile tab → Tap "Sign Out"
- ✅ Redirected to Welcome Screen

## 🎨 What's Included

### Screens
- ✅ Welcome/Landing screen
- ✅ Login screen with validation
- ✅ Sign up screen with validation
- ✅ Protected Home screen
- ✅ Protected Profile screen

### Features
- ✅ Form validation (email, password length, etc.)
- ✅ Loading states during API calls
- ✅ Error handling with user-friendly messages
- ✅ Session persistence (stays logged in)
- ✅ Auto token refresh
- ✅ Protected routes (can't access home without login)
- ✅ Professional UI with atomic design

### Architecture
```
components/
  atoms/          → Basic building blocks (Button, Input, etc.)
  molecules/      → Simple combinations (InputField)
  organisms/      → Complex components (LoginForm, SignUpForm)
```

## 🔒 Security Features

- Passwords hashed by Supabase (SHA-256)
- Secure session tokens
- Auto-refresh before expiration
- Protected routes prevent unauthorized access
- Stored securely in AsyncStorage

## 🛠️ Customization

### Change Colors
Edit the color values in component StyleSheet:
- Primary Blue: `#3B82F6`
- Error Red: `#EF4444`
- Gray Text: `#6B7280`

### Add More Fields to Sign Up
Edit `components/organisms/SignUpForm.tsx` and add new InputFields

### Modify Validation Rules
Edit the `validate()` function in LoginForm or SignUpForm

## 📝 Common Issues

### Issue: "Cannot find module 'react-native-worklets-core'"
**Solution:**
```bash
npm install react-native-worklets-core
```

### Issue: Session not persisting
**Solution:**
- Clear app storage
- Verify environment variables
- Check Supabase dashboard for active sessions

### Issue: Can't log in
**Solution:**
- Verify Supabase URL and Key in `.env`
- Check Supabase Dashboard → Authentication → Users
- Look for error messages in app

## 📚 Next Steps

1. **Add Password Reset**: Implement forgot password flow
2. **Social Auth**: Add Google, Apple, or Facebook login
3. **Email Verification**: Enable email confirmation
4. **Profile Editing**: Let users update their info
5. **Role-Based Access**: Add admin/student roles

## 🎯 Architecture Benefits

### Atomic Design
- **Reusable**: Use Button/Input anywhere
- **Consistent**: Same UI patterns throughout
- **Maintainable**: Easy to update globally

### Zustand State
- **Simple**: No boilerplate like Redux
- **Fast**: Minimal re-renders
- **TypeScript**: Full type safety

### Supabase
- **Secure**: Industry-standard auth
- **Scalable**: Handles millions of users
- **Free**: Generous free tier

---

**Need help?** Check `AUTH_README.md` for detailed documentation.
