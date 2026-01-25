# Role-Based System Implementation Guide

## ✅ Implementation Summary

This document describes the complete role-based authentication system for Jorene Academy School System.

## 📊 Database Tables Created

### 1. **profiles** (5 columns)
Links auth users to their roles and basic info.

```sql
id UUID PRIMARY KEY (references auth.users.id)
full_name TEXT NOT NULL
role TEXT CHECK (role IN ('parent','teacher','admin'))
phone TEXT
created_at TIMESTAMP DEFAULT NOW()
```

**Purpose:** Determines user permissions and UI access.

### 2. **students** (8 columns)
Stores complete student information.

```sql
id UUID PRIMARY KEY
full_name TEXT NOT NULL
class TEXT NOT NULL (e.g., "P5 Blue")
admission_no TEXT UNIQUE NOT NULL
gender TEXT CHECK (gender IN ('male','female'))
dob DATE
photo_url TEXT
created_at TIMESTAMP DEFAULT NOW()
```

**Purpose:** Central student records accessible by parents/teachers/admins.

### 3. **parents** (7 columns)
Stores parent/guardian information.

```sql
id UUID PRIMARY KEY
user_id UUID (references auth.users.id)
full_name TEXT NOT NULL
phone TEXT
email TEXT
address TEXT
created_at TIMESTAMP DEFAULT NOW()
```

**Purpose:** Links auth users to parent records for student relationships.

### 4. **parent_students** (5 columns)
Many-to-many relationship table.

```sql
id UUID PRIMARY KEY
parent_id UUID (references parents.id)
student_id UUID (references students.id)
relationship TEXT CHECK (relationship IN ('father','mother','guardian'))
created_at TIMESTAMP DEFAULT NOW()
UNIQUE(parent_id, student_id)
```

**Purpose:** Allows multiple children per parent (common in Uganda 🇺🇬).

## 🔐 Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **profiles**: Users can read/update their own, admins can manage all
- **students**: Parents see their children, teachers see all, admins manage all
- **parents**: Users see their own record, admins manage all
- **parent_students**: Parents see their links, admins manage all

## 📱 Application Flow

### Sign Up Flow

1. User enters name, email, password, and selects role (👨‍👩‍👧 Parent or 👨‍🏫 Teacher)
2. System creates:
   - Auth user in `auth.users`
   - Profile in `profiles` table
   - If parent: creates record in `parents` table
3. User is redirected to home screen

### Sign In Flow

1. User enters email/password
2. System authenticates via Supabase Auth
3. Loads profile from `profiles` table
4. If parent: loads children from `students` via `parent_students`
5. Redirects to home screen with role-based UI

### Multi-Child Support

Parents with multiple children can switch between them:

```typescript
const { students, selectedStudent, setSelectedStudent } = useAuthStore();

// Switch student
setSelectedStudent(students[1]);
```

## 🎨 Role-Based UI

### Home Screen Features

**For Parents:**
- Student switcher (if multiple children)
- Current student profile card
- Academic progress (future)
- Fee status (future)

**For Teachers:**
- Class list
- Attendance marking
- Grade entry

**For Admins:**
- System dashboard
- User management
- Reports

## 💾 Zustand Store Structure

```typescript
{
  user: User | null,              // Auth user
  session: Session | null,         // Auth session
  profile: Profile | null,         // User profile with role
  parent: Parent | null,           // Parent record (if role=parent)
  students: Student[],             // Linked children
  selectedStudent: Student | null, // Currently selected child
  
  loadProfile(),                   // Fetches profile and students
  loadStudents(),                  // Fetches parent's children
  setSelectedStudent(student)      // Switches active child
}
```

## 🔄 Data Relationships

```
auth.users (Supabase Auth)
    ↓
profiles (role: parent/teacher/admin)
    ↓
parents (if role=parent)
    ↓
parent_students (link table)
    ↓
students (actual children)
```

## 📝 TypeScript Types

Created in `types/database.ts`:
- `UserRole`: 'parent' | 'teacher' | 'admin'
- `Profile`: User profile with role
- `Student`: Student information
- `Parent`: Parent/guardian info
- `ParentStudent`: Link table entry

## 🛠️ Service Functions

Created in `utils/profileService.ts`:

### Profile Management
- `fetchProfile(userId)` - Get user profile
- `createProfile(userId, fullName, role)` - Create profile
- `updateProfile(userId, updates)` - Update profile

### Student Management
- `fetchParentStudents(parentId)` - Get parent's children
- `fetchAllStudents()` - Get all students (teachers/admins)
- `createStudent(...)` - Create new student (admin only)

### Parent Management
- `fetchParent(userId)` - Get parent record
- `createParent(userId, fullName, email)` - Create parent
- `linkStudentToParent(parentId, studentId, relationship)` - Link child

## 🚀 Next Steps

### Immediate Enhancements

1. **Admin Panel**
   - Create students
   - Link students to parents
   - Assign teachers to classes

2. **Student Features**
   - Grades/marks
   - Attendance records
   - Fee payments
   - Assignments

3. **Teacher Features**
   - Class management
   - Attendance marking
   - Grade entry

4. **Parent Features**
   - View child's grades
   - Fee payment history
   - Teacher messaging

### Future Modules

- **Academics**: Subjects, exams, report cards
- **Finance**: Fees, payments, receipts
- **Communication**: Notifications, messaging
- **Attendance**: Daily tracking
- **Timetable**: Schedule management

## 🧪 Testing Checklist

- [x] Database tables created with correct columns
- [x] RLS policies applied
- [x] Profile created on signup
- [x] Parent record created for parent role
- [x] Profile loaded on signin
- [x] Students loaded for parents
- [x] Role badge displayed correctly
- [x] Student switcher works (if multiple children)
- [ ] Admin can create students
- [ ] Admin can link students to parents
- [ ] Teachers can view all students

## 📌 Important Notes

1. **First User Setup**: The first admin must be created manually via Supabase dashboard or SQL:
   ```sql
   INSERT INTO profiles (id, full_name, role)
   VALUES ('auth-user-id', 'Admin Name', 'admin');
   ```

2. **Student Creation**: Currently no UI for creating students. Admins need a dedicated screen.

3. **Multi-Child Testing**: To test, manually insert students and link via SQL:
   ```sql
   -- Insert student
   INSERT INTO students (full_name, class, admission_no, gender)
   VALUES ('John Doe', 'P5 Blue', 'JOR/001', 'male');
   
   -- Link to parent
   INSERT INTO parent_students (parent_id, student_id, relationship)
   VALUES ('parent-uuid', 'student-uuid', 'father');
   ```

## 🎓 Educational Context

This system is designed specifically for **Ugandan schools** where:
- Multiple children per family is very common (2-5 kids average)
- Parents need easy switching between children
- Teachers manage multiple classes
- Admins need full system oversight

The role system ensures appropriate data access while maintaining security through Supabase RLS.

---

**Implementation Date:** January 25, 2026  
**Version:** 1.0  
**Status:** ✅ Core system complete, ready for feature development
