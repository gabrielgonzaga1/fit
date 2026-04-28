// Sistema de Autenticação
// Estruturado para fácil migração para Supabase Auth ou Firebase Auth

import { Academy } from '../types';

const DB_PREFIX = 'fitgestor_';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'receptionist' | 'instructor';
  academyId: string;
  academy?: Academy;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Helper functions
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(DB_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
}

// =====================
// AUTH FUNCTIONS
// =====================

export const auth = {
  // Login
  login: async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getItem<User[]>('users', []);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'Email não encontrado' };
    }
    
    // Verifica senha (em produção, usar hash)
    const passwords = getItem<Record<string, string>>('passwords', {});
    if (passwords[user.id] !== password) {
      return { success: false, error: 'Senha incorreta' };
    }
    
    // Busca academia
    const academies = getItem<Academy[]>('academies', []);
    const academy = academies.find(a => a.id === user.academyId);
    
    const fullUser = { ...user, academy };
    
    // Salva sessão
    setItem('current_user', fullUser);
    
    return { success: true, user: fullUser };
  },
  
  // Registro
  register: async (data: {
    name: string;
    email: string;
    password: string;
    academyName: string;
    academyCnpj?: string;
    academyPhone?: string;
  }): Promise<{ success: boolean; error?: string; user?: User }> => {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getItem<User[]>('users', []);
    
    // Verifica se email já existe
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: 'Este email já está cadastrado' };
    }
    
    // Cria academia
    const academyId = `academy-${Date.now()}`;
    const academy: Academy = {
      id: academyId,
      name: data.academyName,
      cnpj: data.academyCnpj || '',
      address: '',
      phone: data.academyPhone || '',
      email: data.email,
      plan: 'starter',
      maxMembers: 200,
      createdAt: new Date(),
    };
    
    const academies = getItem<Academy[]>('academies', []);
    academies.push(academy);
    setItem('academies', academies);
    
    // Cria usuário
    const userId = `user-${Date.now()}`;
    const user: User = {
      id: userId,
      email: data.email,
      name: data.name,
      role: 'owner',
      academyId: academyId,
      academy: academy,
      createdAt: new Date(),
    };
    
    users.push(user);
    setItem('users', users);
    
    // Salva senha
    const passwords = getItem<Record<string, string>>('passwords', {});
    passwords[userId] = data.password;
    setItem('passwords', passwords);
    
    // Cria planos padrão para a nova academia
    const defaultPlans = [
      {
        id: `plan-${academyId}-1`,
        academyId: academyId,
        name: 'Plano Mensal',
        description: 'Acesso à academia',
        price: 89.90,
        durationMonths: 1,
        maxWeeklyVisits: 'unlimited' as const,
        features: ['Acesso ilimitado', 'Avaliação física'],
        active: true,
      },
      {
        id: `plan-${academyId}-2`,
        academyId: academyId,
        name: 'Plano Trimestral',
        description: '3 meses com desconto',
        price: 79.90,
        durationMonths: 3,
        maxWeeklyVisits: 'unlimited' as const,
        features: ['Acesso ilimitado', '10% de desconto'],
        active: true,
      },
      {
        id: `plan-${academyId}-3`,
        academyId: academyId,
        name: 'Plano Anual',
        description: 'Melhor custo-benefício',
        price: 69.90,
        durationMonths: 12,
        maxWeeklyVisits: 'unlimited' as const,
        features: ['Acesso ilimitado', '20% de desconto', 'Aulas coletivas'],
        active: true,
      },
    ];
    
    const plans = getItem<any[]>('membership_plans', []);
    plans.push(...defaultPlans);
    setItem('membership_plans', plans);
    
    // Salva sessão
    setItem('current_user', { ...user, academy });
    
    return { success: true, user: { ...user, academy } };
  },
  
  // Logout
  logout: (): void => {
    localStorage.removeItem(DB_PREFIX + 'current_user');
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    return getItem<User | null>('current_user', null);
  },
  
  // Update user
  updateUser: (userId: string, data: Partial<User>): User | null => {
    const users = getItem<User[]>('users', []);
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...data };
    setItem('users', users);
    
    // Atualiza sessão se for o usuário atual
    const currentUser = auth.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      setItem('current_user', { ...currentUser, ...data });
    }
    
    return users[index];
  },
  
  // Check if email exists
  emailExists: (email: string): boolean => {
    const users = getItem<User[]>('users', []);
    return users.some(u => u.email.toLowerCase() === email.toLowerCase());
  },
};

// =====================
// SEED DEMO USER
// =====================
export function seedDemoUser() {
  const users = getItem<User[]>('users', []);
  
  // Se já existe usuários, não cria demo
  if (users.length > 0) return;
  
  // Cria usuário demo
  const demoUser: User = {
    id: 'user-demo',
    email: 'demo@fitgestor.com',
    name: 'Administrador Demo',
    role: 'owner',
    academyId: 'academy-demo',
    createdAt: new Date(),
  };
  
  users.push(demoUser);
  setItem('users', users);
  
  // Salva senha demo
  const passwords = getItem<Record<string, string>>('passwords', {});
  passwords['user-demo'] = 'demo123';
  setItem('passwords', passwords);
}
