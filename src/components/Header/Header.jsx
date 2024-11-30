import React, { useState } from 'react'
import style from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { ModalWindow } from '../ModalWindow/ModalWindow'
import { Subscribe } from '../ModalWindow/Subscribe/Subscribe'

export const Header = () => {
	const [isModalOpen, setModalOpen] = useState(false)

	return (
		<header className={style['header__container']}>
			<nav className={style['header__nav']}>
				<NavLink to='/' className={style['logo__href']}>
					<img
						src='/images/logo/logo.svg'
						alt='logo'
						className={style['logo']}
					/>
				</NavLink>
				<div className={style['nav__menu']}>
					<div className={style['nav__menu-links']}>
						<NavLink
							to='/plugins'
							className={({ isActive }) =>
								isActive
									? `${style['nav__menu-link']} ${style['activeLink']}`
									: style['nav__menu-link']
							}
						>
							Плагины
						</NavLink>
						<NavLink
							to='/rules'
							className={({ isActive }) =>
								isActive
									? `${style['nav__menu-link']} ${style['activeLink']}`
									: style['nav__menu-link']
							}
						>
							Правила
						</NavLink>
						<NavLink
							to='/faq'
							className={({ isActive }) =>
								isActive
									? `${style['nav__menu-link']} ${style['activeLink']}`
									: style['nav__menu-link']
							}
						>
							Ответы
						</NavLink>
						<button
							onClick={() => setModalOpen(true)}
							className={style['nav__menu-link']}
						>
							Подписка
						</button>
						<ModalWindow
							isOpen={isModalOpen}
							onClose={() => setModalOpen(false)}
						>
							<Subscribe />
						</ModalWindow>
					</div>
				</div>
				<div className={style['social__links']}>
					<a
						href='https://discord.gg/xuTJ2tBs'
						rel='noreferrer'
						target='_blank'
						className={style[('social__link', 'DIS')]}
					>
						<img
							src='/images/socials/Discord.svg'
							alt=''
							className={style['social__link-img']}
						/>
					</a>
					<a
						href='https://t.me/treska_fish'
						rel='noreferrer'
						target='_blank'
						className={style[('social__link', 'TG')]}
					>
						<img
							src='/images/socials/Telegram.svg'
							alt=''
							className={style['social__link-img']}
						/>
					</a>
					<a
						href='https://www.youtube.com/@TreskaPro'
						rel='noreferrer'
						target='_blank'
						className={style[('social__link', 'YT')]}
					>
						<img
							src='/images/socials/YouTube.svg'
							alt=''
							className={style['social__link-img']}
						/>
					</a>
				</div>
			</nav>
		</header>
	)
}
