# Learning Memory Lab

## Problema

Una plataforma de estudio que solo registra paginas vistas o lecciones completadas no sabe si el estudiante realmente aprendio.

## Solucion

Learning Memory Lab registra interacciones con valor pedagogico y genera una recomendacion explicable.

## Arquitectura

- `types/learning-memory.ts`: contrato de eventos, memoria y recomendaciones.
- `data/ob-learning-path.json`: ruta academica CRKC 5001.
- `lib/learning-memory-engine.ts`: calculo de memoria y siguiente accion.
- `stores/useLearningMemory.ts`: persistencia local, exportacion y borrado.
- `components/learning-agent/LearningMemoryLab.tsx`: laboratorio interactivo.

## Señales de dominio

- Exactitud.
- Confianza declarada.
- Finalizacion.
- Reflexion.
- Errores repetidos.

## Decisiones de diseño

- Actividad no equivale a dominio.
- Toda recomendacion debe explicar su razon.
- La memoria es local y controlable durante el MVP.
- Los errores repetidos activan refuerzo, no castigo.
- El contenido se organiza por concepto y unidad para conservar trazabilidad.

## Limites actuales

- No existe sincronizacion entre dispositivos.
- No existe autenticacion.
- No existe analitica docente agregada.
- No se realizan inferencias clinicas o psicologicas.
