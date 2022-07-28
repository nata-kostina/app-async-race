import { baseUrl } from '../data/constants';
import { FetchRequest } from '../types/types';

const makeUrl = (request: FetchRequest) => {
  const url = new URL(`${baseUrl}/${request.url}`);
  if (request.queryParams) {
    const entries = Object.entries(request.queryParams);
    entries.forEach((entry) => {
      const [key, value] = entry;
      url.searchParams.append(key, value);
    });
  }

  return url.toString();
};

const handleResponse = (response: Response) => {
  if (!response.ok) throw new Error(`Ooops! ${response.status} ${response.statusText}`);
  return response;
};

function load <T>(request: FetchRequest): Promise<T> {
  const fetchUrl = makeUrl(request);
  console.log(fetchUrl);
  const par = request.dataParams ? JSON.stringify(request.dataParams) : null;
  console.log('Before Fetch', par);
  return fetch(fetchUrl, {
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: request.method,
    body: request.dataParams ? JSON.stringify(request.dataParams) : null,
  })
    .then((response) => handleResponse(response))
    .then((res): Promise<T> => res.json())
    .then((data) => data)
    .catch((error: Error) => { throw new Error(error.message); });
}

export default load;
