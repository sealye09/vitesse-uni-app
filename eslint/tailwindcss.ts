// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import pluginTailwindcss from "eslint-plugin-tailwindcss";

export function tailwindConfig() {
  return [
    ...pluginTailwindcss.configs["flat/recommended"],
    {
      rules: {
        "tailwindcss/no-custom-classname": "off",
      },
      settings: {
        /// keep-sorted
        tailwindcss: {
          callees: [
            "classnames",
            "class",
            "className",
            "cn",
            "clsx",
            "ctl",
            "cva",
            "twMerge",
          ], // These are the default values but feel free to customize
          classRegex: "^(class(Name|Names)?|.+-class)$",
          config: "tailwind.config.ts", // returned from `loadConfig()` utility if not provided
          cssFiles: [
            "**/*.css",
            "!**/node_modules",
            "!**/.*",
            "!**/dist",
            "!**/build",
          ],
          cssFilesRefreshRate: 5_000,
          removeDuplicates: true,
          skipClassAttribute: false,
          tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
          whitelist: [],
        },
      },
    },
  ];
}
