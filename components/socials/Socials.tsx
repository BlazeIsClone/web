import React from 'react';
import Marquee from 'react-fast-marquee';
import { Typography, Media } from 'components';

import { Social } from 'types';
import styles from './Socials.module.scss';
import { Props } from './Socials.types';
import { Collection } from 'types';

export const Socials: React.FC<Props> = ({ collection }) => (
	<section className={styles.socials} data-scroll-section>
		<Marquee gradient={false} className={styles.row} pauseOnHover={true}>
			{collection.docs.map((social: Social) => (
				<a
					key={social.id}
					href={social.link}
					target={'_blank'}
					className={styles.item}
					data-scroll
					data-scroll-speed={1}>
					<Media image={social.image} />
					<Typography type="headline-5" className={styles.title}>
						{social.title}
					</Typography>
				</a>
			))}
		</Marquee>
	</section>
);
