import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            provider: 'v8',
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
                statements: 80,
                // perFile: true, // Enforce thresholds per file
            },
            enabled: true,
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['teamResponse.ts']
        },
        globals: true,
        environment: 'jsdom',
        setupFiles: './test/setup.js',
    },
});