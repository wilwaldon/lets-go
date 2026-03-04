import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileMenu } from '@/components/layout/MobileMenu';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
