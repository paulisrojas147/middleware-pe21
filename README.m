# Pruebas de la API

## Escenario 1: solicitud sin API key -> esperado: 401

Comando:
curl.exe http://localhost:3000/health 

Salida:
{"error":"API key inválida o ausente"}

Explicación:
El servidor rechaza la solicitud porque no se envió la API key requerida y devuelve un código de estado 401 Unauthorized.


## Escenario 2: solicitud con clave válida -> esperado: 200

Comando:
curl.exe -H "x-api-key: secreto-demo" http://localhost:3000/health

Salida:
{"status":"ok","ts":"2026-06-12T02:13:10.635Z"}

Explicación:
El servidor acepta la solicitud porque la API key es correcta y devuelve un código de estado 200 OK.


## Escenario 3: ruta inexistente -> esperado: 404

Comando:
curl.exe -H "x-api-key: secreto-demo" http://localhost:3000/noexiste

Salida:
{"error":"Ruta no encontrada"}

Explicación:
La solicitud contiene una API key válida, pero la ruta no existe, por lo que el servidor devuelve un código de estado 404 Not Found.





## TESTING

Para ejecutar las pruebas unitarias del proyecto se utiliza el siguiente comando:


npm test


Salida obtenida:

> api-paula@1.0.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js

(node:16900) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  src/middlewares/logger.test.ts
  requestLogger
    √ debe llamar a next() al recibir una petición (2 ms)
    √ debe registrar el método y la ruta correctamente (1 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.305 s, estimated 1 s
Ran all test suites.
PS C:\Users\L E N O V O\Documents\api-paula> npm test

> api-paula@1.0.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js

(node:31740) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  src/middlewares/auth.test.ts
 PASS  src/middlewares/logger.test.ts

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        0.412 s, estimated 1 s
Ran all test suites.

Los resultados muestran que los cinco casos de prueba fueron ejecutados correctamente, verificando el funcionamiento del 
middleware de registro de peticiones y del verificador de API key sin necesidad de levantar el servidor.
