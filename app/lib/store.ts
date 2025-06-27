import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Bookmark, Employee } from './types';

interface HRStore {
  bookmarks: Bookmark[];
  employees: Employee[];
  addBookmark: (employeeId: number) => void;
  removeBookmark: (employeeId: number) => void;
  isBookmarked: (employeeId: number) => boolean;
  setEmployees: (employees: Employee[]) => void;
  promoteEmployee: (employeeId: number) => void;
}

export const useHRStore = create<HRStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      employees: [],
      
      addBookmark: (employeeId: number) => {
        const { bookmarks } = get();
        if (!bookmarks.find(b => b.employeeId === employeeId)) {
          set({
            bookmarks: [
              ...bookmarks,
              { employeeId, addedAt: new Date().toISOString() }
            ]
          });
        }
      },
      
      removeBookmark: (employeeId: number) => {
        const { bookmarks } = get();
        set({
          bookmarks: bookmarks.filter(b => b.employeeId !== employeeId)
        });
      },
      
      isBookmarked: (employeeId: number) => {
        const { bookmarks } = get();
        return bookmarks.some(b => b.employeeId === employeeId);
      },
      
      setEmployees: (employees: Employee[]) => {
        set({ employees });
      },
      
      promoteEmployee: (employeeId: number) => {
        const { employees } = get();
        const updatedEmployees = employees.map(emp => 
          emp.id === employeeId 
            ? { ...emp, performance: Math.min(5, emp.performance + 0.5) }
            : emp
        );
        set({ employees: updatedEmployees });
      },
    }),
    {
      name: 'hr-dashboard-storage',
      partialize: (state) => ({ bookmarks: state.bookmarks }),
    }
  )
); 