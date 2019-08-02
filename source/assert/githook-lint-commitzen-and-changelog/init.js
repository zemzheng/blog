const fs = require("fs");
const pkgjson = require("./package.json");

const [useNpx, useEslint, useTslint] = process.argv[2].split(/\s/g).map(one => {
  const val = one.toLowerCase();
  return !!(val && val !== "n");
});

pkgjson.husky = {
  hooks: {
    "pre-commit": "lint-staged",
    "commit-msg": useNpx
      ? "npx commitlint -E HUSKY_GIT_PARAMS"
      : "commitlint -E HUSKY_GIT_PARAMS"
  }
};
pkgjson.config = {
  commitizen: {
    path: "cz-conventional-changelog"
  }
};

const jsExts = "*.{js,jsx}";
const lintStaged = "lint-staged";
if (useEslint) {
  pkgjson[lintStaged] = {
    ...pkgjson[lintStaged],
    [jsExts]: [useNpx ? "npx eslint --fix" : "eslint --fix", "git add"]
  };
}
const tsExts = "*.{ts,tsx}";
if (useTslint) {
  pkgjson[lintStaged] = {
    ...pkgjson[lintStaged],
    [tsExts]: [useNpx ? "npx tslint --fix" : "tslint --fix", "git add"]
  };
}

fs.writeFileSync("./package.json", JSON.stringify(pkgjson, null, 4));
