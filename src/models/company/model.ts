import type { UserId } from '../user/model.ts'

/** Lifecycle state of a company (tenant). */
export type CompanyState = 'active' | 'trial' | 'internal' | 'demo' | 'sandbox' | 'template' | 'suspended'
/** Category describing what a company is used for. */
export type CompanyKind = 'customer' | 'sandbox' | 'demo' | 'template' | 'development'
export type AccessStatus = 'active' | 'suspended'
/** How the company is billed. */
export type BillingMethod = 'stripe' | 'none'
export type CompanyIndustry =
  | 'solar'
  | 'pest'
  | 'alarm'
  | 'roofing'
  | 'fiber'
  | 'insurance'
  | 'home_improvement'
  | 'windows'
  | 'satellite_tv'
  | 'retail'
  | 'other'
  | 'solar_cleaning'

/** A company (tenant) identifier. */
export type CompanyId = `C:${string}` | `C.${string}`

/** A company (tenant) in the platform. */
export type CompanyData = {
  companyId: CompanyId
  name: string
  legalName?: string
  kind?: CompanyKind
  accessStatus?: AccessStatus
  /** The internal (Terros-side) user who owns this company account. */
  internalOwnerId?: UserId
  billingEmail?: string
  billingMethod?: BillingMethod
  state: CompanyState
  maxUsers?: number
  size?: number
  industries?: CompanyIndustry[]
  salesChannels?: string[]
  /** Highest team hierarchy level used by this company. */
  highestTeamLevel?: number
  /** Lowest team hierarchy level used by this company. */
  lowestTeamLevel?: number
  /** Custom display names for each team hierarchy level, keyed by level number. */
  levelNames?: Record<string, string>
  timeZone?: string
  avatarUrl?: string
  avatarBlurhash?: string
  uploadAvatarUrl?: string
  iconUrl?: string
  iconBlurhash?: string
  uploadIconUrl?: string
  isDeleted?: boolean
  createdAt?: number
  createdBy?: UserId
  updatedAt?: number
  updatedBy?: UserId
}
