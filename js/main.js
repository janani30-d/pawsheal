
/* =========================================================
   PAWSHEAL - MAIN JAVASCRIPT
   DARK MODE + MOBILE MENU + DROPDOWN + RTL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const root = document.documentElement;

    /* =====================================================
       1. DARK MODE
    ===================================================== */

    const themeToggle = document.getElementById("pawThemeToggle");
    const themeIcon = themeToggle?.querySelector("i");

    function updateThemeIcon() {

        if (!themeIcon) return;

        const isDark = root.classList.contains("dark-mode");

        themeIcon.classList.toggle("fa-sun", isDark);
        themeIcon.classList.toggle("fa-moon", !isDark);

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }

    const savedTheme = localStorage.getItem("pawsheal-theme");

    root.classList.toggle("dark-mode", savedTheme === "dark");

    updateThemeIcon();

    themeToggle?.addEventListener("click", function () {

        root.classList.toggle("dark-mode");

        const isDark = root.classList.contains("dark-mode");

        localStorage.setItem(
            "pawsheal-theme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();

    });


    /* =====================================================
       2. MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("pawMenuToggle");
    const navigation = document.getElementById("pawHeaderNavigation");

    function openMenu() {

        if (!menuToggle || !navigation) return;

        navigation.classList.add("active");
        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");

        document.body.classList.add("paw-menu-open");

    }

    function closeMenu() {

        if (!menuToggle || !navigation) return;

        navigation.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        document.body.classList.remove("paw-menu-open");

    }

    menuToggle?.addEventListener("click", function (event) {

        event.stopPropagation();

        if (navigation.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* =====================================================
       3. HOME DROPDOWN
    ===================================================== */

    const homeDropdown = document.querySelector(".paw-home-dropdown");
    const homeDropdownLink = homeDropdown?.querySelector(".paw-nav-link");

    homeDropdownLink?.addEventListener("click", function (event) {

        if (window.innerWidth <= 1024) {

            event.preventDefault();

            event.stopPropagation();

            homeDropdown.classList.toggle("dropdown-open");

            const isOpen = homeDropdown.classList.contains("dropdown-open");

            homeDropdownLink.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }

    });


    /* =====================================================
       4. NAVIGATION LINK CLICK
    ===================================================== */

    navigation?.querySelectorAll(
        ".paw-nav-item:not(.paw-home-dropdown) .paw-nav-link, .paw-dropdown-menu a, .paw-header-actions a"
    ).forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 1024) {

                closeMenu();

                homeDropdown?.classList.remove("dropdown-open");

                homeDropdownLink?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /* =====================================================
       5. OUTSIDE CLICK
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (
            window.innerWidth <= 1024 &&
            navigation?.classList.contains("active") &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            closeMenu();

            homeDropdown?.classList.remove("dropdown-open");

            homeDropdownLink?.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       6. ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeMenu();

            homeDropdown?.classList.remove("dropdown-open");

            homeDropdownLink?.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       7. RESPONSIVE RESET
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 1024) {

            closeMenu();

            homeDropdown?.classList.remove("dropdown-open");

            homeDropdownLink?.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       8. RTL MODE
    ===================================================== */

    const rtlToggle = document.getElementById("pawRtlToggle");

    function updateRTL() {

        const isRTL = root.getAttribute("dir") === "rtl";

        if (!rtlToggle) return;

        rtlToggle.setAttribute(
            "aria-label",
            isRTL ? "Switch to LTR" : "Switch to RTL"
        );

        rtlToggle.classList.toggle("rtl-active", isRTL);

    }

    const savedDirection = localStorage.getItem("pawsheal-direction");

    root.setAttribute(
        "dir",
        savedDirection === "rtl" ? "rtl" : "ltr"
    );

    updateRTL();

    rtlToggle?.addEventListener("click", function () {

        const currentDirection = root.getAttribute("dir");

        const newDirection =
            currentDirection === "rtl" ? "ltr" : "rtl";

        root.setAttribute("dir", newDirection);

        localStorage.setItem(
            "pawsheal-direction",
            newDirection
        );

        updateRTL();

    });

});
















/* ==========================================
   HOME 2 - PET CARE SELECTOR
========================================== */

(function () {

    function initHome2PetFinder() {

        const petFinder = document.querySelector(
            '.paw-home2-petfinder'
        );

        if (!petFinder || petFinder.dataset.initialized === 'true') {
            return;
        }

        petFinder.dataset.initialized = 'true';

        const petOptions = petFinder.querySelectorAll(
            '.paw-home2-pet-option'
        );

        const selectedImage = petFinder.querySelector(
            '.paw-home2-selected-pet-image img'
        );

        const detailsHeading = petFinder.querySelector(
            '.paw-home2-pet-details-heading h4'
        );

        const detailsDescription = petFinder.querySelector(
            '.paw-home2-pet-details-heading p'
        );

        const benefitsList = petFinder.querySelector(
            '.paw-home2-pet-benefits'
        );

        const exploreButton = petFinder.querySelector(
            '.paw-home2-pet-explore-btn'
        );

        if (
            !selectedImage ||
            !detailsHeading ||
            !detailsDescription ||
            !benefitsList ||
            !exploreButton
        ) {
            return;
        }

        const petData = {

            dog: {
                name: 'Dog Care',
                image: 'images/home2-dog.jpg',
                description: 'Complete health, nutrition and lifestyle care for your loyal companion.',
                alt: 'Dog care',
                benefits: [
                    'Routine Health Checks',
                    'Vaccination & Prevention',
                    'Nutrition Guidance',
                    'Behavior & Wellness Support'
                ],
                button: 'Explore Dog Care',
                link: 'pet-care.html'
            },

            cat: {
                name: 'Cat Care',
                image: 'images/home2-cat.jpg',
                description: 'Gentle and specialized healthcare to keep your feline friend healthy and comfortable.',
                alt: 'Cat care',
                benefits: [
                    'Feline Health Checkups',
                    'Cat Vaccination Plans',
                    'Nutrition & Diet Guidance',
                    'Dental & Coat Care'
                ],
                button: 'Explore Cat Care',
                link: 'pet-care.html'
            },

            puppy: {
                name: 'Puppy Care',
                image: 'images/home2-puppy.jpg',
                description: 'Give your growing puppy the healthiest start with expert preventive care and guidance.',
                alt: 'Puppy care',
                benefits: [
                    'First Health Checkup',
                    'Puppy Vaccination Schedule',
                    'Growth & Nutrition Support',
                    'Early Training Guidance'
                ],
                button: 'Explore Puppy Care',
                link: 'pet-care.html'
            },

            kitten: {
                name: 'Kitten Care',
                image: 'images/home2-kitten.jpg',
                description: 'Special care for little kittens with essential health checks and early-life wellness support.',
                alt: 'Kitten care',
                benefits: [
                    'Kitten Health Checkups',
                    'Essential First Vaccines',
                    'Feeding & Nutrition Advice',
                    'Growth & Development Care'
                ],
                button: 'Explore Kitten Care',
                link: 'pet-care.html'
            }

        };


        function updatePetDetails(petType) {

            const pet = petData[petType];

            if (!pet) return;

            /* Update active pet option */

            petOptions.forEach(function (option) {

                const isActive = option.dataset.pet === petType;

                option.classList.toggle('active', isActive);

                option.setAttribute(
                    'aria-pressed',
                    isActive ? 'true' : 'false'
                );

            });


            /* Update selected pet image */

            selectedImage.src = pet.image;
            selectedImage.alt = pet.alt;


            /* Update pet information */

            detailsHeading.textContent = pet.name;

            detailsDescription.textContent = pet.description;


            /* Update benefits */

            benefitsList.replaceChildren();

            pet.benefits.forEach(function (benefit) {

                const listItem = document.createElement('li');

                const icon = document.createElement('i');

                icon.className = 'fa-solid fa-circle-check';
                icon.setAttribute('aria-hidden', 'true');

                listItem.appendChild(icon);
                listItem.appendChild(
                    document.createTextNode(benefit)
                );

                benefitsList.appendChild(listItem);

            });


            /* Update explore button */

            exploreButton.innerHTML =
                pet.button + ' <i class="fa-solid fa-arrow-right"></i>';

            exploreButton.href = pet.link;

        }


        /* Pet option click events */

        petOptions.forEach(function (option) {

            option.addEventListener('click', function () {

                const selectedPet = this.dataset.pet;

                updatePetDetails(selectedPet);

            });

        });


        /* Default selection */

        updatePetDetails('dog');

    }


    if (document.readyState === 'loading') {

        document.addEventListener(
            'DOMContentLoaded',
            initHome2PetFinder,
            { once: true }
        );

    } else {

        initHome2PetFinder();

    }

})();














/* =========================================
   PAWSHEAL LOGIN PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const htmlElement = document.documentElement;


    /* =====================================
       DARK MODE ELEMENTS
    ====================================== */

    const themeToggle = document.getElementById("pawLoginThemeToggle");

    const themeIcon = themeToggle
        ? themeToggle.querySelector("i")
        : null;


    /* =====================================
       RTL ELEMENTS
    ====================================== */

    const rtlToggle = document.getElementById("pawLoginRtlToggle");


    /* =====================================
       PASSWORD ELEMENTS
    ====================================== */

    const passwordInput = document.getElementById("pawLoginPassword");

    const passwordToggle = document.getElementById("pawLoginPasswordToggle");

    const passwordIcon = passwordToggle
        ? passwordToggle.querySelector("i")
        : null;


    /* =====================================
       APPLY SAVED THEME
    ====================================== */

    function applyTheme(theme) {

        if (theme === "dark") {

            htmlElement.classList.add("dark-mode");

            if (themeIcon) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }

            if (themeToggle) {
                themeToggle.setAttribute("title", "Light Mode");
                themeToggle.setAttribute("aria-label", "Switch to light mode");
            }

        } else {

            htmlElement.classList.remove("dark-mode");

            if (themeIcon) {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }

            if (themeToggle) {
                themeToggle.setAttribute("title", "Dark Mode");
                themeToggle.setAttribute("aria-label", "Switch to dark mode");
            }

        }

    }


    /* =====================================
       INITIAL THEME
    ====================================== */

    const savedTheme = localStorage.getItem("pawsheal-theme") || "light";

    applyTheme(savedTheme);


    /* =====================================
       DARK MODE TOGGLE
    ====================================== */

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const isDark = htmlElement.classList.contains("dark-mode");

            const newTheme = isDark ? "light" : "dark";

            localStorage.setItem("pawsheal-theme", newTheme);

            applyTheme(newTheme);

        });

    }


    /* =====================================
       APPLY SAVED RTL / LTR DIRECTION
    ====================================== */

    function applyDirection(direction) {

        htmlElement.setAttribute("dir", direction);

        htmlElement.setAttribute("lang", direction === "rtl" ? "ar" : "en");

        if (rtlToggle) {

            if (direction === "rtl") {
                rtlToggle.classList.add("active");
                rtlToggle.setAttribute("title", "Switch to LTR");
                rtlToggle.setAttribute("aria-label", "Switch to left-to-right");
            } else {
                rtlToggle.classList.remove("active");
                rtlToggle.setAttribute("title", "Switch to RTL");
                rtlToggle.setAttribute("aria-label", "Switch to right-to-left");
            }

        }

    }


    /* =====================================
       INITIAL DIRECTION
    ====================================== */

    const savedDirection = localStorage.getItem("pawsheal-direction") || "ltr";

    applyDirection(savedDirection);


    /* =====================================
       RTL TOGGLE
    ====================================== */

    if (rtlToggle) {

        rtlToggle.addEventListener("click", function () {

            const currentDirection = htmlElement.getAttribute("dir");

            const newDirection = currentDirection === "rtl" ? "ltr" : "rtl";

            localStorage.setItem("pawsheal-direction", newDirection);

            applyDirection(newDirection);

        });

    }


    /* =====================================
       PASSWORD SHOW / HIDE
    ====================================== */

    if (passwordToggle && passwordInput && passwordIcon) {

        passwordToggle.addEventListener("click", function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                passwordIcon.classList.remove("fa-eye");
                passwordIcon.classList.add("fa-eye-slash");

                passwordToggle.setAttribute("aria-label", "Hide password");

            } else {

                passwordInput.type = "password";

                passwordIcon.classList.remove("fa-eye-slash");
                passwordIcon.classList.add("fa-eye");

                passwordToggle.setAttribute("aria-label", "Show password");

            }

        });

    }


    /* =====================================
       LOGIN FORM
    ====================================== */

    const loginForm = document.getElementById("pawLoginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }

            alert("Login form is ready. Connect your authentication backend to enable actual login.");

        });

    }

});
















/* =========================================
   PAWSHEAL REGISTER PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const htmlElement = document.documentElement;


    /* =====================================
       DARK MODE ELEMENTS
    ====================================== */

    const themeToggle = document.getElementById("pawRegisterThemeToggle");

    const themeIcon = themeToggle
        ? themeToggle.querySelector("i")
        : null;


    /* =====================================
       RTL ELEMENTS
    ====================================== */

    const rtlToggle = document.getElementById("pawRegisterRtlToggle");


    /* =====================================
       APPLY DARK / LIGHT THEME
    ====================================== */

    function applyTheme(theme) {

        if (theme === "dark") {

            htmlElement.classList.add("dark-mode");

            if (themeIcon) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }

            if (themeToggle) {
                themeToggle.setAttribute("title", "Light Mode");
                themeToggle.setAttribute("aria-label", "Switch to light mode");
            }

        } else {

            htmlElement.classList.remove("dark-mode");

            if (themeIcon) {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }

            if (themeToggle) {
                themeToggle.setAttribute("title", "Dark Mode");
                themeToggle.setAttribute("aria-label", "Switch to dark mode");
            }

        }

    }


    /* =====================================
       INITIAL THEME
    ====================================== */

    const savedTheme = localStorage.getItem("pawsheal-theme") || "light";

    applyTheme(savedTheme);


    /* =====================================
       DARK MODE TOGGLE
    ====================================== */

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const isDark = htmlElement.classList.contains("dark-mode");

            const newTheme = isDark ? "light" : "dark";

            localStorage.setItem("pawsheal-theme", newTheme);

            applyTheme(newTheme);

        });

    }


    /* =====================================
       APPLY RTL / LTR DIRECTION
    ====================================== */

    function applyDirection(direction) {

        htmlElement.setAttribute("dir", direction);

        htmlElement.setAttribute("lang", direction === "rtl" ? "ar" : "en");

        if (rtlToggle) {

            if (direction === "rtl") {

                rtlToggle.classList.add("active");
                rtlToggle.setAttribute("title", "Switch to LTR");
                rtlToggle.setAttribute("aria-label", "Switch to left-to-right");

            } else {

                rtlToggle.classList.remove("active");
                rtlToggle.setAttribute("title", "Switch to RTL");
                rtlToggle.setAttribute("aria-label", "Switch to right-to-left");

            }

        }

    }


    /* =====================================
       INITIAL DIRECTION
    ====================================== */

    const savedDirection = localStorage.getItem("pawsheal-direction") || "ltr";

    applyDirection(savedDirection);


    /* =====================================
       RTL TOGGLE
    ====================================== */

    if (rtlToggle) {

        rtlToggle.addEventListener("click", function () {

            const currentDirection = htmlElement.getAttribute("dir");

            const newDirection = currentDirection === "rtl" ? "ltr" : "rtl";

            localStorage.setItem("pawsheal-direction", newDirection);

            applyDirection(newDirection);

        });

    }


    /* =====================================
       PASSWORD SHOW / HIDE FUNCTION
    ====================================== */

    function setupPasswordToggle(inputId, toggleId) {

        const passwordInput = document.getElementById(inputId);

        const passwordToggle = document.getElementById(toggleId);

        if (!passwordInput || !passwordToggle) {
            return;
        }

        const passwordIcon = passwordToggle.querySelector("i");

        passwordToggle.addEventListener("click", function () {

            const isPassword = passwordInput.type === "password";

            passwordInput.type = isPassword ? "text" : "password";

            if (passwordIcon) {

                passwordIcon.classList.toggle("fa-eye", !isPassword);
                passwordIcon.classList.toggle("fa-eye-slash", isPassword);

            }

            passwordToggle.setAttribute(
                "aria-label",
                isPassword ? "Hide password" : "Show password"
            );

        });

    }


    /* =====================================
       PASSWORD TOGGLES
    ====================================== */

    setupPasswordToggle(
        "pawRegisterPassword",
        "pawRegisterPasswordToggle"
    );

    setupPasswordToggle(
        "pawRegisterConfirmPassword",
        "pawRegisterConfirmToggle"
    );


    /* =====================================
       REGISTER FORM VALIDATION
    ====================================== */

    const registerForm = document.getElementById("pawRegisterForm");

    const passwordInput = document.getElementById("pawRegisterPassword");

    const confirmPasswordInput = document.getElementById("pawRegisterConfirmPassword");

    const termsCheckbox = document.getElementById("pawRegisterTerms");


    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();


            /* BROWSER VALIDATION */

            if (!registerForm.checkValidity()) {

                registerForm.reportValidity();

                return;

            }


            /* PASSWORD MATCH VALIDATION */

            if (passwordInput.value !== confirmPasswordInput.value) {

                confirmPasswordInput.setCustomValidity(
                    "Passwords do not match."
                );

                confirmPasswordInput.reportValidity();

                confirmPasswordInput.setCustomValidity("");

                confirmPasswordInput.focus();

                return;

            }


            /* PASSWORD LENGTH VALIDATION */

            if (passwordInput.value.length < 8) {

                passwordInput.setCustomValidity(
                    "Password must contain at least 8 characters."
                );

                passwordInput.reportValidity();

                passwordInput.setCustomValidity("");

                passwordInput.focus();

                return;

            }


            /* TERMS VALIDATION */

            if (!termsCheckbox.checked) {

                termsCheckbox.focus();

                alert("Please accept the Terms & Conditions to continue.");

                return;

            }


            /* FRONTEND SUCCESS MESSAGE */

            alert(
                "Registration form validated successfully! Connect your backend to create the actual account."
            );

        });

    }

});




const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});