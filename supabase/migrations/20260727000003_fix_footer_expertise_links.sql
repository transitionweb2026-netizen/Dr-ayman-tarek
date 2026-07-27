-- The 4 "Expertise" footer links (Neurosurgery/Neurology/Spine Care/
-- Neuro-Oncology) were seeded with href = '#' — a live dead link on every
-- page's footer. All four topics are covered on the Services page, so that
-- is their real, existing destination.
update public.nav_links set href = '/services' where location = 'footer_expertise' and href = '#';
