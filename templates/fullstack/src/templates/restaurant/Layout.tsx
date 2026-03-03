import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useCart } from '@/modules/menu/hooks/useCart';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onMenuClick={() => setIsMobileMenuOpen(true)}
        cartItemCount={itemCount}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        cartItemCount={itemCount}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
