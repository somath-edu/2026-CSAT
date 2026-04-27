// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	site: 'https://somath-edu.github.io',
	base: '/wiki',
	output: 'hybrid',
	adapter: node({ mode: 'standalone' }),
});
