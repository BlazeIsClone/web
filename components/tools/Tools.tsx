import React from 'react';
import { Tool } from 'types';
import Marquee from 'react-fast-marquee';
import { Typography, Surface, Media } from 'components';

import styles from './Tools.module.scss';
import { Props } from './Tools.types';

export const Tools: React.FC<Props> = ({ data, collection }) => (
	<section id={data['section-id']} className={styles.tools} data-scroll-section>
		<Typography type="display-2">{data.headline}</Typography>
		<div data-scroll data-scroll-speed={0}>
			<Marquee gradient={false} direction="left">
				{collection.docs
					.slice(collection.docs.length / 2, collection.docs.length)
					.map((tool: Tool) => (
						<a
							key={tool.id}
							href={tool.link}
							target={'_blank'}
							className={styles.card}>
							<Surface>
								<Media image={tool.image} />
							</Surface>
						</a>
					))}
			</Marquee>
		</div>

		<div data-scroll data-scroll-speed={1}>
			<Marquee gradient={false} direction="right">
				{collection.docs
					.slice(0, collection.docs.length / 2)
					.map((tool: Tool) => (
						<a
							key={tool.id}
							href={tool.link}
							target={'_blank'}
							className={styles.card}>
							<Surface>
								<Media image={tool.image} />
							</Surface>
						</a>
					))}
			</Marquee>
		</div>
	</section>
);
