import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import laravel from 'laravel-vite-plugin';
import path from 'node:path';
import vuePlugin from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    base: '/',
    plugins: [
        tailwindcss(),
        vuePlugin(),
        mkcert(),
        laravel({
            hotFile: 'Public/hot',
            input: [
                'Resources/ts/main.ts',
                'Resources/css/style.css',
            ],
            refresh: [ 
                'Resources/**', 
            ]
        }),
    ],
    server: {
        port: 3344,
        host: '127.0.0.1',
        cors: true,
        hmr: {
            protocol: 'wss',
            host: 'localhost',
        },
        https: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'Resources/ts'),
            '~': path.resolve(__dirname, '../../resources/ts'),
            '&': path.resolve(__dirname, '../../resources'),
            '@img': path.resolve(__dirname, 'Resources/img'),
            'vue': 'vue/dist/vue.esm-bundler.js',
        }
    },
    build: {
        outDir: 'Public/build',
        manifest: true,
        rollupOptions: {
            input: [
                './Resources/ts/main.ts',
                './Resources/css/style.css',
            ],
        }
    }
});
