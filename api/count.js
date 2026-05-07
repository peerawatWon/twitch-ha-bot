import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async function handler(req, res) {
  const count = await redis.incr('ha-count')
  res.send(`ฟุมิเตี้ยนเสียงหลงห์กันแล้ว ${count} ครั้งห์`)
}
