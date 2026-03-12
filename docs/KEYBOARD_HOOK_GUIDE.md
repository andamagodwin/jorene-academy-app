# useKeyboardAvoidingView Hook

## Overview

A custom React hook that provides manual keyboard avoidance for forms and input screens. It listens to keyboard show/hide events and provides padding values to prevent the keyboard from covering important UI elements like buttons.

## Features

✅ Cross-platform support (iOS & Android)
✅ Smooth animations (uses `keyboardWillShow/Hide` on iOS)
✅ Automatic height calculation
✅ Easy integration with ScrollView
✅ Lightweight and performant

## Usage

### Basic Implementation

```tsx
import { useKeyboardAvoidingView } from '~/hooks/useKeyboardAvoidingView';

function MyFormScreen() {
  const { paddingBottom } = useKeyboardAvoidingView();

  return (
    <ScrollView
      contentContainerStyle={{ 
        flexGrow: 1, 
        padding: 24, 
        paddingBottom: paddingBottom + 24 
      }}>
      {/* Your form content */}
    </ScrollView>
  );
}
```

### Complete Example with Keyboard Dismissal

```tsx
import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useKeyboardAvoidingView } from '~/hooks/useKeyboardAvoidingView';

export default function LoginScreen() {
  const { paddingBottom, isKeyboardVisible } = useKeyboardAvoidingView();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-background">
        <ScrollView
          contentContainerStyle={{ 
            flexGrow: 1, 
            justifyContent: 'center', 
            padding: 24, 
            paddingBottom: paddingBottom + 24 
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="w-full max-w-md self-center">
            {/* Your form components */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
```

## API Reference

### Return Values

The hook returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `keyboardHeight` | `number` | The current height of the keyboard in pixels |
| `isKeyboardVisible` | `boolean` | Whether the keyboard is currently visible |
| `paddingBottom` | `number` | Calculated padding value (same as `keyboardHeight` when visible, 0 when hidden) |

### Usage Examples

**Check if keyboard is visible:**
```tsx
const { isKeyboardVisible } = useKeyboardAvoidingView();

{isKeyboardVisible && (
  <Text>Keyboard is open</Text>
)}
```

**Get exact keyboard height:**
```tsx
const { keyboardHeight } = useKeyboardAvoidingView();

console.log('Keyboard height:', keyboardHeight);
```

**Apply padding:**
```tsx
const { paddingBottom } = useKeyboardAvoidingView();

<View style={{ paddingBottom }}>
  {/* Content */}
</View>
```

## How It Works

1. **Listens to Keyboard Events**: Uses `Keyboard.addListener` to detect keyboard show/hide events
2. **Platform-Specific**: 
   - iOS: Uses `keyboardWillShow/Hide` for smooth animations
   - Android: Uses `keyboardDidShow/Hide`
3. **Automatic Cleanup**: Removes listeners when component unmounts
4. **Height Calculation**: Extracts keyboard height from event data

## Best Practices

### ✅ Do:
- Use with `ScrollView` for forms with multiple inputs
- Combine with `TouchableWithoutFeedback` to dismiss keyboard on tap
- Add extra padding to `paddingBottom` for comfortable spacing
- Use `keyboardShouldPersistTaps="handled"` on ScrollView

### ❌ Don't:
- Don't use if React Native's `KeyboardAvoidingView` alone works for your use case
- Don't forget to add cleanup (handled automatically by the hook)
- Don't hardcode keyboard heights

## Troubleshooting

### Button still hidden on Android?
Try increasing the padding:
```tsx
paddingBottom: paddingBottom + 48 // More space
```

### ScrollView not scrolling?
Ensure `flexGrow: 1` is set:
```tsx
contentContainerStyle={{ flexGrow: 1, paddingBottom }}
```

### Keyboard dismissal not working?
Wrap with `TouchableWithoutFeedback`:
```tsx
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  {/* Content */}
</TouchableWithoutFeedback>
```

## Integration Points

This hook is currently used in:
- ✅ Login Screen (`app/(auth)/login.tsx`)
- ✅ Signup Screen (`app/(auth)/signup.tsx`)

## Platform Differences

| Feature | iOS | Android |
|---------|-----|---------|
| Event Type | `keyboardWillShow/Hide` | `keyboardDidShow/Hide` |
| Animation | Smooth (pre-animated) | Instant |
| Height Accuracy | Very accurate | Accurate |

## Performance

- **Memory**: Minimal (2 state variables)
- **Re-renders**: Only on keyboard show/hide
- **Listeners**: Properly cleaned up
- **Impact**: Negligible performance impact

---

**Location**: `hooks/useKeyboardAvoidingView.ts`
