import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "https://api.nextleet.com",
				changeOrigin: true,
				secure: true, // set to false if self-signed cert
				rewrite: (path) => path.replace(/^\/api/, ""), 
			},
		},
		host: "0.0.0.0",
		proxy: {
			"/subscribe": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
		},
	},
	plugins: [react(), tailwindcss()],
});
