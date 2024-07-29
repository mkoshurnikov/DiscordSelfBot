require('dotenv').config()

const { Client } = require('discord.js-selfbot-v13');
const client = new Client({checkUpdate: false});

client.on('ready', async () => {
  console.log('Discord PLUS is ready!');
  client.channels.cache.get('1249406942254727190').send('Start...');
});

//anti-monkey variable
let monkey = 3;

//dngr
client.on("messageCreate", message => {
    if (message.author.id == '335105483662819328' && message.channelId == '1236328199298748416' 
      && message.content.startsWith('<@&1236305228794433648') && message.content.includes('+') && monkey > 0){
      client.channels.cache.get('1236328199298748416').send('+');
      monkey--;
}});

//stck
client.on("messageCreate", message => {
  if (message.author.id == '322895366221463573' && message.channelId == '1236328199298748416' 
    && message.content.startsWith('<@&1236305228794433648') && message.content.includes('+') && monkey > 0){
    client.channels.cache.get('1236328199298748416').send('+');
    monkey--;
}});

client.login(process.env.TOKEN);