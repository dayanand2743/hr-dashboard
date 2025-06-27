'use client';

import { Bookmark, BookmarkPlus, Eye, Mail, MapPin, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useHRStore } from '../lib/store';
import { Employee } from '../lib/types';
import { Badge } from './Badge';
import { Button } from './Button';
import { RatingStars } from './RatingStars';

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { addBookmark, removeBookmark, isBookmarked, promoteEmployee } = useHRStore();
  const bookmarked = isBookmarked(employee.id);

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee.id);
    }
  };

  const handlePromote = () => {
    promoteEmployee(employee.id);
  };

  const getPerformanceVariant = (rating: number) => {
    if (rating >= 4) return 'success';
    if (rating >= 3) return 'warning';
    return 'error';
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4) return 'from-green-500 to-emerald-600';
    if (rating >= 3) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
      {/* Header with gradient background */}
      <div className={`relative h-20 bg-gradient-to-r ${getPerformanceColor(employee.performance)}`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-3 right-3">
          <button
            onClick={handleBookmark}
            className="text-white/80 hover:text-white transition-colors duration-200 backdrop-blur-sm bg-white/20 rounded-full p-1.5 hover:bg-white/30"
          >
            {bookmarked ? (
              <Bookmark className="w-4 h-4 fill-current" />
            ) : (
              <BookmarkPlus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative px-6 pb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 -mt-8">
            <div className="relative">
              <img
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {employee.email}
              </p>
            </div>
          </div>
        </div>

        {/* Performance Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Performance</span>
            <div className="flex items-center gap-2">
              <RatingStars rating={employee.performance} size="sm" />
              <Badge variant={getPerformanceVariant(employee.performance) as any} size="sm">
                {employee.performance.toFixed(1)}
              </Badge>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Age</p>
              <p className="font-semibold text-gray-900 dark:text-white">{employee.age}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Department</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{employee.department}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{employee.address.city}, {employee.address.state}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <Link href={`/employee/${employee.id}`} className="flex-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
            >
              <Eye className="w-4 h-4" />
              View Profile
            </Button>
          </Link>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handlePromote}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <TrendingUp className="w-4 h-4" />
            Promote
          </Button>
        </div>
      </div>
    </div>
  );
}; 