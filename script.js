/* =========================================================
   MAHALAKSHMI KOMMARANAHALLI
   PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("hide");
            }

            document.querySelectorAll(".reveal").forEach((element, index) => {

                setTimeout(() => {
                    element.classList.add("visible");
                }, index * 80);

            });

        }, 500);

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (navLinks.classList.contains("open")) {

                menuToggle.setAttribute(
                    "aria-label",
                    "Close menu"
                );

                if (icon) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                }

            } else {

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        /* Close menu after clicking a link */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                const icon = menuToggle.querySelector("i");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        const icon = themeToggle.querySelector("i");

        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "light") {

            document.documentElement.setAttribute(
                "data-theme",
                "light"
            );

            document.body.classList.add("light");

            if (icon) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            }

        }


        themeToggle.addEventListener("click", () => {

            const isLight =
                document.body.classList.contains("light");

            if (isLight) {

                document.body.classList.remove("light");

                document.documentElement.removeAttribute(
                    "data-theme"
                );

                localStorage.setItem(
                    "portfolio-theme",
                    "dark"
                );

                if (icon) {
                    icon.classList.remove("fa-sun");
                    icon.classList.add("fa-moon");
                }

            } else {

                document.body.classList.add("light");

                document.documentElement.setAttribute(
                    "data-theme",
                    "light"
                );

                localStorage.setItem(
                    "portfolio-theme",
                    "light"
                );

                if (icon) {
                    icon.classList.remove("fa-moon");
                    icon.classList.add("fa-sun");
                }

            }

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
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

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navItems =
        document.querySelectorAll(".nav-links a");

    const updateActiveNav = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       HERO IMAGE MOUSE MOVEMENT
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (
        heroVisual &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        heroVisual.addEventListener("mousemove", event => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            const imageRing =
                heroVisual.querySelector(".image-ring");

            if (imageRing) {

                imageRing.style.transform =
                    `translate(${x * 10}px, ${y * 10}px)`;

            }

        });


        heroVisual.addEventListener("mouseleave", () => {

            const imageRing =
                heroVisual.querySelector(".image-ring");

            if (imageRing) {

                imageRing.style.transform =
                    "translate(0, 0)";

            }

        });

    }


    /* =====================================================
       DYNAMIC FOOTER YEAR
    ===================================================== */

    const copyright =
        document.querySelector(".copyright");

    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} Mahalakshmi Kommaranahalli. All rights reserved.`;

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const navbar =
                    document.querySelector(".navbar");

                const offset =
                    navbar ? navbar.offsetHeight : 0;

                const position =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }

        });

    });


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "✨ Mahalakshmi Kommaranahalli Portfolio loaded successfully."
    );

});
