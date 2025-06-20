// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const proyectoCards = document.querySelectorAll('.proyecto-card');
    const testimonios = document.querySelectorAll('.testimonio');
    const testimoniosDots = document.querySelector('.testimonios-dots');
    
    // Navegación Responsive
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header con efecto de scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Filtro de proyectos
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover clase active de todos los botones
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Añadir clase active al botón clickeado
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filtrar proyectos
                proyectoCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Slider de testimonios
    if (testimonios.length > 0) {
        // Crear puntos de navegación
        testimonios.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('data-index', index);
            testimoniosDots.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        
        // Función para mostrar un testimonio específico
        function showTestimonio(index) {
            testimonios.forEach((testimonio, i) => {
                testimonio.style.transform = `translateX(${100 * (i - index)}%)`;
            });
            
            // Actualizar puntos activos
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            currentSlide = index;
        }
        
        // Inicializar el slider
        showTestimonio(0);
        
        // Evento de clic en los puntos
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonio(index);
            });
        });
        
        // Avance automático del slider
        setInterval(() => {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= testimonios.length) {
                nextSlide = 0;
            }
            showTestimonio(nextSlide);
        }, 5000);
    }
    
    // Animación de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se puede agregar la lógica para enviar el formulario por AJAX
            // Por ahora solo mostramos un mensaje de éxito
            
            const formData = new FormData(this);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Formulario enviado:', formValues);
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
            
            // Resetear el formulario
            this.reset();
        });
    }
    
    // Formulario de newsletter en el footer
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                console.log('Suscripción al newsletter:', email);
                alert('¡Gracias por suscribirte a nuestro boletín!');
                this.reset();
            }
        });
    }
    
    // Añadir efecto de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    document.querySelectorAll('.section-header, .servicio-card, .proyecto-card, .testimonio, .info-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Añadir clase para animaciones CSS
    document.body.classList.add('js-loaded');
});

// Añadir estilos para las animaciones
document.head.insertAdjacentHTML('beforeend', `
<style>
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    .servicio-card.fade-in,
    .proyecto-card.fade-in,
    .testimonio.fade-in,
    .info-item.fade-in {
        transition-delay: calc(var(--item-index, 0) * 0.1s);
    }
    
    @media (prefers-reduced-motion: reduce) {
        .fade-in {
            transition: none;
            opacity: 1;
            transform: none;
        }
    }
</style>
`);

// Asignar índices para retrasos en animaciones
document.querySelectorAll('.servicio-card, .proyecto-card, .testimonio, .info-item').forEach((el, index) => {
    el.style.setProperty('--item-index', index % 3);
});
