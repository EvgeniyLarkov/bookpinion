const host = 'http://127.0.0.1:3055';

export default {
  authPath: (): string => [host, 'api/auth/'].join('/'),
  profilePath: (): string => [host, 'user/'].join('/'),
  bookPath: (id?: string): string => [host, `book/${id || ''}`].join('/'),
  metaPath: (): string => [host, 'api/meta/'].join('/'),
  articlePath: (id?: string, start?: number, end?: number): string => [host, `article/${id || ''}${
    (start !== null && end !== null)
      ? `?start=${start}&end=${end}` : ''}`].join('/'),
};
