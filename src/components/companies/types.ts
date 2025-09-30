export interface CompanyPageProps {
  companyKey: string
  companyName: string
  t: any // useTranslations hook
}

export interface CompanyStats {
  projects: string
  capacity: string
  experience: string
}

export type CompanyComponent = React.ComponentType<CompanyPageProps>
