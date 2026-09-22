document.addEventListener("DOMContentLoaded", function () {

    /* ================= LOADER ================= */

    const loader = document.getElementById("loader");

    setTimeout(function () {

        if (loader) {
            loader.classList.add("hide");
        }

    }, 1000);


    /* ================= MOBILE MENU ================= */

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", function () {

            navLinks.classList.toggle("open");

            const icon = menuButton.querySelector("i");

            if (navLinks.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

                const icon = menuButton.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* ================= THEME ================= */

    const themeButton = document.getElementById("themeButton");

    if (themeButton) {

        const icon = themeButton.querySelector("i");

        const savedTheme = localStorage.getItem("maha-theme");

        if (savedTheme === "light") {

            document.body.classList.add("light");

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        }


        themeButton.addEventListener("click", function () {

            document.body.classList.toggle("light");

            const isLight =
                document.body.classList.contains("light");

            localStorage.setItem(
                "maha-theme",
                isLight ? "light" : "dark"
            );

            if (isLight) {

                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");

            } else {

                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");

            }

        });

    }


    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    /* ================= COPYRIGHT ================= */

    const copyright =
        document.getElementById("copyright");

    if (copyright) {

        copyright.textContent =
            "© " +
            new Date().getFullYear() +
            " Mahalakshmi Kommaranahalli. All rights reserved.";

    }


    console.log(
        "Mahalakshmi Portfolio loaded successfully."
    );

});
