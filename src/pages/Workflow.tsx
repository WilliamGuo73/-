import React, { useMemo, useState } from 'react';
import { GitBranch, Clock, Users, ChevronRight, X, AlertCircle } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { useStaffContext } from '../context/StaffContext';
import { Task } from '../types';

interface TaskNode extends Task {
  dependents: string[];
  level: number;
  position: number;
}

export function Workflow() {
  const { tasks } = useTaskContext();
  const { staff } = useStaffContext();
  const [selectedTask, setSelectedTask] = useState<TaskNode | null>(null);

  const workflowNodes = useMemo(() => {
    const nodes = new Map<string, TaskNode>();
    const levels = new Map<string, number>();

    // Calculate levels for each task (longest path from root)
    const calculateLevel = (taskId: string, visited = new Set<string>()): number => {
      if (visited.has(taskId)) return 0;
      if (levels.has(taskId)) return levels.get(taskId)!;

      visited.add(taskId);
      const task = tasks.find(t => t.id === taskId);
      if (!task?.dependencies?.length) {
        levels.set(taskId, 0);
        return 0;
      }

      const maxLevel = Math.max(
        ...task.dependencies.map(depId => calculateLevel(depId, visited) + 1)
      );
      levels.set(taskId, maxLevel);
      return maxLevel;
    };

    // Initialize nodes and calculate levels
    tasks.forEach(task => {
      calculateLevel(task.id);
      nodes.set(task.id, {
        ...task,
        dependents: [],
        level: levels.get(task.id)!,
        position: 0,
      });
    });

    // Build dependency relationships
    tasks.forEach(task => {
      task.dependencies?.forEach(depId => {
        const node = nodes.get(depId);
        if (node) {
          node.dependents.push(task.id);
        }
      });
    });

    // Calculate horizontal positions within each level
    const levelGroups = Array.from(nodes.values()).reduce((groups, node) => {
      const level = node.level;
      if (!groups[level]) groups[level] = [];
      groups[level].push(node);
      return groups;
    }, [] as TaskNode[][]);

    levelGroups.forEach(group => {
      group.forEach((node, index) => {
        node.position = index;
      });
    });

    return Array.from(nodes.values());
  }, [tasks]);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50 hover:bg-red-100';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100';
      case 'low':
        return 'border-green-200 bg-green-50 hover:bg-green-100';
      default:
        return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'pending':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const TaskDetails = ({ task }: { task: TaskNode }) => {
    const assignedStaff = staff.filter(s => s.tasks.includes(task.id));

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">任务描述</h4>
                <p className="text-gray-600">{task.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  getPriorityColor(task.priority)
                }`}>
                  {task.priority}
                </span>
                <span className={`flex items-center text-sm ${getStatusColor(task.status)}`}>
                  <Clock className="h-4 w-4 mr-1" />
                  {task.status}
                </span>
              </div>

              {task.steps && task.steps.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">执行步骤</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {task.steps.map((step, index) => (
                      <li key={index} className="text-gray-600">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {assignedStaff.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">负责人员</h4>
                  <div className="space-y-2">
                    {assignedStaff.map(member => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{member.name}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            {member.position}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(task.dependencies?.length > 0 || task.dependents.length > 0) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">任务依赖</h4>
                  {task.dependencies?.length > 0 && (
                    <div className="mb-3">
                      <span className="text-sm text-gray-500">前置任务：</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {task.dependencies.map(depId => {
                          const depTask = tasks.find(t => t.id === depId);
                          return depTask ? (
                            <span
                              key={depId}
                              className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-700"
                            >
                              {depTask.title}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                  {task.dependents.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-500">后续任务：</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {task.dependents.map(depId => {
                          const depTask = tasks.find(t => t.id === depId);
                          return depTask ? (
                            <span
                              key={depId}
                              className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-700"
                            >
                              {depTask.title}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const maxLevel = Math.max(...workflowNodes.map(node => node.level));
  const levelWidth = 240;
  const nodeHeight = 100;
  const verticalSpacing = 60;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <GitBranch className="h-8 w-8 text-gray-400" />
        <h1 className="text-2xl font-semibold text-gray-900">工作流程</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        <div
          className="relative"
          style={{
            width: (maxLevel + 1) * levelWidth + 100,
            minHeight: Math.max(...workflowNodes.map(n => n.position)) * (nodeHeight + verticalSpacing) + nodeHeight,
          }}
        >
          {workflowNodes.map(node => {
            const left = node.level * levelWidth + 40;
            const top = node.position * (nodeHeight + verticalSpacing) + 20;

            return (
              <React.Fragment key={node.id}>
                {/* Draw connection lines */}
                {node.dependencies?.map(depId => {
                  const parent = workflowNodes.find(n => n.id === depId);
                  if (parent) {
                    const parentLeft = parent.level * levelWidth + levelWidth - 20;
                    const parentTop = parent.position * (nodeHeight + verticalSpacing) + nodeHeight / 2 + 20;
                    const childLeft = left;
                    const childTop = top + nodeHeight / 2;

                    const path = `M ${parentLeft} ${parentTop} C ${(parentLeft + childLeft) / 2} ${parentTop} ${(parentLeft + childLeft) / 2} ${childTop} ${childLeft} ${childTop}`;

                    return (
                      <svg
                        key={`${parent.id}-${node.id}`}
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        style={{ zIndex: 0 }}
                      >
                        <path
                          d={path}
                          stroke="#CBD5E1"
                          strokeWidth="2"
                          fill="none"
                        />
                        <circle
                          cx={childLeft}
                          cy={childTop}
                          r="3"
                          fill="#CBD5E1"
                        />
                      </svg>
                    );
                  }
                  return null;
                })}

                {/* Task node */}
                <div
                  className={`absolute rounded-lg border p-3 cursor-pointer transition-colors ${getPriorityColor(
                    node.priority
                  )}`}
                  style={{
                    left: `${left}px`,
                    top: `${top}px`,
                    width: `${levelWidth - 40}px`,
                    height: `${nodeHeight}px`,
                    zIndex: 1,
                  }}
                  onClick={() => setSelectedTask(node)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {node.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {node.description}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {node.startTime}
                    </span>
                    {node.dependencies?.length > 0 && (
                      <span className="flex items-center text-xs text-gray-500">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {node.dependencies.length}
                      </span>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {selectedTask && <TaskDetails task={selectedTask} />}
    </div>
  );
}