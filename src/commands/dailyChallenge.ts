import Discord from 'discord.js';

import botConfig from '../../bot-config';
const config = botConfig.dailyChallenge;

class DailyChallenge {
  listenChannel: string
  roleNames: string[]
  
  constructor() {
    this.listenChannel = config.listenChannel;
    this.roleNames = config.availableRoles;
  }

  execute(message: Discord.Message): void {
    
    // const positive = ['👍','💪','❤','💛','💚','💜','💙','✅'];
    // positive[positive.length * Math.random() | 0]; // Random emoji

    if (message.content === 'ping') {
      message.reply('A ping was sent to daily');
    }
  }

}

const dailyChallenge = new DailyChallenge();
export default dailyChallenge;
