# Testing Checklist

## ✅ Pre-Launch Checklist

### Environment Setup
- [ ] `.env` file created with Supabase credentials
- [ ] `EXPO_PUBLIC_SUPABASE_URL` set correctly
- [ ] `EXPO_PUBLIC_SUPABASE_KEY` set correctly
- [ ] Dependencies installed (`npm install`)
- [ ] No build errors (`npm start`)

### Supabase Configuration
- [ ] Supabase project created
- [ ] Email authentication enabled
- [ ] (Dev) Email confirmation disabled OR configured
- [ ] Test user created in Supabase dashboard

## 🧪 Functional Testing

### Sign Up Flow
- [ ] Open app → Shows Welcome screen
- [ ] Tap "Create Account" → Shows Sign Up screen
- [ ] Leave all fields empty → Shows validation errors
- [ ] Enter invalid email → Shows "Email is invalid"
- [ ] Enter short password (<6 chars) → Shows error
- [ ] Passwords don't match → Shows "Passwords do not match"
- [ ] Enter valid details → Account created successfully
- [ ] Automatically redirected to Home screen
- [ ] User info displayed correctly on Home
- [ ] Profile tab shows correct user details

### Sign In Flow
- [ ] Sign out from app
- [ ] Open app → Shows Welcome screen
- [ ] Tap "Sign In" → Shows Login screen
- [ ] Leave fields empty → Shows validation errors
- [ ] Enter wrong credentials → Shows error message
- [ ] Enter correct credentials → Login successful
- [ ] Redirected to Home screen
- [ ] User info displayed correctly

### Session Persistence
- [ ] Log in successfully
- [ ] Close app completely (force quit)
- [ ] Reopen app
- [ ] Automatically logged in (goes to Home, not Welcome)
- [ ] User info still displayed
- [ ] Can navigate between tabs
- [ ] Session persists after device restart (if possible)

### Sign Out Flow
- [ ] From Home screen header → Tap "Logout"
- [ ] Confirmation dialog appears
- [ ] Tap "Cancel" → Stays logged in
- [ ] Tap "Logout" again → Tap "Sign Out"
- [ ] Redirected to Welcome screen
- [ ] Cannot access Home by going back
- [ ] From Profile tab → Tap "Sign Out"
- [ ] Same behavior as above

### Navigation Protection
- [ ] While logged out, cannot access /(tabs) routes
- [ ] While logged in, cannot access /welcome
- [ ] Deep links respect auth state
- [ ] Browser back button works correctly (web)

### Error Handling
- [ ] Network offline → Shows appropriate error
- [ ] Invalid credentials → Clear error message
- [ ] Email already exists → Clear error message
- [ ] Server error → App doesn't crash
- [ ] Loading states shown during API calls

### UI/UX Testing
- [ ] All screens look professional
- [ ] Buttons have loading states
- [ ] Forms validate on input change
- [ ] Error messages clear and helpful
- [ ] Keyboard doesn't cover inputs
- [ ] Can dismiss keyboard
- [ ] Touch targets adequate size
- [ ] Colors consistent across app

### Cross-Platform Testing
- [ ] Android - All features work
- [ ] iOS - All features work  
- [ ] Web - All features work
- [ ] Tablet/landscape - UI looks good

## 🔒 Security Testing

### Password Security
- [ ] Passwords not visible in logs
- [ ] Passwords not stored in plain text
- [ ] Cannot access protected routes without auth
- [ ] Session tokens properly secured

### Session Management
- [ ] Token refresh works automatically
- [ ] Expired tokens handled gracefully
- [ ] Multiple devices can be logged in
- [ ] Sign out clears all local data

## 📱 Edge Cases

### Unusual Inputs
- [ ] Very long email (100+ chars)
- [ ] Very long password (100+ chars)
- [ ] Special characters in name
- [ ] Emoji in fields (should work or reject gracefully)
- [ ] SQL injection attempts (handled by Supabase)

### Network Issues
- [ ] Slow connection - Shows loading state
- [ ] Connection lost mid-request - Error shown
- [ ] Connection restored - Can retry

### User Behavior
- [ ] Tap sign in multiple times rapidly
- [ ] Navigate away during loading
- [ ] Fill form, close app, reopen (form cleared)
- [ ] Switch between sign in/sign up multiple times

## 🎯 Performance Testing

- [ ] App loads quickly (<3s)
- [ ] Auth check doesn't block UI
- [ ] No unnecessary re-renders
- [ ] Smooth animations
- [ ] No memory leaks (profile in DevTools)

## 📝 Documentation Check

- [ ] README files created
- [ ] Setup instructions clear
- [ ] Code comments where needed
- [ ] TypeScript types documented
- [ ] Example .env file provided

## 🚀 Production Readiness

Before deploying:
- [ ] Enable email confirmation in Supabase
- [ ] Set up email templates
- [ ] Configure password reset flow
- [ ] Add terms of service link
- [ ] Add privacy policy link
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Enable analytics
- [ ] Test on real devices
- [ ] Performance profiling done
- [ ] Security audit completed

---

## 📊 Test Results Template

```
Date: _______________
Tester: _____________
Platform: ___________
Device: _____________

Sign Up: ✅ / ❌
Sign In: ✅ / ❌
Sign Out: ✅ / ❌
Session Persistence: ✅ / ❌
Route Protection: ✅ / ❌
Error Handling: ✅ / ❌

Issues Found:
1. _______________________
2. _______________________
3. _______________________

Notes:
_________________________
_________________________
```

## 🐛 Common Issues & Solutions

### Issue: App crashes on launch
**Check:**
- Environment variables set correctly
- No syntax errors in code
- Dependencies installed

### Issue: Can't log in
**Check:**
- Supabase credentials correct
- User exists in Supabase dashboard
- Network connection working

### Issue: Session not persisting
**Check:**
- AsyncStorage permissions
- Supabase client configuration
- Device storage not full

### Issue: Validation not working
**Check:**
- Form state updating correctly
- Error messages defined
- Validation logic correct

---

**When all items checked:** ✅ Ready for production!
