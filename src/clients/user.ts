import type {
  UserAddInput,
  UserAddSuccess,
  UserBulkUpdateInput,
  UserBulkUpdateSuccess,
  UserClosersInput,
  UserClosersSuccess,
  UserGetInput,
  UserGetSuccess,
  UserListInput,
  UserListSuccess,
  UserManagerInput,
  UserManagerSuccess,
  UserProfileInput,
  UserProfileSuccess,
  UserRemoveInput,
  UserReportInput,
  UserReportSuccess,
  UserSearchInput,
  UserSearchSuccess,
  UserTimezoneInput,
  UserUpdateInput,
  UserUpdateSuccess,
} from '../models/user/api.ts'
import type { ApiSuccess } from '../models/shared.ts'
import type { ApiCaller } from '../client.ts'

export class UserClient {
  constructor(private readonly api: ApiCaller) {}

  list(input: UserListInput): Promise<UserListSuccess> {
    return this.api.call('user/list', input)
  }

  add(input: UserAddInput): Promise<UserAddSuccess> {
    return this.api.call('user/add', input)
  }

  update(input: UserUpdateInput): Promise<UserUpdateSuccess> {
    return this.api.call('user/update', input)
  }

  updateBulk(input: UserBulkUpdateInput): Promise<UserBulkUpdateSuccess> {
    return this.api.call('user/update/bulk', input)
  }

  remove(input: UserRemoveInput): Promise<ApiSuccess> {
    return this.api.call('user/remove', input)
  }

  get(input: UserGetInput = {}): Promise<UserGetSuccess> {
    return this.api.call('user/get', input)
  }

  profile(input: UserProfileInput = {}): Promise<UserProfileSuccess> {
    return this.api.call('user/profile', input)
  }

  search(input: UserSearchInput): Promise<UserSearchSuccess> {
    return this.api.call('user/search', input)
  }

  timezone(input: UserTimezoneInput): Promise<ApiSuccess> {
    return this.api.call('user/timezone', input)
  }

  report(input: UserReportInput): Promise<UserReportSuccess> {
    return this.api.call('user/report', input)
  }

  closers(input: UserClosersInput): Promise<UserClosersSuccess> {
    return this.api.call('user/closers', input)
  }

  manager(input: UserManagerInput): Promise<UserManagerSuccess> {
    return this.api.call('user/manager', input)
  }
}
