/* =====================================================
   ELEMENTS
===================================================== */

const navbar =
    document.getElementById("navbar");

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");

const topButton =
    document.getElementById("topButton");

const year =
    document.getElementById("year");



/* =====================================================
   YEAR
===================================================== */

if (year) {

    year.textContent =
        new Date().getFullYear();

}



/* =====================================================
   MOBILE MENU
===================================================== */

menuButton?.addEventListener(
    "click",
    () => {

        const open =
            navMenu.classList.toggle("open");

        menuButton.classList.toggle(
            "open",
            open
        );

        menuButton.setAttribute(
            "aria-expanded",
            open
        );

    }
);



document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove(
                    "open"
                );

                menuButton.classList.remove(
                    "open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

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


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(element);

    });



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    [
        ...document.querySelectorAll(
            "main section[id]"
        )
    ];


const navLinks =
    [
        ...document.querySelectorAll(
            ".nav-menu a"
        )
    ];


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute(
                                "href"
                            ) ===
                            "#" +
                            entry.target.id
                        );

                    });

                }

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px",

            threshold: 0
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});



/* =====================================================
   NAVBAR SCROLL
===================================================== */

function handleScroll() {

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );


    topButton.classList.toggle(
        "show",
        window.scrollY > 600
    );

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


handleScroll();



/* =====================================================
   BACK TO TOP
===================================================== */

topButton.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* =====================================================
   TYPING ANIMATION
===================================================== */

const typingText =
    document.getElementById(
        "typingText"
    );


const words = [

    "CSE Student",

    "Developer",

    "Problem Solver",

    "AI / ML Explorer",

    "IoT Builder"

];


let wordIndex = 0;

let charIndex = 0;

let deleting = false;



function typeLoop() {

    if (!typingText) return;


    const word =
        words[wordIndex];


    if (!deleting) {

        charIndex++;

        typingText.textContent =
            word.slice(
                0,
                charIndex
            );


        if (
            charIndex ===
            word.length
        ) {

            deleting = true;

            setTimeout(
                typeLoop,
                1400
            );

            return;
        }

    } else {

        charIndex--;

        typingText.textContent =
            word.slice(
                0,
                charIndex
            );


        if (charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1)
                % words.length;

        }

    }


    setTimeout(

        typeLoop,

        deleting
            ? 45
            : 85

    );

}


typeLoop();



/* =====================================================
   NETWORK CANVAS
===================================================== */

const canvas =
    document.getElementById(
        "networkCanvas"
    );


const ctx =
    canvas?.getContext("2d");


let particles = [];

let animationId;



function resizeCanvas() {

    if (!canvas || !ctx)
        return;


    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvas.width =
        innerWidth * dpr;


    canvas.height =
        innerHeight * dpr;


    canvas.style.width =
        innerWidth + "px";


    canvas.style.height =
        innerHeight + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    const count =
        innerWidth < 700
            ? 30
            : 55;


    particles =
        Array.from(
            {
                length: count
            },
            () => ({

                x:
                    Math.random()
                    * innerWidth,

                y:
                    Math.random()
                    * innerHeight,

                vx:
                    (Math.random() - .5)
                    * .25,

                vy:
                    (Math.random() - .5)
                    * .25,

                r:
                    Math.random()
                    * 1.8
                    + .5

            })
        );

}



function drawNetwork() {

    if (!ctx || !canvas)
        return;


    ctx.clearRect(
        0,
        0,
        innerWidth,
        innerHeight
    );


    /* PARTICLES */

    for (
        const particle
        of particles
    ) {

        particle.x +=
            particle.vx;

        particle.y +=
            particle.vy;


        if (
            particle.x < 0 ||
            particle.x > innerWidth
        ) {

            particle.vx *= -1;

        }


        if (
            particle.y < 0 ||
            particle.y > innerHeight
        ) {

            particle.vy *= -1;

        }


        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.r,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "rgba(237,75,80,.35)";


        ctx.fill();

    }



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

            const a =
                particles[i];

            const b =
                particles[j];


            const dx =
                a.x - b.x;

            const dy =
                a.y - b.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance < 135
            ) {

                const alpha =
                    (1 -
                        distance / 135)
                    * .12;


                ctx.beginPath();

                ctx.moveTo(
                    a.x,
                    a.y
                );

                ctx.lineTo(
                    b.x,
                    b.y
                );


                ctx.strokeStyle =
                    `rgba(40,40,40,${alpha})`;

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        }

    }


    animationId =
        requestAnimationFrame(
            drawNetwork
        );

}



if (
    canvas &&
    ctx &&
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    resizeCanvas();

    drawNetwork();


    window.addEventListener(
        "resize",
        resizeCanvas
    );

} else if (canvas) {

    canvas.style.display =
        "none";

}


window.addEventListener(
    "beforeunload",
    () => {

        cancelAnimationFrame(
            animationId
        );

    }
);
