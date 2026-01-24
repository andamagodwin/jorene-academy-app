# Jorene Academy App

A modern React Native application built with Expo, featuring professional authentication, atomic design components, and Tailwind CSS styling.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Add your Supabase credentials to .env

# Start development server
npm start
```

## 📚 Documentation

All project documentation is in the [`docs/`](./docs) folder:

- **[Setup Guide](./docs/SETUP_GUIDE.md)** - Get started quickly
- **[Project Structure](./docs/PROJECT_STRUCTURE.md)** - Folder organization & architecture
- **[Authentication](./docs/AUTH_README.md)** - Auth system details
- **[Architecture](./docs/ARCHITECTURE_DIAGRAM.md)** - System flows & diagrams
- **[Testing](./docs/TESTING_CHECKLIST.md)** - QA checklist

## ✨ Features

- ✅ **Authentication** - Supabase auth with session persistence
- ✅ **Route Protection** - Automatic redirect based on auth state
- ✅ **Atomic Design** - Scalable component architecture
- ✅ **Tailwind CSS** - Utility-first styling with NativeWind
- ✅ **TypeScript** - Full type safety
- ✅ **State Management** - Zustand for global state

## 🏗️ Tech Stack

- **Framework:** React Native + Expo
- **Navigation:** Expo Router
- **Authentication:** Supabase
- **State:** Zustand + AsyncStorage
- **Styling:** NativeWind (Tailwind CSS)
- **Language:** TypeScript

## 📱 Screens

### Authentication (Public)
- Welcome/Landing page
- Login screen
- Sign up screen

### Main App (Protected)
- Home dashboard
- User profile

## 🎨 Architecture

```
Atomic Design Structure:
├── Atoms (Button, Input, Label)
├── Molecules (InputField)
└── Organisms (LoginForm, SignUpForm)

Route Groups:
├── (auth)/ - Public authentication screens
└── (tabs)/ - Protected main app screens
```

## 🔐 Environment Variables

Create a `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

Get these from [Supabase Dashboard](https://app.supabase.com) → Project Settings → API

## 📖 Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Lint code
npm run format     # Format code
```

## 🤝 Contributing

1. Read the [Project Structure](./docs/PROJECT_STRUCTURE.md) guide
2. Follow the atomic design pattern
3. Use Tailwind CSS for styling
4. Ensure TypeScript types are defined
5. Test all authentication flows

## 📄 License

MIT

---

**Need help?** Check the [documentation](./docs) folder or the [Setup Guide](./docs/SETUP_GUIDE.md).
