import { useApp } from '../context/AppContext';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import MembersPage from '../pages/MembersPage';
import FinancialPage from '../pages/FinancialPage';
import WorkoutsPage from '../pages/WorkoutsPage';
import ClassesPage from '../pages/ClassesPage';
import ReportsPage from '../pages/ReportsPage';
import AlertsPage from '../pages/AlertsPage';
import SettingsPage from '../pages/SettingsPage';

export default function MainApp() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <MembersPage />;
      case 'financial':
        return <FinancialPage />;
      case 'workouts':
        return <WorkoutsPage />;
      case 'classes':
        return <ClassesPage />;
      case 'reports':
        return <ReportsPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="lg:ml-64 transition-all duration-300">
        <Header />
        <main className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)]">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
