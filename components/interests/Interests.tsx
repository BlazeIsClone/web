import { Interest } from 'types';
import styles from './Interests.module.scss';
import { Props } from './Interests.types';

export const Interests: React.FC<Props> = ({ data, collection }) => {
	return (
		<section id={data['section-id']} className={styles.interests}>
			<h2>{data.headline}</h2>
			{collection.docs.map((interests: Interest) => (
				<div key={interests.id}>
					<div>{interests.type}</div>
					{interests.interest.map(item => (
						<div key={item.id}>
							<h4>{item.title}</h4>
							<img src={item.image?.url} />
						</div>
					))}
				</div>
			))}
		</section>
	);
};
