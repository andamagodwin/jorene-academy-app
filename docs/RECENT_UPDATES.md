# Recent Updates

## 🆕 Latest Changes (January 24, 2026)

### Smart First-Visit Detection

**Feature**: The app now remembers if a user has visited before and adjusts the login flow accordingly.

**How it Works**:
1. **First Time Ever**: User sees Welcome screen with options to Sign In or Create Account
2. **Returning Users**: App skips Welcome and goes directly to Login screen
3. **Logged In Users**: App goes straight to Home screen (no auth screens at all)

**Benefits**:
- ✅ Better UX - returning users save a tap
- ✅ Faster access to login
- ✅ Professional app behavior
- ✅ Welcome screen only shown when meaningful

### Implementation Details

**Storage Key**: `@jorene_academy_has_visited`

**Store State**:
```typescript
isFirstVisit: boolean  // true if user has never opened app before
```

**When Visit is Marked**:
- When user taps "Sign In" or "Create Account" on Welcome screen
- When user successfully signs in
- When user successfully signs up

**Navigation Logic**:
```
App Launch
    ↓
Check Auth State
    ↓
┌───────────────────────────────────┐
│ User logged in?                   │
├───────────────────────────────────┤
│ YES → Go to Home (/(tabs))        │
│                                   │
│ NO → Check first visit            │
│      ↓                            │
│      First time? → Welcome        │
│      Returning?  → Login          │
└───────────────────────────────────┘
```

### Files Modified

1. **store/authStore.ts**
   - Added `isFirstVisit` state
   - Added `markAsVisited()` method
   - Integrated AsyncStorage check on initialize
   - Auto-mark as visited on successful sign in/up

2. **app/_layout.tsx**
   - Updated navigation logic to check `isFirstVisit`
   - Smart redirect based on visit status

3. **app/(auth)/welcome.tsx**
   - Calls `markAsVisited()` when user navigates to auth screens

### Testing the Feature

**Test Case 1: First Time User**
```
1. Install app (or clear app data)
2. Launch app
Expected: See Welcome screen
3. Tap any button (Sign In or Create Account)
Expected: Visit is marked
4. Go back to Welcome
5. Close app and reopen
Expected: Go directly to Login screen (skip Welcome)
```

**Test Case 2: Returning User**
```
1. App previously opened
2. User is logged out
3. Launch app
Expected: Go directly to Login screen
4. Should never see Welcome again
```

**Test Case 3: Logged In User**
```
1. User has active session
2. Launch app
Expected: Go directly to Home screen
3. No auth screens shown at all
```

### Reset First Visit (For Testing)

**Clear App Data**:
```bash
# iOS Simulator
Device → Erase All Content and Settings

# Android Emulator
Settings → Apps → Jorene Academy → Clear Data

# Or programmatically in app
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.removeItem('@jorene_academy_has_visited');
```

### Future Enhancements

Possible additions:
- [ ] Show Welcome screen again after major app updates
- [ ] Add "Skip" option on Welcome screen
- [ ] Track version with first visit for feature tours
- [ ] Add onboarding tutorial for first-time users
- [ ] Allow manual reset in app settings

---

**Previous Updates**: See git history for all changes
