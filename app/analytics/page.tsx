'use client';

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import { BarChart3, Bookmark, TrendingUp, Users } from 'lucide-react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useHRStore } from '../lib/store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics() {
  const { employees, bookmarks } = useHRStore();

  // Calculate department-wise average ratings
  const departmentStats = employees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = { total: 0, count: 0 };
    }
    acc[emp.department].total += emp.performance;
    acc[emp.department].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const departmentData = Object.entries(departmentStats).map(([dept, stats]) => ({
    department: dept,
    averageRating: stats.total / stats.count
  }));

  // Mock bookmark trends data (last 6 months)
  const bookmarkTrends = [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 18 },
    { month: 'Mar', count: 15 },
    { month: 'Apr', count: 22 },
    { month: 'May', count: 28 },
    { month: 'Jun', count: 25 }
  ];

  // Performance distribution
  const performanceDistribution = [
    { range: '1-2', count: employees.filter(emp => emp.performance >= 1 && emp.performance < 2).length },
    { range: '2-3', count: employees.filter(emp => emp.performance >= 2 && emp.performance < 3).length },
    { range: '3-4', count: employees.filter(emp => emp.performance >= 3 && emp.performance < 4).length },
    { range: '4-5', count: employees.filter(emp => emp.performance >= 4 && emp.performance <= 5).length }
  ];

  const barChartData = {
    labels: departmentData.map(d => d.department),
    datasets: [
      {
        label: 'Average Performance Rating',
        data: departmentData.map(d => d.averageRating),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(168, 85, 247, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: bookmarkTrends.map(t => t.month),
    datasets: [
      {
        label: 'Bookmarks Added',
        data: bookmarkTrends.map(t => t.count),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: performanceDistribution.map(p => p.range),
    datasets: [
      {
        data: performanceDistribution.map(p => p.count),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#6B7280',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: '#374151',
        },
      },
      x: {
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: '#374151',
        },
      },
    },
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: '#374151',
        },
      },
      x: {
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: '#374151',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#6B7280',
        },
      },
    },
  };

  const averagePerformance = employees.length > 0 
    ? (employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Comprehensive insights into employee performance and trends
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{employees.length}</p>
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
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Bookmark className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bookmarked</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{bookmarks.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Departments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{Object.keys(departmentStats).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Department Performance Ratings
          </h3>
          <Bar data={barChartData} options={chartOptions} />
        </div>

        {/* Bookmark Trends Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Bookmark Trends (Last 6 Months)
          </h3>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

        {/* Performance Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Distribution
          </h3>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>

        {/* Top Performing Departments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Departments
          </h3>
          <div className="space-y-4">
            {departmentData
              .sort((a, b) => b.averageRating - a.averageRating)
              .slice(0, 5)
              .map((dept, index) => (
                <div key={dept.department} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      #{index + 1}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {dept.department}
                    </span>
                  </div>
                  <span className={`font-semibold ${
                    dept.averageRating >= 4 ? 'text-green-600' : 
                    dept.averageRating >= 3 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {dept.averageRating.toFixed(1)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 