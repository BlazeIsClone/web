import styles from './About.module.scss';
import { Props } from './About.types';

export const About: React.FC<Props> = ({ data }) => (
	<section id={data['section-id']} className={styles.about}>
		<p>{data.content}</p>
	</section>
);
