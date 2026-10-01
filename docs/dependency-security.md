# Corrección de dependencias y actualización de ESLint — 2026-10-01

## Alcance y resultado

La auditoría del backend reportaba 4 paquetes con severidad alta. Las causas estaban en dos dependencias indirectas de la herramienta Prisma; las alertas también se propagaban a `@prisma/config` y `prisma`.

| Dependencia | Introducida por | Versión anterior | Versión corregida instalada |
| --- | --- | --- | --- |
| `deepmerge-ts` | `@prisma/config@7.10.0` | 7.1.5 | 8.0.2 |
| `mysql2` | `prisma@7.10.0` | 3.15.3 | 3.24.5 |

Se añadieron overrides en `backend/package.json`, limitados a `@prisma/config@7.10.0` y al rango declarado de Prisma (`^7.10.0`). `backend/package-lock.json` conserva las versiones y sus hashes de integridad. `npm ls` confirmó que las dependencias instaladas usan esos overrides.

## Compatibilidad y mantenimiento

La versión 8 de deepmerge-ts cambia la combinación de valores Map y algunos tipos auxiliares. La configuración de Prisma de este proyecto combina objetos ordinarios y se comprobó mediante validación, generación del cliente y consulta del estado de migraciones. Al actualizar Prisma o añadir configuraciones con Map, revisar la compatibilidad y retirar los overrides cuando la versión del proveedor incorpore las correcciones.

Avisos de los mantenedores:

- [deepmerge-ts: recursión con referencias circulares](https://github.com/RebeccaStevens/deepmerge-ts/security/advisories/GHSA-ggr8-5vv4-36mx); [cambios de la versión 8](https://github.com/RebeccaStevens/deepmerge-ts/releases/tag/v8.0.0).
- [mysql2: exposición de credenciales por cambio de autenticación](https://github.com/sidorares/node-mysql2/security/advisories/GHSA-3f6p-5ww8-9rcr).
- [mysql2: descompresión sin límite](https://github.com/sidorares/node-mysql2/security/advisories/GHSA-rgwj-5xj2-c3m3).

## Verificación ejecutada

Desde la raíz, con `pnpm dlx npm@11 --prefix backend` en el entorno de Codex:

- `ci`: reinstalación reproducible aprobada.
- `audit --json`: 0 vulnerabilidades reportadas.
- `ls deepmerge-ts mysql2`: versiones corregidas confirmadas.
- `run lint` y `run typecheck`: aprobados.
- `test`: prueba de salud aprobada (1 prueba, 0 fallos).
- `run test:db`: conexión real a PostgreSQL 17.11 aprobada (1 prueba, 0 fallos).
- `run build`: compilación aprobada.
- `run db:migrate:status`: migraciones al día en `repuestos_3d_dev`.
- `prisma validate`, ejecutado desde el backend: esquema válido.

La auditoría refleja los avisos disponibles en esa fecha. Los tests comprobados cubren la configuración actual del proyecto.

## Actualización de ESLint del backend

Con aprobación del usuario, se actualizó `eslint` de 9.39.5 a 10.11.0 y `@eslint/js` de 9.39.5 a 10.0.1. `typescript-eslint@8.71.0` declara compatibilidad con ESLint 10; `npm ls` confirmó dependencias válidas. El equipo usa Node.js 24.19, dentro de las versiones admitidas por [ESLint 10](https://eslint.org/docs/latest/use/migrate-to-10.0.0).

Después de actualizar, se ejecutaron nuevamente `ci`, `audit --json`, `run lint`, `run typecheck`, `test`, `run test:db` y `run build` del backend: todos aprobados, 0 vulnerabilidades y dos pruebas aprobadas en sus respectivas suites. La instalación ya no mostró la advertencia de ESLint sin soporte.

## Compatibilidad pendiente del frontend

El frontend usa `eslint-config-next@16.3.8`. Aunque esa configuración admite ESLint a partir de 9, sus plugins `eslint-plugin-react@7.37.5` y `eslint-plugin-jsx-a11y@6.10.2` declaran rangos que llegan hasta la versión 9. Se comprobó en los metadatos publicados mediante `npm view`. El frontend conserva ESLint 9.39.5; migrarlo requiere una versión compatible de los plugins o una adaptación evaluada por separado. Esta actualización solo modificó las dependencias del backend.

## Aviso de instalación pendiente

El script de instalación de `esbuild@0.28.2` continúa sin autorización. Las pruebas con tsx y la compilación funcionan. Cualquier autorización adicional de scripts requiere aprobación del usuario.

## Estado de Git

El usuario aprobó cuatro commits separados para estas correcciones y la publicación de la rama `feature/mvp-foundation` en el repositorio GitHub YordanDeVp/TRE-D.
