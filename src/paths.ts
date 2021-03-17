import _ from 'lodash';

const host = 'http://127.0.0.1:3055';

export default {
  authPath: (): string => [host, 'api/auth/'].join('/'),

  profilePath: (): string => [host, 'user/'].join('/'),

  bookPath: (payload?: { id?: string[][] | string }): string => [host, `book/${typeof payload?.id === 'string'
    ? payload.id
    : `?${new URLSearchParams(payload?.id)}`}`].join('/'),

  bookUpdatePath: ({ id }: { id: string }): string => [host, `book/update/${id}`].join('/'),

  metaPath: (): string => [host, 'api/meta/'].join('/'),

  articlePath: (payload?: { id?: string, start?: string, end?: string, category?: string }): string => [host, `article/${
    payload?.id || ''
  }?${
    new URLSearchParams(_.omit(payload, 'id') as Record<string, string>)
  }`].join('/'),
};
