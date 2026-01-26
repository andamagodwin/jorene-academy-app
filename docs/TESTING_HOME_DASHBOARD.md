# Testing Guide - Home Dashboard

## Quick Setup for Testing

### Step 1: Link Students to Your Parent Account

Run this SQL in Supabase SQL Editor (replace `YOUR_USER_ID` with your actual auth user ID):

```sql
-- First, get your user_id from profiles
SELECT id, full_name, role FROM profiles WHERE role = 'parent';

-- Get your parent record ID
SELECT id, user_id, full_name FROM parents WHERE user_id = 'YOUR_USER_ID_HERE';

-- Link students to your parent account
-- Replace PARENT_ID with the ID from the query above
INSERT INTO parent_students (parent_id, student_id, relationship)
VALUES 
  ('YOUR_PARENT_ID', (SELECT id FROM students WHERE admission_no = 'JOR/001'), 'father'),
  ('YOUR_PARENT_ID', (SELECT id FROM students WHERE admission_no = 'JOR/002'), 'father'),
  ('YOUR_PARENT_ID', (SELECT id FROM students WHERE admission_no = 'JOR/003'), 'father')
ON CONFLICT DO NOTHING;
```

### Step 2: Verify Data

```sql
-- Check if students are linked
SELECT 
  p.full_name as parent_name,
  s.full_name as student_name,
  s.class,
  ps.relationship
FROM parent_students ps
JOIN parents p ON ps.parent_id = p.id
JOIN students s ON ps.student_id = s.id
WHERE p.user_id = 'YOUR_USER_ID';
```

### Step 3: Test the App

1. **Login** as a parent account
2. **See Student Switcher** at the top (if you have multiple children)
3. **Dashboard loads** automatically:
   - ✅ Attendance card shows present/absent
   - 📝 Homework card shows upcoming assignments
   - 📢 Announcements show recent school news
   - ⚠️ Alerts show if student is absent

4. **Switch Students** - Tap the dropdown, select different child
5. **Pull to Refresh** - Drag down to reload data

---

## Sample Test Scenarios

### Scenario 1: Parent with 3 Children
**Expected:**
- Student switcher visible at top
- Can tap and switch between Mary, John, Paul
- Dashboard reloads when switching
- Different homework for different classes

### Scenario 2: Student Present Today
**Expected:**
- Green checkmark icon
- "Present" status
- Time marked (e.g., "8:10 AM")
- No alerts

### Scenario 3: Student Absent Today
**Expected:**
- Red X icon
- "Absent" status
- Alert card shows "Student was absent today"
- Red alert background

### Scenario 4: No Attendance Yet
**Expected:**
- Yellow warning box
- "No attendance recorded yet today"
- Yellow alert generated

### Scenario 5: Homework Due Tomorrow
**Expected:**
- Orange clock icon
- "Due tomorrow" text
- Homework listed in card

---

## Quick Commands

### Get Your User ID (After Login)
In app, the user ID is shown in: `store/authStore` → `user.id`

Or query:
```sql
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';
```

### Add More Homework
```sql
INSERT INTO homework (class, subject, title, due_date)
VALUES ('P5 Blue', 'Social Studies', 'Map Drawing', CURRENT_DATE + INTERVAL '4 days');
```

### Add Today's Attendance
```sql
INSERT INTO attendance (student_id, date, status, time_marked)
VALUES 
  ((SELECT id FROM students WHERE admission_no = 'JOR/001'), CURRENT_DATE, 'present', NOW())
ON CONFLICT (student_id, date) 
DO UPDATE SET status = 'present', time_marked = NOW();
```

### Add Announcement
```sql
INSERT INTO announcements (title, content, target_audience)
VALUES ('Test Announcement', 'This is a test message for parents', 'parents');
```

---

## Troubleshooting

### Dashboard Not Loading?
1. Check if student is linked to your parent account
2. Verify RLS policies allow access
3. Check browser console for errors
4. Try pull-to-refresh

### No Students Showing?
1. Verify parent record exists in `parents` table
2. Check `parent_students` links
3. Ensure student records exist

### "No attendance recorded" Warning?
- This is normal if teacher hasn't marked attendance yet
- Manually add attendance for testing (see commands above)

---

## API Endpoints Being Used

- `GET /profiles?id=eq.{userId}` - Fetch user profile
- `GET /parents?user_id=eq.{userId}` - Fetch parent record
- `GET /parent_students?parent_id=eq.{parentId}` - Fetch linked students
- `GET /attendance?student_id=eq.{studentId}&date=eq.{today}` - Today's attendance
- `GET /homework?class=eq.{class}&due_date=gte.{today}` - Upcoming homework
- `GET /announcements?order=created_at.desc&limit=3` - Recent announcements

---

## Performance Expectations

- **Initial Load:** < 500ms
- **Student Switch:** < 300ms
- **Pull-to-Refresh:** < 400ms

All queries are indexed and run in parallel for optimal performance.

---

*Last Updated: January 25, 2026*
