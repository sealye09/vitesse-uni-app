import antfu from "@antfu/eslint-config";

import {
  globals,
  prettierConfig,
  sortManifestJson,
  sortPagesJson,
  sortThemeJson,
} from "./eslint";

export default antfu({
  type: "app",
  unocss: false,
  lessOpinionated: true,
  stylistic: false,
  ignores: [
    "dist",
    "node_modules",
    "src/uni_modules",
    "manifest.json",
    "pages.json",
  ],
  formatters: false,
  javascript: {
    /// keep-sorted
    overrides: {
      "no-console": "off",
      curly: "off",
      eqeqeq: "off",
    },
  },
  imports: {
    /// keep-sorted
    overrides: {
      "import/newline-after-import": ["error", { count: 1 }],
      "import/order": "off",
    },
  },
  yaml: {
    /// keep-sorted
    overrides: {
      "pnpm/yaml-enforce-settings": "off",
    },
  },
  markdown: true,
  vue: {
    vueVersion: 3,
    /// keep-sorted
    overrides: {
      "vue/attributes-order": ["error", { alphabetical: true }],
      "vue/html-self-closing": [
        "error",
        {
          html: { component: "always", normal: "never", void: "always" },
          math: "always",
          svg: "always",
        },
      ],
    },
  },
})
  .removePlugins("antfu", "style", "format")
  // override rules exits in @antfu/eslint-config
  .override("antfu/jsdoc/rules", {
    /// keep-sorted
    rules: {
      "jsdoc/require-returns-description": "off",
    },
  })
  .override("antfu/perfectionist/setup", {
    /// keep-sorted
    rules: {
      "perfectionist/sort-exports": [
        "error",
        { order: "asc", type: "natural" },
      ],
      "perfectionist/sort-imports": ["error"],
      "perfectionist/sort-named-exports": "error",
      "perfectionist/sort-named-imports": "error",
    },
  })
  // append custom rules and plugins
  .append(globals())
  .append(sortManifestJson())
  .append(sortPagesJson())
  .append(sortThemeJson())
  // append prettier config that must be the last one
  .append(prettierConfig());
