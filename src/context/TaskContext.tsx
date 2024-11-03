import React, { createContext, useContext, useState } from 'react';
import { Task, QualityCheck, KPI } from '../types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  updateQualityCheck: (taskId: string, checkId: string, updates: Partial<QualityCheck>) => void;
  updateKPI: (taskId: string, kpiId: string, updates: Partial<KPI>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: '1',
    title: '晨会',
    description: '与销售团队进行每日晨会',
    startTime: '09:00',
    endTime: '09:30',
    priority: 'high',
    status: 'pending',
    source: '日常工作',
    steps: [
      '检查昨日销售数据',
      '审核团队KPI完成情况',
      '分配今日任务',
      '讨论重点客户跟进情况'
    ],
    qualityChecks: [
      {
        id: 'qc1',
        title: '会议准备检查',
        description: '确保所有必要的数据和材料已准备就绪',
        status: 'pending',
        checkType: 'pre'
      },
      {
        id: 'qc2',
        title: '会议效果评估',
        description: '评估会议目标达成情况和团队参与度',
        status: 'pending',
        checkType: 'post'
      }
    ],
    acceptanceCriteria: [
      '所有团队成员都已到场',
      '销售数据已更新并分析',
      '每个成员都已明确今日任务'
    ],
    kpis: [
      {
        id: 'kpi1',
        name: '会议准时率',
        target: 100,
        current: 95,
        unit: '%',
        category: 'efficiency'
      },
      {
        id: 'kpi2',
        name: '任务分配完成度',
        target: 100,
        current: 90,
        unit: '%',
        category: 'quality'
      }
    ]
  }
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateQualityCheck = (
    taskId: string,
    checkId: string,
    updates: Partial<QualityCheck>
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              qualityChecks: task.qualityChecks?.map((check) =>
                check.id === checkId ? { ...check, ...updates } : check
              ),
            }
          : task
      )
    );
  };

  const updateKPI = (taskId: string, kpiId: string, updates: Partial<KPI>) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              kpis: task.kpis?.map((kpi) =>
                kpi.id === kpiId ? { ...kpi, ...updates } : kpi
              ),
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        updateQualityCheck,
        updateKPI,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}