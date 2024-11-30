package me.foksik

import io.javalin.Javalin
import me.foksik.msgutil.sendPrivateDeniedMessage
import me.foksik.msgutil.sendPrivateSuccessMessage
import net.dv8tion.jda.api.JDA
import net.dv8tion.jda.api.JDABuilder
import net.dv8tion.jda.api.OnlineStatus
import net.dv8tion.jda.api.entities.Activity
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit

class Main {
    lateinit var jda: JDA

    fun main() {
        val BotToken: String = "<TOKEN>"

        jda = JDABuilder.createDefault(BotToken).setStatus(OnlineStatus.IDLE).build().awaitReady()

        val activities = listOf(
            Activity.watching("mc.f-worlds.net"),
            Activity.watching("bot: 0.1 [beta]")
        )

        val scheduler = Executors.newScheduledThreadPool(1)

        scheduler.scheduleAtFixedRate({
            val activity = activities.random()
            jda.presence.activity = activity
        },0,10, TimeUnit.SECONDS)

        val app = Javalin.create().start(7000)

        app.get("/api/success/{userid}") { ctx ->
            val userid = ctx.pathParam("userid")

            try {
                sendPrivateSuccessMessage(jda, userid)
                ctx.json("{\"status\":1}")
            } catch (e: Error) {
                ctx.json("{\"status\":2}")
            }

            ctx.status(200)
        }

        app.get("/api/denied/{userid}") { ctx ->
            val userid = ctx.pathParam("userid")

            try {
                sendPrivateDeniedMessage(jda, userid)
                ctx.json("{\"status\":1}")
            } catch (e: Error) {
                ctx.json("{\"status\":2}")
            }

            ctx.status(200)
        }
    }

//    fun getJda(): JDA {
//        return jda
//    }
}


fun main() {
    val main = Main()
    main.main()
}

