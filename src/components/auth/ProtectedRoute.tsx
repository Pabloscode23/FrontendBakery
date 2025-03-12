import { Navigate } from 'react-router-dom';
import { useCheckAuth } from '../../hooks/useCheckAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, isChecking } = useCheckAuth();

    if (isChecking) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-brown-middle)]"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/pages/login" />;
    }

    return <>{children}</>;
};
