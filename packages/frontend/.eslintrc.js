module.exports = {
  env: {
    jest: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.eslint.json'],
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    settings: {
      react: {
        version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
  },
  plugins: ['@typescript-eslint', 'only-warn'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-no-useless-fragment': 'warn',
    'func-names': 'off',
    'consistent-return': 'off',
    'require-await': 'warn',
    'import/no-cycle': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-anonymous-default-export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-mutable-exports': 'off',
    'no-plusplus': 'off',
    'no-console': 'warn',
    'no-underscore-dangle': 'off',
    'no-return-await': 'warn',
    'no-unsafe-member-access': 'off',
    'restrict-template-expressions': 'off',
    'explicit-module-boundary-types': 'off',
    '@typescript-eslint/require-await': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
  },
};
