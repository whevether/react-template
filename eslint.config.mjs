import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/", "build/", "dist/", "src/public/assets/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jquery,
        ...globals.jest,
        __BUILD_TYPE__: "readonly",
        __VITE_APP_API_BASE_URL__: "readonly",
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      quotes: 0,
      "no-console": 1,
      "no-debugger": 1,
      "no-var": 1,
      semi: [1, "always"],
      "no-trailing-spaces": 0,
      "eol-last": 0,
      "no-underscore-dangle": 0,
      "no-alert": 0,
      "no-lone-blocks": 0,
      "jsx-quotes": 1,
      // Classic JSX runtime needs `import React`, but it is not a direct reference.
      // ESLint 10 tracks JSX identifiers natively (espree); keep Babel out of the parser.
      "no-unused-vars": [
        1,
        {
          varsIgnorePattern: "^React$",
          caughtErrorsIgnorePattern: "^err$",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];
