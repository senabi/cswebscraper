import type { PageServerLoad } from './$types';

export const config = {
  isr: {
    expiration: 60 * 2
  }
};

export const load: PageServerLoad = async () => {
  const rawRes = await fetch('http://extranet.unsa.edu.pe/sisacad/visualiza_fechas_b.php');
  const html = await rawRes.text();
  const start = html.indexOf('<tr><td>CIENCIA DE LA COMPUTACIÓN</td>');
  const htmlSub = html.substring(start);
  const end = htmlSub.indexOf('</tr>');
  const data = htmlSub.substring(0, end + 5);
  const now = new Date();
  return {
    schedule: {
      data,
      generatedAt: now.toISOString()
    }
  };
};
