require('dotenv').config();
const map = require('./variables');

const { Client } = require('discord.js-selfbot-v13');
const client = new Client({checkUpdate: false});

client.on('ready', async () => {
  console.log('Discord PLUS is ready!');
  client.channels.cache.get(map.startChannel).send('Start...');
});

//anti-spam variable
let monkey = 2;

//begin searching at position 21, skip mention id <@...>(22 chars total)
let searchPosition = 21;

client.on("messageCreate", message => {
  if (map.usersId.includes(message.author.id)){
      if (message.channelId == map.newGienaChannelId && message.content.startsWith(map.mentionStart + map.newGienaRole) && monkey > 0){
          if (message.content.includes('+', searchPosition) || message.content.includes('1', searchPosition)){
            setTimeout(()=> {
              client.channels.cache.get(map.newGienaChannelId).send('+')
              },1000 * 0.44); //delay in ms
            monkey--;
          }
      }
}});

client.login(process.env.TOKEN);