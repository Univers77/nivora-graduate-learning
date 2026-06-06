# Interaction Memory Protocol

## Proposito

Registrar evidencia útil de aprendizaje y convertirla en recomendaciones explicables, sin confundir actividad con dominio.

## Eventos permitidos

- Inicio y finalizacion de lecciones.
- Respuestas de quiz, dificultad y tiempo.
- Confianza declarada por el estudiante.
- Reflexiones guardadas.
- Recomendaciones aceptadas.

## Eventos no permitidos

- Datos sensibles.
- Seguimiento oculto.
- Contenido privado de terceros.
- Inferencias psicologicas presentadas como diagnosticos.

## Principios

1. Local-first durante el MVP.
2. Transparencia: el estudiante puede revisar la memoria.
3. Control: exportar y borrar siempre disponibles.
4. Explicabilidad: cada recomendacion incluye una razon.
5. Evidencia multiple: dominio combina aciertos, confianza, completitud y reflexion.
6. Recomendacion conservadora: ante errores repetidos, cambiar explicacion antes de reevaluar.

## Evolucion futura

La sincronizacion con Supabase requerira consentimiento, autenticacion y politicas de retencion antes de activarse.
