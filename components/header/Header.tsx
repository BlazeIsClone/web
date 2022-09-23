import React from 'react';
import { Container } from 'react-grid-system';

import { Props } from './Header.types';
import styles from './Header.module.scss';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

export const Header: React.FC<Props> = ({ data }) => {
	const { scroll } = useLocomotiveScroll();
	return (
		<header className={styles.header} data-scroll-section>
			<Container>
				<nav className={styles.nav}>
					{data.items?.map(link => (
						<li key={link.id}>
							<a
								onClick={() =>
									scroll.scrollTo(
										document.querySelector(`#${link['section-id']}`)
									)
								}>
								{link.section}
							</a>
						</li>
					))}
				</nav>
			</Container>
		</header>
	);
};
