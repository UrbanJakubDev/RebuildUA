import { CldImage } from 'next-cloudinary'

// Configure Cloudinary globally
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
}

// Validate configuration
if (!cloudinaryConfig.cloudName) {
  console.error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set in environment variables')
}

export default cloudinaryConfig
