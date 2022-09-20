import { RichText } from 'components';
import React from 'react';
import styles from './Hero.module.scss';
import { Props } from './Hero.types';

export const Hero: React.FC<Props> = ({ data }) => (
	<section id={data['section-id']} className={styles.hero}>
		<RichText content={data.headline} />
	</section>
);
