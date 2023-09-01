import type { RequestHandler } from '../../routes/api/cron/$types';

export async function scraper() {
  const reqStart = new Date();
  const rawRes = await fetch('http://extranet.unsa.edu.pe/sisacad/visualiza_fechas_b.php');
  const reqEnd = new Date();
  const html = await rawRes.text();
  const start = html.indexOf('<tr><td>CIENCIA DE LA COMPUTACIÓN</td>');
  const htmlSub = html.substring(start);
  const end = htmlSub.indexOf('</tr>');
  const data = htmlSub.substring(0, end + 5);
  console.log('Request time: ', reqEnd.getTime() - reqStart.getTime());
  console.log('start: ', reqStart);
  console.log('end: ', reqEnd);
  return {
    data,
    generatedAt: reqStart.toISOString(),
    requestTime: reqEnd.getTime() - reqStart.getTime()
  };
}

export const updater: RequestHandler = async ({ getClientAddress }) => {
  const ip = getClientAddress();
  const data = await scraper();
  return new Response(
    JSON.stringify({
      ...data,
      generatedBy: ip
    })
  );
};

// CURL command to test this endpoint: curl -X POST https://sveltekit-schedule.vercel.app/api/schedule
