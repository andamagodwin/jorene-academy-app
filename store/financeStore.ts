import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import { FeesStructure, Payment, Invoice, Receipt } from '../types/database';

export interface BalanceInfo {
  totalFees: number;
  totalPaid: number;
  balance: number;
  term: string;
  year: number;
}

export interface FinanceState {
  balance: BalanceInfo | null;
  payments: Payment[];
  invoices: Invoice[];
  receipts: Receipt[];
  isLoading: boolean;

  loadBalance: (studentId: string, studentClass: string) => Promise<void>;
  loadPayments: (studentId: string) => Promise<void>;
  loadInvoices: (studentId: string) => Promise<void>;
  loadReceipts: (studentId: string) => Promise<void>;
  clearFinance: () => void;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  balance: null,
  payments: [],
  invoices: [],
  receipts: [],
  isLoading: false,

  loadBalance: async (studentId: string, studentClass: string) => {
    set({ isLoading: true });
    try {
      // Get current term and year (you can make this dynamic)
      const currentYear = new Date().getFullYear();
      const currentTerm = 'Term 1'; // TODO: Make dynamic based on school calendar

      // Get fees structure for this class and term
      const { data: feesData, error: feesError } = await supabase
        .from('fees_structure')
        .select('*')
        .eq('class', studentClass)
        .eq('term', currentTerm)
        .eq('year', currentYear)
        .single();

      if (feesError) throw feesError;

      // Get total payments for this student
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('amount')
        .eq('student_id', studentId);

      if (paymentsError) throw paymentsError;

      const totalPaid = paymentsData?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
      const totalFees = Number(feesData?.amount || 0);
      const balance = totalFees - totalPaid;

      set({
        balance: {
          totalFees,
          totalPaid,
          balance,
          term: currentTerm,
          year: currentYear,
        },
      });
    } catch (error) {
      console.error('Error loading balance:', error);
      set({ balance: null });
    } finally {
      set({ isLoading: false });
    }
  },

  loadPayments: async (studentId: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('student_id', studentId)
        .order('date', { ascending: false });

      if (error) throw error;

      set({ payments: data || [] });
    } catch (error) {
      console.error('Error loading payments:', error);
      set({ payments: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  loadInvoices: async (studentId: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ invoices: data || [] });
    } catch (error) {
      console.error('Error loading invoices:', error);
      set({ invoices: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  loadReceipts: async (studentId: string) => {
    set({ isLoading: true });
    try {
      // Get receipts for this student's payments
      const { data, error } = await supabase
        .from('receipts')
        .select(`
          *,
          payments!inner(student_id)
        `)
        .eq('payments.student_id', studentId)
        .order('issued_at', { ascending: false });

      if (error) throw error;

      set({ receipts: data || [] });
    } catch (error) {
      console.error('Error loading receipts:', error);
      set({ receipts: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  clearFinance: () => {
    set({
      balance: null,
      payments: [],
      invoices: [],
      receipts: [],
    });
  },
}));
