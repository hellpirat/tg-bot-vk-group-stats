export enum VKGroupType {
  Page = 'page',
  Group = 'group',
  Event = 'event',
}

export interface VKGroupDTO {
  id: number
  name: string
  screen_name: string
  /*
   @property is_closed {number}  can be 0, 1, 2
    0 = 0 — open;
    1 — closed;
    2 —  Private
  */
  is_closed: number // 0, 1,
  type: VKGroupType
  members_count?: number
  'photo:50': string
  photo_100: string
  photo_200: string
}

export interface VKStatsActivityDTO {
  copies?: number
  likes?: number
  subscribed?: number
  unsubscribed?: number
  hidden?: number
  comments?: number
}

export interface BaseDictionaryDTO {
  value: string
  count: number
}

export interface VKAgeDTO extends BaseDictionaryDTO {}
export interface VKCountryDTO extends BaseDictionaryDTO {
  code: string
  name: string
}
export interface VKCityDTO extends BaseDictionaryDTO {
  name: string
}

export interface VKSexDTO extends BaseDictionaryDTO {}
export interface VKSexAgeDTO extends BaseDictionaryDTO {}

export interface VKStatsDTO {
  activity: VKStatsActivityDTO
  period_from: number
  period_to: number
  reach: {
    cities: VKCityDTO[]
    age?: VKAgeDTO[]
    countries: VKCountryDTO[]
    mobile_reach: number
    reach: number
    reach_subscribers: number
    sex?: VKSexDTO[]
    sex_age?: VKSexAgeDTO[]
  }
  visitors: {
    age?: VKSexAgeDTO[]
    cities: VKCityDTO[]
    countries: VKCountryDTO[]
    mobile_views: number
    views: number
    visitors: number
  }
}
