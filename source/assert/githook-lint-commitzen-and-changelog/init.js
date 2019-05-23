const fs = require('fs');
const pkgjson = require('./package.json');


const [ useNpx, useEslint, useTslint ] = process.argv[ 2 ].split(/\s/g).map(
    one => {
        const val = one.toLowerCase();
        return !!(val && val !== 'n');
    }
);

pkgjson.husky = {
    hooks: {
        "precommit": "lint-staged",
        "commit-msg": useNpx
            ? "npx commitlint -E HUSKY_GIT_PARAMS"
            : "commitlint -E HUSKY_GIT_PARAMS"
    },
}
pkgjson.config = {
    commitizen: {
        path: "cz-conventional-changelog",
    }
};

const { linters } = (pkgjson[ "lint-staged" ] = { linters: {} });

if (useEslint) {
    linters[ "*.{js,jsx}" ] = [
        useNpx
            ? "npx eslint --fix"
            : "eslint --fix",
        "git add"
    ];
}

if (useTslint) {
    linters[ "*.{ts,tsx}" ] = [ "tslint --fix", "git add" ];
}

fs.writeFileSync(
    './package.json',
    JSON.stringify(pkgjson, null, 4),
);
