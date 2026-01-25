// Profile and user management services
import { supabase } from './supabase';
import { Profile, Student, Parent, UserRole } from '../types/database';

/**
 * Fetch user profile by user ID
 */
export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
};

/**
 * Create a new profile
 */
export const createProfile = async (
  userId: string,
  fullName: string,
  role: UserRole,
  phone?: string
): Promise<{ error: Error | null }> => {
  const { error } = await supabase.from('profiles').insert({
    id: userId,
    full_name: fullName,
    role,
    phone,
  });

  if (error) {
    console.error('Error creating profile:', error);
    return { error: new Error(error.message) };
  }

  return { error: null };
};

/**
 * Update existing profile
 */
export const updateProfile = async (
  userId: string,
  updates: Partial<Profile>
): Promise<{ error: Error | null }> => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) {
    console.error('Error updating profile:', error);
    return { error: new Error(error.message) };
  }

  return { error: null };
};

/**
 * Fetch parent record by user ID
 */
export const fetchParent = async (userId: string): Promise<Parent | null> => {
  const { data, error } = await supabase
    .from('parents')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching parent:', error);
    return null;
  }

  return data;
};

/**
 * Fetch all students linked to a parent
 */
export const fetchParentStudents = async (parentId: string): Promise<Student[]> => {
  const { data, error } = await supabase
    .from('parent_students')
    .select(`
      relationship,
      students (*)
    `)
    .eq('parent_id', parentId);

  if (error) {
    console.error('Error fetching parent students:', error);
    return [];
  }

  return data?.map((ps: any) => ({
    ...ps.students,
    relationship: ps.relationship,
  })) || [];
};

/**
 * Create a parent record
 */
export const createParent = async (
  userId: string,
  fullName: string,
  email?: string,
  phone?: string,
  address?: string
): Promise<{ parentId: string | null; error: Error | null }> => {
  const { data, error } = await supabase
    .from('parents')
    .insert({
      user_id: userId,
      full_name: fullName,
      email,
      phone,
      address,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating parent:', error);
    return { parentId: null, error: new Error(error.message) };
  }

  return { parentId: data.id, error: null };
};

/**
 * Link a student to a parent
 */
export const linkStudentToParent = async (
  parentId: string,
  studentId: string,
  relationship: 'father' | 'mother' | 'guardian'
): Promise<{ error: Error | null }> => {
  const { error } = await supabase.from('parent_students').insert({
    parent_id: parentId,
    student_id: studentId,
    relationship,
  });

  if (error) {
    console.error('Error linking student to parent:', error);
    return { error: new Error(error.message) };
  }

  return { error: null };
};

/**
 * Fetch all students (for teachers/admins)
 */
export const fetchAllStudents = async (): Promise<Student[]> => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('full_name');

  if (error) {
    console.error('Error fetching students:', error);
    return [];
  }

  return data || [];
};

/**
 * Create a new student (admin only)
 */
export const createStudent = async (
  fullName: string,
  className: string,
  admissionNo: string,
  gender?: 'male' | 'female',
  dob?: string,
  photoUrl?: string
): Promise<{ studentId: string | null; error: Error | null }> => {
  const { data, error } = await supabase
    .from('students')
    .insert({
      full_name: fullName,
      class: className,
      admission_no: admissionNo,
      gender,
      dob,
      photo_url: photoUrl,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating student:', error);
    return { studentId: null, error: new Error(error.message) };
  }

  return { studentId: data.id, error: null };
};
