import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import vitePluginSvgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src")
    }
  },
  plugins: [react(), vitePluginSvgr()],
})
