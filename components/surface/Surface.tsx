import React from 'react';

import { Props } from './Surface.types';
import styles from './Surface.module.scss';

export const Surface: React.FC<Props> = ({ children, className }) => (
	<section className={`${styles.surface} ${className}`}>{children}</section>
);
