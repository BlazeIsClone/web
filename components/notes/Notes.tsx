import React from 'react';
import { Note } from 'types';
import { Typography, Surface } from 'components';

import styles from './Notes.module.scss';
import { Props } from './Notes.types';

export const Notes: React.FC<Props> = ({ data, collection }) => (
	<section id={data['section-id']} className={styles.notes}>
		<Typography type="display-2">{data.headline}</Typography>
		{collection.docs.map((notes: Note) => (
			<Surface key={notes.id} className={styles.card}>
				<a key={notes.id} href={notes.link}>
					<h3>{notes.title}</h3>
					<div>{notes.date.toString()}</div>
				</a>
			</Surface>
		))}
	</section>
);
