'use client';

import { useEffect, useState } from 'react';
import { useHRStore } from '../lib/store';
import { Employee } from '../lib/types';

export const useEmployees = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { employees, setEmployees } = useHRStore();

  const departments = [
    'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 
    'Operations', 'Design', 'Product', 'Support', 'Legal'
  ];

  const generateMockData = (users: any[]): Employee[] => {
    return users.map((user, index) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      department: departments[index % departments.length],
      performance: Math.floor(Math.random() * 5) + 1,
      address: {
        address: user.address?.address || '123 Main St',
        city: user.address?.city || 'New York',
        state: user.address?.state || 'NY',
        postalCode: user.address?.postalCode || '10001'
      },
      phone: user.phone || '+1-555-0123',
      bio: `Experienced professional with ${user.age - 20} years in the industry. Passionate about delivering high-quality results and driving innovation.`,
      image: user.image || `https://i.pravatar.cc/150?u=${user.id}`
    }));
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://dummyjson.com/users?limit=20');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      
      const data = await response.json();
      const employeesWithMockData = generateMockData(data.users);
      setEmployees(employeesWithMockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (employees.length === 0) {
      fetchEmployees();
    } else {
      setLoading(false);
    }
  }, []);

  return {
    employees,
    loading,
    error,
    refetch: fetchEmployees
  };
}; 