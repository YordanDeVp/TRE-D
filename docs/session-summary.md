# Punto de reanudación — 2026-10-01

## Ubicación y estado

- Todo el proyecto debe quedar en el repositorio existente TRE'D, dentro de C:\Users\YORDAN-TUF\Desktop\YordanDeVp\Ecommers. La documentación está en su carpeta docs/.
- Existen esqueletos ejecutables en frontend y backend. La portada y GET /health responden. Prisma 7.10.0 conecta con PostgreSQL local 17.11 y la base de desarrollo `repuestos_3d_dev`; los flujos de catálogo y pagos siguen pendientes.
- docs/spec.md es la fuente de verdad. docs/constitution.md y docs/plan.md son la base técnica aprobada; T0, T9a, T1 y T2 están completadas; docs/openapi/delivery.json tiene 11 operaciones para opciones, configuración y comprobación manual de entrega. docs/tasks.md contiene T0–T31 y las tareas adicionales T5a, T9a–T9d y T11a.

## Decisiones principales

- Tienda de demostración en español de repuestos impresos en 3D y filamentos, con precios de ejemplo en PEN. docs/demo-catalog.md contiene familias y variantes ficticias. La compatibilidad física de los repuestos citados no está verificada.
- Stock por variantId: una reserva reduce disponibilidad durante 15 minutos; pago aprobado la convierte en asignación. El stock físico disminuye solo con la salida por envío o la entrega en tienda.
- Pedido y reserva se crean juntos en una transacción breve. Mercado Pago se llama después del commit. Un intento iniciado a tiempo y pendiente mantiene la reserva hasta resolución o, para el método diferido de demo, hasta 3 días desde su inicio, sujeto a verificación.
- En Arequipa ciudad, el administrador consulta un estimado de inDrive para las zonas iniciales definidas en el PRD, lo muestra al cliente y solicita el viaje real solo tras verificar el pago y preparar el pedido. Fuera de la ciudad, dentro de la región Arequipa y en los seis departamentos del sur definidos, consulta Olva o Shalom en su app. Sin cobertura o tarifa comprobada no se paga el envío. El recojo en tienda es gratuito.
- Mientras se consulta la tarifa, el checkout muestra exactamente «Estamos calculando el costo de envío. Aún no se realizó ningún cobro»; no crea pedido, reserva ni cobro. Tras la respuesta administrativa, el cliente revisa el total y elige modalidad. Puede recibir aviso en su cuenta y, opcionalmente, uno manual por WhatsApp. La comprobación de inDrive no se edita y permite iniciar el pago durante 15 minutos desde su confirmación. Si el cliente abandona antes de pagar o vence ese plazo, el administrador consulta de nuevo; una vez iniciado el pago, el importe aceptado permanece fijo para el pedido y no cambia cuando se solicita el viaje real.
- Recojo en La Gran Vía / galería Compucenter, lunes a sábado de 10:00 a 20:00, sin feriados ni cierres extraordinarios sin reemplazo. El pedido listo se guarda sin límite de recojo. Tras siete días de atención sin retiro, se llama al cliente. Puede recoger un tercero autorizado con nombre registrado y código de un solo uso.
- Un envío añadido después de comprar para recojo se cobra aparte antes del despacho. Si un envío ya pagado pierde cobertura antes de salir, el cliente elige recojo con devolución íntegra del envío o cancelación con reembolso total.

## Resultado de T2 — RNF-04

- La base `repuestos_3d_dev` se creó sin borrar ni sustituir otras bases. Se usa PostgreSQL instalado localmente; Docker no está instalado. La futura base de la demo alojada en Supabase será independiente.
- La migración `20261001000000_init` quedó aplicada y `db:migrate:status` informó que no hay migraciones pendientes. Todavía no existen tablas de negocio; solo está el historial de Prisma.
- `test:db` aprobó una consulta real mediante Prisma (1 prueba, 0 fallos) contra PostgreSQL 17.11. También se verificaron validación y generación de Prisma, lint, tipos, prueba de salud y compilación del backend.
- La configuración lee `.env` de la raíz; ese archivo y el cliente generado están ignorados por Git. `.env.example` conserva una contraseña ficticia.
- La instalación de dependencias informó 4 vulnerabilidades altas. Su revisión queda pendiente; no se aplicaron correcciones automáticas.

## Forma de trabajo acordada

- Consultar al usuario antes de iniciar cada nuevo paso y esperar su aprobación.
- Un commit por función, arreglo o adición concreta; un archivo por defecto, varios únicamente cuando dependan entre sí para ese cambio. Preparar rutas explícitas.

## Siguiente trabajo

Proponer T3: modelo de identidad y roles con Supabase Auth, y esperar aprobación antes de ejecutarlo. Definir su contrato OpenAPI antes de implementar. Validar en el entorno de prueba las capacidades concretas de Mercado Pago antes de dar por terminado el flujo de pagos.