# Plan del MVP — e-commerce de repuestos impresos en 3D y filamentos

**Estado:** base técnica aprobada para iniciar el MVP según la Spec 001 vigente al 2026-09-30. **Base:** docs/spec.md y docs/constitution.md. Cada implementación debe citar sus RF, RN o RNF. Los contratos concretos se fijarán en OpenAPI antes de implementar cada módulo.

## 1. Arquitectura

### Frontend

- Next.js con App Router, React, TypeScript estricto y Tailwind CSS.
- Vistas de catálogo, ficha, carrito, checkout, autenticación, mis pedidos, solicitudes, cotizaciones y administración.
- El frontend muestra el total calculado por Express y los estados de carga, vacío, error y éxito; no autoriza precios, stock, permisos ni pagos.
- La web publica horario, feriados y cierres extraordinarios sin atención junto a la información de tienda y en el checkout de recojo (RF-07, RF-16).

### Backend

- Express y TypeScript estricto, rutas delgadas, validación Zod y reglas en servicios.
- Prisma accede a PostgreSQL. Supabase Auth valida identidad; Express comprueba rol y propiedad antes de exponer datos privados.
- Módulos: cuentas, catálogo, inventario, pedidos, solicitudes, cotizaciones, pagos y avisos. Los límites entre módulos se mantienen explícitos; Pedidos usa operaciones públicas de Inventario.
- Mercado Pago queda detrás de un adaptador; el backend verifica el estado con el proveedor y procesa avisos de forma idempotente.

## 2. Modelo de datos conceptual

- **User/Profile:** identidad, rol y datos del comprador.
- **Category/Product/ProductImage/Variant/Compatibility:** repuestos y filamentos con atributos por categoría, combinación vendible y stock por variantId. Los modelos de referencia sin verificación física no se publican como compatibilidad confirmada. Los ejemplos están en [demo-catalog.md](demo-catalog.md).
- **InventoryRecord/Reservation/Allocation/StockMovement:** unidades físicas, reservas temporales, asignaciones a pedidos pagados y salida física. Los ajustes conservan motivo, autor y fecha (RN-03).
- **ManufacturingCapacity/CapacityReservation:** cupos de pedidos personalizados.
- **Cart/CartItem:** carrito y cantidades sujetas a revalidación.
- **Order/OrderItem/AddressSnapshot/DeliveryTerms:** condiciones históricas de producto, precio, entrega, operador y tarifa; los cambios posteriores se agregan como eventos (RN-06).
- **ShippingZone/DeliveryOperator/DeliveryCheck/DeliveryCheckRequest/CheckoutAttempt:** zonas locales habilitadas, Olva y Shalom para destinos provinciales definidos, solicitud de comprobación pendiente asociada al carrito y resultado manual de cobertura y tarifa con destino, importe, hora y administrador. El resultado puede ser disponible o sin cobertura (RF-07, RF-14, RN-08).
- **StoreClosedDay:** feriados y cierres extraordinarios sin atención publicados en la web y excluidos del recordatorio de recojo (RF-16, RF-19).
- **PickupAuthorization/PickupCode/PickupHandover/PickupFollowUp:** tercero autorizado, código de un solo uso, entrega registrada y llamada tras siete días hábiles; se conservan revocaciones e intentos fallidos sin almacenar el código en el historial (RF-17 a RF-19, RN-13).
- **Payment/PaymentEvent/Refund:** intento original o cargo adicional solo por envío, estados verificados, referencias externas, idempotencia y reembolsos por componente efectivamente cobrado (RN-09, RN-11, RN-15, RN-16).
- **CustomRequest/RequestAttachment/Quote/QuoteVersion:** solicitud, fotos privadas, versiones y condiciones aceptadas.
- **OrderStatusEvent/Incident/Notification:** auditoría de estados, decisiones e incidencias y avisos en la cuenta.

## 3. Entrega y cobertura

- **Motorizado en Arequipa:** se solicita solo para Cayma Alta, Yanahuara, Paucarpata, José Luis Bustamante y Rivero, Vallecito, Valle Blanco, Selva Alegre y Miraflores cuando la zona está habilitada. No hay mapa automático: el cliente indica zona y dirección; el administrador valida ambas y consulta en la app de inDrive, único operador local de la demo, un estimado concreto sin pedir aún un conductor. El cliente acepta ese importe y paga producto más envío; después de confirmar el pago y preparar el pedido, el administrador solicita el viaje real. Si no hay conductor, se aplica RF-21. El precio de envío aceptado queda fijo para el pedido y no cambia al solicitar el viaje real. S/ 15 es una referencia, no un importe fijo (RF-07, RN-08).
- **Courier:** fuera de la ciudad de Arequipa dentro de la región Arequipa, y en Apurímac, Cusco, Madre de Dios, Moquegua, Puno y Tacna, la demo permite elegir Olva o Shalom. El administrador comprueba entrega a residencia y tarifa en su app para cada destino antes de habilitar el pago. El nombre del departamento no garantiza cobertura de todas sus direcciones (RF-07, RN-08).
- **Recojo gratuito:** disponible aun si existe envío. Referencia La Gran Vía / galería Compucenter, lunes a sábado de 10:00 a 20:00 hora local, excepto feriados y cierres extraordinarios sin reemplazo. El cliente espera el aviso de listo; la web muestra las fechas de cierre antes del pago. Sin modalidad elegida no se inicia el pago (RF-07, RF-16).
- **Espera de tarifa:** al solicitar envío se guarda la comprobación pendiente ligada al carrito, sin pedido, reserva ni pago. El checkout muestra literalmente «Estamos calculando el costo de envío. Aún no se realizó ningún cobro» y bloquea el pago por envío. El administrador registra cobertura y tarifa; un aviso en la cuenta, y opcionalmente un mensaje manual por WhatsApp, invita a revisar el total y aceptar envío o recojo. Si no hay cobertura o el cliente rechaza el estimado de inDrive, el checkout selecciona recojo gratuito; el pedido de recojo solo se crea cuando el cliente paga los productos. Si el cliente abandona el checkout sin iniciar pago, una comprobación de inDrive ya confirmada deja de ser válida para el nuevo intento; al volver, el administrador consulta la app otra vez. Incluso sin salir, la comprobación vence 15 minutos después de que el administrador registra la tarifa si aún no se inició el pago. Express revalida stock, carrito y destino (RF-07, RF-16, RN-08).
- **Importes:** Express usa el estimado registrado de inDrive o la tarifa comprobada del courier para el total, nunca un importe enviado por el navegador. La tarifa de inDrive de una comprobación no se edita: al abandonar el checkout sin pagar se crea otra, que puede variar por la hora. El importe aceptado por el cliente al iniciar el pago dentro de esos 15 minutos queda fijo en ese intento y pedido; el plazo de tarifa no se confunde con la reserva de stock posterior. Olva y Shalom conservan la tarifa confirmada para los mismos datos durante la vigencia de cotización o pedido. Cambiar dirección u operador antes del intento exige nueva comprobación y nuevo total; durante un pago activo o pendiente y tras aprobarlo se bloquea el cambio ordinario (RN-06, RN-08, RN-14).

## 4. Flujos críticos

### Compra de catálogo

1. El cliente elige variantes, dirección y envío confirmado o recojo. Si pide envío aún sin tarifa, espera la comprobación administrativa sin reserva ni cobro; cuando se registra el resultado, revisa y acepta el total e inicia en ese momento el pago conjunto de productos y envío. Express revalida precio, variantId, disponibilidad y entrega antes de pagar (RF-07, RN-01, RN-08).
2. Una transacción breve crea el pedido y reserva la variante atómicamente durante 15 minutos; si falla cualquiera de las dos operaciones, ambas se revierten. La llamada a Mercado Pago ocurre después del commit (RN-03).
3. Un intento de pago iniciado a tiempo mantiene la reserva mientras esté pendiente. Para el medio diferido de la demo, el límite es tres días desde el inicio. Antes de liberar por vencimiento, Express intenta verificar el estado con el proveedor; si no puede hacerlo, conserva la reserva y abre incidencia (RN-09).
4. La aprobación verificada convierte la reserva en asignación sin descontar stock físico. Una aprobación tardía sin disponibilidad abre revisión y requiere aceptación expresa de alternativa o reembolso (RF-08, RN-03, RN-04).
5. Para inDrive, tras el pago aprobado y la preparación, el administrador solicita el viaje real; si no consigue conductor, RF-21 ofrece recojo con devolución del envío o cancelación total. La salida física se registra una sola vez al despachar o entregar en tienda (RN-03, RN-13).

### Pedido personalizado

1. El administrador emite una cotización versionada con pieza, plazo, modalidad y costo de entrega explícito; vigente 14 días. Emitirla no aparta capacidad. Si el envío es por inDrive, se reconsulta al preparar el pago y se emite otra versión para aceptación si cambia el importe (RF-12, RN-08).
2. La aceptación reserva un cupo atómico durante 30 minutos. El pago pendiente iniciado a tiempo conserva el cupo hasta su resolución o vencimiento del medio (RF-13, RN-09).
3. Tras pago aprobado se crea la orden de producción y se comprueba materia prima. Sin material o cupo tras pago tardío, se presenta nuevo plazo o cupo para aceptación expresa, o reembolso (RF-08, RF-13, RN-12).

### Recojo y seguimiento

1. Tras pago y preparación, el administrador marca listo para recoger. Se publica aviso en cuenta y se emite un código privado de un solo uso (RF-16 a RF-18).
2. El comprador puede autorizar a un tercero desde su cuenta. La entrega exige nombre del receptor y código vigentes; se registran receptor, administrador y hora. Código consumido, estado y salida física forman una transacción idempotente (RN-13).
3. El pedido no vence por demora. Tras siete días de atención desde el aviso, excluyendo domingos, feriados y cierres extraordinarios sin reemplazo registrados, se crea un seguimiento para llamada manual sin duplicados; la llamada y su resultado se registran (RF-19).

### Envío posterior y pérdida de cobertura

1. Si el comprador no puede acudir a recoger, el administrador comprueba cobertura y tarifa, registra aceptación y en ese momento inicia el pago solo del envío, separado del pago original del producto. Si era inDrive y se abandona antes de iniciar ese pago o vencen 15 minutos desde la confirmación, el administrador vuelve a consultar y el comprador acepta el nuevo importe. Hasta verificarlo, el pedido conserva recojo; al aprobarlo y comprobar que sigue sin entregar, se cambia la modalidad y se invalida el código de forma atómica (RF-20, RN-15).
2. Si un envío pagado pierde cobertura antes de la salida, se bloquea el despacho y el cliente elige expresamente recojo con devolución completa del envío o cancelación con reembolso total. Sin elección, queda en revisión. La liberación de la asignación solo ocurre después de verificar todos los reembolsos de la cancelación (RF-21, RN-16).
3. Los reembolsos de envío se siguen por separado del producto; los reintentos y eventos duplicados no provocan otro cobro, reembolso, despacho ni movimiento físico (RN-11, RN-15, RN-16).

## 5. Permisos y privacidad

- Visitantes ven catálogo, ficha y carrito.
- Compradores consultan solo sus pedidos, cotizaciones, solicitudes, avisos e historial de autorizaciones y entregas.
- Administradores gestionan catálogo, stock, pedidos, incidencias, comprobaciones de envío, feriados, recojos y llamadas.
- Un tercero autorizado para recoger no recibe acceso a la cuenta del comprador. Las fotos privadas requieren validación de propietario o administrador (RN-07).

## 6. Transacciones e invariantes

- Pedidos e Inventario comparten una transacción de base de datos para crear pedido y reserva. No se mantiene abierta durante llamadas a la pasarela.
- Disponibilidad = máximo entre cero y stock físico menos reservas activas menos unidades asignadas; un recuento inferior bloquea nuevas reservas y crea incidencia (RN-03).
- Los importes y condiciones aceptados quedan en el historial. Todo cargo y reembolso se identifica por finalidad e importe; la confirmación es idempotente.
- La aprobación de un pago adicional de envío nunca vuelve a reservar producto ni crea una segunda orden de fabricación.
- La entrega en tienda, el despacho, la cancelación y la devolución aplican sus cambios de estado y stock una sola vez.

## 7. API inicial

- Los contratos de catálogo, carrito, pedidos, solicitudes y cotizaciones se definirán en OpenAPI antes de implementar cada módulo. El contrato de entrega T9a está definido en docs/openapi/delivery.json.
- El contrato de entrega cubre opciones candidatas por destino, zonas y operadores habilitados, intento de checkout, comprobación manual pendiente, resolución administrativa y vista previa del total. Quedan para sus módulos los contratos de feriados, cierres, avisos e inicio de pago; este último deberá rechazar comprobaciones pendientes o importes no aceptados (RF-07, RF-14, RF-16).
- Añadir contratos privados para autorizar/revocar tercero, consultar código, registrar entrega, listar seguimiento y registrar llamada (RF-17 a RF-19).
- Añadir contratos para proponer/aceptar envío adicional, iniciar su pago separado, registrar pérdida de cobertura y elegir resolución con reembolso (RF-20, RF-21).
- Cada ruta fija permisos, errores, idempotencia y condiciones de estado antes de implementarse.

## 8. Estrategia de pruebas

- PostgreSQL real: última unidad concurrente, rollback de pedido y reserva, ajuste físico inferior a asignaciones y salida física única.
- Envío: ámbito geográfico, zona habilitada, comprobación manual local y provincial, estado pendiente con texto exacto y sin reserva/cobro, aviso de tarifa lista, revalidación al volver, sin cobertura con recojo, importe manipulado, tarifa inDrive fija para un pago iniciado, nueva consulta tras abandonar checkout o vencer 15 minutos, cambio de dirección previo y bloqueo durante intento o después de pago.
- Recojo: código de un solo uso, tercero revocado, reintentos de entrega, calendario con sábado, feriado y cierre extraordinario sin reemplazo; seguimiento sin duplicado y cierres visibles en web.
- Pagos: aprobado, rechazado, pendiente tres días, resultado no verificable, webhook repetido, pago adicional, aprobación tardía incompatible y reembolso de solo envío o total.
- E2E y accesibilidad: compra y cotización con envío o recojo, seguimiento y resolución de cobertura, estados visibles en móvil y escritorio.

## 9. Secuencia de trabajo

- T0 completada: constitución y plan revisados frente al PRD y aprobados como base técnica del MVP.
- T9a completada: contrato OpenAPI de entrega con estados, permisos, errores e idempotencia; validación estructural de 11 operaciones y 68 referencias internas.
- T1 completada: frontend y backend arrancan; npm ci, lint, tipos, pruebas y compilación fueron verificados.
- T2 completada (RNF-04, 2026-10-01): Prisma 7.10.0 conectado al servicio local PostgreSQL 17.11; base `repuestos_3d_dev`, migración inicial aplicada y prueba de conexión real aprobada. El punto de partida contiene solo el historial de migraciones; los modelos de negocio y las pruebas de concurrencia se añaden en sus tareas. Sigue T3, modelo de identidad y roles, previa aprobación del usuario.
- Definir en OpenAPI los contratos de los demás módulos antes de implementarlos.
- Verificar en el entorno de prueba de Mercado Pago el medio diferido de tres días y el reembolso del componente de envío antes de cerrar las tareas de pagos; si la pasarela no permite simular el reembolso parcial, usar la simulación prevista en docs/spec.md.
