const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const makeApiRequest = async <T>(
  url: string,
  options: RequestInit,
  hasMeta = false,
): Promise<T> => {
  const response = await fetch(baseUrl + url, {
    ...options,
    headers: { 'Content-Type': 'application/json' },
  });
  return options.method !== 'DELETE'
    ? await response.json().then((res) => (!hasMeta ? res.data : res))
    : undefined;
};
