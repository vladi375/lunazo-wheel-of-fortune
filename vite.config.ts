import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: { host: 'localhost', port: 5001, strictPort: true },
    preview: { host: 'localhost', port: 5001, strictPort: true },
    build: {
        rollupOptions: {
            input: {
                index: 'index.html',
                landing1: 'landing-1/index.html',
                landing2: 'landing-2/index.html',
            },
        },
    },
});
