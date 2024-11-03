import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskList } from '../components/TaskList';
import { TaskTimeline } from '../components/TaskTimeline';
import { TaskModal } from '../components/TaskModal';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types';

export function TaskBoard() {
  const { tasks } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleCreateTask = () => {
    setSelectedTask(undefined);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">今日工作安排</h1>
        <button
          onClick={handleCreateTask}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加任务
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">时间轴视图</h2>
            <TaskTimeline tasks={tasks} />
          </div>
        </div>

        <div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">任务列表</h2>
            <TaskList tasks={tasks} onEditTask={handleEditTask} />
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        mode={modalMode}
      />
    </div>
  );
}