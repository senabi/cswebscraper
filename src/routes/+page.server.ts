import { scraper } from '$lib/scraper/cs';
import type { PageServerLoad } from './$types';
import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
  runtime: 'edge'
};

export const load: PageServerLoad = async ({ getClientAddress }) => {
  const ip = getClientAddress();
  const data = await scraper();
  return { ...data, ip };
};
