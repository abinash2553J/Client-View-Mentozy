-- Migration: Add session acceptance fields to bookings
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS mentor_notes text,
ADD COLUMN IF NOT EXISTS payment_scanner_url text;

-- Create storage bucket for payment scanners if it doesn't exist
-- Note: This requires high privileges, usually done in Supabase Dashboard or via API
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-scanners', 'payment-scanners', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for payment-scanners
-- Allow public read (or restricted to authenticated)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'payment-scanners' );

-- Allow mentors to upload theirs
CREATE POLICY "Mentors can upload scanners"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'payment-scanners' AND
  (auth.role() = 'authenticated')
);
