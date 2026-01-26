/**
 * ========================================
 * MODAL DE PLANOS DE ASSINATURA - JavaScript
 * Controle de abertura, fechamento e interacoes
 * ========================================
 */

(function() {
    'use strict';

    // Elementos do DOM
    const modal = document.getElementById('subscription-modal');
    const closeBtn = document.querySelector('.subscription-modal-close');
    const triggerBtn = document.getElementById('btn-assinar');

    // Verifica se os elementos existem
    if (!modal) {
        console.warn('Modal de assinatura nao encontrado.');
        return;
    }

    /**
     * Abre o modal com animacao
     */
    function openModal() {
        modal.style.display = 'flex';
        document.body.classList.add('subscription-modal-open');

        // Pequeno delay para permitir a animacao
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });

        // Foca no modal para acessibilidade
        modal.setAttribute('aria-hidden', 'false');

        // Rastreamento de evento (se GTM estiver disponivel)
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'modal_open',
                'modal_name': 'subscription_plans'
            });
        }
    }

    /**
     * Fecha o modal com animacao
     */
    function closeModal() {
        modal.classList.remove('active');

        // Aguarda a animacao terminar antes de ocultar
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.classList.remove('subscription-modal-open');
        }, 300);

        modal.setAttribute('aria-hidden', 'true');

        // Rastreamento de evento
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'modal_close',
                'modal_name': 'subscription_plans'
            });
        }
    }

    /**
     * Fecha modal ao clicar no overlay (fundo escuro)
     */
    function handleOverlayClick(e) {
        if (e.target === modal) {
            closeModal();
        }
    }

    /**
     * Fecha modal com tecla ESC
     */
    function handleKeydown(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    }

    /**
     * Rastreia cliques nos planos
     */
    function trackPlanClick(planName, planPrice) {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'plan_click',
                'plan_name': planName,
                'plan_price': planPrice
            });
        }
    }

    // Event Listeners

    // Botao de abrir modal
    if (triggerBtn) {
        triggerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    // Botao de fechar (X)
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Clique no overlay
    modal.addEventListener('click', handleOverlayClick);

    // Tecla ESC
    document.addEventListener('keydown', handleKeydown);

    // Rastreamento de cliques nos CTAs dos planos
    const planCTAs = document.querySelectorAll('.subscription-plan-cta');
    planCTAs.forEach(function(cta) {
        cta.addEventListener('click', function() {
            const card = this.closest('.subscription-plan-card');
            const planName = card.querySelector('.subscription-plan-name')?.textContent || 'unknown';
            const planAmount = card.querySelector('.subscription-amount')?.textContent || '0';
            const planCents = card.querySelector('.subscription-cents')?.textContent || ',00';

            trackPlanClick(planName, planAmount + planCents);
        });
    });

    // API publica para controle externo do modal
    window.SubscriptionModal = {
        open: openModal,
        close: closeModal,
        isOpen: function() {
            return modal.classList.contains('active');
        }
    };

    // Permite multiplos gatilhos para abrir o modal
    // Qualquer elemento com a classe 'open-subscription-modal' abrira o modal
    document.addEventListener('click', function(e) {
        if (e.target.closest('.open-subscription-modal')) {
            e.preventDefault();
            openModal();
        }
    });

})();
