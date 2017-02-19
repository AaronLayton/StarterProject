
module.exports = {
    // On the right is the full path to the starting JS file
    // On the left is the name of the `chunk` or files that are created
    // no .js on them as this name is also used for the .css files that are created
    entryFiles: {
        // Chunks saved in either `_tmp` or `build`folders depending on build environment
        'global': './content/js/global.js',
        //'pages/homepage': './content/js/pages/homepage.js',
        //'pages/listing': './content/js/pages/listing.js',
        //'pages/product': './content/js/pages/product.js',
    },

    // Map any CSS files to a corresponding URL and they will
    // generate a critical path CSS file for those
    criticalCSS: {
        // /Content/build/css/
        'global.css': '/',
        //'pages/homepage.css': '/',
        // 'pages/listing.css': '/sales',
        // 'pages/product.css': '/flex-flex-perforated-sanding-paper-120-grit-25-pack-282405',
    },

    // Force these CSS rules to be included all the time
    forceInclude: [
        '.keepMeEvenIfNotSeenInDom',
        /^\.regexWorksToo/
    ],

    // When testing the critical path, what size do you want the window to be
    width: 1920,                    // viewport width
    height: 1200,                    // viewport height

    // How many times can a module be used before being promoted to global js / css
    commonChunkCount: 2,

    // AutoPrefixer browser support
    browsers: '> 1%, last 2 versions',

    // URL fragments used for webpack and critical path css
    host: 'localhost',
    port: 9002, //80
    protocol: 'http://'
};
