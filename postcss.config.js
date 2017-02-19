//var postcssSettings = require('./content/js/modules/frontend-build/postcss-settings');
const FrontendConfig = require('./frontend.config');

module.exports = {
    plugins: [
        require('postcss-smart-import')({ /* ...options */ }),
        require('postcss-custom-properties')({ /* ...options */ }),
        require('postcss-apply')({ /* ...options */ }),
        require('precss')({ /* ...options */ }),
        require('autoprefixer')({
            browsers: FrontendConfig.browsers
        })
    ]
};
