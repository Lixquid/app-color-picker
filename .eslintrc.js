function prodOnly(mode) {
    return process.env.NODE_ENV === "production" ? mode : "off";
}

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "@vue/prettier",
        "@vue/prettier/@typescript-eslint"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "no-console": prodOnly("error"),
        "no-debugger": prodOnly("error")
    }
};
