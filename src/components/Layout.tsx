import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Calendar, LayoutDashboard, ListTodo, Users, GitBranch, BarChart } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}

function NavItem({ to, icon, children, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`${
        isActive
          ? 'border-blue-500 text-gray-900'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
    >
      {React.cloneElement(icon as React.ReactElement, {
        className: 'h-4 w-4 mr-2'
      })}
      {children}
    </Link>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">店总的一天</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavItem to="/" icon={<LayoutDashboard />} isActive={location.pathname === '/'}>
                  仪表盘
                </NavItem>
                <NavItem to="/calendar" icon={<Calendar />} isActive={location.pathname === '/calendar'}>
                  日程
                </NavItem>
                <NavItem to="/tasks" icon={<ListTodo />} isActive={location.pathname === '/tasks'}>
                  任务
                </NavItem>
                <NavItem to="/workflow" icon={<GitBranch />} isActive={location.pathname === '/workflow'}>
                  工作流
                </NavItem>
                <NavItem to="/staff" icon={<Users />} isActive={location.pathname === '/staff'}>
                  员工看板
                </NavItem>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}