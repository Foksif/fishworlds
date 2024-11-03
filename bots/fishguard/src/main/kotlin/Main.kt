package me.foksik

import io.javalin.Javalin
import me.foksik.msgutil.sendPrivateDeniedMessage
import me.foksik.msgutil.sendPrivateSuccessMessage
import net.dv8tion.jda.api.JDA
import net.dv8tion.jda.api.JDABuilder

class Main {
    lateinit var jda: JDA

    fun main() {
        val BotToken: String = "<Bot_Token>>"

        jda = JDABuilder.createDefault(BotToken).build()

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
}


fun main() {
    val main = Main()
    main.main()
}

