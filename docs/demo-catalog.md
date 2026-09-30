# Catálogo inicial de demostración

Este catálogo define datos semilla para la demo, en PEN. Los precios, existencias, medidas de repuestos y marcas de filamento son **ficticios**. No son una oferta comercial ni una promesa de compatibilidad física. Antes de vender un repuesto real se deben medir una muestra impresa, comprobar la revisión exacta de la impresora y fotografiar la pieza final.

Los nombres fan-shroud, extruder-idler y print-fan-support se eligieron porque figuran entre las piezas imprimibles documentadas por Prusa para la familia MK3S+. Su presencia en la lista no demuestra que sean las piezas que más fallan. Prusa recomienda ASA o ABS para fan-shroud y PETG como material general de sus otras piezas imprimibles. La guía de montaje de Original Prusa MINI también incluye un separador del ventilador, que sirve como segunda referencia de modelo. La demo usa estas referencias solo para construir un catálogo realista; la compatibilidad de cada producto de esta tabla queda **por verificar**.

## Familias de producto

| Código de familia | Categoría | Nombre mostrado | Modelo de referencia | Medidas o presentación de demo |
| --- | --- | --- | --- | --- |
| REP-SHROUD | Repuestos impresos | Conducto de ventilador de capa | Original Prusa MK3S+; compatibilidad por verificar | 52 × 36 × 19 mm; medidas ficticias |
| REP-IDLER | Repuestos impresos | Tensor del extrusor | Original Prusa MK3S+; compatibilidad por verificar | 48 × 29 × 16 mm; medidas ficticias |
| REP-FAN-SUPPORT | Repuestos impresos | Soporte del ventilador de capa | Original Prusa MK3S+; compatibilidad por verificar | 43 × 24 × 18 mm; medidas ficticias |
| REP-MINI-FAN-CLIP | Repuestos impresos | Separador del ventilador | Original Prusa MINI; compatibilidad por verificar | 27 × 18 × 9 mm; medidas ficticias |
| FIL-PLA | Filamentos | Filamento PLA | Sin compatibilidad por modelo registrada | Diámetro 1,75 mm; carrete de 1 kg |
| FIL-PETG | Filamentos | Filamento PETG | Sin compatibilidad por modelo registrada | Diámetro 1,75 mm; carrete de 1 kg |
| FIL-TPU | Filamentos | Filamento flexible TPU | Sin compatibilidad por modelo registrada | Diámetro 1,75 mm; carrete de 500 g |
| FIL-ASA | Filamentos | Filamento ASA | Sin compatibilidad por modelo registrada | Diámetro 1,75 mm; carrete de 1 kg |

La ficha de un repuesto mostrará “Compatibilidad por verificar antes de una compra real”; no se guardará MK3S+ como compatibilidad confirmada hasta comprobar la revisión y el ajuste físico. Las medidas de muestra sirven solo para probar la interfaz y sus filtros.

## Variantes de muestra

Cada fila es una variante vendible en la demo. El stock físico inicial cuenta unidades en almacén; la disponibilidad se calcula según RN-03 de la especificación. El precio es por pieza o carrete, sin envío.

| variantId | SKU único | Familia | Material | Color | Presentación | Precio demo (S/) | Stock físico demo |
| --- | --- | --- | --- | --- | --- | ---: | ---: |
| var-rep-shroud-asa-black | DEMO-REP-SHROUD-ASA-BLK | REP-SHROUD | ASA | Negro | 1 pieza | 24.00 | 2 |
| var-rep-shroud-asa-orange | DEMO-REP-SHROUD-ASA-ORG | REP-SHROUD | ASA | Naranja | 1 pieza | 24.00 | 1 |
| var-rep-idler-petg-black | DEMO-REP-IDLER-PETG-BLK | REP-IDLER | PETG | Negro | 1 pieza | 21.00 | 3 |
| var-rep-idler-petg-orange | DEMO-REP-IDLER-PETG-ORG | REP-IDLER | PETG | Naranja | 1 pieza | 21.00 | 2 |
| var-rep-fan-petg-black | DEMO-REP-FAN-PETG-BLK | REP-FAN-SUPPORT | PETG | Negro | 1 pieza | 19.00 | 4 |
| var-rep-mini-fan-petg-black | DEMO-REP-MINI-FAN-PETG-BLK | REP-MINI-FAN-CLIP | PETG | Negro | 1 pieza | 16.00 | 3 |
| var-fil-pla-175-1kg-black | DEMO-FIL-PLA-175-1KG-BLK | FIL-PLA | PLA | Negro | 1,75 mm · 1 kg | 65.00 | 8 |
| var-fil-pla-175-1kg-white | DEMO-FIL-PLA-175-1KG-WHT | FIL-PLA | PLA | Blanco | 1,75 mm · 1 kg | 65.00 | 6 |
| var-fil-petg-175-1kg-black | DEMO-FIL-PETG-175-1KG-BLK | FIL-PETG | PETG | Negro | 1,75 mm · 1 kg | 78.00 | 5 |
| var-fil-petg-175-1kg-blue | DEMO-FIL-PETG-175-1KG-BLU | FIL-PETG | PETG | Azul | 1,75 mm · 1 kg | 78.00 | 4 |
| var-fil-tpu-175-500g-black | DEMO-FIL-TPU-175-500G-BLK | FIL-TPU | TPU | Negro | 1,75 mm · 500 g | 92.00 | 3 |
| var-fil-asa-175-1kg-black | DEMO-FIL-ASA-175-1KG-BLK | FIL-ASA | ASA | Negro | 1,75 mm · 1 kg | 95.00 | 2 |

Las marcas de filamento no están definidas. La demo no debe mostrar fotografías de fabricantes ni atribuirles especificaciones comerciales sin contar con datos reales. Para crear estos datos en la aplicación, convertir la tabla en un seed de Prisma cuando estén listos el esquema y el catálogo (T5a).

## Referencias técnicas de selección

- [Prusa: piezas imprimibles de Original Prusa](https://help.prusa3d.com/article/printable-parts-for-original-prusa_1824): piezas de recambio imprimibles y material recomendado.
- [Prusa: lista de piezas del upgrade MK2.5S+](https://help.prusa3d.com/article/upgrading-mk2-s-and-mk2-5-s-to-mk2-5s_200009): nombres fan-shroud, extruder-idler y print-fan-support y referencia a MK3S+.
- [Prusa: montaje del Original Prusa MINI, separador del ventilador](https://help.prusa3d.com/wp-content/uploads/generated/original-prusa-mini-kit-assembly_1215_en_2025-03-25.pdf): componente MINI-fan-spacer-clip en la preparación del cabezal.
- [Prusa: guía de materiales de filamento](https://help.prusa3d.com/filament-material-guide): familias PLA, PETG, ASA y flexible.

Estas fuentes apoyan la elección de familias y materiales. No respaldan los precios, existencias, medidas ficticias, frecuencia de fallos ni una compatibilidad física ya comprobada.