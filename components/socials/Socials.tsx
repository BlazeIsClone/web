import React from 'react';
import { Row } from 'react-grid-system';
import Marquee from 'react-fast-marquee';
import { Typography } from 'components';

import { Social } from 'types';
import styles from './Socials.module.scss';
import { Props } from './Socials.types';

export const Socials: React.FC<Props> = ({ collection }) => (
	<section className={styles.socials}>
		<Marquee gradient={false} className={styles.row} pauseOnHover={true}>
			{collection.docs.map((social: Social) => (
				<a key={social.id} href={social.link} className={styles.item}>
					<img src={social.image?.url} />
					<Typography type="headline-5" className={styles.title}>
						{social.title}
					</Typography>
				</a>
			))}
		</Marquee>
	</section>
);
