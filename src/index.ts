import dotenv from 'dotenv'
dotenv.config()

import { Telegraf } from 'telegraf'

import { fetchVKGroup, fetchVkStats } from './api/vk'
import { dayjs } from './lib/dayjs'

import { CONFIG } from './config'

const bot = new Telegraf(CONFIG.BOT_TOKEN)

bot.telegram.setWebhook(`${CONFIG.APP_URL}/bot${CONFIG.BOT_TOKEN}`)
// @ts-ignore
bot.startWebhook(`/bot${CONFIG.BOT_TOKEN}`, null, process.env.PORT || 3000)

bot.command('info', async (ctx) => {
  const {
    response: [group],
  } = await fetchVKGroup()
  const htmlMessage = `
<b>${group.name}</b> 

<b>Колличество подписчиков:</b> <i>${group.members_count}</i>
`

  return ctx.replyWithHTML(htmlMessage)
})

bot.command('stats', async (ctx) => {
  // TODO: Запрашивать данные только за сутки
  const {
    response: [today],
  } = await fetchVkStats()

  const from = dayjs.unix(today.period_from).format('DD-MM-YYYY HH:mm')
  const to = dayjs.unix(today.period_to).format('DD-MM-YYYY HH:mm')

  const htmlMessage = `
<b>Статистика за период:</b> <i>${from} - ${to}</i>

<b>Новых подписчиков:</b> <i>${today.activity.subscribed || 0}</i>
<b>Отписки:</b> <i>${today.activity.unsubscribed || 0}</i>
<b>Лайки:</b> <i>${today.activity.likes || 0}</i>
<b>Репосты:</b> <i>${today.activity.copies || 0}</i>
<b>Скрыли:</b> <i>${today.activity.hidden || 0}</i>
<b>Новых комментариев:</b> <i>${today.activity.comments || 0}</i>

`
  return ctx.replyWithHTML(htmlMessage)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
