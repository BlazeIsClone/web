import React from 'react';
import { Project } from 'types';
import { Col, Container, Row } from 'react-grid-system';
import { Typography, Surface } from 'components';

import styles from './Projects.module.scss';
import { Props } from './Projects.types';

export const Projects: React.FC<Props> = ({ data, collection }) => (
	<section id={data['section-id']} className={styles.projects}>
		<Container>
			<Typography type="display-2">{data.headline}</Typography>
			<Row className={styles.row}>
				{collection.docs.map((project: Project, idx) => (
					<Col lg={4} key={idx}>
						<Surface key={project.id}>
							<a href={project.link} target={'_blank'} className={styles.card}>
								<h3>{project.title}</h3>
								<img src={project.image?.url} />
								<h5>{project.status}</h5>
							</a>
						</Surface>
					</Col>
				))}
			</Row>
		</Container>
	</section>
);
