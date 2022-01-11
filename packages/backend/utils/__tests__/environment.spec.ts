import { isProd, isTest, isDev } from '../environment';

describe('environment', () => {
  describe('isProd', () => {
    it('[isProd] Should return true when `NODE_ENV` is production', () => {
      process.env.NODE_ENV = 'production';
      const res = isProd();
      expect(res).toEqual(true);
    });

    it('[isProd] Should return false when `NODE_ENV` is !== production', () => {
      process.env.NODE_ENV = 'any';
      const res = isProd();
      expect(res).toEqual(false);
    });
  });

  describe('isTest', () => {
    it('[isTest] Should return true when `NODE_ENV` is test', () => {
      process.env.NODE_ENV = 'test';
      const res = isTest();
      expect(res).toEqual(true);
    });

    it('[isTest] Should return false when `NODE_ENV` is !== test', () => {
      process.env.NODE_ENV = 'any';
      const res = isTest();
      expect(res).toEqual(false);
    });
  });

  describe('isDev', () => {
    it('[isDev] Should return true when `NODE_ENV` is anything not `production` and `test`', () => {
      process.env.NODE_ENV = 'development';
      const res = isDev();
      expect.assertions(3);
      expect(res).toEqual(true);
      process.env.NODE_ENV = 'dev';
      expect(res).toEqual(true);
      process.env.NODE_ENV = 'any';
      expect(res).toEqual(true);
    });

    it('[isDev] Should return false when `NODE_ENV` is test or production', () => {
      process.env.NODE_ENV = 'test';
      const res = isDev();
      expect.assertions(2);
      expect(res).toEqual(false);
      process.env.NODE_ENV = 'production';
      expect(res).toEqual(false);
    });
  });
});
