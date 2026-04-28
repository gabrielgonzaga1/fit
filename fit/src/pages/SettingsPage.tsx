import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { MembershipPlan, Instructor } from '../types';

type SettingsTab = 'academy' | 'plans' | 'instructors' | 'users' | 'integrations';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('academy');
  const { user, membershipPlans, instructors } = useApp();
  const { logout } = useAuth();

  const tabs = [
    { id: 'academy', label: 'Academia', icon: '🏢' },
    { id: 'plans', label: 'Planos', icon: '📋' },
    { id: 'instructors', label: 'Instrutores', icon: '👨‍🏫' },
    { id: 'integrations', label: 'Integrações', icon: '🔗' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Configurações</h1>
        <p className="text-sm sm:text-base text-slate-500">Gerencie sua academia</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4">
        {/* Tabs - Horizontal on mobile */}
        <div className="lg:col-span-4 lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Tabs - Desktop */}
        <div className="hidden lg:block rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
          
          {/* Logout Button */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <span className="text-lg">🚪</span>
              Sair da conta
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Academy Settings */}
          {activeTab === 'academy' && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="mb-4 sm:mb-6 text-base sm:text-lg font-semibold text-slate-800">Dados da Academia</h2>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Nome</label>
                  <input
                    type="text"
                    defaultValue={user?.academy?.name}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">CNPJ</label>
                  <input
                    type="text"
                    defaultValue={user?.academy?.cnpj}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Endereço</label>
                  <input
                    type="text"
                    defaultValue={user?.academy?.address}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Telefone</label>
                  <input
                    type="text"
                    defaultValue={user?.academy?.phone}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.academy?.email}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-200 hover:shadow-xl">
                  Salvar Alterações
                </button>
              </div>
            </div>
          )}

          {/* Plans Settings */}
          {activeTab === 'plans' && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-slate-800">Planos</h2>
                <button className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white">
                  + Novo Plano
                </button>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {membershipPlans.map((plan: MembershipPlan) => (
                  <div key={plan.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-lg border border-slate-200 p-3 sm:p-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-800 text-sm sm:text-base">{plan.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-500">{plan.description}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:text-right">
                      <div className="sm:text-right">
                        <p className="text-lg sm:text-xl font-bold text-orange-600">R$ {plan.price.toFixed(2)}</p>
                        <p className="text-xs text-slate-500">/mês</p>
                      </div>
                      <button className="rounded-lg border border-slate-200 px-2 sm:px-3 py-1 sm:py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructors Settings */}
          {activeTab === 'instructors' && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-slate-800">Instrutores</h2>
                <button className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white">
                  + Novo
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                {instructors.map((instructor: Instructor) => (
                  <div key={instructor.id} className="flex items-center gap-3 sm:gap-4 rounded-lg border border-slate-200 p-3 sm:p-4">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-base sm:text-lg font-bold text-white">
                      {instructor.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-800 text-sm sm:text-base">{instructor.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-500">CREF: {instructor.cref}</p>
                    </div>
                    <button className="rounded-lg border border-slate-200 px-2 sm:px-3 py-1 sm:py-1.5 text-xs text-slate-600 hover:bg-slate-50 shrink-0">
                      Editar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrations Settings */}
          {activeTab === 'integrations' && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="mb-4 sm:mb-6 text-base sm:text-lg font-semibold text-slate-800">Integrações</h2>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                {[
                  { name: 'WhatsApp', icon: '📱', description: 'Mensagens automáticas', connected: false },
                  { name: 'Pagamentos', icon: '💳', description: 'Processamento online', connected: false },
                  { name: 'Google Calendar', icon: '📅', description: 'Sincronização agenda', connected: false },
                  { name: 'Catraca', icon: '🚪', description: 'Controle de acesso', connected: false },
                ].map((integration, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xl sm:text-2xl">
                        {integration.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 text-sm sm:text-base">{integration.name}</p>
                        <p className="text-xs sm:text-sm text-slate-500">{integration.description}</p>
                      </div>
                    </div>
                    <button className="rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium shrink-0 bg-slate-100 text-slate-600 hover:bg-slate-200">
                      Conectar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
