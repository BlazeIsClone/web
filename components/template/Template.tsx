import React from 'react';

import { Props } from './Template.types';
import styles from './Template.module.scss';

export const Template: React.FC<Props> = () => (
	<section className={styles.template}>Section</section>
);
