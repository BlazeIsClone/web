import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
	const { NEXT_PUBLIC_SERVER_URL } = process.env;

	const sort = 'sort=+createdAt';
	const pagination = 'limit=256';
	let payload: object[] = [];

	await Promise.all([
		fetch(`${NEXT_PUBLIC_SERVER_URL}/api/globals/contacts`).then(res =>
			res.json()
		),
		fetch(`${NEXT_PUBLIC_SERVER_URL}/api/globals/metadata`).then(res =>
			res.json()
		),
		fetch(`${NEXT_PUBLIC_SERVER_URL}/api/globals/navigation`).then(res =>
			res.json()
		),
		fetch(`${NEXT_PUBLIC_SERVER_URL}/api/globals/sections`).then(res =>
			res.json()
		),
		fetch(`${NEXT_PUBLIC_SERVER_URL}/api/interests?${sort}&${pagination}`).then(
			res => res.json()
		),
		fetch(`${NEXT_PUBLIC_SERVER_URL}/api/notes?${sort}&${pagination}`).then(
			res => res.json()
		),
		fetch(`${NEXT_PUBLIC_SERVER_URL}/api/projects?${pagination}`).then(res =>
			res.json()
		),
		fetch(`${NEXT_PUBLIC_SERVER_URL}/api/socials?${pagination}`).then(res =>
			res.json()
		),
		fetch(`${NEXT_PUBLIC_SERVER_URL}/api/tools?${pagination}`).then(res =>
			res.json()
		),
	]).then(response => payload.push(...response));

	return {
		props: {
			contacts: payload[0] || {},
			metadata: payload[1] || {},
			navigation: payload[2] || {},
			sections: payload[3] || {},
			interests: payload[4] || {},
			notes: payload[5] || {},
			projects: payload[6] || {},
			socials: payload[7] || {},
			tools: payload[8] || {},
		},
	};
};
