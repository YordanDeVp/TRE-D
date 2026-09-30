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

Los dos comandos dev se ejecutan en terminales distintas. El backend expone GET /health. La portada actual es un punto de partida; todavía no conecta catálogo, base de datos ni pagos.

Para verificar el esqueleto:

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

El archivo .env.example contiene solo nombres y valores ficticios para integraciones posteriores. En el entorno de Codex, donde npm no está en PATH, se verificaron los mismos scripts con pnpm dlx npm@11 --prefix.

## Estado

La especificación sigue abierta a revisión; la constitución y el plan son la base técnica aprobada para iniciar el MVP. T0, T9a y T1 están completadas: el contrato de entrega y los dos esqueletos están listos. Siguen pendientes Prisma/PostgreSQL, las reglas de negocio, pagos, envíos y notificaciones. La siguiente tarea es T2. El catálogo de ejemplo no acredita compatibilidad física de los repuestos ni representa precios comerciales reales.