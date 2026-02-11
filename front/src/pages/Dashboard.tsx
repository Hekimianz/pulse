import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <section className="flex flex-1 items-center justify-center text-red-500">
      DASHBOARD GOES HERE LOLOL
    </section>
  );
}
