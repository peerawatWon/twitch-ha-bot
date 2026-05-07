const tmi = require('tmi.js');

const CONFIG = {
  username: process.env.BOT_USERNAME,
  oauth:    process.env.BOT_OAUTH,
  channel:  process.env.BOT_CHANNEL,
  keyword:  'ห์',
  message:  (count) => `ฟุมิเตี้ยนเสียงหลงห์กันแล้ว ${count} ครั้งห์`,
  cooldown: 3000,
};

const client = new tmi.Client({
  identity: { username: CONFIG.username, password: CONFIG.oauth },
  channels: [CONFIG.channel],
});

let count = 0;
let lastSent = 0;

client.connect().then(() => {
  console.log(`✅ Bot online! channel: ${CONFIG.channel}`);
}).catch(console.error);

client.on('message', (channel, tags, message, self) => {
  if (self) return;
  if (message.includes(CONFIG.keyword)) {
    count++;
    console.log(`${tags['display-name']}: "${message}" → ครั้งที่ ${count}`);
    const now = Date.now();
    if (now - lastSent >= CONFIG.cooldown) {
      lastSent = now;
      client.say(channel, CONFIG.message(count));
    }
  }
  const isMod = tags.mod || tags['user-type'] === 'mod';
  const isBroadcaster = tags.username === CONFIG.channel;
  if (message.trim() === '!resetห์' && (isMod || isBroadcaster)) {
    count = 0;
    client.say(channel, `🔄 รีเซ็ตแล้ว! นับใหม่ตั้งแต่ 0 ห์`);
  }
});