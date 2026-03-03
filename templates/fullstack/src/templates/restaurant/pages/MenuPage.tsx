import { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/common/HeroSection';
import { useMenu } from '@/modules/menu/hooks/useMenu';
import { useCart } from '@/modules/menu/hooks/useCart';
import { MenuDisplay } from '@/modules/menu/components/MenuDisplay';
import { DietaryFilter } from '@/modules/menu/components/DietaryFilter';
import { Cart } from '@/modules/menu/components/Cart';
import { useToast } from '@/components/ui/Toast';
import { useNavigate } from 'react-router-dom';
import { getHeroImage } from '@/lib/heroImages';

export function MenuPage() {
  const { categories, isLoading, error } = useMenu();
  const { cart, addItem, updateQuantity, removeItem, subtotal, tax, total, itemCount } =
    useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [dietaryFilter, setDietaryFilter] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (itemId: string) => {
    // Find the item from categories
    let foundItem = null;
    for (const category of categories) {
      const item = category.items?.find((i) => i.id === itemId);
      if (item) {
        foundItem = item;
        break;
      }
    }

    if (foundItem) {
      addItem(foundItem);
      showToast(`${foundItem.name} added to cart`, 'success');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <PageWrapper title="Menu" description="Browse our delicious menu">
      <HeroSection
        headline="Our Menu"
        description="Fresh, local ingredients prepared with care"
        ctaText="Order Now"
        ctaLink="#menu"
        backgroundImage={getHeroImage('menu') || undefined}
        align="center"
      />

      <Section spacing="default" id="menu">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <DietaryFilter
                  selectedFilters={dietaryFilter}
                  onFilterChange={setDietaryFilter}
                />
              </div>
            </aside>

            {/* Menu Display */}
            <div className="lg:col-span-3">
              <MenuDisplay
                categories={categories}
                isLoading={isLoading}
                error={error}
                dietaryFilter={dietaryFilter}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Floating Cart Button (Mobile) */}
      {itemCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 transition-colors z-30"
          aria-label="Open cart"
        >
          <div className="relative">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-white text-primary-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          </div>
        </button>
      )}

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        subtotal={subtotal}
        tax={tax}
        total={total}
        onCheckout={handleCheckout}
      />
    </PageWrapper>
  );
}
