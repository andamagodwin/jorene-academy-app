# Project Structure & Organization

## 📁 Folder Structure

```
jorene-academy-app/
├── docs/                          # 📚 All project documentation
│   ├── AUTH_README.md            # Authentication system details
│   ├── SETUP_GUIDE.md            # Quick setup instructions
│   ├── ARCHITECTURE_DIAGRAM.md   # System architecture & flows
│   └── TESTING_CHECKLIST.md      # QA testing guide
│
├── app/                          # 📱 Application screens
│   ├── (auth)/                   # Authentication screens group
│   │   ├── _layout.tsx          # Auth layout wrapper
│   │   ├── welcome.tsx          # Landing/welcome screen
│   │   ├── login.tsx            # Login screen
│   │   └── signup.tsx           # Sign up screen
│   │
│   ├── (tabs)/                   # Main app tabs (protected)
│   │   ├── _layout.tsx          # Tabs navigation
│   │   ├── index.tsx            # Home screen
│   │   └── two.tsx              # Profile screen
│   │
│   ├── _layout.tsx              # Root layout with auth protection
│   └── modal.tsx                # Example modal screen
│
├── components/                   # 🎨 UI Components (Atomic Design)
│   ├── atoms/                   # Basic building blocks
│   │   ├── Button.tsx          # Reusable button component
│   │   ├── Input.tsx           # Text input component
│   │   ├── Label.tsx           # Form label component
│   │   └── ErrorText.tsx       # Error message component
│   │
│   ├── molecules/               # Simple component combinations
│   │   └── InputField.tsx      # Input + Label + ErrorText
│   │
│   ├── organisms/               # Complex components
│   │   ├── LoginForm.tsx       # Complete login form
│   │   └── SignUpForm.tsx      # Complete signup form
│   │
│   ├── TabBarIcon.tsx          # Tab bar icon component
│   └── index.ts                # Component exports
│
├── store/                        # 🗄️ State Management
│   ├── authStore.ts            # Zustand auth store
│   └── store.ts                # Other stores
│
├── utils/                        # 🛠️ Utilities
│   └── supabase.ts             # Supabase client configuration
│
└── Configuration Files
    ├── .env.example            # Environment variables template
    ├── package.json            # Dependencies
    ├── tsconfig.json          # TypeScript config
    ├── tailwind.config.js     # Tailwind CSS config
    └── global.css             # Global styles
```

## 🎯 Key Improvements Made

### 1. Documentation Organization
- ✅ All docs moved to `docs/` folder
- ✅ Clean root directory
- ✅ Easy to find documentation

### 2. Screen Organization
- ✅ Auth screens grouped in `(auth)` folder
- ✅ Protected screens in `(tabs)` folder
- ✅ Clear separation of concerns
- ✅ Better route structure

### 3. Component Cleanup
- ✅ Removed unused initial components
- ✅ Clean component directory
- ✅ Only necessary components remain

### 4. Styling Architecture
- ✅ **All components use NativeWind/Tailwind CSS**
- ✅ No StyleSheet imports
- ✅ Consistent styling approach
- ✅ Utility-first CSS
- ✅ Easier to maintain and modify

### 5. Icon Fix
- ✅ Changed `person` → `user` (valid FontAwesome icon)
- ✅ No more icon warnings

## 🎨 Atomic Design Implementation

### Atoms (Basic Building Blocks)
```tsx
// Button usage
<Button 
  title="Sign In" 
  variant="primary"  // primary | secondary | outline
  loading={false}
  fullWidth
  className="mt-4"
/>

// Input usage
<Input 
  placeholder="Enter email"
  error={false}
  className="mb-2"
/>
```

### Molecules (Component Combinations)
```tsx
// InputField usage
<InputField
  label="Email"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
  placeholder="Enter your email"
  required
/>
```

### Organisms (Complex Components)
```tsx
// LoginForm usage
<LoginForm onSignUpPress={() => router.push('/(auth)/signup')} />

// SignUpForm usage
<SignUpForm onSignInPress={() => router.back()} />
```

## 🎨 Tailwind CSS Classes Reference

### Common Patterns Used

**Layout:**
- `flex-1` - Flex grow
- `flex-row` - Horizontal layout
- `justify-center` - Center horizontally
- `items-center` - Center vertically
- `self-center` - Align self center

**Spacing:**
- `p-4` - Padding 16px
- `m-4` - Margin 16px
- `mt-2` - Margin top 8px
- `mb-4` - Margin bottom 16px
- `px-6` - Horizontal padding 24px

**Colors:**
- `bg-blue-500` - Blue background
- `text-gray-800` - Dark gray text
- `text-white` - White text
- `border-gray-300` - Gray border

**Typography:**
- `text-base` - 16px font size
- `text-lg` - 18px font size
- `text-xl` - 20px font size
- `font-bold` - Bold font weight
- `font-semibold` - Semi-bold weight

**Borders & Radius:**
- `border` - 1px border
- `border-2` - 2px border
- `rounded-lg` - 8px border radius
- `rounded-full` - Fully rounded

**Sizing:**
- `w-full` - Width 100%
- `h-[50px]` - Height 50px
- `max-w-md` - Max width medium

**Background & Shadow:**
- `bg-white` - White background
- `bg-gray-50` - Light gray background
- `shadow-sm` - Small shadow

## 🔒 Route Protection

### How It Works

1. **Root Layout** (`app/_layout.tsx`):
   - Initializes auth on app start
   - Monitors auth state changes
   - Redirects based on authentication status

2. **Protected Routes** (`(tabs)/*`):
   - Only accessible when logged in
   - Automatically redirects to welcome if not authenticated

3. **Public Routes** (`(auth)/*`):
   - Accessible without authentication
   - Redirects to home if already logged in

### Navigation Flow

```
Unauthenticated User:
/(tabs) → Redirect to /(auth)/welcome

Authenticated User:
/(auth)/* → Redirect to /(tabs)
```

## 🚀 Getting Started

1. **Setup Environment:**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm start
   ```

4. **Read Documentation:**
   - Setup: `docs/SETUP_GUIDE.md`
   - Architecture: `docs/ARCHITECTURE_DIAGRAM.md`
   - Testing: `docs/TESTING_CHECKLIST.md`

## 📦 Dependencies

**Core:**
- React Native
- Expo Router
- TypeScript

**State Management:**
- Zustand (auth state)
- AsyncStorage (persistence)

**Backend:**
- Supabase (authentication)

**Styling:**
- NativeWind (Tailwind CSS for React Native)

**Icons:**
- @expo/vector-icons (FontAwesome)

## 🎯 Best Practices

1. **Component Structure:**
   - Keep atoms simple and reusable
   - Combine atoms into molecules
   - Build complex organisms from molecules

2. **Styling:**
   - Use Tailwind classes for all styling
   - Keep utility classes in component files
   - Use `className` prop consistently

3. **State Management:**
   - Use Zustand for global state
   - Keep component state local when possible
   - Use AsyncStorage for persistence

4. **Type Safety:**
   - Always define TypeScript interfaces
   - Use proper typing for props
   - Leverage TypeScript for type checking

5. **File Organization:**
   - Group related files together
   - Use clear, descriptive names
   - Keep documentation updated

## 🔧 Customization

### Change Theme Colors

Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',  // Blue
      secondary: '#6B7280', // Gray
      danger: '#EF4444',   // Red
    }
  }
}
```

### Add New Components

1. Create in appropriate folder (atoms/molecules/organisms)
2. Use Tailwind CSS classes
3. Export from `components/index.ts`
4. Import where needed

### Add New Screens

1. Create in `app/(auth)/` or `app/(tabs)/`
2. Update layout if needed
3. Use existing components
4. Follow Tailwind styling

## 📝 Notes

- All styling is done with Tailwind CSS (NativeWind)
- Documentation is centralized in `docs/` folder
- Auth screens are grouped under `(auth)`
- Protected screens are under `(tabs)`
- Components follow atomic design principles
- Session persists across app restarts
- Route protection is automatic

---

**For detailed information, see:**
- [Setup Guide](./SETUP_GUIDE.md)
- [Architecture Diagrams](./ARCHITECTURE_DIAGRAM.md)
- [Testing Checklist](./TESTING_CHECKLIST.md)
- [Auth Documentation](./AUTH_README.md)
