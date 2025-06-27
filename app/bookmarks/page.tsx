'use client';

import { Bookmark, Briefcase, TrendingUp } from 'lucide-react';
import { Button } from '../components/Button';
import { useHRStore } from '../lib/store';

export default function Bookmarks() {
  const { employees, bookmarks, removeBookmark, promoteEmployee } = useHRStore();
  
  const bookmarkedEmployees = employees.filter(emp => 
    bookmarks.some(bookmark => bookmark.employeeId === emp.id)
  );

  const handleRemoveBookmark = (employeeId: number) => {
    removeBookmark(employeeId);
  };

  const handlePromote = (employeeId: number) => {
    promoteEmployee(employeeId);
  };

  const handleAssignToProject = (employeeId: number) => {
    // Mock action - in a real app this would open a modal or navigate to a project assignment page
    alert(`Employee ${employeeId} assigned to project! (Mock action)`);
  };

  const averagePerformance = bookmarkedEmployees.length > 0 
    ? (bookmarkedEmployees.reduce((sum, emp) => sum + emp.performance, 0) / bookmarkedEmployees.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bookmarked Employees
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your favorite employees and track their progress
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Bookmark className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bookmarked</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{bookmarkedEmployees.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Performance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{averagePerformance}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ready for Projects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {bookmarkedEmployees.filter(emp => emp.performance >= 4).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarked Employees */}
      {bookmarkedEmployees.length === 0 ? (
        <div className="text-center py-12">
          <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No bookmarked employees
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start bookmarking employees from the dashboard to see them here
          </p>
          <Button onClick={() => window.location.href = '/'}>
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Bookmarked Employees ({bookmarkedEmployees.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarkedEmployees.map((employee) => (
              <div key={employee.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={employee.image}
                        alt={`${employee.firstName} ${employee.lastName}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {employee.firstName} {employee.lastName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveBookmark(employee.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Bookmark className="w-5 h-5 fill-current" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Age:</span>
                      <span className="text-sm font-medium">{employee.age}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Department:</span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {employee.department}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Performance:</span>
                      <span className={`text-sm font-medium ${
                        employee.performance >= 4 ? 'text-green-600' : 
                        employee.performance >= 3 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {employee.performance.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => handlePromote(employee.id)}
                      className="flex-1"
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Promote
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAssignToProject(employee.id)}
                      className="flex-1"
                    >
                      <Briefcase className="w-4 h-4 mr-1" />
                      Assign
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 