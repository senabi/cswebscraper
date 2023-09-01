import { updater } from '$lib/scraper/cs';
import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
  runtime: 'edge'
};

export const POST = updater;
