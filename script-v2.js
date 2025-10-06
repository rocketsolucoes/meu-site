// ===================================
// COUNTDOWN TIMER (Barra de Urgência)
// ===================================
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // Define o tempo inicial (23 horas, 59 minutos, 47 segundos)
    let totalSeconds = (23 * 3600) + (59 * 60) + 47;

    function updateCountdown() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        countdownElement.textContent = formattedTime;

        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            totalSeconds = (23 * 3600) + (59 * 60) + 47; // Reinicia o contador
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===================================
// FAQ ACCORDION
// ===================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Abre o item clicado (se não estava ativo)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===================================
// PRICING TABS (Mensal, Trimestral, Anual)
// ===================================
function initPricingTabs() {
    const tabButtons = document.querySelectorAll('.tab-button-v2');
    const plansWrappers = document.querySelectorAll('.plans-wrapper');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const period = button.getAttribute('data-period');

            // Remove active de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active ao botão clicado
            button.classList.add('active');

            // Esconde todos os wrappers
            plansWrappers.forEach(wrapper => wrapper.classList.remove('active'));

            // Mostra o wrapper correspondente
            const targetWrapper = document.getElementById(`planos-${period}-v2`);
            if (targetWrapper) {
                targetWrapper.classList.add('active');
            }
        });
    });
}

// ===================================
// SMOOTH SCROLL PARA ÂNCORAS
// ===================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignora links vazios ou apenas "#"
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 80; // 80px de offset para a barra de urgência
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// TRACKING DE EVENTOS (Google Analytics / GTM)
// ===================================
function trackEvent(eventName, eventData = {}) {
    // Se você estiver usando Google Tag Manager
    if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({
            'event': eventName,
            ...eventData
        });
    }
    
    // Se você estiver usando Google Analytics 4 diretamente
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', eventName, eventData);
    }
}

// Rastrear cliques nos botões de CTA
function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary, .btn-plan-v2');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonLocation = this.closest('section')?.className || 'unknown';

            trackEvent('cta_click', {
                'button_text': buttonText,
                'button_location': buttonLocation
            });
        });
    });
}

// Rastrear visualizações de seções importantes
function initSectionTracking() {
    const sections = document.querySelectorAll('section[id], section[class*="section"]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% da seção visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.id || entry.target.className.split(' ')[0];
                
                trackEvent('section_view', {
                    'section_name': sectionName
                });

                // Para de observar essa seção após a primeira visualização
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===================================
// INICIALIZAÇÃO
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicia o countdown
    startCountdown();

    // Inicia o FAQ accordion
    initFAQ();

    // Inicia os tabs de pricing
    initPricingTabs();

    // Inicia smooth scroll
    initSmoothScroll();

    // Inicia tracking de eventos
    initCTATracking();
    initSectionTracking();

    // Log de inicialização (remover em produção)
    console.log('✅ Página de vendas V2 carregada com sucesso!');
});

// ===================================
// FUNÇÕES AUXILIARES
// ===================================

// Detecta se o usuário está saindo da página (Exit Intent)
let exitIntentShown = false;

document.addEventListener('mouseleave', function(e) {
    if (e.clientY < 0 && !exitIntentShown) {
        exitIntentShown = true;
        
        // Aqui você pode mostrar um popup de saída ou oferta especial
        trackEvent('exit_intent_triggered');
        
        // Exemplo: alert('Espere! Não perca essa oferta especial!');
        // Em produção, você substituiria isso por um modal bonito
    }
});

// Detecta tempo de permanência na página
let timeOnPage = 0;
setInterval(() => {
    timeOnPage += 1;
    
    // Rastreia marcos de tempo (30s, 1min, 2min, 5min)
    if (timeOnPage === 30 || timeOnPage === 60 || timeOnPage === 120 || timeOnPage === 300) {
        trackEvent('time_on_page', {
            'seconds': timeOnPage
        });
    }
}, 1000);
