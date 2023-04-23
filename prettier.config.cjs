/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  jsxSingleQuote: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
