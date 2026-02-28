require('dotenv').config();
const map = require('./variables');

const { Client } = require('discord.js-selfbot-v13');
const client = new Client({checkUpdate: false});

client.on('ready', () => {
  console.log('Discord PLUS is ready!');

  client.channels.cache
    .get(map.startChannel)
    ?.send('Start...');

  let antiSpam = 2;
  
  client.on("messageCreate", message => {
    if (!map.usersId.includes(message.author.id)) return;
    if (message.channelId != map.bratosikChannelId) return;
    if (!message.content.startsWith(map.mentionStart + map.raidRole)) return;
    if (antiSpam > 2) return;
    if (message.content.includes('1', map.searchPosition) || message.content.includes('2', map.searchPosition)){
      setTimeout(()=> {
        message.react('✅')
      },1000 * 10); //delay, sec
      antiSpam++;
    }
  });

  client.on("messageCreate", message => {
    if (message.author.id != map.botId) return;
    if (message.channelId != map.bratosikChannelId) return;
    if (!message.content.startsWith(map.mentionStart + map.raidRole)) return;
    setTimeout(()=> {
      message.clickButton(map.meleeButtonId)
        .then(() => console.log("Clicked"))
        .catch(console.error);
      },1000 * 2); //delay, sec
  });

//   // click 1st button
//     client.channels.fetch('1354880760917528787')
//       .then(channel => channel.messages.fetch('1476926871705878625'))
//       .then(message => {
//         setTimeout(()=> {
//           return message.clickButton(map.meleeButtonId);
//         },1000 * 2); //delay, sec
//       })
//       .then(() => console.log('Clicked melee'))
//       .catch(console.error);
// });

client.login(process.env.TOKEN);