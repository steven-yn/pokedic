const getPokemonIdForUrl = (url: string): string => {
  if (!url) return '';
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 2];
};

export default getPokemonIdForUrl;
