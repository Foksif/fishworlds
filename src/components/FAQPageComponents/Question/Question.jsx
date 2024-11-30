import { useState } from 'react'
import style from './Question.module.css'

export const Question = ({ title, desc }) => {
	const [isOpen, setIsOpen] = useState(false)

	const open = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div onClick={open} className={style['rule__container']}>
			<h1 className={style['rule__title']}>{title}</h1>
			<div className={`${style['rule__desc']} ${isOpen ? style['open'] : ''}`}>
				{/* КАКОЙ ЖЕ Я ДОЛБАЕБ */}
				{desc}
			</div>
		</div>
	)
}
