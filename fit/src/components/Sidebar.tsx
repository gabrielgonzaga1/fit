import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'members', label: 'Alunos', icon: '👥' },
  { id: 'financial', label: 'Financeiro', icon: '💰' },
  { id: 'workouts', label: 'Treinos', icon: '🏋️' },
  { id: 'classes', label: 'Aulas', icon: '📅' },
  { id: 'reports', label: 'Relatórios', icon: '📈' },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, currentPage, setCurrentPage, user, unreadAlertsCount } = useApp();
  const { logout } = useAuth();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-white
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-xl font-bold">
                F
              </div>
              <div>
                <h1 className="text-lg font-bold">FitGestor</h1>
                <p className="text-xs text-slate-400">Gestão Inteligente</p>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Academia atual */}
          {user?.academy && (
            <div className="border-b border-slate-700 p-4">
              <p className="text-xs text-slate-400">Academia</p>
              <p className="text-sm font-medium truncate">{user.academy.name}</p>
            </div>
          )}

          {/* Menu */}
          <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Alertas */}
          <div className="border-t border-slate-700 p-3">
            <button
              onClick={() => handleNavigate('alerts')}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                currentPage === 'alerts'
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-3">
                <span>🔔</span>
                Alertas
              </span>
              {unreadAlertsCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                  {unreadAlertsCount}
                </span>
              )}
            </button>
          </div>

          {/* Configurações */}
          <div className="border-t border-slate-700 p-3">
            <button
              onClick={() => handleNavigate('settings')}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                currentPage === 'settings'
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>⚙️</span>
              Configurações
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-slate-700 p-3">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            >
              <span>🚪</span>
              Sair
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
