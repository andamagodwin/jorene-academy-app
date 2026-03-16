import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import { Result, Timetable } from '../types/database';

export interface AcademicsState {
  // Results
  results: Result[];
  selectedTerm: string;
  
  // Timetable
  timetable: Timetable[];
  
  // Performance metrics
  termAverages: { term: string; average: number }[];
  subjectTrends: { subject: string; scores: number[] }[];
  
  // Loading states
  isLoading: boolean;
  
  // Actions
  loadResults: (studentId: string) => Promise<void>;
  loadTimetable: (studentClass: string) => Promise<void>;
  loadPerformanceMetrics: (studentId: string) => Promise<void>;
  setSelectedTerm: (term: string) => void;
  clearAcademics: () => void;
}

export const useAcademicsStore = create<AcademicsState>((set, get) => ({
  results: [],
  selectedTerm: 'Term 1',
  timetable: [],
  termAverages: [],
  subjectTrends: [],
  isLoading: false,

  loadResults: async (studentId: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('results')
        .select('*')
        .eq('student_id', studentId)
        .order('term', { ascending: false })
        .order('subject', { ascending: true });

      if (error) throw error;
      
      set({ results: data || [] });
      
      // Auto-select latest term if not set
      if (data && data.length > 0) {
        const latestTerm = data[0].term;
        set({ selectedTerm: latestTerm });
      }
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  loadTimetable: async (studentClass: string) => {
    try {
      const { data, error } = await supabase
        .from('timetables')
        .select('*')
        .eq('class', studentClass)
        .order('day', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;
      set({ timetable: data || [] });
    } catch (error) {
      console.error('Error loading timetable:', error);
    }
  },



  loadPerformanceMetrics: async (studentId: string) => {
    try {
      const { data, error } = await supabase
        .from('results')
        .select('*')
        .eq('student_id', studentId)
        .order('term', { ascending: true });

      if (error) throw error;

      const results = data || [];

      // Calculate term averages
      const termMap = new Map<string, number[]>();
      results.forEach(result => {
        if (!termMap.has(result.term)) {
          termMap.set(result.term, []);
        }
        termMap.get(result.term)!.push(result.score);
      });

      const termAverages = Array.from(termMap.entries()).map(([term, scores]) => ({
        term,
        average: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      }));

      // Calculate subject trends
      const subjectMap = new Map<string, number[]>();
      results.forEach(result => {
        if (!subjectMap.has(result.subject)) {
          subjectMap.set(result.subject, []);
        }
        subjectMap.get(result.subject)!.push(result.score);
      });

      const subjectTrends = Array.from(subjectMap.entries()).map(([subject, scores]) => ({
        subject,
        scores,
      }));

      set({ termAverages, subjectTrends });
    } catch (error) {
      console.error('Error loading performance metrics:', error);
    }
  },

  setSelectedTerm: (term: string) => {
    set({ selectedTerm: term });
  },

  clearAcademics: () => {
    set({
      results: [],
      selectedTerm: 'Term 1',
      timetable: [],
      termAverages: [],
      subjectTrends: [],
    });
  },
}));
