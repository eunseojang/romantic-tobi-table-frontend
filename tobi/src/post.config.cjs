// postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // 브라우저 호환성을 위해 autoprefixer도 포함하는 것을 권장합니다.
  },
};