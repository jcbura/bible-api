/**
 * @type {import("prettier").Config}
 */
export default {
  singleQuote: true,
  semi: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.7.3',
  importOrderCaseSensitive: false,
};
