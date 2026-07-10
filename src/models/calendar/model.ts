import type { SmallUser, TeamId, UserId } from '../user'
import type { TinyTeam } from '../team'
import type { Address, LatLng } from '../location'
import type { AccountId, DispositionId, LocationId, TinyResidentData, TinyWorkflowAccount } from '../account'

export type CalendarEventId = `Event:${string}` | `Event.${string}`
/** @deprecated */
export type EventOutcomeId = `O.${string}`
export type InterviewId = `Interview:${string}` | `Interview.${string}`
export type AttachmentId = `Attachment:${string}` | `Attachment.${string}`

/**
 * The category of calendar event. This determines how {@link UnsavedCalendarEventData.ownerId}
 * and {@link UnsavedCalendarEventData.attendeeId} are interpreted:
 *
 * - `Consultation` — A sales appointment ("sit"). `ownerId` is the setter who booked it,
 *   `attendeeId` is the closer running it. Shown to users as "Close".
 * - `Comeback` — A follow-up or personal reminder with no fixed roles; only `ownerId` is used.
 * - `Interview` — A 1:1 between a manager and a rep. `ownerId` is the manager, `attendeeId`
 *   is the rep.
 * - `GeneralVisit` — An unstructured visit with no owner/attendee role assignment.
 * - `Shadow` — A shadow-day ride-along. `ownerId` is the rep being shadowed, `attendeeId`
 *   is the shadowing manager/mentor.
 * - `Team` — An internal team meeting with no owner/attendee role assignment.
 */
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
  /** The event's scheduled start time, in UTC milliseconds. */
  eventDate: number
  /** @deprecated Legacy per-event result (occurred/closed/fault/reschedule). Superseded by the account's Workflow status. */
  outcomeId?: EventOutcomeId
  /** @deprecated Legacy visit classification (e.g. `NotHome`, `Comeback`). Superseded by the account's Workflow status. */
  dispositionId?: DispositionId
  /** The event's scheduled length, in minutes. */
  duration: number
  attachments?: AttachmentId[]
  specialtyAttachments?: SpecialtyAttachments
  accountId?: AccountId
  locationId?: LocationId
  location?: CalendarEventLocation
  /**
   * The event's primary participant. Whose role this is depends on {@link eventType}: the
   * setter for `Consultation`, the manager for `Interview`, the rep being shadowed for
   * `Shadow`. See {@link EventType} for the full mapping.
   */
  ownerId?: UserId
  /**
   * The event's secondary participant, if any. Whose role this is depends on {@link eventType}:
   * the closer for `Consultation`, the rep for `Interview`, the shadowing manager for
   * `Shadow`. Unused for event types with no fixed roles (`Comeback`, `GeneralVisit`, `Team`).
   */
  attendeeId?: UserId
  /** The user who dispatched/scheduled this event, if different from the owner or attendee. */
  dispatcherId?: UserId
  /**
   * Whether {@link ownerId} confirmed attendance, distinct from the event-level
   * {@link CalendarEventData.occurred}.
   */
  occurredOwner?: boolean
  /** Whether {@link attendeeId} confirmed attendance, distinct from the event-level {@link CalendarEventData.occurred}. */
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

/** Who is responsible when a `Consultation` event doesn't occur or doesn't close: `'setter' | 'closer'`. */
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
  /** Whether the event as a whole took place. */
  occurred?: boolean
  closed?: boolean
  /**
   * Free-text reason the event didn't happen as scheduled. Despite the name, its presence
   * doesn't necessarily mean {@link occurred} is `false`.
   */
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
