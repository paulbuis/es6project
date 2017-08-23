module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["warn", 4],
        "linebreak-style": ["warn", "windows"],
        "quotes": ["warn","single"],
        "semi": ["warn","always"],
        "no-console": "off"
    }
};