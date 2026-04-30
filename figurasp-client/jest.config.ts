import type { Config } from 'jest';

const config: Config = {
    rootDir: './',
    preset: 'ts-jest',
    // testEnvironment: 'jsdom',
    testEnvironment: '@bufbuild/jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(gif|css|tiff|eot|svg|webp|json|png|jpg|jpeg)$': '<rootDir>/test/mocks/fileMock.js',
    },
};

export default config;
