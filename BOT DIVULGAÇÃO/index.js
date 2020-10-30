const colors = require('colors')

console.clear()
process.title = "Anúncio BOT"

var configs = {
    tokens: {
        1: ""
    },
    num_tokens: 1, // número de tokens colocado acima
    prefix: "",
    id_permissao: "" // seu ID
}

let members = []

for (let i = 1; i < (configs.num_tokens + 1); i++) {
    const Discord = require('discord.js')
    const bot = new Discord.Client()

    const token = configs.tokens[i];

    bot.on("ready", () => {
        console.log(colors.green('\nBot iniciado com sucesso\n\nNome: ' + bot.user.tag))
    })

    bot.on("message", (message) => {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;
        const prefix = configs.prefix
        let args = message.content.slice(prefix.length).trim().split(" ");

        if (!message.content.startsWith(prefix)) return;
        if (message.member.id != configs.id_permissao) return

        if (args[0] === "divulgar") {
            bot.guilds.get(message.guild.id).members.map(user => {
                if (user.user.id === bot.user.id) {
                    return
                } else {
                    if (!members.includes(user.id)) {
                        var members1 = 0
                        var confirmed = 0
                        var sucess = 0
                        var fails = 0
                        var motivo = args.join(' ').replace(`${prefix}divulgar `, '')

                        if (!motivo) {
                            return message.reply(`você deve inserir um anúncio`)
                        }

                        members1 = members1 + 1
                        process.title = `[ANUNCIO] Membros: ${members1} | Sucessos: ${sucess} | Fails: ${fails}`
                        let embed = new Discord.RichEmbed()
                            .setTitle('Anúncio')
                            .setColor('#ff33cc')
                            .setDescription(motivo)

                        bot.guilds.get(message.guild.id).members.get(user.user.id).send(embed).then(msg => {
                            members.push(user.user.id)
                            confirmed = confirmed + 1
                            sucess = sucess + 1
                            process.title = `[ANUNCIO] Membros: ${members1} | Sucessos: ${sucess} | Fails: ${fails}`
                            console.log(colors.green(`[+]`) + ` ${user.user.username}` + colors.gray(` [${sucess}]`) + ` (${bot.user.tag})`)
                        }).catch(() => {
                            confirmed = confirmed + 1
                            fails = fails + 1
                            process.title = `[ANUNCIO] Membros: ${members1} | Sucessos: ${sucess} | Fails: ${fails}`
                            console.error(colors.red('[-]') + ` ${user.user.username}` + colors.gray(` [${sucess}]`) + ` (${bot.user.tag})`)
                        })
                    }
                }
            })
        }
    })

    bot.login(token)
}