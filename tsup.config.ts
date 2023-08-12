import type { Options } from "tsup";

export const tsup: Options = {
  splitting: true,
  clean: true, // clean up the dist folder
  dts: true, // generate dts files
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  entryPoints: ["src/main.ts"],
  outDir: "lib",
  entry: ["src/**/*.ts"], //include all files under src
};
