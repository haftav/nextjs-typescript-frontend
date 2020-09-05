type MethodOption = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Callback<T> = (data) => T;
interface Options {
  isExternal?: boolean;
}

export function makeRequest<T>(
  method: MethodOption,
  endpoint: string,
  callback: Callback<T>,
  fetchOptions: RequestInit = {},
  options: Options = {}
) {
  const fetchConfig: RequestInit = {...fetchOptions};
  const requestEndpoint = options.isExternal ? endpoint : '/api' + endpoint;

  return fetch(requestEndpoint, fetchConfig)
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((data) => callback(data));
}

export function makeProtectedRequest<T>(
  method: MethodOption,
  endpoint: string,
  callback: Callback<T>,
  fetchOptions: RequestInit = {}
) {
  const protectedEndpoint = '/protected' + endpoint;
  return makeRequest<T>(method, protectedEndpoint, callback, fetchOptions);
}
