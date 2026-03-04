-- Salon Seed Data
-- This file populates the database with sample salon data

-- Insert service categories
insert into public.service_categories (name, description, display_order) values
  ('Hair Services', 'Cuts, styling, and treatments', 1),
  ('Color Services', 'Full color, highlights, and creative color', 2),
  ('Treatment Services', 'Deep conditioning and specialty treatments', 3),
  ('Special Occasion', 'Bridal, events, and special styling', 4);

-- Insert services
insert into public.services (category_id, name, description, duration, price, display_order) values
  -- Hair Services
  ((select id from public.service_categories where name = 'Hair Services'),
   'Women''s Haircut', 'Precision cut with wash and style', 60, 65.00, 1),
  ((select id from public.service_categories where name = 'Hair Services'),
   'Men''s Haircut', 'Classic or modern cuts with styling', 45, 45.00, 2),
  ((select id from public.service_categories where name = 'Hair Services'),
   'Children''s Haircut', 'Fun, comfortable cuts for kids 12 and under', 30, 35.00, 3),
  ((select id from public.service_categories where name = 'Hair Services'),
   'Blowout & Style', 'Professional wash, blow dry, and styling', 45, 50.00, 4),
  ((select id from public.service_categories where name = 'Hair Services'),
   'Beard Trim & Shave', 'Professional beard grooming and shave', 30, 35.00, 5),

  -- Color Services
  ((select id from public.service_categories where name = 'Color Services'),
   'Full Color', 'All-over color with toner', 150, 150.00, 1),
  ((select id from public.service_categories where name = 'Color Services'),
   'Partial Highlights', 'Dimensional highlights around face', 120, 135.00, 2),
  ((select id from public.service_categories where name = 'Color Services'),
   'Full Highlights', 'Complete highlight application', 180, 180.00, 3),
  ((select id from public.service_categories where name = 'Color Services'),
   'Balayage', 'Hand-painted highlights for natural dimension', 210, 200.00, 4),
  ((select id from public.service_categories where name = 'Color Services'),
   'Color Correction', 'Fixing previous color work', 240, 300.00, 5),
  ((select id from public.service_categories where name = 'Color Services'),
   'Root Touch-Up', 'Color refresh for new growth', 90, 95.00, 6),

  -- Treatment Services
  ((select id from public.service_categories where name = 'Treatment Services'),
   'Deep Conditioning', 'Intensive moisture and repair treatment', 30, 40.00, 1),
  ((select id from public.service_categories where name = 'Treatment Services'),
   'Keratin Treatment', 'Smoothing and frizz reduction', 180, 250.00, 2),
  ((select id from public.service_categories where name = 'Treatment Services'),
   'Scalp Treatment', 'Detoxifying scalp massage and treatment', 45, 55.00, 3),
  ((select id from public.service_categories where name = 'Treatment Services'),
   'Olaplex Treatment', 'Bond-building treatment for damaged hair', 30, 45.00, 4),

  -- Special Occasion
  ((select id from public.service_categories where name = 'Special Occasion'),
   'Updo Styling', 'Elegant updos for weddings and events', 90, 120.00, 1),
  ((select id from public.service_categories where name = 'Special Occasion'),
   'Bridal Package', 'Trial run plus wedding day styling', 240, 350.00, 2),
  ((select id from public.service_categories where name = 'Special Occasion'),
   'Makeup Application', 'Professional makeup for any occasion', 60, 85.00, 3),
  ((select id from public.service_categories where name = 'Special Occasion'),
   'Bridal Party Package', 'Styling for bride and bridal party', 480, 600.00, 4);

-- Insert staff members
insert into public.staff_members (name, title, bio, specialties, display_order) values
  ('Sarah Martinez', 'Master Stylist & Owner',
   'With over 15 years of experience, Sarah specializes in cutting-edge color techniques and precision cuts. She trained in New York and Paris before opening our salon.',
   array['Color Specialist', 'Balayage Expert', 'Bridal Styling'], 1),

  ('Michael Chen', 'Senior Stylist',
   'Michael brings a modern edge to classic styles. His attention to detail and ability to understand each client''s unique needs make him a client favorite.',
   array['Men''s Cuts', 'Precision Styling', 'Texture Expert'], 2),

  ('Jessica Thompson', 'Color Specialist',
   'Jessica is passionate about creating beautiful, dimensional color. She stays current with the latest techniques and loves bringing clients'' color dreams to life.',
   array['Color Correction', 'Highlights', 'Creative Color'], 3),

  ('David Rodriguez', 'Senior Stylist',
   'David''s calm demeanor and expert technique make every appointment relaxing and transformative. He excels at both classic and contemporary styles.',
   array['Classic Cuts', 'Blowouts', 'Extensions'], 4),

  ('Emma Wilson', 'Stylist',
   'Emma brings fresh energy and creativity to the team. She loves working with clients to find styles that fit their lifestyle and personality.',
   array['Curly Hair', 'Updos', 'Keratin Treatments'], 5),

  ('Alex Kim', 'Stylist',
   'Alex combines technical expertise with artistic vision. Their consultations ensure you leave with exactly the look you envisioned.',
   array['Fashion Cuts', 'Color', 'Styling'], 6);

-- Insert staff availability (Monday-Saturday, 9 AM - 6 PM)
do $$
declare
  staff_record record;
  day integer;
begin
  for staff_record in select id from public.staff_members loop
    -- Monday through Friday (1-5)
    for day in 1..5 loop
      insert into public.staff_availability (staff_id, day_of_week, start_time, end_time, is_available)
      values (staff_record.id, day, '09:00', '18:00', true);
    end loop;

    -- Saturday (6)
    insert into public.staff_availability (staff_id, day_of_week, start_time, end_time, is_available)
    values (staff_record.id, 6, '09:00', '17:00', true);
  end loop;
end $$;

-- Insert gallery images (placeholders)
insert into public.gallery_images (category, caption, alt_text, display_order) values
  -- Color Transformations
  ('Color Transformations', 'Natural balayage highlights', 'Balayage transformation', 1),
  ('Color Transformations', 'Bold red color transformation', 'Vibrant red color', 2),
  ('Color Transformations', 'Platinum blonde perfection', 'Platinum blonde', 3),
  ('Color Transformations', 'Rich dimensional brunette', 'Dimensional brunette', 4),

  -- Cuts & Styles
  ('Cuts & Styles', 'Sleek modern bob', 'Modern bob cut', 1),
  ('Cuts & Styles', 'Textured long layers', 'Layered long hair', 2),
  ('Cuts & Styles', 'Edgy pixie cut', 'Short pixie cut', 3),
  ('Cuts & Styles', 'Classic fade with texture', 'Men''s fade', 4),

  -- Special Occasions
  ('Special Occasions', 'Elegant bridal updo', 'Bridal updo', 1),
  ('Special Occasions', 'Glamorous prom styling', 'Prom hairstyle', 2),
  ('Special Occasions', 'Intricate braided updo', 'Braided style', 3),
  ('Special Occasions', 'Classic Hollywood waves', 'Hollywood waves', 4);
