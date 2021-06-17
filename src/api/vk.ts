// stats.get
import { VKGroupDTO, VKStatsDTO } from './vk.dto'
import { ResponseAPIDTO } from './common'
import { baseVkApiRequest } from '../lib/requests'

import { CONFIG } from '../config'

export const fetchVKGroup = async () => {
  const response = await baseVkApiRequest.get<
    ResponseAPIDTO<VKGroupDTO & { members_count: number; description: string }>
  >(`groups.getById`, {
    searchParams: {
      group_ids: CONFIG.VK_GROUP_ID,
      fields: 'members_count,description',
      access_token: CONFIG.VK_CLIENT_ACCESS_TOKEN,
      v: CONFIG.VK_API_VERSION,
    },
  })

  return response.body
}

export const fetchVkStats = async () => {
  const response = await baseVkApiRequest.get<ResponseAPIDTO<VKStatsDTO>>('stats.get', {
    searchParams: {
      group_id: CONFIG.VK_GROUP_ID,
      access_token: CONFIG.VK_CLIENT_ACCESS_TOKEN,
      v: CONFIG.VK_API_VERSION,
    },
  })

  return response.body
}
