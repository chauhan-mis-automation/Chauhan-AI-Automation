  
    /* =========================================
   COUNTER ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".mis-counter");
    const statsSection = document.querySelector(".mis-stats-strip");

    let started = false;

    function startCounters() {

        if (started) return;

        started = true;

        counters.forEach(function (counter) {

            const target =
                parseInt(counter.getAttribute("data-target"));

            const duration = 1800;

            const startTime =
                performance.now();

            function updateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                const current =
                    Math.floor(target * easedProgress);

                counter.textContent = current;

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }

            }

            requestAnimationFrame(updateCounter);

        });

    }


    if (statsSection && counters.length) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            startCounters();

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );

        observer.observe(statsSection);

    }

});



/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const items =
        document.querySelectorAll(".reveal-item");

    if (!items.length) return;

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    items.forEach(function (item) {

        observer.observe(item);

    });

});

  
   
   

      document.addEventListener("DOMContentLoaded", function () {
        if (window.innerWidth <= 900) {
          return;
        }

        const cards = document.querySelectorAll(".cms-card");

        cards.forEach(function (card) {
          card.addEventListener("mousemove", function (e) {
            const rect = card.getBoundingClientRect();

            const mouseX = e.clientX - rect.left;

            const mouseY = e.clientY - rect.top;

            const rotateY = (mouseX - rect.width / 2) / 18;

            const rotateX = -(mouseY - rect.height / 2) / 18;

            card.style.transform =
              "perspective(800px)" +
              " rotateX(" +
              rotateX +
              "deg)" +
              " rotateY(" +
              rotateY +
              "deg)" +
              " translateY(-4px)";
          });

          card.addEventListener("mouseleave", function () {
            card.style.transform =
              "perspective(800px)" + " rotateX(3deg)" + " rotateY(0deg)";
          });
        });
      });
   
      document.addEventListener("DOMContentLoaded", function () {
        const whyCards = document.querySelectorAll(".cm-why-card");

        whyCards.forEach(function (card) {
          card.addEventListener("mousemove", function (e) {
            if (window.innerWidth <= 900) {
              return;
            }

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;

            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 4;

            const rotateX = ((centerY - y) / centerY) * 4;

            card.style.transform = `
                translateY(-7px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;
          });

          card.addEventListener("mouseleave", function () {
            card.style.transform = "";
          });
        });
      });
   
      document.addEventListener("DOMContentLoaded", function () {
        const cards = document.querySelectorAll(".mis-industry-card");

        cards.forEach(function (card) {
          card.addEventListener("mousemove", function (e) {
            if (window.innerWidth <= 900) {
              return;
            }

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;

            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 6;

            const rotateX = ((centerY - y) / centerY) * 6;

            card.style.transform = `
                            translateY(-9px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                            scale(1.04)
                            `;
          });

          card.addEventListener("mouseleave", function () {
            card.style.transform = "";
          });
        });
      });

      document.addEventListener("DOMContentLoaded", function () {
        const heroForm = document.getElementById("heroContactForm");
        if (!heroForm) return;

        const heroStatus = document.getElementById("heroFormStatus");
        const heroButton = heroForm.querySelector(".hero-form-btn");

        // Same Google Apps Script Web App URL used by the main contact form
        // and the React site — keeps all leads in one Google Sheet.
        const HERO_SHEET_URL =
          "https://script.google.com/macros/s/AKfycbyRmgVegDzIfMWStvziBxdNQt16wd3iblMcrijlzuWkdvNWpNRo99vk8a42m4e3dRfi/exec";

        heroForm.addEventListener("submit", async function (e) {
          e.preventDefault();

          if (heroStatus) {
            heroStatus.className = "cm-form-status";
            heroStatus.textContent = "";
          }

          const originalBtnHtml = heroButton ? heroButton.innerHTML : "";
          if (heroButton) {
            heroButton.disabled = true;
            heroButton.textContent = "Sending...";
          }

          const payload = {
            name: heroForm.querySelector('[name="name"]').value.trim(),
            phone: heroForm.querySelector('[name="phone"]').value.trim(),
            email: heroForm.querySelector('[name="email"]').value.trim(),
            service: heroForm.querySelector('[name="service"]').value.trim(),
            message: heroForm.querySelector('[name="message"]').value.trim(),
          };

          try {
            await fetch(HERO_SHEET_URL, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "text/plain" },
              body: JSON.stringify(payload),
            });

            if (heroStatus) {
              heroStatus.classList.add("success");
              heroStatus.textContent =
                "✓ Thank you! Your message has been sent successfully.";
            }
            heroForm.reset();
            window.location.href = "thank-you.html";
            return;
          } catch (error) {
            if (heroStatus) {
              heroStatus.classList.add("error");
              heroStatus.textContent =
                "Unable to send your message. Please try again or contact us on WhatsApp.";
            }
          } finally {
            if (heroButton) {
              heroButton.disabled = false;
              heroButton.innerHTML = originalBtnHtml;
            }
          }
        });
      });

      document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("chauhanContactForm");
        const button = document.getElementById("cmSubmitBtn");
        const buttonText = button.querySelector(".cm-submit-text");
        const status = document.getElementById("cmFormStatus");

        // Same Google Apps Script Web App URL used by the React site —
        // keeps all leads (both sites) in one Google Sheet.
        const GOOGLE_SHEET_URL =
          "https://script.google.com/macros/s/AKfycbyRmgVegDzIfMWStvziBxdNQt16wd3iblMcrijlzuWkdvNWpNRo99vk8a42m4e3dRfi/exec";

        form.addEventListener("submit", async function (e) {
          e.preventDefault();

          // Honeypot spam check (kept from the original PHP logic)
          const honeypot = form.querySelector('[name="website"]');
          if (honeypot && honeypot.value) {
            return; // silently drop bot submissions
          }

          status.className = "cm-form-status";
          status.textContent = "";

          button.disabled = true;
          buttonText.textContent = "Sending...";

          const payload = {
            name: form.querySelector('[name="name"]').value.trim(),
            phone: form.querySelector('[name="phone"]').value.trim(),
            email: form.querySelector('[name="email"]').value.trim(),
            service: form.querySelector('[name="service"]').value.trim(),
            message: form.querySelector('[name="message"]').value.trim(),
          };

          try {
            // mode: "no-cors" is required because Apps Script doesn't send
            // CORS headers; this means we can't read the response body, so
            // we treat "fetch didn't throw" as success.
            await fetch(GOOGLE_SHEET_URL, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "text/plain" },
              body: JSON.stringify(payload),
            });

            status.classList.add("success");
            status.textContent =
              "✓ Thank you! Your message has been sent successfully.";

            form.reset();
            window.location.href = "thank-you.html";
            return;
          } catch (error) {
            status.classList.add("error");
            status.textContent =
              "Unable to send your message. Please try again or contact us on WhatsApp.";
          } finally {
            button.disabled = false;
            buttonText.textContent = "Send Message";
          }
        });
      });
    

      document.addEventListener("DOMContentLoaded", function () {
        const faqItems = document.querySelectorAll(".mis-faq-item");

        faqItems.forEach(function (item) {
          const button = item.querySelector(".mis-faq-question");

          button.addEventListener("click", function () {
            const alreadyActive = item.classList.contains("active");

            /*
                    Sab items close
                    */
            faqItems.forEach(function (otherItem) {
              otherItem.classList.remove("active");

              const icon = otherItem.querySelector(".mis-faq-icon");

              icon.textContent = "+";
            });

            /*
                    Clicked item pehle open nahi tha
                    to usko open karo
                    */
            if (!alreadyActive) {
              item.classList.add("active");

              item.querySelector(".mis-faq-icon").textContent = "−";
            }
          });
        });
      });
    
    
      document.addEventListener("DOMContentLoaded", function () {
        const aboutCards = document.querySelectorAll(".cm-about-final-card");

        aboutCards.forEach(function (card) {
          card.addEventListener("mousemove", function (e) {
            if (window.innerWidth <= 900) {
              return;
            }

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;

            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 2;

            const rotateX = ((centerY - y) / centerY) * 2;

            card.style.transform = `
        translateY(-3px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        `;
          });

          card.addEventListener("mouseleave", function () {
            card.style.transform = "";
          });
        });
      });
    
      document.addEventListener("DOMContentLoaded", function () {
        const cards = document.querySelectorAll(".cm-flow-card");

        cards.forEach(function (card) {
          card.addEventListener("mousemove", function (e) {
            if (window.innerWidth <= 1000) {
              return;
            }

            const rect = card.getBoundingClientRect();

            const mouseX = e.clientX - rect.left;

            const mouseY = e.clientY - rect.top;

            const centerX = rect.width / 2;

            const centerY = rect.height / 2;

            const rotateY = ((mouseX - centerX) / centerX) * 4;

            const rotateX = ((centerY - mouseY) / centerY) * 4;

            card.style.transform = `
                translateY(-7px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.025)
                `;
          });

          card.addEventListener("mouseleave", function () {
            card.style.transform = "";
          });
        });
      });
 
      document.addEventListener("DOMContentLoaded", function () {
        const techCards = document.querySelectorAll(".cm-tech-card");

        techCards.forEach(function (card) {
          card.addEventListener("mousemove", function (e) {
            if (window.innerWidth <= 900) {
              return;
            }

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;

            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 3;

            const rotateX = ((centerY - y) / centerY) * 3;

            card.style.transform = `
                translateY(-7px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;
          });

          card.addEventListener("mouseleave", function () {
            card.style.transform = "";
          });
        });
      });

      document.addEventListener("DOMContentLoaded", function () {
        const steps = document.querySelectorAll(".cm-work-step");

        steps.forEach(function (step) {
          step.addEventListener("mouseenter", function () {
            const icon = step.querySelector(".cm-work-icon-circle");

            icon.style.transform = "translateY(-5px) scale(1.04)";

            icon.style.transition = "transform .3s ease";
          });

          step.addEventListener("mouseleave", function () {
            const icon = step.querySelector(".cm-work-icon-circle");

            icon.style.transform = "";
          });
        });
      });

      document.addEventListener("DOMContentLoaded", function () {
        const slider = document.querySelector(".cm-testimonials-slider");

        if (!slider) {
          return;
        }

        const viewport = slider.querySelector(".cm-testimonials-viewport");

        const track = slider.querySelector(".cm-testimonials-track");

        const cards = Array.from(
          track.querySelectorAll(".cm-testimonial-card"),
        );

        const prevBtn = slider.querySelector(".cm-prev");

        const nextBtn = slider.querySelector(".cm-next");

        const dotsWrap = document.querySelector(".cm-testimonial-dots");

        let current = 0;
        let autoplay;

        function visibleCards() {
          if (window.innerWidth <= 650) {
            return 1;
          }

          if (window.innerWidth <= 1000) {
            return 2;
          }

          return 3;
        }

        function maxIndex() {
          return Math.max(0, cards.length - visibleCards());
        }

        function buildDots() {
          dotsWrap.innerHTML = "";

          for (let i = 0; i <= maxIndex(); i++) {
            const dot = document.createElement("button");

            dot.className = "cm-testimonial-dot";

            if (i === current) {
              dot.classList.add("active");
            }

            dot.addEventListener("click", function () {
              current = i;

              updateSlider();

              restartAutoplay();
            });

            dotsWrap.appendChild(dot);
          }
        }

        function updateSlider() {
          const cardWidth = cards[0].getBoundingClientRect().width;

          const gap = parseFloat(getComputedStyle(track).gap) || 0;

          if (current > maxIndex()) {
            current = maxIndex();
          }

          track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;

          const dots = dotsWrap.querySelectorAll(".cm-testimonial-dot");

          dots.forEach(function (dot, index) {
            dot.classList.toggle("active", index === current);
          });
        }

        function nextSlide() {
          if (current >= maxIndex()) {
            current = 0;
          } else {
            current++;
          }

          updateSlider();
        }

        function prevSlide() {
          if (current <= 0) {
            current = maxIndex();
          } else {
            current--;
          }

          updateSlider();
        }

        function startAutoplay() {
          autoplay = setInterval(nextSlide, 4500);
        }

        function stopAutoplay() {
          clearInterval(autoplay);
        }

        function restartAutoplay() {
          stopAutoplay();
          startAutoplay();
        }

        nextBtn.addEventListener("click", function () {
          nextSlide();

          restartAutoplay();
        });

        prevBtn.addEventListener("click", function () {
          prevSlide();

          restartAutoplay();
        });

        slider.addEventListener("mouseenter", function () {
          stopAutoplay();
        });

        slider.addEventListener("mouseleave", function () {
          startAutoplay();
        });

        window.addEventListener("resize", function () {
          current = 0;

          buildDots();

          updateSlider();
        });

        buildDots();

        updateSlider();

        startAutoplay();
      });
   
document.addEventListener("DOMContentLoaded", function(){

  /* ==========================
     TAB SWITCHING
  ========================== */

  const tabs =
    document.querySelectorAll(".cm-project-tab");

  const panels =
    document.querySelectorAll(".cm-project-panel");


  tabs.forEach(function(tab){

    tab.addEventListener("click", function(){

      const selectedTab =
        tab.getAttribute("data-tab");


      tabs.forEach(function(item){

        item.classList.remove("active");

      });


      panels.forEach(function(panel){

        panel.classList.remove("active");

      });


      tab.classList.add("active");


      const selectedPanel =
        document.querySelector(
          `[data-panel="${selectedTab}"]`
        );


      if(selectedPanel){

        selectedPanel.classList.add("active");

      }

    });

  });



  /* ==========================
     VIDEO MODAL
  ========================== */

  const modal =
    document.getElementById("cmVideoModal");

  const video =
    document.getElementById("cmProjectVideo");

  const closeButton =
    document.querySelector(".cm-video-close");

  const backdrop =
    document.querySelector(
      ".cm-video-modal-backdrop"
    );

  const videoButtons =
    document.querySelectorAll(
      ".cm-video-play, .cm-watch-video"
    );


  function openVideo(src){

    if(!modal || !video){
      return;
    }

    video.src = src;

    modal.classList.add("active");

    document.body.style.overflow =
      "hidden";

    video.play().catch(function(){});

  }


  function closeVideo(){

    if(!modal || !video){
      return;
    }

    video.pause();

    video.removeAttribute("src");

    video.load();

    modal.classList.remove("active");

    document.body.style.overflow =
      "";

  }


  videoButtons.forEach(function(button){

    button.addEventListener(
      "click",
      function(){

        const src =
          button.getAttribute(
            "data-video"
          );

        if(src){

          openVideo(src);

        }

      }
    );

  });


  if(closeButton){

    closeButton.addEventListener(
      "click",
      closeVideo
    );

  }


  if(backdrop){

    backdrop.addEventListener(
      "click",
      closeVideo
    );

  }


  document.addEventListener(
    "keydown",
    function(event){

      if(
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("active")
      ){

        closeVideo();

      }

    }
  );

});

   document.addEventListener("DOMContentLoaded", function () {

    const slider =
        document.querySelector(".cm-tech-slider");

    if (!slider) return;


    const track =
        slider.querySelector(".cm-tech-track");

    const cards =
        Array.from(
            slider.querySelectorAll(".cm-tech-card")
        );

    const prevButton =
        slider.querySelector(".cm-tech-prev");

    const nextButton =
        slider.querySelector(".cm-tech-next");

    const dotsContainer =
        document.querySelector(".cm-tech-dots");


    let currentIndex = 0;

    let autoplayTimer;


    /* =========================
       VISIBLE CARDS
    ========================= */

    function getVisibleCards() {

        if (window.innerWidth <= 600) {
            return 2;
        }

        if (window.innerWidth <= 1000) {
            return 3;
        }

        return 5;

    }


    function getMaxIndex() {

        return Math.max(
            0,
            cards.length - getVisibleCards()
        );

    }


    /* =========================
       DOTS
    ========================= */

    function createDots() {

        if (!dotsContainer) return;

        dotsContainer.innerHTML = "";


        for (
            let i = 0;
            i <= getMaxIndex();
            i++
        ) {

            const dot =
                document.createElement("button");

            dot.className =
                "cm-tech-dot";

            if (i === currentIndex) {

                dot.classList.add(
                    "active"
                );

            }


            dot.addEventListener(
                "click",
                function () {

                    currentIndex = i;

                    updateSlider();

                    restartAutoplay();

                }
            );


            dotsContainer.appendChild(dot);

        }

    }


    /* =========================
       UPDATE
    ========================= */

    function updateSlider() {

        if (!cards.length) return;


        if (
            currentIndex >
            getMaxIndex()
        ) {

            currentIndex =
                getMaxIndex();

        }


        const cardWidth =
            cards[0]
                .getBoundingClientRect()
                .width;


        const gap =
            parseFloat(
                getComputedStyle(track)
                    .gap
            ) || 0;


        const move =
            currentIndex *
            (cardWidth + gap);


        track.style.transform =
            `translateX(-${move}px)`;


        if (dotsContainer) {

            const dots =
                dotsContainer.querySelectorAll(
                    ".cm-tech-dot"
                );


            dots.forEach(
                function (dot, index) {

                    dot.classList.toggle(
                        "active",
                        index === currentIndex
                    );

                }
            );

        }

    }


    /* =========================
       NEXT
    ========================= */

    function nextSlide() {

        if (
            currentIndex >=
            getMaxIndex()
        ) {

            currentIndex = 0;

        } else {

            currentIndex++;

        }

        updateSlider();

    }


    /* =========================
       PREVIOUS
    ========================= */

    function prevSlide() {

        if (currentIndex <= 0) {

            currentIndex =
                getMaxIndex();

        } else {

            currentIndex--;

        }

        updateSlider();

    }


    /* =========================
       AUTOPLAY
    ========================= */

    function startAutoplay() {

        stopAutoplay();

        autoplayTimer =
            setInterval(
                nextSlide,
                3500
            );

    }


    function stopAutoplay() {

        if (autoplayTimer) {

            clearInterval(
                autoplayTimer
            );

        }

    }


    function restartAutoplay() {

        stopAutoplay();

        startAutoplay();

    }


    /* =========================
       BUTTON EVENTS
    ========================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                nextSlide();

                restartAutoplay();

            }
        );

    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                prevSlide();

                restartAutoplay();

            }
        );

    }


    /* =========================
       HOVER PAUSE
    ========================= */

    slider.addEventListener(
        "mouseenter",
        stopAutoplay
    );


    slider.addEventListener(
        "mouseleave",
        startAutoplay
    );


    /* =========================
       RESIZE
    ========================= */

    window.addEventListener(
        "resize",
        function () {

            currentIndex = 0;

            createDots();

            updateSlider();

        }
    );


    /* INITIAL */

    createDots();

    updateSlider();

    startAutoplay();

});
 
