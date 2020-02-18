import path from "path";
import Discord from "discord.js";

import botConfig from "../../bot-config";
const config = botConfig.dailyChallenge;

// TODO: Add support for multiline!

/*
Example of supported inputs:
  Day 40: My text
  Day 40. My text
  Day 40 - My text
  Day 040: My text
  Day 40 My text
  Day 100 (woot woot): My name is Pyan.
*/

interface Milestone {
  day: number;
  image: string;
  personalMessage: string;
  publicMessage: string;
}

class DailyChallenge {
  listenChannel: string;
  responseChannel: string;
  milestones: Milestone[];

  constructor() {
    this.listenChannel = config.listenChannel;
    this.responseChannel = config.responseChannel;
    this.milestones = config.milestones;
  }

  execute(message: Discord.Message): void {
    // HOW TO DO MULTI LINE STUFF?!?

    // Parse input
    const meta = message.content.match(
      /^Day\s*(?<day>\d+)\s*:\s*(?<content>.*)/im
    );
    if (!meta) {
      message.react("❌");
      return;
    }

    const day = parseInt(meta.groups.day);
    if (day < 1 || day > 100000) {
      message.react("❌");
      return;
    }

    const milestone = this.milestones.find(m => m.day === day);

    // Send PM with badge
    if (milestone && false) {
      const root = path.dirname(require.main.filename);
      const filePath = path.join(root, milestone.image);
      const fileName = path.basename(milestone.image);
      message.author.send(milestone.personalMessage, {
        embed: {
          thumbnail: {
            url: `attachment://${fileName}`
          }
        },
        files: [
          {
            attachment: filePath,
            name: fileName
          }
        ]
      });
    }

    // Send response channel celebration
    if (milestone) {
      const reply = milestone.publicMessage.replace(
        "%s",
        `<@user ${message.author.id}>`
      );
      const replyChannel = message.guild.channels.find(
        c => c.name === this.responseChannel
      ) as Discord.TextChannel;
      replyChannel.send(reply);
    }

    // React to original message
    message.react(milestone ? "⭐" : "❤");

    return;
  }
}

const dailyChallenge = new DailyChallenge();
export default dailyChallenge;
