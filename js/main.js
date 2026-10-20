// ========================================
// CAMPUS EVENTS - MAIN JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Campus Events website loaded successfully.");


    // ========================================
    // EVENT PREVIEW BUTTON
    // ========================================

    const previewButton = document.querySelector(".preview-btn");

    if (previewButton) {

        previewButton.addEventListener("click", function () {

            window.location.href = "pages/event-details.html";

        });

    }


    // ========================================
    // EVENT SEARCH
    // ========================================

    const searchInput = document.getElementById("eventSearch");

    const eventCards = document.querySelectorAll(
        "#eventGrid .event-card"
    );


    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText =
                searchInput.value.toLowerCase().trim();


            eventCards.forEach(function (card) {

                const title =
                    card.dataset.title.toLowerCase();

                if (title.includes(searchText)) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    // ========================================
    // CATEGORY FILTER
    // ========================================

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Remove active class
            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            // Add active class to clicked button
            button.classList.add("active");


            const selectedCategory =
                button.dataset.category;


            eventCards.forEach(function (card) {

                const cardCategory =
                    card.dataset.category;


                if (
                    selectedCategory === "all" ||
                    cardCategory === selectedCategory
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

});
// ========================================
// EVENT REGISTRATION MODAL
// ========================================

const registerEventBtn =
    document.getElementById("registerEventBtn");

const registrationModal =
    document.getElementById("registrationModal");

const closeModal =
    document.getElementById("closeModal");

const registrationForm =
    document.getElementById("registrationForm");

const registrationSuccess =
    document.getElementById("registrationSuccess");

const closeSuccess =
    document.getElementById("closeSuccess");


if (registerEventBtn) {

    registerEventBtn.addEventListener("click", function () {

        registrationModal.classList.add("show");

    });

}


if (closeModal) {

    closeModal.addEventListener("click", function () {

        registrationModal.classList.remove("show");

    });

}


if (registrationModal) {

    registrationModal.addEventListener("click", function (event) {

        if (event.target === registrationModal) {

            registrationModal.classList.remove("show");

        }

    });

}


if (registrationForm) {

    registrationForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("studentName").value.trim();

        const email =
            document.getElementById("studentEmail").value.trim();

        const studentId =
            document.getElementById("studentId").value.trim();


        if (!name || !email || !studentId) {

            alert("Please fill in all required fields.");

            return;

        }


        registrationForm.style.display = "none";

        registrationSuccess.classList.add("show");

    });

}


if (closeSuccess) {

    closeSuccess.addEventListener("click", function () {

        registrationModal.classList.remove("show");

        registrationForm.reset();

        registrationForm.style.display = "block";

        registrationSuccess.classList.remove("show");

    });

}
// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value.trim();

        if (!email || !password) {

            alert("Please enter your email and password.");

            return;

        }

        alert("Login successful! Backend authentication will be connected later.");

    });

}


// ========================================
// REGISTER
// ========================================

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        

    });
        const fullName = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const studentId = document.getElementById("registerStudentId").value.trim();
        const year = document.getElementById("registerYear").value;
        const department = document.getElementById("registerDepartment").value;

        try {
            const response = await fetch(
                "https://college-event-management-production-ce99.up.railway.app/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fullName,
                        email,
                        studentId,
                        year,
                        department,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Registration failed.");
                return;
            }

            alert(data.message || "Account created successfully!");
            registerForm.reset();

        } catch (error) {
            console.error("Registration error:", error);
            alert("Could not connect to the server. Please try again.");
        }


}
// ========================================
// MY EVENTS - STATUS FILTER
// ========================================

const eventStatusFilter =
    document.getElementById("eventStatusFilter");

const registeredEventCards =
    document.querySelectorAll(
        ".registered-event-card"
    );


if (eventStatusFilter) {

    eventStatusFilter.addEventListener(
        "change",
        function () {

            const selectedStatus =
                eventStatusFilter.value;


            registeredEventCards.forEach(
                function (card) {

                    const cardStatus =
                        card.dataset.status;


                    if (
                        selectedStatus === "all" ||
                        selectedStatus === cardStatus
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                }
            );

        }
    );

}


// ========================================
// CANCEL REGISTRATION
// ========================================

const cancelButtons =
    document.querySelectorAll(
        ".cancel-btn"
    );


cancelButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const confirmation =
                confirm(
                    "Are you sure you want to cancel this registration?"
                );


            if (confirmation) {

                const card =
                    button.closest(
                        ".registered-event-card"
                    );

                card.remove();

                alert(
                    "Registration cancelled successfully."
                );

            }

        }
    );

});
// ========================================
// ADMIN EVENT MANAGEMENT
// ========================================

const adminEventSearch =
    document.getElementById("adminEventSearch");

const adminCategoryFilter =
    document.getElementById("adminCategoryFilter");

const adminStatusFilter =
    document.getElementById("adminStatusFilter");


const adminEventRows =
    document.querySelectorAll(
        "#adminEventsTable tr"
    );


function filterAdminEvents() {

    const searchText =
        adminEventSearch
            ? adminEventSearch.value.toLowerCase()
            : "";

    const category =
        adminCategoryFilter
            ? adminCategoryFilter.value
            : "all";

    const status =
        adminStatusFilter
            ? adminStatusFilter.value
            : "all";


    adminEventRows.forEach(function (row) {

        const eventName =
            row
                .querySelector("strong")
                .textContent
                .toLowerCase();

        const rowCategory =
            row.dataset.category;

        const rowStatus =
            row.dataset.status;


        const matchesSearch =
            eventName.includes(searchText);

        const matchesCategory =
            category === "all" ||
            rowCategory === category;

        const matchesStatus =
            status === "all" ||
            rowStatus === status;


        if (
            matchesSearch &&
            matchesCategory &&
            matchesStatus
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


if (adminEventSearch) {

    adminEventSearch.addEventListener(
        "input",
        filterAdminEvents
    );

}


if (adminCategoryFilter) {

    adminCategoryFilter.addEventListener(
        "change",
        filterAdminEvents
    );

}


if (adminStatusFilter) {

    adminStatusFilter.addEventListener(
        "change",
        filterAdminEvents
    );

}


// DELETE EVENT

const deleteEventButtons =
    document.querySelectorAll(
        ".delete-event-btn"
    );


deleteEventButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const row =
                button.closest("tr");

            const eventName =
                row.querySelector("strong")
                    .textContent;


            const confirmed =
                confirm(
                    `Are you sure you want to delete "${eventName}"?`
                );


            if (confirmed) {

                row.remove();

                alert(
                    "Event deleted successfully."
                );

            }

        }
    );

});


// EDIT EVENT

const editEventButtons =
    document.querySelectorAll(
        ".edit-event-btn"
    );


editEventButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const row =
                button.closest("tr");

            const eventName =
                row.querySelector("strong")
                    .textContent;


            alert(
                `Edit "${eventName}"\n\nThe full edit form will be connected in the next step.`
            );

        }
    );

});
// ========================================
// ADD EVENT FORM
// ========================================

const addEventForm =
    document.getElementById("addEventForm");

const eventCreatedSuccess =
    document.getElementById("eventCreatedSuccess");


if (addEventForm) {

    addEventForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const eventName =
                document.getElementById("eventName")
                    .value.trim();

            const description =
                document.getElementById("eventDescription")
                    .value.trim();

            const category =
                document.getElementById("eventCategory")
                    .value;

            const organizer =
                document.getElementById("eventOrganizer")
                    .value.trim();

            const date =
                document.getElementById("eventDate")
                    .value;

            const time =
                document.getElementById("eventTime")
                    .value;

            const venue =
                document.getElementById("eventVenue")
                    .value.trim();

            const capacity =
                document.getElementById("eventCapacity")
                    .value;


            if (
                !eventName ||
                !description ||
                !category ||
                !organizer ||
                !date ||
                !time ||
                !venue ||
                !capacity
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }


            eventCreatedSuccess.classList.add("show");

            addEventForm.style.display = "none";


            console.log("New Event Created:", {

                eventName,
                description,
                category,
                organizer,
                date,
                time,
                venue,
                capacity

            });

        }
    );

}


// ========================================
// LIVE EVENT PREVIEW
// ========================================

const previewName =
    document.getElementById("previewName");

const previewDescription =
    document.getElementById("previewDescription");

const previewCategory =
    document.getElementById("previewCategory");

const previewDate =
    document.getElementById("previewDate");

const previewTime =
    document.getElementById("previewTime");

const previewVenue =
    document.getElementById("previewVenue");


const previewNameInput =
    document.getElementById("eventName");

const previewDescriptionInput =
    document.getElementById("eventDescription");

const previewCategoryInput =
    document.getElementById("eventCategory");

const previewDateInput =
    document.getElementById("eventDate");

const previewTimeInput =
    document.getElementById("eventTime");

const previewVenueInput =
    document.getElementById("eventVenue");


if (previewNameInput) {

    previewNameInput.addEventListener(
        "input",
        function () {

            previewName.textContent =
                this.value ||
                "Your Event Name";

        }
    );

}


if (previewDescriptionInput) {

    previewDescriptionInput.addEventListener(
        "input",
        function () {

            previewDescription.textContent =
                this.value ||
                "Your event description will appear here.";

        }
    );

}


if (previewCategoryInput) {

    previewCategoryInput.addEventListener(
        "change",
        function () {

            previewCategory.textContent =
                this.options[
                    this.selectedIndex
                ].text.toUpperCase()
                || "CATEGORY";

        }
    );

}


if (previewDateInput) {

    previewDateInput.addEventListener(
        "change",
        function () {

            if (this.value) {

                const date =
                    new Date(
                        this.value + "T00:00:00"
                    );

                previewDate.textContent =
                    "📅 " +
                    date.toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        }
                    );

            }

        }
    );

}


if (previewTimeInput) {

    previewTimeInput.addEventListener(
        "change",
        function () {

            if (this.value) {

                const [hours, minutes] =
                    this.value.split(":");

                const date =
                    new Date();

                date.setHours(
                    hours,
                    minutes
                );

                previewTime.textContent =
                    "⏰ " +
                    date.toLocaleTimeString(
                        "en-US",
                        {
                            hour: "numeric",
                            minute: "2-digit"
                        }
                    );

            }

        }
    );

}


if (previewVenueInput) {

    previewVenueInput.addEventListener(
        "input",
        function () {

            previewVenue.textContent =
                "📍 " +
                (
                    this.value ||
                    "Event venue"
                );

        }
    );

}
// ========================================
// REGISTRATIONS
// ========================================

const registrationSearch =
    document.getElementById("registrationSearch");

const registrationEventFilter =
    document.getElementById("registrationEventFilter");

const registrationStatusFilter =
    document.getElementById("registrationStatusFilter");

const registrationRows =
    document.querySelectorAll(
        "#registrationTable tr"
    );


function filterRegistrations() {

    const searchText =
        registrationSearch
            ? registrationSearch.value.toLowerCase()
            : "";

    const selectedEvent =
        registrationEventFilter
            ? registrationEventFilter.value
            : "all";

    const selectedStatus =
        registrationStatusFilter
            ? registrationStatusFilter.value
            : "all";


    registrationRows.forEach(function (row) {

        const rowText =
            row.textContent.toLowerCase();

        const rowEvent =
            row.dataset.event;

        const rowStatus =
            row.dataset.status;


        const matchesSearch =
            rowText.includes(searchText);

        const matchesEvent =
            selectedEvent === "all" ||
            rowEvent === selectedEvent;

        const matchesStatus =
            selectedStatus === "all" ||
            rowStatus === selectedStatus;


        if (
            matchesSearch &&
            matchesEvent &&
            matchesStatus
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


if (registrationSearch) {

    registrationSearch.addEventListener(
        "input",
        filterRegistrations
    );

}


if (registrationEventFilter) {

    registrationEventFilter.addEventListener(
        "change",
        filterRegistrations
    );

}


if (registrationStatusFilter) {

    registrationStatusFilter.addEventListener(
        "change",
        filterRegistrations
    );

}


// VIEW REGISTRATION

const viewRegistrationButtons =
    document.querySelectorAll(
        ".view-registration-btn"
    );


viewRegistrationButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const row =
                button.closest("tr");

            const student =
                row.querySelector("strong")
                    .textContent;

            const cells =
                row.querySelectorAll("td");

            const email =
                cells[1].textContent.trim();

            const eventName =
                cells[2].textContent.trim();

            const registeredDate =
                cells[3].textContent.trim();


            alert(
                "REGISTRATION DETAILS\n\n" +
                "Student: " + student + "\n" +
                "Email: " + email + "\n" +
                "Event: " + eventName + "\n" +
                "Registered: " + registeredDate
            );

        }
    );

});