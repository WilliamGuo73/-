export interface Task {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  source: string;
  steps?: string[];
  dependencies?: string[];
  qualityChecks?: QualityCheck[];
  acceptanceCriteria?: string[];
  kpis?: KPI[];
}

export interface QualityCheck {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'passed' | 'failed';
  checkType: 'pre' | 'during' | 'post';
  reviewer?: string;
  comments?: string;
  timestamp?: string;
}

export interface KPI {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  category: 'efficiency' | 'quality' | 'satisfaction';
}