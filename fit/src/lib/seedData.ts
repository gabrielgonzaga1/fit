// Dados iniciais para popular o banco de dados
import { Academy, Member, Payment, WorkoutPlan, ClassSchedule, Instructor, Alert, MembershipPlan } from '../types';

const DB_PREFIX = 'fitgestor_';

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
}

export function seedAllData() {
  // =====================
  // ACADEMIA DEFAULT
  // =====================
  const academy: Academy = {
    id: 'academy-demo',
    name: 'Academia FitLife Mundo Novo',
    cnpj: '12.345.678/0001-90',
    address: 'Rua Principal, 123 - Centro, Mundo Novo - BA',
    phone: '(74) 99999-0001',
    email: 'contato@fitlife.com.br',
    plan: 'professional',
    maxMembers: 500,
    createdAt: new Date('2023-01-15'),
  };
  setItem('academies', [academy]);

  // =====================
  // PLANOS
  // =====================
  const plans: MembershipPlan[] = [
    {
      id: 'plan-1',
      academyId: academy.id,
      name: 'Plano Básico',
      description: 'Acesso à musculação',
      price: 79.90,
      durationMonths: 1,
      maxWeeklyVisits: 3,
      features: ['Acesso à musculação', '3x por semana', 'Avaliação física inicial'],
      active: true,
    },
    {
      id: 'plan-2',
      academyId: academy.id,
      name: 'Plano Premium',
      description: 'Acesso completo + aulas coletivas',
      price: 129.90,
      durationMonths: 1,
      maxWeeklyVisits: 'unlimited',
      features: ['Acesso ilimitado', 'Aulas coletivas inclusas', 'Avaliação física', 'App de treino'],
      active: true,
    },
    {
      id: 'plan-3',
      academyId: academy.id,
      name: 'Plano Anual',
      description: 'Melhor custo-benefício',
      price: 99.90,
      durationMonths: 12,
      maxWeeklyVisits: 'unlimited',
      features: ['Acesso ilimitado', 'Aulas coletivas', 'Desconto especial', 'Personal 1x por mês'],
      active: true,
    },
    {
      id: 'plan-4',
      academyId: academy.id,
      name: 'Plano Estudante',
      description: 'Desconto especial para estudantes',
      price: 59.90,
      durationMonths: 1,
      maxWeeklyVisits: 'unlimited',
      features: ['Acesso ilimitado', 'Desconto estudante', 'Horários especiais'],
      active: true,
    },
  ];
  setItem('membership_plans', plans);

  // =====================
  // INSTRUTORES
  // =====================
  const instructors: Instructor[] = [
    {
      id: 'instructor-1',
      academyId: academy.id,
      name: 'Carlos Silva',
      email: 'carlos@fitlife.com.br',
      phone: '(74) 99999-1001',
      cref: '123456-G/BA',
      specialties: ['Musculação', 'Funcional', 'CrossFit'],
      status: 'active',
      createdAt: new Date('2023-01-15'),
    },
    {
      id: 'instructor-2',
      academyId: academy.id,
      name: 'Ana Santos',
      email: 'ana@fitlife.com.br',
      phone: '(74) 99999-1002',
      cref: '234567-G/BA',
      specialties: ['Yoga', 'Pilates', 'Dança'],
      status: 'active',
      createdAt: new Date('2023-02-20'),
    },
    {
      id: 'instructor-3',
      academyId: academy.id,
      name: 'Pedro Oliveira',
      email: 'pedro@fitlife.com.br',
      phone: '(74) 99999-1003',
      cref: '345678-G/BA',
      specialties: ['Spinning', 'Funcional', 'Musculação'],
      status: 'active',
      createdAt: new Date('2023-03-10'),
    },
    {
      id: 'instructor-4',
      academyId: academy.id,
      name: 'Julia Costa',
      email: 'julia@fitlife.com.br',
      phone: '(74) 99999-1004',
      cref: '456789-G/BA',
      specialties: ['Jump', 'Aeróbico', 'Gap'],
      status: 'active',
      createdAt: new Date('2023-04-05'),
    },
  ];
  setItem('instructors', instructors);

  // =====================
  // MEMBROS
  // =====================
  const members: Member[] = [
    {
      id: 'member-1',
      academyId: academy.id,
      name: 'João Paulo Ferreira',
      email: 'joao.paulo@email.com',
      phone: '(74) 99876-1234',
      cpf: '123.456.789-00',
      birthDate: '1990-05-15',
      gender: 'male',
      address: 'Rua das Flores, 45 - Mundo Novo',
      emergencyContact: '(74) 99876-5678',
      status: 'active',
      membershipPlanId: 'plan-2',
      joinDate: '2024-01-10',
      lastVisit: new Date().toISOString().split('T')[0],
      visitsCount: 87,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date(),
    },
    {
      id: 'member-2',
      academyId: academy.id,
      name: 'Maria Eduarda Silva',
      email: 'maria.silva@email.com',
      phone: '(74) 99876-2345',
      cpf: '234.567.890-11',
      birthDate: '1995-08-22',
      gender: 'female',
      address: 'Av. Brasil, 789 - Mundo Novo',
      emergencyContact: '(74) 99876-6789',
      status: 'active',
      membershipPlanId: 'plan-2',
      joinDate: '2024-02-15',
      lastVisit: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      visitsCount: 65,
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date(),
    },
    {
      id: 'member-3',
      academyId: academy.id,
      name: 'Rafael Santos',
      email: 'rafael.santos@email.com',
      phone: '(74) 99876-3456',
      cpf: '345.678.901-22',
      birthDate: '1988-03-10',
      gender: 'male',
      address: 'Rua Central, 123 - Mundo Novo',
      emergencyContact: '(74) 99876-7890',
      status: 'active',
      membershipPlanId: 'plan-3',
      joinDate: '2023-06-20',
      lastVisit: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      visitsCount: 156,
      createdAt: new Date('2023-06-20'),
      updatedAt: new Date(),
    },
    {
      id: 'member-4',
      academyId: academy.id,
      name: 'Fernanda Oliveira',
      email: 'fernanda.oliveira@email.com',
      phone: '(74) 99876-4567',
      cpf: '456.789.012-33',
      birthDate: '1992-11-28',
      gender: 'female',
      address: 'Rua Nova, 56 - Mundo Novo',
      emergencyContact: '(74) 99876-8901',
      status: 'active',
      membershipPlanId: 'plan-4',
      joinDate: '2024-03-01',
      lastVisit: new Date(Date.now() - 604800000).toISOString().split('T')[0],
      visitsCount: 32,
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date(),
    },
    {
      id: 'member-5',
      academyId: academy.id,
      name: 'Lucas Mendes',
      email: 'lucas.mendes@email.com',
      phone: '(74) 99876-5678',
      cpf: '567.890.123-44',
      birthDate: '2000-07-05',
      gender: 'male',
      address: 'Av. Principal, 234 - Mundo Novo',
      emergencyContact: '(74) 99876-9012',
      status: 'active',
      membershipPlanId: 'plan-1',
      joinDate: '2024-04-10',
      lastVisit: new Date(Date.now() - 2592000000).toISOString().split('T')[0],
      visitsCount: 8,
      createdAt: new Date('2024-04-10'),
      updatedAt: new Date(),
    },
    {
      id: 'member-6',
      academyId: academy.id,
      name: 'Camila Rodrigues',
      email: 'camila.rodrigues@email.com',
      phone: '(74) 99876-6789',
      cpf: '678.901.234-55',
      birthDate: '1985-12-18',
      gender: 'female',
      address: 'Rua do Comércio, 89 - Mundo Novo',
      emergencyContact: '(74) 99876-0123',
      status: 'inactive',
      membershipPlanId: 'plan-2',
      joinDate: '2023-09-15',
      lastVisit: new Date(Date.now() - 5184000000).toISOString().split('T')[0],
      visitsCount: 45,
      createdAt: new Date('2023-09-15'),
      updatedAt: new Date(),
    },
    {
      id: 'member-7',
      academyId: academy.id,
      name: 'Thiago Almeida',
      email: 'thiago.almeida@email.com',
      phone: '(74) 99876-7890',
      cpf: '789.012.345-66',
      birthDate: '1998-02-25',
      gender: 'male',
      address: 'Rua das Palmeiras, 12 - Mundo Novo',
      emergencyContact: '(74) 99876-1234',
      status: 'active',
      membershipPlanId: 'plan-2',
      joinDate: '2024-05-01',
      lastVisit: new Date(Date.now() - 432000000).toISOString().split('T')[0],
      visitsCount: 22,
      createdAt: new Date('2024-05-01'),
      updatedAt: new Date(),
    },
    {
      id: 'member-8',
      academyId: academy.id,
      name: 'Patricia Lima',
      email: 'patricia.lima@email.com',
      phone: '(74) 99876-8901',
      cpf: '890.123.456-77',
      birthDate: '1993-09-08',
      gender: 'female',
      address: 'Av. das Árvores, 456 - Mundo Novo',
      emergencyContact: '(74) 99876-2345',
      status: 'pending',
      membershipPlanId: 'plan-4',
      joinDate: '2024-06-01',
      visitsCount: 5,
      createdAt: new Date('2024-06-01'),
      updatedAt: new Date(),
    },
    {
      id: 'member-9',
      academyId: academy.id,
      name: 'Bruno Costa',
      email: 'bruno.costa@email.com',
      phone: '(74) 99876-9012',
      cpf: '901.234.567-88',
      birthDate: '1991-04-12',
      gender: 'male',
      address: 'Rua do Sol, 78 - Mundo Novo',
      emergencyContact: '(74) 99876-3456',
      status: 'active',
      membershipPlanId: 'plan-3',
      joinDate: '2024-01-20',
      lastVisit: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      visitsCount: 78,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date(),
    },
    {
      id: 'member-10',
      academyId: academy.id,
      name: 'Amanda Souza',
      email: 'amanda.souza@email.com',
      phone: '(74) 99876-0123',
      cpf: '012.345.678-99',
      birthDate: '1997-06-30',
      gender: 'female',
      address: 'Rua Nova Era, 34 - Mundo Novo',
      emergencyContact: '(74) 99876-4567',
      status: 'active',
      membershipPlanId: 'plan-2',
      joinDate: '2024-02-28',
      lastVisit: new Date(Date.now() - 259200000).toISOString().split('T')[0],
      visitsCount: 55,
      createdAt: new Date('2024-02-28'),
      updatedAt: new Date(),
    },
  ];
  setItem('members', members);

  // =====================
  // PAGAMENTOS
  // =====================
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const payments: Payment[] = [
    // Janeiro
    { id: 'pay-1', memberId: 'member-1', academyId: academy.id, amount: 129.90, dueDate: '2025-01-10', paymentDate: '2025-01-08', status: 'paid', paymentMethod: 'pix', referenceMonth: '2025-01', createdAt: new Date('2025-01-01') },
    { id: 'pay-2', memberId: 'member-2', academyId: academy.id, amount: 129.90, dueDate: '2025-01-15', paymentDate: '2025-01-14', status: 'paid', paymentMethod: 'credit_card', referenceMonth: '2025-01', createdAt: new Date('2025-01-01') },
    { id: 'pay-3', memberId: 'member-3', academyId: academy.id, amount: 99.90, dueDate: '2025-01-20', paymentDate: '2025-01-18', status: 'paid', paymentMethod: 'bank_transfer', referenceMonth: '2025-01', createdAt: new Date('2025-01-01') },
    // Fevereiro
    { id: 'pay-4', memberId: 'member-1', academyId: academy.id, amount: 129.90, dueDate: '2025-02-10', paymentDate: '2025-02-09', status: 'paid', paymentMethod: 'pix', referenceMonth: '2025-02', createdAt: new Date('2025-02-01') },
    { id: 'pay-5', memberId: 'member-2', academyId: academy.id, amount: 129.90, dueDate: '2025-02-15', paymentDate: '2025-02-15', status: 'paid', paymentMethod: 'credit_card', referenceMonth: '2025-02', createdAt: new Date('2025-02-01') },
    { id: 'pay-6', memberId: 'member-3', academyId: academy.id, amount: 99.90, dueDate: '2025-02-20', paymentDate: '2025-02-19', status: 'paid', paymentMethod: 'pix', referenceMonth: '2025-02', createdAt: new Date('2025-02-01') },
    { id: 'pay-7', memberId: 'member-4', academyId: academy.id, amount: 59.90, dueDate: '2025-02-01', paymentDate: '2025-02-01', status: 'paid', paymentMethod: 'cash', referenceMonth: '2025-02', createdAt: new Date('2025-02-01') },
    // Março
    { id: 'pay-8', memberId: 'member-1', academyId: academy.id, amount: 129.90, dueDate: '2025-03-10', paymentDate: '2025-03-10', status: 'paid', paymentMethod: 'pix', referenceMonth: '2025-03', createdAt: new Date('2025-03-01') },
    { id: 'pay-9', memberId: 'member-2', academyId: academy.id, amount: 129.90, dueDate: '2025-03-15', paymentDate: '2025-03-18', status: 'paid', paymentMethod: 'credit_card', referenceMonth: '2025-03', createdAt: new Date('2025-03-01') },
    { id: 'pay-10', memberId: 'member-3', academyId: academy.id, amount: 99.90, dueDate: '2025-03-20', paymentDate: '2025-03-20', status: 'paid', paymentMethod: 'pix', referenceMonth: '2025-03', createdAt: new Date('2025-03-01') },
    { id: 'pay-11', memberId: 'member-4', academyId: academy.id, amount: 59.90, dueDate: '2025-03-01', status: 'overdue', referenceMonth: '2025-03', createdAt: new Date('2025-03-01') },
    { id: 'pay-12', memberId: 'member-5', academyId: academy.id, amount: 79.90, dueDate: '2025-03-10', paymentDate: '2025-03-12', status: 'paid', paymentMethod: 'pix', referenceMonth: '2025-03', createdAt: new Date('2025-03-01') },
    // Mês atual
    { id: 'pay-13', memberId: 'member-1', academyId: academy.id, amount: 129.90, dueDate: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-10`, status: 'pending', referenceMonth: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`, createdAt: new Date() },
    { id: 'pay-14', memberId: 'member-2', academyId: academy.id, amount: 129.90, dueDate: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-15`, status: 'pending', referenceMonth: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`, createdAt: new Date() },
    { id: 'pay-15', memberId: 'member-3', academyId: academy.id, amount: 99.90, dueDate: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-20`, status: 'pending', referenceMonth: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`, createdAt: new Date() },
    { id: 'pay-16', memberId: 'member-4', academyId: academy.id, amount: 59.90, dueDate: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`, status: 'overdue', referenceMonth: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`, createdAt: new Date() },
    { id: 'pay-17', memberId: 'member-5', academyId: academy.id, amount: 79.90, dueDate: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-10`, status: 'pending', referenceMonth: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`, createdAt: new Date() },
    { id: 'pay-18', memberId: 'member-7', academyId: academy.id, amount: 129.90, dueDate: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`, status: 'paid', paymentMethod: 'pix', paymentDate: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`, referenceMonth: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`, createdAt: new Date() },
    { id: 'pay-19', memberId: 'member-9', academyId: academy.id, amount: 99.90, dueDate: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-20`, status: 'pending', referenceMonth: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`, createdAt: new Date() },
    { id: 'pay-20', memberId: 'member-10', academyId: academy.id, amount: 129.90, dueDate: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-28`, status: 'pending', referenceMonth: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`, createdAt: new Date() },
  ];
  setItem('payments', payments);

  // =====================
  // FICHAS DE TREINO
  // =====================
  const workoutPlans: WorkoutPlan[] = [
    {
      id: 'workout-1',
      memberId: 'member-1',
      instructorId: 'instructor-1',
      name: 'Treino Hipertrofia - Iniciante',
      objective: 'Ganho de massa muscular',
      startDate: '2024-01-15',
      active: true,
      exercises: [
        { id: 'ex-1', name: 'Supino Reto', muscleGroup: 'Peito', sets: 4, reps: '10-12', restSeconds: 60, order: 1 },
        { id: 'ex-2', name: 'Supino Inclinado', muscleGroup: 'Peito', sets: 3, reps: '10-12', restSeconds: 60, order: 2 },
        { id: 'ex-3', name: 'Crucifixo', muscleGroup: 'Peito', sets: 3, reps: '12-15', restSeconds: 45, order: 3 },
        { id: 'ex-4', name: 'Desenvolvimento', muscleGroup: 'Ombro', sets: 4, reps: '10-12', restSeconds: 60, order: 4 },
        { id: 'ex-5', name: 'Elevação Lateral', muscleGroup: 'Ombro', sets: 3, reps: '12-15', restSeconds: 45, order: 5 },
        { id: 'ex-6', name: 'Tríceps Corda', muscleGroup: 'Tríceps', sets: 3, reps: '12-15', restSeconds: 45, order: 6 },
      ],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
    },
    {
      id: 'workout-2',
      memberId: 'member-1',
      instructorId: 'instructor-1',
      name: 'Treino Costas e Bíceps',
      objective: 'Hipertrofia de costas e braços',
      startDate: '2024-01-15',
      active: true,
      exercises: [
        { id: 'ex-7', name: 'Puxada Frontal', muscleGroup: 'Costas', sets: 4, reps: '10-12', restSeconds: 60, order: 1 },
        { id: 'ex-8', name: 'Remada Baixa', muscleGroup: 'Costas', sets: 4, reps: '10-12', restSeconds: 60, order: 2 },
        { id: 'ex-9', name: 'Remada Curvada', muscleGroup: 'Costas', sets: 3, reps: '10-12', restSeconds: 60, order: 3 },
        { id: 'ex-10', name: 'Rosca Direta', muscleGroup: 'Bíceps', sets: 3, reps: '10-12', restSeconds: 45, order: 4 },
        { id: 'ex-11', name: 'Rosca Martelo', muscleGroup: 'Bíceps', sets: 3, reps: '10-12', restSeconds: 45, order: 5 },
      ],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
    },
    {
      id: 'workout-3',
      memberId: 'member-1',
      instructorId: 'instructor-1',
      name: 'Treino Inferior',
      objective: 'Força e hipertrofia de pernas',
      startDate: '2024-01-15',
      active: true,
      exercises: [
        { id: 'ex-12', name: 'Agachamento Livre', muscleGroup: 'Pernas', sets: 4, reps: '8-10', restSeconds: 90, order: 1 },
        { id: 'ex-13', name: 'Leg Press', muscleGroup: 'Pernas', sets: 4, reps: '10-12', restSeconds: 60, order: 2 },
        { id: 'ex-14', name: 'Cadeira Extensora', muscleGroup: 'Quadríceps', sets: 3, reps: '12-15', restSeconds: 45, order: 3 },
        { id: 'ex-15', name: 'Mesa Flexora', muscleGroup: 'Posterior', sets: 3, reps: '10-12', restSeconds: 45, order: 4 },
        { id: 'ex-16', name: 'Panturrilha em Pé', muscleGroup: 'Panturrilha', sets: 4, reps: '15-20', restSeconds: 30, order: 5 },
      ],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
    },
  ];
  setItem('workout_plans', workoutPlans);

  // =====================
  // AULAS COLETIVAS
  // =====================
  const classSchedules: ClassSchedule[] = [
    { id: 'class-1', academyId: academy.id, name: 'Spinning', instructor: 'Pedro Oliveira', dayOfWeek: 1, startTime: '07:00', endTime: '08:00', maxCapacity: 20, currentCapacity: 15, room: 'Sala 1', difficulty: 'intermediate', active: true },
    { id: 'class-2', academyId: academy.id, name: 'Yoga', instructor: 'Ana Santos', dayOfWeek: 1, startTime: '18:00', endTime: '19:00', maxCapacity: 15, currentCapacity: 10, room: 'Sala 2', difficulty: 'beginner', active: true },
    { id: 'class-3', academyId: academy.id, name: 'Funcional', instructor: 'Carlos Silva', dayOfWeek: 2, startTime: '07:00', endTime: '08:00', maxCapacity: 25, currentCapacity: 20, room: 'Área Externa', difficulty: 'intermediate', active: true },
    { id: 'class-4', academyId: academy.id, name: 'Jump', instructor: 'Julia Costa', dayOfWeek: 2, startTime: '18:30', endTime: '19:30', maxCapacity: 20, currentCapacity: 18, room: 'Sala 1', difficulty: 'all', active: true },
    { id: 'class-5', academyId: academy.id, name: 'Spinning', instructor: 'Pedro Oliveira', dayOfWeek: 3, startTime: '07:00', endTime: '08:00', maxCapacity: 20, currentCapacity: 16, room: 'Sala 1', difficulty: 'intermediate', active: true },
    { id: 'class-6', academyId: academy.id, name: 'Pilates', instructor: 'Ana Santos', dayOfWeek: 3, startTime: '18:00', endTime: '19:00', maxCapacity: 12, currentCapacity: 10, room: 'Sala 2', difficulty: 'beginner', active: true },
    { id: 'class-7', academyId: academy.id, name: 'CrossFit', instructor: 'Carlos Silva', dayOfWeek: 4, startTime: '06:00', endTime: '07:00', maxCapacity: 15, currentCapacity: 12, room: 'Box CrossFit', difficulty: 'advanced', active: true },
    { id: 'class-8', academyId: academy.id, name: 'Zumba', instructor: 'Julia Costa', dayOfWeek: 4, startTime: '19:00', endTime: '20:00', maxCapacity: 30, currentCapacity: 25, room: 'Sala 1', difficulty: 'all', active: true },
    { id: 'class-9', academyId: academy.id, name: 'Funcional', instructor: 'Carlos Silva', dayOfWeek: 5, startTime: '07:00', endTime: '08:00', maxCapacity: 25, currentCapacity: 22, room: 'Área Externa', difficulty: 'intermediate', active: true },
    { id: 'class-10', academyId: academy.id, name: 'Spinning', instructor: 'Pedro Oliveira', dayOfWeek: 5, startTime: '18:00', endTime: '19:00', maxCapacity: 20, currentCapacity: 14, room: 'Sala 1', difficulty: 'intermediate', active: true },
    { id: 'class-11', academyId: academy.id, name: 'Yoga', instructor: 'Ana Santos', dayOfWeek: 6, startTime: '09:00', endTime: '10:30', maxCapacity: 15, currentCapacity: 8, room: 'Sala 2', difficulty: 'beginner', active: true },
  ];
  setItem('class_schedules', classSchedules);

  // =====================
  // ALERTAS
  // =====================
  const alerts: Alert[] = [
    {
      id: 'alert-1',
      academyId: academy.id,
      type: 'churn_risk',
      title: 'Risco de Evasão',
      description: 'Aluno não frequenta a academia há mais de 30 dias',
      memberId: 'member-5',
      memberName: 'Lucas Mendes',
      priority: 'high',
      isRead: false,
      createdAt: new Date(),
    },
    {
      id: 'alert-2',
      academyId: academy.id,
      type: 'payment_overdue',
      title: 'Pagamento em Atraso',
      description: 'Mensalidade vencida há mais de 10 dias',
      memberId: 'member-4',
      memberName: 'Fernanda Oliveira',
      priority: 'high',
      isRead: false,
      createdAt: new Date(),
    },
    {
      id: 'alert-3',
      academyId: academy.id,
      type: 'inactive',
      title: 'Aluno Inativo',
      description: 'Aluno sem atividade há 60+ dias',
      memberId: 'member-6',
      memberName: 'Camila Rodrigues',
      priority: 'medium',
      isRead: true,
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: 'alert-4',
      academyId: academy.id,
      type: 'birthday',
      title: 'Aniversário',
      description: 'Aniversariante do mês',
      memberId: 'member-1',
      memberName: 'João Paulo Ferreira',
      priority: 'low',
      isRead: false,
      createdAt: new Date(),
    },
    {
      id: 'alert-5',
      academyId: academy.id,
      type: 'plan_expiring',
      title: 'Plano Expirando',
      description: 'Plano expira em 7 dias',
      memberId: 'member-8',
      memberName: 'Patricia Lima',
      priority: 'medium',
      isRead: false,
      createdAt: new Date(),
    },
  ];
  setItem('alerts', alerts);
}
