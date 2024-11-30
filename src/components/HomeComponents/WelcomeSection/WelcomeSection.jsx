import React from 'react'
import style from './WelcomeSection.module.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const WelcomeSection = ({ scrollToProhodka }) => {
	return (
		<section className={style['welcome']}>
			<div className={style['welcome__container']}>
				<div className={style['welcome-img-blur']}></div>
				<img
					src='./images/main_page/welcome_img.png'
					alt='fishworld_treska'
					className={style['welcome-img']}
				/>
				<div className={style['welcome__text']}>
					<h4 className={style['welcome__text-title']}>
						<span className={style['blue-inner-text']}>Fish</span>Worlds
					</h4>
					<p className={style['welcome__text-desc']}>
						Сервер с упором на ванильное выживание и RolePlay. Пространство с
						идеальными условиями для раскрытия собственного творческого
						потенциала в среде ванильного выживания
					</p>
					<div className={style['welcome_text-btns']}>
						<button
							onClick={scrollToProhodka}
							className={style['scrollToSub-btn']}
						>
							<img
								src='./images/main_page/toDO-for-btn.svg'
								alt=''
								className={style['scrollToSub-btn-img']}
							/>
							оформить проходку
						</button>
						<button
							onClick={() =>
								navigator.clipboard
									.writeText('mc.f-worlds.net')
									.then(() => toast.success('IP Скопирован'))
									.catch(() => toast.error('Ошибка при копировании'))
							}
							className={style['welcome_ip-btn']}
						>
							mc.f-worlds.net
						</button>
					</div>
				</div>
			</div>
			<ToastContainer />
		</section>
	)
}
