import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Member } from '../types';

export default function MembersPage() {
  const { members, addMember, updateMember, deleteMember, academyId, membershipPlans } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPlanName = (planId: string) => {
    const plan = membershipPlans.find((p) => p.id === planId);
    return plan?.name || 'N/A';
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      blocked: 'bg-slate-100 text-slate-800',
    };
    const labels: Record<string, string> = {
      active: 'Ativo',
      inactive: 'Inativo',
      pending: 'Pendente',
      blocked: 'Bloqueado',
    };
    return (
      <span className={`rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium ${styles[status] || 'bg-slate-100 text-slate-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setShowModal(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
      deleteMember(id);
    }
  };

  const daysSinceLastVisit = (lastVisit?: string) => {
    if (!lastVisit) return 'Nunca';
    const diff = Math.floor((Date.now() - new Date(lastVisit).getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Hoje';
    if (diff === 1) return 'Ontem';
    return `${diff} dias`;
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Alunos</h1>
          <p className="text-sm sm:text-base text-slate-500">Gerencie os alunos da academia</p>
        </div>
        <button
          onClick={handleAddMember}
          className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-200 hover:shadow-xl transition-shadow"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Aluno
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2 sm:gap-3">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Buscar aluno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
            <option value="pending">Pendentes</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-slate-500">Total</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-800">{filteredMembers.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-slate-500">Ativos</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{filteredMembers.filter(m => m.status === 'active').length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-slate-500">Inativos</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{filteredMembers.filter(m => m.status === 'inactive').length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-slate-500">Pendentes</p>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">{filteredMembers.filter(m => m.status === 'pending').length}</p>
        </div>
      </div>

      {/* Members List - Cards */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-base sm:text-lg font-bold text-white">
                  {member.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-800 text-sm sm:text-base truncate">{member.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-500">{getPlanName(member.membershipPlanId)}</p>
                </div>
              </div>
              {getStatusBadge(member.status)}
            </div>
            <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-500 truncate">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {member.phone}
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Última visita: {daysSinceLastVisit(member.lastVisit)}
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-slate-100 pt-3 sm:pt-4">
              <div className="text-xs sm:text-sm text-slate-500">
                <span className="font-medium text-slate-800">{member.visitsCount}</span> visitas
              </div>
              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={() => handleEditMember(member)}
                  className="rounded-lg p-1.5 sm:p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="rounded-lg p-1.5 sm:p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Member Modal */}
      {showModal && (
        <MemberModal
          member={selectedMember}
          membershipPlans={membershipPlans}
          onClose={() => setShowModal(false)}
          onSave={(memberData) => {
            if (selectedMember) {
              updateMember(selectedMember.id, memberData);
            } else {
              addMember({
                ...memberData,
                academyId: academyId || '',
              } as Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'academyId'>);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

// Member Modal Component
function MemberModal({ member, membershipPlans, onClose, onSave }: {
  member: Member | null;
  membershipPlans: { id: string; name: string; price: number }[];
  onClose: () => void;
  onSave: (member: Partial<Member>) => void;
}) {
  const [formData, setFormData] = useState<Partial<Member>>({
    name: member?.name || '',
    email: member?.email || '',
    phone: member?.phone || '',
    cpf: member?.cpf || '',
    birthDate: member?.birthDate || '',
    gender: member?.gender || 'male',
    address: member?.address || '',
    emergencyContact: member?.emergencyContact || '',
    status: member?.status || 'pending',
    membershipPlanId: member?.membershipPlanId || membershipPlans[0]?.id || '',
    joinDate: member?.joinDate || new Date().toISOString().split('T')[0],
    visitsCount: member?.visitsCount || 0,
    notes: member?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 p-0 sm:p-4 overflow-y-auto">
      <div className="w-full sm:max-w-2xl rounded-none sm:rounded-xl bg-white shadow-xl max-h-screen overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white p-4 sm:p-6 z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
            {member ? 'Editar Aluno' : 'Novo Aluno'}
          </h2>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Nome Completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Plano</label>
              <select
                value={formData.membershipPlanId}
                onChange={(e) => setFormData({ ...formData, membershipPlanId: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                {membershipPlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - R$ {plan.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Member['status'] })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="pending">Pendente</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>
          <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-white pt-4 pb-2 sm:pb-0">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-200 hover:shadow-xl"
            >
              {member ? 'Salvar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
