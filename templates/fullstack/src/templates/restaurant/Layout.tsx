import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useCart } from '@/modules/menu/hooks/useCart';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCartClick = () => {
    // If not on menu page, navigate to it
    // If on menu page, the page itself will handle cart opening
    if (location.pathname !== '/menu') {
      navigate('/menu');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onMenuClick={() => setIsMobileMenuOpen(true)}
        cartItemCount={itemCount}
        onCartClick={handleCartClick}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        cartItemCount={itemCount}
        onCartClick={handleCartClick}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
