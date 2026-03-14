

## Plan: Indicadores de interactividad y pantalla de onboarding

### Problema
Los usuarios no saben que pueden hacer click en las tarjetas para ver sub-zooms, ni cómo navegar la presentación.

### Cambios

#### 1. Overlay de onboarding en SlideIntro (primera vez)
Crear un componente `OnboardingOverlay` que se muestre una sola vez (usando `localStorage`) al cargar la presentación. Contendrá 3-4 tips visuales con iconos y texto breve:

- **Flechas laterales** → "Usa las flechas para navegar entre secciones"
- **Swipe** → "Desliza en móvil para avanzar"
- **Click en tarjetas** → "Haz click en las tarjetas para ver más detalle"
- **Teclado** → "Usa ← → o Espacio para navegar"

Diseño: modal semi-transparente con backdrop blur, botón "Entendido" para cerrar. Se guarda en `localStorage` para no repetir.

#### 2. Animación pulsante en botones de CategoryCard
En `CategoryCard.tsx`, agregar una animación `pulse`/`bounce` sutil e infinita al botón "Ver X configuraciones" para llamar la atención del usuario. Usar `motion.animate` con scale oscilante.

#### 3. Animación pulsante en tarjetas compactas de SlideAdminActivos
Las tarjetas compactas de Admin Activos (que no usan `CategoryCard`) también necesitan un indicador visual. Agregar un badge animado tipo "Click para explorar" o un icono de flecha con pulse.

#### 4. Traducciones
Agregar las cadenas de texto del onboarding al `LanguageContext` para todos los idiomas soportados.

### Archivos a modificar
- **Nuevo**: `src/components/presentation/OnboardingOverlay.tsx`
- **Editar**: `src/components/presentation/CategoryCard.tsx` — agregar animación pulse al botón
- **Editar**: `src/components/presentation/slides/SlideAdminActivos.tsx` — agregar indicador visual a tarjetas compactas
- **Editar**: `src/pages/Index.tsx` — montar el OnboardingOverlay
- **Editar**: `src/contexts/LanguageContext.tsx` — agregar traducciones de onboarding

