import baseUrl from '../data/constants';

const makeUrl = (url: string) => `${baseUrl}/${url}`;

const load = (url: string) => {
  const fetchUrl = makeUrl(url);
  fetch(fetchUrl)
    .then((res) => res.json())
    .then((data) => data);
};

export default load;
