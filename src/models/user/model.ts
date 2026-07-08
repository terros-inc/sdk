import type { TinyTeam } from '../team/model.ts'
import type { AuditProps, CustomFieldMap } from '../shared.ts'
import type { Address } from '../location/model.ts'
import type { CompanyId } from '../company/model.ts'

/** A user identifier. */
export type UserId = `U:${string}` | `U.${string}`
/** A team's identifier. */
export type TeamId = `Team:${string}` | `Team.${string}`
/** A permission role identifier. */
export type RoleId = `Role.${string}`

/** A user ID, email, or clientUserId. */
export type UserIdentifier = string

/** A closer's availability/skill status for booking appointments. */
export type CloserStatus = 'None' | 'Needs_Help' | 'Can_Close' | 'Can_Help' | 'Closer_Only'

/** A minimal permission role representation. */
export type TinyRole = {
  roleId: RoleId
  roleType: 'admin' | 'manager' | 'recruit' | null
  name: string
}

/** A minimal user representation used in nested/summary views. */
export type TinyUser = {
  userId: UserId
  clientUserId?: string
  firstName: string
  lastName: string
  preferredName?: string
  avatarBlurhash?: string
  avatarUrl?: string
  lastAccess?: number
  isDeleted?: boolean
  color?: string
}

/** A user representation with additional profile/team fields beyond {@link TinyUser}. */
export type SmallUser = TinyUser & {
  email: string
  phone?: string
  title?: string
  timeZone?: string
  teamIds?: TeamId[]
  closerStatus?: CloserStatus
  roles?: TinyRole[]
  memberOf?: Pick<TinyTeam, 'teamId' | 'name'>[]
  companyId?: CompanyId
}

export type Weekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

/** Configuration governing how a closer receives and books appointments. */
export type CloserSettings = {
  order?: number
  taskLockout?: boolean
  bookingPercent?: number
  /** Minutes. */
  meetingDuration?: number
  /** Minutes. */
  timeBetweenAppointments?: number
  serviceCenter?: { latitude: number; longitude: number }
  serviceRadius?: number
  /** Minutes. */
  minimumNotice?: number
  /** Minutes. */
  maximumNotice?: number
  /** Available booking slots (minutes from midnight) per weekday. */
  timeslots?: Partial<Record<Weekday, number[]>>
  excludes?: number[]
  includes?: number[]
  lastUpdatedDate?: number
}

/** A closer paired with their available appointment time slots. */
export type TinyCloser = {
  user: TinyUser
  times: { startTime: number; duration: number }[]
}

/** A closer including their booking configuration. */
export type SmallCloser = TinyUser & CloserSettings & { timezone: string }

/** A closer evaluated for availability against a specific appointment request. */
export type AvailableCloser = TinyUser & {
  inServiceArea?: boolean
  available: boolean
  locked?: boolean
  unavailableReason?: string
}

/** The set of entities a permission grant applies to. */
type UserScope =
  | { entity: 'self' | 'company' | 'withinRestrictions' | 'none' }
  | { entity: 'downline'; entityId: UserId | TeamId }

type PermissionEntityId = EntityId | RoleId

/** A permission scope along with the entity that granted it. */
type ScopeWithSource = UserScope & AuditProps & { source: PermissionEntityId }

type PermissionType = string

/** A reduced view of a user's permission overrides, keyed by permission type. */
export type PermissionMap = Partial<Record<PermissionType, ScopeWithSource[]>>

/** Notification delivery channels a user has enabled for a given category. */
export type NotificationPreference = {
  push?: boolean
  email?: boolean
}

/** A user's notification settings, keyed by notification category. */
export type UserPreferences = Partial<Record<string, NotificationPreference>>

/** The payload for creating or fully updating a user. */
export type UnsavedUser = {
  isDeleted?: boolean
  importId?: string
  phone?: string
  firstName: string
  lastName: string
  preferredName?: string
  email: string
  timeZone?: string
  clientUserId?: string
  title?: string
  closerStatus?: CloserStatus
  companyId?: CompanyId
  managerId?: UserId
  hasManager?: boolean
  selfReportedManager?: {
    managerId?: UserId
    updatedAt: number
  }
  primaryTeam?: {
    teamId: TeamId
    /** Timestamp after which this primary team assignment should be re-verified. */
    staleAfter: number
  }
  betaProgram?: boolean
  language?: string
  secondaryLanguages?: string[]
  color?: string
  superuserScore?: number
  customFields?: CustomFieldMap
  accountId?: string
  whitelist?: boolean
  closer?: CloserSettings
}

/** A user's teams grouped by hierarchy level (1 = top-level). Keys are dynamic: `team1`, `team2`, ... `teamN`. */
export type UserTeamsByLevel = Partial<Record<`team${number}`, TinyTeam[]>>

/** A user's full team membership and management relationships. */
export type UserTeamData = UserTeamsByLevel & {
  manages: TeamId[]
  directMemberOf: TinyTeam[]
  memberOf: TinyTeam[]
  managers: TinyUser[]
  manager?: TinyUser
  /** @deprecated */
  groups: TinyTeam[]
}

/** A persisted user record. */
export type UserData = UnsavedUser & {
  lastAccess?: number
  avatarBlurhash?: string
  avatarUrl?: string
  userId: UserId
  companyId: CompanyId
  firstAccess?: number
  startDate?: number
  clientTeamId?: string
  teams?: UserTeamData
  roles?: TinyRole[]
  biography?: string
  notificationPrefs?: UserPreferences
  agreeToTerms?: number
  agreeToLicensing?: number
  agreeToAITraining?: boolean
}

/** A user record with additional fields exposed on the user's own profile view. */
export type UserProfileData = UserData & {
  createdAt?: number
  createdBy?: UserId
  updatedAt?: number
  updatedBy?: UserId
  permissionMap?: PermissionMap
  mailingAddress?: Address
  shoeSize?: string
  shirtSize?: string
  birth?: {
    month?: number
    day?: number
  }
  uploadAvatarUrl?: string
  closerIds?: UserId[]
  directRoles?: TinyRole[]
}

/** Every entity type that can own users/teams in bulk operations. */
export type EntityId = UserId | TeamId | CompanyId
