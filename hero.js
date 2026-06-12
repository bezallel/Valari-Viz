// hero.js


// // hero.js
// document.addEventListener("DOMContentLoaded", function () {
  //   const goBtn = document.getElementById("go-projects");
  //   const body = document.body;
  //   body.classList.add("page-transition");
  
  //   goBtn.addEventListener("click", function (e) {
    //     e.preventDefault();
    //     body.classList.add("fade-out");
    //     setTimeout(() => {
      //       window.location.href = this.getAttribute("href");
      //     }, 500); // match CSS transition duration
      //   });
      // });
      
      
      
      
      
      document.addEventListener("DOMContentLoaded", function () {
  // fade in hero
  const hero = document.querySelector(".hero");
  if (hero) {
    setTimeout(() => hero.classList.add("visible"), 50);
  }

  const goBtn = document.getElementById("go-projects");
  if (!goBtn) return;

  // smooth scroll behavior for internal anchor
  goBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) {
      window.location.href = this.getAttribute("href");
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    setTimeout(() => target.removeAttribute("tabindex"), 1000);
  });
});






      


function getBrightness(color) {
  const rgb = color.match(/\d+/g).map(Number);
  return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
}

function updateColors() {
  const hero = document.querySelector(".hero");
  const texts = document.querySelectorAll(".hero-inner, .btn.neumorphic");
  const style = window.getComputedStyle(hero);
  const bg = style.backgroundImage;

  // Pick the first rgb() color in the gradient as approximation
  const match = bg.match(/rgb[a]?\([^)]+\)/);
  if (!match) return;

  const brightness = getBrightness(match[0]);
  const textColor = brightness > 150 ? "#111" : "#fff";

  texts.forEach(el => {
    el.style.color = textColor;

    // Update shadows for neumorphic buttons
    // if (el.classList.contains("btn")) {
    //   const shadowDark = brightness > 150 ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.3)";
    //   const shadowLight = brightness > 150 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)";
    //   el.style.boxShadow = `6px 6px 10px ${shadowDark}, -6px -6px 10px ${shadowLight}`;
    // }
  });
}

// Run immediately and then update smoothly
updateColors();
setInterval(updateColors, 1000); // every second is smooth enough





