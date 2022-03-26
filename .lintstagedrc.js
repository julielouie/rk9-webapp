module.exports = {
  '**/*.ts?(x)': filenames => [`eslint --fix ${filenames.join(' ')}`, `git add ${filenames.join(' ')}`],
};
