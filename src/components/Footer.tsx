'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background text-sm text-zinc-400 border-t border-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 lg:col-span-6">
            <div className="mb-4">
              <Image
                src="https://ik.imagekit.io/cd7ikp5fv/raspa-green-logo.png"
                alt="Raspa Green Logo"
                width={120}
                height={40}
              />
            </div>
            <p className="mb-4">
              © 2025 raspagreen.com. Todos os direitos reservados.
            </p>
            <p className="mb-4">
              Raspadinhas e outros jogos de azar são regulamentados e cobertos
              pela nossa licença de jogos. Jogue com responsabilidade.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 font-bold">
                N
              </div>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="font-bold text-white mb-4">Regulamentos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Jogo responsável
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="font-bold text-white mb-4">Ajuda</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Como Jogar
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1 flex items-end justify-end">
            {/* Placeholder for the chat icon */}
          </div>
        </div>
      </div>
    </footer>
  );
}
