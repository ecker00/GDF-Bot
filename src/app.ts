import Discord from 'discord.js'

import roles from './roles'
import daily from './daily'

const client = new Discord.Client()

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))
client.on('disconnect', () => console.log('Disconnected.'))
client.on('reconnecting', () => console.log('Reconnecting...'))
client.on('error', err => console.error(err))

// Forward messages from relevant channels
client.on('message', msg => {
  switch (msg.channel.id) {
    case process.env.CHANNEL_ID_ROLES:
      roles(msg)
      break

    case process.env.CHANNEL_ID_DAILY:
      daily(msg)
      break
  }
});
 
client.login(process.env.TOKEN);
