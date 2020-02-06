import babel from 'rollup-plugin-babel';

const plugins = [
  babel({
    exclude: 'node_modules/**'
  })
];

export default [{
  input: 'src/index.js',
  output: {
    name: 'active-type',
    file: 'lib/index.esm.js',
    format: 'esm',
    exports: 'named',
    sourcemap: true,
  },
  plugins: plugins,
}, {
  input: 'src/index.js',
  output: {
    name: 'active-type',
    file: 'lib/index.js',
    format: 'cjs',
    exports: 'named',
    sourcemap: true,
  },
  plugins: plugins,
}];
