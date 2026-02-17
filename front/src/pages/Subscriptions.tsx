import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export default function Subscriptions() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <section className="flex flex-col flex-1 items-center py-5 pb-15 ">
      SUBSCRIPTIONS
    </section>
  );
}
