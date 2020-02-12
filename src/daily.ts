import Discord from 'discord.js'

const daily = (msg: Discord.Message) => {

  if (msg.content === 'ping') {
    msg.reply('A ping was sent to daily');
  }
}

export default daily