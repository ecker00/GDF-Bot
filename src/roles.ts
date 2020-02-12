import Discord from 'discord.js'

const roles = (msg: Discord.Message) => {

  msg.author.send('This is a private response from roles')
  // if (msg.content === 'ping') {
  //   msg.reply('A ping was sent to roles');
  // }
}

export default roles