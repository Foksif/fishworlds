import React from 'react'
import style from './DonateSection.module.css'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

export const DonateSection = () => {
	const {
		control,
		getValues,
		setValue,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			nick: '',
			rub: '',
			fish: '',
		},
	})

	const onSubmit = async data => {
		const tradeAPIByUrl = `https://api.trademc.org/shop.buyItems?user_fields%5B902883%5D%5Bamount%5D=${data.rub}&buyer=${data.nick}&items=902883%3A1&v=4`

		try {
			const resp = await axios.get(tradeAPIByUrl)
			const payAPI =
				'https://pay.trademc.org/?success_url=https%3A%2F%2Ff-worlds.net%2Fsucces&pending_url=https%3A%2F%2Ff-worlds.net%2Fsucces&fail_url=https%3A%2F%2Ff-worlds.net%2Fsucces&cart_id=' +
				resp.data.response.cart_id

			// Перенаправление пользователя на страницу оплаты
			window.location.href = payAPI
		} catch (error) {
			console.error('Ошибка при создании заказа:', error)
			alert('Произошла ошибка при обработке заказа. Попробуйте снова.')
		}

		reset()
	}

	const handleRubBlur = () => {
		const rubValue = getValues('rub')
		if (rubValue) setValue('fish', Math.floor(rubValue / 2))
	}

	const handleFishBlur = () => {
		const fishValue = getValues('fish')
		if (fishValue) setValue('rub', fishValue * 2)
	}

	return (
		<section className={style['donate']}>
			<div className={style['donate__container']}>
				<div className={style['donate__image-container']}>
					<div className={style['donate__image-blur']}></div>
					<img
						src='./images/main_page/donate_treska.png'
						alt=''
						className={style['donate__img']}
					/>
				</div>
				<div className={style['stick']}></div>
				<div className={style['donate__text']}>
					<h1 className={style['donate__title']}>
						Fish<span className={style['blue-inner-text']}>COIN</span>
					</h1>
					<h4 className={style['donate__desc-title']}>
						Что можно за них купить
					</h4>
					<ul className={style['donate__desc']}>
						<li className={style['donate__row']}>Визуальные эффекты</li>
						<li className={style['donate__row']}>Необычные предметы</li>
					</ul>
					<form onSubmit={handleSubmit(onSubmit)} className={style['inputs']}>
						{/* Поле никнейма */}
						<div>
							<Controller
								name='nick'
								control={control}
								rules={{
									required: 'Никнейм обязателен!',
									minLength: {
										value: 4,
										message: 'Никнейм должен содержать не менее 4 символов!',
									},
									maxLength: {
										value: 17,
										message: 'Никнейм не должен превышать 17 символов!',
									},
									pattern: {
										value: /^[A-Za-z0-9_]+$/,
										message:
											'Никнейм должен содержать только латинские буквы и цифры!',
									},
								}}
								render={({ field }) => (
									<input
										{...field}
										placeholder='Никнейм'
										type='text'
										maxLength='20'
										className={`${style['donate__input']} ${style['nickname']}`}
									/>
								)}
							/>
							{errors.nick && (
								<p className={style['error-message']}>{errors.nick.message}</p>
							)}
						</div>

						{/* Поля ввода для рублей и FishCoin */}
						<div className={style['donate__inputs']}>
							<div>
								<Controller
									name='rub'
									control={control}
									rules={{
										required: 'Поле пустое!',
										min: {
											value: 20,
											message: 'Минимальная сумма — 20 рублей!',
										},
									}}
									render={({ field }) => (
										<input
											{...field}
											placeholder='Рубли'
											type='number'
											className={`${style['donate__input']} ${style['ruble-to-coin']}`}
											onBlur={handleRubBlur}
										/>
									)}
								/>
								{errors.rub && (
									<p className={style['error-message']}>{errors.rub.message}</p>
								)}
							</div>
							<img
								src='./images/main_page/arrow-right.svg'
								alt=''
								className={style['arrow']}
							/>
							<div>
								<Controller
									name='fish'
									control={control}
									rules={{
										required: 'Поле пустое!',
										min: {
											value: 10,
											message: 'Минимум 10 FishCoin!',
										},
									}}
									render={({ field }) => (
										<input
											{...field}
											placeholder='FishCoin'
											type='number'
											className={`${style['donate__input']} ${style['coin-to-ruble']}`}
											onBlur={handleFishBlur}
										/>
									)}
								/>
								{errors.fish && (
									<p className={style['error-message']}>
										{errors.fish.message}
									</p>
								)}
							</div>
						</div>

						{/* Кнопка отправки */}
						<button
							type='submit'
							className={`${style['pay-btn']} ${style['donate_pay']}`}
						>
							Купить
						</button>
					</form>
				</div>
			</div>
		</section>
	)
}
