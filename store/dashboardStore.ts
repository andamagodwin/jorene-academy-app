import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import { Attendance, Homework, Announcement } from '../types/database';

export interface DashboardAlert {
  type: 'fees' | 'attendance' | 'performance' | 'general';
  message: string;
  severity: 'warning' | 'error' | 'info';
}

export interface DashboardState {
  attendance: Attendance | null;
  homework: Homework[];
  announcements: Announcement[];
  alerts: DashboardAlert[];
  isLoading: boolean;

  loadDashboardData: (studentId: string, studentClass: string) => Promise<void>;
  generateAlerts: (attendance: Attendance | null, studentId: string) => void;
  clearDashboard: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  attendance: null,
  homework: [],
  announcements: [],
  alerts: [],
  isLoading: false,

  loadDashboardData: async (studentId: string, studentClass: string) => {
    set({ isLoading: true });

    try {
      const today = new Date().toISOString().split('T')[0];

      // Fetch all data in parallel
      const [attendanceRes, homeworkRes, announcementsRes] = await Promise.all([
        // Today's attendance
        supabase
          .from('attendance')
          .select('*')
          .eq('student_id', studentId)
          .eq('date', today)
          .maybeSingle(),

        // Upcoming homework
        supabase
          .from('homework')
          .select('*')
          .eq('class', studentClass)
          .gte('due_date', today)
          .order('due_date', { ascending: true })
          .limit(3),

        // Recent announcements
        supabase
          .from('announcements')
          .select('*')
          .or(`target_audience.eq.all,target_audience.eq.parents,and(target_audience.eq.specific_class,specific_class.eq.${studentClass})`)
          .order('created_at', { ascending: false })
          .limit(3),
      ]);

      const attendance = attendanceRes.data || null;
      const homework = homeworkRes.data || [];
      const announcements = announcementsRes.data || [];

      set({ attendance, homework, announcements });

      // Generate alerts based on data
      get().generateAlerts(attendance, studentId);

      set({ isLoading: false });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      set({ isLoading: false });
    }
  },

  generateAlerts: (attendance: Attendance | null, studentId: string) => {
    const alerts: DashboardAlert[] = [];
    const announcements = get().announcements;

    // Check attendance
    if (!attendance) {
      alerts.push({
        type: 'attendance',
        message: 'No attendance recorded today',
        severity: 'warning',
      });
    } else if (attendance.status === 'absent') {
      alerts.push({
        type: 'attendance',
        message: 'Student was absent today',
        severity: 'error',
      });
    }

    // Map recent announcements to general alerts
    if (announcements && announcements.length > 0) {
      announcements.forEach((ann) => {
        alerts.push({
          type: 'general',
          message: `${ann.title}: ${ann.content}`,
          severity: 'info',
        });
      });
    }

    // TODO: Add more alert logic
    // - Check fees balance (when fees module is ready)
    // - Check for low performance (when grades module is ready)
    // - Check for pending homework submissions

    set({ alerts });
  },

  clearDashboard: () => {
    set({
      attendance: null,
      homework: [],
      announcements: [],
      alerts: [],
    });
  },
}));
