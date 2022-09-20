import React from 'react';
import { Note } from 'types';
import styles from './Notes.module.scss';
import { Props } from './Notes.types';

export const Notes: React.FC<Props> = ({ data, collection }) => (
	<section id={data['section-id']} className={styles.notes}>
		<h2>{data.headline}</h2>
		{collection.docs.map((notes: Note) => (
			<div key={notes.id}>
				<h3>{notes.title}</h3>
				<div>{notes.date.toString()}</div>
			</div>
		))}
	</section>
);
