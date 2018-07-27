require('dotenv').config();

const Discord = require('discord.js');
const discordClient = new Discord.Client();
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
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

//  console.log(`Last message: ${discordClient.user.lastMessage}`);
});

discordClient.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    if (!channel) return;

    const canvas = Canvas.createCanvas(320, 107);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./discordwallpaper.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = '18px sans-serif';
    ctx.lineWidth = 4;
    ctx.fillStyle = '#ee381d';
    ctx.strokeStyle = '#9a234f';
    ctx.strokeText('Welcome to the server,', 111, 40);
    ctx.fillText('Welcome to the server,', 111, 40);

    ctx.font = applyText(canvas, member.displayName + '!');
    ctx.lineWidth = 4;
    ctx.fillStyle = '#ee381d';
    ctx.strokeStyle = '#9a234f';
    ctx.strokeText(member.displayName + '!', 111, 85);
    ctx.fillText(member.displayName + '!', 111, 85);

    ctx.beginPath();
    ctx.arc(53, 53, 48, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 10, 10, 96, 96);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Welcome to the server, ${member}!`, attachment);
});

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    let fontSize = 54;

    do {
        ctx.font = `${fontSize -= 2}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 111);

    return ctx.font;
};

// Test new server member
discordClient.on('message', async message => {
    if (message.content === '!jointest') {
        discordClient.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

discordClient.login(process.env.DISCORDTOKEN);

