import React, { forwardRef } from 'react'
import style from './ProhodkaSection.module.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export const ProhodkaSection = forwardRef((props, ref) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			nickname: '',
		},
	})

	const onSubmit = data => {
		const tradeAPIByUrl = `https://api.trademc.org/shop.buyItems?shop=213364&v=3&buyer=${data.nickname}&items=858930:1`
		try {
			axios.get(tradeAPIByUrl).then(resp => {
				const payAPI =
					'https://pay.trademc.org/?success_url=https%3A%2F%2Ff-worlds.net%2Fsucces&pending_url=https%3A%2F%2Ff-worlds.net%2Fsucces&fail_url=https%3A%2F%2Ff-worlds.net%2Fsucces&cart_id=' +
					resp.data.response.cart_id

				window.location.href = payAPI
			})
		} catch (error) {}
		reset()
	}

	return (
		<section className={style['prohodka']} ref={ref}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={style['prohodka__container']}
			>
				<h1 className={style['prohodka__title']}>
					Купить <span className={style['blue-inner-text']}>ПРОХОДКУ</span>
				</h1>
				<h4 className={style['prohodka__price']}>
					всего за{' '}
					<span className={style['price']}>
						149₽ <span className={style['oldprice']}>200₽</span>
					</span>
				</h4>
				<input
					{...register('nickname', {
						required: 'Никнейм обязателен!',
						minLength: {
							value: 4,
							message: 'Никнейм должен содержать не менее 4 символов!',
						},
						maxLength: {
							value: 17,
							message: 'Никнейм не должен превышать 20 символов!',
						},
						pattern: {
							value: /^[A-Za-z0-9_]+$/, // Только английские буквы
							message: 'Никнейм должен содержать только английские буквы!',
						},
					})}
					maxLength='20'
					placeholder='Ваш никнейм Minecraft'
					type='text'
					className={`${style['prohodka__input']} ${style['p_nickname']}`}
				/>
				{errors.nickname && (
					<p className={style['error-message']}>{errors.nickname.message}</p>
				)}
				<button
					type='submit'
					className={`${style['pay-btn']} ${style['prohodka_buy-btn']}`}
				>
					Оплатить
				</button>
			</form>
		</section>
	)
})
