// Animações de scroll para títulos das seções
document.addEventListener('DOMContentLoaded', function() {
    // Função para verificar se elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Função alternativa mais flexível para elementos parcialmente visíveis
    function isElementPartiallyInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= windowHeight &&
            rect.left <= windowWidth
        );
    }

    // Selecionar todos os títulos das seções
    const sectionTitles = document.querySelectorAll('.section-title');
    
    // Função para animar títulos quando ficam visíveis
    function animateVisibleTitles() {
        sectionTitles.forEach(title => {
            if (isElementPartiallyInViewport(title) && !title.classList.contains('animate')) {
                // Adicionar delay baseado na posição do elemento
                const delay = Math.random() * 200; // Delay aleatório até 200ms
                setTimeout(() => {
                    title.classList.add('animate');
                }, delay);
            }
        });
    }

    // Executar na primeira carga
    animateVisibleTitles();

    // Executar durante o scroll com throttle otimizado
    let ticking = false;
    let scrollTimeout;
    
    function handleScroll() {
        // Limpar timeout anterior
        clearTimeout(scrollTimeout);
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                animateVisibleTitles();
                ticking = false;
            });
            ticking = true;
        }
        
        // Adicionar debounce de 150ms
        scrollTimeout = setTimeout(() => {
            ticking = false;
        }, 150);
    }

    // Adicionar listener de scroll com passive para melhor performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Adicionar efeito de hover nos cards das features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Adicionar efeito de digitação no título principal (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Aguardar a animação inicial terminar
        setTimeout(() => {
            heroTitle.style.borderRight = '2px solid #ff6b35';
            heroTitle.style.animation += ', blink 1s infinite';
            
            // Remover cursor após 3 segundos
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
                heroTitle.style.animation = heroTitle.style.animation.replace(', blink 1s infinite', '');
            }, 3000);
        }, 1500);
    }
});

// Adicionar CSS para o cursor piscante
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: #ff6b35; }
    }
`;
document.head.appendChild(style);
