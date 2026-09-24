import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const devVariant = mode === 'landing-1' || mode === 'landing-2' ? mode : null;
    const landingRootPlugin: Plugin | null = devVariant
        ? {
              name: 'landing-at-root',
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
        plugins: [react(), ...(landingRootPlugin ? [landingRootPlugin] : [])],
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
    };
});
