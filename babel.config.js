module.exports = {
    presets: ["babel-preset-expo"],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@": "./",
                },
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        ],
        [
            "module:react-native-dotenv",
            {
                moduleName: "@env",
                path: ".env",
                safe: false,
                allowUndefined: true,
            },
        ],
    ],
};
