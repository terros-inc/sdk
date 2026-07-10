import type { TeamId } from '../user'

/** A minimal team representation used in nested/summary views. */
export type TinyTeam = {
  teamId: TeamId
  name: string
  parentId?: TeamId
  isDeleted?: boolean
  externalId?: string
  avatarBlurhash?: string
  avatarUrl?: string
  restrictVisibility?: boolean
  /** Depth of this team in the org hierarchy. */
  level: number
  meetingTimes?: { day: number; start: number; end: number }[]
}
