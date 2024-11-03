import React from 'react';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { KPI } from '../types';

interface KPIMetricsProps {
  kpis: KPI[];
}

export function KPIMetrics({ kpis }: KPIMetricsProps) {
  const getProgressColor = (current: number, target: number) => {
    const progress = (current / target) * 100;
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryIcon = (category: KPI['category']) => {
    switch (category) {
      case 'efficiency':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'quality':
        return <BarChart2 className="h-5 w-5 text-green-500" />;
      case 'satisfaction':
        return <TrendingDown className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                {getCategoryIcon(kpi.category)}
                <h4 className="text-sm font-medium text-gray-900">{kpi.name}</h4>
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-2xl font-semibold text-gray-900">
                  {kpi.current}
                </span>
                <span className="text-sm text-gray-500">/ {kpi.target}</span>
                <span className="text-sm text-gray-500">{kpi.unit}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-100">
                    进度
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    {Math.round((kpi.current / kpi.target) * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                <div
                  style={{ width: `${(kpi.current / kpi.target) * 100}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressColor(
                    kpi.current,
                    kpi.target
                  )}`}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}