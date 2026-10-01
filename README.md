# TRE-D

Demo de e-commerce en español para repuestos impresos en 3D y filamentos. El proyecto se desarrollará íntegramente en este repositorio. Moneda: PEN. Los pagos, el inventario, el envío y el recojo se modelan con reglas verificables para una demostración. Ya existen esqueletos ejecutables de frontend y backend; los flujos comerciales siguen pendientes.

## Documentos del proyecto

- [Especificación de producto](docs/spec.md): requisitos funcionales, reglas de negocio y criterios de finalización. Es la fuente principal para implementar.
- [Constitución](docs/constitution.md): principios de ingeniería aprobados como base técnica.
- [Plan técnico](docs/plan.md): arquitectura, datos, flujos y pruebas previstos.
- [Tareas](docs/tasks.md): trabajo pendiente con criterios observables.
- [Catálogo de demostración](docs/demo-catalog.md): repuestos y filamentos con variantes, precios y stock ficticios.
- [Prompts por fase](docs/prompts.md): ayudas actualizadas para continuar el trabajo.
- [Resumen de reanudación](docs/session-summary.md): estado y decisiones del proyecto.

## Política de commits

- Cada commit representa una función concreta, una corrección concreta o una adición concreta.
- Por defecto, el commit incluye cambios de un solo archivo.
- Se incluyen varios archivos únicamente cuando están vinculados y cada uno es necesario para que esa misma función o corrección funcione correctamente; no se agrupan cambios independientes.
- Antes de confirmar, se revisan exactamente los archivos preparados y se ejecutan las verificaciones pertinentes. El mensaje describe el cambio específico.
- Se preparan rutas explícitas; no se añaden todos los archivos del repositorio por comodidad.

## Desarrollo local

Probado con Node.js 24.19 y npm 11. El frontend usa el puerto 3000 y el backend el 4000 por defecto.

```powershell
npm --prefix frontend ci
npm --prefix backend ci
npm --prefix backend run dev
npm --prefix frontend run dev
```

Los dos comandos dev se ejecutan en terminales distintas. El backend expone GET /health. La portada actual es un punto de partida; los flujos de catálogo y pagos siguen pendientes. Prisma ya permite conectarse a PostgreSQL desde el backend.

### Base de datos de desarrollo — T2 / RNF-04

Se usa PostgreSQL 17.11 instalado localmente y Prisma 7.10.0. La base se llama `repuestos_3d_dev`. La configuración de Prisma y la prueba de integración leen `DATABASE_URL` del archivo `.env` en la raíz del repositorio.

En la primera configuración, copia `.env.example` a `.env` y reemplaza la contraseña ficticia por tu credencial local. Si `.env` ya existe, conserva su contenido. No publiques ese archivo; Git lo ignora. Si la contraseña contiene caracteres especiales, codifícalos para una URL.

Si la base todavía no existe, créala con el cliente instalado de PostgreSQL; el comando pide la contraseña de forma interactiva:

```powershell
& "C:\Program Files\PostgreSQL\17\bin\createdb.exe" -h localhost -p 5432 -U postgres -W repuestos_3d_dev
```

Después, desde la raíz del repositorio:

```powershell
npm --prefix backend run db:migrate:deploy
npm --prefix backend run db:migrate:status
npm --prefix backend run test:db
```

La migración inicial registra el punto de partida y crea el historial `_prisma_migrations`; todavía no hay tablas de negocio. `test:db` ejecuta una consulta con Prisma contra PostgreSQL real y comprueba la versión 17. Las pruebas de concurrencia de pedidos y stock se incorporarán en sus tareas.

Scripts adicionales del backend:

- `db:generate`: genera el cliente Prisma; también se ejecuta antes de tipos, compilación y `test:db`.
- `db:migrate:dev`: crea y aplica migraciones al desarrollar modelos, y regenera el cliente. Requiere permisos para la base auxiliar de Prisma; si propone reiniciar una base, revisar antes de aceptar.
- `db:migrate:deploy`: aplica las migraciones ya guardadas en el repositorio.
- `db:migrate:status`: consulta qué migraciones están aplicadas o pendientes.

Docker Compose queda como opción futura; esta configuración usa el servicio local de PostgreSQL.

Para verificar las aplicaciones:

```powershell
npm --prefix frontend run lint
npm --prefix frontend run typecheck
npm --prefix frontend test
npm --prefix frontend run test:e2e
npm --prefix frontend run build
npm --prefix backend run lint
npm --prefix backend run typecheck
npm --prefix backend test
npm --prefix backend run build
```

El archivo `.env.example` contiene la dirección de la base local y valores ficticios para las credenciales e integraciones. En el entorno de Codex, donde npm no está en PATH, se verificaron los mismos scripts con `pnpm dlx npm@11 --prefix`.

**Verificación de T2 (2026-10-01):** esquema Prisma válido, cliente generado, lint, tipos, prueba de salud y compilación del backend aprobados. La migración `20261001000000_init` está aplicada en `repuestos_3d_dev`, sin migraciones pendientes; la prueba de conexión real pasó (1 prueba, 0 fallos) con PostgreSQL 17.11.

## Estado

La especificación sigue abierta a revisión; la constitución y el plan son la base técnica aprobada para iniciar el MVP. T0, T9a, T1 y T2 están completadas: el contrato de entrega, los dos esqueletos y la base local con Prisma están listos. Siguen pendientes los modelos de negocio, identidad, permisos, pagos, envíos y notificaciones. La siguiente tarea es T3, modelo de identidad y roles, sujeta a aprobación del usuario. El catálogo de ejemplo no acredita compatibilidad física de los repuestos ni representa precios comerciales reales.