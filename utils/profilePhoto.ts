import * as ImagePicker from 'expo-image-picker';
import { supabase } from './supabase';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system/legacy';

export interface UploadProfilePhotoResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Request camera roll permissions
 */
export async function requestMediaLibraryPermissions(): Promise<boolean> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
}

/**
 * Pick an image from the device's library
 */
export async function pickProfilePhoto(): Promise<ImagePicker.ImagePickerAsset | null> {
  const hasPermission = await requestMediaLibraryPermissions();
  
  if (!hasPermission) {
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (result.canceled || !result.assets[0]) {
    return null;
  }

  return result.assets[0];
}

/**
 * Upload profile photo to Supabase storage
 */
export async function uploadProfilePhoto(
  userId: string,
  imageUri: string
): Promise<UploadProfilePhotoResult> {
  try {
    // Read the file as base64
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: 'base64',
    });

    // Get file extension
    const fileExt = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload to Supabase storage
    const { error } = await supabase.storage
      .from('profile-photos')
      .upload(filePath, decode(base64), {
        contentType: `image/${fileExt}`,
        upsert: true,
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(filePath);

    return {
      success: true,
      url: urlData.publicUrl,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload photo',
    };
  }
}

/**
 * Update user profile with new avatar URL
 */
export async function updateProfileAvatar(
  userId: string,
  avatarUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', userId);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update profile',
    };
  }
}

/**
 * Delete old profile photo from storage
 */
export async function deleteOldProfilePhoto(avatarUrl: string): Promise<void> {
  try {
    // Extract the file path from the URL
    const urlParts = avatarUrl.split('/profile-photos/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];
    
    await supabase.storage
      .from('profile-photos')
      .remove([`avatars/${filePath}`]);
  } catch (error) {
    console.error('Error deleting old photo:', error);
  }
}

/**
 * Upload student photo to Supabase storage
 */
export async function uploadStudentPhoto(
  studentId: string,
  imageUri: string
): Promise<UploadProfilePhotoResult> {
  try {
    // Read the file as base64
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: 'base64',
    });

    // Get file extension
    const fileExt = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `student-${studentId}-${Date.now()}.${fileExt}`;
    const filePath = `students/${fileName}`;

    // Upload to Supabase storage
    const { error } = await supabase.storage
      .from('profile-photos')
      .upload(filePath, decode(base64), {
        contentType: `image/${fileExt}`,
        upsert: true,
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(filePath);

    return {
      success: true,
      url: urlData.publicUrl,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload photo',
    };
  }
}

/**
 * Update student profile with new photo URL
 */
export async function updateStudentPhoto(
  studentId: string,
  photoUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('students')
      .update({ photo_url: photoUrl })
      .eq('id', studentId);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update student photo',
    };
  }
}

/**
 * Delete old student photo from storage
 */
export async function deleteOldStudentPhoto(photoUrl: string): Promise<void> {
  try {
    // Extract the file path from the URL
    const urlParts = photoUrl.split('/profile-photos/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];
    
    await supabase.storage
      .from('profile-photos')
      .remove([filePath]);
  } catch (error) {
    console.error('Error deleting old student photo:', error);
  }
}
