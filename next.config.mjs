// A separate local build folder avoids stale locked output on Windows.
const config = {
  distDir: ".next-build",
  outputFileTracingRoot: process.cwd(),
};
export default config;
