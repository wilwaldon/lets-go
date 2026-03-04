-- Professional Services Seed Data
-- This file populates the database with sample professional services data

-- Insert service areas
insert into public.service_areas (name, description, display_order) values
  ('Corporate Law', 'Comprehensive legal support for businesses of all sizes', 1),
  ('Litigation & Dispute Resolution', 'Skilled representation in court and alternative dispute resolution', 2),
  ('Real Estate Law', 'Full-service real estate legal support', 3),
  ('Estate Planning & Probate', 'Protecting your legacy and managing estates', 4);

-- Insert service offerings
insert into public.service_offerings (service_area_id, name, description, features, display_order) values
  -- Corporate Law
  ((select id from public.service_areas where name = 'Corporate Law'),
   'Business Formation', 'Entity selection, incorporation, LLC formation, and partnership agreements',
   array['Entity structure advisory', 'Articles of incorporation', 'Operating agreements', 'Compliance setup'], 1),
  ((select id from public.service_areas where name = 'Corporate Law'),
   'Contracts & Agreements', 'Drafting, review, and negotiation of business contracts',
   array['Contract drafting', 'Terms negotiation', 'Risk assessment', 'Dispute resolution clauses'], 2),
  ((select id from public.service_areas where name = 'Corporate Law'),
   'Mergers & Acquisitions', 'Strategic guidance through M&A transactions',
   array['Due diligence', 'Deal structuring', 'Negotiation support', 'Closing coordination'], 3),

  -- Litigation
  ((select id from public.service_areas where name = 'Litigation & Dispute Resolution'),
   'Civil Litigation', 'Representation in business disputes, contract matters, and civil claims',
   array['Case evaluation', 'Court representation', 'Motion practice', 'Trial advocacy'], 1),
  ((select id from public.service_areas where name = 'Litigation & Dispute Resolution'),
   'Mediation Services', 'Facilitated negotiations to reach mutually acceptable solutions',
   array['Neutral mediation', 'Settlement facilitation', 'Conflict resolution', 'Agreement drafting'], 2),
  ((select id from public.service_areas where name = 'Litigation & Dispute Resolution'),
   'Arbitration', 'Representation in binding and non-binding arbitration proceedings',
   array['Arbitration advocacy', 'Evidence presentation', 'Expert coordination', 'Award enforcement'], 3),

  -- Real Estate
  ((select id from public.service_areas where name = 'Real Estate Law'),
   'Commercial Transactions', 'Purchase, sale, and leasing of commercial properties',
   array['Purchase agreements', 'Due diligence', 'Title review', 'Closing services'], 1),
  ((select id from public.service_areas where name = 'Real Estate Law'),
   'Residential Real Estate', 'Legal support for home buyers and sellers',
   array['Contract review', 'Title insurance', 'Closing representation', 'Dispute resolution'], 2),
  ((select id from public.service_areas where name = 'Real Estate Law'),
   'Development & Zoning', 'Land use, zoning approvals, and development projects',
   array['Zoning applications', 'Land use permits', 'Development agreements', 'Municipal approvals'], 3),

  -- Estate Planning
  ((select id from public.service_areas where name = 'Estate Planning & Probate'),
   'Wills & Trusts', 'Comprehensive estate planning documents',
   array['Will preparation', 'Living trusts', 'Revocable trusts', 'Asset protection'], 1),
  ((select id from public.service_areas where name = 'Estate Planning & Probate'),
   'Probate Administration', 'Guiding executors through the probate process',
   array['Estate administration', 'Court filings', 'Asset distribution', 'Creditor claims'], 2),
  ((select id from public.service_areas where name = 'Estate Planning & Probate'),
   'Elder Law', 'Planning for long-term care and Medicaid eligibility',
   array['Medicaid planning', 'Long-term care', 'Guardianships', 'Powers of attorney'], 3);

-- Insert professionals
insert into public.professionals (name, title, bio, specialties, credentials, email, phone, display_order) values
  ('Michael Anderson', 'Managing Partner',
   'With over 25 years of experience in corporate law, Michael has advised hundreds of businesses through complex transactions and strategic initiatives. He is recognized as a leading expert in M&A and corporate governance.',
   array['Corporate Law', 'M&A', 'Securities'],
   array['J.D., Harvard Law School', 'Licensed in NY, CA', 'AV Rated Martindale-Hubbell'],
   'manderson@firm.com', '(555) 123-4567', 1),

  ('Jennifer Chen', 'Senior Partner',
   'Jennifer brings 20 years of litigation experience, with particular expertise in complex commercial disputes. Her strategic approach and courtroom skills have resulted in favorable outcomes for clients across industries.',
   array['Civil Litigation', 'Commercial Disputes', 'Mediation'],
   array['J.D., Stanford Law School', 'Licensed in CA, OR', 'Certified Mediator'],
   'jchen@firm.com', '(555) 123-4568', 2),

  ('Robert Martinez', 'Partner',
   'Robert focuses on real estate law and has handled transactions totaling over $2 billion. His deep understanding of real estate markets and zoning regulations makes him a trusted advisor for developers and investors.',
   array['Real Estate', 'Land Use', 'Development'],
   array['J.D., UCLA School of Law', 'Licensed in CA', 'Real Estate Broker License'],
   'rmartinez@firm.com', '(555) 123-4569', 3),

  ('Sarah Thompson', 'Partner',
   'Sarah is a compassionate attorney specializing in estate planning and elder law. She helps families navigate complex legacy planning with sensitivity and expertise, ensuring their wishes are honored.',
   array['Estate Planning', 'Probate', 'Elder Law'],
   array['J.D., Georgetown Law', 'Licensed in OR, WA', 'Certified Elder Law Attorney'],
   'sthompson@firm.com', '(555) 123-4570', 4),

  ('David Kim', 'Associate',
   'David joined the firm after clerking for a federal judge. He brings fresh perspectives and meticulous attention to detail to corporate matters and commercial transactions.',
   array['Corporate Law', 'Contracts', 'Compliance'],
   array['J.D., Columbia Law School', 'Licensed in NY', 'Law Review Editor'],
   'dkim@firm.com', '(555) 123-4571', 5),

  ('Emily Rodriguez', 'Associate',
   'Emily focuses on employment law and business litigation. Her proactive approach helps clients avoid disputes while providing vigorous representation when conflicts arise.',
   array['Employment Law', 'Business Litigation', 'Contract Disputes'],
   array['J.D., NYU School of Law', 'Licensed in CA', 'CELA Certification'],
   'erodriguez@firm.com', '(555) 123-4572', 6);

-- Insert professional availability (Monday-Friday, 9 AM - 5 PM)
do $$
declare
  prof_record record;
  day integer;
begin
  for prof_record in select id from public.professionals loop
    -- Monday through Friday (1-5)
    for day in 1..5 loop
      insert into public.professional_availability (professional_id, day_of_week, start_time, end_time, is_available)
      values (prof_record.id, day, '09:00', '17:00', true);
    end loop;
  end loop;
end $$;

-- Insert case studies
insert into public.case_studies (title, category, description, challenge, solution, results, is_featured, display_order) values
  ('Tech Startup Acquisition', 'Corporate Law',
   'Represented a rapidly growing SaaS company through acquisition by Fortune 500 tech giant',
   'Client needed to navigate complex due diligence while maintaining business operations and protecting intellectual property rights during the transaction process.',
   'Coordinated comprehensive legal review across multiple practice areas, negotiated favorable terms that protected key employees and IP, and structured deal to minimize tax implications.',
   '$45M acquisition successfully closed within 90 days with optimal terms for shareholders and management team.',
   true, 1),

  ('Commercial Real Estate Development', 'Real Estate',
   'Guided developer through zoning approval and financing for mixed-use urban project',
   'Project faced significant zoning challenges and community opposition. Required creative legal strategies to gain necessary approvals while addressing stakeholder concerns.',
   'Developed comprehensive community engagement strategy, negotiated with planning commission, structured innovative financing arrangement, and secured all necessary permits.',
   '$120M mixed-use development approved and funded, creating 200 jobs and revitalizing downtown corridor.',
   true, 2),

  ('Business Partnership Dissolution', 'Litigation',
   'Resolved complex partnership dispute for family-owned manufacturing business',
   'Multi-generational family business faced contentious partnership dissolution with disputes over valuation, ownership interests, and operational control.',
   'Facilitated mediation process that addressed both business and family dynamics, worked with forensic accountants for fair valuation, and structured buyout agreement.',
   'Dispute resolved through mediation without litigation. Business preserved and relationships maintained. Settlement saved estimated $500K in legal fees.',
   true, 3),

  ('Estate Tax Planning Strategy', 'Estate Planning',
   'Implemented comprehensive estate plan for high-net-worth family with complex assets',
   'Family with $50M+ estate spanning multiple states needed to minimize tax exposure while ensuring smooth succession and protecting assets for future generations.',
   'Created sophisticated trust structure combining GRATs, CRTs, and generation-skipping trusts. Coordinated with tax advisors for optimal strategy.',
   'Reduced potential estate tax liability by approximately $8M. Assets protected and succession plan established with clear governance structure.',
   false, 4),

  ('Environmental Compliance Defense', 'Litigation',
   'Defended manufacturing client against EPA enforcement action',
   'Client faced significant penalties and potential facility closure due to alleged environmental violations with complex technical and regulatory issues.',
   'Assembled team of environmental experts, negotiated with regulatory agencies, developed comprehensive compliance plan, and secured favorable settlement.',
   'Penalties reduced by 75%, facility remained operational, compliance program established that exceeded regulatory requirements.',
   false, 5),

  ('Franchise System Expansion', 'Corporate Law',
   'Structured franchise agreements for regional restaurant chain going national',
   'Growing restaurant brand needed robust franchise system to support nationwide expansion while protecting brand integrity and ensuring franchisee success.',
   'Drafted comprehensive franchise disclosure documents and agreements, structured territory strategy, and developed franchise operations manual compliant with FTC regulations.',
   'Successfully launched franchise program in 15 states within first year. 40+ franchises sold with strong unit economics and brand consistency.',
   false, 6);
