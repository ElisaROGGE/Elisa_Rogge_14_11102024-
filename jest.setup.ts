import '@testing-library/jest-dom';

import 'whatwg-fetch';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation((message) => {
    throw new Error(message);
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
