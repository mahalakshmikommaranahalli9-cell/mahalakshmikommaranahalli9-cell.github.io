/* =========================================================
   MAHALAKSHMI PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const menuButton = document.getElementById("menuButton");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("themeToggle");

const revealElements =
    document.querySelectorAll(".reveal");


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuButton) {

    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const icon =
            menuButton.querySelector("i");

        if (navMenu.classList.contains("open")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon =
            menuButton.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

});


/* =========================================================
   THEME
========================================================= */

const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    updateThemeIcon();

}


function updateThemeIcon() {

    if (!themeToggle) return;

    const icon =
        themeToggle.querySelector("i");

    if (document.body.classList.contains("light")) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const theme =
            document.body.classList.contains("light")
                ? "light"
                : "dark";

        localStorage.setItem(
            "portfolio-theme",
            theme
        );

        updateThemeIcon();

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

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


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId =
                        entry.target.getAttribute("id");

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href")
                            === `#${currentId}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});


/* =========================================================
   SIGNATURE REPLAY
   Plays when signature enters viewport
========================================================= */

const signatureArea =
    document.querySelector(".signature-area");


if (signatureArea) {

    const signatureObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const writing =
                            document.querySelector(
                                ".signature-writing"
                            );

                        const line =
                            document.querySelector(
                                ".signature-underline"
                            );

                        const caption =
                            document.querySelector(
                                ".signature-caption"
                            );

                        writing.style.animation =
                            "none";

                        line.style.animation =
                            "none";

                        caption.style.animation =
                            "none";

                        void writing.offsetWidth;

                        void line.offsetWidth;

                        void caption.offsetWidth;

                        writing.style.animation =
                            "signatureWrite 3.5s cubic-bezier(.65,0,.35,1) forwards";

                        line.style.animation =
                            "signatureLine 1.3s cubic-bezier(.65,0,.35,1) 3.8s forwards";

                        caption.style.animation =
                            "signatureCaption 1s ease 4.6s forwards";

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    signatureObserver.observe(signatureArea);

}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cMahalakshmi Portfolio",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "%cBuilt with HTML, CSS & JavaScript.",
    "font-size:12px;"
);
