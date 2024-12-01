import React from 'react'
import style from './VideoSection.module.css'

export const VideoSection = () => {
	return (
		<section className={style['video']}>
			<div className={style['video__container']}>
				<iframe
					width='720'
					height='405'
					src='https://rutube.ru/play/embed/63953473c5c668cc0da54c2435b32701'
					frameBorder='0'
					allow='clipboard-write; autoplay'
					webkitallowfullscreen='true'
					mozallowfullscreen='true'
					allowFullScreen
					title='Welcome video'
					className={style['welcome__video']}
				></iframe>
			</div>
			<img
				src='./images/main_page/treska-video-img.png'
				alt='treska'
				className={style['welcome__video-img']}
			/>
			<div className={style['welcome__video-img-blur']}></div>
		</section>
	)
}
