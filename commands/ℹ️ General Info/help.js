const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db");

module.exports = {
  name: "help",
  aliases: ['h', 'helppls'],
  description: "Shows all available bot commands.",
  execute: async (client, message, args) => {

    var prefix = db.fetch(`guildprefix_${message.guild.id}`);
    if (!prefix) {
      var prefix = ".";
    }
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];
      var commandnum = [];
      readdirSync("./commands/").forEach((dir, files) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
    
        );

        const cmds = commands.map((command) => {
        
          let file = require(`../../commands/${dir}/${command}`);
          
          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });
 
        let data = new Object();
        let data1 = new Object();
       
        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(", "),
        };

        categories.push(data);

      });

   let commandscount = "214";

      const embed = new MessageEmbed()
        .setTitle(`📬 Potrebna Vam je pomoć ? Ovde se nalaze sve moje komande :\n Koristite \`${prefix}help\` nakon čega sledi ime komande da biste dobili više dodatnih informacija o komandi. Na primer : \`${prefix}help\`.`)



        .addField("**• BOT CODE INFO**", "`dependencies`, `modules`, `servers`, `stats`, `uptime`\n\n**• GENERAL INFO**\n`djs`, `help`, `invite`, `links`, `ping`, `serverstats`, `vote`, **`privacy`**\n\n** ** **• VLASNICI**\n`shell`, `control`, `eval`, `usage`\n\n**• IGRE POGAĐANJA** \n `find-words`, `guess-number`, `lovecalc`\n\n **• ROĐENDANDSKE KOMANDE**\n `set-birthday`, `check-birthday`\n\n **• DETEKTOR RUŽNIH REČI**\n `anti-badwords`")


        .addField("**• AUTOMOD**", "`anti-alt`, `antilink`, `autonick`, `auto-official-role`, `auto-official-role-disable`, `autorole`, `role-all`\n\n**• ZABAVA**\n`afk`, `animesearch`, `ascii`, `baka`, `beep`, `dumb`, `calc`, `cattext`, `dice`, `eightball`, `flipcoin`, `fliptext`, `hack`, `iq`, `joke`, `kill`, `messages`, `poke`, `poll`, `ratewaifu`, `rps`, `sneeze`, `waifu`, `youtube`, `zalgo`\n\n **• INFORMACIJE O LJUDIMA**\n `Profile`\n\n **• BIOGRAFIJA**\n `set-bio`, `bio-reset`, `check-bio`\n\n **• PRILAGOĐENE KOMANDE**\n `cc-create`, `cc-delete`, `cc-list`")


        .addField("**• LEVELOVANJE**", "`rank`\n\n**• EKONOMIJA**\n`addmoney`, `balance`, `beg`, `bet`, `buy`, `daily`, `deposit`, `monthly`, `pay`, `profile`, `roulette`, `weekly`, `withdraw`, `work`\n\n**• LOGOVI**\n`logs-ticket`, `set-logs`, `remove-logs`\n\n**• NAGRADNE IGRE**\n`edit`, `list`, `end`, `reroll`, `start`,`create`, `cancel`\n\n**• MUZIKA**\n`24/7`, `bassboost`, `dc`, `connect`, `lyrics`, `np`, `pause`, `play`, `queue`, `resume`, `shuffle`, `skip`, `stop`, `volume`\n\n**• PRIJAVA**\n`suggest`, `bug-report`\n\n**• DOBRODOŠLICA I IZLAZAK**\n`leave`, `set-welcome`, `set-leave`, `welcome`")


        


        .addField("**• TIKET**", "`add`, `close`, `delete`, `new`, `open`, `remove`, `setup`\n\n**• REAKCIONI ROLE**\n`reaction-role`, `reaction-role-remove`\n\n**• IGRICE**\n`csgo`, `poke`, `slots`, `tictactoe`\n\n**• SLIKE**\n`3000yr`, `approved`, `batslap`, `beautiful`, `brazzers`, `burn`, `cat`, `challenger`, `cuddle`, `dict`, `distort`, `dog`, `ddungeon`, `facechange`, `fire`, `flatearth`, `foxgirl`, `gay`, `hug`, `kiss`, `love`, `magik`, `meme`, `qrcode`, `randomav`, `rip`, `scary`, `slap`, `triggered`, `tickle`, `tweet`, `vs`, `wanted`")


        .addField("**• MODERACIJA**", "`announce`, `ban`, `color`, `hide`, `kick`, `lock`, `maintainence`, `nuke`, `prune`, `purge`, `say`, `sendembed`, `serverlock`, `serverunlock`, `set`, `slowmode`, `stealemoji`, `unban`, `unhide`, `unlock`, `vcid`, `voicedeafen`, `voicekick`, `voicemove`, `voicemute`, `voiceundeaf`, `voiceunmute`, `warn`, `warns`\n\n**• CHATBOT**\n`remove-channel`, `set-channel`\n\n**• JEDINSTVENOSTI**\n`avatar`, `covid`, `id`, `members`, `roleid`, `github`, `servericon`, `serverinfo`, `time`, `info`, `weather`")

      

        .setFooter(
          `Zatraženo od ${message.author.tag} | Ukupno ${commandscount} Komandi`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands! (Some Commands will show on help And they are working just Command is disabled in detaied help command)`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.help.usage}}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.help.description
            ? command.help.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
          
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};