require('dotenv').config();

const Discord = require('discord.js');
const discordClient = new Discord.Client();

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.on('message', msg => {
  if (msg.content === '!ping') {
    msg.channel.sendreply('pong');
  }
});

discordClient.login(process.env.DISCORDTOKEN);