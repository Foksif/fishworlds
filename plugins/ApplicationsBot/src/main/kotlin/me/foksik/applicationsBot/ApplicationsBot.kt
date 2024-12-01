package me.foksik.applicationsBot

import net.dv8tion.jda.api.EmbedBuilder
import net.dv8tion.jda.api.events.interaction.component.ButtonInteractionEvent
import net.dv8tion.jda.api.hooks.ListenerAdapter
import net.dv8tion.jda.api.interactions.modals.Modal
import net.dv8tion.jda.api.JDABuilder
import net.dv8tion.jda.api.JDA
import net.dv8tion.jda.api.events.interaction.ModalInteractionEvent
import net.dv8tion.jda.api.interactions.components.buttons.Button
import net.dv8tion.jda.api.interactions.components.text.TextInput
import net.dv8tion.jda.api.interactions.components.text.TextInputStyle
import org.bukkit.Bukkit
import org.bukkit.plugin.java.JavaPlugin
import javax.security.auth.login.LoginException
import net.dv8tion.jda.api.requests.GatewayIntent

class ApplicationsBot : JavaPlugin() {

    private lateinit var jda: JDA
    private val applicationData = mutableMapOf<String, String>()

    private val buttonChannelId = "<id>"
    private val applicationsChannelId = "<id>"

    private val botToken = "<bot_token>"

    override fun onEnable() {
        try {
            jda = JDABuilder.createDefault(botToken)
                .enableIntents(GatewayIntent.GUILD_MESSAGES, GatewayIntent.MESSAGE_CONTENT)
                .build()
            jda.awaitReady()
            jda.addEventListener(ApplicationListener())

            val buttonChannel = jda.getTextChannelById(buttonChannelId)

            if (buttonChannel == null) {
                logger.severe("Канал с ID $buttonChannelId не найден или бот не имеет доступа к каналу.")
                return
            }

            buttonChannel.purgeMessages()

            val button = Button.primary("apply", "Подать заявку")
            buttonChannel.sendMessage("Нажмите кнопку для подачи заявки на сервер!")
                .setActionRow(button)
                .queue()

        } catch (e: LoginException) {
            logger.severe("Ошибка авторизации бота: Неверный токен или ошибка при подключении.")
        } catch (e: InterruptedException) {
            logger.severe("Ошибка ожидания полной инициализации бота: ${e.message}")
        }
    }

    inner class ApplicationListener : ListenerAdapter() {

        override fun onButtonInteraction(event: ButtonInteractionEvent) {
            when (event.componentId) {
                "apply" -> handleApplyButton(event)
                else -> handleActionButtons(event)
            }
        }

        private fun handleApplyButton(event: ButtonInteractionEvent) {
            val nicknameInput = TextInput.create("nickname", "Ваш ник", TextInputStyle.SHORT)
                .setRequired(true)
                .build()

            val ageInput = TextInput.create("age", "Ваш возраст", TextInputStyle.SHORT)
                .setRequired(true)
                .build()

            val aboutInput = TextInput.create("about", "О себе", TextInputStyle.PARAGRAPH)
                .setRequired(true)
                .build()

            val modal = Modal.create("application_modal", "Форма заявки")
                .addActionRow(nicknameInput)
                .addActionRow(ageInput)
                .addActionRow(aboutInput)
                .build()

            event.replyModal(modal).queue()
        }

        private fun handleActionButtons(event: ButtonInteractionEvent) {
            val applicationId = event.componentId.split("_")[1]
            val user = event.user
            val applicationsChannel = jda.getTextChannelById(applicationsChannelId)

            // Подтверждаем взаимодействие, чтобы избежать ошибки истечения времени
            event.deferEdit().queue()

            if (event.componentId.startsWith("approve")) {
                val nickname = applicationData[applicationId] ?: "Не указано"

                val embed = EmbedBuilder()
                    .setTitle("Заявка принята")
                    .setDescription("Заявка от пользователя $nickname была принята.")
                    .setAuthor(user.name)
                    .setColor(java.awt.Color.GREEN)
                    .build()

                applicationsChannel?.sendMessageEmbeds(embed)!!
                    .setActionRow(Button.primary("approved", "Принято").asDisabled())
                    .queue()

                Bukkit.getScheduler().runTask(this@ApplicationsBot, Runnable {
                    Bukkit.dispatchCommand(Bukkit.getConsoleSender(), "swl add $nickname")
                })

                // Удаление исходного сообщения
                event.message.delete().queue()
            } else if (event.componentId.startsWith("reject")) {
                val nickname = applicationData[applicationId] ?: "Не указано"

                val embed = EmbedBuilder()
                    .setTitle("Заявка отклонена")
                    .setDescription("Заявка от пользователя $nickname была отклонена.")
                    .setAuthor(user.name)
                    .setColor(java.awt.Color.RED)
                    .build()

                applicationsChannel?.sendMessageEmbeds(embed)!!
                    .setActionRow(Button.danger("rejected", "Отклонено").asDisabled())
                    .queue()

                // Удаление исходного сообщения
                event.message.delete().queue()
            }
        }



        override fun onModalInteraction(event: ModalInteractionEvent) {
            if (event.modalId == "application_modal") {
                val nickname = event.getValue("nickname")?.asString ?: "Не указано"
                val age = event.getValue("age")?.asString ?: "Не указано"
                val about = event.getValue("about")?.asString ?: "Не указано"

                val applicationEmbed = EmbedBuilder()
                    .setTitle("Новая заявка")
                    .addField("Ник:", nickname, false)
                    .addField("Возраст:", age, false)
                    .addField("О себе:", about, false)
                    .setColor(java.awt.Color.YELLOW)
                    .build()

                val applicationsChannel = jda.getTextChannelById(applicationsChannelId)

                val approveButton = Button.success("approve_${event.id}", "Принять")
                val rejectButton = Button.danger("reject_${event.id}", "Отклонить")

                applicationsChannel?.sendMessageEmbeds(applicationEmbed)
                    ?.setActionRow(approveButton, rejectButton)
                    ?.queue()

                applicationData[event.id] = nickname

                try {
                    event.user.openPrivateChannel().queue({ privateChannel ->
                        privateChannel.sendMessage("Ваша заявка была успешно отправлена!").queue()
                    }, { error ->
                        logger.warning("Не удалось отправить приватное сообщение пользователю ${event.user.id}: ${error.message}")
                        event.reply("К сожалению, бот не смог отправить вам приватное сообщение. Проверьте настройки конфиденциальности.")
                            .setEphemeral(true)
                            .queue()
                    })
                } catch (e: Exception) {
                    logger.severe("Неожиданная ошибка при отправке сообщения пользователю ${event.user.id}: ${e.message}")
                }

                event.reply("Заявка отправлена!").setEphemeral(true).queue()
            }
        }
    }
}
