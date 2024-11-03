import React, { createContext, useContext, useState } from 'react';

export interface Staff {
  id: string;
  name: string;
  position: string;
  tasks: string[];
  performance: {
    reception: number;
    testDrive: number;
    deal: number;
    delivery: number;
  };
}

interface StaffContextType {
  staff: Staff[];
  addStaff: (staff: Staff) => void;
  updateStaff: (staffId: string, updates: Partial<Staff>) => void;
  deleteStaff: (staffId: string) => void;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

const initialStaff: Staff[] = [
  {
    id: '1',
    name: '张三',
    position: '销售顾问',
    tasks: ['1', '2'],
    performance: {
      reception: 15,
      testDrive: 8,
      deal: 3,
      delivery: 2,
    },
  },
  {
    id: '2',
    name: '李四',
    position: '销售顾问',
    tasks: ['3'],
    performance: {
      reception: 12,
      testDrive: 6,
      deal: 2,
      delivery: 2,
    },
  },
];

export function StaffProvider({ children }: { children: React.ReactNode }) {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);

  const addStaff = (newStaff: Staff) => {
    setStaff([...staff, newStaff]);
  };

  const updateStaff = (staffId: string, updates: Partial<Staff>) => {
    setStaff(
      staff.map((s) => (s.id === staffId ? { ...s, ...updates } : s))
    );
  };

  const deleteStaff = (staffId: string) => {
    setStaff(staff.filter((s) => s.id !== staffId));
  };

  return (
    <StaffContext.Provider value={{ staff, addStaff, updateStaff, deleteStaff }}>
      {children}
    </StaffContext.Provider>
  );
}

export function useStaffContext() {
  const context = useContext(StaffContext);
  if (context === undefined) {
    throw new Error('useStaffContext must be used within a StaffProvider');
  }
  return context;
}