import { requestLogger } from './logger.js';
import { jest, describe, test, expect } from '@jest/globals';

describe('requestLogger', () => {
  test('debe llamar a next() al recibir una petición', () => {
    const req = {
      method: 'GET',
      path: '/health'
    } as any;

    const res = {
      on: jest.fn()
    } as any;

    const next = jest.fn();

    requestLogger(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('debe registrar el método y la ruta correctamente', () => {
    const req = {
      method: 'GET',
      path: '/health'
    } as any;

    const res = {
      statusCode: 200,
      on: jest.fn((evento: string, callback: () => void) => {
  if (evento === 'finish') {
    callback();
  }
})
    } as any;

    const next = jest.fn();

    const consoleSpy = jest
  .spyOn(console, 'log')
  .mockImplementation(() => {});

    requestLogger(req, res, next);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('GET /health')
    );

    consoleSpy.mockRestore();
  });
});