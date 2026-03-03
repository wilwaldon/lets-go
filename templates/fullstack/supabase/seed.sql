-- Seed data for Let's Go! Restaurant Template
-- This file provides sample menu data for testing and demonstration

-- Clear existing data (development only)
TRUNCATE menu_items, menu_categories CASCADE;

-- Insert menu categories
INSERT INTO menu_categories (id, name, description, display_order) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Appetizers', 'Start your meal with our delicious starters', 0),
  ('22222222-2222-2222-2222-222222222222', 'Entrees', 'Our signature main courses', 1),
  ('33333333-3333-3333-3333-333333333333', 'Salads', 'Fresh, locally-sourced greens', 2),
  ('44444444-4444-4444-4444-444444444444', 'Desserts', 'Sweet endings to your meal', 3),
  ('55555555-5555-5555-5555-555555555555', 'Beverages', 'Drinks to complement your meal', 4);

-- Insert appetizers
INSERT INTO menu_items (category_id, name, description, price, dietary_tags, display_order) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Classic Bruschetta', 'Toasted artisan bread topped with fresh tomatoes, basil, and garlic', 8.99, ARRAY['vegetarian'], 0),
  ('11111111-1111-1111-1111-111111111111', 'Crispy Calamari', 'Lightly breaded calamari served with marinara sauce', 12.99, ARRAY[]::text[], 1),
  ('11111111-1111-1111-1111-111111111111', 'Spinach & Artichoke Dip', 'Creamy blend served with tortilla chips', 10.99, ARRAY['vegetarian'], 2),
  ('11111111-1111-1111-1111-111111111111', 'Buffalo Wings', 'Crispy wings tossed in our signature buffalo sauce', 11.99, ARRAY['gluten-free'], 3);

-- Insert entrees
INSERT INTO menu_items (category_id, name, description, price, dietary_tags, display_order) VALUES
  ('22222222-2222-2222-2222-222222222222', 'Signature Burger', 'Grass-fed beef with lettuce, tomato, onion, and house-made sauce', 16.99, ARRAY[]::text[], 0),
  ('22222222-2222-2222-2222-222222222222', 'Grilled Salmon', 'Wild-caught salmon with seasonal vegetables and lemon butter', 24.99, ARRAY['gluten-free'], 1),
  ('22222222-2222-2222-2222-222222222222', 'Margherita Pizza', 'Wood-fired pizza with fresh mozzarella, basil, and San Marzano tomatoes', 18.99, ARRAY['vegetarian'], 2),
  ('22222222-2222-2222-2222-222222222222', 'Chicken Parmesan', 'Breaded chicken breast topped with marinara and melted mozzarella', 19.99, ARRAY[]::text[], 3),
  ('22222222-2222-2222-2222-222222222222', 'Vegetable Stir Fry', 'Seasonal vegetables in ginger soy sauce over jasmine rice', 15.99, ARRAY['vegan', 'gluten-free'], 4),
  ('22222222-2222-2222-2222-222222222222', 'Ribeye Steak', '12oz ribeye with roasted potatoes and asparagus', 32.99, ARRAY['gluten-free'], 5);

-- Insert salads
INSERT INTO menu_items (category_id, name, description, price, dietary_tags, display_order) VALUES
  ('33333333-3333-3333-3333-333333333333', 'Caesar Salad', 'Romaine lettuce with house-made Caesar dressing and croutons', 12.99, ARRAY['vegetarian'], 0),
  ('33333333-3333-3333-3333-333333333333', 'Garden Salad', 'Mixed greens with seasonal vegetables and choice of dressing', 10.99, ARRAY['vegan', 'gluten-free'], 1),
  ('33333333-3333-3333-3333-333333333333', 'Greek Salad', 'Tomatoes, cucumbers, olives, feta cheese, and red onion', 13.99, ARRAY['vegetarian', 'gluten-free'], 2),
  ('33333333-3333-3333-3333-333333333333', 'Cobb Salad', 'Grilled chicken, bacon, avocado, egg, and blue cheese', 16.99, ARRAY['gluten-free'], 3);

-- Insert desserts
INSERT INTO menu_items (category_id, name, description, price, dietary_tags, display_order) VALUES
  ('44444444-4444-4444-4444-444444444444', 'Chocolate Lava Cake', 'Warm chocolate cake with molten center, served with vanilla ice cream', 8.99, ARRAY['vegetarian'], 0),
  ('44444444-4444-4444-4444-444444444444', 'New York Cheesecake', 'Classic cheesecake with graham cracker crust and berry compote', 7.99, ARRAY['vegetarian'], 1),
  ('44444444-4444-4444-4444-444444444444', 'Tiramisu', 'Traditional Italian dessert with espresso-soaked ladyfingers', 8.99, ARRAY['vegetarian'], 2),
  ('44444444-4444-4444-4444-444444444444', 'Fresh Fruit Sorbet', 'Dairy-free sorbet made with seasonal fruit', 6.99, ARRAY['vegan', 'gluten-free', 'dairy-free'], 3);

-- Insert beverages
INSERT INTO menu_items (category_id, name, description, price, dietary_tags, display_order) VALUES
  ('55555555-5555-5555-5555-555555555555', 'Freshly Brewed Coffee', 'Regular or decaf, bottomless', 3.99, ARRAY['vegan', 'gluten-free'], 0),
  ('55555555-5555-5555-5555-555555555555', 'Iced Tea', 'Sweetened or unsweetened, bottomless', 3.49, ARRAY['vegan', 'gluten-free'], 1),
  ('55555555-5555-5555-5555-555555555555', 'Fresh Lemonade', 'House-made with organic lemons', 4.99, ARRAY['vegan', 'gluten-free'], 2),
  ('55555555-5555-5555-5555-555555555555', 'Craft Beer Selection', 'Ask your server for our rotating selection', 6.99, ARRAY[]::text[], 3),
  ('55555555-5555-5555-5555-555555555555', 'House Wine', 'Red or white by the glass', 8.99, ARRAY[]::text[], 4);

-- Verify seed data
SELECT
  c.name as category,
  COUNT(i.id) as item_count
FROM menu_categories c
LEFT JOIN menu_items i ON i.category_id = c.id
GROUP BY c.name, c.display_order
ORDER BY c.display_order;
