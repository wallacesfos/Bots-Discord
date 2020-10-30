const discord = require('discord.js')
const client = new discord.Client();

client.on("ready", () => {
    console.log('BOT INICIADO COM SUCESSO')
})


client.on('raw', async dados => {
    if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
    if(dados.d.message_id != "ID DA MENSAGEM") return
    
    let servidor = client.guilds.get("ID DO GRUPO DO TEU DISCORD")
    let membro = servidor.members.get(dados.d.user_id)

    let Amigos = servidor.roles.get("ID DO CARGO")
    if(dados.t === "MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.name === "👍"){  //EMOJI QUE É PARA SER COLOCADO, SE FOR NATIVO VAI SER O EMOJI E FOR PERSONALIZADO É O ID
            if(membro.roles.has(Amigos)) return
            membro.addRole(Amigos)
        }
    }
})

client.login('TOKEN DO SEU BOT')