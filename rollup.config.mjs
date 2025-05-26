import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import {dts} from 'rollup-plugin-dts';

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

/** @type {import('rollup').RollupOptions[]}  */
const options = [
    {
        input: 'src/index.ts',
        external: ['canvas','file-type'],
        output: [
            genOption('esm'),
            genOption('cjs'),
        ],
        plugins: [
            typescript({
                rootDir: "./src",
                declaration: false,
            }),
            terser(),
        ],

    },
    {
        input: 'src/index.ts',
        output: [{file: "lib/index.d.ts", format: "es"}],
        plugins: [dts()],
    },]

export default options;