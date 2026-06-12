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