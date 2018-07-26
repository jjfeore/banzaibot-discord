require('dotenv').config();

const Discord = require('discord.js');
const discordClient = new Discord.Client();
const Twitter = require('twitter');
const twitterClient = new Twitter({
    consumer_key: process.env.CONSUMERKEY,
    consumer_secret: process.env.CONSUMERSECRET,
    access_token_key: process.env.TOKENKEY,
    access_token_secret: process.env.TOKENSECRET
});

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.on('message', msg => {
  if (msg.content === '!ping') {
    msg.channel.send('pong');
  }

  console.log(`Last message: ${discordClient.user.lastMessage}`);
});

discordClient.login(process.env.DISCORDTOKEN);

