import { jest, describe, test, expect } from '@jest/globals';
import { requireApiKey } from './auth.js';

describe('requireApiKey', () => {

  test('debe responder 401 cuando no existe API key', () => {
    const req = {
      headers: {}
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    const next = jest.fn();

    requireApiKey(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'API key inválida o ausente'
    });
    expect(next).not.toHaveBeenCalled();
  });


  test('debe responder 401 cuando la API key es incorrecta', () => {
    const req = {
      headers: {
        'x-api-key': 'clave-incorrecta'
      }
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    const next = jest.fn();

    requireApiKey(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'API key inválida o ausente'
    });
    expect(next).not.toHaveBeenCalled();
  });


  test('debe llamar a next() cuando la API key es válida', () => {
    const req = {
      headers: {
        'x-api-key': 'secreto-demo'
      }
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    const next = jest.fn();

    requireApiKey(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

});