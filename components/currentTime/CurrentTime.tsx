import React, { useEffect, useState } from 'react';

import { Typography } from 'components';
import { Props } from './CurrentTime.types';
import styles from './CurrentTime.module.scss';

export const CurrentTime: React.FC<Props> = ({ className }) => {
	const [date, setDate] = useState(new Date());

	const time = date.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });

	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
		}, 60 * 10);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<Typography type="headline-5" className={className}>
			{time}
		</Typography>
	);
};
