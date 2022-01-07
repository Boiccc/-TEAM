const Discord = require("discord.js");
const cnf = require('../../config.js');

module.exports = {
  name: "invite",
  aliases: ["getbot"],
  execute: async(client, message, args, data, db) => {
try {
const embed = new Discord.MessageEmbed()
  .setTitle("⛄ Šandor × Gang 🎄")
  .setColor('RANDOM')
  .addField("Pozovite bota na Vaš server", "[Kliknite OVDE kako biste pozvali bota](https://discord.com/api/oauth2/authorize?client_id=927248834248179742&permissions=8&scope=bot)\n")
  .addField("Discord Server", `[Pridruži se official-nom serveru](https://discord.gg/eGuKQhT6QW)`)
  .setFooter("Bota kreirao Š TEAM")
  .setImage(`https://images-ext-1.discordapp.net/external/eWe3DimWXdYRwGPHx_ai-sOKVNdS6YPc7s2ofj2Vbco/%3Fsize%3D1024/https/cdn.discordapp.com/icons/866236742739034120/a_5acf299e4ee75656b404686db3d1d2ff.gif`)
  .setTimestamp()
message.author.send({embed})

message.channel.send({embed: {
            color: 3447003,
            description: "Proverite Vaš DM!"
        }})
} catch (err) {
    message.channel.send({embed: {
                color: 16734039,
                description: "Došlo je do greške..."
            }})
}
}
}
module.exports.help = {
    name: "invite",
    description: "Sends a bot invite",
    usage: "invite",
    type: "General"  
}