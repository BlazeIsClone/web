import React from 'react';
import { Tool } from 'types';
import Marquee from 'react-fast-marquee';
import { Typography, Surface } from 'components';

import styles from './Tools.module.scss';
import { Props } from './Tools.types';

export const Tools: React.FC<Props> = ({ data, collection }) => (
	<section id={data['section-id']} className={styles.tools}>
		<Typography type="display-2">{data.headline}</Typography>

		<Marquee gradient={false} direction="left">
			{console.log(collection.docs.length)}
			{collection.docs
				.slice(collection.docs.length / 2, collection.docs.length)
				.map((tool: Tool) => (
					<a key={tool.id} href={tool.link} className={styles.card}>
						<Surface>
							<img src={tool.image?.url} />
						</Surface>
					</a>
				))}
		</Marquee>

		<Marquee gradient={false} direction="right">
			{collection.docs
				.slice(0, collection.docs.length / 2)
				.map((tool: Tool) => (
					<a key={tool.id} href={tool.link} className={styles.card}>
						<Surface>
							<img src={tool.image?.url} />
						</Surface>
					</a>
				))}
		</Marquee>
	</section>
);
