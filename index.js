require('dotenv').config();

const map = require('./variables.js');
const siegePlusBot = require('./SiegePlusBot.js');
const DGamePlusBot = require('./DGamePlusBot.js');
const { Client } = require('discord.js-selfbot-v13');

const client = new Client({ checkUpdate: false });

let sessionId;

client.on('ready', () => {
  console.log('Discord PLUS is ready!');

  client.channels.cache
    .get(map.startChannel)
    ?.send('Start...');

  sessionId = client.ws.sessionId || client.ws.shards.first()?.sessionId;

  siegePlusBot.siegePlus(client); // siege
  //DGamePlusBot.DGamePlus(client, sessionId); // dgame
});

client.login(process.env.TOKEN);