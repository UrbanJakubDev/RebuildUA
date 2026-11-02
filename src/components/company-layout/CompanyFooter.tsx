import { CompanyTheme } from './companies'

// Patička nového designu; pravá strana se liší podle stránky
export function CompanyFooter({
  theme,
  children
}: {
  theme: Pick<CompanyTheme, 'border'>
  children?: React.ReactNode
}) {
  return (
    <footer className='border-t bg-white' style={{ borderColor: theme.border }}>
      <div className='mx-auto flex max-w-[1280px] items-center justify-between px-12 py-7 text-[13px] text-[#2c2a29]'>
        <span>© 2026 Rebuild Ukraine</span>
        {children}
      </div>
    </footer>
  )
}
