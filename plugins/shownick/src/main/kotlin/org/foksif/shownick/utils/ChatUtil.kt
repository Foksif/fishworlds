package org.foksif.shownick.utils

import org.bukkit.ChatColor
import org.bukkit.entity.Player

object ChatUtil {
    private fun format(text: String, vararg args: Pair<String, String>): String {
        return ChatColor.translateAlternateColorCodes('&', applyArgs(text, * args))
    }

    fun applyArgs(text: String, vararg args: Pair<String, String>): String {
        var result = text
        for(arg in args) {
            result = result.replace(arg.first, arg.second)
        }

        return result
    }


    fun Player.action(msg: String, vararg args: Pair<String, String>) {
        sendActionBar(format(msg, *args))
    }

}