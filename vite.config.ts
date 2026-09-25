import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const devVariant = mode === 'wheel-v1' || mode === 'wheel-v2' ? mode : null;
    const variantRootPlugin: Plugin | null = devVariant
        ? {
              name: 'wheel-variant-at-root',
              configureServer(server) {
                  server.middlewares.use((request, _response, next) => {
                      const devRequest = request as { url?: string };
                      const url = devRequest.url;
                      if (url && (url === '/' || url.startsWith('/?'))) {
                          devRequest.url = `/${devVariant}/${url.slice(1)}`;
                      }
                      next();
                  });
              },
          }
        : null;

    return {
        plugins: [react(), ...(variantRootPlugin ? [variantRootPlugin] : [])],
        server: { host: 'localhost', port: 5001, strictPort: true },
        preview: { host: 'localhost', port: 5001, strictPort: true },
        build: {
            rollupOptions: {
                input: {
                    index: 'index.html',
                    wheelV1: 'wheel-v1/index.html',
                    wheelV2: 'wheel-v2/index.html',
                },
            },
        },
    };
});
