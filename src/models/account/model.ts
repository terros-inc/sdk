import type { RoleId, SmallUser, TeamId, UserId } from '../user/model.ts'
import type { CustomFieldMap } from '../shared.ts'
import type { LatLng, SmallAddress } from '../location/model.ts'

/** An account (lead/customer) identifier. */
export type AccountId = `Account:${string}` | `Account.${string}`
/** An account status identifier. */
export type AccountStatusId = `AS.${string}`
/** A sales pipeline workflow identifier. */
export type WorkflowId = `WF.${string}`
/** A workflow stage identifier. */
export type WorkflowStageId = `S.${string}`
/** A workflow action identifier. */
export type WorkflowActionId = `A.${string}`
export type ContactId = `Contact:${string}` | `Contact.${string}`
export type NoteId = `Note.${string}`
export type TagId = `Tag.${string}`
/** A location (property/canvassing area) identifier. */
export type LocationId =
  | `Can.${string}`
  | `LocNew:${string}`
  | `LocNew.${string}`
  | `Loc:${string}`
  | `TLoc:${string}`
  | `TLoc.${string}`
  | `FA.${string}`
  | `PR.${string}`
/** A disposition (outcome of a contact attempt) identifier, or a built-in disposition name. */
export type DispositionId =
  | `Disposition:${string}`
  | `Disposition.${string}`
  | 'NotHome'
  | 'Comeback'
  | 'NotNow'
  | 'NotQualified'
  | 'PartialPitch'
  | 'NewAccount'
  | 'Competitor'
  | 'Custom1'
  | 'Custom2'
  | 'Custom3'

type ContactMethod = 'door' | 'phone'

/** An inclusive numeric range filter. */
export type RangeFilter = {
  gte?: number
  lte?: number
}

/** A cursor for paging through sorted account lists. */
export type SortCursor = number | number[]

/** User details attached to an account owner/closer, excluding identity fields already present on the account. */
export type AccountUserDetails = Omit<SmallUser, 'userId' | 'memberOf'>

/** @deprecated superseded by WorkflowHistoryItem */
export type StatusHistoryItem = {
  statusId: AccountStatusId
  sourceStatus?: string
  statusChangedDate: number
}

/** A record of an account's movement through a workflow stage/action. */
export type WorkflowHistoryItem = {
  stageId: WorkflowStageId
  actionId?: WorkflowActionId
  userId: UserId
  timestamp: number
  latlng?: LatLng
  sourceStatus?: string
}

/** A chronological list of user actions taken on an account (e.g. ownership changes). */
export type UserHistory = {
  userId: UserId
  timestamp: number
}[]

/** The payload for logging a new contact attempt on an account. */
export type UnsavedAccountContact = {
  timestamp: number
  method: ContactMethod
  userId: UserId
  contactId?: ContactId
  dispositionId: DispositionId
  deviceLocation?: LatLng
  isPitch?: boolean
}

/** A persisted contact attempt record. */
export type AccountContact = UnsavedAccountContact & {
  contactId: ContactId
}

/** The payload for adding a new note to an account. */
export type UnsavedAccountNote = {
  timestamp: number
  text: string
  userId: UserId
  noteId?: NoteId
}

/** A persisted note record. */
export type AccountNote = UnsavedAccountNote & {
  noteId: NoteId
}

type TagWithDate = {
  tagId: TagId
  timestamp: number
  userId: UserId
}

/** A prescreen credit-check result: pass, fail, or no record found. */
type PrescreenDecision = 'PASS' | 'FAIL' | 'NO_HIT'

/** A prescreen individual identifier. */
type PrescreenIndividualId = `Si:${string}`

/** Minimal information about a resident/homeowner on an account. */
export type TinyResidentData = {
  name?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  phone2?: string
  businessName?: string
  decision?: PrescreenDecision
  individualId?: PrescreenIndividualId
  age?: number
  creditScore?: { gte: number; lte: number }
}

/** The payload for creating or fully updating an account. */
export type UnsavedAccount = {
  customFields?: CustomFieldMap
  importId?: string
  workflowId?: WorkflowId
  workflowHistory?: WorkflowHistoryItem[]
  workflowStageId?: WorkflowStageId
  workflowActionId?: WorkflowActionId
  deviceLocation?: LatLng
  checkpoints?: WorkflowStageId[]
  accountId?: AccountId
  /** @deprecated use workflowStageId/workflowActionId */
  statusId?: AccountStatusId
  accountSource?: string
  sourceStatus?: string
  sourceId?: string
  externalLeadId?: string
  locationId?: LocationId
  location?: SmallAddress
  ownerId?: UserId
  owner?: AccountUserDetails
  closerId?: UserId
  closer?: AccountUserDetails
  /** Primary homeowner/resident data for this account. */
  resident?: TinyResidentData
  /** Secondary homeowner/resident data for this account. */
  resident2?: TinyResidentData
  language?: string
  /** @deprecated */
  rescheduleCount?: number
  /** @deprecated */
  dealSize?: number
  appointmentDate?: number
  test?: boolean
  teamId?: TeamId
  contacts?: UnsavedAccountContact[]
  notes?: UnsavedAccountNote[]
  isParent?: boolean
  parentAccountId?: AccountId
  tags?: TagWithDate[]
}

/** A minimal account representation focused on workflow/pipeline state. */
export type TinyWorkflowAccount = {
  accountId: AccountId
  workflowId: WorkflowId
  workflowStageId: WorkflowStageId
  workflowActionId?: WorkflowActionId
  workflowLastActionDate?: number
  workflowHistory: WorkflowHistoryItem[]
  customFields?: CustomFieldMap
}

/** A persisted account record. */
export type AccountData = Omit<UnsavedAccount, 'contacts' | 'notes'> & {
  accountId: AccountId
  createdAt?: number
  createdBy?: UserId
  updatedAt?: number
  updatedBy?: UserId
  statusHistory: StatusHistoryItem[]
  workflowStageName?: string
  workflowActionName?: string
  homeowner?: TinyResidentData
  userMissDate?: number
  locationMissDate?: number
  expiresAt?: number
  contacts?: AccountContact[]
  notes?: AccountNote[]
  lastActionDate?: number
  recruitId?: UserId
  ownerHistory?: UserHistory
  closerHistory?: UserHistory
  editable?: boolean
}

/** Field to sort account lists by; `CF.` prefix sorts by a custom field. */
export type AccountSortBy = 'createdDate' | 'lastActionDate' | 'lastUpdatedDate' | `CF.${string}`
export type AccountSortOrder = 'asc' | 'desc'

/** A map of custom field IDs to filter criteria for that field. */
export type CustomFieldFilter = Record<string, unknown>

/** A page of account search results. */
export type AccountDataResponse = {
  accounts: AccountData[]
  sortTimestamp?: SortCursor
  total?: number
}

/** A batch of actions to apply to a set of accounts in a single bulk operation. */
export type BulkModifyAccountsAction = (
  | {
      actionType: 'updateStatus'
      statusId: AccountStatusId
    }
  | {
      actionType: 'updateStage'
      stageId: WorkflowStageId
    }
  | {
      actionType: 'delete' | 'clearDisposition'
    }
)[]

/** Search/filter criteria for querying accounts via the search index. */
export type ElasticFilter = {
  cities?: string[]
  states?: string[]
  zipCodes?: string[]
  advancedCustomFields?: CustomFieldFilter
  statusIds?: AccountStatusId[]
  workflowStageIds?: WorkflowStageId[]
  tagIds?: TagId[]
  teamIds?: TeamId[]
  userIds?: UserId[]
  coordinates?: LatLng[]
  boundingBox?: {
    top: LatLng
    bottom: LatLng
  }
  workflowActionCount?: RangeFilter
  contactCount?: RangeFilter
}

/** An address where every field, including coordinates, is optional. */
export type PartialAddress = Partial<Omit<SmallAddress, 'latlng'>> & {
  latlng?: Partial<LatLng>
}

/** A coordinate pair accepted as either strings or numbers for upsert requests. */
export type UpsertLatLng = {
  latitude?: string | number
  longitude?: string | number
}

/** Same shape as {@link TinyResidentData}, accepted when creating or updating a resident. */
export type UpsertTinyResidentData = TinyResidentData

/** @deprecated will eventually be replaced by AccountStatusId */
export type AccountStatusCode =
  | 'Lead'
  | 'Set'
  | 'Sit'
  | 'Closed'
  | 'Approved'
  | 'Permit Submitted'
  | 'Permit Approved'
  | 'Installed'
  | 'Archived'
  | 'Do Not Contact'

/** Role-specific behavior settings for an account status. */
type SetterCloserConfig = {
  includeOnPlan?: boolean
  allowPayment?: boolean
}

/** The account/list entity scope this status applies to. */
type AccountStatusScope = string

/** The payload for creating or fully updating an account status. */
export type UnsavedAccountStatus = {
  name: string
  /** @deprecated */
  order?: number
  short?: string
  plural?: string
  description?: string
  legacyCode?: AccountStatusCode
  color?: string
  icon?: string
  restricted?: boolean
  roles?: Record<RoleId, SetterCloserConfig>
  integrationMapping?: string[]
  scope: AccountStatusScope
  setter?: SetterCloserConfig
  closer?: SetterCloserConfig
  selfgen?: SetterCloserConfig
  isFinalState?: boolean
  createUser?: boolean
  columnVisibility?: TeamId[]
  requiredFields?: string[]
  isArchivedState?: boolean
}

/** A persisted account status record. */
export type AccountStatusData = UnsavedAccountStatus & {
  statusId: AccountStatusId
  isDeleted?: boolean
  createdAt?: number
  createdBy?: UserId
  updatedAt?: number
  updatedBy?: UserId
}

/** A minimal account status representation. */
export type TinyAccountStatus = Pick<AccountStatusData, 'name' | 'statusId'>
