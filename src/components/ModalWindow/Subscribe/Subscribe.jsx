import React, { useState } from 'react'
import style from './Subscribe.module.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export const Subscribe = () => {
	// Инициализация хука useForm для обработки формы подписки
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			nickname: '', // Значение по умолчанию для поля "nickname"
		},
	})

	// Состояния для выбранной опции и пути к изображению
	const [selectedOption, setSelectedOption] = useState('150') // Начальная опция - 14 дней
	const [imageSrc, setImageSrc] = useState('/images/sub/subscribe1.png') // Начальное изображение для подписки

	// Функция, которая вызывается при отправке формы
	const onSubmit = data => {
		let item = 904111 // По умолчанию для 14 дней
		if (selectedOption === '300') item = 904112 // Для 1 месяца
		if (selectedOption === '600') item = 904113 // Для всего сезона

		// Составляем URL для запроса покупки товара через API
		const tradeAPIByUrl = `https://api.trademc.org/shop.buyItems?shop=213364&v=3&buyer=${data.nickname}&items=${item}:1`

		try {
			// Отправка запроса на API для покупки
			axios.get(tradeAPIByUrl).then(resp => {
				// Создаем ссылку для оплаты
				const payAPI =
					'https://pay.trademc.org/?success_url=https%3A%2F%2Ff-worlds.net%2Fsucces&pending_url=https%3A%2F%2Ff-worlds.net%2Fsucces&fail_url=https%3A%2F%2Ff-worlds.net%2Fsucces&cart_id=' +
					resp.data.response.cart_id

				// Перенаправление на страницу оплаты
				window.location.href = payAPI
			})
		} catch (error) {
			// Обработка ошибок, если запрос не удался
			console.error('Ошибка при запросе:', error)
		}

		// Сброс значений формы после отправки
		reset()
	}

	// Функция для изменения выбранного тарифа и соответствующего изображения
	const handleChange = value => {
		setSelectedOption(value) // Обновляем выбранную опцию
		// Изменяем изображение в зависимости от выбранного тарифа
		if (value === '150') setImageSrc('/images/sub/subscribe1.png') // 14 дней
		if (value === '300') setImageSrc('/images/sub/subscribe2.png') // 1 месяц
		if (value === '600') setImageSrc('/images/sub/subscribe3.png') // Весь сезон
	}

	return (
		<section className={style.subscribe}>
			{/* Динамическое изображение, которое меняется в зависимости от выбранной опции */}
			<img
				src={imageSrc} // Динамическое изображение
				alt='Подписка' // Альтернативный текст для изображения
				className={style['sub-img']}
			/>
			<div className={style['subscribe__content']}>
				<div className={style['subscribe__text']}>
					<h1 className={style['subscribe__text-title']}>
						Подписка <span style={{ color: '#47f' }}>FishPlus</span>
					</h1>
					<p className={style['subscribe__text-desc']}>
						Хочешь выделиться среди остальных? С подпиской ты получишь
					</p>
					<ul className={style['subscribe__text-list']}>
						<li>Уникальный цвет ника в чате и табе</li>
						<li>Возможность создавать кастомные пластинки</li>
						<li>В 2 раза больше ежедневных FishCoin</li>
						<li>Надеть предмет на голову</li>
					</ul>
				</div>

				{/* Кнопки для выбора периода подписки */}
				<div className={style['period__btns']}>
					<label
						className={`${style['period__btn']} ${
							selectedOption === '150' ? style['selected'] : ''
						}`}
						onClick={() => handleChange('150')}
					>
						14 дней
					</label>
					<label
						className={`${style['period__btn']} ${
							selectedOption === '300' ? style['selected'] : ''
						}`}
						onClick={() => handleChange('300')}
					>
						1 Месяц
					</label>
					<label
						className={`${style['period__btn']} ${
							selectedOption === '600' ? style['selected'] : ''
						}`}
						onClick={() => handleChange('600')}
					>
						Весь Сезон
					</label>
				</div>

				{/* Отображение цены в зависимости от выбранной опции */}
				<h1 className={style['price']}>Цена: {selectedOption}&#x20BD;</h1>

				{/* Форма для ввода никнейма и отправки данных */}
				<form onSubmit={handleSubmit(onSubmit)} className={style['toBuy']}>
					<input
						{...register('nickname', {
							required: 'Никнейм обязателен', // Валидатор для обязательного поля
							minLength: {
								value: 4, // Минимальная длина никнейма
							},
							maxLength: {
								value: 17, // Максимальная длина никнейма
							},
							pattern: {
								value: /^[A-Za-z0-9_]+$/, // Разрешены только буквы, цифры и подчеркивания
							},
						})}
						className={style['nick-input']}
						type='text'
						maxLength='20'
					/>
					<button className={style['buy-btn']}>Купить</button>
				</form>
			</div>
		</section>
	)
}
