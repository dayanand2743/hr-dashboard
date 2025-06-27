'use client';

import {
    ArrowLeft,
    Bookmark,
    BookmarkPlus,
    Calendar,
    Mail,
    MapPin,
    Phone,
    TrendingUp
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { RatingStars } from '../../components/RatingStars';
import { useHRStore } from '../../lib/store';
import { Feedback, PerformanceHistory, Project } from '../../lib/types';

export default function EmployeeDetails() {
  const params = useParams();
  const router = useRouter();
  const { employees, addBookmark, removeBookmark, isBookmarked, promoteEmployee } = useHRStore();
  const [activeTab, setActiveTab] = useState('overview');
  
  const employeeId = parseInt(params.id as string);
  const employee = employees.find(emp => emp.id === employeeId);
  const bookmarked = employee ? isBookmarked(employee.id) : false;

  // Mock data for tabs
  const [performanceHistory] = useState<PerformanceHistory[]>([
    { id: 1, date: '2024-01-15', rating: 4.2, feedback: 'Excellent work on the Q4 project', reviewer: 'Sarah Johnson' },
    { id: 2, date: '2023-10-20', rating: 3.8, feedback: 'Good performance, room for improvement in communication', reviewer: 'Mike Chen' },
    { id: 3, date: '2023-07-10', rating: 4.5, feedback: 'Outstanding leadership and technical skills', reviewer: 'Lisa Wang' },
  ]);

  const [projects] = useState<Project[]>([
    { id: 1, name: 'E-commerce Platform Redesign', status: 'active', startDate: '2024-01-01', endDate: '2024-06-30', role: 'Lead Developer', description: 'Leading the redesign of our main e-commerce platform with modern UI/UX principles.' },
    { id: 2, name: 'Mobile App Development', status: 'completed', startDate: '2023-08-01', endDate: '2023-12-31', role: 'Senior Developer', description: 'Developed a cross-platform mobile application using React Native.' },
    { id: 3, name: 'API Integration Project', status: 'pending', startDate: '2024-03-01', endDate: '2024-05-31', role: 'Backend Developer', description: 'Integrating third-party APIs for payment processing and analytics.' },
  ]);

  const [feedbacks] = useState<Feedback[]>([
    { id: 1, date: '2024-02-15', type: 'positive', message: 'Great team player and always willing to help others.', from: 'Team Lead' },
    { id: 2, date: '2024-01-30', type: 'constructive', message: 'Could improve documentation practices for better knowledge sharing.', from: 'Project Manager' },
    { id: 3, date: '2024-01-15', type: 'positive', message: 'Excellent problem-solving skills and attention to detail.', from: 'Senior Developer' },
  ]);

  useEffect(() => {
    if (!employee) {
      router.push('/');
    }
  }, [employee, router]);

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Employee not found</p>
        <Button onClick={() => router.push('/')} className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    );
  }

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'info';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getFeedbackColor = (type: string) => {
    switch (type) {
      case 'positive': return 'success';
      case 'constructive': return 'warning';
      case 'neutral': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.push('/')} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{employee.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleBookmark} className="flex items-center gap-2">
            {bookmarked ? (
              <Bookmark className="w-4 h-4 fill-current" />
            ) : (
              <BookmarkPlus className="w-4 h-4" />
            )}
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
          <Button onClick={handlePromote} className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Promote
          </Button>
        </div>
      </div>

      {/* Employee Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <img
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {employee.firstName} {employee.lastName}
              </h2>
              <div className="flex items-center gap-2">
                <Badge variant="info">{employee.department}</Badge>
                <Badge variant={employee.performance >= 4 ? 'success' : employee.performance >= 3 ? 'warning' : 'error'}>
                  {employee.performance.toFixed(1)} Rating
                </Badge>
              </div>
              <RatingStars rating={employee.performance} showValue />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <span>{employee.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4" />
              <span>{employee.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{employee.age} years old</span>
            </div>
            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 mt-0.5" />
              <span>
                {employee.address.address}, {employee.address.city}, {employee.address.state} {employee.address.postalCode}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Bio</h3>
          <p className="text-gray-600 dark:text-gray-400">{employee.bio}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'projects', label: 'Projects' },
              { id: 'feedback', label: 'Feedback' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance History</h3>
                <div className="space-y-3">
                  {performanceHistory.map((review) => (
                    <div key={review.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <RatingStars rating={review.rating} size="sm" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            by {review.reviewer}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{review.feedback}</p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                    <Badge variant={getStatusColor(project.status) as any}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Role: {project.role}</span>
                    <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={getFeedbackColor(feedback.type) as any}>
                      {feedback.type}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(feedback.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{feedback.message}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">From: {feedback.from}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 