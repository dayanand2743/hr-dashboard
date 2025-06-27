'use client';

import { Filter, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './Badge';
import { Button } from './Button';

interface SearchAndFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  departments: string[];
  selectedDepartments: string[];
  onDepartmentChange: (departments: string[]) => void;
  performanceRange: number[];
  onPerformanceChange: (range: number[]) => void;
  onClearFilters: () => void;
}

export const SearchAndFilter = ({
  search,
  onSearchChange,
  departments,
  selectedDepartments,
  onDepartmentChange,
  performanceRange,
  onPerformanceChange,
  onClearFilters
}: SearchAndFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleDepartmentToggle = (dept: string) => {
    if (selectedDepartments.includes(dept)) {
      onDepartmentChange(selectedDepartments.filter(d => d !== dept));
    } else {
      onDepartmentChange([...selectedDepartments, dept]);
    }
  };

  const handlePerformanceChange = (min: number, max: number) => {
    onPerformanceChange([min, max]);
  };

  const hasActiveFilters = search || selectedDepartments.length > 0 || performanceRange.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4">
          {/* Department Filter */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Department</h3>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => handleDepartmentToggle(dept)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedDepartments.includes(dept)
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Performance Range Filter */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Performance Rating</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '1-2', range: [1, 2] },
                { label: '2-3', range: [2, 3] },
                { label: '3-4', range: [3, 4] },
                { label: '4-5', range: [4, 5] }
              ].map(({ label, range }) => (
                <button
                  key={label}
                  onClick={() => handlePerformanceChange(range[0], range[1])}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    performanceRange.length === 2 && 
                    performanceRange[0] === range[0] && 
                    performanceRange[1] === range[1]
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <Badge variant="info" size="sm">
              Search: "{search}"
            </Badge>
          )}
          {selectedDepartments.map((dept) => (
            <Badge key={dept} variant="info" size="sm">
              {dept}
            </Badge>
          ))}
          {performanceRange.length === 2 && (
            <Badge variant="success" size="sm">
              Rating: {performanceRange[0]}-{performanceRange[1]}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}; 