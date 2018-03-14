const path = require('path');

const config = {
    entry: path.join(__dirname, '/client/index.js'),
    output:{
        path: path.join(__dirname, './public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader'
        },{
            test: /\.css$/,
            loaders:['style-loader', 'css-loader']
        }]
    },
    resolve:{
        extensions: ['.js', '.jsx']
    }
};

module.exports = config;