import { type Request, type Response, type NextFunction } from 'express';
import { createHmac, timingSafeEqual } from 'crypto';

// JSON WEB TOKEN - JWT
const JWT_TOKEN = process.env.JWT_TOKEN ?? 'secreto-demo-pe23';

function base64UrlDecode(str: string): string {
  return Buffer.from(str, 'base64url').toString('utf-8');
}

export function requireJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return res.status(401).json({ error: 'Token no existe' });
  }

  const parts = token.split('.');

  if (parts.length !== 3) {
    return res.status(401).json({ error: 'Token malformado' });
  }

  const [headersB64, payloadB64, signatureB64] = parts as string[];

  const header = JSON.parse(base64UrlDecode(headersB64 as string));

  if (header.alg !== 'HS256') {
    return res.status(401).json({ error: 'Algoritmo no permitido' });
  }

  const expectedSig = createHmac('sha256', JWT_TOKEN)
    .update(`${headersB64}.${payloadB64}`)
    .digest('base64url');

  const signatureBuffer = Buffer.from(signatureB64 as string);
  const expectedBuffer = Buffer.from(expectedSig);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return res.status(401).json({ error: 'Firma invalida' });
  }

  const claims = JSON.parse(base64UrlDecode(payloadB64 as string));

  const now = Math.floor(Date.now() / 1000);

  if (claims.exp && claims.exp < now) {
    return res.status(401).json({ error: 'Token expirado' });
  }

  if (!claims.sub) {
    return res.status(401).json({ error: 'Claim sub ausente' });
  }

  (req as Request & { user?: unknown }).user = {
    sub: claims.sub,
    scope: claims.scope ?? ''
  };

  next();
}

/*
export function requireApiKey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const key = req.headers['x-api-key'];

  if (key !== 'secreto-demo') {
    res.status(401).json({ error: 'API key inválida o ausente' });
    return;
  }

  next();
}
*/