const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your project
  output: {
    filename: 'bundle.js', // Output file after bundling
    path: path.resolve(__dirname, 'dist'), // Directory for the output file
  },
  module: {
    rules: [
      {
        test: /\.css$/, // To handle CSS imports
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development', // Set mode (development or production)
};
