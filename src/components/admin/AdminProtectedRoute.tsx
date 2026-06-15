import { Navigate } from 'react-router-dom';
import { useAdminStore } from '../../store/adminStore';

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, _hasHydrated } = useAdminStore();

  if (!_hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
