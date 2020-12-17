const host = '';

export default {
  authPath: (): string => [host, 'api/auth'].join('/'),
};
