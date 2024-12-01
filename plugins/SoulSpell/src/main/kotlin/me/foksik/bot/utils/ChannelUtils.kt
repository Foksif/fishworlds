package me.foksik.bot.utils

import net.dv8tion.jda.api.entities.channel.concrete.TextChannel

object ChannelUtils {

    /**
     * Очищает последние сообщения в текстовом канале.
     *
     * @param channel Текстовый канал, в котором будут удалены сообщения.
     * @param limit Максимальное количество сообщений для удаления (по умолчанию 100).
     */
    fun purgeMessages(channel: TextChannel, limit: Int = 100) {
        val messages = channel.history.retrievePast(limit).complete() // Получаем последние сообщения
        if (messages.isNotEmpty()) {
            channel.deleteMessages(messages).queue() // Удаляем их
        }
    }
}