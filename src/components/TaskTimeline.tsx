import React from 'react';
import { Clock } from 'lucide-react';
import { Task } from '../types';

interface TaskTimelineProps {
  tasks: Task[];
}

export function TaskTimeline({ tasks }: TaskTimelineProps) {
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const getTaskStyle = (task: Task) => {
    const startHour = parseInt(task.startTime.split(':')[0]);
    const endHour = parseInt(task.endTime.split(':')[0]);
    const duration = endHour - startHour;
    
    return {
      top: '4px',
      height: `calc(${duration * 100}% - 8px)`,
    };
  };

  return (
    <div className="relative min-h-[600px]">
      <div className="absolute top-0 left-0 w-16 h-full bg-gray-50" />
      
      <div className="ml-16">
        {timeSlots.map((hour) => (
          <div
            key={hour}
            className="relative h-20 border-t border-gray-200 first:border-t-0"
          >
            <div className="absolute -left-16 top-0 flex items-center justify-center w-16 h-full text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {`${hour.toString().padStart(2, '0')}:00`}
            </div>
            
            {tasks
              .filter((task) => {
                const startHour = parseInt(task.startTime.split(':')[0]);
                const endHour = parseInt(task.endTime.split(':')[0]);
                return startHour <= hour && endHour > hour;
              })
              .map((task) => (
                <div
                  key={task.id}
                  className={`absolute left-0 right-4 rounded-lg px-3 py-2 ${
                    task.priority === 'high'
                      ? 'bg-red-100 border-red-200'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 border-yellow-200'
                      : 'bg-green-100 border-green-200'
                  } border`}
                  style={getTaskStyle(task)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {task.title}
                    </span>
                    <span className="text-xs text-gray-600">
                      {task.startTime} - {task.endTime}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {task.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}