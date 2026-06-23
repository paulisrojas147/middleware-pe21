import express, { Request, Response, NextFunction } from 'express';
import { requestLogger } from './middlewares/logger.js';
import { requireApiKey } from './middlewares/auth.js';
import v1Inscripciones from './routes/v1/inscripciones.js';   // nuevo
import v2Inscripciones from './routes/v2/inscripciones.js';   // nuevo

const app = express();

app.use(express.json());      // 1. Parseo del cuerpo
app.use(requestLogger);       // 2. Logger
app.use(requireApiKey);       // 3. Autenticación

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

app.use('/v1/inscripciones', v1Inscripciones);   // nuevo
app.use('/v2/inscripciones', v2Inscripciones);   // nuevo

app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
