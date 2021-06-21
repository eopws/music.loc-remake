const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    // ...
    webpack: {
        alias: {
            '@assets': resolvePath('./src/assets'),
            '@player': resolvePath('./src/player'),
            '@playlist': resolvePath('./src/playlist'),
            '@addSong': resolvePath('./src/add-song'),
            '@store': resolvePath('./src/store'),
            '@utils': resolvePath('./src/utils'),
        }
    },
  // ...
}