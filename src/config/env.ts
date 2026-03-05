export const env = import.meta.env;

if (!env.VITE_SERVER_URL) {
  throw new Error("VITE_SERVER_URL is not defined");
} else {
  console.log("VITE_SERVER_URL -> ", env.VITE_SERVER_URL);
}

if (!env.VITE_BUILD_ENV) {
  throw new Error("VITE_APP_TITLE is not defined");
} else {
  console.log("VITE_BUILD_ENV -> ", env.VITE_BUILD_ENV);
}
