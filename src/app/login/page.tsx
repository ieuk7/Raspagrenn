'use client';
import { useState, useEffect } from 'react';
import './login.css';
import { useAuth, useFirestore } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc, getDocs, query, where, collection, runTransaction, increment } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function LoginPage({ onAuthSuccess, initialView = 'login' }: { onAuthSuccess?: () => void, initialView?: 'login' | 'register' }) {
  const [isLogin, setIsLogin] = useState(initialView === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsLogin(initialView === 'login');
  }, [initialView]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 11);
    const len = value.length;
    let formattedValue = '';

    if (len === 0) {
        formattedValue = '';
    } else if (len <= 2) {
        formattedValue = `(${value}`;
    } else if (len <= 6) { // (XX) XXXX
        formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (len <= 10) { // (XX) XXXX-XXXX
        formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else { // 11 digits: (XX) 9 XXXX-XXXX
        formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;
    }
    setPhone(formattedValue);
  };


  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Login bem-sucedido!' });
        onAuthSuccess?.();
        router.push('/account');

      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          const user = userCredential.user;
          const referralCode = sessionStorage.getItem('referralCode');

          const newUserDocData: any = {
            id: user.uid,
            email: user.email,
            username: user.email?.split('@')[0] || '',
            phone: phone.replace(/\D/g, ''),
            document: '',
            balance: 0,
            win_percentage: 5,
            referralCode: '',
            commission: 50,
            xp: 0,
            level: 1,
            referredBy: '',
            totalCommission: 0,
            referralsCount: 0,
          };

          if (referralCode) {
            await runTransaction(firestore, async (transaction) => {
              const referralCodesRef = collection(firestore, 'referralCodes');
              const q = query(referralCodesRef, where('__name__', '==', referralCode));
              const querySnapshot = await getDocs(q);

              if (!querySnapshot.empty) {
                const referrerDoc = querySnapshot.docs[0];
                const referrerId = referrerDoc.data().userId;

                if (referrerId) {
                  newUserDocData.referredBy = referrerId;
                  const referrerUserRef = doc(firestore, 'users', referrerId);
                  transaction.update(referrerUserRef, {
                    referralsCount: increment(1)
                  });
                }
              } else {
                 console.warn(`Referral code "${referralCode}" not found.`);
              }
               const newUserRef = doc(firestore, 'users', user.uid);
               transaction.set(newUserRef, newUserDocData);
            });
            sessionStorage.removeItem('referralCode');
          } else {
            await setDoc(doc(firestore, 'users', user.uid), newUserDocData);
          }
        }
        toast({ title: 'Conta criada com sucesso!' });
        onAuthSuccess?.();
        router.push('/account');
      }

    } catch (error: any) {
      console.error(error);
      let friendlyMessage = 'Ocorreu um erro. Tente novamente.';
      if (error.code === 'auth/email-already-in-use') {
        friendlyMessage = 'Este e-mail já está em uso. Tente fazer login.';
      } else if (error.code === 'auth/wrong-password') {
        friendlyMessage = 'Senha incorreta. Por favor, tente novamente.';
      } else if (error.code === 'auth/user-not-found') {
        friendlyMessage = 'Nenhuma conta encontrada com este e-mail. Por favor, registre-se.';
      }

      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: friendlyMessage,
      });
    }
  };

  return (
    <div className="login-body">
      <div className="modal-container">
        <div className="logo-area">
          <img
            src="https://ik.imagekit.io/cd7ikp5fv/raspa-green-logo.png"
            alt="Logo Raspa Green"
          />
        </div>

        {isLogin ? (
          <div id="login-screen">
            <h2>Bem vindo de volta!</h2>
            <p className="subtitle">
              Conecte-se para acompanhar seus prêmios,
              <br />
              depósitos e muito mais.
            </p>

            <form onSubmit={handleAuth}>
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="example@site.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Digite sua senha</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="Insira sua senha..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="input-action-right"
                    style={{ color: '#22c55e' }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
                <a href="#" className="forgot-password">
                  Esqueci a senha
                </a>
              </div>

              <button className="btn-submit">ENTRAR</button>
            </form>

            <div className="divider">OU</div>

            <p className="footer-text">
              Ainda não tem uma conta?{' '}
              <span className="footer-link" onClick={() => setIsLogin(false)}>
                Registrar
              </span>
            </p>
          </div>
        ) : (
          <div id="register-screen">
            <h2>Crie sua conta!</h2>
            <p className="subtitle">Comece a concorrer a prêmios hoje!</p>

            <form onSubmit={handleAuth}>
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="exemplo@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <input
                    type="tel"
                    placeholder="(00) 99999-9999"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Escolha uma senha</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="Digite uma senha..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="input-action-right toggle-text"
                  >
                    Mostrar
                  </button>
                </div>
              </div>

              <button className="btn-submit">CRIAR</button>
            </form>

            <div className="divider">OU</div>

            <p className="footer-text">
              Já tem uma conta?{' '}
              <span className="footer-link" onClick={() => setIsLogin(true)}>
                Entrar
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
