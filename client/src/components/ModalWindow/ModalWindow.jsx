import React from 'react'
import style from './ModalWindow.module.css'

export const ModalWindow = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null

	return (
		<div className={style['modal-overlay']} onClick={onClose}>
			<div
				className={style['modal-content']}
				onClick={e => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}
