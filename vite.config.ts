import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const devSite = [
        'wheel-v1-co',
        'wheel-v1-ar',
        'wheel-v2-co',
        'wheel-v2-ar',
    ].includes(mode)
        ? mode
        : null;
    const variantRootPlugin: Plugin | null = devSite
        ? {
              name: 'wheel-variant-at-root',
              configureServer(server) {
                  server.middlewares.use((request, _response, next) => {
                      const devRequest = request as { url?: string };
                      const url = devRequest.url;
                      if (url && (url === '/' || url.startsWith('/?'))) {
                          devRequest.url = `/${devSite}/${url.slice(1)}`;
                      }
                      next();
                  });
              },
          }
        : null;

    return {
        base: mode === 'gitlab' ? '/lunazo/dist/' : '/',
        plugins: [react(), ...(variantRootPlugin ? [variantRootPlugin] : [])],
        server: { host: 'localhost', port: 5001, strictPort: true },
        preview: { host: 'localhost', port: 5001, strictPort: true },
        build: {
            rollupOptions: {
                input: {
                    index: 'index.html',
                    wheelV1Co: 'wheel-v1-co/index.html',
                    wheelV1Ar: 'wheel-v1-ar/index.html',
                    wheelV2Co: 'wheel-v2-co/index.html',
                    wheelV2Ar: 'wheel-v2-ar/index.html',
                },
            },
        },
    };
});
