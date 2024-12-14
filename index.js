require('dotenv').config();
const map = require('./variables');

const { Client } = require('discord.js-selfbot-v13');
const client = new Client({checkUpdate: false});

client.on('ready', async () => {
  console.log('Discord PLUS is ready!');
  client.channels.cache.get(map.startChannel).send('Start...');
});

//anti-monkey variable
let monkey = 2;

//begin searching at position 21, skip mention id <@...>(22 chars total)
let searchPosition = 21;

client.on("messageCreate", message => {
  if (message.author.id == map.michelleId || message.author.id == map.dangeroId || message.author.id == map.stickId || message.itachisanId){
      if (message.channelId == map.gienaChannelId && message.content.startsWith(map.mentionStart + map.gienaRole) && monkey > 0){
          if (message.content.includes('+', searchPosition) || message.content.includes('1', searchPosition)){
            setTimeout(function(){
              client.channels.cache.get(map.gienaChannelId).send('+')
              },1000 * 0.33);
            monkey--;
          }
      }
}});

client.login(process.env.TOKEN);