package me.foksik

import net.dv8tion.jda.api.EmbedBuilder
import net.dv8tion.jda.api.JDA
import java.awt.Color

object msgutil {
    fun sendPrivateSuccessMessage(jda: JDA, userId: String, ) {
        val user = jda.getUserById(userId)

        if (user != null)  {
            user.openPrivateChannel().queue() {channel ->
                val embed = EmbedBuilder()
                    .setTitle("Оповещение системы")
                    .setDescription("Ваша заявка на сервер 'FishWorlds' успешно одобренна!")
                    .setColor(Color.decode("#13e80c"))
                    .build()
                channel.sendMessageEmbeds(embed).queue()
            }
        }
    }

    fun sendPrivateDeniedMessage(jda: JDA, userId: String, ) {
        val user = jda.getUserById(userId)

        if (user != null)  {
            user.openPrivateChannel().queue() {channel ->
                val embed = EmbedBuilder()
                    .setTitle("Оповещение системы")
                    .setDescription("Ваша заявка на сервер 'FishWorlds' была отклоненна!")
                    .setColor(Color.decode("#e32600"))
                    .build()
                channel.sendMessageEmbeds(embed).queue()
            }
        }
    }
}
