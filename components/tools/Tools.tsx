import React from 'react';
import { Tool } from 'types';
import Marquee from 'react-fast-marquee';
import { Typography } from 'components';

import styles from './Tools.module.scss';
import { Props } from './Tools.types';

export const Tools: React.FC<Props> = ({ data, collection }) => (
	<section id={data['section-id']} className={styles.tools}>
		<Typography type="display-2">{data.headline}</Typography>

		<Marquee gradient={false}>
			{collection.docs.map((tool: Tool) => (
				<a key={tool.id} href={tool.link}>
					<h3>{tool.title}</h3>
					<img src={tool.image?.url} />
				</a>
			))}
		</Marquee>
	</section>
);
