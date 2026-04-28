// Tipos principais do sistema FitGestor

export interface Academy {
  id: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  plan: 'starter' | 'professional' | 'enterprise';
  maxMembers: number;
  createdAt: Date;
}

export interface Member {
  id: string;
  academyId: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  photo?: string;
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  membershipPlanId: string;
  joinDate: string;
  lastVisit?: string;
  visitsCount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MembershipPlan {
  id: string;
  academyId: string;
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  maxWeeklyVisits: number | 'unlimited';
  features: string[];
  active: boolean;
}

export interface Payment {
  id: string;
  memberId: string;
  academyId: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod?: 'credit_card' | 'debit_card' | 'pix' | 'cash' | 'bank_transfer';
  referenceMonth: string;
  notes?: string;
  createdAt: Date;
}

export interface WorkoutPlan {
  id: string;
  memberId: string;
  instructorId: string;
  name: string;
  objective: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  exercises: WorkoutExercise[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  weight?: string;
  restSeconds: number;
  notes?: string;
  order: number;
}

export interface ClassSchedule {
  id: string;
  academyId: string;
  name: string;
  instructor: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Domingo
  startTime: string;
  endTime: string;
  maxCapacity: number;
  currentCapacity: number;
  room: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all';
  active: boolean;
}

export interface ClassBooking {
  id: string;
  classScheduleId: string;
  memberId: string;
  date: string;
  status: 'booked' | 'attended' | 'cancelled' | 'no_show';
  createdAt: Date;
}

export interface Instructor {
  id: string;
  academyId: string;
  name: string;
  email: string;
  phone: string;
  cref?: string;
  specialties: string[];
  photo?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface Alert {
  id: string;
  academyId: string;
  type: 'churn_risk' | 'payment_overdue' | 'birthday' | 'inactive' | 'plan_expiring';
  title: string;
  description: string;
  memberId: string;
  memberName: string;
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  createdAt: Date;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  churnedMembersThisMonth: number;
  churnRate: number;
  retentionRate: number;
  totalRevenue: number;
  pendingPayments: number;
  overduePayments: number;
  averageTicket: number;
  visitsToday: number;
  visitsThisWeek: number;
  visitsThisMonth: number;
  occupancyRate: number;
}

export interface ChartData {
  label: string;
  value: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  expenses: number;
}

export interface MemberAttendance {
  date: string;
  present: number;
  absent: number;
}
