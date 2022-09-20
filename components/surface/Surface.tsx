import React from 'react';

import { Props } from './Surface.types';
import styles from './Surface.module.scss';

export const Surface: React.FC<Props> = ({ children }) => (
	<section className={styles.surface}>{children}</section>
);
