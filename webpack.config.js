var path = require('path');
var webpack = require('webpack');


var config = {
    entry:[
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        path.join(__dirname, 'app/App.js')],
    output:{
        path: path.join(__dirname, 'dist'),
        filename:"bundle.js",
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module:{
        loaders:[
            {
                test:/\.jsx?$/,
                include: path.join(__dirname, 'app'),
                //exclude:/(node_modules|bower_components|server)/,
                loaders: ['react-hot', 'babel']
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