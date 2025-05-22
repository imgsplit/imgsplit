import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

function genOption(format) {
    const ext = format === 'esm' ? 'mjs' : format;

    return {
        dir: 'lib',
        sourcemap: true,
        format: format,
        entryFileNames: `[name].${ext}`,
        chunkFileNames: `[name].${ext}`,
    }
}

/** @type {import('rollup').RollupOptions}  */
const options  ={
    input: 'src/index.ts',
    external:['canvas'],
    output: [
        genOption('esm'),
        genOption('cjs'),
    ],
    plugins: [
        typescript(),
        terser()
    ],

}

export default options;