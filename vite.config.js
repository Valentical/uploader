import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
      host: true,
      allowedHosts: ['img.osh.gay'],
      port: 5173,
      cors: true
    }
});
