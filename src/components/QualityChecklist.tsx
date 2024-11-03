import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { QualityCheck } from '../types';

interface QualityChecklistProps {
  checks: QualityCheck[];
  onUpdateCheck: (checkId: string, status: QualityCheck['status']) => void;
  onAddComment: (checkId: string, comment: string) => void;
}

export function QualityChecklist({ checks, onUpdateCheck, onAddComment }: QualityChecklistProps) {
  const getStatusIcon = (status: QualityCheck['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getCheckTypeColor = (type: QualityCheck['checkType']) => {
    switch (type) {
      case 'pre':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'during':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'post':
        return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  return (
    <div className="space-y-4">
      {checks.map((check) => (
        <div
          key={check.id}
          className="border border-gray-200 rounded-lg p-4 bg-white"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getStatusIcon(check.status)}
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    {check.title}
                  </h4>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getCheckTypeColor(
                      check.checkType
                    )}`}
                  >
                    {check.checkType === 'pre'
                      ? '前置检查'
                      : check.checkType === 'during'
                      ? '过程检查'
                      : '完成检查'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{check.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={check.status}
                onChange={(e) =>
                  onUpdateCheck(check.id, e.target.value as QualityCheck['status'])
                }
                className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="pending">待检查</option>
                <option value="passed">通过</option>
                <option value="failed">未通过</option>
              </select>
            </div>
          </div>

          {check.comments && (
            <div className="mt-3 flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">{check.comments}</p>
                {check.reviewer && check.timestamp && (
                  <p className="mt-1 text-xs text-gray-500">
                    {check.reviewer} - {check.timestamp}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mt-3">
            <textarea
              placeholder="添加检查评论..."
              className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={2}
              onChange={(e) => onAddComment(check.id, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}