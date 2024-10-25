type FetchWrapper = {
  get(url: string, requestOptions?: RequestInit): Promise<Response>;
  post(
    url: string,
    data: object,
    requestOptions?: RequestInit
  ): Promise<Response>;
};

const fetchWrapper: FetchWrapper = {
  get,
  post,
};

async function get(url: string, requestOptions?: RequestInit) {
  const response = await fetch(url, requestOptions);

  return response;
}

async function post(url: string, data: object, requestOptions?: RequestInit) {
  const response = await fetch(url, {
    body: JSON.stringify(data),
    ...requestOptions,
  });

  return response;
}

export default fetchWrapper;
