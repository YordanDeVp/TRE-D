# Tareas del MVP

Cada tarea debe dividirse en entregables verificables de hasta 30 minutos cuando se implemente. No iniciar un flujo si la decisión del PRD que lo afecta sigue abierta; las demás tareas pueden avanzar.

- [x] **T0 — Aprobar constitución y plan** · RF/RN/RNF: todos · Archivos: `docs/constitution.md`, `docs/plan.md`<br>
  **Hecho cuando:** ambos documentos tienen estado aprobado y no contradicen `docs/spec.md`.

- [x] **T1 — Inicializar frontend y backend** · RF/RN: arquitectura · Archivos: `frontend/package.json`, `backend/package.json`, `.env.example`<br>
  **Hecho cuando:** funcionan los scripts de instalación, desarrollo, lint, tipos y tests documentados en el README.

- [x] **T2 — Configurar Prisma y PostgreSQL** · RNF-04 · Archivos: `backend/prisma/schema.prisma`, migraciones, configuración de test<br>
  **Hecho cuando:** existe una base vacía de tablas de negocio, la migración inicial está aplicada y las pruebas usan PostgreSQL real.<br>
  **Evidencia (2026-10-01):** `repuestos_3d_dev` creada en PostgreSQL 17.11; migración `20261001000000_init` aplicada, sin pendientes; `test:db` aprobado (1 prueba, 0 fallos). Prisma 7.10.0 validado y generado; lint, tipos, prueba de salud y compilación del backend aprobados. Los modelos y las pruebas de concurrencia se completarán en sus respectivas tareas.

- [ ] **T3 — Modelo de identidad y roles** · RF-01, RF-02, RNF-03 · Módulo: `backend/accounts`<br>
  **Hecho cuando:** registro, sesión, recuperación y rol cliente validan sesión y no permiten crear administradores públicamente.

- [ ] **T4 — Guardas de propiedad y administración** · RF-09, RF-14, RF-16, RNF-03 · Módulo: middleware de autorización<br>
  **Hecho cuando:** un cliente no puede leer recursos ajenos ni llamar rutas administrativas; hay pruebas de ambos fallos.

- [ ] **T5 — Categorías, productos y variantes** · RF-03, RF-04, RF-05, RF-14 · Módulo: `backend/catalog`<br>
  **Hecho cuando:** catálogo paginado de repuestos y filamentos, fichas con atributos propios, combinaciones válidas y compatibilidades verificadas funcionan con Zod y OpenAPI.

- [ ] **T5a — Datos semilla del catálogo** · RF-03, RF-04, RF-05 · Archivos: datos semilla y [docs/demo-catalog.md](demo-catalog.md)<br>
  **Dependencia:** T2 y T5.<br>
  **Hecho cuando:** se cargan repuestos y filamentos con variantId y SKU únicos, precios/stock de demo y atributos visibles; los modelos de referencia sin verificación no se presentan como compatibilidad confirmada.

- [ ] **T6 — Imágenes públicas y fotos privadas** · RF-03, RF-04, RF-10, RN-02, RN-07 · Módulos: catálogo y solicitudes<br>
  **Hecho cuando:** se validan tipo real, extensión, tamaño y límite de fotos; solo propietario o administrador obtiene acceso privado.

- [ ] **T7 — Stock físico, reservas y ajustes** · RF-15, RN-03, RN-10 · Módulo: `backend/inventory`<br>
  **Hecho cuando:** reservas de 15 minutos son atómicas, el recuento inferior bloquea nuevas reservas y abre una incidencia sin alterar pedidos automáticamente.

- [ ] **T8 — Cupos de fabricación** · RF-13, RN-03, RN-12 · Módulo: inventario/capacidad<br>
  **Hecho cuando:** aceptar una cotización reserva un cupo atómico por 30 minutos, lo libera al vencer y permite revisar falta de material.

- [x] **T9a — Contrato de comprobación de entrega** · RF-07, RF-14, RN-08 · Archivos: `docs/plan.md`, `docs/openapi`<br>
  **Dependencia:** usar RF-07 y RN-08; las zonas locales son etiquetas y cada dirección se comprueba manualmente en inDrive, sin mapa automático.<br>
  **Hecho cuando:** se definen entradas, respuestas, permisos y errores para zona, operador, comprobación manual de disponibilidad y tarifa de inDrive u Olva/Shalom, solicitud pendiente, resultado con o sin cobertura, nueva consulta de inDrive tras abandonar checkout sin pagar o al vencer 15 minutos desde su confirmación, elección de recojo y total final. La app no presupone cobertura por distrito o departamento ni exige polígonos geográficos.

- [ ] **T9b — Persistencia de zonas y comprobaciones de entrega** · RF-14, RN-01, RN-06, RN-08 · Archivos: `backend/prisma/schema.prisma`, migración<br>
  **Dependencia:** T2 y T9a.<br>
  **Hecho cuando:** se guardan zonas, operadores, destino, solicitud pendiente vinculada al carrito y cada comprobación manual con importe exacto, hora, vencimiento de inDrive y administrador; desactivar una opción conserva los datos de pedidos y cotizaciones.

- [ ] **T9c — Consulta y administración de entrega** · RF-07, RF-14, RN-08 · Módulo: `backend/orders`<br>
  **Dependencia:** T4 y T9b.<br>
  **Hecho cuando:** solo el administrador registra un estimado consultado en la app de inDrive para la ciudad o de Olva/Shalom para provincia; Express impide pagar mientras la comprobación esté pendiente y permite pagar por entrega solo con resultado disponible, no vencido, para ese destino y tarifa aceptada por el cliente; rechaza un importe impuesto por el navegador.

- [ ] **T9d — Pantalla administrativa de entrega** · RF-14, RNF-01, RNF-02, RNF-06 · Módulo: frontend administración<br>
  **Dependencia:** T9c.<br>
  **Hecho cuando:** el administrador habilita zonas, inDrive, Olva y Shalom y registra el estimado local o la cobertura y tarifa del courier en PEN; el cliente ve el texto exacto de espera sin cobro, luego el estimado de inDrive o la tarifa confirmada del courier, el total y cuándo vence la comprobación de inDrive antes de pagar.

- [ ] **T9 — Carrito y revalidación de checkout** · RF-06, RF-07, RN-01, RN-08 · Módulos: frontend carrito y `backend/cart`<br>
  **Dependencia:** completar T9a–T9d para envíos; el recojo gratuito puede desarrollarse en paralelo.<br>
  **Hecho cuando:** el carrito persiste; el cliente elige recojo gratuito o espera una entrega solicitada; si no hay cobertura o rechaza el estimado de inDrive selecciona recojo gratuito y paga solo productos; tras la tarifa registrada revisa y acepta el total e inicia en ese checkout el pago de productos y envío juntos; si abandona antes de hacerlo o vence el plazo de 15 minutos, la tarifa de inDrive debe consultarse de nuevo; Express recalcula precio y tarifa, exige aceptación del total antes del pago y pide datos de domicilio solo para envío. Sin modalidad elegida no inicia el pago.

- [ ] **T10 — Creación de pedido y reserva de catálogo** · RF-07, RF-09, RF-15, RN-06, RN-08 · Módulos: `backend/orders`, inventario<br>
  **Hecho cuando:** pedido y reserva por variantId se crean en una sola transacción breve; un fallo revierte ambos. El historial conserva producto, precio, destino, servicio e importe; la llamada a Mercado Pago ocurre después del commit.

- [ ] **T11 — Integración de pago aprobado/rechazado** · RF-08, RN-04 · Módulo: `backend/payments`<br>
  **Hecho cuando:** el backend consulta al proveedor, no usa la URL de retorno para confirmar y procesa aprobado/rechazado de forma idempotente.

- [ ] **T11a — Solicitud real de inDrive tras pagar** · RF-07, RF-21, RN-08 · Módulos: pedidos y administración<br>
  **Dependencia:** T9c y T11; el pedido debe estar pagado y preparado.<br>
  **Hecho cuando:** el administrador solicita el viaje real solo después de verificar el pago de producto y envío y completar la preparación; registra el resultado y conserva el precio de envío aceptado sin recalcularlo ni pedir otro pago; no descuenta stock antes de la salida y, si no consigue conductor, abre RF-21.

- [ ] **T12 — Pago pendiente y vencimiento** · RF-07, RF-08, RN-09 · Módulo: pagos/inventario<br>
  **Hecho cuando:** un intento iniciado a tiempo conserva reserva hasta resolución o hasta 3 días desde su inicio; antes de liberarla se consulta al proveedor y un estado no verificable abre incidencia sin liberar stock.

- [ ] **T13 — Solicitudes y cotizaciones versionadas** · RF-10, RF-11, RF-12, RN-08 · Módulos: `backend/requests`, `backend/quotes`<br>
  **Dependencia:** RF-12 y RN-08 de la especificación; la entrega de la cotización debe estar confirmada.<br>
  **Hecho cuando:** solicitud, revisión, cotización versionada de 14 días con modalidad, destino e importe de envío (o recojo a S/ 0), y respuesta del cliente quedan auditables; cambiar dirección antes de pagar o encontrar otra tarifa de inDrive exige nueva versión y aceptación.

- [ ] **T14 — Pedido personalizado y producción simulada** · RF-13, RN-12 · Módulos: pedidos/cotizaciones<br>
  **Hecho cuando:** pago aprobado crea orden de producción, verifica materia prima, pausa si falta y exige aceptación de nuevo plazo o reembolso.

- [ ] **T15 — Aprobación tardía e incidencias** · RF-08, RF-15, RN-04 · Módulos: pagos, inventario, pedidos<br>
  **Hecho cuando:** catálogo ofrece reemplazo compatible, espera o reembolso; personalizado ofrece nuevo cupo/plazo o reembolso, siempre con aceptación expresa.

- [ ] **T16 — Reembolsos y cancelación administrativa** · RF-15, RN-11 · Módulos: pagos/pedidos<br>
  **Hecho cuando:** el reembolso total es idempotente; cancelar un pedido pagado espera su confirmación y libera asignación sin aumentar stock físico. El reembolso de solo envío se cubre en T30.

- [ ] **T17 — Avisos de cuenta** · RF-16 · Módulo: `backend/notifications`, frontend<br>
  **Hecho cuando:** solicitudes de información, tarifas listas para checkout, cotizaciones, cambios e incidencias generan avisos con enlace correcto; el recordatorio opcional por WhatsApp se registra como comunicación manual; el aviso de listo para recoger se cubre en T22.

- [ ] **T18 — Pruebas críticas de concurrencia y permisos** · RF-08, RF-09, RF-15, RNF-04 · Tests backend<br>
  **Hecho cuando:** última unidad, cupo concurrente, webhook duplicado, pago tardío, recuento inferior y acceso ajeno tienen evidencia automatizada.

- [ ] **T19 — Recorridos E2E y accesibilidad** · RF-01 a RF-21, RNF-01, RNF-02, RNF-06 · Tests frontend<br>
  **Hecho cuando:** compra de repuesto y filamento, espera de tarifa sin pago, retorno con tarifa confirmada, falta de cobertura con recojo, cotización, falta de material, recojo y reembolso se recorren en 360/768/1440 px con teclado y estados visibles; los casos extensos de RF-17 a RF-21 se cubren en T31.

- [ ] **T20 — Validación final y documentación** · todos · Archivos: `docs/openapi`, README y resultados<br>
  **Hecho cuando:** cada RF tiene evidencia, lint/tipos/tests ejecutados están registrados y las variables de demo no contienen secretos.

- [ ] **T21 — Calendario de atención y aviso web** · RF-07, RF-14, RF-16, RF-19, RN-08 · Módulos: pedidos y frontend<br>
  **Hecho cuando:** el administrador registra feriados y cierres extraordinarios si no hay reemplazo; la web muestra sus fechas junto al horario y antes de pagar por recojo; los días sin atención no cuentan y el cierre extraordinario se comunica manualmente por redes sociales o WhatsApp.

- [ ] **T22 — Preparación y aviso de listo para recoger** · RF-16, RF-17, RN-03 · Módulos: pedidos y avisos<br>
  **Hecho cuando:** solo un pedido pagado y preparado puede pasar a listo, el cliente recibe un aviso único y el stock físico no disminuye todavía.

- [ ] **T23 — Autorización y código de recojo** · RF-18, RN-07, RN-13 · Módulos: pedidos y cuentas<br>
  **Hecho cuando:** solo el comprador autoriza o revoca a un tercero, se conserva el historial y se emite un código privado de un solo uso que se invalida al cambiar la autorización o modalidad.

- [ ] **T24 — Entrega en tienda registrada** · RF-17, RF-18, RN-03, RN-13 · Módulos: pedidos e inventario<br>
  **Hecho cuando:** nombre y código vigentes permiten entregar; se registran receptor, administrador, hora e intentos fallidos sin revelar el código; entrega, consumo del código y salida física ocurren una sola vez.

- [ ] **T25 — Cómputo de siete días y seguimiento** · RF-19 · Módulo: pedidos<br>
  **Hecho cuando:** el seguimiento aparece una sola vez tras siete días de atención desde el aviso, con sábados incluidos y domingos, feriados y cierres extraordinarios sin reemplazo excluidos; no cancela ni libera el pedido.

- [ ] **T26 — Registro de llamada de recojo** · RF-19, RN-07 · Módulo: administración<br>
  **Hecho cuando:** el administrador registra contactado o sin respuesta, hora y observaciones; si el pedido se entregó, canceló o cambió a envío, no queda llamada pendiente.

- [ ] **T27 — Propuesta de envío tras recojo pagado** · RF-20, RN-08, RN-14 · Módulos: pedidos y administración<br>
  **Hecho cuando:** la propuesta conserva la compra original, incluye dirección, comprobación de cobertura y tarifa en inDrive u Olva/Shalom, exige nueva consulta de inDrive si se abandona o pasan 15 minutos sin iniciar pago, y requiere aceptación expresa; sin aceptación o cobertura permanece el recojo.

- [ ] **T28 — Pago adicional y conversión a envío** · RF-08, RF-20, RN-15 · Módulos: pagos y pedidos<br>
  **Hecho cuando:** al aceptar la propuesta se inicia el pago solo del envío en un intento separado; pago pendiente o rechazado conserva recojo; aprobación verificada cambia modalidad e invalida el código solo si el pedido aún puede despacharse, sin duplicar producto ni fabricación.

- [ ] **T29 — Incidencia por pérdida de cobertura** · RF-21, RN-16 · Módulos: pedidos y administración<br>
  **Hecho cuando:** antes de la salida física, incluso si inDrive no asigna conductor tras el pago, se bloquea despacho y se muestra al comprador recojo con devolución del envío o cancelación total, se registra su elección y sin respuesta queda en revisión.

- [ ] **T30 — Reembolsos por componente** · RF-21, RN-11, RN-16 · Módulos: pagos y pedidos<br>
  **Hecho cuando:** recojo devuelve todo el envío efectivamente cobrado y conserva producto y asignación; cancelación devuelve todos los importes aún no reembolsados y libera solo al confirmarse; los reintentos no devuelven dos veces.

- [ ] **T31 — Recorridos E2E de recojo y envío posterior** · RF-17 a RF-21 · Tests frontend/backend<br>
  **Hecho cuando:** se prueban tercero autorizado y revocado, código reutilizado, feriado, llamada, cargo adicional pendiente o tardío y ambas elecciones tras pérdida de cobertura sin doble salida ni doble reembolso.
