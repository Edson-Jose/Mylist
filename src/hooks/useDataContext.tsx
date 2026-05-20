import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appointment, CategoryType, Note, PriorityLevel } from '../types';

type TaskType = 'NOTE' | 'APPOINTMENT';

interface AppDataContextData {
  notes: Note[];
  tasks: Appointment[];
  addQuickNote: (title: string, content: string, dateStr: string) => void;
  addQuickSchedule: (
    title: string,
    description: string,
    dateStr: string,
    time: string,
    priority: PriorityLevel,
    category: CategoryType
  ) => void;
  deleteNote: (id: string) => void;
  deleteEvent: (id: string) => void;
}

const DataContext = createContext<AppDataContextData>({} as AppDataContextData);

const formatToIso = (date: string) => {
  const [day, month, year] = date.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tasks, setTasks] = useState<Appointment[]>([]);

 // Altere dentro do seu DataProvider as seguintes funções:

const addQuickNote = (title: string, content: string, dateStr: string) => {
  const isoDate = formatToIso(dateStr);
  const uniqueId = String(Date.now());
  
  // 1. Salva na lista de Notas
  const newNote: Note = {
    id: uniqueId,
    title,
    content,
    createdAt: '18 Mai',
    category: 'PERSONAL'
  };
  setNotes(prev => [newNote, ...prev]);

  // 2. Salva no Quadro do Início, mas com a marcação type: 'NOTE'
  const newComplementaryTask: any = {
    id: uniqueId + '-task',
    title: `📝 Nota: ${title}`,
    description: content,
    date: isoDate,
    time: 'Livre',
    priority: 'LOW',
    status: 'TODO',
    category: 'PERSONAL',
    type: 'NOTE' // <-- Identificador crucial
  };
  setTasks(prev => [newComplementaryTask, ...prev]);
};

const addQuickSchedule = (title: string, description: string, dateStr: string, time: string, priority: PriorityLevel, category: CategoryType) => {
  const isoDate = formatToIso(dateStr);
  
  const newSchedule: any = {
    id: String(Date.now()),
    title: title,
    description: description,
    date: isoDate,
    time,
    priority,
    status: 'TODO',
    category,
    type: 'APPOINTMENT' // <-- Identificador crucial
  };
  setTasks(prev => [newSchedule, ...prev]);
};

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    setTasks(prev => prev.filter(task => task.id !== `${id}-task`));
  };

  const deleteEvent = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <DataContext.Provider value={{ notes, tasks, addQuickNote, addQuickSchedule, deleteNote, deleteEvent }}>
      {children}
    </DataContext.Provider>
  );
};

export const useAppData = () => useContext(DataContext);
