import React from 'react';
import { AlertCircle, CheckCircle2, Clock, Edit2 } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

export function TaskList({ tasks, onEditTask }: TaskListProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {task.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
              <button
                onClick={() => onEditTask(task)}
                className="text-gray-400 hover:text-gray-500"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {task.steps && task.steps.length > 0 && (
            <div className="mt-3 pl-8">
              <h4 className="text-xs font-medium text-gray-500 mb-2">执行步骤：</h4>
              <ol className="list-decimal list-inside space-y-1">
                {task.steps.map((step, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-3 flex items-center space-x-4 pl-8">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {task.startTime} - {task.endTime}
            </div>
            {task.dependencies && task.dependencies.length > 0 && (
              <div className="flex items-center text-sm text-gray-500">
                <AlertCircle className="h-4 w-4 mr-1" />
                依赖任务: {task.dependencies.join(', ')}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}