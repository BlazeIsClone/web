import { Interest } from 'types';
import { Col, Container, Row } from 'react-grid-system';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { Typography, Surface } from 'components';
import styles from './Interests.module.scss';
import { Props } from './Interests.types';

export const Interests: React.FC<Props> = ({ data, collection }) => (
	<section id={data['section-id']} className={styles.interests}>
		<Container>
			<Typography type="display-2">{data.headline}</Typography>

			<Tabs defaultIndex={1}>
				<TabList>
					{collection?.docs?.map((interests: Interest, idx) => (
						<Tab key={idx}>
							<button>
								<Typography type="headline-6" className={styles.type}>
									{interests.type}
								</Typography>
							</button>
						</Tab>
					))}
				</TabList>
				{collection?.docs?.map((interests: Interest, idx) => (
					<TabPanel key={idx}>
						<Row className={styles.row}>
							{interests.interest.map((item, idx) => (
								<Col key={idx} lg={3}>
									<Surface>
										<a href={item.link}>
											<img src={item.image?.url} />
											<h4>{item.title}</h4>
										</a>
									</Surface>
								</Col>
							))}
						</Row>
					</TabPanel>
				))}
			</Tabs>
		</Container>
	</section>
);
