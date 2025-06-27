'use client';

import { useMemo, useState } from 'react';
import { Employee, FilterOptions } from '../lib/types';

export const useSearch = (employees: Employee[]) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    departments: [],
    performanceRange: []
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // Search filter
      const searchMatch = !filters.search || 
        employee.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.department.toLowerCase().includes(filters.search.toLowerCase());

      // Department filter
      const departmentMatch = filters.departments.length === 0 || 
        filters.departments.includes(employee.department);

      // Performance filter
      const performanceMatch = filters.performanceRange.length === 0 ||
        (filters.performanceRange.length === 2 && 
         employee.performance >= filters.performanceRange[0] && 
         employee.performance <= filters.performanceRange[1]);

      return searchMatch && departmentMatch && performanceMatch;
    });
  }, [employees, filters]);

  const updateSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const updateDepartments = (departments: string[]) => {
    setFilters(prev => ({ ...prev, departments }));
  };

  const updatePerformanceRange = (range: number[]) => {
    setFilters(prev => ({ ...prev, performanceRange: range }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      departments: [],
      performanceRange: []
    });
  };

  return {
    filteredEmployees,
    filters,
    updateSearch,
    updateDepartments,
    updatePerformanceRange,
    clearFilters
  };
}; 