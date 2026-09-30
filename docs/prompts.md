# Prompts por fase — TRE-D

Usa la [especificación](spec.md) como fuente de verdad. Vincula cada cambio con sus RF, RN o RNF y actualiza plan y tareas cuando cambie un requisito. Los prompts son ayudas; el estado real del repositorio y la petición vigente del usuario tienen prioridad.

## Revisar requisitos

> Lee docs/spec.md y docs/demo-catalog.md. Identifica contradicciones o decisiones que impidan el siguiente flujo concreto. Propón cambios en el PRD con criterios verificables y conserva las decisiones ya confirmadas sobre stock, pagos, envíos, recojo y filamentos.

## Revisar arquitectura

> Lee docs/spec.md, docs/constitution.md y docs/plan.md. Comprueba que los módulos, permisos, datos y transacciones sostengan cada regla del flujo elegido. Actualiza el plan cuando el PRD ya haya cambiado.

## Definir contratos

> Para la próxima tarea de docs/tasks.md, define entradas, salidas, estados, permisos, idempotencia y errores de la API. En particular, la solicitud de comprobación de envío debe tener un estado pendiente sin pago ni reserva y una respuesta administrativa con cobertura y tarifa.

## Implementar

> Lee la tarea elegida de docs/tasks.md y los RF/RN que cita. Implementa el comportamiento con las verificaciones pertinentes, ejecuta las pruebas relevantes y registra resultados reales. Actualiza la tarea solo cuando su criterio de finalización se haya cumplido.

## Validar

> Recorre RF-01 a RF-21 de docs/spec.md. Para cada requisito indica prueba automatizada o paso manual ejecutado y resultado real. Incluye compra de repuesto y filamento, espera de tarifa, falta de cobertura, última unidad, pago pendiente o tardío, recojo por tercero y reembolsos.

## Cambiar un requisito

> Nuevo requisito: [describir]. Analiza impacto en docs/spec.md, actualiza sus criterios y casos límite, después alinea docs/plan.md, docs/tasks.md y los datos de demo si corresponde. No supongas una condición comercial que el usuario no haya definido.