// Funcionalidade do FAQ (Accordion)
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Animação de entrada dos elementos quando entram na viewport
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observa elementos que devem ter animação de entrada
    const elementsToAnimate = document.querySelectorAll('.feature-card, .testimonial, .pricing-card, .faq-item');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicializa as animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', observeElements);

// Efeito parallax sutil no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    }
});

// Adiciona classe para melhorar a performance das animações
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

// Função para copiar cupom (se necessário no futuro)
function copyCoupon(couponCode) {
    navigator.clipboard.writeText(couponCode).then(() => {
        // Feedback visual de que o cupom foi copiado
        const notification = document.createElement('div');
        notification.textContent = 'Cupom copiado!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
}

// Adiciona efeito de hover nos botões CTA
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-button, .plan-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Preloader simples (opcional)
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    // Remove qualquer preloader se existir
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
});


// Toggle de expansão dos audience cards no mobile
document.addEventListener('DOMContentLoaded', function() {
    const audienceCards = document.querySelectorAll('.audience-card');
    
    function handleCardToggle(card) {
        // Apenas no mobile (largura menor que 769px)
        if (window.innerWidth <= 768) {
            // Toggle da classe 'expanded'
            card.classList.toggle('expanded');
            
            // Fechar outros cards abertos (comportamento accordion)
            audienceCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                }
            });
        }
    }
    
    audienceCards.forEach(card => {
        // Suporte para click (desktop/mobile)
        card.addEventListener('click', function(e) {
            e.preventDefault();
            handleCardToggle(this);
        });
        
        // Suporte para touch (mobile)
        card.addEventListener('touchend', function(e) {
            e.preventDefault();
            handleCardToggle(this);
        });
    });
});
