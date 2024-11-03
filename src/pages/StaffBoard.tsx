import React from 'react';
import { useStaffContext } from '../context/StaffContext';
import { useTaskContext } from '../context/TaskContext';
import { Users, CheckCircle2, Clock } from 'lucide-react';

export function StaffBoard() {
  const { staff } = useStaffContext();
  const { tasks } = useTaskContext();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">员工看板</h1>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-400" />
          <span className="text-gray-600">共 {staff.length} 名员工</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {staff.map((member) => (
          <div
            key={member.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {member.name}
                  </h2>
                  <p className="text-sm text-gray-500">{member.position}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {member.tasks.length} 个任务
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">今日接待</div>
                    <div className="mt-1 text-2xl font-semibold text-gray-900">
                      {member.performance.reception}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">试驾数</div>
                    <div className="mt-1 text-2xl font-semibold text-gray-900">
                      {member.performance.testDrive}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">当前任务</h3>
                  <div className="space-y-2">
                    {tasks
                      .filter((task) => member.tasks.includes(task.id))
                      .map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {task.status === 'completed' ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {task.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {task.startTime} - {task.endTime}
                              </div>
                            </div>
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              task.priority === 'high'
                                ? 'bg-red-100 text-red-800'
                                : task.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}