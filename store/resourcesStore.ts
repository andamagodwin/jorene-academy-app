import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import { Resource } from '../types/database';

export interface ResourcesState {
  resources: Resource[];
  filteredResources: Resource[];
  subjects: string[];
  selectedSubject: string | null;
  searchQuery: string;
  isLoading: boolean;

  loadResources: (studentClass: string) => Promise<void>;
  setSelectedSubject: (subject: string | null) => void;
  setSearchQuery: (query: string) => void;
  applyFilters: () => void;
  downloadResource: (resource: Resource) => Promise<void>;
  clearResources: () => void;
}

export const useResourcesStore = create<ResourcesState>((set, get) => ({
  resources: [],
  filteredResources: [],
  subjects: [],
  selectedSubject: null,
  searchQuery: '',
  isLoading: false,

  loadResources: async (studentClass: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('class', studentClass)
        .order('subject', { ascending: true })
        .order('title', { ascending: true });

      if (error) throw error;

      const resources = data || [];
      
      // Extract unique subjects
      const uniqueSubjects = Array.from(
        new Set(resources.map((r) => r.subject))
      ).sort();

      set({ 
        resources,
        subjects: uniqueSubjects,
        filteredResources: resources,
      });

      // Apply current filters
      get().applyFilters();
    } catch (error) {
      console.error('Error loading resources:', error);
      set({ resources: [], filteredResources: [], subjects: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedSubject: (subject: string | null) => {
    set({ selectedSubject: subject });
    get().applyFilters();
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  applyFilters: () => {
    const { resources, selectedSubject, searchQuery } = get();
    
    let filtered = [...resources];

    // Filter by subject
    if (selectedSubject) {
      filtered = filtered.filter((r) => r.subject === selectedSubject);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.subject.toLowerCase().includes(query) ||
          r.description?.toLowerCase().includes(query)
      );
    }

    set({ filteredResources: filtered });
  },

  downloadResource: async (resource: Resource) => {
    try {
      // In a real app, this would trigger a download
      // For now, just open the file URL
      console.log('Downloading resource:', resource.title);
      // You can use Linking.openURL(resource.file_url) in React Native
    } catch (error) {
      console.error('Error downloading resource:', error);
    }
  },

  clearResources: () => {
    set({
      resources: [],
      filteredResources: [],
      subjects: [],
      selectedSubject: null,
      searchQuery: '',
    });
  },
}));
