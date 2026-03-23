import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import { Homework, Announcement, SchoolEvent } from '../types/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const READ_ALERTS_KEY = '@jorene_read_alerts';

export interface DashboardAlert {
  id: string;
  title: string;
  message: string;
  type: 'finance' | 'performance' | 'general';
  severity: 'warning' | 'error' | 'info';
  isRead: boolean;
  date: string;
}

export interface DashboardState {
  homework: Homework[];
  announcements: Announcement[];
  events: SchoolEvent[];
  alerts: DashboardAlert[];
  readAlertIds: string[];
  isLoading: boolean;

  loadDashboardData: (studentId: string, studentClass: string) => Promise<void>;
  generateAlerts: (studentId: string) => void;
  markAlertAsRead: (id: string) => Promise<void>;
  clearDashboard: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  homework: [],
  announcements: [],
  events: [],
  alerts: [],
  readAlertIds: [],
  isLoading: false,

  loadDashboardData: async (studentId: string, studentClass: string) => {
    set({ isLoading: true });

    try {
      const today = new Date().toISOString().split('T')[0];

      // Fetch all data in parallel
      const [homeworkRes, announcementsRes, eventsRes, readAlertKeys] = await Promise.all([
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

        // Upcoming events
        supabase
          .from('events')
          .select('*')
          .gte('event_date', today)
          .order('event_date', { ascending: true })
          .limit(5),

        // Read alerts
        AsyncStorage.getItem(READ_ALERTS_KEY),
      ]);

      const homework = homeworkRes.data || [];
      const announcements = announcementsRes.data || [];
      const events = eventsRes.data || [];
      const readAlertIds = readAlertKeys ? JSON.parse(readAlertKeys) : [];

      set({ homework, announcements, events, readAlertIds });

      // Generate alerts based on data
      get().generateAlerts(studentId);

      set({ isLoading: false });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      set({ isLoading: false });
    }
  },

  generateAlerts: (studentId: string) => {
    const alerts: DashboardAlert[] = [];
    const { announcements, readAlertIds } = get();

    // Map recent announcements to general alerts
    if (announcements && announcements.length > 0) {
      announcements.forEach((ann) => {
        alerts.push({
          id: `announcement-${ann.id}`,
          title: ann.title,
          type: 'general',
          message: ann.content,
          severity: 'info',
          isRead: readAlertIds.includes(`announcement-${ann.id}`),
          date: ann.created_at,
        });
      });
    }

    set({ alerts });
  },

  markAlertAsRead: async (id: string) => {
    const { readAlertIds, alerts } = get();
    if (!readAlertIds.includes(id)) {
      const newReadAlertIds = [...readAlertIds, id];
      set({ readAlertIds: newReadAlertIds });
      await AsyncStorage.setItem(READ_ALERTS_KEY, JSON.stringify(newReadAlertIds));
      
      // Update alerts array
      const updatedAlerts = alerts.map(alert => 
        alert.id === id ? { ...alert, isRead: true } : alert
      );
      set({ alerts: updatedAlerts });
    }
  },

  clearDashboard: () => {
    set({
      homework: [],
      announcements: [],
      events: [],
      alerts: [],
      readAlertIds: [],
    });
  },
}));
