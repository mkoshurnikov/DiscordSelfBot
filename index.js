require('dotenv').config();
const map = require('./variables');

const { Client } = require('discord.js-selfbot-v13');
const client = new Client({checkUpdate: false});

client.on('ready', async () => {
  console.log('Discord PLUS is ready!');
  client.channels.cache.get(map.startChannel).send('Start...');
});

//anti-monkey variable
let monkey = 3;

//begin searching at position 21, skip mention id <@...>(22 chars total)
let searchPosition = 21;

client.on("messageCreate", message => {
  if (message.author.id == map.michelleId || message.author.id == map.dangeroId || message.author.id == map.stickId){
      if (message.channelId == map.gienaChannelId && message.content.startsWith(map.mentionStart + map.gienaRole) && monkey > 0){
          if (message.content.includes('+', searchPosition) || message.content.includes('1', searchPosition)){
            client.channels.cache.get(map.gienaChannelId).send('+');
            monkey--;
          }
      }
}});

client.login(process.env.TOKEN);