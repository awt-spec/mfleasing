Plan para ocultar tour y forms temporalmente:

1. Desactivar el tour guiado
   - Evitar que `GuidedTour` se monte en `src/pages/Index.tsx`.
   - Mantener el componente existente sin eliminarlo, para poder reactivarlo después.
   - Asegurar que `tourActive` permanezca en `false` y no bloquee navegación.

2. Ocultar los formularios Gate/Form
   - Evitar que `GateForm` se muestre al avanzar entre slides.
   - Desactivar temporalmente la lógica que abre `activeGate` antes de cambiar de slide.
   - Permitir navegación directa entre slides sin modal ni captura de datos.

3. Mantener el código reutilizable
   - No borrar `GuidedTour.tsx` ni `GateForm.tsx`.
   - Dejar el cambio como apagado temporal desde `Index.tsx`, para que luego pueda volver a activarse fácilmente.

Validación esperada:
- Al cargar la app no aparece el tour.
- Al avanzar desde Inicio/MAPA no aparece ningún formulario.
- Los botones, puntos de progreso, teclado y navegación siguen funcionando normalmente.