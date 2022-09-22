import React from 'react';

import { Props } from './Media.types';
import styles from './Media.module.scss';

export const Media: React.FC<Props> = ({ image, className }) => {
	if (typeof image !== 'object') return null;

	const filename = image.filename;
	const { width } = image;
	const { height } = image;

	return (
		<img
			className={`${styles.media} ${className || ''}`}
			src={`/media/${filename}`}
			width={width}
			height={height}
		/>
	);
};
