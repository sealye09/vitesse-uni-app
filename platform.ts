import process from "node:process";

export const isH5 = process.env.UNI_PLATFORM === "h5";
export const isApp = process.env.UNI_PLATFORM === "app";
export const isMp = process.env.UNI_PLATFORM?.startsWith("mp-");
