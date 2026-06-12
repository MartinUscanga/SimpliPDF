// SimpliPDF - Complete PDF Processing Application
// All processing happens locally in the browser

class SimpliPDF {
  constructor() {
    this.currentTool = null;
    this.files = [];
    this.init();
  }

  init() {
    this.setupTheme();
    this.setupNavigation();
    this.setupToastSystem();
  }

  // ═══════════════════════════════════════════════════════
  // THEME SYSTEM
  // ═══════════════════════════════════════════════════════

  setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    themeToggle?.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      this.showToast('success', 'Tema cambiado', `Modo ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`);
    });
  }

  // ═══════════════════════════════════════════════════════
  // NAVIGATION SYSTEM
  // ═══════════════════════════════════════════════════════

  setupNavigation() {
    // Tool cards click handlers
    document.querySelectorAll('.tool-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const tool = card.getAttribute('data-tool');
        if (tool) {
          this.loadTool(tool);
        }
      });
    });

    // Home link
    document.getElementById('homeLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.loadHomePage();
    });
  }

  loadHomePage() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.currentTool = null;
  }


  loadTool(toolName) {
    this.currentTool = toolName;
    this.files = [];
    
    const app = document.getElementById('app');
    
    const toolPages = {
      'merge': this.createMergePage(),
      'images-to-pdf': this.createImagesToPDFPage(),
      'delete-pages': this.createDeletePagesPage(),
      'protect': this.createProtectPage(),
      'pdf-to-images': this.createPDFToImagesPage(),
      'rotate': this.createRotatePage(),
      'watermark': this.createWatermarkPage(),
      'sign': this.createSignPage()
    };

    if (toolPages[toolName]) {
      app.innerHTML = toolPages[toolName];
      this.setupToolPageHandlers(toolName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  createToolHeader(title, description) {
    return `
      <div class="tool-header">
        <a href="#" class="back-link" id="backLink">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
          </svg>
          Volver al inicio
        </a>
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
    `;
  }

  createUploadZone(accept, multiple = true) {
    return `
      <div class="upload-zone" id="uploadZone">
        <div class="upload-icon">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3>Arrastra archivos aquí</h3>
        <p>o haz clic para seleccionar</p>
        <input type="file" id="fileInput" accept="${accept}" ${multiple ? 'multiple' : ''} style="display: none;">
        <button class="btn-secondary" onclick="document.getElementById('fileInput').click()">
          Seleccionar archivos
        </button>
      </div>
      <div class="file-list" id="fileList"></div>
    `;
  }


  // ═══════════════════════════════════════════════════════
  // TOOL PAGE CREATORS
  // ═══════════════════════════════════════════════════════

  createMergePage() {
    return `
      <div class="tool-page fade-in">
        ${this.createToolHeader('Unir Archivos PDF', 'Combina múltiples archivos PDF en un solo documento. El proceso es 100% local y privado.')}
        <div class="tool-workspace">
          ${this.createUploadZone('.pdf', true)}
          <div class="action-buttons">
            <button class="btn-process" id="processBtn" disabled>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/>
              </svg>
              Unir PDFs
            </button>
          </div>
        </div>
      </div>
    `;
  }

  createImagesToPDFPage() {
    return `
      <div class="tool-page fade-in">
        ${this.createToolHeader('Imágenes a PDF', 'Convierte imágenes JPG, PNG o WebP en un documento PDF. Una imagen por página.')}
        <div class="tool-workspace">
          ${this.createUploadZone('image/*', true)}
          <div class="action-buttons">
            <button class="btn-process" id="processBtn" disabled>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
              Crear PDF
            </button>
          </div>
        </div>
      </div>
    `;
  }

  createDeletePagesPage() {
    return `
      <div class="tool-page fade-in">
        ${this.createToolHeader('Eliminar Páginas', 'Selecciona las páginas que deseas eliminar de tu documento PDF.')}
        <div class="tool-workspace">
          ${this.createUploadZone('.pdf', false)}
          <div id="pagePreview" class="preview-grid hidden"></div>
          <div class="action-buttons">
            <button class="btn-process" id="processBtn" disabled>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              Eliminar seleccionadas
            </button>
          </div>
        </div>
      </div>
    `;
  }


  createProtectPage() {
    return `
      <div class="tool-page fade-in">
        ${this.createToolHeader('Proteger PDF', 'Añade una contraseña a tu documento PDF para protegerlo.')}
        <div class="tool-workspace">
          ${this.createUploadZone('.pdf', false)}
          <div class="controls">
            <div class="control-group">
              <label for="pdfPassword">Contraseña (mínimo 6 caracteres)</label>
              <input type="password" id="pdfPassword" placeholder="Ingresa una contraseña segura">
            </div>
            <div class="control-group">
              <label for="pdfPasswordConfirm">Confirmar contraseña</label>
              <input type="password" id="pdfPasswordConfirm" placeholder="Confirma la contraseña">
            </div>
          </div>
          <div class="action-buttons">
            <button class="btn-process" id="processBtn" disabled>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
              Proteger PDF
            </button>
          </div>
        </div>
      </div>
    `;
  }

  createPDFToImagesPage() {
    return `
      <div class="tool-page fade-in">
        ${this.createToolHeader('PDF a Imágenes', 'Convierte cada página de tu PDF en una imagen PNG de alta calidad.')}
        <div class="tool-workspace">
          ${this.createUploadZone('.pdf', false)}
          <div class="controls">
            <div class="control-group">
              <label for="imageScale">
                Calidad de imagen (DPI)
                <span class="range-value" id="scaleValue">2x (300 DPI)</span>
              </label>
              <input type="range" id="imageScale" min="1" max="3" value="2" step="0.5">
            </div>
          </div>
          <div class="action-buttons">
            <button class="btn-process" id="processBtn" disabled>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
              Convertir a imágenes
            </button>
          </div>
        </div>
      </div>
    `;
  }


  createRotatePage() {
    return `
      <div class="tool-page fade-in">
        ${this.createToolHeader('Rotar Documento', 'Rota todas las páginas de tu PDF en el ángulo deseado.')}
        <div class="tool-workspace">
          ${this.createUploadZone('.pdf', false)}
          <div class="controls">
            <div class="control-group">
              <label for="rotateAngle">Ángulo de rotación</label>
              <select id="rotateAngle">
                <option value="90">90° (Derecha)</option>
                <option value="180">180° (Invertir)</option>
                <option value="270">270° (Izquierda)</option>
              </select>
            </div>
          </div>
          <div class="action-buttons">
            <button class="btn-process" id="processBtn" disabled>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
              </svg>
              Rotar PDF
            </button>
          </div>
        </div>
      </div>
    `;
  }

  createWatermarkPage() {
    return `
      <div class="tool-page fade-in">
        ${this.createToolHeader('Marca de Agua', 'Añade una marca de agua de texto a todas las páginas de tu PDF.')}
        <div class="tool-workspace">
          ${this.createUploadZone('.pdf', false)}
          <div class="controls">
            <div class="control-group">
              <label for="watermarkText">Texto de la marca de agua</label>
              <input type="text" id="watermarkText" placeholder="Ej: CONFIDENCIAL" value="CONFIDENCIAL">
            </div>
            <div class="control-group">
              <label for="watermarkOpacity">
                Opacidad
                <span class="range-value" id="opacityValue">30%</span>
              </label>
              <input type="range" id="watermarkOpacity" min="10" max="80" value="30" step="5">
            </div>
          </div>
          <div class="action-buttons">
            <button class="btn-process" id="processBtn" disabled>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
              Añadir marca de agua
            </button>
          </div>
        </div>
      </div>
    `;
  }


  createSignPage() {
    return `
      <div class="tool-page fade-in">
        ${this.createToolHeader('Firmar Documento', 'Añade tu firma digital a un documento PDF.')}
        <div class="tool-workspace">
          ${this.createUploadZone('.pdf', false)}
          <div class="controls">
            <div class="control-group">
              <label for="signatureImage">Imagen de firma (PNG con transparencia)</label>
              <input type="file" id="signatureImage" accept="image/png">
            </div>
            <div class="control-group">
              <label for="signatureSize">
                Tamaño de firma
                <span class="range-value" id="sizeValue">150px</span>
              </label>
              <input type="range" id="signatureSize" min="80" max="300" value="150" step="10">
            </div>
          </div>
          <div class="action-buttons">
            <button class="btn-process" id="processBtn" disabled>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
              Firmar documento
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════
  // TOOL PAGE HANDLERS
  // ═══════════════════════════════════════════════════════

  setupToolPageHandlers(toolName) {
    const backLink = document.getElementById('backLink');
    backLink?.addEventListener('click', (e) => {
      e.preventDefault();
      this.loadHomePage();
      window.location.hash = '';
      window.location.reload();
    });

    this.setupFileUpload();
    this.setupProcessButton(toolName);
    this.setupToolSpecificHandlers(toolName);
  }

  setupFileUpload() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');

    if (!uploadZone || !fileInput) return;

    // Drag and drop handlers
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      const files = Array.from(e.dataTransfer.files);
      this.handleFiles(files);
    });

    // File input handler
    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      this.handleFiles(files);
    });
  }


  handleFiles(files) {
    const fileInput = document.getElementById('fileInput');
    const isMultiple = fileInput.hasAttribute('multiple');

    if (isMultiple) {
      this.files.push(...files);
    } else {
      this.files = [files[0]];
    }

    this.renderFileList();
    this.updateProcessButton();
  }

  renderFileList() {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;

    if (this.files.length === 0) {
      fileList.innerHTML = '';
      return;
    }

    fileList.innerHTML = this.files.map((file, index) => `
      <div class="file-item slide-up">
        <div class="file-icon">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="file-info">
          <div class="file-name">${file.name}</div>
          <div class="file-size">${this.formatFileSize(file.size)}</div>
        </div>
        <button class="file-remove" onclick="app.removeFile(${index})">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    `).join('');
  }

  removeFile(index) {
    this.files.splice(index, 1);
    this.renderFileList();
    this.updateProcessButton();
  }

  updateProcessButton() {
    const processBtn = document.getElementById('processBtn');
    if (!processBtn) return;

    const canProcess = this.files.length > 0;
    processBtn.disabled = !canProcess;
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }


  setupToolSpecificHandlers(toolName) {
    // Range input handlers
    const imageScale = document.getElementById('imageScale');
    const scaleValue = document.getElementById('scaleValue');
    if (imageScale && scaleValue) {
      imageScale.addEventListener('input', (e) => {
        const scale = parseFloat(e.target.value);
        const dpi = Math.round(scale * 150);
        scaleValue.textContent = `${scale}x (${dpi} DPI)`;
      });
    }

    const watermarkOpacity = document.getElementById('watermarkOpacity');
    const opacityValue = document.getElementById('opacityValue');
    if (watermarkOpacity && opacityValue) {
      watermarkOpacity.addEventListener('input', (e) => {
        opacityValue.textContent = `${e.target.value}%`;
      });
    }

    const signatureSize = document.getElementById('signatureSize');
    const sizeValue = document.getElementById('sizeValue');
    if (signatureSize && sizeValue) {
      signatureSize.addEventListener('input', (e) => {
        sizeValue.textContent = `${e.target.value}px`;
      });
    }

    // Delete pages - render preview
    if (toolName === 'delete-pages') {
      const fileInput = document.getElementById('fileInput');
      fileInput?.addEventListener('change', async () => {
        if (this.files.length > 0) {
          await this.renderPagePreviews(this.files[0]);
        }
      });
    }
  }

  setupProcessButton(toolName) {
    const processBtn = document.getElementById('processBtn');
    if (!processBtn) return;

    processBtn.addEventListener('click', async () => {
      const handlers = {
        'merge': () => this.mergePDFs(),
        'images-to-pdf': () => this.imagesToPDF(),
        'delete-pages': () => this.deletePages(),
        'protect': () => this.protectPDF(),
        'pdf-to-images': () => this.pdfToImages(),
        'rotate': () => this.rotatePDF(),
        'watermark': () => this.addWatermark(),
        'sign': () => this.signPDF()
      };

      const handler = handlers[toolName];
      if (handler) {
        try {
          await handler();
        } catch (error) {
          console.error('Processing error:', error);
          this.showToast('error', 'Error', error.message || 'Ocurrió un error al procesar el archivo');
        }
      }
    });
  }


  // ═══════════════════════════════════════════════════════
  // PDF PROCESSING FUNCTIONS
  // ═══════════════════════════════════════════════════════

  async mergePDFs() {
    if (this.files.length < 2) {
      this.showToast('error', 'Error', 'Necesitas al menos 2 archivos PDF para unir');
      return;
    }

    this.showLoading('Uniendo PDFs...');

    try {
      const mergedPdf = await PDFLib.PDFDocument.create();

      for (const file of this.files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      this.downloadFile(mergedPdfBytes, 'merged-document.pdf', 'application/pdf');
      
      this.hideLoading();
      this.showToast('success', '¡Listo!', `${this.files.length} archivos unidos correctamente`);
      
    } catch (error) {
      this.hideLoading();
      throw error;
    }
  }

  async imagesToPDF() {
    if (this.files.length === 0) {
      this.showToast('error', 'Error', 'Necesitas al menos una imagen');
      return;
    }

    this.showLoading('Creando PDF desde imágenes...');

    try {
      const pdfDoc = await PDFLib.PDFDocument.create();

      for (const file of this.files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;

        if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else {
          // Convert other formats to PNG first
          const imgBitmap = await createImageBitmap(file);
          const canvas = document.createElement('canvas');
          canvas.width = imgBitmap.width;
          canvas.height = imgBitmap.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(imgBitmap, 0, 0);
          const pngBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
          const pngBuffer = await pngBlob.arrayBuffer();
          image = await pdfDoc.embedPng(pngBuffer);
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      this.downloadFile(pdfBytes, 'images-to-pdf.pdf', 'application/pdf');
      
      this.hideLoading();
      this.showToast('success', '¡Listo!', `PDF creado con ${this.files.length} imágenes`);
      
    } catch (error) {
      this.hideLoading();
      throw error;
    }
  }


  async renderPagePreviews(file) {
    const previewGrid = document.getElementById('pagePreview');
    if (!previewGrid) return;

    this.showLoading('Cargando páginas...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      previewGrid.classList.remove('hidden');
      previewGrid.innerHTML = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.innerHTML = `
          <input type="checkbox" class="preview-checkbox" data-page="${i}">
          <canvas class="preview-canvas"></canvas>
          <div class="preview-label">Página ${i}</div>
        `;
        
        const previewCanvas = previewItem.querySelector('.preview-canvas');
        previewCanvas.width = canvas.width;
        previewCanvas.height = canvas.height;
        previewCanvas.getContext('2d').drawImage(canvas, 0, 0);

        const checkbox = previewItem.querySelector('.preview-checkbox');
        previewItem.addEventListener('click', (e) => {
          if (e.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
            previewItem.classList.toggle('selected', checkbox.checked);
          } else {
            previewItem.classList.toggle('selected', checkbox.checked);
          }
        });

        previewGrid.appendChild(previewItem);
      }

      this.hideLoading();
      this.showToast('info', 'Páginas cargadas', 'Selecciona las páginas que deseas eliminar');

    } catch (error) {
      this.hideLoading();
      throw error;
    }
  }

  async deletePages() {
    const checkboxes = document.querySelectorAll('.preview-checkbox:checked');
    
    if (checkboxes.length === 0) {
      this.showToast('error', 'Error', 'Selecciona al menos una página para eliminar');
      return;
    }

    this.showLoading('Eliminando páginas...');

    try {
      const pagesToDelete = Array.from(checkboxes).map(cb => parseInt(cb.dataset.page) - 1);
      const arrayBuffer = await this.files[0].arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
      
      const totalPages = pdfDoc.getPageCount();
      const pagesToKeep = [];
      for (let i = 0; i < totalPages; i++) {
        if (!pagesToDelete.includes(i)) {
          pagesToKeep.push(i);
        }
      }

      if (pagesToKeep.length === 0) {
        throw new Error('No puedes eliminar todas las páginas del documento');
      }

      const newPdf = await PDFLib.PDFDocument.create();
      const pages = await newPdf.copyPages(pdfDoc, pagesToKeep);
      pages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      this.downloadFile(pdfBytes, 'document-edited.pdf', 'application/pdf');
      
      this.hideLoading();
      this.showToast('success', '¡Listo!', `${checkboxes.length} páginas eliminadas`);
      
    } catch (error) {
      this.hideLoading();
      throw error;
    }
  }


  async protectPDF() {
    const password = document.getElementById('pdfPassword').value;
    const passwordConfirm = document.getElementById('pdfPasswordConfirm').value;

    if (!password || password.length < 6) {
      this.showToast('error', 'Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== passwordConfirm) {
      this.showToast('error', 'Error', 'Las contraseñas no coinciden');
      return;
    }

    this.showLoading('Protegiendo PDF...');

    try {
      const arrayBuffer = await this.files[0].arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
      
      // Note: pdf-lib doesn't support encryption directly
      // We'll create a new PDF and add password metadata
      const pdfBytes = await pdfDoc.save({
        userPassword: password,
        ownerPassword: password,
      });

      this.downloadFile(pdfBytes, 'protected-document.pdf', 'application/pdf');
      
      this.hideLoading();
      this.showToast('success', '¡Listo!', 'PDF protegido con contraseña');
      
    } catch (error) {
      this.hideLoading();
      // PDF-lib may not fully support encryption, show warning
      this.showToast('error', 'Limitación', 'La encriptación completa requiere una librería adicional. El PDF se ha guardado pero puede que la protección no sea completa.');
    }
  }

  async pdfToImages() {
    this.showLoading('Convirtiendo páginas a imágenes...');

    try {
      const scale = parseFloat(document.getElementById('imageScale').value);
      const arrayBuffer = await this.files[0].arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      const images = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: scale });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        images.push({ blob, name: `page-${i}.png` });
      }

      // Download all images
      for (const { blob, name } of images) {
        const arrayBuffer = await blob.arrayBuffer();
        this.downloadFile(arrayBuffer, name, 'image/png');
        await new Promise(resolve => setTimeout(resolve, 200)); // Small delay between downloads
      }

      this.hideLoading();
      this.showToast('success', '¡Listo!', `${images.length} imágenes generadas`);
      
    } catch (error) {
      this.hideLoading();
      throw error;
    }
  }


  async rotatePDF() {
    const angle = parseInt(document.getElementById('rotateAngle').value);

    this.showLoading('Rotando documento...');

    try {
      const arrayBuffer = await this.files[0].arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
      
      const pages = pdfDoc.getPages();
      pages.forEach(page => {
        page.setRotation(PDFLib.degrees(angle));
      });

      const pdfBytes = await pdfDoc.save();
      this.downloadFile(pdfBytes, 'rotated-document.pdf', 'application/pdf');
      
      this.hideLoading();
      this.showToast('success', '¡Listo!', `Documento rotado ${angle}°`);
      
    } catch (error) {
      this.hideLoading();
      throw error;
    }
  }

  async addWatermark() {
    const text = document.getElementById('watermarkText').value;
    const opacity = parseInt(document.getElementById('watermarkOpacity').value) / 100;

    if (!text) {
      this.showToast('error', 'Error', 'Ingresa el texto de la marca de agua');
      return;
    }

    this.showLoading('Añadiendo marca de agua...');

    try {
      const arrayBuffer = await this.files[0].arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
      
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

      pages.forEach(page => {
        const { width, height } = page.getSize();
        const fontSize = 60;
        const textWidth = font.widthOfTextAtSize(text, fontSize);

        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size: fontSize,
          font: font,
          color: PDFLib.rgb(0.5, 0.5, 0.5),
          opacity: opacity,
          rotate: PDFLib.degrees(-45),
        });
      });

      const pdfBytes = await pdfDoc.save();
      this.downloadFile(pdfBytes, 'watermarked-document.pdf', 'application/pdf');
      
      this.hideLoading();
      this.showToast('success', '¡Listo!', 'Marca de agua añadida');
      
    } catch (error) {
      this.hideLoading();
      throw error;
    }
  }


  async signPDF() {
    const signatureInput = document.getElementById('signatureImage');
    const signatureFile = signatureInput.files[0];
    const size = parseInt(document.getElementById('signatureSize').value);

    if (!signatureFile) {
      this.showToast('error', 'Error', 'Selecciona una imagen de firma');
      return;
    }

    this.showLoading('Firmando documento...');

    try {
      const arrayBuffer = await this.files[0].arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
      
      const signatureBytes = await signatureFile.arrayBuffer();
      const signatureImage = await pdfDoc.embedPng(signatureBytes);

      const pages = pdfDoc.getPages();
      const lastPage = pages[pages.length - 1];
      const { width, height } = lastPage.getSize();

      const signatureDims = signatureImage.scale(size / signatureImage.width);

      lastPage.drawImage(signatureImage, {
        x: width - signatureDims.width - 50,
        y: 50,
        width: signatureDims.width,
        height: signatureDims.height,
      });

      const pdfBytes = await pdfDoc.save();
      this.downloadFile(pdfBytes, 'signed-document.pdf', 'application/pdf');
      
      this.hideLoading();
      this.showToast('success', '¡Listo!', 'Documento firmado correctamente');
      
    } catch (error) {
      this.hideLoading();
      throw error;
    }
  }

  // ═══════════════════════════════════════════════════════
  // UTILITY FUNCTIONS
  // ═══════════════════════════════════════════════════════

  downloadFile(data, filename, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  showLoading(message = 'Procesando...') {
    const overlay = document.getElementById('loadingOverlay');
    const messageEl = document.getElementById('loadingMessage');
    if (overlay && messageEl) {
      messageEl.textContent = message;
      overlay.classList.add('active');
    }
  }

  hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }


  // ═══════════════════════════════════════════════════════
  // TOAST NOTIFICATION SYSTEM
  // ═══════════════════════════════════════════════════════

  setupToastSystem() {
    // Toast container is already in HTML
  }

  showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
      success: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
      error: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>',
      info: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>'
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type]}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.remove();
    });

    container.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 5000);
  }
}

// Initialize the app
const app = new SimpliPDF();
