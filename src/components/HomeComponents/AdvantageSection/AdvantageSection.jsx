import React from 'react'
import style from './AdvantageSection.module.css'

export const AdvantageSection = () => {
	return (
		<section className={style['advantage']}>
			<div className={style['advantage__container']}>
				<h4 className={style['advantage__title']}>Наши преимущества</h4>
				<div className={style['advantage__cards']}>
					<div
						className={`${style['advantage__card']} ${style['advantage__card-admins']}`}
					>
						<img
							src='./images/main_page/admin__svg.svg'
							alt=''
							className={style['advantage__card-img']}
						/>
						<h4 className={style['advantage__card-title']}>
							Лучший Админ-Состав
						</h4>
						<div className={style['advantage__card-line']}></div>
						<p className={style['advantage__card-desc']}>
							Наша команда работает слажено и быстро! Модераторы всегда готовы
							прийти на помощь, ответить на возникшие вопросы, наказать
							нарушителя порядка. Разработчики не покладая рук трудятся над
							улучшением проекта! Добавление новых плагинов, обновление сайта,
							решение тех. проблем - всё это их заслуга. Каждый из нас старается
							выложиться на полную для того чтобы сделать вашу игру на сервере
							максимально комфортной и приятно.
						</p>
					</div>
					<div
						className={`${style['advantage__card']} ${style['advantage__card-comm']}`}
					>
						<img
							src='./images/main_page/comm_svg.svg'
							alt=''
							className={style['advantage__card-img']}
						/>
						<h4 className={style['advantage__card-title']}>
							Дружное Комьюнити
						</h4>
						<div className={style['advantage__card-line']}></div>
						<p className={style['advantage__card-desc']}>
							У нас всегда царит уютная атмосфера. Добрые игроки помогут
							сориентироваться и подсказать, где, что находится. Здесь ты точно
							найдёшь, с кем пообщаться и сформируешь свой личный круг общения
							из классных ребят. Каждый день происходит что-то интересное!
							Ивенты, собрания, простые посиделки. Так что с нашими игроками ты
							точно не заскучаешь!
						</p>
					</div>
					<div
						className={`${style['advantage__card']} ${style['advantage__card-tps']}`}
					>
						<img
							src='./images/main_page/tps_svg.svg'
							alt=''
							className={style['advantage__card-img']}
						/>
						<h4 className={style['advantage__card-title']}>Стабильный ТПС</h4>
						<div className={style['advantage__card-line']}></div>
						<p className={style['advantage__card-desc']}>
							Благодаря мощному оборудованию наши игроки не страдают от
							постоянных вылетов и лагов! Так же мы стараемся максимально
							оптимизировать наш сервер, стараясь не задеть важные игровые
							механики, что точно гарантирует стабильный тпс и почти полный
							функционал ванильной игры!
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
