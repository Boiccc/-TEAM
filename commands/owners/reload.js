  const config = require('../../config.js');

module.exports = {
    name: "reload",
    aliases: ["load"],
    category: "Developer",
    description: "Reloades the provided command !!",
    example: `${config.Prefix}reload Fun pp`,

    execute: async (client, message, args) => {
        
        if (message.author.id !== "870373430967549992") {
            return message.channel.send("Reloadovano");
        }

        if(!args[0]) return message.reply(`Provide the category & commands to reload !! \`reload [Category] [Command] okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk?????????\``)
        if(!args[1]) return message.reply(`Provide a command to reload \`${config.Prefix}reload [Category] [Command]\``)

        let category = args[0].toLowerCase()
        let command = args[1].toLowerCase()
      
        try {
            delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)];
            client.commands.delete(command);
            
            const pull = require(`../../commands/${category}/${command}.js`)
            client.commands.set(command, pull)

            return message.channel.send(`Reloaded Command: **\`${command}\`**`)

        } catch (error) {
            return message.reply(` Cannot reload **\`${command}\`**\`\`\`${error}\`\`\``)
        }

    }
}