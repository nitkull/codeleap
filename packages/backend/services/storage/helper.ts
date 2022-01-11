import { sha512 } from 'services/auth/helpers/password';

export function hyphenated2CamelCase(str: string): string {
  return str.replace(/\-([a-z])/gi, (_, hyphenated) =>
    hyphenated.toUpperCase()
  );
}

export function camelCase2Hyphenated(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([^0-9])/g, '$1-$2')
    .replace(/([^0-9])([0-9])/g, '$1-$2')
    .replace(/-+/g, '-')
    .toLowerCase();
}

export function sanitizeMetadata(metadata: { [key: string]: string }) {
  metadata = metadata || {};
  return Object.keys(metadata).reduce(
    (carry: { [key: string]: string }, key: string) => ({
      ...carry,
      [camelCase2Hyphenated(key)]: metadata[key]
    }),
    {}
  );
}

export function hashFilename(filename: string): string {
  return sha512(filename);
}
