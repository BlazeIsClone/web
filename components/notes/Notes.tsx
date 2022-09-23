import React, { useEffect, useState } from 'react';
import { Note } from 'types';
import { Typography, Surface } from 'components';

import styles from './Notes.module.scss';
import { Props } from './Notes.types';

export const Notes: React.FC<Props> = ({ data, collection }) => {
	const [date, setDate] = useState({});

	useEffect(() => {
		collection.docs.map((note: Note, idx) =>
			setDate({ ...date, [idx]: new Date(note.date).toLocaleDateString() })
		);
	}, []);

	return (
		<section
			id={data['section-id']}
			className={styles.notes}
			data-scroll-section>
			<Typography type="display-2">{data.headline}</Typography>
			{collection.docs.map((note: Note, idx) => (
				<div data-scroll data-scroll-speed={idx + 1} key={note.id}>
					<Surface className={styles.card}>
						<a key={note.id} href={note.link} target={'_blank'}>
							<h3>{note.title}</h3>
							<div>{date[idx]}</div>
						</a>
					</Surface>
				</div>
			))}
		</section>
	);
};
