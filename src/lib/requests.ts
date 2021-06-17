import got from 'got'

export const baseVkApiRequest = got.extend({
  prefixUrl: 'https://api.vk.com/method',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})
