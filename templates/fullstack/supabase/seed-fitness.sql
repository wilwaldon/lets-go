-- Fitness Seed Data
-- This file populates the database with sample fitness/gym data

-- Insert class categories
insert into public.class_categories (name, description, display_order) values
  ('Strength & Conditioning', 'Build muscle and increase power', 1),
  ('Cardio & HIIT', 'High-intensity cardio workouts', 2),
  ('Mind & Body', 'Yoga, Pilates, and mindful movement', 3),
  ('Specialty Classes', 'Specialized training and techniques', 4);

-- Insert class types
insert into public.class_types (category_id, name, description, duration, difficulty, max_capacity, display_order) values
  -- Strength & Conditioning
  ((select id from public.class_categories where name = 'Strength & Conditioning'),
   'Strength Training', 'Build muscle and increase power with guided weightlifting and resistance training', 50, 'all_levels', 15, 1),
  ((select id from public.class_categories where name = 'Strength & Conditioning'),
   'CrossFit', 'High-intensity functional movements combining cardio, weightlifting, and gymnastics', 60, 'intermediate', 12, 2),
  ((select id from public.class_categories where name = 'Strength & Conditioning'),
   'Bootcamp', 'Military-inspired circuit training for total body conditioning', 45, 'intermediate', 20, 3),

  -- Cardio & HIIT
  ((select id from public.class_categories where name = 'Cardio & HIIT'),
   'HIIT', 'High-intensity interval training for maximum calorie burn and cardiovascular fitness', 45, 'intermediate', 18, 1),
  ((select id from public.class_categories where name = 'Cardio & HIIT'),
   'Spin Class', 'Indoor cycling with varied intensity and terrain simulation', 50, 'all_levels', 16, 2),
  ((select id from public.class_categories where name = 'Cardio & HIIT'),
   'Cardio Kickboxing', 'Boxing and martial arts-inspired cardio workout', 45, 'all_levels', 20, 3),

  -- Mind & Body
  ((select id from public.class_categories where name = 'Mind & Body'),
   'Yoga Flow', 'Dynamic yoga sequences to build strength, flexibility, and mindfulness', 60, 'all_levels', 25, 1),
  ((select id from public.class_categories where name = 'Mind & Body'),
   'Pilates', 'Core-focused exercises to improve posture, flexibility, and body awareness', 55, 'all_levels', 20, 2),
  ((select id from public.class_categories where name = 'Mind & Body'),
   'Barre', 'Ballet-inspired workout combining Pilates, yoga, and strength training', 55, 'beginner', 18, 3),
  ((select id from public.class_categories where name = 'Mind & Body'),
   'Meditation & Stretching', 'Guided meditation and deep stretching for recovery and stress relief', 45, 'beginner', 30, 4),

  -- Specialty Classes
  ((select id from public.class_categories where name = 'Specialty Classes'),
   'Olympic Weightlifting', 'Learn proper technique for snatch, clean & jerk, and accessory lifts', 60, 'advanced', 10, 1),
  ((select id from public.class_categories where name = 'Specialty Classes'),
   'Mobility & Recovery', 'Foam rolling, dynamic stretching, and mobility work for injury prevention', 45, 'all_levels', 25, 2),
  ((select id from public.class_categories where name = 'Specialty Classes'),
   'Senior Fitness', 'Low-impact exercises designed for older adults to maintain strength and balance', 45, 'beginner', 15, 3);

-- Insert instructors
insert into public.instructors (name, title, bio, specialties, certifications, display_order) values
  ('Sarah Johnson', 'Head Trainer & Owner',
   'Former competitive athlete with 12 years of coaching experience. Sarah specializes in strength and conditioning and has helped hundreds of clients reach their goals.',
   array['Strength Training', 'CrossFit', 'Olympic Lifting'],
   array['NSCA-CPT', 'CrossFit Level 2', 'USA Weightlifting'], 1),

  ('Michael Chen', 'Yoga & Mindfulness Instructor',
   'Certified yoga teacher with a background in physical therapy. Michael brings a holistic approach to fitness, emphasizing mobility, flexibility, and mental wellness.',
   array['Yoga', 'Pilates', 'Mobility Work'],
   array['RYT-500', 'DPT', 'PMA-CPT'], 2),

  ('Lisa Rodriguez', 'HIIT & Cardio Specialist',
   'High-energy coach who loves pushing clients to discover what they''re capable of. Lisa designs challenging workouts that deliver maximum results in minimum time.',
   array['HIIT', 'Bootcamp', 'Cardio Kickboxing'],
   array['ACE-CPT', 'TRX Certified', 'Kickboxing Instructor'], 3),

  ('David Martinez', 'Strength & Conditioning Coach',
   'Former college football strength coach with expertise in athletic performance. David works with clients of all levels to build functional strength and power.',
   array['Strength & Conditioning', 'Sports Performance', 'Olympic Lifting'],
   array['CSCS', 'USAW Level 1', 'FMS Level 2'], 4),

  ('Emily Thompson', 'Group Fitness Instructor',
   'Passionate about creating inclusive, fun classes that make fitness accessible to everyone. Emily teaches a variety of formats with a focus on proper form and enjoyment.',
   array['Barre', 'Pilates', 'Dance Fitness'],
   array['AFAA GFI', 'Balanced Body Pilates', 'Barre Above'], 5),

  ('Alex Kim', 'Personal Training Specialist',
   'Results-driven trainer who creates personalized programs based on each client''s unique goals, limitations, and preferences. Alex emphasizes sustainable, long-term progress.',
   array['Weight Loss', 'Muscle Building', 'Nutrition Coaching'],
   array['NASM-CPT', 'PN-1', 'Corrective Exercise Specialist'], 6);

-- Insert class sessions (weekly schedule)
-- Helper function to get instructor ID by name
do $$
declare
  sarah_id uuid;
  michael_id uuid;
  lisa_id uuid;
  david_id uuid;
  emily_id uuid;
  alex_id uuid;
  hiit_id uuid;
  yoga_id uuid;
  strength_id uuid;
  spin_id uuid;
  crossfit_id uuid;
  bootcamp_id uuid;
  pilates_id uuid;
  senior_id uuid;
  kickboxing_id uuid;
  olympic_id uuid;
  mobility_id uuid;
  barre_id uuid;
  meditation_id uuid;
begin
  -- Get instructor IDs
  sarah_id := (select id from public.instructors where name = 'Sarah Johnson');
  michael_id := (select id from public.instructors where name = 'Michael Chen');
  lisa_id := (select id from public.instructors where name = 'Lisa Rodriguez');
  david_id := (select id from public.instructors where name = 'David Martinez');
  emily_id := (select id from public.instructors where name = 'Emily Thompson');
  alex_id := (select id from public.instructors where name = 'Alex Kim');

  -- Get class type IDs
  hiit_id := (select id from public.class_types where name = 'HIIT');
  yoga_id := (select id from public.class_types where name = 'Yoga Flow');
  strength_id := (select id from public.class_types where name = 'Strength Training');
  spin_id := (select id from public.class_types where name = 'Spin Class');
  crossfit_id := (select id from public.class_types where name = 'CrossFit');
  bootcamp_id := (select id from public.class_types where name = 'Bootcamp');
  pilates_id := (select id from public.class_types where name = 'Pilates');
  senior_id := (select id from public.class_types where name = 'Senior Fitness');
  kickboxing_id := (select id from public.class_types where name = 'Cardio Kickboxing');
  olympic_id := (select id from public.class_types where name = 'Olympic Weightlifting');
  mobility_id := (select id from public.class_types where name = 'Mobility & Recovery');
  barre_id := (select id from public.class_types where name = 'Barre');
  meditation_id := (select id from public.class_types where name = 'Meditation & Stretching');

  -- Monday (1)
  insert into public.class_sessions (class_type_id, instructor_id, day_of_week, start_time, end_time, max_capacity) values
    (hiit_id, sarah_id, 1, '06:00', '06:45', 18),
    (yoga_id, michael_id, 1, '07:00', '08:00', 25),
    (strength_id, lisa_id, 1, '09:00', '09:50', 15),
    (spin_id, david_id, 1, '12:00', '12:50', 16),
    (crossfit_id, sarah_id, 1, '17:30', '18:30', 12),
    (yoga_id, emily_id, 1, '18:45', '19:45', 25);

  -- Tuesday (2)
  insert into public.class_sessions (class_type_id, instructor_id, day_of_week, start_time, end_time, max_capacity) values
    (bootcamp_id, david_id, 2, '06:00', '06:45', 20),
    (pilates_id, emily_id, 2, '07:00', '07:55', 20),
    (senior_id, michael_id, 2, '09:00', '09:45', 15),
    (kickboxing_id, lisa_id, 2, '12:00', '12:45', 20),
    (strength_id, sarah_id, 2, '17:30', '18:20', 15),
    (barre_id, emily_id, 2, '18:45', '19:40', 18);

  -- Wednesday (3)
  insert into public.class_sessions (class_type_id, instructor_id, day_of_week, start_time, end_time, max_capacity) values
    (hiit_id, sarah_id, 3, '06:00', '06:45', 18),
    (yoga_id, michael_id, 3, '07:00', '08:00', 25),
    (mobility_id, emily_id, 3, '09:00', '09:45', 25),
    (spin_id, david_id, 3, '12:00', '12:50', 16),
    (crossfit_id, lisa_id, 3, '17:30', '18:30', 12),
    (yoga_id, michael_id, 3, '18:45', '19:45', 25);

  -- Thursday (4)
  insert into public.class_sessions (class_type_id, instructor_id, day_of_week, start_time, end_time, max_capacity) values
    (bootcamp_id, david_id, 4, '06:00', '06:45', 20),
    (pilates_id, emily_id, 4, '07:00', '07:55', 20),
    (strength_id, sarah_id, 4, '09:00', '09:50', 15),
    (kickboxing_id, lisa_id, 4, '12:00', '12:45', 20),
    (olympic_id, david_id, 4, '17:30', '18:30', 10),
    (meditation_id, michael_id, 4, '18:45', '19:30', 30);

  -- Friday (5)
  insert into public.class_sessions (class_type_id, instructor_id, day_of_week, start_time, end_time, max_capacity) values
    (hiit_id, sarah_id, 5, '06:00', '06:45', 18),
    (yoga_id, emily_id, 5, '07:00', '08:00', 25),
    (strength_id, lisa_id, 5, '09:00', '09:50', 15),
    (spin_id, david_id, 5, '12:00', '12:50', 16),
    (bootcamp_id, sarah_id, 5, '17:30', '18:15', 20),
    (barre_id, emily_id, 5, '18:45', '19:40', 18);

  -- Saturday (6)
  insert into public.class_sessions (class_type_id, instructor_id, day_of_week, start_time, end_time, max_capacity) values
    (crossfit_id, david_id, 6, '08:00', '09:00', 12),
    (yoga_id, michael_id, 6, '09:30', '10:30', 25),
    (hiit_id, lisa_id, 6, '11:00', '11:45', 18),
    (strength_id, sarah_id, 6, '12:30', '13:20', 15);

  -- Sunday (0)
  insert into public.class_sessions (class_type_id, instructor_id, day_of_week, start_time, end_time, max_capacity) values
    (yoga_id, emily_id, 0, '08:00', '09:00', 25),
    (pilates_id, michael_id, 0, '09:30', '10:25', 20),
    (mobility_id, sarah_id, 0, '11:00', '11:45', 25);
end $$;

-- Insert membership plans
insert into public.membership_plans (name, description, price, interval, features, is_popular, display_order) values
  ('Basic', 'Perfect for getting started with your fitness journey', 49.00, 'month',
   array[
     'Access to gym floor and equipment',
     'Open gym hours (5am - 11pm)',
     'Locker room and showers',
     'Free fitness assessment',
     'Mobile app access'
   ], false, 1),

  ('Unlimited', 'Our most popular plan with full access to everything', 89.00, 'month',
   array[
     'Everything in Basic',
     'Unlimited group fitness classes',
     'Access to all specialty classes',
     'Guest privileges (2 per month)',
     'Priority class booking',
     'Nutrition guidance resources'
   ], true, 2),

  ('Premium', 'Maximum value with personal training included', 149.00, 'month',
   array[
     'Everything in Unlimited',
     '4 personal training sessions/month',
     'Customized workout programming',
     'Monthly body composition analysis',
     'Nutrition coaching consultation',
     'Unlimited guest privileges',
     'Discount on retail and supplements'
   ], false, 3);
