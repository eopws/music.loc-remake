const path = require('path')

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    // ...
    webpack: {
        alias: {
            '@assets': resolvePath('./src/assets'),
            '@store': resolvePath('./src/store'),
            '@player': resolvePath('./src/player'),
            '@playlist': resolvePath('./src/playlist'),
            '@add-track': resolvePath('./src/add-track'),
            '@http': resolvePath('./src/http'),
            '@utils': resolvePath('./src/utils'),
        }
    },
  // ...
}