import js from "@eslint/js";
import hooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  { ignores: ["dist/**", "node_modules/**"] },
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module", parserOptions: { ecmaFeatures: { jsx: true } }, globals: globals.browser },
    plugins: { "react-hooks": hooks },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^React$", caughtErrors: "none" }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
];
