module.exports = {
  extends: ['@commitlint/config-lerna-scopes', '@commitlint/config-conventional'],
  rules: {
    'header-max-length': [1, 'always', 120],
  },
};
