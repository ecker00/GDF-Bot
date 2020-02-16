import Discord from 'discord.js';

import config from '../bot-config';
import autoRoles from './commands/autoRoles';
import dailyChallenge from './commands/dailyChallenge';

const client = new Discord.Client();

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`));
client.on('disconnect', () => console.log('Disconnected.'));
client.on('reconnecting', () => console.log('Reconnecting...'));
client.on('error', (err) => console.error(err));

// Message router
client.on('message', (message) => {
  const channel = message.guild.channels.get(message.channel.id);
  if (!channel) return; // Only operate with guild messages
  
  if (channel.name === autoRoles.listenChannel) {
    autoRoles.execute(message);
  }
  
  if (channel.name === dailyChallenge.listenChannel) {
    dailyChallenge.execute(message);
  }

});

client.login(config.token);
