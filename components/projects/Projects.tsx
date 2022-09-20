import React from 'react';
import { Project } from 'types';
import styles from './Projects.module.scss';
import { Props } from './Projects.types';

export const Projects: React.FC<Props> = ({ data, collection }) => (
	<section id={data['section-id']} className={styles.projects}>
		<h2>{data.headline}</h2>
		{collection.docs.map((project: Project) => (
			<div key={project.id}>
				<h3>{project.title}</h3>
				<img src={project.image?.url} />
				<h5>{project.status}</h5>
			</div>
		))}
	</section>
);
