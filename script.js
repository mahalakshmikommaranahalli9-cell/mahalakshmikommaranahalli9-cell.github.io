/* =========================================================
   MAHALAKSHMI PORTFOLIO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       TYPING ANIMATION
    ===================================================== */

    const typingText = document.getElementById("typingText");

    const words = [
        "Computer Science Student",
        "Web Developer",
        "AI / ML Enthusiast",
        "Problem Solver",
        "Creative Builder"
    ];

    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typeAnimation() {

        if (!typingText) return;

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent =
                currentWord.substring(0, letterIndex + 1);

            letterIndex++;

            if (letterIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeAnimation, 1600);

                return;
            }

        } else {

            typingText.textContent =
                currentWord.substring(0, letterIndex - 1);

            letterIndex--;

            if (letterIndex === 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }

            }

        }

        const speed = deleting ? 45 : 85;

        setTimeout(typeAnimation, speed);
    }

    typeAnimation();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const navMenu =
        document.getElementById("navMenu");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            if (navMenu.classList.contains("open")) {
                menuButton.textContent = "✕";
            } else {
                menuButton.textContent = "☰";
            }

        });


        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuButton.textContent = "☰";

            });

        });

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.getElementById("navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const topButton =
        document.getElementById("topButton");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    });


    if (topButton) {

        topButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       NETWORK / PARTICLE BACKGROUND
    ===================================================== */

    const canvas =
        document.getElementById("networkCanvas");

    const ctx =
        canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

        createParticles();

    }


    function createParticles() {

        particles = [];

        const amount =
            Math.min(
                65,
                Math.floor(window.innerWidth / 18)
            );

        for (let i = 0; i < amount; i++) {

            particles.push({

                x: Math.random() *
                    canvas.width,

                y: Math.random() *
                    canvas.height,

                vx:
                    (Math.random() - 0.5) *
                    0.35,

                vy:
                    (Math.random() - 0.5) *
                    0.35,

                radius:
                    Math.random() * 2 + 1

            });

        }

    }


    function drawNetwork() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* PARTICLES */

        particles.forEach(particle => {

            particle.x += particle.vx;
            particle.y += particle.vy;


            if (
                particle.x < 0 ||
                particle.x > canvas.width
            ) {
                particle.vx *= -1;
            }


            if (
                particle.y < 0 ||
                particle.y > canvas.height
            ) {
                particle.vy *= -1;
            }


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(60,60,60,0.35)";

            ctx.fill();

        });


        /* CONNECTIONS */

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const dx =
                    particles[i].x -
                    particles[j].x;

                const dy =
                    particles[i].y -
                    particles[j].y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (distance < 150) {

                    const opacity =
                        (1 - distance / 150)
                        * 0.22;

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );

                    ctx.strokeStyle =
                        `rgba(60,60,60,${opacity})`;

                    ctx.lineWidth = 1;

                    ctx.stroke();

                }

            }

        }


        requestAnimationFrame(
            drawNetwork
        );

    }


    window.addEventListener(
        "resize",
        resizeCanvas
    );

    resizeCanvas();

    drawNetwork();


    /* =====================================================
       PROJECT CARD TILT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900)
                    return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) * -3;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 3;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-10px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    console.log(
        "Mahalakshmi Portfolio loaded successfully 🚀"
    );

});
