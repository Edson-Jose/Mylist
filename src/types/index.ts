// Definição dos níveis de prioridade aceitos no sistema
export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

// Status das tarefas no estilo Kanban (Trello)
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

// Categorias disponíveis para organização
export type CategoryType = 'WORK' | 'STUDY' | 'PERSONAL' | 'HEALTH';

// Modelo de Dados do Usuário
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

// Modelo de Dados para as Anotações (Tela 3)
export interface Note {
  id: string;
  title: string;
  content: string;
  color?: string; // Código Hexadecimal (ex: #FFFFFF)
  category: CategoryType;
  createdAt: string;
}

// Modelo de Dados para os Agendamentos/Eventos (Tela 4)
export interface Appointment {
  id: string;
  title: string;
  description: string;
  date: string;       // Formato YYYY-MM-DD
  time: string;       // Formato HH:MM
  priority: PriorityLevel;
  status: TaskStatus;
  category: CategoryType;
}