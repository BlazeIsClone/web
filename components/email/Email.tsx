import React from 'react';
import { Typography } from 'components';

import styles from './Email.module.scss';
import { Props } from './Email.types';

export const Email: React.FC<Props> = ({ email, data }) => (
	<section className={styles.email}>
		<Typography type="headline-1">{email}</Typography>
		<img src={data.image?.url} className={styles.img} />
	</section>
);
