document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       TYPING ANIMATION
    ===================================================== */

    const typingText =
        document.getElementById("typingText");

    const words = [
        "Software Developer",
        "CSE Student",
        "AI / ML Enthusiast",
        "Web Developer",
        "Creative Builder"
    ];

    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;


    function typeWriter() {

        if (!typingText) return;

        const word =
            words[wordIndex];


        if (!deleting) {

            typingText.textContent =
                word.substring(
                    0,
                    letterIndex + 1
                );

            letterIndex++;


            if (
                letterIndex ===
                word.length
            ) {

                deleting = true;

                setTimeout(
                    typeWriter,
                    1500
                );

                return;
            }

        } else {

            typingText.textContent =
                word.substring(
                    0,
                    letterIndex - 1
                );

            letterIndex--;


            if (letterIndex === 0) {

                deleting = false;

                wordIndex++;

                if (
                    wordIndex >=
                    words.length
                ) {
                    wordIndex = 0;
                }

            }

        }


        setTimeout(
            typeWriter,
            deleting ? 45 : 85
        );

    }


    typeWriter();



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById(
            "menuButton"
        );

    const navMenu =
        document.getElementById(
            "navMenu"
        );


    menuButton.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle(
                "open"
            );


            if (
                navMenu.classList.contains(
                    "open"
                )
            ) {

                menuButton.textContent =
                    "✕";

            } else {

                menuButton.textContent =
                    "☰";

            }

        }
    );


    navMenu
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove(
                        "open"
                    );

                    menuButton.textContent =
                        "☰";

                }
            );

        });



    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const navbar =
        document.getElementById(
            "navbar"
        );


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 50
            ) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        }
    );



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const topButton =
        document.getElementById(
            "topButton"
        );


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 500
            ) {

                topButton.classList.add(
                    "show"
                );

            } else {

                topButton.classList.remove(
                    "show"
                );

            }

        }
    );


    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );



    /* =====================================================
       ANIMATED NETWORK BACKGROUND
    ===================================================== */

    const canvas =
        document.getElementById(
            "networkCanvas"
        );

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
                75,
                Math.floor(
                    window.innerWidth / 17
                )
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            particles.push({

                x:
                    Math.random() *
                    canvas.width,

                y:
                    Math.random() *
                    canvas.height,

                vx:
                    (Math.random() - 0.5)
                    * 0.35,

                vy:
                    (Math.random() - 0.5)
                    * 0.35,

                radius:
                    Math.random() * 1.8
                    + 1

            });

        }

    }


    function animateNetwork() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach(
            function (particle) {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;


                if (
                    particle.x < 0 ||
                    particle.x >
                    canvas.width
                ) {

                    particle.vx *= -1;

                }


                if (
                    particle.y < 0 ||
                    particle.y >
                    canvas.height
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
                    "rgba(70,70,70,0.45)";

                ctx.fill();

            }
        );


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


                if (
                    distance < 150
                ) {

                    const opacity =
                        (
                            1 -
                            distance / 150
                        ) * 0.22;


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
                        `rgba(70,70,70,${opacity})`;

                    ctx.lineWidth = 1;

                    ctx.stroke();

                }

            }

        }


        requestAnimationFrame(
            animateNetwork
        );

    }


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    resizeCanvas();

    animateNetwork();



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    console.log(
        "Mahalakshmi Portfolio loaded 🚀"
    );

});
