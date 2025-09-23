import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react({
            // Use React plugin in all *.jsx and *.tsx files
            include: '**/*.{jsx,tsx}',
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    server: {
        hmr: {
            host: 'localhost',
        },
    },
    css: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    build: {
        chunkSizeWarningLimit: 1600,
    },
});
