// Session hooks and helpers for presentation layer
import { useEffect, useState } from 'react';
import { CheckSessionUseCase } from '@application/usecases/check-session';
import { sessionRepository } from '@infrastructure/repositories';
import { useSessionStore } from './stores/sessionStore';

export function useSession() {
  const session = useSessionStore((s) => s.session);
  const setSession = useSessionStore((s) => s.setSession);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const useCase = new CheckSessionUseCase(sessionRepository);
        const result = await useCase.execute();
        setSession(result);
      } catch {
        setSession(null);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, [setSession]);

  return { session, loading };
}
