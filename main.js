
    function getTrackingData() {
      var params = new URLSearchParams(window.location.search);
      var stored = {};
      try { stored = JSON.parse(sessionStorage.getItem('__track') || '{}'); } catch(e) {}
      return {
        utm_source:   params.get('utm_source')   || stored.utm_source   || '',
        utm_medium:   params.get('utm_medium')   || stored.utm_medium   || '',
        utm_campaign: params.get('utm_campaign') || stored.utm_campaign || '',
        utm_term:     params.get('utm_term')     || stored.utm_term     || '',
        utm_content:  params.get('utm_content')  || stored.utm_content  || '',
        gclid:        params.get('gclid')        || stored.gclid        || '',
        fbclid:       params.get('fbclid')       || stored.fbclid       || '',
        page_url:     window.location.href,
        referrer:     document.referrer || ''
      };
    }

    // Save tracking data to sessionStorage on page load
    (function() {
      var params = new URLSearchParams(window.location.search);
      if (params.get('utm_source') || params.get('gclid') || params.get('fbclid')) {
        try { sessionStorage.setItem('__track', JSON.stringify(Object.fromEntries(params))); } catch(e) {}
      }
    })();

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

        heroForm.addEventListener("submit", async function (e) {
          e.preventDefault();
          var honeypot = this.querySelector('#website');
          if (honeypot && honeypot.value.trim() !== '') return;
          var tracking = getTrackingData();
          var payload = {
            name:    this.querySelector('[name="name"]').value.trim(),
            phone:   this.querySelector('[name="phone"]').value.trim(),
            email:   this.querySelector('[name="email"]').value.trim(),
            service: this.querySelector('[name="service"]').value.trim(),
            message: this.querySelector('[name="message"]') ? this.querySelector('[name="message"]').value.trim() : '',
            utm_source: tracking.utm_source,
            utm_medium: tracking.utm_medium,
            utm_campaign: tracking.utm_campaign,
            utm_term: tracking.utm_term,
            utm_content: tracking.utm_content,
            gclid: tracking.gclid,
            fbclid: tracking.fbclid,
            page_url: tracking.page_url,
            referrer: tracking.referrer,
            website: honeypot ? honeypot.value.trim() : ''
          };
          payload.source = tracking.gclid ? 'google_ads' : (tracking.utm_source || 'website_form');
          var btn = this.querySelector('[type="submit"]');
          if (btn) btn.disabled = true;
          if (heroStatus) { heroStatus.className = 'cm-form-status'; heroStatus.textContent = ''; }
          // Fire Supabase CRM sync (keepalive so it completes even if GTM redirects first)
          // fetch('https://blihucaykcporqfgpevb.supabase.co/functions/v1/receive-lead', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sb_publishable_UfK3U1Y9tZGkEC-w3Fgipw_kFRlK4P8' },
          //   body: JSON.stringify(payload),
          //   keepalive: true
          // }).catch(function() {});
          // Show success and redirect (GTM sheet tag fires in parallel via bubble phase)
          try {
            if (heroStatus) {
              heroStatus.classList.add('success');
              heroStatus.textContent = '✓ Thank you! Your message has been sent successfully.';
            }
            this.reset();
            setTimeout(function() { window.location.href = '/thank-you'; }, 800);
          } catch(err) {
            if (heroStatus) {
              heroStatus.classList.add('error');
              heroStatus.textContent = 'Something went wrong. Please try again or call us directly.';
            }
          } finally {
            if (btn) btn.disabled = false;
          }
        });
      });

      document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("chauhanContactForm");
        if (!form) return;
        const cmStatus = document.getElementById("cmFormStatus");

        form.addEventListener("submit", async function (e) {
          e.preventDefault();
          var honeypot = this.querySelector('#website');
          if (honeypot && honeypot.value.trim() !== '') return;
          var tracking = getTrackingData();
          var payload = {
            name:    this.querySelector('[name="name"]').value.trim(),
            phone:   this.querySelector('[name="phone"]').value.trim(),
            email:   this.querySelector('[name="email"]').value.trim(),
            service: this.querySelector('[name="service"]').value.trim(),
            message: this.querySelector('[name="message"]') ? this.querySelector('[name="message"]').value.trim() : '',
            utm_source: tracking.utm_source,
            utm_medium: tracking.utm_medium,
            utm_campaign: tracking.utm_campaign,
            utm_term: tracking.utm_term,
            utm_content: tracking.utm_content,
            gclid: tracking.gclid,
            fbclid: tracking.fbclid,
            page_url: tracking.page_url,
            referrer: tracking.referrer,
            website: honeypot ? honeypot.value.trim() : ''
          };
          payload.source = tracking.gclid ? 'google_ads' : (tracking.utm_source || 'website_form');
          var btn = this.querySelector('[type="submit"]');
          if (btn) btn.disabled = true;
          if (cmStatus) { cmStatus.className = 'cm-form-status'; cmStatus.textContent = ''; }
          // Fire Supabase CRM sync (keepalive so it completes even if GTM redirects first)
          // fetch('https://blihucaykcporqfgpevb.supabase.co/functions/v1/receive-lead', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sb_publishable_UfK3U1Y9tZGkEC-w3Fgipw_kFRlK4P8' },
          //   body: JSON.stringify(payload),
          //   keepalive: true
          // }).catch(function() {});
          // Show success and redirect (GTM sheet tag fires in parallel via bubble phase)
          try {
            if (cmStatus) {
              cmStatus.classList.add('success');
              cmStatus.textContent = '✓ Thank you! Your message has been sent successfully.';
            }
            this.reset();
            setTimeout(function() { window.location.href = '/thank-you'; }, 800);
          } catch(err) {
            if (cmStatus) {
              cmStatus.classList.add('error');
              cmStatus.textContent = 'Something went wrong. Please try again or call us directly.';
            }
          } finally {
            if (btn) btn.disabled = false;
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
 
