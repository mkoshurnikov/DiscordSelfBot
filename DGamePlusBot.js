const map = require('./variables');
let click = false;

async function DGamePlus(client, sessionId) {
  console.log('DGame bot started...')

  client.on("raw", async (packet) => {
    if (packet.t === "MESSAGE_UPDATE" && packet.d.id === map.ssMessageId) {
      //console.log(JSON.stringify(p.d, null, 2));

      //const steamMenu = findSelectMenu(p.d.components, "ticket_select_self_serve_steam_0");

      findAllSelectMenu(packet.d.components);
      const steamMenus = findAllSelectMenusByPartial(packet.d.components, "steam");

      if (!steamMenus.length) return console.log("Steam menu not found.");

      for (let menuIndex = 0; menuIndex < steamMenus.length; menuIndex++) {
        const menu = steamMenus[menuIndex];
        console.log(`\nMenu ${menuIndex}: ${menu.placeholder}, CustomId = ${menu.custom_id}, Id = ${menu.id}`);

        // Filter options by partial name
        const matchingOption = menu.options.find(opt => opt.value.includes("3764200")
          || opt.label.toLowerCase().includes("requiem")); // search option by label or gameID

        if (!matchingOption) {
          console.log(`  Matching option of ${menu.placeholder} not found.`);
        } else {
          console.log(`  Option found, label = ${matchingOption.label}, Value = ${matchingOption.value}`);
          if (menu.disabled) {
            console.log(`Menu ${menuIndex}: ${menu.placeholder}, "${menu.custom_id}" is still disabled.`);
            continue;
          }

          if (click) return;   // prevent duplicates
          click = true;

          console.log(`Menu ${menuIndex}: ${menu.placeholder}, "${menu.custom_id}" is active.`);
          console.log(`Selecting Steam option: ${matchingOption.label}, ${matchingOption.value}`);

          setTimeout(async () => {
            console.log(`Selecting steam option: ${matchingOption.label}, ${matchingOption.value}...`);

            let resStatus = await selectOption(matchingOption.value, menu.custom_id, sessionId);

            if (resStatus.ok) {
              console.log(`Steam option: ${matchingOption.label}, ${matchingOption.value} has been successfully selected.`);
            } else {
              click = false;
              console.log(`Fail to select: ${matchingOption.label}, ${matchingOption.value}.`);
            }
          }, 746 * 1); // delay, ms
        }
      }
    }
  });
}

async function selectOption(optionValue, menuCustomId, sessionId) {
  const nonce = Date.now().toString();

  const res = await fetch("https://discord.com/api/v10/interactions", {
    method: "POST",
    headers: {
      Authorization: process.env.TOKEN,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: 3,
      nonce: nonce,
      guild_id: map.dGameBotGuildId,
      channel_id: map.ssChannelId,
      message_id: map.ssMessageId,
      application_id: map.dGameBotId,
      session_id: sessionId,
      data: {
        component_type: 3,
        custom_id: menuCustomId,
        values: [optionValue]
      }
    })
  });

  return res;
}

function findAllSelectMenusByPartial(components, partialName) {
  partialName = partialName.toLowerCase();
  const matches = [];

  for (const row of components) {
    if (!row.components) continue;

    for (const comp of row.components) {
      // If this is an ActionRow (type 1), go deeper
      if (comp.type === 1 && comp.components) {
        for (const subComp of comp.components) {
          if (subComp.type === 3 && subComp.custom_id.toLowerCase().includes(partialName)) {
            matches.push(subComp);
          }
        }
      }

      // If the component itself is a select menu
      if (comp.type === 3 && comp.custom_id.toLowerCase().includes(partialName)) {
        matches.push(comp);
      }
    }
  }
  return matches;
}

function findSelectMenu(components, customId) {
  for (const row of components) {
    if (!row.components) continue;

    for (const comp of row.components) {
      // If comp is an ActionRow (type 1), go deeper
      if (comp.type === 1 && comp.components) {
        for (const subComp of comp.components) {
          if (subComp.type === 3 && subComp.custom_id === customId) {
            return subComp;
          }
        }
      }

      // If comp itself is the select menu
      if (comp.type === 3 && comp.custom_id === customId) {
        return comp;
      }
    }
  }
  return null;
}

function findAllSelectMenu(components) {
  const menuItems = [];

  for (const row of components) {
    if (!row.components) continue;

    for (const comp of row.components) {
      // If this is an ActionRow (type 1), go deeper
      if (comp.type === 1 && comp.components) {
        for (const subComp of comp.components) {
          if (subComp.type === 3) {
            menuItems.push(subComp);
          }
        }
      }
      // If the component itself is a select menu
      if (comp.type === 3) {
        menuItems.push(comp);
      }
    }
  }
  menuItems.forEach((menu, menuIndex) => {
    console.log(`\nMenu ${menuIndex}: ${menu.placeholder}, CustomId = ${menu.custom_id}, Id = ${menu.id}`);
    menu.options.forEach((option, optionIndex) => {
      console.log(`  Option ${optionIndex}: Label = ${option.label}, Value = ${option.value}`);
    });
  });
}

module.exports = {
  DGamePlus
};