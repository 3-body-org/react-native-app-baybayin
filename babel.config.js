module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin", 
      ["module-resolver", {
        root: ["./src"],
        alias: {
          "@app": "./src/app",
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@quiz": "./src/components/quiz",
          "@data": "./src/data",
          "@hooks": "./src/hooks",
          "@utils": "./src/utils",
        },
      },
    ],
    ],
  };
};
