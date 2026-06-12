# SimpliPDF 🔒

**Procesamiento PDF 100% privado y local en tu navegador**

SimpliPDF es una aplicación web completa para manipular archivos PDF sin necesidad de subirlos a ningún servidor. Todo el procesamiento ocurre directamente en tu navegador utilizando JavaScript, garantizando privacidad absoluta.

---

## ✨ Características

### 🔐 Privacidad por diseño
- **Cero subidas al servidor**: Tus archivos nunca abandonan tu dispositivo
- **Procesamiento local**: Todo se ejecuta en la memoria RAM de tu navegador
- **Sin registro**: No pedimos correo electrónico ni información personal
- **Sin tracking**: No hay cookies de seguimiento

### ⚡ Herramientas implementadas

1. **Unir Archivos PDF** - Combina múltiples PDFs en uno solo
2. **Imágenes a PDF** - Convierte JPG/PNG/WebP a documento PDF
3. **Eliminar Páginas** - Selecciona y elimina páginas específicas
4. **Proteger PDF** - Añade contraseña de protección
5. **PDF a Imágenes** - Exporta páginas como imágenes PNG
6. **Rotar Documento** - Rota páginas 90°, 180° o 270°
7. **Marca de Agua** - Añade texto diagonal con opacidad
8. **Firmar Documento** - Coloca firma digital en el PDF

### 🎨 UI/UX Avanzada

- **Tema claro/oscuro** con persistencia en localStorage
- **Drag & drop** para subir archivos
- **Previsualizaciones** de páginas PDF
- **Notificaciones toast** con feedback visual
- **Animaciones fluidas** y micro-interacciones
- **Diseño responsive** optimizado para móvil

### 🚀 PWA (Progressive Web App)

- **Funciona offline** después de la primera carga
- **Instalable** en dispositivos móviles y desktop
- **Service Worker** con caché inteligente
- **Icono en pantalla principal**

---

## 🛠️ Tecnologías utilizadas

### Librerías principales
- **[PDF-lib](https://pdf-lib.js.org/)** v1.17.1 - Creación y manipulación de PDFs
- **[PDF.js](https://mozilla.github.io/pdf.js/)** v3.11.174 - Renderización y lectura de PDFs

### Stack
- HTML5 + CSS3 (Custom Properties para theming)
- JavaScript ES6+ (Vanilla, sin frameworks)
- Service Worker API
- Canvas API
- File API
- Blob API

---

## 📦 Estructura del proyecto

```
SimpliPDF/
├── index.html          # Página principal con landing y estructura
├── styles.css          # Estilos completos con soporte de temas
├── app.js              # Lógica de la aplicación y procesamiento PDF
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker para offline
└── README.md           # Esta documentación
```

---

## 🚀 Cómo usar

### Opción 1: Servidor local simple

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

### Opción 2: Despliegue en producción

Sube todos los archivos a cualquier hosting estático:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Cloudflare Pages**

No necesitas backend ni base de datos.

---

## 💻 Navegadores soportados

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  

**Requisitos:**
- JavaScript habilitado
- Soporte para ES6+
- Canvas API
- File API

---

## 🔧 Funcionalidades técnicas

### Sistema de navegación
- SPA (Single Page Application) sin router externo
- Carga dinámica de vistas con JavaScript
- Animaciones de transición entre páginas

### Gestión de archivos
- Validación de tipos MIME
- Preview de páginas con Canvas
- Procesamiento asíncrono con async/await
- Descarga automática de resultados

### Sistema de notificaciones
- Toast notifications con 3 tipos (success, error, info)
- Auto-close después de 5 segundos
- Cierre manual con botón
- Animaciones de entrada/salida

### Loading states
- Overlay con spinner durante procesamiento
- Mensajes contextuales según la operación
- Prevención de múltiples clicks

---

## 🎯 Funciones de PDF disponibles

### 1. Unir PDFs (mergePDFs)
```javascript
// Combina múltiples PDFs en orden
// Input: Array de archivos PDF
// Output: merged-document.pdf
```

### 2. Imágenes a PDF (imagesToPDF)
```javascript
// Convierte imágenes a PDF
// Soporta: PNG, JPG, JPEG
// Una imagen = una página
```

### 3. Eliminar páginas (deletePages)
```javascript
// Renderiza previews con PDF.js
// Permite selección múltiple
// Crea nuevo PDF sin páginas seleccionadas
```

### 4. Proteger PDF (protectPDF)
```javascript
// Añade contraseña al documento
// Mínimo 6 caracteres
// Confirmación de contraseña
```

### 5. PDF a imágenes (pdfToImages)
```javascript
// Exporta cada página como PNG
// Escala configurable (1x - 3x)
// Alta resolución (hasta 450 DPI)
```

### 6. Rotar PDF (rotatePDF)
```javascript
// Rota todas las páginas
// Opciones: 90°, 180°, 270°
// Mantiene calidad original
```

### 7. Marca de agua (addWatermark)
```javascript
// Texto diagonal en todas las páginas
// Opacidad ajustable (10% - 80%)
// Centrado automático
```

### 8. Firmar PDF (signPDF)
```javascript
// Añade imagen de firma
// Soporta PNG con transparencia
// Posición en esquina inferior derecha
// Tamaño configurable
```

---

## 🎨 Personalización del tema

El tema oscuro/claro se controla con CSS Custom Properties:

```css
[data-theme="light"] {
  --bg: #FFFFFF;
  --ink: #111827;
  --red: #E8321A;
}

[data-theme="dark"] {
  --bg: #111827;
  --ink: #F9FAFB;
  --red: #F87171;
}
```

---

## 🔒 Seguridad y privacidad

### Garantías
✅ **No hay backend**: Imposible que tus archivos lleguen a un servidor  
✅ **Procesamiento en RAM**: Los archivos no se guardan en disco  
✅ **Sin analytics**: No rastreamos tu uso  
✅ **Open source**: Código auditable  

### Limitaciones
⚠️ **Memoria RAM**: Archivos muy grandes pueden consumir mucha memoria  
⚠️ **Encriptación**: PDF-lib tiene soporte limitado de encriptación avanzada  

---

## 📝 Roadmap futuro

- [ ] Comprimir PDF
- [ ] Dividir PDF en múltiples archivos
- [ ] PDF a Word/Excel
- [ ] Editar metadatos (autor, título, etc.)
- [ ] Numerar páginas
- [ ] Insertar páginas en blanco
- [ ] OCR (reconocimiento de texto)
- [ ] Comparar dos PDFs

---

## 🤝 Contribuciones

Este proyecto está abierto a contribuciones. Ideas para mejorar:

1. Añadir más herramientas PDF
2. Mejorar el sistema de previsualizaciones
3. Optimizar rendimiento para archivos grandes
4. Traducción a otros idiomas
5. Tests automatizados

---

## 📄 Licencia

MIT License - Libre para uso personal y comercial

---

## 👨‍💻 Autor

Creado con ❤️ por el equipo de SimpliPDF

**Contacto:**
- Web: https://simplipdf.com
- Email: hola@simplipdf.com
- Ko-fi: https://ko-fi.com/simplipdf

---

## 🙏 Agradecimientos

- [PDF-lib](https://pdf-lib.js.org/) por la librería de manipulación
- [PDF.js](https://mozilla.github.io/pdf.js/) de Mozilla por el renderizado
- Comunidad de desarrolladores open source

---

**¿Te fue útil? ☕ [Invítanos un café](https://ko-fi.com/simplipdf)**
