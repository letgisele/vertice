export const siteConfig = {
	// Public contact address. Leave blank until the real address is available.
	contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
	// External HTTPS backend; never put provider credentials in NEXT_PUBLIC variables.
	aiEndpoint: process.env.NEXT_PUBLIC_AI_ENDPOINT || '',
};
export const team = [
	{
		name: 'Alex Morgan',
		photo: 'team-1.jpg',
		role: {
			pt: 'Estratégia & Business Intelligence',
			en: 'Strategy & Business Intelligence',
			es: 'Estrategia & Business Intelligence',
		},
	},
	{
		name: 'Sam Costa',
		photo: 'team-2.jpg',
		role: {
			pt: 'Engenharia de dados & Aplicações',
			en: 'Data Engineering & Applications',
			es: 'Ingeniería de datos & Aplicaciones',
		},
	},
	{
		name: 'Robin Lima',
		photo: 'team-3.jpg',
		role: {
			pt: 'Inteligência artificial & Automação',
			en: 'Artificial Intelligence & Automation',
			es: 'Inteligencia artificial & Automatización',
		},
	},
];
