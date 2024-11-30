import React from 'react'
import style from './PluginPagePost.module.css'
// import { PluginPostSlider } from '../PluginPostSlider/PluginPostSlider'

export const PluginPagePost = ({ title, desc, list, imgSrc }) => {
	return (
		<div className={style['post']}>
			<h1 className={style['post__title']}>{title}</h1>
			<p className={style['post__desc']}>{desc}</p>
			<ul className={style['post__list']}>
				{list.map((el, i) => (
					<li className={style['post__list-row']} id={i}>
						{el}
					</li>
				))}
			</ul>
			<img className={style['post__image']} src={imgSrc} alt='PostImage' />
		</div>
	)
}
