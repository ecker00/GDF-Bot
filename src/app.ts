import Discord from "discord.js";

import config from "../bot-config";
import autoRoles from "./commands/autoRoles";
import dailyChallenge from "./commands/dailyChallenge";

const client = new Discord.Client();

client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`));
client.on("disconnect", () => console.log("Disconnected."));
client.on("reconnecting", () => console.log("Reconnecting..."));
client.on("error", err => console.error(err));

// Message router
client.on("message", message => {
  if (!message.guild) return; // Only operate with guild messages
  const channel = message.guild.channels.get(message.channel.id);

  switch (channel.name) {
    case autoRoles.listenChannel:
      autoRoles.execute(message);
      break;

    case dailyChallenge.listenChannel:
      dailyChallenge.execute(message);

    default:
      break;
  }
});

client
  .login(config.token)
  .catch(err => console.error("Unable to log in! Error:", err.message));
