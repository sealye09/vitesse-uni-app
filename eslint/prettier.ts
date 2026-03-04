import pluginPrettier from "eslint-plugin-prettier";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export function prettierConfig() {
  const rules = { ...pluginPrettierRecommended.rules };
  delete rules["vue/html-self-closing"];

  const config = {
    name: "seal/prettier",
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...rules,
      "prettier/prettier": "error",
    },
  };

  return config;
}
