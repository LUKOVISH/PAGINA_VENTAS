/**
 * PÁGINA DE CONTACTO - LORA
 * Funcionalidades específicas para la página de contacto
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del formulario
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Campos del formulario
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const asunto = document.getElementById('asunto');
    const presupuesto = document.getElementById('presupuesto');
    const mensaje = document.getElementById('mensaje');

    // Texto original del botón
    const originalBtnText = submitBtn.innerHTML;

    // Expresiones regulares para validación
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,15}$/;

    /**
     * Validar campo individual
     */
    function validateField(field, validationFn, errorMsg) {
        const isValid = validationFn(field.value.trim());
        const errorElement = field.parentNode.querySelector('.error-message');
        
        if (isValid) {
            field.classList.remove('form-error');
            field.classList.add('form-success');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        } else {
            field.classList.remove('form-success');
            field.classList.add('form-error');
            
            if (!errorElement) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = errorMsg;
                field.parentNode.appendChild(errorDiv);
            } else {
                errorElement.textContent = errorMsg;
            }
            
            if (errorElement) {
                errorElement.style.display = 'block';
            }
        }
        
        return isValid;
    }

    /**
     * Limpiar validación de campo
     */
    function clearValidation(field) {
        field.classList.remove('form-error', 'form-success');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    /**
     * Validaciones en tiempo real
     */
    nombre.addEventListener('blur', function() {
        if (this.value.trim()) {
            validateField(this, 
                value => value.length >= 2,
                'El nombre debe tener al menos 2 caracteres'
            );
        }
    });

    email.addEventListener('blur', function() {
        if (this.value.trim()) {
            validateField(this, 
                value => emailRegex.test(value),
                'Por favor ingresa un email válido'
            );
        }
    });

    telefono.addEventListener('blur', function() {
        if (this.value.trim()) {
            validateField(this, 
                value => phoneRegex.test(value),
                'Por favor ingresa un teléfono válido'
            );
        }
    });

    mensaje.addEventListener('blur', function() {
        if (this.value.trim()) {
            validateField(this, 
                value => value.length >= 10,
                'El mensaje debe tener al menos 10 caracteres'
            );
        }
    });

    // Limpiar validación cuando el usuario empiece a escribir
    [nombre, email, telefono, mensaje].forEach(field => {
        field.addEventListener('input', function() {
            if (this.classList.contains('form-error')) {
                clearValidation(this);
            }
        });
    });

    /**
     * Validación completa del formulario
     */
    function validateForm() {
        let isValid = true;
        
        // Validar campos requeridos
        const nombreValid = validateField(nombre, 
            value => value.length >= 2,
            'El nombre es requerido (mínimo 2 caracteres)'
        );
        
        const emailValid = validateField(email, 
            value => emailRegex.test(value),
            'Email válido requerido'
        );
        
        const asuntoValid = validateField(asunto, 
            value => value !== '',
            'Por favor selecciona un asunto'
        );
        
        const mensajeValid = validateField(mensaje, 
            value => value.length >= 10,
            'Mensaje requerido (mínimo 10 caracteres)'
        );

        // Validar teléfono solo si se proporciona
        let telefonoValid = true;
        if (telefono.value.trim()) {
            telefonoValid = validateField(telefono, 
                value => phoneRegex.test(value),
                'Formato de teléfono inválido'
            );
        }

        isValid = nombreValid && emailValid && asuntoValid && mensajeValid && telefonoValid;
        
        return isValid;
    }

    /**
     * Mostrar estado de carga
     */
    function showLoadingState() {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        contactForm.style.opacity = '0.7';
    }

    /**
     * Ocultar estado de carga
     */
    function hideLoadingState() {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        contactForm.style.opacity = '1';
    }

    /**
     * Simular envío de formulario
     */
    function simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            // Simular tiempo de respuesta del servidor
            setTimeout(() => {
                // 90% de probabilidad de éxito
                if (Math.random() > 0.1) {
                    resolve({
                        success: true,
                        message: '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.'
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
                    });
                }
            }, 2000);
        });
    }

    /**
     * Mostrar notificación
     */
    function showNotification(message, type = 'success') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // Estilos del contenido
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        // Estilos del botón cerrar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.2s ease;
        `;

        closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
        closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');

        // Agregar al DOM
        document.body.appendChild(notification);

        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-remove después de 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    /**
     * Limpiar formulario
     */
    function clearForm() {
        contactForm.reset();
        
        // Limpiar validaciones
        [nombre, email, telefono, asunto, mensaje].forEach(field => {
            clearValidation(field);
        });
    }

    /**
     * Manejar envío del formulario
     */
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validar formulario
        if (!validateForm()) {
            showNotification('Por favor corrige los errores en el formulario', 'error');
            return;
        }

        try {
            // Mostrar estado de carga
            showLoadingState();

            // Recopilar datos del formulario
            const formData = {
                nombre: nombre.value.trim(),
                email: email.value.trim(),
                telefono: telefono.value.trim(),
                asunto: asunto.value,
                presupuesto: presupuesto.value,
                mensaje: mensaje.value.trim(),
                timestamp: new Date().toISOString()
            };

            // Simular envío
            const result = await simulateFormSubmission();

            // Ocultar estado de carga
            hideLoadingState();

            // Mostrar resultado
            if (result.success) {
                showNotification(result.message, 'success');
                clearForm();
                
                // Scroll suave al inicio del formulario
                document.querySelector('.contact-hero').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

        } catch (error) {
            // Ocultar estado de carga
            hideLoadingState();
            
            // Mostrar error
            showNotification(error.message || 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
            
            console.error('Error al enviar formulario:', error);
        }
    });

    /**
     * Funcionalidad adicional: Auto-resize textarea
     */
    mensaje.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });

    /**
     * Formatear teléfono automáticamente
     */
    telefono.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        if (value.startsWith('51')) {
            // Formato peruano: +51 999 999 999
            value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
        } else if (value.length === 9) {
            // Formato local peruano: 999 999 999
            value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
        }
        
        this.value = value;
    });

    /**
     * Efectos visuales adicionales
     */
    
    // Animación de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.info-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    /**
     * Validación de accesibilidad
     */
    function setupAccessibility() {
        // Agregar ARIA labels dinámicos
        const requiredFields = [nombre, email, asunto, mensaje];
        requiredFields.forEach(field => {
            field.setAttribute('aria-required', 'true');
            field.addEventListener('invalid', function() {
                this.setAttribute('aria-invalid', 'true');
            });
            field.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.setAttribute('aria-invalid', 'false');
                }
            });
        });

        // Mejorar navegación con teclado
        const focusableElements = contactForm.querySelectorAll('input, select, textarea, button');
        focusableElements.forEach((element, index) => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
                    e.preventDefault();
                    const nextElement = focusableElements[index + 1];
                    if (nextElement) {
                        nextElement.focus();
                    }
                }
            });
        });
    }

    // Inicializar funciones de accesibilidad
    setupAccessibility();

    /**
     * Manejo de errores globales
     */
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Error no manejado:', event.reason);
        showNotification('Ha ocurrido un error inesperado. Por favor, recarga la página.', 'error');
    });

    // Log de inicialización
    console.log('Página de contacto inicializada correctamente');
});