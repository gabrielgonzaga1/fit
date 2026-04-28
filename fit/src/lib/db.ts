// Database Local - Usa localStorage para persistência
// Estruturado para fácil migração para Supabase/Firebase

import { Academy, Member, Payment, WorkoutPlan, ClassSchedule, Instructor, Alert, MembershipPlan } from '../types';

const DB_PREFIX = 'fitgestor_';

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
// ACADEMIES
// =====================
export const dbAcademies = {
  getAll: (): Academy[] => getItem<Academy[]>('academies', []),
  
  getById: (id: string): Academy | undefined => {
    return dbAcademies.getAll().find(a => a.id === id);
  },
  
  create: (academy: Omit<Academy, 'id' | 'createdAt'>): Academy => {
    const academies = dbAcademies.getAll();
    const newAcademy: Academy = {
      ...academy,
      id: `academy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    academies.push(newAcademy);
    setItem('academies', academies);
    return newAcademy;
  },
  
  update: (id: string, data: Partial<Academy>): Academy | null => {
    const academies = dbAcademies.getAll();
    const index = academies.findIndex(a => a.id === id);
    if (index === -1) return null;
    academies[index] = { ...academies[index], ...data };
    setItem('academies', academies);
    return academies[index];
  },
};

// =====================
// MEMBERS
// =====================
export const dbMembers = {
  getAll: (academyId: string): Member[] => {
    const members = getItem<Member[]>('members', []);
    return members.filter(m => m.academyId === academyId);
  },
  
  getById: (id: string): Member | undefined => {
    const members = getItem<Member[]>('members', []);
    return members.find(m => m.id === id);
  },
  
  create: (member: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>): Member => {
    const members = getItem<Member[]>('members', []);
    const newMember: Member = {
      ...member,
      id: `member-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    members.push(newMember);
    setItem('members', members);
    return newMember;
  },
  
  update: (id: string, data: Partial<Member>): Member | null => {
    const members = getItem<Member[]>('members', []);
    const index = members.findIndex(m => m.id === id);
    if (index === -1) return null;
    members[index] = { ...members[index], ...data, updatedAt: new Date() };
    setItem('members', members);
    return members[index];
  },
  
  delete: (id: string): boolean => {
    const members = getItem<Member[]>('members', []);
    const filtered = members.filter(m => m.id !== id);
    setItem('members', filtered);
    return true;
  },
  
  count: (academyId: string): number => dbMembers.getAll(academyId).length,
};

// =====================
// PAYMENTS
// =====================
export const dbPayments = {
  getAll: (academyId: string): Payment[] => {
    const payments = getItem<Payment[]>('payments', []);
    return payments.filter(p => p.academyId === academyId);
  },
  
  getById: (id: string): Payment | undefined => {
    const payments = getItem<Payment[]>('payments', []);
    return payments.find(p => p.id === id);
  },
  
  create: (payment: Omit<Payment, 'id' | 'createdAt'>): Payment => {
    const payments = getItem<Payment[]>('payments', []);
    const newPayment: Payment = {
      ...payment,
      id: `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    payments.push(newPayment);
    setItem('payments', payments);
    return newPayment;
  },
  
  update: (id: string, data: Partial<Payment>): Payment | null => {
    const payments = getItem<Payment[]>('payments', []);
    const index = payments.findIndex(p => p.id === id);
    if (index === -1) return null;
    payments[index] = { ...payments[index], ...data };
    setItem('payments', payments);
    return payments[index];
  },
};

// =====================
// MEMBERSHIP PLANS
// =====================
export const dbMembershipPlans = {
  getAll: (academyId: string): MembershipPlan[] => {
    const plans = getItem<MembershipPlan[]>('membership_plans', []);
    return plans.filter(p => p.academyId === academyId);
  },
  
  getById: (id: string): MembershipPlan | undefined => {
    const plans = getItem<MembershipPlan[]>('membership_plans', []);
    return plans.find(p => p.id === id);
  },
  
  create: (plan: Omit<MembershipPlan, 'id'>): MembershipPlan => {
    const plans = getItem<MembershipPlan[]>('membership_plans', []);
    const newPlan: MembershipPlan = {
      ...plan,
      id: `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    plans.push(newPlan);
    setItem('membership_plans', plans);
    return newPlan;
  },
};

// =====================
// WORKOUT PLANS
// =====================
export const dbWorkoutPlans = {
  getByMember: (memberId: string): WorkoutPlan[] => {
    const workouts = getItem<WorkoutPlan[]>('workout_plans', []);
    return workouts.filter(w => w.memberId === memberId);
  },
  
  create: (workout: Omit<WorkoutPlan, 'id' | 'createdAt' | 'updatedAt'>): WorkoutPlan => {
    const workouts = getItem<WorkoutPlan[]>('workout_plans', []);
    const newWorkout: WorkoutPlan = {
      ...workout,
      id: `workout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    workouts.push(newWorkout);
    setItem('workout_plans', workouts);
    return newWorkout;
  },
};

// =====================
// CLASS SCHEDULES
// =====================
export const dbClassSchedules = {
  getAll: (academyId: string): ClassSchedule[] => {
    const classes = getItem<ClassSchedule[]>('class_schedules', []);
    return classes.filter(c => c.academyId === academyId);
  },
  
  create: (classItem: Omit<ClassSchedule, 'id'>): ClassSchedule => {
    const classes = getItem<ClassSchedule[]>('class_schedules', []);
    const newClass: ClassSchedule = {
      ...classItem,
      id: `class-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    classes.push(newClass);
    setItem('class_schedules', classes);
    return newClass;
  },
};

// =====================
// INSTRUCTORS
// =====================
export const dbInstructors = {
  getAll: (academyId: string): Instructor[] => {
    const instructors = getItem<Instructor[]>('instructors', []);
    return instructors.filter(i => i.academyId === academyId);
  },
  
  create: (instructor: Omit<Instructor, 'id' | 'createdAt'>): Instructor => {
    const instructors = getItem<Instructor[]>('instructors', []);
    const newInstructor: Instructor = {
      ...instructor,
      id: `instructor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    instructors.push(newInstructor);
    setItem('instructors', instructors);
    return newInstructor;
  },
};

// =====================
// ALERTS
// =====================
export const dbAlerts = {
  getAll: (academyId: string): Alert[] => {
    const alerts = getItem<Alert[]>('alerts', []);
    return alerts.filter(a => a.academyId === academyId);
  },
  
  create: (alert: Omit<Alert, 'id' | 'createdAt'>): Alert => {
    const alerts = getItem<Alert[]>('alerts', []);
    const newAlert: Alert = {
      ...alert,
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    alerts.push(newAlert);
    setItem('alerts', alerts);
    return newAlert;
  },
  
  markAsRead: (id: string): void => {
    const alerts = getItem<Alert[]>('alerts', []);
    const index = alerts.findIndex(a => a.id === id);
    if (index !== -1) {
      alerts[index].isRead = true;
      setItem('alerts', alerts);
    }
  },
};

// =====================
// SEED DATA
// =====================
export function seedDatabase() {
  // Verifica se já existe data
  if (getItem<boolean>('seeded', false)) return;
  
  try {
    // Dados iniciais serão inseridos pelo seedData
    const { seedAllData } = require('./seedData');
    seedAllData();
    setItem('seeded', true);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// =====================
// CLEAR ALL DATA
// =====================
export function clearAllData() {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(DB_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}
