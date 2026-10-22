import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SimulatorProvider } from '@/context/SimulatorContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ResetModal } from '@/components/ui/ResetModal';
import { NotificationToast } from '@/components/ui/NotificationToast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bahia Capital | Simulador Educacional de Investimentos (B3 & Cripto)',
  description: 'Aprenda a investir na prática sem arriscar seu dinheiro. Treine com R$ 10.000 fictícios, cotações em tempo real da B3 e Criptomoedas, e mentoria didática.',
  keywords: ['simulador de investimentos', 'B3', 'ações', 'criptomoedas', 'Bahia Capital', 'educação financeira'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`dark ${inter.variable} ${plusJakarta.variable}`}>
      <body className="bg-fintech-dark text-slate-100 flex flex-col min-h-screen antialiased selection:bg-blue-600 selection:text-white">
        <SimulatorProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <ResetModal />
          <NotificationToast />
        </SimulatorProvider>
      </body>
    </html>
  );
}
