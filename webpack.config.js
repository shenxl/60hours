var path = require('path');

var config = {
    entry:path.resolve(__dirname, 'app/App.js'),
    output:{
        path: path.resolve(__dirname, 'public'),
        filename:"bundle.js"
    },
    module:{
        loaders:[
            {
                test:/\.jsx?$/,
                exclude:/(node_modules|bower_components|server)/,
                loader:'babel-loader'
            },

            // SASS
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            // Image
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=dist/[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }

        ]
    }
};
module.exports = config;