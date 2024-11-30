import React from 'react'
import style from './Footer.module.css'

const Footer = () => {
	return (
		<footer className={style['footer']}>
			<div className={style['footer__container']}>
				<div className={style['links']}>
					<div className={style['copyright']}>
						<img
							src='./images/logo/logo.svg'
							alt=''
							className={style['footer__logo']}
						/>
						<p className={style['copytight__text']}>
							Copyright © f-worlds 2024. Все права защищены. Сервера f-worlds не
							относятся к Mojang Studios.
						</p>
						<p className={style['copytight__owner']}>ИП АРСЕНИЙ (ИНН)</p>
						<div className={style['socails']}>
							<a
								href='https://www.youtube.com/@TreskaPro'
								rel='noreferrer'
								target='_blank'
								className={style['social_href']}
							>
								<img
									src='/images/socials/YouTube.svg'
									alt=''
									className={style[('social-img', 'YT')]}
								/>
							</a>
							<a
								href='https://discord.gg/xuTJ2tBs'
								rel='noreferrer'
								target='_blank'
								className={style['social_href']}
							>
								<img
									src='/images/socials/Discord.svg'
									alt=''
									className={style[('social-img', 'DIS')]}
								/>
							</a>
							<a
								href='https://t.me/treska_fish'
								rel='noreferrer'
								target='_blank'
								className={style['social_href']}
							>
								<img
									src='/images/socials/Telegram.svg'
									alt=''
									className={style[('social-img', 'TG')]}
								/>
							</a>
						</div>
					</div>
					<div className={style['politics']}>
						<span className={style['personal__data']}>
							<a href='#'>Политика обработки персональных данных</a>
						</span>
						<span className={style['dogovor__off']}>
							<a href='#'>Договор-оферта</a>
						</span>
						<span className={style['user__agree']}>
							<a href='#'>Пользовательское соглашение</a>
						</span>
					</div>
					{/* <div className={style['useful__links']}>
						<h4 className={style['useful__links-title']}>важные ссылки</h4>
						<a href='#' className={style['faq__footer-link']}>
							Частые вопросы
						</a>
						<a href='#' className={style['news__footer-link']}>
							Новости
						</a>
					</div> */}
				</div>
				<ul className={style['payments']}>
					<li className={style['payments__title']}>Способы оплаты</li>
					<li className={style['payment-row']}>
						<img
							src='./images/payments_icon/tinkoff.svg'
							alt=''
							className={style['payments-icon']}
						/>
					</li>
					<li className={style['payment-row']}>
						<img
							src='./images/payments_icon/mastercard.svg'
							alt=''
							className={style['payments-icon']}
						/>
					</li>
					<li className={style['payment-row']}>
						<img
							src='./images/payments_icon/visa.svg'
							alt=''
							className={style['payments-icon']}
						/>
					</li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer
