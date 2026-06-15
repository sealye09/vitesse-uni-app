import pluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import { getDefaultSelectors } from "eslint-plugin-better-tailwindcss/defaults";

export function tailwindConfig() {
  return [
    pluginBetterTailwindcss.configs.recommended,
    {
      /// keep-sorted
      rules: {
        "better-tailwindcss/enforce-consistent-important-position": [
          "error",
          { position: "legacy" },
        ],
        "better-tailwindcss/enforce-consistent-line-wrapping": "off",
        "better-tailwindcss/enforce-consistent-variable-syntax": ["error", { syntax: "variable" }],
        "better-tailwindcss/enforce-consistent-variant-order": "warn",
        "better-tailwindcss/enforce-shorthand-classes": "warn",
        "better-tailwindcss/no-unknown-classes": "off",
      },
      settings: {
        /// keep-sorted
        "better-tailwindcss": {
          selectors: [
            // preserve default selectors
            ...getDefaultSelectors(),
          ],
          tailwindConfig: "tailwind.config.ts",
          tsconfig: "tsconfig.json",
        },
      },
    },
  ];
}
