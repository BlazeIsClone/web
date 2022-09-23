import React from 'react';
import { Container } from 'react-grid-system';

import { Typography } from 'components';
import styles from './Hero.module.scss';
import { Props } from './Hero.types';

export const Hero: React.FC<Props> = ({ data }) => (
	<section id={data['section-id']} className={styles.hero} data-scroll-section>
		<div data-scroll data-scroll-speed={'1'}>
			<Container>
				<Typography type="rich-text">{data.headline}</Typography>
			</Container>
		</div>
	</section>
);
