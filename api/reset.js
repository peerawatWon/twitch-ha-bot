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
      body: JSON.stringify(['SET', 'ha-count', '0']),
    })

    const data = await response.json()
    if (!response.ok) {
      console.error('Upstash reset error:', data)
      return res.status(response.status).json({ error: data.error ?? 'Upstash error' })
    }

    res.send(`รีเซ็ตแล้ว! นับใหม่ตั้งแต่ 0 ห์`)
  } catch (error) {
    console.error('API /api/reset error:', error)
    res.status(500).json({ error: error?.message ?? 'Internal server error' })
  }
}
