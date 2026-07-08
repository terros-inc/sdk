import type { SmallUser, TeamId, UserId } from '../user/model.ts'
import type { TinyTeam } from '../team/model.ts'
import type { Address, LatLng } from '../location/model.ts'
import type { AccountId, DispositionId, LocationId, TinyResidentData, TinyWorkflowAccount } from '../account/model.ts'

/** A calendar event identifier. */
export type CalendarEventId = `Event:${string}` | `Event.${string}`
/** @deprecated */
export type EventOutcomeId = `O.${string}`
/** An interview record identifier. */
export type InterviewId = `Interview:${string}` | `Interview.${string}`
/** A file attachment identifier. */
export type AttachmentId = `Attachment:${string}` | `Attachment.${string}`

/** The category of calendar event. */
export type EventType = 'Consultation' | 'Comeback' | 'Interview' | 'GeneralVisit' | 'Shadow' | 'Team'

/** References to attachments with specific, well-known purposes. */
export type SpecialtyAttachments = {
  utilityBill?: AttachmentId
  customerVerification?: AttachmentId
}

/** @deprecated */
export type SyncedCalendarEvent = {
  calendarType: string
  calendarId: string
  userId: UserId
  deviceId: string
  eventId: string
}

/** A calendar event's location: a formatted address plus coordinates. */
export type CalendarEventLocation = Pick<Address, 'oneLine'> & LatLng

/** The payload for creating or fully updating a calendar event. */
export type UnsavedCalendarEventData = {
  importId?: string
  eventType: EventType
  title: string
  sourceId?: string
  /** UTC milliseconds. */
  eventDate: number
  outcomeId?: EventOutcomeId
  dispositionId?: DispositionId
  /** Minutes. */
  duration: number
  attachments?: AttachmentId[]
  specialtyAttachments?: SpecialtyAttachments
  accountId?: AccountId
  locationId?: LocationId
  location?: CalendarEventLocation
  /** The closer/user assigned to run this event. */
  ownerId?: UserId
  /** The customer-facing account contact attending, if not the account itself. */
  attendeeId?: UserId
  /** The setter/scheduler who booked this event. */
  dispatcherId?: UserId
  occurredOwner?: boolean
  occurredAttendee?: boolean
  interviewId?: InterviewId
  /** @deprecated */
  notes?: string
  previousEventId?: CalendarEventId
  /** @deprecated */
  syncedCalendarIds?: string[]
  /** @deprecated */
  syncedCalendarEvents?: SyncedCalendarEvent[]
  teamId?: TeamId
}

/** @deprecated */
export type EventOutcomeHistory = {
  outcomeId: EventOutcomeId
  userId: UserId
  timestamp: number
}

/** Which party was at fault when a sit didn't occur. */
type SitOutcomeFault = string

/** A persisted calendar event record. */
export type CalendarEventData = UnsavedCalendarEventData & {
  outcomeHistory?: EventOutcomeHistory[]
  createdAt?: number
  createdBy?: UserId
  updatedAt?: number
  updatedBy?: UserId
  eventId: CalendarEventId
  ownerId: UserId
  occurred?: boolean
  closed?: boolean
  reasonNotOccurred?: string
  fault?: SitOutcomeFault
  allDay?: boolean
  canDelete?: boolean
}

/** A calendar event enriched with related entity details for display. */
export type CalendarEventDataWithDetails = CalendarEventData & {
  resident?: TinyResidentData
  owner?: SmallUser
  attendee?: SmallUser
  teams?: TinyTeam[]
  account?: TinyWorkflowAccount
}
