const map = require('./variables');

function siegePlus(client) {
  console.log('SiegeBot started...');

  let antiSpam = 2;

  //bot v1 and people reaction
  client.on("messageCreate", message => {
    if (!map.usersId.includes(message.author.id)) return;
    if (message.channelId != map.bratosikChannelId) return;
    if (!message.content.startsWith(map.mentionStart + map.raidRole)) return;
    if (antiSpam > 2) return;

    if (message.content.includes('1', map.searchPosition) || message.content.includes('2', map.searchPosition)) {
      setTimeout(() => {
        message.react('✅')
      }, 1000 * 10); //delay, sec
      antiSpam++;
    }
  });

  //bot v2 button click
  client.on("messageCreate", message => {
    if (message.author.id != map.petrBotId) return;
    if (message.channelId != map.bratosikChannelId) return;
    if (!message.content.startsWith(map.mentionStart + map.raidRole)) return;

    setTimeout(() => {
      message.clickButton(map.meleeButtonId)
        .then(() => console.log("Clicked"))
        .catch(console.error);
    }, 1000 * 2); //delay, sec
  });
}

module.exports = {
  siegePlus
};