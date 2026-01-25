// Database types for Jorene Academy School System

export type UserRole = 'parent' | 'teacher' | 'admin';

export type Gender = 'male' | 'female';

export type Relationship = 'father' | 'mother' | 'guardian';

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
