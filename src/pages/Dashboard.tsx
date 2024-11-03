import React from 'react';
import { BarChart as BarChartIcon, Users, Car, ShoppingBag } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const salesData = [
  { name: '张三', reception: 15, testDrive: 8, deal: 3, delivery: 2 },
  { name: '李四', reception: 12, testDrive: 6, deal: 2, delivery: 2 },
  { name: '王五', reception: 18, testDrive: 10, deal: 4, delivery: 3 },
  { name: '赵六', reception: 14, testDrive: 7, deal: 2, delivery: 1 },
];

const dailyStats = [
  {
    title: '今日接待',
    value: '24',
    icon: Users,
    change: '+12%',
    changeType: 'increase',
  },
  {
    title: '试驾数',
    value: '18',
    icon: Car,
    change: '+8%',
    changeType: 'increase',
  },
  {
    title: '成交数',
    value: '5',
    icon: ShoppingBag,
    change: '-2%',
    changeType: 'decrease',
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dailyStats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'increase'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">销售漏斗分析</h2>
          <BarChartIcon className="h-5 w-5 text-gray-400" />
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="reception" name="接待" fill="#60A5FA" />
              <Bar dataKey="testDrive" name="试驾" fill="#34D399" />
              <Bar dataKey="deal" name="成交" fill="#F59E0B" />
              <Bar dataKey="delivery" name="交付" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}