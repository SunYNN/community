var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: {
        upload: path.resolve(__dirname, 'source/components/upload/app.js')
    },

    output: {
        path: path.resolve(__dirname, 'source/components/upload'),
        filename: '[name].debug.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
    
        ]
    },
  /*   resolve: {
        alias: {
            swiper: path.resolve(__dirname, 'source/lib/swiper/idangerous.swiper.min'),
        }
    }*/
};