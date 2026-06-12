'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistroPage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a home e abre o popup de registro
    router.replace('/?auth=register');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Redirecionando para o registro...</p>
    </div>
  );
}
