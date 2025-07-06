import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const userId = localStorage.getItem('userId');
  
  if (!userId) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
} 