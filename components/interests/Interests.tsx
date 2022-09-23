import { Interest } from 'types';
import { Col, Container, Row } from 'react-grid-system';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { Typography, Surface, Media } from 'components';
import styles from './Interests.module.scss';
import { Props } from './Interests.types';

export const Interests: React.FC<Props> = ({ data, collection }) => (
	<section
		id={data['section-id']}
		className={styles.interests}
		data-scroll-section>
		<Container>
			<Typography type="display-2">{data.headline}</Typography>
			<div data-scroll data-scroll-speed={1}>
				<Tabs>
					<TabList>
						{collection?.docs?.map((interests: Interest, idx) => (
							<Tab key={idx} selectedClassName={styles.activeTab}>
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
										<div data-scroll data-scroll-speed={-1}>
											<Surface>
												<div data-scroll data-scroll-speed={1}>
													<a
														href={item.link}
														target={'_blank'}
														className={styles.item}>
														<Media image={item.image} />
														<h4>{item.title}</h4>
													</a>
												</div>
											</Surface>
										</div>
									</Col>
								))}
							</Row>
						</TabPanel>
					))}
				</Tabs>
			</div>
		</Container>
	</section>
);
