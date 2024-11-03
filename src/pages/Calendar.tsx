import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function Calendar() {
  const { tasks } = useTaskContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-32" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = new Date().toDateString() === date.toDateString();
      
      const dayTasks = tasks.filter(task => {
        const taskDate = new Date();
        const [hours, minutes] = task.startTime.split(':');
        taskDate.setHours(parseInt(hours), parseInt(minutes));
        return taskDate.toDateString() === date.toDateString();
      });

      days.push(
        <div
          key={day}
          className={`h-32 border border-gray-200 p-2 ${
            isToday ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${
              isToday ? 'text-blue-600' : 'text-gray-900'
            }`}>
              {day}
            </span>
            {dayTasks.length > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                {dayTasks.length} tasks
              </span>
            )}
          </div>
          <div className="space-y-1">
            {dayTasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="flex items-center text-xs p-1 rounded bg-white shadow-sm"
              >
                <Clock className="h-3 w-3 text-gray-400 mr-1" />
                <span className="truncate">{task.title}</span>
              </div>
            ))}
            {dayTasks.length > 3 && (
              <div className="text-xs text-gray-500">
                +{dayTasks.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <CalendarIcon className="h-8 w-8 text-gray-400" />
          <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <span className="text-lg font-medium text-gray-900">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-7 gap-px border-b">
          {DAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-sm font-medium text-gray-900 text-center bg-gray-50"
            >
              {day.slice(0, 3)}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
}