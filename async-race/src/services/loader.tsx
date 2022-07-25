import { baseUrl } from '../data/constants';
import { FetchRequest } from '../types/types';

const makeUrl = (request: FetchRequest) => {
  const url = new URL(`${baseUrl}/${request.url}`);
  if (request.params) {
    const entries = Object.entries(request.params);
    entries.forEach((entry) => {
      const [key, value] = entry;
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
};

const handleResponse = (response: Response) => {
  if (!response.ok) throw new Error();
  return response;
};

const load = (request: FetchRequest) => {
  const fetchUrl = makeUrl(request);
  debugger;
  const promise = fetch(fetchUrl)
    .then((response) => handleResponse(response))
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => console.log('The response status is not OK'));
  console.log('Promise', promise);
  console.log('END LOAD');
};

export default load;
