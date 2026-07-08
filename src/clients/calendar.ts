import type { ApiSuccess } from '../models/shared.ts'
import type {
  CalendarAvailabilityInput,
  CalendarAvailabilitySuccess,
  CalendarClosersInput,
  CalendarClosersSuccess,
  CalendarEventAddInput,
  CalendarEventAddSuccess,
  CalendarEventConfirmInput,
  CalendarEventConfirmSuccess,
  CalendarEventGetInput,
  CalendarEventGetSuccess,
  CalendarEventListInput,
  CalendarEventListSuccess,
  CalendarEventRemoveInput,
  CalendarEventUpdateInput,
  CalendarEventUpdateSuccess,
  CalendarEventUpsertInput,
  CalendarEventUpsertSuccess,
  CalendarTimeslotsInput,
  CalendarTimeslotsSuccess,
} from '../models/calendar/api.ts'
import type { ApiCaller } from '../client.ts'

export class CalendarEventClient {
  constructor(private readonly api: ApiCaller) {}

  add(input: CalendarEventAddInput): Promise<CalendarEventAddSuccess> {
    return this.api.call('calendar/event/add', input)
  }

  get(input: CalendarEventGetInput): Promise<CalendarEventGetSuccess> {
    return this.api.call('calendar/event/get', input)
  }

  list(input: CalendarEventListInput): Promise<CalendarEventListSuccess> {
    return this.api.call('calendar/event/list', input)
  }

  update(input: CalendarEventUpdateInput): Promise<CalendarEventUpdateSuccess> {
    return this.api.call('calendar/event/update', input)
  }

  upsert(input: CalendarEventUpsertInput): Promise<CalendarEventUpsertSuccess> {
    return this.api.call('calendar/event/upsert', input)
  }

  confirm(input: CalendarEventConfirmInput): Promise<CalendarEventConfirmSuccess> {
    return this.api.call('calendar/event/confirm', input)
  }

  remove(input: CalendarEventRemoveInput): Promise<ApiSuccess> {
    return this.api.call('calendar/event/remove', input)
  }
}

export class CalendarClient {
  readonly event: CalendarEventClient

  constructor(private readonly api: ApiCaller) {
    this.event = new CalendarEventClient(api)
  }

  availability(input: CalendarAvailabilityInput): Promise<CalendarAvailabilitySuccess> {
    return this.api.call('calendar/availability', input)
  }

  closers(input: CalendarClosersInput): Promise<CalendarClosersSuccess> {
    return this.api.call('calendar/closers', input)
  }

  timeslots(input: CalendarTimeslotsInput): Promise<CalendarTimeslotsSuccess> {
    return this.api.call('calendar/timeslots', input)
  }
}
