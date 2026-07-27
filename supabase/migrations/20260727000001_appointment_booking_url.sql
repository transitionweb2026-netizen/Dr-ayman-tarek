-- Every "Book Appointment" CTA sitewide (header, final CTAs, video/procedure
-- modals) previously had nowhere to go — no href, no onClick. They now
-- default to the internal /contact page, but a clinic using an external
-- scheduling system (Calendly, a patient portal, etc.) needs to point them
-- elsewhere without a code change.

alter table public.site_settings
  add column appointment_booking_url text;
