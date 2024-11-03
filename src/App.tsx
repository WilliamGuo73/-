import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Calendar } from './pages/Calendar';
import { TaskBoard } from './pages/TaskBoard';
import { Workflow } from './pages/Workflow';
import { StaffBoard } from './pages/StaffBoard';
import { TaskProvider } from './context/TaskContext';
import { StaffProvider } from './context/StaffContext';

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <StaffProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/tasks" element={<TaskBoard />} />
              <Route path="/workflow" element={<Workflow />} />
              <Route path="/staff" element={<StaffBoard />} />
            </Routes>
          </Layout>
        </StaffProvider>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;