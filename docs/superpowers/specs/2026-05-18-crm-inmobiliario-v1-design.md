# CRM Inmobiliario - Alcance V1

## Objetivo

Construir un prototipo local de un CRM inmobiliario multi-agente para validar el flujo principal antes de conectar Supabase Auth, base de datos y reglas RLS.

La V1 debe permitir probar si el sistema es util para el trabajo diario: cargar leads, verlos segun rol, cambiar estados, registrar seguimiento y revisar el historial de cada cliente.

## Enfoque De La V1

La primera version sera una app local en React + Vite con datos mockeados y persistencia en `localStorage`.

No habra autenticacion real. La entrada de la app sera un **Selector de perfil / Modo demo**, donde se podra elegir:

- Admin
- Agente 1
- Agente 2

Este selector simula permisos para validar experiencia y reglas de negocio. Mas adelante se reemplazara por Supabase Auth.

## Roles

### Admin

Puede:

- Ver todos los leads.
- Filtrar por agente.
- Crear leads.
- Editar cualquier lead.
- Cambiar estados.
- Reasignar leads entre agentes.
- Agregar notas y visitas.
- Ver el historial completo de seguimiento.

### Agente

Puede:

- Ver solo sus propios leads.
- Crear leads propios.
- Editar sus leads.
- Cambiar estados de sus leads.
- Agregar notas.
- Registrar visitas.
- Cargar proxima accion.
- Ver historial de seguimiento de sus leads.

No se incluye el rol Viewer/Supervision en la V1.

## Pantallas

### 1. Selector De Perfil / Modo Demo

Pantalla inicial para elegir con que perfil se prueba la app.

Debe mostrar opciones claras para entrar como Admin, Agente 1 o Agente 2. Tambien debe dejar visible que es un modo demo local, no un login real.

### 2. Dashboard De Leads

Pantalla principal de trabajo.

Debe incluir:

- Listado de leads.
- Busqueda por nombre, telefono o email.
- Filtro por estado.
- Filtro por agente solo para Admin.
- Boton para crear lead.
- Acciones rapidas para cambiar estado.
- Acceso a la ficha del lead.
- Reasignacion de agente solo para Admin.

En modo agente, el dashboard debe mostrar solo los leads asignados al agente activo.

### 3. Ficha Del Lead

Pantalla de detalle y seguimiento.

Debe incluir:

- Datos completos del lead.
- Estado y prioridad.
- Agente asignado.
- Propiedad de interes.
- Proxima accion.
- Fecha de proximo contacto.
- Historial de notas.
- Historial de visitas.
- Formulario para agregar nota.
- Formulario para registrar visita.
- Edicion de los datos principales del lead.

## Campos Minimos Del Lead

Cada lead debe tener:

- `id`
- `nombre`
- `telefono`
- `email` opcional
- `operacion`: compra, alquiler o venta de propiedad propia
- `zona_interes`
- `presupuesto`
- `estado`
- `prioridad`
- `agente_id`
- `propiedad_interes`
- `proxima_accion`
- `fecha_proximo_contacto`
- `created_at`
- `updated_at`

## Estados Del Lead

La V1 usara estos estados:

- Nuevo
- Contactado
- En busqueda
- Visita coordinada
- Visito
- Interesado
- Oferta realizada
- Reservado
- Cerrado
- Perdido

## Prioridades

La V1 usara estas prioridades:

- Alta
- Media
- Baja

## Notas

Cada nota debe guardar:

- `id`
- `lead_id`
- `agente_id`
- `nota`
- `created_at`

Las notas deben quedar asociadas al perfil que las carga.

## Visitas

Cada visita debe guardar:

- `id`
- `lead_id`
- `agente_id`
- `propiedad`
- `fecha_visita`
- `resultado`
- `observaciones`
- `created_at`

Las visitas deben quedar asociadas al perfil que las registra.

## Permisos Simulados

Los permisos se aplican en el frontend durante esta V1:

- Admin ve y edita todo.
- Admin puede reasignar leads.
- Agente solo ve leads donde `agente_id` coincide con el perfil activo.
- Agente crea leads asignados a si mismo.
- Agente solo puede editar, comentar y registrar visitas en sus propios leads.

Estos permisos son solo de prototipo. La version con Supabase debera mover esta seguridad a Auth, `profiles` y RLS.

## Datos De Ejemplo

La app debe iniciar con datos mockeados:

- 1 perfil Admin.
- 2 perfiles Agente.
- Leads distribuidos entre ambos agentes.
- Algunos leads con notas.
- Algunos leads con visitas.
- Estados variados para probar filtros.

El usuario tambien debe poder crear nuevos leads durante la prueba.

## Persistencia Local

La V1 debe guardar cambios en `localStorage` para que la prueba no se reinicie al recargar la pagina.

Debe existir una accion simple para restaurar datos demo si hace falta durante pruebas.

## Fuera De Alcance V1

No se implementa todavia:

- Supabase Auth.
- Base de datos real.
- Politicas RLS.
- Gestion real de usuarios.
- Rol Viewer/Supervision.
- Metricas avanzadas por agente.
- Reasignacion masiva.
- Recordatorios automaticos.
- Integracion con WhatsApp.
- Notificaciones.
- Panel de propiedades conectado.

## Criterios De Exito

La V1 se considera exitosa si:

- Se puede entrar como Admin o Agente desde el selector de perfil.
- Admin ve todos los leads y puede filtrar por agente.
- Agente ve solo sus leads.
- Se puede crear un lead nuevo.
- Se puede editar estado, prioridad, proxima accion y fecha de contacto.
- Se puede abrir la ficha de un lead.
- Se pueden agregar notas.
- Se pueden registrar visitas.
- El historial queda visible en la ficha.
- Los cambios persisten al recargar por `localStorage`.

## Camino Posterior

Si la V1 local resulta util, la siguiente etapa sera conectar Supabase:

- Crear schema real.
- Configurar Supabase Auth.
- Crear tabla `profiles`.
- Migrar leads, notas y visitas a tablas reales.
- Aplicar RLS para Admin y Agente.
- Reemplazar el selector demo por login real.
