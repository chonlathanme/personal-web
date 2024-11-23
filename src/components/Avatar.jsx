import React from 'react'
import defaultAvatar from '../assets/default-avatar.png'
import { DropdownArrow } from '../icons'

export default function Avatar(props) {
	const {imgSrc, menu , ...restProps } = props
	return (
		<div className="avatar items-center cursor-pointer">
			<div {...restProps}>
				<img src={imgSrc ?? defaultAvatar} />
				{/* <img src={imgSrc ?  imgSrc : defaultAvatar } /> */}
			</div>

			{ menu &&
				<DropdownArrow className="absolute -bottom-2 -right-1 w-4 rounded-full"/>
			}
		</div>
	)
}
