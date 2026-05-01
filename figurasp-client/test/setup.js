import { afterEach, afterAll, beforeAll } from 'vitest';
import '@testing-library/jest-dom';
import { setupServer } from "msw/node";
import { handlers } from './mock/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());