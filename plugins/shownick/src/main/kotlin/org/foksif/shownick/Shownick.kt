package org.foksif.shownick

import org.bukkit.ChatColor
import org.bukkit.entity.Player
import org.bukkit.event.EventHandler
import org.bukkit.event.Listener
import org.bukkit.event.player.PlayerInteractAtEntityEvent
import org.bukkit.plugin.java.JavaPlugin

class Shownick : JavaPlugin(), Listener {

    override fun onEnable() {
        server.pluginManager.registerEvents(this, this)
        println("ShowNick: ver 0.1 Enabling")

    }

    @EventHandler
    fun onPlayerInteractAtEntity(event: PlayerInteractAtEntityEvent) {
        if (event.rightClicked is Player) {
            val player = event.rightClicked as Player
            val nickname = player.name
            event.player.sendActionBar("${ChatColor.GOLD}${nickname}")
        }
    }
}
