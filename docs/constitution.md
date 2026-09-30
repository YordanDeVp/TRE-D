# Constitución del MVP

**Estado:** base técnica aprobada para implementar el MVP según la Spec 001 vigente al 2026-09-30. Los cambios futuros del PRD requieren volver a comprobar estas reglas.

1. **Spec-first y Spec-anchored:** `docs/spec.md` es la fuente de verdad; plan, tareas, código y evidencia se vinculan con RF, RN o RNF. Toda regla nueva se incorpora a la especificación antes de implementarse.
2. **Alcance:** Se construye solo la demo definida en la especificación; cada exclusión permanece fuera del MVP hasta un cambio explícito de requisito.
3. **Autoridad del backend:** Express valida identidad, permisos, precios, importes, disponibilidad y transiciones; el navegador solo presenta datos y recoge entradas.
4. **Dinero exacto:** Los importes en PEN se calculan con representación exacta y se conservan como valores históricos en el pedido.
5. **Privacidad:** Supabase Auth gestiona la identidad; Express comprueba rol y propiedad antes de exponer pedidos, cotizaciones o fotos privadas. Secretos y credenciales privilegiadas quedan fuera del frontend y del repositorio.
6. **Reservas seguras:** Stock y cupos de fabricación se reservan y liberan de forma atómica; ningún flujo puede sobreasignar disponibilidad, incluidos reintentos y concurrencia.
7. **Pagos comprobados:** El backend verifica al proveedor antes de cambiar un pedido a pagado; procesa avisos de forma idempotente y detiene el cumplimiento cuando falta disponibilidad tras una aprobación tardía.
8. **Evidencia:** Cada cambio registra verificaciones ejecutadas de lint, tipos y pruebas pertinentes; concurrencia de inventario y pagos se comprueba con PostgreSQL real. La interfaz conserva accesibilidad básica y estados de carga, vacío, error y éxito.
