import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Member, Payment, Alert, MembershipPlan, ClassSchedule, Instructor, WorkoutPlan } from '../types';
import { useAuth, User } from './AuthContext';
import { 
  dbMembers, 
  dbPayments, 
  dbAlerts, 
  dbMembershipPlans, 
  dbClassSchedules, 
  dbInstructors,
  dbWorkoutPlans
} from '../lib/db';

interface AppContextType {
  // Usuário e academia
  user: User | null;
  academyId: string | null;
  
  // Membros
  members: Member[];
  refreshMembers: () => void;
  addMember: (member: Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'academyId'>) => Member;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  
  // Pagamentos
  payments: Payment[];
  refreshPayments: () => void;
  addPayment: (payment: Omit<Payment, 'id' | 'createdAt' | 'academyId'>) => Payment;
  updatePayment: (id: string, payment: Partial<Payment>) => void;
  
  // Planos
  membershipPlans: MembershipPlan[];
  refreshPlans: () => void;
  
  // Aulas
  classSchedules: ClassSchedule[];
  refreshClasses: () => void;
  
  // Instrutores
  instructors: Instructor[];
  refreshInstructors: () => void;
  
  // Treinos
  getWorkoutsByMember: (memberId: string) => WorkoutPlan[];
  
  // Alertas
  alerts: Alert[];
  refreshAlerts: () => void;
  markAlertAsRead: (id: string) => void;
  unreadAlertsCount: number;
  
  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const academyId = user?.academyId || null;
  
  // State
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);
  const [classSchedules, setClassSchedules] = useState<ClassSchedule[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  
  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Carrega dados quando academia muda
  useEffect(() => {
    if (academyId) {
      refreshMembers();
      refreshPayments();
      refreshPlans();
      refreshClasses();
      refreshInstructors();
      refreshAlerts();
    }
  }, [academyId]);

  // Refresh functions
  const refreshMembers = () => {
    if (academyId) {
      setMembers(dbMembers.getAll(academyId));
    }
  };

  const refreshPayments = () => {
    if (academyId) {
      setPayments(dbPayments.getAll(academyId));
    }
  };

  const refreshPlans = () => {
    if (academyId) {
      setMembershipPlans(dbMembershipPlans.getAll(academyId));
    }
  };

  const refreshClasses = () => {
    if (academyId) {
      setClassSchedules(dbClassSchedules.getAll(academyId));
    }
  };

  const refreshInstructors = () => {
    if (academyId) {
      setInstructors(dbInstructors.getAll(academyId));
    }
  };

  const refreshAlerts = () => {
    if (academyId) {
      setAlerts(dbAlerts.getAll(academyId));
    }
  };

  // Member functions
  const addMember = (memberData: Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'academyId'>): Member => {
    const member = dbMembers.create({
      ...memberData,
      academyId: academyId!,
    });
    refreshMembers();
    return member;
  };

  const updateMember = (id: string, memberUpdate: Partial<Member>) => {
    dbMembers.update(id, memberUpdate);
    refreshMembers();
  };

  const deleteMember = (id: string) => {
    dbMembers.delete(id);
    refreshMembers();
  };

  // Payment functions
  const addPayment = (paymentData: Omit<Payment, 'id' | 'createdAt' | 'academyId'>): Payment => {
    const payment = dbPayments.create({
      ...paymentData,
      academyId: academyId!,
    });
    refreshPayments();
    return payment;
  };

  const updatePayment = (id: string, paymentUpdate: Partial<Payment>) => {
    dbPayments.update(id, paymentUpdate);
    refreshPayments();
  };

  // Workout functions
  const getWorkoutsByMember = (memberId: string): WorkoutPlan[] => {
    return dbWorkoutPlans.getByMember(memberId);
  };

  // Alert functions
  const markAlertAsRead = (id: string) => {
    dbAlerts.markAsRead(id);
    refreshAlerts();
  };

  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;

  return (
    <AppContext.Provider
      value={{
        user,
        academyId,
        members,
        refreshMembers,
        addMember,
        updateMember,
        deleteMember,
        payments,
        refreshPayments,
        addPayment,
        updatePayment,
        membershipPlans,
        refreshPlans,
        classSchedules,
        refreshClasses,
        instructors,
        refreshInstructors,
        getWorkoutsByMember,
        alerts,
        refreshAlerts,
        markAlertAsRead,
        unreadAlertsCount,
        sidebarOpen,
        setSidebarOpen,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Hook para calcular estatísticas
export function useStats() {
  const { members, payments, academyId } = useApp();
  
  if (!academyId) {
    return {
      totalMembers: 0,
      activeMembers: 0,
      inactiveMembers: 0,
      pendingMembers: 0,
      churnRate: 0,
      retentionRate: 0,
      totalRevenue: 0,
      pendingPayments: 0,
      overduePayments: 0,
      averageTicket: 0,
    };
  }

  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === 'active').length;
  const inactiveMembers = members.filter((m) => m.status === 'inactive').length;
  const pendingMembers = members.filter((m) => m.status === 'pending').length;

  const churnRate = totalMembers > 0 ? (inactiveMembers / totalMembers) * 100 : 0;
  const retentionRate = totalMembers > 0 ? (activeMembers / totalMembers) * 100 : 0;

  const paidPayments = payments.filter((p) => p.status === 'paid');
  const totalRevenue = paidPayments.reduce((acc, p) => acc + p.amount, 0);
  
  const pendingPaymentsAmount = payments
    .filter((p) => p.status === 'pending')
    .reduce((acc, p) => acc + p.amount, 0);
  
  const overduePaymentsAmount = payments
    .filter((p) => p.status === 'overdue')
    .reduce((acc, p) => acc + p.amount, 0);

  const averageTicket = paidPayments.length > 0 ? totalRevenue / paidPayments.length : 0;

  return {
    totalMembers,
    activeMembers,
    inactiveMembers,
    pendingMembers,
    churnRate,
    retentionRate,
    totalRevenue,
    pendingPayments: pendingPaymentsAmount,
    overduePayments: overduePaymentsAmount,
    averageTicket,
  };
}
