import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import clear from 'rollup-plugin-clear';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  external: ['vue'],
  output: [
    {
      dir: 'es',
      format: 'es',
      entryFileNames: '[name].js',
    },
    {
      dir: 'cjs',
      format: 'cjs',
      entryFileNames: '[name].js',
    },
    {
      format: 'cjs',
      file: 'cjs/index.min.js',
      plugins: [terser()],
    },
  ],
  plugins: [
    clear({ targets: ['es', 'cjs'] }),
    vue({ preprocessStyles: true }),
    postcss({ extract: false }),
    typescript(),
  ],
};
