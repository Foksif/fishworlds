package org.foksif.shownick

import org.bukkit.ChatColor
import org.bukkit.entity.Player
import org.bukkit.event.EventHandler
import org.bukkit.event.Listener
import org.bukkit.event.player.PlayerInteractAtEntityEvent
import org.bukkit.plugin.java.JavaPlugin
import org.foksif.shownick.utils.ChatUtil.action

class Shownick : JavaPlugin(), Listener {

    override fun onEnable() {
        server.pluginManager.registerEvents(this, this)
        instance = this

        saveDefaultConfig()

        println("ShowNick: ver 0.1 Enabling")

    }

    companion object {
        lateinit var instance: Shownick
    }

    @EventHandler
    fun onPlayerInteractAtEntity(event: PlayerInteractAtEntityEvent) {
        if (event.rightClicked is Player) {
            val player = event.rightClicked as Player
            val nickname = player.name

            var mes: String = config.getString("rightClickText").toString()

            event.player.action(mes, Pair("{player}", nickname))
        }
    }
}
