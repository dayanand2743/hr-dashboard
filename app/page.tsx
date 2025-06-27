'use client';

import {
    Activity,
    Award,
    Bookmark,
    Filter,
    RefreshCw,
    Search,
    Star,
    Target,
    TrendingUp,
    Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './components/Button';
import { EmployeeCard } from './components/EmployeeCard';
import { SearchAndFilter } from './components/SearchAndFilter';
import { useEmployees } from './hooks/useEmployees';
import { useSearch } from './hooks/useSearch';

export default function Dashboard() {
  const router = useRouter();
  const { employees, loading, error, refetch } = useEmployees();
  const {
    filteredEmployees,
    filters,
    updateSearch,
    updateDepartments,
    updatePerformanceRange,
    clearFilters
  } = useSearch(employees);

  const departments = [...new Set(employees.map(emp => emp.department))];
  const averagePerformance = employees.length > 0 
    ? (employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length).toFixed(1)
    : '0.0';

  const topPerformers = employees
    .filter(emp => emp.performance >= 4.5)
    .slice(0, 3);

  const recentBookmarks = employees
    .filter(emp => emp.performance >= 4)
    .slice(0, 5);

  const handleViewAnalytics = () => {
    router.push('/analytics');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="relative">
            <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-6 text-blue-600" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Loading Employee Data
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Fetching the latest performance metrics...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
            Error Loading Data
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-6">{error}</p>
          <Button onClick={refetch} className="bg-red-600 hover:bg-red-700 text-white">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Employee Dashboard
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
                Track performance, manage talent, and drive success across all departments with real-time insights and analytics.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900 dark:text-white">{employees.length} Employees</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-gray-900 dark:text-white">{averagePerformance} Avg Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900 dark:text-white">{departments.length} Departments</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={refetch} 
                variant="outline" 
                className="flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button 
                onClick={handleViewAnalytics}
                className="flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Activity className="w-4 h-4" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{employees.length}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active employees</p>
        </div>

        <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{averagePerformance}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Performance rating</p>
        </div>

        <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Bookmark className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Talent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {employees.filter(emp => emp.performance >= 4).length}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">High performers</p>
        </div>

        <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Departments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{departments.length}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active teams</p>
        </div>
      </div>

      {/* Search and Filters with Enhanced Design */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Search & Filter</h2>
          </div>
          <SearchAndFilter
            search={filters.search}
            onSearchChange={updateSearch}
            departments={departments}
            selectedDepartments={filters.departments}
            onDepartmentChange={updateDepartments}
            performanceRange={filters.performanceRange}
            onPerformanceChange={updatePerformanceRange}
            onClearFilters={clearFilters}
          />
        </div>
      </div>

      {/* Top Performers Section */}
      {topPerformers.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Performers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPerformers.map((employee, index) => (
              <div key={employee.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <img
                      src={employee.image}
                      alt={`${employee.firstName} ${employee.lastName}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-yellow-300 dark:border-yellow-600"
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {employee.firstName} {employee.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{employee.department}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(employee.performance)
                            ? 'fill-current text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                    {employee.performance.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Count with Enhanced Design */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredEmployees.length}</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{employees.length}</span> employees
          </p>
        </div>
        {filteredEmployees.length === 0 && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      {/* Enhanced Employee Grid */}
      {filteredEmployees.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-12 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No employees found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="transform hover:scale-105 transition-all duration-300">
              <EmployeeCard employee={employee} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
