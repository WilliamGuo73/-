import React from 'react';
import { X } from 'lucide-react';
import { TaskForm } from './TaskForm';
import { Task } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  mode: 'create' | 'edit';
}

export function TaskModal({ isOpen, onClose, task, mode }: TaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              {mode === 'create' ? '创建新任务' : '编辑任务'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6">
            <TaskForm onClose={onClose} initialData={task} mode={mode} />
          </div>
        </div>
      </div>
    </div>
  );
}