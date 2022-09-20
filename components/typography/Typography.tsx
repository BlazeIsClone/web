import React from 'react';

import { Props } from './Typography.types';
import styles from './Typography.module.scss';
import { RichText } from 'components';

export const Typography: React.FC<Props> = ({ children, className, type }) => {
	const propStyles = className || '';

	switch (type) {
		case 'display-1':
			return <h1 className={`${propStyles} ${styles.display1}`}>{children}</h1>;

		case 'display-2':
			return <h2 className={`${propStyles} ${styles.display2}`}>{children}</h2>;

		case 'headline-1':
			return (
				<h3 className={`${propStyles} ${styles.headline1}`}>{children}</h3>
			);

		case 'headline-2':
			return (
				<h4 className={`${propStyles} ${styles.headline2}`}>{children}</h4>
			);

		case 'headline-3':
			return (
				<h4 className={`${propStyles} ${styles.headline3}`}>{children}</h4>
			);

		case 'headline-4':
			return (
				<h5 className={`${propStyles} ${styles.headline4}`}>{children}</h5>
			);

		case 'headline-5':
			return (
				<h5 className={`${propStyles} ${styles.headline5}`}>{children}</h5>
			);

		case 'headline-6':
			return (
				<h5 className={`${propStyles} ${styles.headline6}`}>{children}</h5>
			);

		case 'paragraph-big':
			return (
				<p className={`${propStyles} ${styles.paragraphBig}`}>{children}</p>
			);

		case 'paragraph-bold':
			return (
				<p className={`${propStyles} ${styles.paragraphBold}`}>{children}</p>
			);

		case 'paragraph':
			return <p className={`${propStyles} ${styles.paragraph}`}>{children}</p>;

		case 'rich-text':
			return (
				<RichText
					className={`${propStyles} ${styles.richText}`}
					content={children}
				/>
			);

		default:
			return <p>{children}</p>;
	}
};
