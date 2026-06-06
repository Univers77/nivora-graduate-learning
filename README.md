# NIVORA

**Graduate Learning, evolved.**

Plataforma premium de posgrado interactivo. Convierte materiales académicos en rutas de dominio, práctica activa, evaluaciones, documentos de estudio y memoria local exportable a Obsidian.

## Acceso de estudiante

- Usuario: `oscar.vargas`
- Contraseña: `Nivora@CRKC5001`

El progreso arranca en cero y se guarda en `localStorage`. La guía flotante permite conectar una carpeta de Obsidian desde el navegador para escribir `Oscar Vargas/NIVORA/learning-memory.md`; si el navegador no lo permite, descarga una nota Markdown.

## Inicio rapido

```bash
npm install
npm run dev
```

## Verificacion

```bash
npm run lint
npm run validate:vault
npm run build
npm run preview
```

La plataforma funciona completamente con datos mock locales. No incluye backend, API keys ni conexión real a Supabase.
