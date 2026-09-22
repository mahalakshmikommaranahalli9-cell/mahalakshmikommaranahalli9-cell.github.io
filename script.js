/* =========================================================
   MAHALAKSHMI PORTFOLIO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            if (navMenu.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =====================================================
       DARK MODE
    ===================================================== */

    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {

        const savedTheme = localStorage.getItem("maha-theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark");
        }

        updateThemeIcon();

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            localStorage.setItem(
                "maha-theme",
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light"
            );

            updateThemeIcon();

        });
    }


    function updateThemeIcon() {

        if (!themeBtn) return;

        const icon = themeBtn.querySelector("i");

        if (document.body.classList.contains("dark")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navLinks = document.querySelectorAll(".nav-link");

    const sectionElements = document.querySelectorAll(
        "main section[id]"
    );

    window.addEventListener("scroll", () => {

        let current = "home";

        sectionElements.forEach(section => {

            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                current = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }

        });

    });


    /* =====================================================
       SMOOTH BUTTON EFFECT
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       MOUSE PARALLAX FOR DESKTOP
    ===================================================== */

    const imageArea = document.querySelector(".hero-image-area");

    if (imageArea && window.innerWidth > 950) {

        imageArea.addEventListener("mousemove", event => {

            const rect = imageArea.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            imageArea.style.transform =
                `translate(${x * 8}px, ${y * 8}px)`;

        });

        imageArea.addEventListener("mouseleave", () => {

            imageArea.style.transform = "translate(0,0)";

        });

    }


    /* =====================================================
       IMAGE ERROR FALLBACK
    ===================================================== */

    const profile = document.querySelector(".profile-image img");

    if (profile) {

        profile.addEventListener("error", () => {

            profile.style.display = "none";

            profile.parentElement.style.background =
                "linear-gradient(135deg,#6c35ff,#168cff,#ef3fa9)";

        });

    }

});
