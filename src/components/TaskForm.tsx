import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types';

interface TaskFormProps {
  onClose: () => void;
  initialData?: Task;
  mode: 'create' | 'edit';
}

export function TaskForm({ onClose, initialData, mode }: TaskFormProps) {
  const { addTask, updateTask } = useTaskContext();
  const [formData, setFormData] = useState<Partial<Task>>(
    initialData || {
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      priority: 'medium',
      status: 'pending',
      source: '',
      steps: [''],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      addTask({
        ...formData,
        id: Date.now().toString(),
        steps: formData.steps?.filter(step => step !== ''),
      } as Task);
    } else if (initialData) {
      updateTask(initialData.id, {
        ...formData,
        steps: formData.steps?.filter(step => step !== ''),
      });
    }
    onClose();
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...(formData.steps || [])];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const addStep = () => {
    setFormData({ ...formData, steps: [...(formData.steps || []), ''] });
  };

  const removeStep = (index: number) => {
    const newSteps = formData.steps?.filter((_, i) => i !== index);
    setFormData({ ...formData, steps: newSteps });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">标题</label>
        <input
          type="text"
          required
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">描述</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">开始时间</label>
          <input
            type="time"
            required
            value={formData.startTime || ''}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">结束时间</label>
          <input
            type="time"
            required
            value={formData.endTime || ''}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">优先级</label>
          <select
            value={formData.priority || 'medium'}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">来源</label>
          <input
            type="text"
            value={formData.source || ''}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">执行步骤</label>
        {formData.steps?.map((step, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={`步骤 ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="px-2 py-1 text-sm text-red-600 hover:text-red-700"
            >
              删除
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="mt-2 text-sm text-blue-600 hover:text-blue-700"
        >
          添加步骤
        </button>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {mode === 'create' ? '创建' : '保存'}
        </button>
      </div>
    </form>
  );
}