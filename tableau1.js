/* ─────────────────────────────────────────
   FADE IN
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
});

/* ─────────────────────────────────────────
   PAGE TRANSITION (fade out on nav)
───────────────────────────────────────── */
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', e => {
    if (link.target === '_blank' || link.href.includes('#')) return;
    e.preventDefault();
    document.body.classList.remove('fade-in');
    document.body.style.opacity = '0';
    setTimeout(() => { window.location.href = link.href; }, 400);
  });
});

/* ─────────────────────────────────────────
   MOBILE NAV TOGGLE
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-toggle');
  const sideNav = document.querySelector('.side-nav');
  if (!menuBtn || !sideNav) return;

  menuBtn.addEventListener('click', () => sideNav.classList.toggle('open'));

  // close when a link inside the nav is tapped
  sideNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => sideNav.classList.remove('open'));
  });

  // close when tapping anywhere outside the nav
  document.addEventListener('click', e => {
    if (!sideNav.contains(e.target) && !menuBtn.contains(e.target)) {
      sideNav.classList.remove('open');
    }
  });
});

/* ─────────────────────────────────────────
   SUB-NAV ACTIVE LINK (scroll spy)
───────────────────────────────────────── */
(function () {
  const subNavLinks = document.querySelectorAll('.sub-nav li a');
  const sections    = document.querySelectorAll('main section');
  if (!subNavLinks.length) return;

  function updateActiveLink() {
    let currentSection = '';
    sections.forEach(section => {
      if (window.pageYOffset >= section.offsetTop - 120) {
        currentSection = section.getAttribute('id');
      }
    });

    const currentPath = window.location.pathname.split('/').pop().split('?')[0];

    subNavLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');

      // highlight by scroll position
      if (currentSection && href === '#' + currentSection) {
        link.classList.add('active');
      }

      // highlight by current page filename
      if (href === currentPath) {
        link.classList.add('active');
        const parentLi = link.closest('ul.sub-nav')?.closest('li');
        if (parentLi) {
          parentLi.classList.add('active');
          const parentAnchor = parentLi.querySelector(':scope > a');
          if (parentAnchor) parentAnchor.classList.add('active-parent');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('DOMContentLoaded', updateActiveLink);
})();

/* ─────────────────────────────────────────
   SLIDER  (works for images and videos)
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slider').forEach(slider => {
    const container  = slider.closest('.container') || slider.parentElement;
    const prevBtn    = container.querySelector('.prev');
    const nextBtn    = container.querySelector('.next');
    const slides     = Array.from(slider.children);
    const total      = slides.length;
    if (!total) return;

    let current = 0;

    /* place all slides in the same stack */
    slides.forEach((slide, i) => {
      slide.style.position   = 'absolute';
      slide.style.inset      = '0';
      slide.style.width      = '100%';
      slide.style.height     = '100%';
      slide.style.transition = 'none';
      slide.style.transform  = i === 0 ? 'translateX(0)'    : 'translateX(100%)';
      slide.style.opacity    = i === 0 ? '1'                : '0';
      slide.style.zIndex     = i === 0 ? '5'                : '1';
    });

    // enable transitions after initial paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slides.forEach(slide => {
          slide.style.transition = 'transform 0.85s ease-in-out, opacity 0.85s ease-in-out';
        });
      });
    });

    function pauseVideo(slide) {
      const v = slide.querySelector('video');
      if (v) { v.pause(); v.currentTime = 0; }
    }

    function playVideo(slide) {
      const v = slide.querySelector('video');
      if (v) setTimeout(() => v.play().catch(() => {}), 500);
    }

    function goTo(index) {
      const prev = current;
      current = (index + total) % total;

      slides.forEach((slide, i) => {
        pauseVideo(slide);

        if (i === current) {
          slide.style.transform = 'translateX(0)';
          slide.style.opacity   = '1';
          slide.style.zIndex    = '5';
          playVideo(slide);
        } else if (i === prev) {
          // outgoing slide exits to the left
          slide.style.transform = current > prev || (prev === total - 1 && current === 0)
            ? 'translateX(-100%)'
            : 'translateX(100%)';
          slide.style.opacity   = '0';
          slide.style.zIndex    = '4';
        } else {
          slide.style.transform = 'translateX(100%)';
          slide.style.opacity   = '0';
          slide.style.zIndex    = '1';
        }
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // keyboard arrows (only when this slider is in view)
    document.addEventListener('keydown', e => {
      const r = slider.getBoundingClientRect();
      const visible = r.top < window.innerHeight && r.bottom > 0;
      if (!visible) return;
      if (e.key === 'ArrowLeft')  goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // touch swipe
    let touchStartX = null;
    slider.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    slider.addEventListener('touchend', e => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) dx < 0 ? goTo(current + 1) : goTo(current - 1);
      touchStartX = null;
    });
  });
});

/* ─────────────────────────────────────────
   NEXT PROJECT — reveal at page bottom
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const nextProject = document.querySelector('.next-project');
  const sentinel    = document.getElementById('footer-sentinel');
  if (!nextProject || !sentinel) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      nextProject.classList.toggle('show', entry.isIntersecting);
    });
  }, { threshold: 0.05 });

  io.observe(sentinel);
});
