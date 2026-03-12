# Profile Photo Feature Setup Guide

## Overview
This feature allows parents to upload and change their profile photos using the device's image picker. Photos are stored in Supabase Storage with proper access control policies.

## Database Setup

1. **Run the SQL migration**: Execute the SQL script in `supabase/profile-photos-bucket.sql` in your Supabase SQL Editor. This will:
   - Create the `profile-photos` storage bucket (public)
   - Add the `avatar_url` column to the `profiles` table
   - Set up Row Level Security (RLS) policies for the bucket

2. **Manual setup (if SQL script fails)**:
   - Go to Supabase Dashboard → Storage
   - Create a new bucket named `profile-photos`
   - Set it as **Public bucket**
   - Go to SQL Editor and run:
     ```sql
     ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
     ```

## Features Implemented

### 1. Image Picker
- Uses `expo-image-picker` for native image selection
- Allows 1:1 aspect ratio cropping
- Optimized to 0.8 quality for smaller file sizes
- Requests necessary permissions automatically

### 2. Photo Upload
- Uploads to Supabase Storage bucket: `profile-photos`
- File naming: `{userId}-{timestamp}.{ext}`
- Stored in `avatars/` folder within the bucket
- Supports JPG, PNG, and other common image formats

### 3. Profile Display
- Shows uploaded photo in profile header
- Falls back to initials if no photo is uploaded
- Photo displayed in a circular frame (96x96 pixels)
- Camera icon button overlays the photo for editing

### 4. Photo Management
- Old photos are automatically deleted when uploading new ones
- RLS policies ensure users can only modify their own photos
- Public read access allows photos to be displayed anywhere in the app

## Security

### Row Level Security (RLS) Policies
The storage bucket has the following policies:

1. **View**: All authenticated users can view profile photos
2. **Upload**: Users can only upload photos with their own user ID in the filename
3. **Update**: Users can only update their own photos
4. **Delete**: Users can only delete their own photos

### File Naming Convention
Files are named: `{userId}-{timestamp}.{extension}`

This ensures:
- Each user can only manage their own files
- No filename collisions
- Easy identification of file ownership

## Usage

### For Users
1. Navigate to the Profile tab
2. Tap the camera icon button on the profile photo
3. Select an image from your device's photo library
4. Crop the image (1:1 aspect ratio)
5. Wait for upload to complete
6. Photo updates automatically

### For Developers

#### Update profile photo
```typescript
import { pickProfilePhoto, uploadProfilePhoto, updateProfileAvatar } from '~/utils/profilePhoto';

const handleChangePhoto = async () => {
  const image = await pickProfilePhoto();
  if (!image || !userId) return;

  const result = await uploadProfilePhoto(userId, image.uri);
  if (result.success && result.url) {
    await updateProfileAvatar(userId, result.url);
  }
};
```

#### Access profile photo
```typescript
const { profile } = useAuthStore();
const photoUrl = profile?.avatar_url;
```

## Dependencies

The following packages were installed:
- `expo-image-picker` - Native image picker
- `expo-file-system` - File system access for reading images
- `base64-arraybuffer` - Base64 encoding for Supabase upload

## File Structure

```
utils/
  └── profilePhoto.ts           # Photo upload utilities
app/(tabs)/
  └── two.tsx                   # Profile screen with photo picker
store/
  └── authStore.ts              # Added updateProfileAvatar method
types/
  └── database.ts               # Added avatar_url to Profile type
supabase/
  └── profile-photos-bucket.sql # Database migration
```

## Troubleshooting

### Photo not uploading
- Check that the SQL migration was run successfully
- Verify the `profile-photos` bucket exists and is public
- Check RLS policies are enabled

### Permission denied
- Ensure the app has photo library permissions
- Check iOS/Android permissions in app settings

### Photo not displaying
- Verify the `avatar_url` is saved in the database
- Check the URL is accessible (bucket should be public)
- Ensure proper internet connection

## Next Steps (Optional Enhancements)

1. **Image compression**: Add more aggressive compression before upload
2. **Photo preview**: Show preview before confirming upload
3. **Remove photo**: Add option to remove photo and revert to initials
4. **Camera capture**: Add option to take photo with camera
5. **Photo editing**: Add filters or rotation options
