// Database types for Jorene Academy School System

export type UserRole = 'parent' | 'teacher' | 'admin';

export type Gender = 'male' | 'female';

export type Relationship = 'father' | 'mother' | 'guardian';

export type AttendanceStatus = 'present' | 'absent';

export type AnnouncementAudience = 'all' | 'parents' | 'teachers' | 'specific_class';

export interface Profile {
  id: string; // references auth.users.id
  full_name: string;
  role: UserRole;
  phone?: string;
  created_at: string;
}

export interface Student {
  id: string;
  full_name: string;
  class: string;
  admission_no: string;
  gender?: Gender;
  dob?: string; // ISO date string
  photo_url?: string;
  created_at: string;
}

export interface Parent {
  id: string;
  user_id: string; // references auth.users.id
  full_name: string;
  phone?: string;
  email?: string;
  address?: string;
  created_at: string;
}

export interface ParentStudent {
  id: string;
  parent_id: string;
  student_id: string;
  relationship: Relationship;
  created_at: string;
}

export interface Attendance {
  id: string;
  student_id: string;
  date: string; // ISO date string
  status: AttendanceStatus;
  time_marked?: string; // ISO timestamp
  created_at: string;
}

export interface Homework {
  id: string;
  class: string;
  subject: string;
  title: string;
  description?: string;
  due_date: string; // ISO date string
  file_url?: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  target_audience?: AnnouncementAudience;
  specific_class?: string;
  created_at: string;
}

export interface Result {
  id: string;
  student_id: string;
  subject: string;
  term: string; // e.g., "Term 1", "Term 2"
  score: number; // 0-100
  grade: string; // A, B, C, D, E, F
  teacher_comment?: string;
  created_at: string;
}

export interface Timetable {
  id: string;
  class: string;
  day: string; // Monday, Tuesday, etc.
  start_time: string; // HH:MM format
  end_time: string; // HH:MM format
  subject: string;
  teacher: string;
  room?: string;
  created_at: string;
}

// Extended types with relationships
export interface StudentWithRelationship extends Student {
  relationship?: Relationship;
}

export interface ParentWithChildren extends Parent {
  children?: StudentWithRelationship[];
}

export interface ProfileWithParent extends Profile {
  parent?: ParentWithChildren;
}
