import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from '../types';
import { storage } from '../services/storage';

// 1. Definimos o que o nosso contexto vai expor para o resto do aplicativo
interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// 2. Criamos o contexto propriamente dito
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// 3. Criamos o Provider que vai envolver a aplicação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Executa assim que o app abre para checar se o usuário já estava logado
  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await storage.getUser();
      if (storagedUser) {
        setUser(storagedUser);
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  // Função de Login Simulado (Fake Login)
  async function login(email: string, name: string) {
    setLoading(true);
    
    // Simulando um atraso de rede de 1.5 segundos para ver o Loading rodando
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockUser: User = {
      id: String(Date.now()),
      name: name || 'Sr. Edson',
      email: email,
      avatarUrl: 'https://github.com/github.com.png', // Avatar genérico
    };

    setUser(mockUser);
    await storage.saveUser(mockUser);
    setLoading(false);
  }

  // Função de Logout
  async function logout() {
    await storage.removeUser();
    setUser(null);
  }

  return (
    // !!user transforma o objeto em booleano (se houver user, signed é true)
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook customizado para facilitar o uso do contexto nas telas
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}