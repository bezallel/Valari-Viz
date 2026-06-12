
const subNavLinks = document.querySelectorAll('.sub-nav li a'); 
const sections = document.querySelectorAll('main section');

function updateActiveLink() {
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    subNavLinks.forEach(link => {
        link.classList.remove('active');

 
        if (currentSection && link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }

    
        const linkPath = link.getAttribute('href');
        const currentPath = window.location.pathname.split('/').pop().split('?')[0];

        if (linkPath === currentPath) {
            link.classList.add('active');


            const parentLi = link.closest('ul.sub-nav')?.closest('li');
            if (parentLi) {
                parentLi.classList.add('active');
                const parentAnchor = parentLi.querySelector(':scope > a'); 
                if (parentAnchor) {
                    parentAnchor.classList.add('active-parent');
                }
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('DOMContentLoaded', updateActiveLink);



window.addEventListener('scroll', updateActiveLink);


window.addEventListener('DOMContentLoaded', updateActiveLink);






document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        const prevButton = slider.parentElement.querySelector('.prev');
        const nextButton = slider.parentElement.querySelector('.next');
        const slides = Array.from(slider.children);
        let currentSlide = 0;

        
        slides.forEach((slide, i) => {
            slide.style.position = 'absolute';
            slide.style.transform = (i === currentSlide) ? 'translateX(0)' : 'translateX(100%)';
            slide.style.opacity = (i === currentSlide) ? '1' : '0';
            slide.style.zIndex = (i === currentSlide) ? '5' : '1';
            slide.style.transition = 'none'; 
        });

        function showSlide(index) {
            const nextIndex = (index + 1) % slides.length;
            const prevIndex = (index - 1 + slides.length) % slides.length;

            slides.forEach((slide, i) => {
                const video = slide.querySelector('video');

                if (i === index) {
                    slide.style.transform = 'translateX(0)';
                    slide.style.opacity = '1';
                    slide.style.zIndex = '5';

                    if (video) {
                        video.pause();
                        video.currentTime = 0;
                        setTimeout(() => {
                            video.play();
                        }, 500);
                    }
                } else {
                    slide.style.opacity = '0';
                    slide.style.zIndex = '4';

                    if (video) {
                        video.pause();
                        video.currentTime = 0;
                    }

                    if (i === nextIndex) {
                        slide.style.transform = 'translateX(100%)';
                    } else if (i === prevIndex) {
                        slide.style.transform = 'translateX(-100%)';
                    } else {
                        slide.style.transform = 'translateX(100%)';
                        slide.style.zIndex = '1';
                    }
                }
            });
        }

        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
            showSlide(currentSlide);
        });

        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
            showSlide(currentSlide);
        });


        setTimeout(() => {
            slides.forEach(slide => {
                slide.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
            });
        }, 50);
    });
});








document.addEventListener('DOMContentLoaded', () => {
  const nextProject = document.querySelector('.next-project');
  const sentinel = document.getElementById('footer-sentinel');

  if (!nextProject || !sentinel) {
    console.warn('Missing .next-project or #footer-sentinel');
    return;
  }

  let lastY = window.scrollY;

 
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          nextProject.classList.add('show');
        } else {
          nextProject.classList.remove('show');
        }
      });
    },
    { root: null, threshold: 0.05 }
  );

  io.observe(sentinel);


  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const scrollingUp = y < lastY;

    if (scrollingUp && !sentinel.getBoundingClientRect().top < window.innerHeight) {
      nextProject.classList.remove('show');
    }

    lastY = y;
  }, { passive: true });
});



















 const menuBtn = document.querySelector('.menu-toggle');
  const sideNav = document.querySelector('.side-nav');

  menuBtn.addEventListener('click', () => {
    sideNav.classList.toggle('open');
  });



document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});


document.querySelectorAll("a[href]").forEach(link => {
  link.addEventListener("click", e => {
   
    if (link.target === "_blank" || link.href.includes("#")) return;

    e.preventDefault();
    document.body.classList.remove("fade-in"); 
    document.body.style.opacity = "0";
    setTimeout(() => {
      window.location.href = link.href;
    }, 400); 
  });
});
