var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: {
        post_text: path.resolve(__dirname, 'source/app')
    },

    output: {
        path: path.resolve(__dirname, 'build/post'),
        filename: '[name].debug.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
