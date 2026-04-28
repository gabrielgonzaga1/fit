import { useApp, useStats } from '../context/AppContext';
import { generateAttendanceData, generateRevenueData } from '../data/mockData';

export default function Dashboard() {
  const { user, members, classSchedules } = useApp();
  const stats = useStats();
  const attendanceData = generateAttendanceData();
  const revenueData = generateRevenueData();

  if (!user) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-slate-500">Carregando...</p>
      </div>
    );
  }

  const todayMembers = members.filter((m) => m.status === 'active').slice(0, 5);
  const todayClasses = classSchedules.filter((c) => c.dayOfWeek === new Date().getDay());

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm sm:text-base text-slate-500">Visão geral da sua academia</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <KPICard
          title="Alunos Ativos"
          value={stats.activeMembers.toString()}
          change="+12%"
          changeType="positive"
          icon="👥"
          color="blue"
        />
        <KPICard
          title="Receita Mensal"
          value={`R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`}
          change="+8%"
          changeType="positive"
          icon="💰"
          color="green"
        />
        <KPICard
          title="Taxa de Evasão"
          value={`${stats.churnRate.toFixed(1)}%`}
          change="-2%"
          changeType="positive"
          icon="📉"
          color="orange"
        />
        <KPICard
          title="Pendentes"
          value={`R$ ${stats.pendingPayments.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`}
          change=""
          changeType="neutral"
          icon="⏳"
          color="red"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Frequência Mensal */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">Frequência Mensal</h3>
          <div className="h-40 sm:h-48">
            <BarChart data={attendanceData.map((d) => ({ label: d.month, value: d.visits }))} />
          </div>
        </div>

        {/* Receita vs Despesas */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">Receita vs Despesas</h3>
          <div className="h-40 sm:h-48">
            <BarChart
              data={revenueData.map((d) => ({ label: d.month, value: d.revenue }))}
              secondaryData={revenueData.map((d) => ({ label: d.month, value: d.expenses }))}
            />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Últimos Alunos */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">Alunos Ativos</h3>
          <div className="space-y-3">
            {todayMembers.slice(0, 4).map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-xs sm:text-sm font-bold text-white">
                    {member.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 text-sm sm:text-base truncate">{member.name}</p>
                    <p className="text-xs sm:text-sm text-slate-500">{member.visitsCount} visitas</p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-green-600 shrink-0">Ativo</span>
              </div>
            ))}
          </div>
        </div>

        {/* Aulas de Hoje */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">Aulas de Hoje</h3>
          <div className="space-y-3">
            {todayClasses.length > 0 ? (
              todayClasses.slice(0, 4).map((cls) => (
                <div key={cls.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-2 sm:p-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-800 text-sm sm:text-base truncate">{cls.name}</p>
                    <p className="text-xs sm:text-sm text-slate-500 truncate">{cls.instructor} • {cls.room}</p>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="font-medium text-slate-800 text-sm">{cls.startTime}</p>
                    <p className="text-xs sm:text-sm text-slate-500">{cls.currentCapacity}/{cls.maxCapacity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">Nenhuma aula programada para hoje</p>
            )}
          </div>
        </div>

        {/* Alertas Rápidos */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="mb-4 text-base sm:text-lg font-semibold text-slate-800">Alertas Rápidos</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 sm:gap-3 rounded-lg bg-red-50 p-2 sm:p-3">
              <span className="text-xl sm:text-2xl">⚠️</span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-red-800 text-sm sm:text-base">Inadimplência</p>
                <p className="text-xs sm:text-sm text-red-600">{members.filter(m => m.status === 'inactive').length} alunos inadimplentes</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 rounded-lg bg-orange-50 p-2 sm:p-3">
              <span className="text-xl sm:text-2xl">🔔</span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-orange-800 text-sm sm:text-base">Risco de Evasão</p>
                <p className="text-xs sm:text-sm text-orange-600">3 alunos sem visitar há 30+ dias</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 rounded-lg bg-green-50 p-2 sm:p-3">
              <span className="text-xl sm:text-2xl">🎂</span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-green-800 text-sm sm:text-base">Aniversariantes</p>
                <p className="text-xs sm:text-sm text-green-600">2 alunos este mês</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente KPI Card
function KPICard({ title, value, change, changeType, icon, color }: {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'red';
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
  };

  const changeClasses = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-slate-600 bg-slate-50',
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-slate-500">{title}</p>
          <p className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-bold text-slate-800 truncate">{value}</p>
          {change && (
            <span className={`mt-1 sm:mt-2 inline-block rounded-full px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium ${changeClasses[changeType]}`}>
              {change}
            </span>
          )}
        </div>
        <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses[color]} text-xl sm:text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Componente de gráfico de barras simples
function BarChart({ data, secondaryData }: { 
  data: { label: string; value: number }[];
  secondaryData?: { label: string; value: number }[];
}) {
  const maxValue = Math.max(
    ...data.map((d) => d.value),
    ...(secondaryData?.map((d) => d.value) || [])
  );

  return (
    <div className="flex h-full items-end justify-between gap-1 sm:gap-2">
      {data.map((item, index) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-1 sm:gap-2">
          <div className="flex w-full flex-col items-center gap-0.5 sm:gap-1">
            {secondaryData && (
              <div
                className="w-full rounded-t bg-slate-300 transition-all"
                style={{ height: `${(secondaryData[index].value / maxValue) * 100}px` }}
              />
            )}
            <div
              className="w-full rounded-t bg-gradient-to-t from-orange-500 to-orange-400 transition-all"
              style={{ height: `${(item.value / maxValue) * 100}px` }}
            />
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
