package me.foksik.bot.command

import net.dv8tion.jda.api.entities.Role
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent
import org.bukkit.plugin.java.JavaPlugin

class WlAddCommandHandler(private val plugin: JavaPlugin) {
    private val requiredRoleIds = listOf("1201892840410714145", "1201893719154884698")

    fun execute(username: String, event: SlashCommandInteractionEvent) {
        val member = event.member

        if (member == null || !hasRequiredRole(member.roles)) {
            event.reply("У вас недостаточно прав для выполнения этой команды.").setEphemeral(true).queue()
            return
        }

        val success = plugin.server.dispatchCommand(
            plugin.server.consoleSender,
            "swl add $username"
        )

        if (success) {
            event.reply("Пользователь $username был добавлен в whitelist!").queue()
        } else {
            event.reply("Произошла ошибка при выполнении команды.").setEphemeral(true).queue()
        }
    }

    private fun hasRequiredRole(roles: List<Role>): Boolean {
        return roles.any { it.id in requiredRoleIds }
    }
}