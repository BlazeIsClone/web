import { ReactNode } from 'react';

export interface Props {
	children: ReactNode;
	className?: string;
	type?:
		| 'display-1'
		| 'display-2'
		| 'headline-1'
		| 'headline-2'
		| 'headline-3'
		| 'headline-4'
		| 'headline-5'
		| 'headline-6'
		| 'paragraph-big'
		| 'paragraph-bold'
		| 'paragraph'
		| 'rich-text';
}
