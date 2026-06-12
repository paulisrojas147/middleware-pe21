import express, {type Request,type Response, type NextFunction } from 'express' //así se declara con module, no usar require
import { requestLogger } from './middlewares/logger.js';
import { requireApiKey } from './middlewares/auth.js';


const app=express();
//const no se puede reasignar el valor
//let se puede reasignar el valor
//var para declarar variables glpbañes

//usando middleware
app.use(express.json()); // 1. Parseo del cuerpo
app.use(requestLogger); // 2. Logger
app.use(requireApiKey); // 3. Autenticación


app.get('/health', (_req: Request, res: Response) => {
res.json({ status: 'ok', ts: new Date().toISOString() });
});

// Manejador de rutas inexistentes (404)
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

// Manejador de errores: siempre al final, con cuatro parámetros
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) =>
{
res.status(500).json({ error: 'Error interno del servidor' });
});
app.listen(3000, () => console.log('Servidor en puerto 3000'));