const esbuild = require('esbuild');
const cssModulesPlugin = require('esbuild-css-modules-plugin');
const extensibilityMap = require('@neos-project/neos-ui-extensibility/extensibilityMap.json');
const isWatch = process.argv.includes('--watch');

/** @type {import("esbuild").BuildOptions} */
const options = {
    logLevel: 'info',
    bundle: true,
    target: 'es2020',
    entryPoints: {Plugin: 'src/index.js'},
    loader: {'.js': 'tsx', '.vanilla-css': 'css'},
    outdir: '../../Public/GeoPointEditor',
    alias: extensibilityMap,
    plugins: [cssModulesPlugin()],
};

if (isWatch) {
    esbuild.context(options).then((ctx) => ctx.watch());
} else {
    esbuild.build(options);
}
