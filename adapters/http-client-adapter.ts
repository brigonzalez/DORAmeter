export const getFetcher = async <T>(args: Request | string): Promise<T> => {
  const response = await fetch(args);

  return response.json();
};
