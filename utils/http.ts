type MethodOption = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface Options {
  isExternal?: boolean;
}

export function makeRequest(
  method: MethodOption,
  endpoint: string,
  fetchOptions: RequestInit = {},
  options: Options = {}
) {
  const fetchConfig: RequestInit = {...fetchOptions, method};
  const requestEndpoint = options.isExternal ? endpoint : '/api' + endpoint;

  return fetch(requestEndpoint, fetchConfig).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}

export function makeProtectedRequest(
  method: MethodOption,
  endpoint: string,
  fetchOptions: RequestInit = {},
  options: Options = {}
) {
  const protectedEndpoint = '/protected' + endpoint;
  return makeRequest(method, protectedEndpoint, fetchOptions, options);
}

export function makeExternalRequest(
  method: MethodOption,
  endpoint: string,
  fetchOptions: RequestInit = {},
  options: Options = {}
) {
  return makeRequest(method, endpoint, fetchOptions, {
    isExternal: true,
    ...options,
  });
}
