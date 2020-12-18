const host = 'http://127.0.0.1:3055';

export default {
  authPath: (): string => [host, 'api/auth/'].join('/'),
};
