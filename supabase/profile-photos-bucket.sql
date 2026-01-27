-- Create profile-photos storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Add avatar_url column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Set up RLS policies for profile-photos bucket
-- Allow authenticated users to read all profile photos
CREATE POLICY "Anyone can view profile photos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'profile-photos');

-- Allow users to upload their own profile photos
CREATE POLICY "Users can upload their own profile photo"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-photos' AND
  (storage.foldername(name))[1] = 'avatars' AND
  auth.uid()::text = (regexp_split_to_array((storage.filename(name)), '-'))[1]
);

-- Allow users to update their own profile photos
CREATE POLICY "Users can update their own profile photo"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-photos' AND
  (storage.foldername(name))[1] = 'avatars' AND
  auth.uid()::text = (regexp_split_to_array((storage.filename(name)), '-'))[1]
);

-- Allow users to delete their own profile photos
CREATE POLICY "Users can delete their own profile photo"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-photos' AND
  (storage.foldername(name))[1] = 'avatars' AND
  auth.uid()::text = (regexp_split_to_array((storage.filename(name)), '-'))[1]
);
