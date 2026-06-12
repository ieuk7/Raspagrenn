'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a home e abre o popup de login
    router.replace('/?auth=login');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Redirecionando para o login...</p>
    </div>
  );
}
