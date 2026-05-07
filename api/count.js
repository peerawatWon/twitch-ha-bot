const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

export default async function handler(req, res) {
  if (!url || !token) {
    return res.status(500).json({ error: 'Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN' })
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['INCR', 'ha-count']),
    })

    const data = await response.json()
    if (!response.ok) {
      console.error('Upstash count error:', data)
      return res.status(response.status).json({ error: data.error ?? 'Upstash error' })
    }

    res.send(`ฟุมิเตี้ยนเสียงหลงห์กันแล้ว ${data.result} ครั้งห์`)
  } catch (error) {
    console.error('API /api/count error:', error)
    res.status(500).json({ error: error?.message ?? 'Internal server error' })
  }
}
