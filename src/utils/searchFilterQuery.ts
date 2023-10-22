const searchFilterQuery = () => {
  if (typeof window === 'undefined') return { start: null, end: null };
  const urlParams = new URLSearchParams(window.location.search);
  const start = urlParams.get('start');
  const end = urlParams.get('end');
  return { start, end };
};

export default searchFilterQuery;
