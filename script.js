// Mobile menu toggle
    const mobileToggleBtn = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');

    function toggleMenu(open) {
      const isOpen = mobileNav.classList.contains('open');
      const newState = typeof open === 'boolean' ? open : !isOpen;
      mobileNav.classList.toggle('open', newState);
      mobileOverlay.classList.toggle('show', newState);
      mobileToggleBtn.setAttribute('aria-expanded', newState);
      if (newState) {
        mobileNav.querySelector('a').focus();
      } else {
        mobileToggleBtn.focus();
      }
    }
    mobileToggleBtn.addEventListener('click', () => toggleMenu());

    mobileOverlay.addEventListener('click', () => toggleMenu(false));

    // Close mobile menu with Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });

    // Smooth animation on scroll for section elements
    const animatedElements = document.querySelectorAll(
      'section, .service-card, form'
    );
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });

    // Form handling
    const form = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response-message');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Simulate form submission
      formResponse.textContent = '';
      formResponse.classList.remove('show');

      // Disable submit button to prevent multiple submissions
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';

        form.reset();

        formResponse.textContent = 'Obrigado! Sua mensagem foi enviada com sucesso.';
        formResponse.classList.add('show');
        formResponse.focus();
      }, 1600);
    });