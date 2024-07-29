require('dotenv').config()

const { Client } = require('discord.js-selfbot-v13');
const client = new Client({checkUpdate: false});

client.on('ready', async () => {
  console.log('Discord PLUS is ready!');
});

client.on("messageCreate", message => {
  if (message.author.id == '223859404234031114' && message.channelId == '1249406942254727190' 
    && message.content.startsWith('<@&1249407264838909952') && message.content.includes('+') && makaka){
    client.channels.cache.get('1249406942254727190').send('+');
    makaka = false;
}});

//anti-makaka test, multiple plus on touka+gb DP
let makaka = true;

// client.on("messageCreate", message => {
//     if (message.content == 'SSSvin' && message.author.id == '151601420456558592' && makaka) {
//         client.channels.cache.get('1249406942254727190').send('+');
//         makaka = false;
//     }
// });

// client.on("messageCreate", message => {
//   if (message.content == 'SSSvin' && message.author.id == '865855096709840926' && makaka) {
//       client.channels.cache.get('1249406942254727190').send('+');
//       makaka = false;
//   }
// });

//Na touky v DP
// client.on("messageCreate", message => {
//     if (message.content == 'SSSvin' && message.author.id == '151601420456558592') {
//         client.channels.cache.get('1249406942254727190').send('+');
//     }
// });

//Na mkra v DP
// client.on("messageCreate", message => {
//     if (message.author.id == '292732603726036993' && message.content.includes('+')){
//         if (message.content.startsWith('<@&1249407264838909952>  1') || message.content.startsWith('<@&1249407264838909952> 1')){
//             client.channels.cache.get('1249406942254727190').send('+');
//     }
// }});

//Na dangero v discord gien
client.on("messageCreate", message => {
    if (message.author.id == '335105483662819328' && message.channelId == '1236328199298748416' 
      && message.content.startsWith('<@&1236305228794433648') && message.content.includes('+') && makaka){
      client.channels.cache.get('1236328199298748416').send('+');
      makaka = false;
}});

//Na miracle v discord gien
// client.on("messageCreate", message => {
//   if (message.author.id == '195945465315983362' && message.content.startsWith('<@&1236305228794433648') && makaka){
//     client.channels.cache.get('1236328199298748416').send('+');
//     makaka = false;
// }});

//moy
client.login(process.env.TOKEN);

//artezzy
//client.login('');
