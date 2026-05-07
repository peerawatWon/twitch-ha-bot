import tmi from 'tmi.js'

const TWITCH_USERNAME = process.env.TWITCH_USERNAME
const TWITCH_OAUTH_TOKEN = process.env.TWITCH_OAUTH_TOKEN
const TWITCH_CHANNEL = process.env.TWITCH_CHANNEL
const COUNT_API_URL = process.env.COUNT_API_URL

if (!TWITCH_USERNAME || !TWITCH_OAUTH_TOKEN || !TWITCH_CHANNEL || !COUNT_API_URL) {
  console.error('Missing one of TWITCH_USERNAME, TWITCH_OAUTH_TOKEN, TWITCH_CHANNEL, COUNT_API_URL')
  process.exit(1)
}

const client = new tmi.Client({
  identity: {
    username: TWITCH_USERNAME,
    password: TWITCH_OAUTH_TOKEN,
  },
  channels: [TWITCH_CHANNEL],
})

client.on('message', async (channel, tags, message, self) => {
  if (self) return

  if (message.includes('ห์')) {
    console.log(`+1 count from ${tags['display-name'] || tags.username}: ${message}`)
    try {
      const response = await fetch(COUNT_API_URL)
      const text = await response.text()
      console.log('Count response:', text)
    } catch (error) {
      console.error('Failed to call count API:', error)
    }
  }
})

client.on('connected', (addr, port) => {
  console.log(`Connected to ${addr}:${port} and listening for chat...`)
})

client.connect().catch((error) => {
  console.error('Twitch chat connect failed:', error)
})
