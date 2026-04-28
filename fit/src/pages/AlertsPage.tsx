import { useApp } from '../context/AppContext';
import { members } from '../data/mockData';

export default function AlertsPage() {
  const { alerts, markAlertAsRead, unreadAlertsCount } = useApp();

  const getAlertIcon = (type: string) => {
    const icons = {
      churn_risk: '⚠️',
      payment_overdue: '💰',
      birthday: '🎂',
      inactive: '😴',
      plan_expiring: '📅',
    };
    return icons[type as keyof typeof icons] || '🔔';
  };

  const getAlertColor = (priority: string) => {
    const colors = {
      high: 'border-red-200 bg-red-50',
      medium: 'border-orange-200 bg-orange-50',
      low: 'border-green-200 bg-green-50',
    };
    return colors[priority as keyof typeof colors] || 'border-slate-200 bg-slate-50';
  };

  const handleAction = (alertItem: typeof alerts[0]) => {
    const member = members.find(m => m.id === alertItem.memberId);
    if (member) {
      window.alert('Ação: Entrar em contato com ' + member.name + ' - ' + member.phone);
    }
    markAlertAsRead(alertItem.id);
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Alertas</h1>
          <p className="text-sm sm:text-base text-slate-500">Notificações do sistema</p>
        </div>
        {unreadAlertsCount > 0 && (
          <span className="rounded-full bg-red-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-800">
            {unreadAlertsCount} não lidos
          </span>
        )}
      </div>

      {/* Alert Categories */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 sm:p-4">
          <div className="flex sm:items-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-2xl">⚠️</span>
            <div>
              <p className="font-medium text-red-800 text-xs sm:text-sm">Alta</p>
              <p className="text-lg sm:text-2xl font-bold text-red-600">
                {alerts.filter(a => a.priority === 'high' && !a.isRead).length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-3 sm:p-4">
          <div className="flex sm:items-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-2xl">🔔</span>
            <div>
              <p className="font-medium text-orange-800 text-xs sm:text-sm">Média</p>
              <p className="text-lg sm:text-2xl font-bold text-orange-600">
                {alerts.filter(a => a.priority === 'medium' && !a.isRead).length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4">
          <div className="flex sm:items-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-2xl">ℹ️</span>
            <div>
              <p className="font-medium text-green-800 text-xs sm:text-sm">Baixa</p>
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                {alerts.filter(a => a.priority === 'low' && !a.isRead).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3 sm:space-y-4">
        {alerts.length > 0 ? (
          alerts
            .sort((a, b) => {
              const priorityOrder = { high: 0, medium: 1, low: 2 };
              const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
              if (priorityDiff !== 0) return priorityDiff;
              return a.isRead ? 1 : -1;
            })
            .map((alert) => {
              const member = members.find(m => m.id === alert.memberId);
              return (
                <div
                  key={alert.id}
                  className={`rounded-xl border p-3 sm:p-4 transition-opacity ${
                    alert.isRead ? 'opacity-60' : ''
                  } ${getAlertColor(alert.priority)}`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl sm:text-2xl shadow-sm">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <div>
                          <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{alert.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-600">{alert.description}</p>
                        </div>
                        <span className="text-[10px] sm:text-xs text-slate-500 shrink-0">
                          {new Date(alert.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      {member && (
                        <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-500">
                          <span className="font-medium text-slate-700">{member.name}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{member.phone}</span>
                        </div>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {!alert.isRead && (
                          <button
                            onClick={() => markAlertAsRead(alert.id)}
                            className="rounded-lg bg-white px-3 py-1.5 text-[10px] sm:text-xs font-medium text-slate-600 hover:bg-slate-50 border border-slate-200"
                          >
                            Marcar como lido
                          </button>
                        )}
                        <button
                          onClick={() => handleAction(alert)}
                          className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1.5 text-[10px] sm:text-xs font-medium text-white hover:shadow-md"
                        >
                          Tomar Ação
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-5xl sm:text-6xl">🎉</span>
            <p className="mt-4 text-sm sm:text-lg text-slate-500">Nenhum alerta no momento</p>
          </div>
        )}
      </div>
    </div>
  );
}
