package me.foksik.bot.manager

import me.foksik.bot.command.ConsoleCommandHandler
import me.foksik.bot.command.ServerOnlineHandler
import me.foksik.bot.command.WlAddCommandHandler
import net.dv8tion.jda.api.JDA
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent
import net.dv8tion.jda.api.hooks.ListenerAdapter
import net.dv8tion.jda.api.interactions.commands.OptionType
import net.dv8tion.jda.api.interactions.commands.build.Commands
import org.bukkit.plugin.java.JavaPlugin


/**
 * Обьект CommandManager отвечяет за:
 * Регистрацию, Обновление новых и старых команд бота.
 */
object CommandManager: ListenerAdapter() {
    private lateinit var consoleCommandHandler: ConsoleCommandHandler
    private lateinit var serverOnlineHandler: ServerOnlineHandler
    private lateinit var wlAddCommandHandler: WlAddCommandHandler

    fun initialize(plugin: JavaPlugin, jda: JDA) {
        consoleCommandHandler = ConsoleCommandHandler(plugin)
        serverOnlineHandler = ServerOnlineHandler(plugin)
        wlAddCommandHandler = WlAddCommandHandler(plugin)
        jda.addEventListener(this)
    }

    fun registerCommands(jda: JDA) {
        try {
            jda.updateCommands().addCommands(
                Commands.slash("console", "Отправить команду на сервер Minecraft")
                    .addOption(OptionType.STRING, "command", "Команда для выполнения", true),

                Commands.slash("online", "Показать текущий онлайн сервера"),

                Commands.slash("wladd", "Добавить игрока в вайт-лист сервера.")
                    .addOption(OptionType.STRING, "username", "Пользоватьель для добавления", true)
            ).queue(
                { println("Глобальные команды успешно зарегистрированы!") },
                { error -> println("Ошибка при регистрации глобальных команд: ${error.message}") }
            )
        } catch (e: Exception) {
            println("Не удалось зарегистрировать команды: ${e.message}")
        }
    }

    override fun onSlashCommandInteraction(event: SlashCommandInteractionEvent) {
        when (event.name) {
            "console" -> {
                val command = event.getOption("command")?.asString ?: ""
                consoleCommandHandler.execute(command, event)
            }
            "online" -> {
                serverOnlineHandler.execute(event)
            }
            "wladd" -> {
                val username = event.getOption("username")?.asString ?: ""
                wlAddCommandHandler.execute(username, event)
            }
            else -> {
                event.reply("Неизвестная команда.").setEphemeral(true).queue()
            }
        }
    }
}