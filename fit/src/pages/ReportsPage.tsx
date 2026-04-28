import { useState } from 'react';
import { useApp, useStats } from '../context/AppContext';
import { generateAttendanceData, generateRevenueData } from '../data/mockData';
import { Member, Payment } from '../types';

type ReportType = 'overview' | 'members' | 'financial' | 'attendance';

export default function ReportsPage() {
  const { members, payments } = useApp();
  const [reportType, setReportType] = useState<ReportType>('overview');
  const stats = useStats();
  const revenueData = generateRevenueData();

  const reportTypes = [
    { id: 'overview', label: 'Visão Geral', icon: '📊' },
    { id: 'members', label: 'Alunos', icon: '👥' },
    { id: 'financial', label: 'Financeiro', icon: '💰' },
    { id: 'attendance', label: 'Frequência', icon: '📅' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Relatórios</h1>
        <p className="text-sm sm:text-base text-slate-500">Análises e métricas</p>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setReportType(type.id as ReportType)}
            className={`flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap ${
              reportType === type.id
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-200'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{type.icon}</span>
            <span className="hidden sm:inline">{type.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Report */}
      {reportType === 'overview' && (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {/* KPIs */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">Indicadores</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-lg bg-blue-50 p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-blue-600">Alunos Ativos</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-800">{stats.activeMembers}</p>
              </div>
              <div className="rounded-lg bg-green-50 p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-green-600">Retenção</p>
                <p className="text-xl sm:text-2xl font-bold text-green-800">{stats.retentionRate.toFixed(1)}%</p>
              </div>
              <div className="rounded-lg bg-orange-50 p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-orange-600">Ticket Médio</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-800">R$ {stats.averageTicket.toFixed(0)}</p>
              </div>
              <div className="rounded-lg bg-red-50 p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-red-600">Evasão</p>
                <p className="text-xl sm:text-2xl font-bold text-red-800">{stats.churnRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">Receita</h3>
            <div className="h-36 sm:h-48">
              <div className="flex h-full items-end justify-between gap-1 sm:gap-2">
                {revenueData.map((item) => (
                  <div key={item.month} className="flex flex-1 flex-col items-center gap-1 sm:gap-2">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-green-500 to-green-400"
                      style={{ height: `${(item.revenue / 8000) * 120}px` }}
                    />
                    <span className="text-[10px] sm:text-xs text-slate-500">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Members Report */}
      {reportType === 'members' && (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">Top Alunos</h3>
            <div className="space-y-2 sm:space-y-3">
              {members
                .sort((a: Member, b: Member) => b.visitsCount - a.visitsCount)
                .slice(0, 5)
                .map((member: Member, index: number) => (
                  <div key={member.id} className="flex items-center gap-2 sm:gap-3">
                    <div className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs sm:text-sm font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-orange-600' : 'bg-slate-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 text-xs sm:text-sm truncate">{member.name}</p>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-600">{member.visitsCount}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Financial Report */}
      {reportType === 'financial' && (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">Status</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">✅</span>
                  <span className="font-medium text-green-800 text-sm sm:text-base">Pagos</span>
                </div>
                <span className="text-base sm:text-lg font-bold text-green-600">
                  R$ {payments.filter((p: Payment) => p.status === 'paid').reduce((acc: number, p: Payment) => acc + p.amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 sm:p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">⏳</span>
                  <span className="font-medium text-yellow-800 text-sm sm:text-base">Pendentes</span>
                </div>
                <span className="text-base sm:text-lg font-bold text-yellow-600">
                  R$ {payments.filter((p: Payment) => p.status === 'pending').reduce((acc: number, p: Payment) => acc + p.amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 sm:p-4 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">⚠️</span>
                  <span className="font-medium text-red-800 text-sm sm:text-base">Atrasados</span>
                </div>
                <span className="text-base sm:text-lg font-bold text-red-600">
                  R$ {payments.filter((p: Payment) => p.status === 'overdue').reduce((acc: number, p: Payment) => acc + p.amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Report */}
      {reportType === 'attendance' && (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">Por Horário</h3>
            <div className="space-y-2 sm:space-y-3">
              {['06:00-08:00', '08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00'].map((time) => {
                const percentage = Math.floor(Math.random() * 100);
                return (
                  <div key={time} className="flex items-center gap-2 sm:gap-3">
                    <span className="w-20 sm:w-24 text-xs sm:text-sm text-slate-600">{time}</span>
                    <div className="h-3 sm:h-4 flex-1 rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-600"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 w-8">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
