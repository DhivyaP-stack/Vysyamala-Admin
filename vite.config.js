// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': 'https://vysyamaladevnew-aehaazdxdzegasfb.westcentralus-01.azurewebsites.net/',
//     },
//   },
// });



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://vysyamaladevnew-aehaazdxdzegasfb.westcentralus-01.azurewebsites.net/',
    },
  },
  build: {
    outDir: 'dist', // Ensures the built files go into 'dist' for deployment
  },
  base: '/', // Ensures correct routing in Azure
});

