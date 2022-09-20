import React from 'react';
import { Container } from 'react-grid-system';

import { Props } from './Header.types';
import styles from './Header.module.scss';

export const Header: React.FC<Props> = ({ data }) => (
	<header className={styles.header}>
		<Container>
			<nav className={styles.nav}>
				{data.items.map(link => (
					<li key={link.id}>
						<a href={`#${link['section-id']}`}>{link.section}</a>
					</li>
				))}
			</nav>
		</Container>
	</header>
);
