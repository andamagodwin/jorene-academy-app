# Jorene Academy Color Theme Guide

## 🎨 Color Palette

The app uses a custom color theme defined in `tailwind.config.js`:

| Color Name | Hex Code | Usage |
|-----------|----------|-------|
| **primary** | `#750E11` | Main brand color (deep red) - buttons, accents, active states |
| **secondary** | `#FCB316` | Secondary actions, highlights (gold/orange) |
| **accent** | `#10A753` | Success states, positive actions (green) |
| **info** | `#4D3E84` | Informational elements (purple) |
| **background** | `#FEFEFE` | Main background color (off-white) |
| **neutral** | `#CCBEB7` | Borders, dividers (beige/tan) |

## 📱 Usage in Components

### Tailwind Classes

Use these classes in your components:

```tsx
// Background colors
className="bg-primary"      // Deep red background
className="bg-secondary"    // Gold/orange background
className="bg-accent"       // Green background
className="bg-info"         // Purple background
className="bg-background"   // Off-white background
className="bg-neutral"      // Beige/tan background

// Text colors
className="text-primary"    // Deep red text
className="text-secondary"  // Gold/orange text
className="text-accent"     // Green text
className="text-info"       // Purple text

// Border colors
className="border-primary"   // Deep red border
className="border-neutral"   // Beige/tan border

// With opacity
className="bg-accent/20"     // Green with 20% opacity
className="text-primary/80"  // Red text with 80% opacity
```

### Examples

**Primary Button:**
```tsx
<TouchableOpacity className="bg-primary rounded-lg p-4">
  <Text className="text-white">Click Me</Text>
</TouchableOpacity>
```

**Secondary Button:**
```tsx
<TouchableOpacity className="bg-secondary rounded-lg p-4">
  <Text className="text-white">Secondary Action</Text>
</TouchableOpacity>
```

**Outline Button:**
```tsx
<TouchableOpacity className="bg-transparent border border-primary rounded-lg p-4">
  <Text className="text-primary">Outline Button</Text>
</TouchableOpacity>
```

**Success Badge:**
```tsx
<View className="bg-accent/20 p-2 rounded">
  <Text className="text-accent font-semibold">✓ Success</Text>
</View>
```

**Screen Background:**
```tsx
<View className="flex-1 bg-background">
  {/* Content */}
</View>
```

**Divider:**
```tsx
<View className="border-b border-neutral" />
```

## 🔄 Current Implementation

### Components Updated:
- ✅ **Button** - Primary uses `bg-primary`, outline uses `border-primary` and `text-primary`
- ✅ **Welcome Screen** - Background uses `bg-background`
- ✅ **Login Screen** - Background uses `bg-background`
- ✅ **Signup Screen** - Background uses `bg-background`
- ✅ **Tab Bar** - Active tint color uses primary color `#750E11`
- ✅ **Home Screen** - Background uses `bg-background`, user name uses `text-primary`, status badge uses `bg-accent/20` with `text-accent`
- ✅ **Profile Screen** - Background uses `bg-background`, avatar uses `bg-primary`, borders use `border-neutral`

### Direct Hex Colors (for native props):
Some React Native components don't support Tailwind classes and need hex values:

```tsx
// ActivityIndicator
<ActivityIndicator color="#750E11" />  // primary

// Tab bar (screenOptions)
tabBarActiveTintColor: '#750E11'  // primary
```

## 🎯 Design Guidelines

### When to Use Each Color:

**Primary (`#750E11` - Deep Red):**
- Primary action buttons
- Active navigation states
- Important text/headings
- User avatars
- Brand elements

**Secondary (`#FCB316` - Gold/Orange):**
- Secondary action buttons
- Alternative highlights
- Warning states
- Feature badges

**Accent (`#10A753` - Green):**
- Success messages
- Positive confirmations
- Completion states
- Active/online indicators

**Info (`#4D3E84` - Purple):**
- Informational messages
- Help text
- Educational content
- Special features

**Background (`#FEFEFE` - Off-white):**
- Main screen backgrounds
- Card backgrounds
- Light sections

**Neutral (`#CCBEB7` - Beige/Tan):**
- Borders
- Dividers
- Subtle backgrounds
- Disabled states

## 📝 Best Practices

1. **Consistency**: Always use the theme colors instead of custom colors
2. **Accessibility**: Ensure sufficient contrast (especially text on backgrounds)
3. **Semantic meaning**: Use colors that match their purpose (green for success, etc.)
4. **Opacity**: Use `/20`, `/50`, `/80` modifiers for subtle variations
5. **Dark mode**: Consider adding dark mode variants in the future

## 🔧 Extending the Theme

To add more colors, edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: "#750E11",
      secondary: "#FCB316",
      // Add new colors here
      danger: "#DC2626",
      warning: "#F59E0B",
    },
  },
},
```

Then use them with Tailwind classes:
```tsx
className="bg-danger"
className="text-warning"
```

---

**Color Swatches:**

🟥 Primary: #750E11  
🟧 Secondary: #FCB316  
🟩 Accent: #10A753  
🟪 Info: #4D3E84  
⬜ Background: #FEFEFE  
🟫 Neutral: #CCBEB7
