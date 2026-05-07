import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async function handler(req, res) {
  await redis.set('ha-count', 0)
  res.send(`รีเซ็ตแล้ว! นับใหม่ตั้งแต่ 0 ห์`)
}
