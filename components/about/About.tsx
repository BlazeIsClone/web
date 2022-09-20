import { Container } from 'react-grid-system';
import dynamic from 'next/dynamic';

import styles from './About.module.scss';
import { Typography } from 'components';
import { Props } from './About.types';

const CurrentTime = dynamic(
	() => import('components').then(module => module.CurrentTime),
	{
		ssr: false,
	}
);

export const About: React.FC<Props> = ({ data }) => (
	<section id={data['section-id']} className={styles.about}>
		<Container>
			<Typography type="headline-3">{data.content}</Typography>
			<CurrentTime />
		</Container>
	</section>
);
