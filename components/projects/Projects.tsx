import React from 'react';
import { Project } from 'types';
import { Col, Container, Row } from 'react-grid-system';
import { Typography, Surface, Media } from 'components';

import styles from './Projects.module.scss';
import { Props } from './Projects.types';

export const Projects: React.FC<Props> = ({ data, collection }) => (
	<section
		id={data['section-id']}
		className={styles.projects}
		data-scroll-section>
		<Container>
			<Typography type="display-2">{data.headline}</Typography>
			<Row className={styles.row}>
				{collection.docs.map((project: Project, idx) => (
					<Col lg={4} key={idx}>
						<div data-scroll data-scroll-speed={idx + 1}>
							<Surface key={project.id}>
								<a
									href={project.link}
									target={'_blank'}
									className={styles.card}>
									<h3>{project.title}</h3>
									<Media image={project.image} />
									<h5>{project.status}</h5>
								</a>
							</Surface>
						</div>
					</Col>
				))}
			</Row>
		</Container>
	</section>
);
