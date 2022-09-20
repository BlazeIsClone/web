import getConfig from 'next/config';
import React from 'react';
import { Tool } from 'types';
import styles from './Tools.module.scss';
import { Props } from './Tools.types';

export const Tools: React.FC<Props> = ({ data, collection }) => (
	<section id={data['section-id']} className={styles.tools}>
		<h2>{data.headline}</h2>
		{collection.docs.map((tool: Tool) => (
			<a key={tool.id} href={tool.link}>
				<h3>{tool.title}</h3>
				<img src={tool.image?.url} />
			</a>
		))}
	</section>
);
