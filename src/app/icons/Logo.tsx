import LocalImage from "@/src/components/LocalImage"

export const Logo = () => {
  return (
    <div className=''>
    <LocalImage
      src={require('@/public/images/rebuildUALogo.webp')}
      alt="RebuildUA Logo"
      width={200}
      height={200}
      className="object-contain"
    />
    </div>
  )
}
