const map = require('./variables');

function siegePlus(client) {
  console.log('SiegeBot started...');

  let antiSpam = 0;
  let clicked = false;
  let allowedMinutes = [0, 1, 59];

  //bot v1 and people reaction
  client.on("messageCreate", message => {
    if (!map.usersId.includes(message.author.id)) return;
    if (message.channelId != map.bratosikChannelId) return;
    if (!message.content.startsWith(map.mentionStart + map.raidRole)) return;
    if (antiSpam > 0) return;

    let messageCreatedAtMinute = message.createdAt.getMinutes();
    if (!allowedMinutes.includes(messageCreatedAtMinute)) return;

    if (message.content.includes('1', map.searchPosition) || message.content.includes('2', map.searchPosition)) {
      setTimeout(() => {
        message.react('✅')
      }, 2241 * 1); //delay, sec
      antiSpam++;
    }
  });



  //bot v2 button click
  client.on("messageCreate", message => {
    if (clicked) return;
    if (message.author.id != map.petrBotId) return;
    if (message.channelId != map.bratosikChannelId) return;
    if (!message.content.startsWith(map.mentionStart + map.raidRole)) return;

    let messageCreatedAtMinute = message.createdAt.getMinutes();
    if (!allowedMinutes.includes(messageCreatedAtMinute)) return;

    setTimeout(() => {
      message.clickButton(map.meleeButtonId)
        .then(() => console.log("Clicked"))
        .catch(console.error);
    }, 1546 * 1); //delay, sec
    antiSpam++;
  });
}

module.exports = {
  siegePlus
};