import {
  cleanupSVG,
  importDirectorySync,
  isEmptyColor,
  parseColors,
  runSVGO,
} from "@iconify/tools";
import { compareColors, stringToColor } from "@iconify/utils/lib/colors";

export function getLocalCollections(dir: string, prefix: string) {
  // Import icons
  const iconSet = importDirectorySync(dir, {
    includeSubDirs: false,
    prefix,
  });

  // Validate, clean up, fix palette and optimise
  iconSet.forEachSync((name, type) => {
    if (type !== "icon") return;

    const svg = iconSet.toSVG(name);
    if (!svg) {
      // Invalid icon
      iconSet.remove(name);
      return;
    }

    // Clean up and optimise icons
    try {
      // Clean up icon code
      cleanupSVG(svg);

      // Change color to `currentColor`
      // Skip this step if icon has hardcoded palette
      const blackColor = stringToColor("black");
      const whiteColor = stringToColor("white");
      parseColors(svg, {
        defaultColor: "currentColor",
        callback: (attr, colorStr, color) => {
          if (!color) {
            // Color cannot be parsed!
            throw new Error(
              `Invalid color: "${colorStr}" in attribute ${attr}`,
            );
          }

          if (isEmptyColor(color)) {
            // Color is empty: 'none' or 'transparent'. Return as is
            return color;
          }

          // Change black to 'currentColor'
          if (compareColors(color, blackColor as any)) return "currentColor";

          // Remove shapes with white color
          if (compareColors(color, whiteColor as any)) return "remove";

          // Icon is not monotone
          return color;
        },
      });

      // Optimise
      runSVGO(svg);
    } catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err);
      iconSet.remove(name);
      return;
    }

    // Update icon
    iconSet.fromSVG(name, svg);
  });

  // Export
  return iconSet.export();
}
