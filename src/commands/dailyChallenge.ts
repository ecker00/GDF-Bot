import path from "path";
import Discord from "discord.js";

import botConfig from "../../bot-config";
const config = botConfig.dailyChallenge;

// TODO: Test if it supports bolding / italic day formatting?

/*
Example of supported inputs:
  Day 40: My text
  Day 40. My text
  Day 40 - My text
  Day 040: My text
  Day 40 My text
  Day 100 (woot woot): My name is Pyan.
  *Day 147:* Fixed some bugs
  **Day 147:** Fixed some bugs
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
    const days: { num: number; content: string }[] = [];

    // Parse input
    const lines = message.content.split("\n");
    lines.forEach(line => {
      const meta = line.match(/^Day\s*(?<num>\d+)[:\-\.\s]+(?<content>.*)/i);
      if (meta && meta.groups) {
        const num = parseInt(meta.groups.num);

        // Skip duplicate days in same message
        if (!days.some(d => d.num === num)) {
          days.push({
            num: num,
            content: meta.groups.content
          });
        }
      }
    });

    // No days in input
    if (!days.length) {
      message.react("❌");
      return;
    }

    // Respond to each day
    days.forEach(day => {
      const milestone = this.milestones.find(m => m.day === day.num);

      // Send PM with badge
      if (milestone) {
        const root = path.dirname(require.main.filename);
        const filePath = path.join(root, milestone.image);
        const fileName = path.basename(milestone.image);
        message.author.send(milestone.personalMessage, {
          embed: {
            thumbnail: {
              url: `attachment://${fileName}`
            }
          },
          files: [{ attachment: filePath, name: fileName }]
        });
      }

      // Send response channel celebration
      if (milestone) {
        const reply = milestone.publicMessage.replace(
          "%s",
          `${message.author.toString()}`
        );
        const replyChannel = message.guild.channels.find(
          c => c.name === this.responseChannel
        ) as Discord.TextChannel;
        replyChannel.send(reply);
      }

      // React to original message
      message.react(milestone ? "⭐" : "❤");
    });
    return;
  }
}

const dailyChallenge = new DailyChallenge();
export default dailyChallenge;
