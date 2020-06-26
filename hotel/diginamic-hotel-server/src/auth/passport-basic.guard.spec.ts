import { PassportBasicGuard } from './passport-basic.guard';

describe('PassportBasicGuard', () => {
  it('should be defined', () => {
    expect(new PassportBasicGuard()).toBeDefined();
  });
});
