import React from 'react';
import styles from './Email.module.scss';
import { Props } from './Email.types';

export const Email: React.FC<Props> = ({ data }) => (
	<section className={styles.email}>
		<h2>{data}</h2>
	</section>
);
