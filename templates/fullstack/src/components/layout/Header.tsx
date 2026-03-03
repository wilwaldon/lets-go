import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onMenuClick: () => void;
  cartItemCount?: number;
  onCartClick?: () => void;
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export function Header({ onMenuClick, cartItemCount = 0, onCartClick }: HeaderProps) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40
        transition-all duration-300
        ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-md'
            : 'bg-white'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">
              {siteConfig.business.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-sm font-medium transition-colors
                  ${
                    location.pathname === link.path
                      ? 'text-primary-600'
                      : 'text-secondary-700 hover:text-primary-600'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button (Desktop) */}
            {onCartClick && (
              <button
                onClick={onCartClick}
                className="hidden md:flex relative p-2 text-secondary-700 hover:text-primary-600 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* CTA Button (Desktop) */}
            <div className="hidden md:block">
              <Button asChild size="sm">
                <Link to="/menu">Order Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 text-secondary-700 hover:text-primary-600 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
