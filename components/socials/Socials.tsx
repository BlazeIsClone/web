import React from 'react';
import { Social } from 'types';
import styles from './Socials.module.scss';
import { Props } from './Socials.types';

export const Socials: React.FC<Props> = ({ collection }) => (
	<section className={styles.socials}>
		{collection.docs.map((social: Social) => (
			<a key={social.id} href={social.link}>
				<h3>{social.title}</h3>
				<img src={social.image?.url} />
			</a>
		))}
	</section>
);
