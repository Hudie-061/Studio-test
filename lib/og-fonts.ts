export async function loadGoogleFont(
  family: string,
  weight: number
): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}`;
  const css = await (await fetch(cssUrl)).text();
  const match = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (!match) {
    throw new Error(`Failed to resolve font URL for ${family} ${weight}`);
  }

  const response = await fetch(match[1]);
  if (!response.ok) {
    throw new Error(`Failed to fetch font file for ${family} ${weight}`);
  }

  return response.arrayBuffer();
}
