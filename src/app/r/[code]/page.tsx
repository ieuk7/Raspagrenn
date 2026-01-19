'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ReferralCapturePage() {
  const params = useParams();
  const router = useRouter();
  const code = typeof params.code === 'string' ? params.code : null;

  useEffect(() => {
    if (code) {
      // Store the referral code in session storage to persist it across navigation
      // until the user signs up.
      sessionStorage.setItem('referralCode', code);
    }
    // Redirect to the home page, where the user can then sign up.
    router.replace('/');
  }, [code, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
      <p>Redirecionando...</p>
    </div>
  );
}
