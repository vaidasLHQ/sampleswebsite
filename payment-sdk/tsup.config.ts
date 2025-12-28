import { defineConfig } from 'tsup';

export default defineConfig([
  // Main SDK (client-side)
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: 'dist',
  },
  // Server SDK (Node.js)
  {
    entry: ['src/server/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    outDir: 'dist/server',
    platform: 'node',
  },
  // Embeddable Widget (IIFE for <script> tag)
  {
    entry: ['src/widget/index.ts'],
    format: ['iife'],
    globalName: 'FrogDripPayments',
    outDir: 'dist/widget',
    minify: true,
    sourcemap: true,
  },
]);

