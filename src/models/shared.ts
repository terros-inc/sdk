import type { UserId } from './user/model.ts'

/** A Connect API route string, e.g. "user/get" or "account/status/add". */
export type ApiRoute = string

/** A successful API response, merging in the route-specific result payload. */
export type ApiSuccess<T = unknown> = { type: 'success' } & T

/** An API error response. */
export type ResponseError = {
  type: 'error'
  /** Machine-readable error code. */
  error: string
  message?: string
  /** Whether the request can be safely retried. */
  retry?: boolean
}

/** The result of any Connect API call, either a success or an error. */
export type ResponseOutput = ApiSuccess | ResponseError

/** Type guard narrowing an API response to a {@link ResponseError}. */
export function isResponseError(response: unknown): response is ResponseError {
  return (
    typeof response === 'object' &&
    response !== null &&
    (response as { type?: unknown }).type === 'error' &&
    Boolean((response as { error?: unknown }).error)
  )
}

/** Arbitrary custom field values, keyed by custom field ID. */
export type CustomFieldMap = Record<string, string | number | boolean | null>

/** A single record of who modified an entity and when. */
export type AuditLog = {
  userId: UserId
  timestamp: number
  updateProcess?: string
}

/** Common audit trail fields shared across mutable entities. */
export type AuditProps = {
  modifiedBy?: AuditLog[]
  /** @deprecated */
  createdAt?: number
  /** @deprecated */
  createdBy?: UserId
  updatedAt?: number
  /** @deprecated */
  updatedBy?: UserId
  lastUpdateProcess?: string
  version?: number
}
