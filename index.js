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
      if (message.channelId == map.bratosikChannelId && message.content.startsWith(map.mentionStart + map.raidRole) && monkey > 0){
          if (message.content.includes('1', searchPosition) || message.content.includes('2', searchPosition)){
            setTimeout(()=> {
              message.react('✅')
              },1000 * 3); //delay, sec
            monkey--;
          }
      }
}});

client.login(process.env.TOKEN);