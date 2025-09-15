// Cloudinary configuration for next-cloudinary
export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
}

// Validate configuration
if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME not set, using fallback cloud name')
}

export default CLOUDINARY_CONFIG
