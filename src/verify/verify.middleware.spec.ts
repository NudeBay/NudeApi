import { VerifyMiddleware } from './verify.middleware';

describe('VerifyMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyMiddleware()).toBeDefined();
  });
});
