import React from 'react';

import { Props } from './Header.types';
import styles from './Header.module.scss';

export const Header: React.FC<Props> = ({ data }) => (
	<header className={styles.header}>
		<nav className={styles.nav}>
			{data.items.map(link => (
				<li key={link.id}>
					<a href={`#${link['section-id']}`}>{link.section}</a>
				</li>
			))}
		</nav>
	</header>
);
