
var penthouse = require('penthouse'),
    CleanCSS = require('clean-css'),
    path = require('path'),
    fs = require('fs');

const prePath = './';
const FrontendConfig = require(prePath +'frontend.config');

const SITE_URL = FrontendConfig.protocol + FrontendConfig.host + ':' + FrontendConfig.port;
const URLS = FrontendConfig.criticalCSS;

const PATHS = {
    build: path.join(__dirname, prePath, 'content/build/css/')
};

var allKeys = Object.keys(URLS);
var count = allKeys.length;

function getNextPromise(i) {
    return new Promise(function(resolve){
        var key = allKeys[i];
        var value = URLS[key];
        var entry = {
            file: key,
            url: value
        };

        console.log(`\x1b[32mGenerating: \x1b[37m${path.join(PATHS.build + entry.file)} at ${entry.url}`);

        penthouse({
            url: SITE_URL + entry.url,
            css: path.join(PATHS.build + entry.file),
            // OPTIONAL params
            width: FrontendConfig.width,                    // viewport width
            height: FrontendConfig.height,                    // viewport height
            forceInclude: FrontendConfig. forceInclude,
            timeout: 30000,                 // ms; abort critical CSS generation after this timeout
            strict: false,                  // set to true to throw on CSS errors (will run faster if no errors)
            maxEmbeddedBase64Length: 1000,  // characters; strip out inline base64 encoded resources larger than this
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', // specify which user agent string when loading the page
            renderWaitTime: 500,            // ms; render wait timeout before CSS processing starts (default: 100)
            blockJSRequests: true,          // set to false to load (external) JS (default: true)
            customPageHeaders: {
                'Accept-Encoding': 'identity' // add if getting compression errors like 'Data corrupted'
            }
        }, function(err, criticalCss) {
            if (err) {
                console.log('\x1b[31mError:\x1b[37m', err);
                // handle error
                throw err;
            }
            var outputFile = entry.file.replace('.css','.critical.css');
            var output = new CleanCSS().minify(criticalCss);

            if (output.errors.length || output.warnings.length) {
                console.log('\x1b[31mClean-CSS Error:\x1b[37m', output.errors, output.warnings);
            }

            var fileContents = output.styles;

            fs.writeFileSync(path.join(PATHS.build + outputFile) , fileContents);
            resolve(outputFile);
        });

    });
}

function generateCritical(){
    for (var i = 0; i < count; i++) {
        getNextPromise(i).then(function(outputFile){
            console.log(`\x1b[32mCompleted: \x1b[37m${outputFile}`);
        });
    }
}


module.exports = generateCritical;
