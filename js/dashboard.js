
/* ==========================================
   PAWSHEAL - SHARED THEME & RTL PREFERENCES
   Used by Main Pages, Login, Register & Dashboard
========================================== */

(function () {
    "use strict";

    const THEME_KEY = "pawsheal-theme";
    const DIRECTION_KEY = "pawsheal-direction";

    const root = document.documentElement;

    // Apply saved theme
    function applyTheme(theme) {
        const isDark = theme === "dark";

        root.classList.toggle("dark-mode", isDark);

        const themeButtons = document.querySelectorAll(
            "#pawDashboardThemeToggle, #pawLoginThemeToggle, #pawRegisterThemeToggle, #themeToggle"
        );

        themeButtons.forEach(button => {
            const icon = button.querySelector("i");

            if (icon) {
                icon.className = isDark
                    ? "fas fa-sun"
                    : "fas fa-moon";
            }

            button.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        });
    }

    // Apply saved direction
    function applyDirection(direction) {
        const isRTL = direction === "rtl";

        root.setAttribute("dir", isRTL ? "rtl" : "ltr");

        const directionButtons = document.querySelectorAll(
            "#pawDashboardRtlToggle, #pawLoginRtlToggle, #pawRegisterRtlToggle, #rtlToggle"
        );

        directionButtons.forEach(button => {
            button.setAttribute(
                "aria-label",
                isRTL ? "Switch to left-to-right" : "Switch to right-to-left"
            );
        });
    }

    // Load saved preferences
    const savedTheme = localStorage.getItem(THEME_KEY) || "light";
    const savedDirection = localStorage.getItem(DIRECTION_KEY) || "ltr";

    applyTheme(savedTheme);
    applyDirection(savedDirection);

    // Theme toggle
    document.addEventListener("click", function (event) {
        const button = event.target.closest(
            "#pawDashboardThemeToggle, #pawLoginThemeToggle, #pawRegisterThemeToggle, #themeToggle"
        );

        if (!button) return;

        const currentTheme =
            localStorage.getItem(THEME_KEY) || "light";

        const newTheme =
            currentTheme === "dark" ? "light" : "dark";

        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
    });

    // RTL toggle
    document.addEventListener("click", function (event) {
        const button = event.target.closest(
            "#pawDashboardRtlToggle, #pawLoginRtlToggle, #pawRegisterRtlToggle, #rtlToggle"
        );

        if (!button) return;

        const currentDirection =
            localStorage.getItem(DIRECTION_KEY) || "ltr";

        const newDirection =
            currentDirection === "rtl" ? "ltr" : "rtl";

        localStorage.setItem(DIRECTION_KEY, newDirection);
        applyDirection(newDirection);
    });

    // Sync preferences across browser tabs
    window.addEventListener("storage", function (event) {
        if (event.key === THEME_KEY) {
            applyTheme(event.newValue || "light");
        }

        if (event.key === DIRECTION_KEY) {
            applyDirection(event.newValue || "ltr");
        }
    });

    // Expose shared preference functions
    window.PawsHealPreferences = {
        applyTheme,
        applyDirection
    };

})();







/* ==========================================
   PAWSHEAL DASHBOARD - JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       SIDEBAR MENU TOGGLE
    ====================================== */

    const sidebar = document.getElementById("pawDashboardSidebar");
    const menuToggle = document.getElementById("pawDashboardMenuToggle");
    const overlay = document.getElementById("pawDashboardOverlay");

    function openSidebar() {
        if (!sidebar || !overlay) return;

        sidebar.classList.add("active");
        overlay.classList.add("active");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "true");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = "fas fa-times";
            }
        }

        document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
        if (!sidebar || !overlay) return;

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = "fas fa-bars";
            }
        }

        document.body.style.overflow = "";
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {

            const isOpen = sidebar.classList.contains("active");

            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }

        });
    }

    // Close sidebar on overlay click
    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    // Close sidebar after selecting a menu item
    if (sidebar) {
        sidebar.querySelectorAll(".paw-sidebar-item a").forEach(link => {
            link.addEventListener("click", function () {
                if (window.innerWidth <= 1024) {
                    closeSidebar();
                }
            });
        });
    }

    // Close sidebar when resizing to desktop
    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024) {
            closeSidebar();
        }
    });


    /* ======================================
       LOGOUT CONFIRMATION MODAL
    ====================================== */

    const logoutButton = document.getElementById("pawLogoutButton");
    const logoutModal = document.getElementById("pawLogoutModal");
    const logoutOverlay = document.getElementById("pawLogoutModalOverlay");
    const logoutCancel = document.getElementById("pawLogoutCancel");
    const logoutConfirm = document.getElementById("pawLogoutConfirm");

    function openLogoutModal() {
        if (!logoutModal) return;

        logoutModal.classList.add("active");
        document.body.style.overflow = "hidden";

        if (logoutCancel) {
            logoutCancel.focus();
        }
    }

    function closeLogoutModal() {
        if (!logoutModal) return;

        logoutModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Open confirmation popup
    if (logoutButton) {
        logoutButton.addEventListener("click", openLogoutModal);
    }

    // No - Stay on dashboard
    if (logoutCancel) {
        logoutCancel.addEventListener("click", closeLogoutModal);
    }

    // Click outside popup
    if (logoutOverlay) {
        logoutOverlay.addEventListener("click", closeLogoutModal);
    }

    // Yes - Redirect to login
    if (logoutConfirm) {
        logoutConfirm.addEventListener("click", function () {
            window.location.href = "login.html";
        });
    }


    /* ======================================
       ESCAPE KEY HANDLING
    ====================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeSidebar();
            closeLogoutModal();
        }

    });

});















/* ==========================================
   PAWSHEAL - MY PETS PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const myPetsPage = document.querySelector(".paw-mypets-page");

    if (!myPetsPage) return;


    /* ==========================================
       PET DATA
    ========================================== */

    let pets = [
        {
            id: 1,
            name: "Buddy",
            breed: "Golden Retriever",
            type: "Dog",
            age: "3 Years",
            gender: "Male",
            weight: "24.5",
            lastCheckup: "Nov 12, 2026",
            nextCheckup: "Dec 12, 2026",
            health: "Healthy",
            image: "images/my-pets-buddy.jpg"
        },
        {
            id: 2,
            name: "Luna",
            breed: "Domestic Cat",
            type: "Cat",
            age: "2 Years",
            gender: "Female",
            weight: "4.2",
            lastCheckup: "Nov 08, 2026",
            nextCheckup: "Dec 08, 2026",
            health: "Healthy",
            image: "images/my-pets-luna.jpg"
        }
    ];

    let selectedPetId = 1;
    let nextPetId = 3;


    /* ==========================================
       ELEMENT REFERENCES
    ========================================== */

    const petList = myPetsPage.querySelector(".paw-mypets-list");
    const petSearch = document.getElementById("pawPetSearch");

    const selectedPetName = document.getElementById("pawSelectedPetName");
    const selectedPetBreed = document.getElementById("pawSelectedPetBreed");
    const selectedPetAge = document.getElementById("pawSelectedPetAge");
    const selectedPetWeight = document.getElementById("pawSelectedPetWeight");

    const profileImage = myPetsPage.querySelector(
        ".paw-mypets-profile-image img"
    );

    const lastCheckup = myPetsPage.querySelector(
        ".paw-mypets-info-item:nth-child(3) strong"
    );

    const nextCheckup = myPetsPage.querySelector(
        ".paw-mypets-info-item:nth-child(4) strong"
    );

    const petCount = myPetsPage.querySelector(".paw-mypets-count strong");
    const petTotal = myPetsPage.querySelector(".paw-mypets-total");

    const addPetForm = document.getElementById("pawNewPetForm");
    const petPhotoInput = document.getElementById("pawPetPhoto");


    /* ==========================================
       HELPER FUNCTIONS
    ========================================== */

    function getSelectedPet() {
        return pets.find(function (pet) {
            return pet.id === selectedPetId;
        });
    }

    function calculateAge(dateOfBirth) {

        if (!dateOfBirth) return "Not specified";

        const birthDate = new Date(dateOfBirth + "T00:00:00");
        const today = new Date();

        if (Number.isNaN(birthDate.getTime()) || birthDate > today) {
            return "Not specified";
        }

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();

        if (today.getDate() < birthDate.getDate()) {
            months--;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years > 0) {
            return years + (years === 1 ? " Year" : " Years");
        }

        return months + (months === 1 ? " Month" : " Months");
    }

    function updatePetCount() {
        const count = String(pets.length).padStart(2, "0");

        if (petCount) petCount.textContent = count;

        if (petTotal) {
            petTotal.textContent = count + " Pets";
        }
    }


    /* ==========================================
       RENDER PET LIST
    ========================================== */

    function renderPetList(searchValue = "") {

        if (!petList) return;

        petList.innerHTML = "";

        const filteredPets = pets.filter(function (pet) {

            const searchText = searchValue.toLowerCase();

            return (
                pet.name.toLowerCase().includes(searchText) ||
                pet.breed.toLowerCase().includes(searchText) ||
                pet.type.toLowerCase().includes(searchText)
            );
        });

        if (filteredPets.length === 0) {

            const emptyMessage = document.createElement("p");

            emptyMessage.textContent = "No pets found.";
            emptyMessage.className = "paw-mypets-no-results";

            petList.appendChild(emptyMessage);

            return;
        }

        filteredPets.forEach(function (pet) {

            const card = document.createElement("button");

            card.type = "button";

            card.className = "paw-mypets-list-card";

            if (pet.id === selectedPetId) {
                card.classList.add("active");
            }

            card.dataset.pet = pet.id;

            const image = document.createElement("img");

            image.src = pet.image;
            image.alt = pet.name;

            const info = document.createElement("span");

            info.className = "paw-mypets-list-info";

            const name = document.createElement("strong");
            name.textContent = pet.name;

            const breed = document.createElement("small");
            breed.textContent = pet.breed;

            const details = document.createElement("small");
            details.textContent = pet.age + " · " + pet.gender;

            info.append(name, breed, details);

            const arrow = document.createElement("i");

            arrow.className = "fas fa-chevron-right";

            card.append(image, info, arrow);

            card.addEventListener("click", function () {

                selectedPetId = pet.id;

                renderPetList(petSearch ? petSearch.value : "");

                renderPetProfile();
            });

            petList.appendChild(card);
        });
    }


    /* ==========================================
       DISPLAY SELECTED PET PROFILE
    ========================================== */

    function renderPetProfile() {

        const pet = getSelectedPet();

        if (!pet) return;

        if (selectedPetName) {
            selectedPetName.textContent = pet.name;
        }

        if (selectedPetBreed) {
            selectedPetBreed.textContent = pet.breed;
        }

        if (selectedPetAge) {
            selectedPetAge.textContent = pet.age;
        }

        if (selectedPetWeight) {
            selectedPetWeight.textContent = pet.weight
                ? pet.weight + " kg"
                : "Not specified";
        }

        if (profileImage) {
            profileImage.src = pet.image;
            profileImage.alt = pet.name;
        }

        if (lastCheckup) {
            lastCheckup.textContent = pet.lastCheckup;
        }

        if (nextCheckup) {
            nextCheckup.textContent = pet.nextCheckup;
        }

        const healthStatus = myPetsPage.querySelector(
            ".paw-mypets-health-status"
        );

        if (healthStatus) {
            healthStatus.innerHTML =
                '<i class="fas fa-heart"></i> ' + pet.health;
        }

        updatePetCount();

        updateHealthOverview(pet);
    }


    /* ==========================================
       UPDATE HEALTH OVERVIEW
    ========================================== */

    function updateHealthOverview(pet) {

        const metrics = myPetsPage.querySelectorAll(
            ".paw-mypets-metric"
        );

        if (metrics.length >= 4) {

            const weightValue = metrics[0].querySelector("strong");
            const checkupValue = metrics[2].querySelector("strong");
            const nextValue = metrics[3].querySelector("strong");

            if (weightValue) {
                weightValue.textContent = pet.weight
                    ? pet.weight + " kg"
                    : "Not specified";
            }

            if (checkupValue) {
                checkupValue.textContent = pet.lastCheckup;
            }

            if (nextValue) {
                nextValue.textContent = pet.nextCheckup;
            }
        }
    }


    /* ==========================================
       PET SEARCH
    ========================================== */

    if (petSearch) {

        petSearch.addEventListener("input", function () {

            renderPetList(this.value);
        });
    }


    /* ==========================================
       ADD NEW PET
    ========================================== */

    if (addPetForm) {

        addPetForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("pawPetName").value.trim();
            const type = document.getElementById("pawPetType").value;
            const breed = document.getElementById("pawPetBreed").value.trim();
            const dob = document.getElementById("pawPetDob").value;
            const gender = document.getElementById("pawPetGender").value;
            const weight = document.getElementById("pawPetWeight").value;

            if (!name || !type || !gender) {
                alert("Please fill in all required fields.");
                return;
            }

            const photoFile = petPhotoInput.files[0];

            function createPet(photoURL) {

                const newPet = {
                    id: nextPetId++,
                    name: name,
                    breed: breed || type,
                    type: type,
                    age: calculateAge(dob),
                    gender: gender,
                    weight: weight || "",
                    lastCheckup: "Not available",
                    nextCheckup: "Not scheduled",
                    health: "New Profile",
                    image: photoURL || "images/my-pets-buddy.jpg"
                };

                pets.push(newPet);

                selectedPetId = newPet.id;

                addPetForm.reset();

                renderPetList();

                renderPetProfile();

                resetPetTabs();

                alert(name + "'s profile has been added successfully!");

                document.querySelector(".paw-mypets-workspace")
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
            }

            if (photoFile) {

                const reader = new FileReader();

                reader.onload = function (e) {
                    createPet(e.target.result);
                };

                reader.onerror = function () {
                    alert("Unable to read the selected image.");
                };

                reader.readAsDataURL(photoFile);

            } else {

                createPet("");
            }
        });
    }


    /* ==========================================
       RESET TABS TO OVERVIEW
    ========================================== */

    function resetPetTabs() {

        const tabs = myPetsPage.querySelectorAll(".paw-mypets-tab");

        const contents = myPetsPage.querySelectorAll(
            ".paw-mypets-tab-content"
        );

        tabs.forEach(function (tab) {
            tab.classList.remove("active");
        });

        contents.forEach(function (content) {
            content.classList.remove("active");
        });

        const overviewTab = myPetsPage.querySelector(
            '.paw-mypets-tab[data-tab="overview"]'
        );

        const overviewContent = document.getElementById("pawPetOverview");

        if (overviewTab) overviewTab.classList.add("active");

        if (overviewContent) overviewContent.classList.add("active");
    }


    /* ==========================================
       PROFILE TABS
    ========================================== */

    const petTabs = myPetsPage.querySelectorAll(".paw-mypets-tab");

    const tabContentMap = {
        overview: "pawPetOverview",
        medical: "pawPetMedical",
        vaccinations: "pawPetVaccinations",
        prescriptions: "pawPetPrescriptions",
        documents: "pawPetDocuments"
    };

    petTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const tabName = this.dataset.tab;

            petTabs.forEach(function (item) {
                item.classList.remove("active");
            });

            myPetsPage.querySelectorAll(
                ".paw-mypets-tab-content"
            ).forEach(function (content) {
                content.classList.remove("active");
            });

            this.classList.add("active");

            const targetId = tabContentMap[tabName];

            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });


    /* ==========================================
       EDIT PET
    ========================================== */

    const editPetButton = document.getElementById("pawEditPetButton");

    if (editPetButton) {

        editPetButton.addEventListener("click", function () {

            const pet = getSelectedPet();

            if (!pet) return;

            const newName = prompt("Enter pet name:", pet.name);

            if (newName === null) return;

            if (!newName.trim()) {
                alert("Pet name cannot be empty.");
                return;
            }

            const newBreed = prompt("Enter breed:", pet.breed);

            if (newBreed === null) return;

            const newWeight = prompt("Enter weight in kg:", pet.weight);

            if (newWeight === null) return;

            if (newWeight.trim() !== "" && (
                !Number.isFinite(Number(newWeight)) ||
                Number(newWeight) <= 0
            )) {
                alert("Please enter a valid weight.");
                return;
            }

            pet.name = newName.trim();
            pet.breed = newBreed.trim() || pet.type;

            if (newWeight.trim() !== "") {
                pet.weight = newWeight.trim();
            }

            renderPetList(petSearch ? petSearch.value : "");

            renderPetProfile();

            alert("Pet profile updated successfully!");
        });
    }


    /* ==========================================
       DELETE PET
    ========================================== */

    const deletePetButton = document.getElementById("pawDeletePetButton");

    if (deletePetButton) {

        deletePetButton.addEventListener("click", function () {

            const pet = getSelectedPet();

            if (!pet) return;

            const confirmDelete = confirm(
                "Are you sure you want to delete " + pet.name + "'s profile?"
            );

            if (!confirmDelete) return;

            pets = pets.filter(function (item) {
                return item.id !== selectedPetId;
            });

            if (pets.length > 0) {

                selectedPetId = pets[0].id;

                renderPetList();

                renderPetProfile();

            } else {

                selectedPetId = null;

                renderPetList();

                selectedPetName.textContent = "No Pet Selected";
                selectedPetBreed.textContent = "Add a pet to get started";

                if (profileImage) {
                    profileImage.src = "images/my-pets-buddy.jpg";
                    profileImage.alt = "No pet selected";
                }

                if (selectedPetAge) selectedPetAge.textContent = "--";
                if (selectedPetWeight) selectedPetWeight.textContent = "--";

                if (lastCheckup) lastCheckup.textContent = "--";
                if (nextCheckup) nextCheckup.textContent = "--";

                const healthStatus = myPetsPage.querySelector(
                    ".paw-mypets-health-status"
                );

                if (healthStatus) {
                    healthStatus.textContent = "No Pet";
                }
            }

            updatePetCount();

            alert("Pet profile deleted successfully!");
        });
    }


    /* ==========================================
       UPDATE WEIGHT
    ========================================== */

    const updateWeightButton = document.getElementById(
        "pawUpdateWeightButton"
    );

    if (updateWeightButton) {

        updateWeightButton.addEventListener("click", function () {

            const pet = getSelectedPet();

            if (!pet) {
                alert("Please add or select a pet first.");
                return;
            }

            const newWeight = prompt(
                "Enter " + pet.name + "'s current weight (kg):",
                pet.weight
            );

            if (newWeight === null) return;

            if (
                newWeight.trim() === "" ||
                !Number.isFinite(Number(newWeight)) ||
                Number(newWeight) <= 0
            ) {
                alert("Please enter a valid weight.");
                return;
            }

            pet.weight = newWeight.trim();

            renderPetProfile();

            alert("Weight updated successfully!");
        });
    }


    /* ==========================================
       INITIALIZE PAGE
    ========================================== */

    renderPetList();

    renderPetProfile();

    updatePetCount();

});















/* =====================================================
   PAWSHEAL - PRESCRIPTIONS PAGE
   PART 4 - JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       1. PET DATA
    ================================================= */

    const petData = {
        Buddy: {
            breed: "Golden Retriever",
            image: "images/my-pets-buddy.jpg",
            progress: 71,
            completed: 5,
            active: 2,
            upcoming: 1
        },

        Luna: {
            breed: "Domestic Cat",
            image: "images/my-pets-luna.jpg",
            progress: 60,
            completed: 3,
            active: 2,
            upcoming: 1
        }
    };


    /* =================================================
       2. PRESCRIPTION DEMO DATA
    ================================================= */

    let prescriptions = [
        {
            id: 1,
            pet: "Buddy",
            title: "Skin Treatment",
            medicine: "Cetirizine 10 mg",
            dosage: "1 tablet",
            frequency: "Twice daily",
            duration: "7 days",
            date: "2026-08-15",
            vet: "Dr. Emily Carter",
            instructions: "Give after food. Ensure fresh water is always available.",
            notes: "Follow the veterinarian's instructions.",
            status: "Active"
        },
        {
            id: 2,
            pet: "Buddy",
            title: "General Health Care",
            medicine: "Sample medicine",
            dosage: "As prescribed",
            frequency: "As prescribed",
            duration: "5 days",
            date: "2026-09-10",
            vet: "Dr. Sarah Williams",
            instructions: "Follow the prescription provided by your veterinarian.",
            notes: "Demo record.",
            status: "Completed"
        },
        {
            id: 3,
            pet: "Luna",
            title: "General Checkup",
            medicine: "Sample medicine",
            dosage: "As prescribed",
            frequency: "As prescribed",
            duration: "5 days",
            date: "2026-10-05",
            vet: "Dr. Meera Iyer",
            instructions: "Follow the veterinarian's written instructions.",
            notes: "Demo record.",
            status: "Active"
        }
    ];

    let selectedPet = "Buddy";
    let selectedPrescriptionId = 1;
    let uploadedDocuments = [];
    let nextPrescriptionId = 4;


    /* =================================================
       3. ELEMENT REFERENCES
    ================================================= */

    const petSelect = document.getElementById("pawRxPetSelect");

    const selectedPetImage = document.getElementById("pawRxSelectedPetImage");
    const selectedPetName = document.getElementById("pawRxSelectedPetName");
    const selectedPetBreed = document.getElementById("pawRxSelectedPetBreed");

    const progressCircle = document.getElementById("pawRxProgressCircle");
    const progressPercentage = document.getElementById("pawRxProgressPercentage");
    const progressDescription = document.getElementById("pawRxProgressDescription");

    const activeCount = document.getElementById("pawRxActiveCount");
    const completedCount = document.getElementById("pawRxCompletedCount");
    const upcomingCount = document.getElementById("pawRxUpcomingCount");

    const prescriptionPetImage = document.getElementById("pawRxPrescriptionPetImage");
    const prescriptionTitle = document.getElementById("pawRxPrescriptionTitle");
    const prescriptionPet = document.getElementById("pawRxPrescriptionPet");
    const prescriptionVet = document.getElementById("pawRxVeterinarian");

    const detailStatus = document.getElementById("pawRxDetailStatus");
    const medicineName = document.getElementById("pawRxMedicineName");
    const dosage = document.getElementById("pawRxDosage");
    const frequency = document.getElementById("pawRxFrequency");
    const duration = document.getElementById("pawRxDuration");
    const instructions = document.getElementById("pawRxInstructions");

    const totalCount = document.getElementById("pawRxTotalCount");
    const activeMedicineCount = document.getElementById("pawRxActiveMedicineCount");
    const completedMedicineCount = document.getElementById("pawRxCompletedMedicineCount");
    const expiringCount = document.getElementById("pawRxExpiringCount");

    const modal = document.getElementById("pawRxModal");
    const modalTitle = document.getElementById("pawRxModalTitle");
    const form = document.getElementById("pawRxForm");

    const documentUpload = document.getElementById("pawRxDocumentUpload");
    const documentList = document.getElementById("pawRxDocumentList");


    /* =================================================
       4. HELPER FUNCTIONS
    ================================================= */

    function getElement(id) {
        return document.getElementById(id);
    }

    function formatDate(dateString) {

        if (!dateString) return "Date not available";

        const date = new Date(dateString + "T00:00:00");

        if (Number.isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    function getPetPrescriptions() {
        return prescriptions.filter(item => item.pet === selectedPet);
    }

    function getSelectedPrescription() {
        return prescriptions.find(
            item => item.id === selectedPrescriptionId
        );
    }


    /* =================================================
       5. PET SELECTOR
    ================================================= */

    function updatePetInformation() {

        const pet = petData[selectedPet];

        if (!pet) return;

        if (selectedPetName) {
            selectedPetName.textContent = selectedPet;
        }

        if (selectedPetBreed) {
            selectedPetBreed.textContent = pet.breed;
        }

        if (selectedPetImage) {
            selectedPetImage.src = pet.image;
            selectedPetImage.alt = selectedPet;
        }

        if (prescriptionPetImage) {
            prescriptionPetImage.src = pet.image;
            prescriptionPetImage.alt = selectedPet;
        }

        updateProgress();
        updatePrescriptionForPet();
        updateSummary();
    }


    if (petSelect) {

        petSelect.addEventListener("change", function () {

            selectedPet = this.value;

            updatePetInformation();

        });

    }


    /* =================================================
       6. TREATMENT PROGRESS
    ================================================= */

    function updateProgress() {

        const pet = petData[selectedPet];

        if (!pet) return;

        const petRecords = getPetPrescriptions();

        const active = petRecords.filter(
            item => item.status === "Active"
        ).length;

        const completed = petRecords.filter(
            item => item.status === "Completed"
        ).length;

        if (activeCount) {
            activeCount.textContent = active;
        }

        if (completedCount) {
            completedCount.textContent = completed;
        }

        if (upcomingCount) {
            upcomingCount.textContent = pet.upcoming;
        }

        if (progressPercentage) {
            progressPercentage.textContent = pet.progress + "%";
        }

        if (progressDescription) {
            progressDescription.textContent =
                completed + " of " + (active + completed) +
                " prescriptions completed";
        }

        if (progressCircle) {

            const circumference = 2 * Math.PI * 72;

            const offset =
                circumference - (pet.progress / 100) * circumference;

            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = offset;

        }

    }


    /* =================================================
       7. UPDATE PRESCRIPTION DETAILS
    ================================================= */

    function updatePrescriptionForPet() {

        const petRecords = getPetPrescriptions();

        if (petRecords.length === 0) {

            selectedPrescriptionId = null;

            displayEmptyPrescription();

            return;
        }

        const currentRecord = petRecords.find(
            item => item.id === selectedPrescriptionId
        );

        if (currentRecord) {
            displayPrescription(currentRecord);
        } else {
            selectedPrescriptionId = petRecords[0].id;
            displayPrescription(petRecords[0]);
        }

    }


    function displayPrescription(record) {

        if (!record) return;

        selectedPrescriptionId = record.id;

        const pet = petData[record.pet];

        if (prescriptionTitle) {
            prescriptionTitle.textContent = record.title;
        }

        if (prescriptionPet) {
            prescriptionPet.textContent =
                record.pet + " (" + pet.breed + ") | " +
                formatDate(record.date);
        }

        if (prescriptionVet) {
            prescriptionVet.textContent = record.vet || "Not specified";
        }

        if (medicineName) {
            medicineName.textContent = record.medicine;
        }

        if (dosage) {
            dosage.textContent = record.dosage;
        }

        if (frequency) {
            frequency.textContent = record.frequency;
        }

        if (duration) {
            duration.textContent = record.duration;
        }

        if (instructions) {
            instructions.textContent =
                record.instructions || "No instructions added.";
        }

        if (detailStatus) {

            detailStatus.textContent = record.status;

            detailStatus.className =
                "paw-rx-status " + record.status.toLowerCase();

        }

        if (prescriptionPetImage && pet) {
            prescriptionPetImage.src = pet.image;
            prescriptionPetImage.alt = record.pet;
        }

    }


    function displayEmptyPrescription() {

        if (prescriptionTitle) {
            prescriptionTitle.textContent = "No Prescription Available";
        }

        if (prescriptionPet) {
            prescriptionPet.textContent =
                "No prescription records found for " + selectedPet;
        }

        if (prescriptionVet) {
            prescriptionVet.textContent = "Not available";
        }

        if (medicineName) {
            medicineName.textContent = "Not available";
        }

        if (dosage) {
            dosage.textContent = "Not available";
        }

        if (frequency) {
            frequency.textContent = "Not available";
        }

        if (duration) {
            duration.textContent = "Not available";
        }

        if (instructions) {
            instructions.textContent =
                "Add a prescription to view medicine details.";
        }

        if (detailStatus) {
            detailStatus.textContent = "No Records";
            detailStatus.className = "paw-rx-status";
        }

        if (prescriptionPetImage) {
            prescriptionPetImage.src = petData[selectedPet].image;
        }

    }


    /* =================================================
       8. SUMMARY CARDS
    ================================================= */

    function updateSummary() {

        const petRecords = getPetPrescriptions();

        const active = petRecords.filter(
            item => item.status === "Active"
        ).length;

        const completed = petRecords.filter(
            item => item.status === "Completed"
        ).length;

        if (totalCount) {
            totalCount.textContent = String(prescriptions.length).padStart(2, "0");
        }

        if (activeMedicineCount) {
            activeMedicineCount.textContent = String(active).padStart(2, "0");
        }

        if (completedMedicineCount) {
            completedMedicineCount.textContent = String(completed).padStart(2, "0");
        }

        if (expiringCount) {
            expiringCount.textContent = "01";
        }

    }


    /* =================================================
       9. ADD PRESCRIPTION MODAL
    ================================================= */

    function openModal(editMode = false) {

        if (!modal) return;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        if (!editMode) {

            form.reset();

            getElement("pawRxFormId").value = "";

            getElement("pawRxFormPet").value = selectedPet;

            modalTitle.textContent = "Add New Prescription";

        }

    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }


    const addButton = getElement("pawRxAddButton");
    const modalClose = getElement("pawRxModalClose");
    const modalCancel = getElement("pawRxModalCancel");
    const modalOverlay = getElement("pawRxModalOverlay");


    if (addButton) {
        addButton.addEventListener("click", function () {
            openModal(false);
        });
    }

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (modalCancel) {
        modalCancel.addEventListener("click", closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeModal);
    }


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && modal && modal.classList.contains("active")) {
            closeModal();
        }

    });


    /* =================================================
       10. SAVE / UPDATE PRESCRIPTION
    ================================================= */

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const idValue = getElement("pawRxFormId").value;

            const newRecord = {

                id: idValue ? Number(idValue) : nextPrescriptionId++,

                pet: getElement("pawRxFormPet").value,

                title: getElement("pawRxFormTitle").value.trim(),

                medicine: getElement("pawRxFormMedicine").value.trim(),

                dosage: getElement("pawRxFormDosage").value.trim(),

                frequency: getElement("pawRxFormFrequency").value,

                duration: getElement("pawRxFormDuration").value.trim(),

                date: getElement("pawRxFormDate").value,

                vet: getElement("pawRxFormVet").value.trim(),

                instructions:
                    getElement("pawRxFormInstructions").value.trim(),

                notes:
                    getElement("pawRxFormNotes").value.trim(),

                status: "Active"

            };


            if (idValue) {

                const index = prescriptions.findIndex(
                    item => item.id === Number(idValue)
                );

                if (index !== -1) {

                    newRecord.status = prescriptions[index].status;

                    prescriptions[index] = newRecord;

                }

            } else {

                prescriptions.unshift(newRecord);

            }


            selectedPet = newRecord.pet;

            if (petSelect) {
                petSelect.value = selectedPet;
            }

            updatePetInformation();
            displayPrescription(newRecord);
            renderDocuments();

            closeModal();

            alert(
                idValue
                    ? "Prescription updated successfully!"
                    : "Prescription added successfully!"
            );

        });

    }


    /* =================================================
       11. EDIT PRESCRIPTION
    ================================================= */

    const editButton = getElement("pawRxEditButton");

    if (editButton) {

        editButton.addEventListener("click", function () {

            const record = getSelectedPrescription();

            if (!record) {
                alert("No prescription available to edit.");
                return;
            }

            openModal(true);

            modalTitle.textContent = "Edit Prescription";

            getElement("pawRxFormId").value = record.id;
            getElement("pawRxFormPet").value = record.pet;
            getElement("pawRxFormTitle").value = record.title;
            getElement("pawRxFormMedicine").value = record.medicine;
            getElement("pawRxFormDosage").value = record.dosage;
            getElement("pawRxFormFrequency").value = record.frequency;
            getElement("pawRxFormDuration").value = record.duration;
            getElement("pawRxFormDate").value = record.date;
            getElement("pawRxFormVet").value = record.vet;
            getElement("pawRxFormInstructions").value = record.instructions;
            getElement("pawRxFormNotes").value = record.notes;

        });

    }


    /* =================================================
       12. DOWNLOAD PRESCRIPTION
    ================================================= */

    const downloadButton = getElement("pawRxDownloadButton");

    if (downloadButton) {

        downloadButton.addEventListener("click", function () {

            const record = getSelectedPrescription();

            if (!record) {
                alert("No prescription available to download.");
                return;
            }

            const content = `
PAWSHEAL VETERINARY CLINIC
PRESCRIPTION DETAILS

Pet Name: ${record.pet}
Prescription: ${record.title}
Prescribed Date: ${formatDate(record.date)}

Medicine: ${record.medicine}
Dosage: ${record.dosage}
Frequency: ${record.frequency}
Duration: ${record.duration}

Veterinarian: ${record.vet}

Instructions:
${record.instructions}

Veterinarian Notes:
${record.notes}

NOTE: Demo record. Confirm all medication details
with the prescribing veterinarian.
            `;

            const blob = new Blob([content], {
                type: "text/plain"
            });

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = record.pet + "_Prescription.txt";

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);

        });

    }


    /* =================================================
       13. PRINT PRESCRIPTION
    ================================================= */

    const printButton = getElement("pawRxPrintButton");

    if (printButton) {

        printButton.addEventListener("click", function () {

            const record = getSelectedPrescription();

            if (!record) {
                alert("No prescription available to print.");
                return;
            }

            const printWindow = window.open("", "_blank");

            if (!printWindow) {
                alert("Please allow pop-ups to print the prescription.");
                return;
            }

            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>PawsHeal Prescription</title>

                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 35px;
                            color: #34483D;
                            line-height: 1.7;
                        }

                        h1 {
                            color: #245747;
                            margin-bottom: 5px;
                        }

                        h2 {
                            margin-top: 30px;
                            color: #245747;
                        }

                        .line {
                            border-bottom: 1px solid #ddd;
                            padding: 10px 0;
                        }

                        strong {
                            display: inline-block;
                            min-width: 140px;
                        }

                        .note {
                            margin-top: 25px;
                            font-size: 12px;
                            color: #777;
                        }
                    </style>

                </head>

                <body>

                    <h1>PAWSHEAL</h1>
                    <p>Veterinary Clinic & Animal Hospital</p>

                    <h2>Prescription Details</h2>

                    <div class="line">
                        <strong>Pet:</strong>
                        ${escapeHTML(record.pet)}
                    </div>

                    <div class="line">
                        <strong>Prescription:</strong>
                        ${escapeHTML(record.title)}
                    </div>

                    <div class="line">
                        <strong>Date:</strong>
                        ${escapeHTML(formatDate(record.date))}
                    </div>

                    <div class="line">
                        <strong>Medicine:</strong>
                        ${escapeHTML(record.medicine)}
                    </div>

                    <div class="line">
                        <strong>Dosage:</strong>
                        ${escapeHTML(record.dosage)}
                    </div>

                    <div class="line">
                        <strong>Frequency:</strong>
                        ${escapeHTML(record.frequency)}
                    </div>

                    <div class="line">
                        <strong>Duration:</strong>
                        ${escapeHTML(record.duration)}
                    </div>

                    <div class="line">
                        <strong>Veterinarian:</strong>
                        ${escapeHTML(record.vet)}
                    </div>

                    <h2>Instructions</h2>
                    <p>${escapeHTML(record.instructions)}</p>

                    <h2>Veterinarian Notes</h2>
                    <p>${escapeHTML(record.notes)}</p>

                    <p class="note">
                        Demo record. Confirm all medication details
                        with the prescribing veterinarian.
                    </p>

                </body>
                </html>
            `);

            printWindow.document.close();

            printWindow.onload = function () {
                printWindow.print();
            };

        });

    }


    function escapeHTML(value) {

        return String(value ?? "").replace(/[&<>"']/g, function (char) {

            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return entities[char];

        });

    }


    /* =================================================
       14. NAVIGATION TABS
    ================================================= */

    const tabButtons = document.querySelectorAll("[data-rx-tab]");

    function scrollToTab(tabName) {

        const targets = {

            overview: ".paw-rx-dashboard",

            prescriptions: ".paw-rx-current-card",

            schedule: ".paw-rx-schedule-card",

            reminders: ".paw-rx-reminders-card",

            documents: ".paw-rx-documents-card"

        };

        const target = document.querySelector(targets[tabName]);

        if (target) {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    tabButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            tabButtons.forEach(function (tab) {
                tab.classList.remove("active");
            });

            button.classList.add("active");

            scrollToTab(button.dataset.rxTab);

        });

    });


    document.querySelectorAll("[data-rx-tab-link]").forEach(function (button) {

        button.addEventListener("click", function () {

            const tabName = button.dataset.rxTabLink;

            tabButtons.forEach(function (tab) {

                tab.classList.toggle(
                    "active",
                    tab.dataset.rxTab === tabName
                );

            });

            scrollToTab(tabName);

        });

    });


    /* =================================================
       15. MEDICATION SCHEDULE - VIEW STATUS
    ================================================= */

    const scheduleItems = document.querySelectorAll(
        ".paw-rx-schedule-item"
    );

    scheduleItems.forEach(function (item) {

        const checkButton = item.querySelector(".paw-rx-dose-check");

        if (!checkButton) return;

        checkButton.style.cursor = "pointer";

        checkButton.addEventListener("click", function () {

            const isCompleted =
                checkButton.classList.contains("completed");

            if (isCompleted) {

                checkButton.classList.remove("completed");
                checkButton.classList.add("pending");

                checkButton.innerHTML =
                    '<i class="far fa-circle"></i>';

            } else {

                checkButton.classList.remove("pending");
                checkButton.classList.add("completed");

                checkButton.innerHTML =
                    '<i class="fas fa-check"></i>';

            }

        });

    });


    /* =================================================
       16. DOCUMENT UPLOAD
    ================================================= */

    function renderDocuments() {

        if (!documentList) return;

        documentList.innerHTML = "";

        const defaultDocuments = [

            {
                name: "Buddy_Skin_Treatment.pdf",
                size: "1.2 MB",
                date: "Aug 15, 2026",
                icon: "fas fa-file-pdf"
            },

            {
                name: "Skin_Notes.pdf",
                size: "845 KB",
                date: "Aug 15, 2026",
                icon: "fas fa-file-pdf"
            }

        ];

        defaultDocuments.forEach(function (document) {

            const item = document.createElement("div");

            item.className = "paw-rx-document-item";

            item.innerHTML = `
                <span class="paw-rx-document-icon">
                    <i class="${document.icon}"></i>
                </span>

                <div class="paw-rx-document-info">
                    <strong>${escapeHTML(document.name)}</strong>
                    <span>${escapeHTML(document.size)} · ${escapeHTML(document.date)}</span>
                </div>
            `;

            documentList.appendChild(item);

        });


        uploadedDocuments.forEach(function (file, index) {

            const item = document.createElement("div");

            item.className = "paw-rx-document-item";

            const size = (file.size / 1024).toFixed(1) + " KB";

            const icon = file.type === "application/pdf"
                ? "fas fa-file-pdf"
                : "fas fa-file-image";

            item.innerHTML = `
                <span class="paw-rx-document-icon">
                    <i class="${icon}"></i>
                </span>

                <div class="paw-rx-document-info">
                    <strong>${escapeHTML(file.name)}</strong>
                    <span>${escapeHTML(size)} · Uploaded now</span>
                </div>

                <div class="paw-rx-document-actions">

                    <button type="button"
                            class="paw-rx-preview-upload"
                            data-index="${index}"
                            aria-label="Preview document">
                        <i class="far fa-eye"></i>
                    </button>

                    <button type="button"
                            class="paw-rx-download-upload"
                            data-index="${index}"
                            aria-label="Download document">
                        <i class="fas fa-download"></i>
                    </button>

                </div>
            `;

            documentList.appendChild(item);

        });

    }


    if (documentUpload) {

        documentUpload.addEventListener("change", function () {

            const files = Array.from(this.files || []);

            files.forEach(function (file) {

                const allowedTypes = [
                    "application/pdf",
                    "image/jpeg",
                    "image/png"
                ];

                if (!allowedTypes.includes(file.type)) {
                    alert("Only PDF, JPG and PNG files are supported.");
                    return;
                }

                if (file.size > 5 * 1024 * 1024) {
                    alert("Please upload files smaller than 5 MB.");
                    return;
                }

                uploadedDocuments.push(file);

            });

            renderDocuments();

            this.value = "";

        });

    }


    if (documentList) {

        documentList.addEventListener("click", function (event) {

            const previewButton = event.target.closest(
                ".paw-rx-preview-upload"
            );

            const downloadButton = event.target.closest(
                ".paw-rx-download-upload"
            );


            if (previewButton) {

                const index = Number(previewButton.dataset.index);
                const file = uploadedDocuments[index];

                if (!file) return;

                const url = URL.createObjectURL(file);

                window.open(url, "_blank");

            }


            if (downloadButton) {

                const index = Number(downloadButton.dataset.index);
                const file = uploadedDocuments[index];

                if (!file) return;

                const url = URL.createObjectURL(file);

                const link = document.createElement("a");

                link.href = url;
                link.download = file.name;

                document.body.appendChild(link);

                link.click();

                link.remove();

                URL.revokeObjectURL(url);

            }

        });

    }


    /* =================================================
       17. MORE ACTIONS
    ================================================= */

    const moreButton = getElement("pawRxMoreButton");

    if (moreButton) {

        moreButton.addEventListener("click", function () {

            const record = getSelectedPrescription();

            if (!record) {
                alert("No prescription available.");
                return;
            }

            const shouldComplete = confirm(
                "Do you want to mark this prescription as completed?"
            );

            if (shouldComplete) {

                record.status = "Completed";

                displayPrescription(record);

                updateSummary();
                updateProgress();

                alert("Prescription status updated.");

            }

        });

    }


    /* =================================================
       18. INITIALIZE PAGE
    ================================================= */

    updatePetInformation();
    updateSummary();
    renderDocuments();

});
















/* =====================================================
   PAWSHEAL - VACCINATION RECORDS
   PART 4 - JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       1. PET DATA
    ================================================= */

    const pets = {
        Buddy: {
            breed: "Golden Retriever",
            age: "3 Years 4 Months",
            image: "images/my-pets-buddy.jpg"
        },

        Luna: {
            breed: "Domestic Cat",
            age: "2 Years",
            image: "images/my-pets-luna.jpg"
        }
    };

    let selectedPet = "Buddy";
    let selectedRecordId = null;
    let nextId = 6;

    /* =================================================
       2. DEMO VACCINATION RECORDS

       Replace sample records with actual clinic data.
    ================================================= */

    let records = [
        {
            id: 1,
            pet: "Buddy",
            name: "Rabies",
            date: "2025-06-10",
            due: "2026-06-10",
            vet: "Dr. Emily Carter",
            batch: "RB-2025-01",
            status: "Completed",
            notes: "Routine vaccination record."
        },
        {
            id: 2,
            pet: "Buddy",
            name: "DHPP (Distemper)",
            date: "2025-06-10",
            due: "2026-06-10",
            vet: "Dr. Emily Carter",
            batch: "DH-2025-02",
            status: "Completed",
            notes: "Vaccination completed."
        },
        {
            id: 3,
            pet: "Buddy",
            name: "Leptospirosis",
            date: "2025-07-15",
            due: "2026-07-15",
            vet: "Dr. Sarah Williams",
            batch: "LEP-2025-03",
            status: "Completed",
            notes: "Demo vaccination record."
        },
        {
            id: 4,
            pet: "Buddy",
            name: "Bordetella",
            date: "2025-08-20",
            due: "2026-12-20",
            vet: "Dr. Sarah Williams",
            batch: "BOR-2025-04",
            status: "Upcoming",
            notes: "Next vaccination scheduled."
        },
        {
            id: 5,
            pet: "Buddy",
            name: "Lyme Disease",
            date: "2025-08-20",
            due: "2026-08-20",
            vet: "Dr. Meera Iyer",
            batch: "LYM-2025-05",
            status: "Overdue",
            notes: "Veterinarian review required."
        },
        {
            id: 6,
            pet: "Luna",
            name: "FVRCP",
            date: "2025-09-12",
            due: "2026-12-12",
            vet: "Dr. Meera Iyer",
            batch: "FVR-2025-01",
            status: "Upcoming",
            notes: "Demo cat vaccination record."
        },
        {
            id: 7,
            pet: "Luna",
            name: "Rabies",
            date: "2025-11-15",
            due: "2026-11-15",
            vet: "Dr. Sarah Williams",
            batch: "RAB-2025-02",
            status: "Overdue",
            notes: "Demo cat vaccination record."
        }
    ];

    let uploadedDocuments = [];


    /* =================================================
       3. ELEMENT REFERENCES
    ================================================= */

    const $ = id => document.getElementById(id);

    const recordList = $("pawVaxRecordList");
    const searchInput = $("pawVaxSearch");
    const statusFilter = $("pawVaxStatusFilter");

    const addButton = $("pawVaxAddButton");
    const form = $("pawVaxForm");
    const modal = $("pawVaxModal");

    const detailsModal = $("pawVaxDetailsModal");

    const documentUpload = $("pawVaxDocumentUpload");
    const documentList = $("pawVaxDocumentList");

    const petTabs = document.querySelectorAll("[data-vax-pet]");
    const timelineTabs = document.querySelectorAll("[data-timeline-pet]");


    /* =================================================
       4. HELPER FUNCTIONS
    ================================================= */

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[char]);
    }

    function formatDate(value) {
        if (!value) return "Not available";

        const date = new Date(value + "T00:00:00");

        if (Number.isNaN(date.getTime())) return value;

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    function getStatusClass(status) {
        return String(status || "").toLowerCase();
    }

    function getPetRecords(pet = selectedPet) {
        return records.filter(record => record.pet === pet);
    }

    function getRecord(id) {
        return records.find(record => record.id === Number(id));
    }

    function statusIcon(status) {
        if (status === "Completed") return "fas fa-check-circle";
        if (status === "Overdue") return "fas fa-exclamation-circle";
        return "far fa-clock";
    }


    /* =================================================
       5. PET OVERVIEW
    ================================================= */

    function updatePetOverview() {

        const pet = pets[selectedPet];
        const petRecords = getPetRecords();

        const completed = petRecords.filter(
            record => record.status === "Completed"
        ).length;

        const upcoming = petRecords.filter(
            record => record.status === "Upcoming"
        ).length;

        const overdue = petRecords.filter(
            record => record.status === "Overdue"
        ).length;

        const total = petRecords.length;

        const progress = total
            ? Math.round((completed / total) * 100)
            : 0;

        if ($("pawVaxPetImage")) {
            $("pawVaxPetImage").src = pet.image;
            $("pawVaxPetImage").alt = selectedPet;
        }

        if ($("pawVaxPetName")) {
            $("pawVaxPetName").textContent = selectedPet;
        }

        if ($("pawVaxPetBreed")) {
            $("pawVaxPetBreed").textContent = pet.breed;
        }

        if ($("pawVaxPetAge")) {
            $("pawVaxPetAge").innerHTML =
                '<i class="fas fa-paw"></i> ' + escapeHTML(pet.age);
        }

        const petStatus = $("pawVaxPetStatus");

        if (petStatus) {
            if (overdue > 0) {
                petStatus.className = "paw-vax-health-status overdue";
                petStatus.innerHTML =
                    '<i class="fas fa-exclamation-circle"></i> Attention Needed';
            } else if (upcoming > 0) {
                petStatus.className = "paw-vax-health-status upcoming";
                petStatus.innerHTML =
                    '<i class="far fa-clock"></i> Vaccines Upcoming';
            } else {
                petStatus.className = "paw-vax-health-status";
                petStatus.innerHTML =
                    '<i class="fas fa-check-circle"></i> Up to date';
            }
        }

        if ($("pawVaxProgressPercentage")) {
            $("pawVaxProgressPercentage").textContent = progress + "%";
        }

        if ($("pawVaxProgressCount")) {
            $("pawVaxProgressCount").textContent =
                completed + " of " + total;
        }

        if ($("pawVaxPetCompleted")) {
            $("pawVaxPetCompleted").textContent = completed;
        }

        if ($("pawVaxPetUpcoming")) {
            $("pawVaxPetUpcoming").textContent = upcoming;
        }

        if ($("pawVaxPetOverdue")) {
            $("pawVaxPetOverdue").textContent = overdue;
        }

        const circle = $("pawVaxProgressCircle");

        if (circle) {
            const circumference = 2 * Math.PI * 65;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset =
                circumference - (progress / 100) * circumference;
        }

        petTabs.forEach(tab => {
            tab.classList.toggle(
                "active",
                tab.dataset.vaxPet === selectedPet
            );
        });

    }


    /* =================================================
       6. PET SWITCHING
    ================================================= */

    petTabs.forEach(tab => {

        tab.addEventListener("click", function () {

            selectedPet = this.dataset.vaxPet;

            searchInput.value = "";

            if (statusFilter) {
                statusFilter.value = "all";
            }

            updatePetOverview();
            renderRecords();
            renderTimeline(selectedPet);
            renderUpcoming();

        });

    });


    /* =================================================
       7. SUMMARY CARDS
    ================================================= */

    function updateSummary() {

        const completed = records.filter(
            record => record.status === "Completed"
        ).length;

        const upcoming = records.filter(
            record => record.status === "Upcoming"
        ).length;

        const overdue = records.filter(
            record => record.status === "Overdue"
        ).length;

        if ($("pawVaxTotal")) {
            $("pawVaxTotal").textContent =
                String(records.length).padStart(2, "0");
        }

        if ($("pawVaxCompleted")) {
            $("pawVaxCompleted").textContent =
                String(completed).padStart(2, "0");
        }

        if ($("pawVaxUpcoming")) {
            $("pawVaxUpcoming").textContent =
                String(upcoming).padStart(2, "0");
        }

        if ($("pawVaxOverdue")) {
            $("pawVaxOverdue").textContent =
                String(overdue).padStart(2, "0");
        }

    }


    /* =================================================
       8. VACCINATION TABLE
    ================================================= */

    function renderRecords() {

        if (!recordList) return;

        const search = (searchInput?.value || "").toLowerCase();
        const status = statusFilter?.value || "all";

        const filtered = getPetRecords().filter(record => {

            const matchesSearch =
                record.name.toLowerCase().includes(search) ||
                record.vet.toLowerCase().includes(search);

            const matchesStatus =
                status === "all" || record.status === status;

            return matchesSearch && matchesStatus;

        });

        recordList.innerHTML = "";

        filtered.forEach(record => {

            const row = document.createElement("tr");

            row.dataset.vaxPet = record.pet;
            row.dataset.vaxStatus = record.status;

            row.innerHTML = `
                <td>
                    <span class="paw-vax-table-name">
                        <i class="fas fa-shield-alt"></i>
                        ${escapeHTML(record.name)}
                    </span>
                </td>

                <td>${formatDate(record.date)}</td>

                <td>${formatDate(record.due)}</td>

                <td>${escapeHTML(record.vet)}</td>

                <td>
                    <span class="paw-vax-status ${getStatusClass(record.status)}">
                        <i class="${statusIcon(record.status)}"></i>
                        ${escapeHTML(record.status)}
                    </span>
                </td>

                <td>
                    <div class="paw-vax-actions">

                        <button type="button"
                                data-vax-action="view"
                                data-id="${record.id}"
                                aria-label="View record">
                            <i class="far fa-eye"></i>
                        </button>

                        <button type="button"
                                data-vax-action="download"
                                data-id="${record.id}"
                                aria-label="Download record">
                            <i class="fas fa-download"></i>
                        </button>

                        <button type="button"
                                data-vax-action="edit"
                                data-id="${record.id}"
                                aria-label="Edit record">
                            <i class="fas fa-pen"></i>
                        </button>

                    </div>
                </td>
            `;

            recordList.appendChild(row);

        });

        const empty = $("pawVaxTableEmpty");

        if (empty) {
            empty.hidden = filtered.length !== 0;
        }

        if ($("pawVaxRecordCount")) {
            $("pawVaxRecordCount").textContent =
                "Showing " + filtered.length +
                " vaccination records";
        }

    }

    if (searchInput) {
        searchInput.addEventListener("input", renderRecords);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderRecords);
    }


    /* =================================================
       9. TIMELINE
    ================================================= */

    function renderTimeline(petName) {

        const container = $("pawVaxTimelineList");

        if (!container) return;

        const petRecords = getPetRecords(petName)
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));

        container.innerHTML = "";

        if (petRecords.length === 0) {
            container.innerHTML = `
                <div class="paw-vax-table-empty">
                    <i class="fas fa-calendar"></i>
                    <p>No vaccination history available.</p>
                </div>
            `;
            return;
        }

        petRecords.forEach(record => {

            const item = document.createElement("div");

            item.className =
                "paw-vax-timeline-item " +
                getStatusClass(record.status);

            item.innerHTML = `
                <span class="paw-vax-timeline-marker">
                    <i class="fas fa-syringe"></i>
                </span>

                <div class="paw-vax-timeline-information">
                    <strong>${escapeHTML(record.name)}</strong>
                    <span>${formatDate(record.date)}</span>
                    <small>${escapeHTML(record.vet)}</small>
                </div>

                <span class="paw-vax-status ${getStatusClass(record.status)}">
                    ${escapeHTML(record.status)}
                </span>
            `;

            container.appendChild(item);

        });

        timelineTabs.forEach(tab => {
            tab.classList.toggle(
                "active",
                tab.dataset.timelinePet === petName
            );
        });

    }


    timelineTabs.forEach(tab => {

        tab.addEventListener("click", function () {

            renderTimeline(this.dataset.timelinePet);

        });

    });


    /* =================================================
       10. UPCOMING VACCINATIONS
    ================================================= */

    function renderUpcoming() {

        const container = $("pawVaxUpcomingList");

        if (!container) return;

        const upcomingRecords = records
            .filter(record =>
                record.status === "Upcoming" ||
                record.status === "Overdue"
            )
            .sort((a, b) => a.due.localeCompare(b.due));

        container.innerHTML = "";

        if (upcomingRecords.length === 0) {
            container.innerHTML = `
                <div class="paw-vax-table-empty">
                    <i class="fas fa-check-circle"></i>
                    <p>No upcoming vaccinations.</p>
                </div>
            `;
            return;
        }

        upcomingRecords.forEach(record => {

            const date = new Date(record.due + "T00:00:00");

            const month = date.toLocaleDateString("en-IN", {
                month: "short"
            }).toUpperCase();

            const day = date.toLocaleDateString("en-IN", {
                day: "2-digit"
            });

            const item = document.createElement("div");

            item.className =
                "paw-vax-upcoming-item " +
                getStatusClass(record.status);

            item.innerHTML = `
                <span class="paw-vax-upcoming-date">
                    <small>${month}</small>
                    <strong>${day}</strong>
                </span>

                <span class="paw-vax-upcoming-icon">
                    <i class="fas fa-syringe"></i>
                </span>

                <div class="paw-vax-upcoming-information">
                    <strong>${escapeHTML(record.name)}</strong>
                    <p>${escapeHTML(record.pet)}</p>
                    <small>${escapeHTML(record.vet)}</small>
                </div>

                <span class="paw-vax-status ${getStatusClass(record.status)}">
                    ${escapeHTML(record.status)}
                </span>
            `;

            container.appendChild(item);

        });

    }


    /* =================================================
       11. ADD / EDIT MODAL
    ================================================= */

    function openModal(editRecord = null) {

        if (!modal || !form) return;

        form.reset();

        $("pawVaxFormId").value = "";

        if (editRecord) {

            $("pawVaxModalTitle").textContent = "Edit Vaccination";

            $("pawVaxFormId").value = editRecord.id;
            $("pawVaxFormPet").value = editRecord.pet;
            $("pawVaxFormName").value = editRecord.name;
            $("pawVaxFormDate").value = editRecord.date;
            $("pawVaxFormDueDate").value = editRecord.due;
            $("pawVaxFormVet").value = editRecord.vet;
            $("pawVaxFormBatch").value = editRecord.batch || "";
            $("pawVaxFormStatus").value = editRecord.status;
            $("pawVaxFormNotes").value = editRecord.notes || "";

            selectedRecordId = editRecord.id;

        } else {

            $("pawVaxModalTitle").textContent = "Add Vaccination";
            $("pawVaxFormPet").value = selectedPet;
            selectedRecordId = null;

        }

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }


    if (addButton) {
        addButton.addEventListener("click", () => openModal());
    }

    $("pawVaxModalClose")?.addEventListener("click", closeModal);
    $("pawVaxModalCancel")?.addEventListener("click", closeModal);
    $("pawVaxModalOverlay")?.addEventListener("click", closeModal);


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeModal();
            closeDetailsModal();
        }

    });


    /* =================================================
       12. SAVE VACCINATION
    ================================================= */

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const date = $("pawVaxFormDate").value;
            const due = $("pawVaxFormDueDate").value;

            if (due < date) {
                alert("Next due date cannot be earlier than vaccination date.");
                return;
            }

            const idValue = $("pawVaxFormId").value;

            const record = {
                id: idValue ? Number(idValue) : nextId++,
                pet: $("pawVaxFormPet").value,
                name: $("pawVaxFormName").value.trim(),
                date: date,
                due: due,
                vet: $("pawVaxFormVet").value.trim(),
                batch: $("pawVaxFormBatch").value.trim(),
                status: $("pawVaxFormStatus").value,
                notes: $("pawVaxFormNotes").value.trim()
            };

            if (idValue) {

                const index = records.findIndex(
                    item => item.id === Number(idValue)
                );

                if (index !== -1) {
                    records[index] = record;
                }

            } else {

                records.push(record);

            }

            selectedPet = record.pet;

            updateAll();

            renderDetails(record);

            closeModal();

            const certificate = $("pawVaxFormCertificate");

            if (certificate?.files?.length) {
                addUploadedFiles(Array.from(certificate.files));
            }

            alert(
                idValue
                    ? "Vaccination record updated successfully!"
                    : "Vaccination record added successfully!"
            );

        });

    }


    /* =================================================
       13. DETAILS MODAL
    ================================================= */

    function renderDetails(record) {

        if (!record || !detailsModal) return;

        selectedRecordId = record.id;

        $("pawVaxDetailsName").textContent = record.name;
        $("pawVaxDetailsPet").textContent = record.pet;
        $("pawVaxDetailsDate").textContent = formatDate(record.date);
        $("pawVaxDetailsDue").textContent = formatDate(record.due);
        $("pawVaxDetailsVet").textContent = record.vet;
        $("pawVaxDetailsBatch").textContent = record.batch || "Not available";
        $("pawVaxDetailsStatus").textContent = record.status;
        $("pawVaxDetailsNotes").textContent =
            record.notes || "No additional notes available.";

        detailsModal.classList.add("active");
        detailsModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

    }


    function closeDetailsModal() {

        if (!detailsModal) return;

        detailsModal.classList.remove("active");
        detailsModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

    }


    $("pawVaxDetailsClose")?.addEventListener(
        "click",
        closeDetailsModal
    );

    $("pawVaxDetailsOverlay")?.addEventListener(
        "click",
        closeDetailsModal
    );


    /* =================================================
       14. TABLE ACTIONS
    ================================================= */

    if (recordList) {

        recordList.addEventListener("click", function (event) {

            const button = event.target.closest("[data-vax-action]");

            if (!button) return;

            const record = getRecord(button.dataset.id);

            if (!record) return;

            const action = button.dataset.vaxAction;

            if (action === "view") {
                renderDetails(record);
            }

            if (action === "edit") {
                openModal(record);
            }

            if (action === "download") {
                downloadRecord(record);
            }

        });

    }


    /* =================================================
       15. DETAILS MODAL ACTIONS
    ================================================= */

    $("pawVaxDetailsEdit")?.addEventListener("click", function () {

        const record = getRecord(selectedRecordId);

        if (!record) return;

        closeDetailsModal();
        openModal(record);

    });


    $("pawVaxDetailsDownload")?.addEventListener("click", function () {

        const record = getRecord(selectedRecordId);

        if (record) {
            downloadRecord(record);
        }

    });


    /* =================================================
       16. DOWNLOAD VACCINATION RECORD
    ================================================= */

    function downloadRecord(record) {

        const content = `
PAWSHEAL VETERINARY CLINIC
VACCINATION RECORD

Pet Name: ${record.pet}
Vaccine Name: ${record.name}
Vaccination Date: ${formatDate(record.date)}
Next Due Date: ${formatDate(record.due)}
Veterinarian: ${record.vet}
Batch Number: ${record.batch || "Not available"}
Status: ${record.status}

Additional Notes:
${record.notes || "No additional notes"}

NOTE: Demo record. Confirm vaccination dates and
future schedules with your veterinarian.
`;

        const blob = new Blob([content], {
            type: "text/plain"
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = record.pet + "_" +
            record.name.replace(/[^a-z0-9]/gi, "_") +
            "_Vaccination.txt";

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);

    }


    /* =================================================
       17. VIEW ALL BUTTONS
    ================================================= */

    $("pawVaxViewAll")?.addEventListener("click", function () {

        if (searchInput) searchInput.value = "";
        if (statusFilter) statusFilter.value = "all";

        renderRecords();

        $("pawVaxRecordsCard")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        document.querySelector(".paw-vax-records-card")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });


    $("pawVaxUpcomingViewAll")?.addEventListener("click", function () {

        document.querySelector(".paw-vax-upcoming-card")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });


    /* =================================================
       18. DOCUMENT UPLOAD
    ================================================= */

    function addUploadedFiles(files) {

        files.forEach(file => {

            const allowedTypes = [
                "application/pdf",
                "image/jpeg",
                "image/png"
            ];

            if (!allowedTypes.includes(file.type)) {
                alert("Only PDF, JPG and PNG files are supported.");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert("File size must be below 5 MB.");
                return;
            }

            uploadedDocuments.push(file);

        });

        renderDocuments();

    }


    if (documentUpload) {

        documentUpload.addEventListener("change", function () {

            addUploadedFiles(Array.from(this.files || []));

            this.value = "";

        });

    }


    function renderDocuments() {

        if (!documentList) return;

        uploadedDocuments.forEach((file, index) => {

            if (documentList.querySelector(
                '[data-uploaded-index="' + index + '"]'
            )) {
                return;
            }

            const item = document.createElement("div");

            item.className = "paw-vax-document-item";
            item.dataset.uploadedIndex = index;

            const icon = file.type === "application/pdf"
                ? "pdf"
                : "image";

            const iconClass = file.type === "application/pdf"
                ? "fas fa-file-pdf"
                : "fas fa-file-image";

            item.innerHTML = `
                <span class="paw-vax-document-icon ${icon}">
                    <i class="${iconClass}"></i>
                </span>

                <div class="paw-vax-document-information">
                    <strong>${escapeHTML(file.name)}</strong>
                    <small>${(file.size / 1024).toFixed(1)} KB · Uploaded now</small>
                </div>

                <div class="paw-vax-document-actions">

                    <button type="button"
                            data-document-action="preview"
                            data-index="${index}"
                            aria-label="Preview document">
                        <i class="far fa-eye"></i>
                    </button>

                    <button type="button"
                            data-document-action="download"
                            data-index="${index}"
                            aria-label="Download document">
                        <i class="fas fa-download"></i>
                    </button>

                </div>
            `;

            documentList.appendChild(item);

        });

    }


    if (documentList) {

        documentList.addEventListener("click", function (event) {

            const button = event.target.closest("[data-document-action]");

            if (!button) return;

            const file = uploadedDocuments[
                Number(button.dataset.index)
            ];

            if (!file) return;

            const url = URL.createObjectURL(file);

            if (button.dataset.documentAction === "preview") {

                window.open(url, "_blank");

            } else {

                const link = document.createElement("a");

                link.href = url;
                link.download = file.name;

                document.body.appendChild(link);
                link.click();
                link.remove();

            }

            setTimeout(() => URL.revokeObjectURL(url), 1000);

        });

    }


    /* =================================================
       19. INITIALIZE PAGE
    ================================================= */

    function updateAll() {

        updatePetOverview();
        updateSummary();
        renderRecords();
        renderTimeline(selectedPet);
        renderUpcoming();

    }

    updateAll();
    renderDocuments();

});















/* =====================================================
   PAWSHEAL - PAYMENTS PAGE
   PART 4 - JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const $ = id => document.getElementById(id);

    /* =================================================
       1. DEMO PAYMENT DATA
    ================================================= */

    let transactions = [
        {
            id: "201",
            transactionId: "#PAW782945",
            date: "20 Nov 2026",
            pet: "Buddy",
            service: "Consultation (Follow-up)",
            amount: 1200,
            method: "VISA •••• 4582",
            status: "Paid"
        },
        {
            id: "202",
            transactionId: "#PAW782901",
            date: "15 Nov 2026",
            pet: "Luna",
            service: "Vaccination (FVRCP)",
            amount: 1200,
            method: "UPI priya@upi",
            status: "Paid"
        },
        {
            id: "203",
            transactionId: "#PAW782877",
            date: "10 Nov 2026",
            pet: "Buddy",
            service: "Blood Test",
            amount: 2500,
            method: "Mastercard •••• 2034",
            status: "Paid"
        },
        {
            id: "204",
            transactionId: "#PAW782831",
            date: "05 Nov 2026",
            pet: "Buddy",
            service: "X-Ray",
            amount: 1800,
            method: "UPI priya@upi",
            status: "Failed"
        },
        {
            id: "205",
            transactionId: "#PAW782799",
            date: "02 Nov 2026",
            pet: "Luna",
            service: "Consultation",
            amount: 500,
            method: "VISA •••• 4582",
            status: "Paid"
        }
    ];

    let outstandingPayments = [
        {
            id: "101",
            invoice: "INV-2026-003",
            pet: "Buddy",
            service: "General Checkup",
            date: "25 Nov 2026",
            amount: 1500,
            status: "Pending"
        },
        {
            id: "102",
            invoice: "INV-2026-004",
            pet: "Luna",
            service: "Rabies Vaccination",
            date: "28 Nov 2026",
            amount: 900,
            status: "Pending"
        }
    ];

    let paymentMethods = [
        {
            id: 1,
            type: "Card",
            name: "VISA",
            detail: "•••• 4582",
            expiry: "08/27",
            isDefault: true
        },
        {
            id: 2,
            type: "UPI",
            name: "UPI",
            detail: "priya@upi",
            expiry: "",
            isDefault: false
        },
        {
            id: 3,
            type: "Card",
            name: "Mastercard",
            detail: "•••• 2034",
            expiry: "11/26",
            isDefault: false
        }
    ];

    let selectedTransaction = null;
    let selectedOutstanding = null;
    let selectedInvoice = null;
    let nextMethodId = 4;


    /* =================================================
       2. HELPER FUNCTIONS
    ================================================= */

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[char]);
    }

    function formatCurrency(amount) {
        return "₹" + Number(amount || 0).toLocaleString("en-IN");
    }

    function getStatusClass(status) {
        return String(status || "").toLowerCase();
    }

    function openModal(element) {
        if (!element) return;

        element.classList.add("active");
        element.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal(element) {
        if (!element) return;

        element.classList.remove("active");
        element.setAttribute("aria-hidden", "true");

        const openModals = document.querySelectorAll(
            ".paw-payment-modal.active, " +
            ".paw-payment-method-modal.active, " +
            ".paw-payment-pay-modal.active"
        );

        if (!openModals.length) {
            document.body.style.overflow = "";
        }
    }

    function statusMarkup(status) {
        const icons = {
            Paid: "fas fa-check",
            Pending: "far fa-clock",
            Failed: "fas fa-times-circle",
            Refunded: "fas fa-undo"
        };

        return `
            <span class="paw-payment-status ${getStatusClass(status)}">
                <i class="${icons[status] || "fas fa-info-circle"}"></i>
                ${escapeHTML(status)}
            </span>
        `;
    }


    /* =================================================
       3. SUMMARY UPDATE
    ================================================= */

    function updateSummary() {

        const totalPaid = transactions
            .filter(item => item.status === "Paid")
            .reduce((sum, item) => sum + item.amount, 0);

        const pendingTotal = outstandingPayments
            .filter(item => item.status === "Pending")
            .reduce((sum, item) => sum + item.amount, 0);

        const pendingCount = outstandingPayments
            .filter(item => item.status === "Pending").length;

        const refundTotal = transactions
            .filter(item => item.status === "Refunded")
            .reduce((sum, item) => sum + item.amount, 0);

        if ($("pawPaymentTotalPaid")) {
            $("pawPaymentTotalPaid").textContent =
                formatCurrency(totalPaid);
        }

        if ($("pawPaymentPending")) {
            $("pawPaymentPending").textContent =
                formatCurrency(pendingTotal);
        }

        if ($("pawPaymentPendingCount")) {
            $("pawPaymentPendingCount").textContent =
                pendingCount + " Invoices";
        }

        if ($("pawPaymentRefunds")) {
            $("pawPaymentRefunds").textContent =
                formatCurrency(refundTotal);
        }

        if ($("pawPaymentHistoryCount")) {
            $("pawPaymentHistoryCount").textContent =
                transactions.length.toString().padStart(2, "0");
        }

        if ($("pawPaymentHistorySuccessful")) {
            $("pawPaymentHistorySuccessful").textContent =
                transactions.filter(item => item.status === "Paid").length;
        }

        if ($("pawPaymentHistoryFailed")) {
            $("pawPaymentHistoryFailed").textContent =
                transactions.filter(item => item.status === "Failed").length;
        }
    }


    /* =================================================
       4. TRANSACTION TABLE FILTERS
    ================================================= */

    function filterTransactions() {

        const petFilter = $("pawPaymentPetFilter")?.value || "all";
        const statusFilter = $("pawPaymentStatusFilter")?.value || "all";

        const rows = document.querySelectorAll(
            "#pawPaymentTransactionList tr"
        );

        let visibleCount = 0;

        rows.forEach(row => {

            const matchesPet =
                petFilter === "all" ||
                row.dataset.paymentPet === petFilter;

            const matchesStatus =
                statusFilter === "all" ||
                row.dataset.paymentStatus === statusFilter;

            const visible = matchesPet && matchesStatus;

            row.hidden = !visible;

            if (visible) visibleCount++;
        });

        const empty = $("pawPaymentEmpty");

        if (empty) {
            empty.hidden = visibleCount !== 0;
        }
    }

    $("pawPaymentPetFilter")?.addEventListener(
        "change",
        filterTransactions
    );

    $("pawPaymentStatusFilter")?.addEventListener(
        "change",
        filterTransactions
    );


    /* =================================================
       5. TRANSACTION TABS
    ================================================= */

    const paymentTabs = document.querySelectorAll(
        "[data-payment-tab]"
    );

    const tabPanels = {
        transactions: $("pawPaymentTransactionsTab"),
        history: $("pawPaymentHistoryTab"),
        invoices: $("pawPaymentInvoicesTab")
    };

    function switchPaymentTab(tabName) {

        paymentTabs.forEach(tab => {

            const active = tab.dataset.paymentTab === tabName;

            tab.classList.toggle("active", active);
            tab.setAttribute("aria-selected", String(active));

        });

        Object.entries(tabPanels).forEach(([name, panel]) => {

            if (!panel) return;

            const active = name === tabName;

            panel.hidden = !active;
            panel.classList.toggle("active", active);

        });

        if (tabName === "history") {
            renderPaymentHistory();
        }

        if (tabName === "invoices") {
            filterInvoices();
        }
    }

    paymentTabs.forEach(tab => {

        tab.addEventListener("click", function () {

            switchPaymentTab(this.dataset.paymentTab);

        });

    });


    /* =================================================
       6. PAYMENT HISTORY
    ================================================= */

    function renderPaymentHistory() {

        const container = $("pawPaymentHistoryList");

        if (!container) return;

        container.innerHTML = "";

        transactions.forEach(item => {

            const icon = item.status === "Failed"
                ? "fas fa-times-circle"
                : item.status === "Refunded"
                    ? "fas fa-undo"
                    : "fas fa-check-circle";

            const element = document.createElement("div");

            element.className = "paw-payment-history-item";

            element.innerHTML = `
                <span class="paw-payment-history-icon ${getStatusClass(item.status)}">
                    <i class="${icon}"></i>
                </span>

                <div class="paw-payment-history-info">
                    <strong>${escapeHTML(item.service)}</strong>
                    <small>
                        ${escapeHTML(item.transactionId)} ·
                        ${escapeHTML(item.pet)} ·
                        ${escapeHTML(item.date)}
                    </small>
                </div>

                <div class="paw-payment-history-amount">
                    ${formatCurrency(item.amount)}
                </div>

                ${statusMarkup(item.status)}
            `;

            container.appendChild(element);

        });
    }


    /* =================================================
       7. TRANSACTION DETAILS MODAL
    ================================================= */

    function showTransactionDetails(transaction) {

        if (!transaction) return;

        selectedTransaction = transaction;

        $("pawPaymentDetailsId").textContent =
            transaction.transactionId;

        $("pawPaymentDetailsDate").textContent =
            transaction.date;

        $("pawPaymentDetailsPet").textContent =
            transaction.pet;

        $("pawPaymentDetailsService").textContent =
            transaction.service;

        $("pawPaymentDetailsMethod").textContent =
            transaction.method;

        $("pawPaymentDetailsAmount").textContent =
            formatCurrency(transaction.amount);

        $("pawPaymentDetailsPaymentStatus").textContent =
            transaction.status;

        const statusElement = $("pawPaymentDetailsStatus");

        if (statusElement) {

            statusElement.className =
                "paw-payment-receipt-status " +
                getStatusClass(transaction.status);

            statusElement.innerHTML = `
                <i class="${
                    transaction.status === "Paid"
                        ? "fas fa-check-circle"
                        : transaction.status === "Failed"
                            ? "fas fa-times-circle"
                            : "far fa-clock"
                }"></i>
                ${escapeHTML(transaction.status)}
            `;
        }

        openModal($("pawPaymentDetailsModal"));
    }

    $("pawPaymentTransactionList")?.addEventListener(
        "click",
        function (event) {

            const button = event.target.closest(
                "[data-payment-action]"
            );

            if (!button) return;

            const transaction = transactions.find(
                item => item.id === button.dataset.paymentId
            );

            if (!transaction) return;

            const action = button.dataset.paymentAction;

            if (action === "view") {
                showTransactionDetails(transaction);
            }

            if (action === "download") {
                downloadReceipt(transaction);
            }

            if (action === "print") {
                printReceipt(transaction);
            }

        }
    );

    $("pawPaymentDetailsClose")?.addEventListener(
        "click",
        () => closeModal($("pawPaymentDetailsModal"))
    );

    $("pawPaymentDetailsOverlay")?.addEventListener(
        "click",
        () => closeModal($("pawPaymentDetailsModal"))
    );


    /* =================================================
       8. RECEIPT DOWNLOAD
    ================================================= */

    function getReceiptContent(item) {

        return `
PAWSHEAL VETERINARY CLINIC
PAYMENT RECEIPT

Transaction ID: ${item.transactionId}
Date: ${item.date}

Pet: ${item.pet}
Service: ${item.service}

Amount: ${formatCurrency(item.amount)}
Payment Method: ${item.method}
Payment Status: ${item.status}

Thank you for choosing PawsHeal.

DEMO RECEIPT - NOT A VALID TAX INVOICE.
        `.trim();
    }

    function downloadTextFile(content, filename) {

        const blob = new Blob([content], {
            type: "text/plain;charset=utf-8"
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function downloadReceipt(item) {

        if (!item) return;

        downloadTextFile(
            getReceiptContent(item),
            item.transactionId.replace("#", "") + "_receipt.txt"
        );
    }

    $("pawPaymentDetailsDownload")?.addEventListener(
        "click",
        function () {
            if (selectedTransaction) {
                downloadReceipt(selectedTransaction);
            }
        }
    );


    /* =================================================
       9. PRINT RECEIPT
    ================================================= */

    function printReceipt(item) {

        if (!item) return;

        const printWindow = window.open("", "_blank");

        if (!printWindow) {
            alert("Please allow pop-ups to print the receipt.");
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Payment Receipt</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 35px;
                        color: #263C30;
                    }

                    h2 {
                        color: #245747;
                        margin-bottom: 5px;
                    }

                    .subtitle {
                        color: #758579;
                        margin-bottom: 30px;
                    }

                    .receipt {
                        max-width: 550px;
                        margin: auto;
                        padding: 25px;
                        border: 1px solid #DDE8DE;
                        border-radius: 12px;
                    }

                    .line {
                        display: flex;
                        justify-content: space-between;
                        gap: 20px;
                        padding: 12px 0;
                        border-bottom: 1px solid #E8EEE8;
                    }

                    .line span {
                        color: #77877B;
                    }

                    .amount {
                        margin-top: 20px;
                        padding: 15px;
                        background: #EDF7EF;
                        color: #245747;
                        font-size: 23px;
                        font-weight: bold;
                        text-align: center;
                    }

                    .note {
                        margin-top: 25px;
                        color: #89958B;
                        font-size: 11px;
                        text-align: center;
                    }
                </style>
            </head>

            <body>
                <div class="receipt">

                    <h2>PAWSHEAL</h2>
                    <div class="subtitle">Veterinary Clinic & Animal Hospital</div>

                    <h3>Payment Receipt</h3>

                    <div class="line">
                        <span>Transaction ID</span>
                        <strong>${escapeHTML(item.transactionId)}</strong>
                    </div>

                    <div class="line">
                        <span>Date</span>
                        <strong>${escapeHTML(item.date)}</strong>
                    </div>

                    <div class="line">
                        <span>Pet</span>
                        <strong>${escapeHTML(item.pet)}</strong>
                    </div>

                    <div class="line">
                        <span>Service</span>
                        <strong>${escapeHTML(item.service)}</strong>
                    </div>

                    <div class="line">
                        <span>Payment Method</span>
                        <strong>${escapeHTML(item.method)}</strong>
                    </div>

                    <div class="line">
                        <span>Status</span>
                        <strong>${escapeHTML(item.status)}</strong>
                    </div>

                    <div class="amount">
                        ${formatCurrency(item.amount)}
                    </div>

                    <div class="note">
                        DEMO RECEIPT - NOT A VALID TAX INVOICE
                    </div>

                </div>
            </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        setTimeout(() => {
            printWindow.print();
        }, 300);
    }

    $("pawPaymentDetailsPrint")?.addEventListener(
        "click",
        function () {
            if (selectedTransaction) {
                printReceipt(selectedTransaction);
            }
        }
    );


    /* =================================================
       10. OUTSTANDING PAYMENTS
    ================================================= */

    function renderOutstandingPayments() {

        const container = $("pawOutstandingPaymentList");

        if (!container) return;

        container.innerHTML = "";

        const pendingItems = outstandingPayments.filter(
            item => item.status === "Pending"
        );

        if (!pendingItems.length) {

            container.innerHTML = `
                <div class="paw-payment-empty">
                    <i class="fas fa-check-circle"></i>
                    <p>No outstanding payments.</p>
                </div>
            `;

            return;
        }

        pendingItems.forEach(item => {

            const element = document.createElement("div");

            element.className = "paw-payment-outstanding-item";
            element.dataset.paymentId = item.id;

            element.innerHTML = `
                <span class="paw-payment-outstanding-icon consultation">
                    <i class="fas fa-file-invoice"></i>
                </span>

                <div class="paw-payment-outstanding-info">
                    <strong>${escapeHTML(item.service)} – ${escapeHTML(item.pet)}</strong>
                    <p>${escapeHTML(item.date)}</p>
                </div>

                <div class="paw-payment-outstanding-amount">
                    <strong>${formatCurrency(item.amount)}</strong>
                    ${statusMarkup(item.status)}
                </div>

                <button type="button"
                        class="paw-payment-pay-button"
                        data-pay-id="${item.id}">
                    Pay Now
                </button>
            `;

            container.appendChild(element);

        });
    }


    /* =================================================
       11. PAY NOW MODAL
    ================================================= */

    function openPayModal(item) {

        if (!item) return;

        selectedOutstanding = item;

        $("pawPaymentPayInvoice").textContent = item.invoice;
        $("pawPaymentPayPet").textContent = item.pet;
        $("pawPaymentPayService").textContent = item.service;
        $("pawPaymentPayAmount").textContent =
            formatCurrency(item.amount);

        const methodSelect = $("pawPaymentPayMethod");

        if (methodSelect) {

            methodSelect.innerHTML =
                '<option value="">Select payment method</option>';

            paymentMethods.forEach(method => {

                const option = document.createElement("option");

                option.value = method.name + " " + method.detail;
                option.textContent =
                    method.name + " " + method.detail +
                    (method.isDefault ? " (Default)" : "");

                methodSelect.appendChild(option);

            });
        }

        openModal($("pawPaymentPayModal"));
    }


    $("pawOutstandingPaymentList")?.addEventListener(
        "click",
        function (event) {

            const button = event.target.closest("[data-pay-id]");

            if (!button) return;

            const item = outstandingPayments.find(
                payment => payment.id === button.dataset.payId
            );

            if (item) openPayModal(item);

        }
    );


    $("pawPaymentMainPayButton")?.addEventListener(
        "click",
        function () {

            const firstPending = outstandingPayments.find(
                item => item.status === "Pending"
            );

            if (!firstPending) {
                alert("You have no pending payments.");
                return;
            }

            openPayModal(firstPending);

        }
    );


    $("pawPaymentPayClose")?.addEventListener(
        "click",
        () => closeModal($("pawPaymentPayModal"))
    );

    $("pawPaymentPayOverlay")?.addEventListener(
        "click",
        () => closeModal($("pawPaymentPayModal"))
    );


    $("pawPaymentPayForm")?.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (!selectedOutstanding) return;

            const method = $("pawPaymentPayMethod")?.value;

            if (!method) {
                alert("Please select a payment method.");
                return;
            }

            alert(
                "Demo payment only.\n\n" +
                "No money has been charged and no payment status has changed.\n\n" +
                "Connect a secure payment gateway to accept real payments."
            );

            closeModal($("pawPaymentPayModal"));

        }
    );


    /* =================================================
       12. INVOICES FILTER
    ================================================= */

    function filterInvoices() {

        const filter = $("pawInvoiceStatusFilter")?.value || "all";

        const items = document.querySelectorAll(
            ".paw-payment-invoice-item"
        );

        let visibleCount = 0;

        items.forEach(item => {

            const matches =
                filter === "all" ||
                item.dataset.invoiceStatus === filter;

            item.hidden = !matches;

            if (matches) visibleCount++;

        });

        const empty = $("pawPaymentEmpty");

        if (empty && $("pawPaymentInvoicesTab")?.hidden === false) {
            empty.hidden = visibleCount !== 0;
        }
    }

    $("pawInvoiceStatusFilter")?.addEventListener(
        "change",
        filterInvoices
    );


    /* =================================================
       13. INVOICE VIEW / DOWNLOAD
    ================================================= */

    const invoiceData = [
        {
            id: "INV-2026-001",
            pet: "Buddy",
            service: "General Consultation",
            date: "20 Nov 2026",
            amount: 1200,
            status: "Paid"
        },
        {
            id: "INV-2026-002",
            pet: "Luna",
            service: "Vaccination",
            date: "15 Nov 2026",
            amount: 1200,
            status: "Paid"
        },
        {
            id: "INV-2026-003",
            pet: "Buddy",
            service: "General Checkup",
            date: "25 Nov 2026",
            amount: 1500,
            status: "Pending"
        }
    ];

    function getInvoiceContent(item) {

        return `
PAWSHEAL VETERINARY CLINIC
INVOICE

Invoice Number: ${item.id}
Date: ${item.date}

Pet: ${item.pet}
Service: ${item.service}

Amount: ${formatCurrency(item.amount)}
Status: ${item.status}

DEMO INVOICE - NOT A VALID TAX INVOICE.
        `.trim();
    }


    $("pawPaymentInvoiceList")?.addEventListener(
        "click",
        function (event) {

            const button = event.target.closest("[data-invoice-action]");

            if (!button) return;

            const invoice = invoiceData.find(
                item => item.id === button.dataset.invoiceId
            );

            if (!invoice) return;

            selectedInvoice = invoice;

            const action = button.dataset.invoiceAction;

            if (action === "view") {

                downloadTextFile(
                    getInvoiceContent(invoice),
                    invoice.id + "_preview.txt"
                );

            }

            if (action === "download") {

                downloadTextFile(
                    getInvoiceContent(invoice),
                    invoice.id + ".txt"
                );

            }

        }
    );


    /* =================================================
       14. ADD PAYMENT METHOD MODAL
    ================================================= */

    const addMethodModal = $("pawAddMethodModal");
    const addMethodForm = $("pawAddPaymentMethodForm");

    function updatePaymentMethodFields() {

        const type = $("pawPaymentMethodType")?.value;

        const cardFields = $("pawPaymentCardFields");
        const upiField = $("pawPaymentUpiField");

        if (cardFields) {
            cardFields.classList.toggle("active", type === "Card");
        }

        if (upiField) {
            upiField.hidden = type !== "UPI";
        }

        const cardName = $("pawPaymentCardName");
        const cardNumber = $("pawPaymentCardNumber");
        const cardExpiry = $("pawPaymentCardExpiry");
        const cardCvv = $("pawPaymentCardCvv");
        const upiId = $("pawPaymentUpiId");

        if (cardName) cardName.required = type === "Card";
        if (cardNumber) cardNumber.required = type === "Card";
        if (cardExpiry) cardExpiry.required = type === "Card";
        if (cardCvv) cardCvv.required = type === "Card";
        if (upiId) upiId.required = type === "UPI";
    }

    $("pawAddPaymentMethodButton")?.addEventListener(
        "click",
        function () {

            addMethodForm?.reset();
            updatePaymentMethodFields();

            openModal(addMethodModal);

        }
    );

    $("pawAddMethodClose")?.addEventListener(
        "click",
        () => closeModal(addMethodModal)
    );

    $("pawAddMethodOverlay")?.addEventListener(
        "click",
        () => closeModal(addMethodModal)
    );

    $("pawAddMethodCancel")?.addEventListener(
        "click",
        () => closeModal(addMethodModal)
    );

    $("pawPaymentMethodType")?.addEventListener(
        "change",
        updatePaymentMethodFields
    );


    /* =================================================
       15. CARD NUMBER FORMATTING
    ================================================= */

    $("pawPaymentCardNumber")?.addEventListener(
        "input",
        function () {

            let digits = this.value.replace(/\D/g, "").slice(0, 16);

            this.value = digits.replace(/(.{4})/g, "$1 ").trim();

        }
    );


    $("pawPaymentCardExpiry")?.addEventListener(
        "input",
        function () {

            let digits = this.value.replace(/\D/g, "").slice(0, 4);

            if (digits.length > 2) {
                digits = digits.slice(0, 2) + "/" + digits.slice(2);
            }

            this.value = digits;

        }
    );


    $("pawPaymentCardCvv")?.addEventListener(
        "input",
        function () {

            this.value = this.value.replace(/\D/g, "").slice(0, 4);

        }
    );


    /* =================================================
       16. SAVE PAYMENT METHOD
       Only masked details are kept in demo memory.
       Never save card number or CVV.
    ================================================= */

    function renderPaymentMethods() {

        const container = $("pawPaymentMethodList");

        if (!container) return;

        container.innerHTML = "";

        paymentMethods.forEach(method => {

            const element = document.createElement("div");

            element.className = "paw-payment-method-item";

            const brandClass =
                method.type === "UPI"
                    ? "upi"
                    : method.name.toLowerCase();

            const brandText =
                method.name === "Mastercard"
                    ? '<i class="fab fa-cc-mastercard"></i>'
                    : escapeHTML(method.name);

            element.innerHTML = `
                <span class="paw-payment-method-brand ${brandClass}">
                    ${brandText}
                </span>

                <div class="paw-payment-method-info">
                    <strong>${escapeHTML(method.detail)}</strong>
                    <small>
                        ${method.type === "UPI"
                            ? "UPI Account"
                            : "Expires " + escapeHTML(method.expiry)}
                    </small>
                </div>

                ${method.isDefault
                    ? '<span class="paw-payment-default">Default</span>'
                    : ""}

                <button type="button"
                        class="paw-payment-method-more"
                        data-method-action="menu"
                        data-method-id="${method.id}"
                        aria-label="Payment method options">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            `;

            container.appendChild(element);

        });
    }


    addMethodForm?.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const type = $("pawPaymentMethodType").value;

            if (type === "Card") {

                const number = $("pawPaymentCardNumber").value
                    .replace(/\s/g, "");

                const name = $("pawPaymentCardName").value.trim();
                const expiry = $("pawPaymentCardExpiry").value.trim();
                const cvv = $("pawPaymentCardCvv").value.trim();

                if (!name || number.length < 12 ||
                    !/^\d{2}\/\d{2}$/.test(expiry) ||
                    cvv.length < 3) {

                    alert("Please enter valid demo card details.");
                    return;
                }

                const lastFour = number.slice(-4);

                const defaultChecked = $("pawPaymentSetDefault").checked;

                if (defaultChecked) {
                    paymentMethods.forEach(item => {
                        item.isDefault = false;
                    });
                }

                paymentMethods.push({
                    id: nextMethodId++,
                    type: "Card",
                    name: "VISA",
                    detail: "•••• " + lastFour,
                    expiry: expiry,
                    isDefault: defaultChecked
                });

            } else if (type === "UPI") {

                const upi = $("pawPaymentUpiId").value.trim();

                if (!/^[\w.-]+@[\w.-]+$/.test(upi)) {
                    alert("Please enter a valid UPI ID.");
                    return;
                }

                const defaultChecked = $("pawPaymentSetDefault").checked;

                if (defaultChecked) {
                    paymentMethods.forEach(item => {
                        item.isDefault = false;
                    });
                }

                paymentMethods.push({
                    id: nextMethodId++,
                    type: "UPI",
                    name: "UPI",
                    detail: upi,
                    expiry: "",
                    isDefault: defaultChecked
                });

            } else {

                alert("Please select a payment method.");
                return;

            }

            renderPaymentMethods();
            closeModal(addMethodModal);
            addMethodForm.reset();
            updatePaymentMethodFields();

            alert(
                "Demo payment method added.\n" +
                "No sensitive card details have been stored."
            );

        }
    );


    /* =================================================
       17. PAYMENT METHOD OPTIONS
    ================================================= */

    $("pawPaymentMethodList")?.addEventListener(
        "click",
        function (event) {

            const button = event.target.closest("[data-method-action]");

            if (!button) return;

            const methodId = Number(button.dataset.methodId);

            const method = paymentMethods.find(
                item => item.id === methodId
            );

            if (!method) return;

            const action = prompt(
                "Payment Method: " + method.name + " " + method.detail +
                "\n\nEnter 1 to set as default." +
                "\nEnter 2 to remove this method." +
                "\n\nCancel to close."
            );

            if (action === "1") {

                paymentMethods.forEach(item => {
                    item.isDefault = item.id === methodId;
                });

                renderPaymentMethods();

            } else if (action === "2") {

                if (!confirm("Remove this payment method?")) return;

                paymentMethods = paymentMethods.filter(
                    item => item.id !== methodId
                );

                renderPaymentMethods();

            }

        }
    );


    /* =================================================
       18. VIEW ALL OUTSTANDING
    ================================================= */

    $("pawPaymentViewAllOutstanding")?.addEventListener(
        "click",
        function () {

            switchPaymentTab("invoices");

            if ($("pawInvoiceStatusFilter")) {
                $("pawInvoiceStatusFilter").value = "Pending";
            }

            filterInvoices();

            $("pawPaymentTransactionsCard")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );


    /* =================================================
       19. ESCAPE KEY
    ================================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key !== "Escape") return;

        closeModal($("pawPaymentDetailsModal"));
        closeModal($("pawAddMethodModal"));
        closeModal($("pawPaymentPayModal"));

    });


    /* =================================================
       20. INITIALIZE
    ================================================= */

    updateSummary();
    filterTransactions();
    renderPaymentHistory();
    renderOutstandingPayments();
    renderPaymentMethods();
    updatePaymentMethodFields();

});
