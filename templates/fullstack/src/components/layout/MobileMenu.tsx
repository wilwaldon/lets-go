import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  cartItemCount?: number;
  onCartClick?: () => void;
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export function MobileMenu({ isOpen, onClose, cartItemCount = 0, onCartClick }: MobileMenuProps) {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div
        className="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 shadow-xl animate-slide-in"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  block px-6 py-3 text-base font-medium transition-colors
                  ${
                    location.pathname === link.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-700 hover:bg-secondary-50'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}

            {/* Cart Link (Mobile) */}
            {onCartClick && (
              <button
                onClick={() => {
                  onCartClick();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-6 py-3 text-base font-medium text-secondary-700 hover:bg-secondary-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart size={20} />
                  Cart
                </span>
                {cartItemCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}
          </nav>

          {/* CTA Button */}
          <div className="p-4 border-t border-secondary-200">
            <Button asChild className="w-full">
              <Link to="/menu">Order Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
