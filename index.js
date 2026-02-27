require('dotenv').config();
const map = require('./variables');

const { Client } = require('discord.js-selfbot-v13');
const client = new Client({checkUpdate: false});

client.on('ready', () => {
  console.log('Discord PLUS is ready!');

  client.channels.cache
    .get(map.startChannel)
    ?.send('Start...');

  let button1Id = 'raid_melee';
  
  // click 1st button
  client.channels.fetch('1354880760917528787')
    .then(channel => channel.messages.fetch('1476926871705878625'))
    .then(message => {
      setTimeout(()=> {
        return message.clickButton('raid_melee');
      },1000 * 2); //delay, sec
    })
    .then(() => console.log('Clicked melee'))
    .catch(console.error);
});

client.login(process.env.TOKEN);  