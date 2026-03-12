import { User, Session } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import { Profile, Student, Parent, UserRole } from '../types/database';

const HAS_VISITED_KEY = '@jorene_academy_has_visited';

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  parent: Parent | null;
  students: Student[];
  selectedStudent: Student | null;
  isLoading: boolean;
  isInitialized: boolean;
  isFirstVisit: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  loadProfile: () => Promise<void>;
  loadStudents: () => Promise<void>;
  setSelectedStudent: (student: Student) => void;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  markAsVisited: () => Promise<void>;
  updateProfileAvatar: (avatarUrl: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  parent: null,
  students: [],
  selectedStudent: null,
  isLoading: false,
  isInitialized: false,
  isFirstVisit: true,

  loadProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      // If no profile exists, user signed up before profile system
      if (!profile) {
        console.log('No profile found for user. Please complete profile setup.');
        set({ profile: null });
        return;
      }

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return;
      }

      set({ profile });

      // If parent, load parent record and students
      if (profile?.role === 'parent') {
        await get().loadStudents();
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  },

  loadStudents: async () => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true });
    try {
      // Fetch parent record
      const { data: parent, error: parentError } = await supabase
        .from('parents')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (parentError) throw parentError;

      set({ parent });

      // Fetch linked students
      const { data: parentStudents, error: studentsError } = await supabase
        .from('parent_students')
        .select(`
          relationship,
          students (*)
        `)
        .eq('parent_id', parent.id);

      if (studentsError) throw studentsError;

      const students = parentStudents?.map((ps: any) => ({
        ...ps.students,
        relationship: ps.relationship,
      })) || [];

      set({ 
        students,
        selectedStudent: students[0] || null,
      });
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedStudent: (student: Student) => {
    set({ selectedStudent: student });
  },

  initialize: async () => {
    try {
      // Check if user has visited before
      const hasVisited = await AsyncStorage.getItem(HAS_VISITED_KEY);
      
      // Get the current session from Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      set({
        user: session?.user ?? null,
        session: session ?? null,
        isFirstVisit: hasVisited === null,
      });

      // Load profile if user is authenticated (wait for it to complete)
      if (session?.user) {
        await get().loadProfile();
      }

      // Mark as initialized AFTER all data is loaded
      set({ isInitialized: true });

      // Listen for auth state changes
      supabase.auth.onAuthStateChange(async (_event, session) => {
        set({
          user: session?.user ?? null,
          session: session ?? null,
        });
        
        if (session?.user) {
          await get().loadProfile();
        }
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isInitialized: true });
    }
  },

  markAsVisited: async () => {
    try {
      await AsyncStorage.setItem(HAS_VISITED_KEY, 'true');
      set({ isFirstVisit: false });
    } catch (error) {
      // Mark as visited on successful login
      await get().markAsVisited();

      console.error('Error marking as visited:', error);
    }
  },

  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({
        user: data.user,
        session: data.session,
      });

      // Load profile after successful sign in
      await get().loadProfile();
      
      // Mark as visited on successful login
      await get().markAsVisited();

      set({ isLoading: false });

      return { error: null };
    } catch (error) {
      set({ isLoading: false });
      return { error: error as Error };
    }
  },

  signUp: async (email: string, password: string, fullName: string, role: UserRole = 'parent') => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error('No user returned from signup');

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: fullName,
          role: role,
        });

      if (profileError) throw profileError;

      // If parent, create parent record
      if (role === 'parent') {
        const { error: parentError } = await supabase
          .from('parents')
          .insert({
            user_id: data.user.id,
            full_name: fullName,
            email: email,
          });

        if (parentError) throw parentError;
      }

      set({
        user: data.user,
        session: data.session,
      });

      // Load profile after successful signup
      await get().loadProfile();
      
      // Mark as visited on successful signup
      await get().markAsVisited();

      set({ isLoading: false });

      return { error: null };
    } catch (error) {
      set({ isLoading: false });
      return { error: error as Error };
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await supabase.auth.signOut();
      set({
        user: null,
        session: null,
        profile: null,
        parent: null,
        students: [],
        selectedStudent: null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error signing out:', error);
      set({ isLoading: false });
    }
  },

  setUser: (user: User | null) => set({ user }),
  setSession: (session: Session | null) => set({ session }),

  updateProfileAvatar: (avatarUrl: string) => {
    const { profile } = get();
    if (profile) {
      set({ profile: { ...profile, avatar_url: avatarUrl } });
    }
  },
}));
