import React from 'react';
import useSound from 'use-sound';

import { Props } from './Surface.types';
import styles from './Surface.module.scss';

export const Surface: React.FC<Props> = ({ children, className, hidden }) => {
	const [play] = useSound('/hover.mp3', {
		volume: 0.05,
	});

	return (
		<section
			className={`${!hidden && styles.surface} ${className}`}
			onMouseOver={() => play()}>
			{children}
		</section>
	);
};
