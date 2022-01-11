import { InvalidRequestBodyError } from 'core/errors';

export const parseQuery = (
  query: string | Record<string, any> = {}
): Record<string, any> => {
  if (typeof query === 'string') {
    try {
      query = JSON.parse(query);
    } catch (err) {
      throw Promise.reject(
        new InvalidRequestBodyError('Query is not a valid JSON string', err)
      );
    }
  }

  return query as Record<string, any>;
};
