import { Interest } from 'types';
import { Container } from 'react-grid-system';

import { Typography } from 'components';
import styles from './Interests.module.scss';
import { Props } from './Interests.types';

export const Interests: React.FC<Props> = ({ data, collection }) => {
	return (
		<section id={data['section-id']} className={styles.interests}>
			<Container>
				<Typography type="display-2">{data.headline}</Typography>
				{collection.docs.map((interests: Interest) => (
					<div key={interests.id}>
						<div>{interests.type}</div>
						{interests.interest.map(item => (
							<a key={item.id} href={item.link}>
								<h4>{item.title}</h4>
								<img src={item.image?.url} />
							</a>
						))}
					</div>
				))}
			</Container>
		</section>
	);
};
