/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
// eslint-disable-next-line padding-line-between-statements
module.exports = {
	// When running locally in development mode, we use the built in remix
	// server. This does not understand the vercel lambda module format,
	// so we default back to the standard build output.
	server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
	ignoredRouteFiles: [".*"],
	appDirectory: "app",
	assetsBuildDirectory: "./public/build",
	publicPath: "/build/",
	serverBuildPath: "api/index.js",
	serverMainFields: ["main", "module"],
	serverModuleFormat: "cjs",
	serverPlatform: "node",
	serverMinify: false,
	future: {
		v2_errorBoundary: true,
		v2_normalizeFormMethod: true,
		v2_routeConvention: true,
		v2_meta: true,
	},

	devServerPort: 3000,
}
