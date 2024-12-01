package me.foksik.api.Interface

import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent

interface IDisCommandHandler {
    val name: String
    val description: String

    fun execute(event: SlashCommandInteractionEvent)
}