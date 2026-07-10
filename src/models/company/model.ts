import type { UserId } from '../user'

/**
 * The company's lifecycle state. `suspended` is the only state that revokes access; every
 * other value (including the `demo`/`sandbox`/`template` group) is treated as active.
 */
export type CompanyState = 'active' | 'trial' | 'internal' | 'demo' | 'sandbox' | 'template' | 'suspended'
/** What a company is used for. `customer` is a real, paying tenant; the rest are non-billing internal uses. */
export type CompanyKind = 'customer' | 'sandbox' | 'demo' | 'template' | 'development'
/** A manual override of {@link CompanyState}'s access implications, e.g. to suspend a company for non-payment. */
export type AccessStatus = 'active' | 'suspended'
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

export type CompanyId = `C:${string}` | `C.${string}`

/** A company (tenant) in the platform. */
export type CompanyData = {
  companyId: CompanyId
  name: string
  legalName?: string
  kind?: CompanyKind
  accessStatus?: AccessStatus
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
