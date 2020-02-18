import Discord from "discord.js";

import botConfig from "../../bot-config";
const config = botConfig.autoRoles;

class AutoRoles {
  listenChannel: string;
  roleNames: string[];

  constructor() {
    this.listenChannel = config.listenChannel;
    this.roleNames = config.availableRoles;
  }

  execute(message: Discord.Message): void {
    // Validate and parse input
    if (!message.content.startsWith("!")) return;
    const newRoles: Discord.Role[] = [];
    const reqRoles = message.content.replace(/\!/g, "").split(/\s+/);
    if (!reqRoles.length) return;

    let alreadyHasRole = false;
    const member = message.guild.member(message.author.id);

    // Find roles to assign
    reqRoles.forEach(reqRole => {
      if (this.roleNames.includes(reqRole)) {
        // Check if role is already assigned
        if (member.roles.some(r => r.name === reqRole)) {
          alreadyHasRole = true;

          // Enqueue valid role
        } else {
          const role = message.guild.roles.find(role => role.name === reqRole);
          newRoles.push(role);
        }
      }
    });

    // You got that role buddy
    if (alreadyHasRole) {
      message.react("😐");
    }

    // Assign roles
    if (newRoles.length) {
      member
        .addRoles(newRoles)
        .then(() => message.react("👍")) // Success
        .catch(err => {
          console.error(err);
          message.react("💥");
        }); // Request failed
    } else {
      message.react("❌"); // No valid roles requested
    }

    return;
  }
}

const autoRoles = new AutoRoles();
export default autoRoles;
