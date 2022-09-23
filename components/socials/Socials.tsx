import React from 'react';
import Marquee from 'react-fast-marquee';
import { Typography, Media, Surface } from 'components';

import { Social } from 'types';
import styles from './Socials.module.scss';
import { Props } from './Socials.types';

export const Socials: React.FC<Props> = ({ collection }) => (
	<section className={styles.socials} data-scroll-section>
		<div data-scroll data-scroll-speed={1}>
			<Marquee className={styles.row} gradient={false} pauseOnHover={true}>
				{collection.docs.map((social: Social) => (
					<a key={social.id} href={social.link} target={'_blank'}>
						<Surface className={styles.item} hidden>
							<Media image={social.image} />
							<Typography type="headline-5" className={styles.title}>
								{social.title}
							</Typography>
						</Surface>
					</a>
				))}
			</Marquee>
		</div>
	</section>
);
