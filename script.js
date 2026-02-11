// GRUPO ALSEG - Landing Page JavaScript
// Interactividad y animaciones premium

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================================================
    // NAVIGATION
    // ============================================================================
    
    // Smooth scrolling para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background al hacer scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(20, 24, 115, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Cerrar menú mobile al clicar un enlace del menú (mejora UX)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // ============================================================================
    // SCROLL ANIMATIONS
    // ============================================================================
    
    // Intersection Observer para animaciones al scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // activar animación de entrada
                entry.target.classList.add('animate-in');
                // marcar visible para animaciones CSS
                setTimeout(() => entry.target.classList.add('visible'), 20);
                
                // Animar elementos hijos con delay
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                        setTimeout(() => child.classList.add('visible'), 20);
                    }, index * 200);
                });
                // Si la sección tiene contadores, iniciarlos
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(startCounter);
            }
        });
    }, observerOptions);

    // Observar secciones para animaciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    // Observar cards y elementos específicos
    const animateElements = document.querySelectorAll(
        '.problem-card, .cycle-item, .audience-card, .feature-item, .module-card, .stat-item'
    );
    animateElements.forEach(el => observer.observe(el));

    // ============================================================================
    // HERO ANIMATIONS
    // ============================================================================
    
    // Animación de los iconos flotantes del hero
    const securityIcons = document.querySelectorAll('.icon-item');
    securityIcons.forEach((icon, index) => {
        const delay = icon.dataset.delay || index * 0.2;
        
        setTimeout(() => {
            icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
        }, delay * 1000);
        
        // Efecto hover en iconos
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ============================================================================
    // SECURITY CYCLE INTERACTIONS - Sistema Simplificado
    // ============================================================================
    
    const cycleElements = document.querySelectorAll('.cycle-element');
    const centerCircle = document.querySelector('.center-circle');
    const connectionLines = document.querySelectorAll('.connection-line');
    
    // Datos para el hub central dinámico
    const hubData = {
        '1': { icon: '🔧', title: 'Implementación<br><span>Integral</span>', subtitle: 'Sistemas Conectados' },
        '2': { icon: '👁️', title: 'Monitoreo<br><span>24/7</span>', subtitle: 'Vigilancia Constante' },
        '3': { icon: '🎯', title: 'Asesoría<br><span>Estratégica</span>', subtitle: 'Mejora Continua' }
    };
    
    cycleElements.forEach((element, index) => {
        element.addEventListener('mouseenter', function() {
            // Activar elemento actual
            cycleElements.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            
            // Actualizar hub central
            const step = this.dataset.step;
            updateCenterContent(step);
            
            // Animar conexiones
            animateConnections(index);
        });
        
        element.addEventListener('mouseleave', function() {
            // Resetear después de un breve delay
            setTimeout(() => {
                if (!document.querySelector('.cycle-element:hover')) {
                    resetCycleState();
                }
            }, 150);
        });
    });
    
    function updateCenterContent(step) {
        if (!centerCircle || !hubData[step]) return;
        
        const data = hubData[step];
        const icon = centerCircle.querySelector('.center-icon');
        const title = centerCircle.querySelector('h3');
        const subtitle = centerCircle.querySelector('p');
        
        if (icon) icon.textContent = data.icon;
        if (title) title.innerHTML = data.title;
        if (subtitle) subtitle.textContent = data.subtitle;
        
        // Efecto visual en el centro
        centerCircle.style.transform = 'scale(1.05)';
        setTimeout(() => {
            centerCircle.style.transform = 'scale(1)';
        }, 200);
    }
    
    function animateConnections(activeIndex) {
        connectionLines.forEach((line, index) => {
            if (index === activeIndex) {
                line.style.opacity = '1';
                line.style.strokeWidth = '3';
                line.style.filter = 'drop-shadow(0 0 6px rgba(52, 126, 191, 0.4))';
            } else {
                line.style.opacity = '0.4';
                line.style.strokeWidth = '2';
                line.style.filter = 'none';
            }
        });
    }
    
    function resetCycleState() {
        // Resetear elementos
        cycleElements.forEach(el => el.classList.remove('active'));
        
        // Resetear conexiones
        connectionLines.forEach(line => {
            line.style.opacity = '0.6';
            line.style.strokeWidth = '2';
            line.style.filter = 'none';
        });
        
        // Resetear hub al estado original
        if (centerCircle) {
            const icon = centerCircle.querySelector('.center-icon');
            const title = centerCircle.querySelector('h3');
            const subtitle = centerCircle.querySelector('p');
            
            if (icon) icon.textContent = '🛡️';
            if (title) title.innerHTML = 'Seguridad<br><span>360°</span>';
            if (subtitle) subtitle.textContent = 'Ecosistema Integral';
        }
    }
    
    // Auto-rotación cada 6 segundos
    let currentCycleIndex = 0;
    function autoRotateCycle() {
        // Solo rotar si no hay interacción del usuario
        if (!document.querySelector('.cycle-element:hover')) {
            cycleElements.forEach((el, index) => {
                el.classList.remove('active');
                if (index === currentCycleIndex) {
                    el.classList.add('active');
                    updateCenterContent(el.dataset.step);
                    animateConnections(index);
                }
            });
            
            currentCycleIndex = (currentCycleIndex + 1) % cycleElements.length;
        }
    }
    
    // Iniciar auto-rotación
    const cycleInterval = setInterval(autoRotateCycle, 6000);
    
    // Pausar auto-rotación cuando el usuario interactúa
    cycleElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            clearInterval(cycleInterval);
        });
    });
    
    // Reiniciar auto-rotación después de inactividad
    let inactivityTimeout;
    cycleElements.forEach(element => {
        element.addEventListener('mouseleave', () => {
            clearTimeout(inactivityTimeout);
            inactivityTimeout = setTimeout(() => {
                setInterval(autoRotateCycle, 6000);
            }, 3000);
        });
    });

    // ============================================================================
    // MODULE CARDS INTERACTION
    // ============================================================================
    
    const moduleCards = document.querySelectorAll('.module-card');
    let currentModule = 0;
    
    // Auto-rotation de módulos cada 4 segundos
    function rotateModules() {
        moduleCards.forEach(card => card.classList.remove('active'));
        moduleCards[currentModule].classList.add('active');
        currentModule = (currentModule + 1) % moduleCards.length;
    }
    
    // Iniciar rotación automática
    setInterval(rotateModules, 4000);
    
    // Click manual en módulos
    moduleCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            moduleCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentModule = index;
        });
    });

    // ============================================================================
    // FORM INTERACTIONS
    // ============================================================================
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, select');
        
        // Mejorar la experiencia de los inputs
        inputs.forEach(input => {
            // Focus states
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Validación en tiempo real
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
        
        // Envío del formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }

    // ============================================================================
    // CUSTOM SELECT - reemplazo estilizable
    // ============================================================================
    function initCustomSelects() {
        document.querySelectorAll('.select-wrap select').forEach(orig => {
            // crear estructura
            const wrap = orig.parentElement;
            orig.style.display = 'none';

            const cs = document.createElement('div');
            cs.className = 'custom-select';
            cs.tabIndex = 0;

            const selected = document.createElement('div');
            selected.className = 'cs-selected';
            selected.setAttribute('role', 'button');
            selected.setAttribute('aria-haspopup', 'listbox');

            const txt = document.createElement('span');
            txt.className = 'cs-text';
            txt.textContent = orig.options[orig.selectedIndex].textContent || orig.options[0].textContent;

            const arrow = document.createElement('span');
            arrow.className = 'arrow';
            // single SVG arrow; CSS rotates it when `.custom-select` has the `.open` class
            arrow.innerHTML = `
                <svg class="svg-arrow" viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
            `;

            selected.appendChild(txt);
            selected.appendChild(arrow);

            const list = document.createElement('ul');
            list.className = 'cs-options';
            list.setAttribute('role', 'listbox');

            Array.from(orig.options).forEach((opt, i) => {
                const li = document.createElement('li');
                li.setAttribute('role', 'option');
                li.dataset.value = opt.value;
                li.textContent = opt.textContent;
                if (i === orig.selectedIndex) li.classList.add('active');
                li.addEventListener('click', function() {
                    // marcar seleccionado
                    list.querySelectorAll('li').forEach(n => n.classList.remove('active'));
                    this.classList.add('active');
                    txt.textContent = this.textContent;
                    orig.value = this.dataset.value;
                    orig.dispatchEvent(new Event('change'));
                    cs.classList.remove('open');
                });
                list.appendChild(li);
            });

            cs.appendChild(selected);
            cs.appendChild(list);
            wrap.appendChild(cs);

            // Toggle open
            selected.addEventListener('click', () => {
                const isOpen = cs.classList.toggle('open');
                cs.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!cs.contains(e.target)) {
                    cs.classList.remove('open');
                    cs.setAttribute('aria-expanded', 'false');
                }
            });

            // Keyboard support
            cs.addEventListener('keydown', (e) => {
                const open = cs.classList.contains('open');
                const items = Array.from(list.querySelectorAll('li'));
                let idx = items.findIndex(i => i.classList.contains('active'));

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (!open) cs.classList.add('open');
                    idx = Math.min(items.length -1, idx + 1);
                    items.forEach(n => n.classList.remove('active'));
                    items[idx].classList.add('active');
                    items[idx].scrollIntoView({block: 'nearest'});
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (!open) cs.classList.add('open');
                    idx = Math.max(0, idx - 1);
                    items.forEach(n => n.classList.remove('active'));
                    items[idx].classList.add('active');
                    items[idx].scrollIntoView({block: 'nearest'});
                }
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (open) {
                        const active = list.querySelector('li.active');
                        if (active) {
                            txt.textContent = active.textContent;
                            orig.value = active.dataset.value;
                            orig.dispatchEvent(new Event('change'));
                        }
                        cs.classList.remove('open');
                    } else {
                        cs.classList.add('open');
                    }
                }
                if (e.key === 'Escape') {
                    cs.classList.remove('open');
                }
            });
        });
    }

    // Inicializar custom selects
    initCustomSelects();
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        
        // Limpiar errores previos
        field.classList.remove('error');
        
        // Validaciones específicas
        switch(type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                break;
            case 'tel':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                isValid = phoneRegex.test(value.replace(/\s/g, ''));
                break;
            default:
                isValid = value.length > 0;
        }
        
        // Aplicar clase de error si es necesario
        if (!isValid && value.length > 0) {
            field.classList.add('error');
        }
        
        return isValid;
    }
    
    function handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validar todos los campos
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Simular envío (aquí integrarías con tu backend)
            showFormSuccess();
            console.log('Datos del formulario:', data);
        } else {
            showFormError('Por favor, completa todos los campos correctamente.');
        }
    }
    
    function showFormSuccess() {
        const submitBtn = document.querySelector('.contact-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '¡Mensaje Enviado! ✓';
        submitBtn.disabled = true;
        submitBtn.style.background = '#10B981';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            document.querySelector('.contact-form').reset();
        }, 3000);
    }
    
    function showFormError(message) {
        // Crear notificación de error (podrías usar una librería de toasts)
        console.error(message);
    }

    // ============================================================================
    // PERFORMANCE OPTIMIZATIONS
    // ============================================================================
    
    // Throttle para eventos de scroll
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Aplicar throttle al scroll del navbar
    window.addEventListener('scroll', throttle(function() {
        // La lógica del navbar ya está definida arriba
    }, 100));

    // ============================================================================
    // ACCESSIBILITY IMPROVEMENTS
    // ============================================================================
    
    // Mejorar navegación por teclado
    document.addEventListener('keydown', function(e) {
        // Escape para cerrar menús móviles
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Focus visible para elementos interactivos
    const focusableElements = document.querySelectorAll(
        'button, a, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(el => {
        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Permitir activación por teclado
                if (this.tagName !== 'INPUT' && this.tagName !== 'SELECT') {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });

    // ============================================================================
    // LOADING STATES
    // ============================================================================
    
    // Ocultar loader inicial si existe
    window.addEventListener('load', function() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
        
        // Disparar animaciones iniciales
        document.body.classList.add('loaded');
    });

    // ============================================================================
    // UTILS
    // ============================================================================
    
    // Función para detectar si el usuario prefiere reducir el movimiento
    function respectsMotionPreference() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    // Reducir animaciones si el usuario lo prefiere
    if (respectsMotionPreference()) {
        document.documentElement.style.setProperty('--transition-smooth', 'none');
        document.documentElement.style.setProperty('--transition-fast', 'none');
    }
    
    // Función para obtener posición de scroll más precisa
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    // ============================================================================
    // COUNTERS
    // ============================================================================
    function startCounter(el) {
        if (el.dataset.started) return;
        const target = parseInt(el.dataset.target, 10) || 0;
        el.dataset.started = 'true';
        const duration = 1500; // ms
        const start = performance.now();

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value < 1 ? '0' : value;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }
    
    // Log para debug (solo en desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🛡️ GRUPO ALSEG Landing Page loaded successfully');
        console.log('🎯 All interactive elements initialized');
    }
    
});

// ============================================================================
// CSS ANIMATIONS ADICIONALES (via JavaScript)
// ============================================================================

// Agregar estilos CSS dinámicos para animaciones avanzadas
const additionalStyles = `
    @keyframes drawLine {
        from {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
        }
        to {
            stroke-dasharray: 0;
            stroke-dashoffset: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-group.focused input,
    .form-group.focused select {
        border-color: var(--accent-blue);
        background: rgba(255, 255, 255, 0.15);
    }
    
    .form-group input.error,
    .form-group select.error {
        border-color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
    }
    
    .cycle-item.active {
        transform: translateY(-8px) scale(1.02);
        box-shadow: var(--shadow-lg);
        border: 2px solid var(--accent-blue);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 20px 0;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-md);
        }
        
        .nav-menu.active {
            transform: translateY(0);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    .loaded .fade-in {
        animation-play-state: running;
    }
    
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background-light);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
    }
    
    .page-loader.fade-out {
        opacity: 0;
    }
`;

// Agregar los estilos adicionales al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);