document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const progressText = document.getElementById("progress-text");
    const progressFill = document.getElementById("progress-fill");
    const creditsText = document.getElementById("credits-text");

    // ===== CLAVE LOCALSTORAGE ICQ =====
    const STORAGE_KEY = "approvedCourses_ICQ";

    // ===== CARGAR APROBADOS =====
    let approved = [];

    try {
        approved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        approved = [];
    }

    // ===== LISTA REAL DE RAMOS =====
    const allCourses = [];
    const courseMap = {};

    for (let sem in semesters) {
        semesters[sem].forEach(course => {
            allCourses.push(course.code);
            courseMap[course.code] = course;
        });
    }

    // ===== LIMPIEZA AUTOMÁTICA =====
    approved = approved.filter(code => allCourses.includes(code));

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(approved)
    );

    // =========================================================
    // ===== CRÉDITOS ==========================================
    // =========================================================

    function calculateApprovedCredits() {
        let total = 0;

        for (let sem in semesters) {
            semesters[sem].forEach(course => {
                if (approved.includes(course.code)) {
                    total += Number(course.credits) || 0;
                }
            });
        }

        return total;
    }

    function calculateTotalCredits() {
        let total = 0;

        for (let sem in semesters) {
            semesters[sem].forEach(course => {
                total += Number(course.credits) || 0;
            });
        }

        return total;
    }

    // =========================================================
    // ===== VALIDAR PRERREQUISITOS ============================
    // =========================================================

    function isUnlocked(course) {

        const prereqs = course.prereq || [];

        // Todos los prerrequisitos deben estar aprobados
        const prereqOk = prereqs.every(
            prereq => approved.includes(prereq)
        );

        // Créditos mínimos, si el ramo los requiere
        const creditsOk = course.minCredits
            ? calculateApprovedCredits() >= course.minCredits
            : true;

        return prereqOk && creditsOk;
    }

    // =========================================================
    // ===== DESAPROBACIÓN EN CASCADA ==========================
    // =========================================================

    function removeWithDependents(code) {

        const toRemove = new Set([code]);

        let changed = true;

        while (changed) {

            changed = false;

            approved.forEach(c => {

                const prereq =
                    courseMap[c]?.prereq || [];

                if (
                    prereq.some(p => toRemove.has(p)) &&
                    !toRemove.has(c)
                ) {
                    toRemove.add(c);
                    changed = true;
                }
            });
        }

        approved = approved.filter(
            c => !toRemove.has(c)
        );
    }

    // =========================================================
    // ===== ACTUALIZAR PROGRESO ===============================
    // =========================================================

    function updateProgress() {

        const approvedCredits =
            calculateApprovedCredits();

        const totalCredits =
            calculateTotalCredits();

        const approvedCourses =
            approved.length;

        const totalCourses =
            allCourses.length;

        const percent =
            totalCredits === 0
                ? 0
                : (
                    (approvedCredits / totalCredits) * 100
                ).toFixed(1);

        progressFill.style.width =
            percent + "%";

        progressText.textContent =
            `Progreso: ${percent}%`;

        creditsText.innerHTML = `
            Créditos aprobados:
            ${approvedCredits} / ${totalCredits}
            <br>
            Ramos aprobados:
            ${approvedCourses} / ${totalCourses}
        `;
    }

    // =========================================================
    // ===== RENDER PRINCIPAL ==================================
    // =========================================================

    function render() {

        grid.innerHTML = "";

        for (let sem = 1; sem <= 11; sem++) {

            if (!semesters[sem]) continue;

            const semDiv =
                document.createElement("div");

            semDiv.className =
                "semester";

            // ===== TÍTULO SEMESTRE =====

            const title =
                document.createElement("h2");

            title.textContent =
                `S${sem}`;

            semDiv.appendChild(title);

            // =================================================
            // ===== RAMOS =====================================
            // =================================================

            semesters[sem].forEach(course => {

                const div =
                    document.createElement("div");

                div.classList.add("course");

                // =================================================
                // ===== COLORES POR SIGLA ========================
                // =================================================

                if (course.code.startsWith("MAT"))
                    div.classList.add("mat");

                if (course.code.startsWith("EIQ"))
                    div.classList.add("eiq");

                if (course.code.startsWith("ING"))
                    div.classList.add("ing");

                if (course.code.startsWith("QUI"))
                    div.classList.add("qui");

                if (course.code.startsWith("FIS"))
                    div.classList.add("fis");

                if (course.code.startsWith("FIN"))
                    div.classList.add("fin");

                if (course.code.startsWith("ICA"))
                    div.classList.add("ica");

                if (
                    course.code.startsWith("ICR") ||
                    course.code.startsWith("IER") ||
                    course.code.startsWith("FOFU")
                ) {
                    div.classList.add("rosado");
                }

                if (
                    course.code.startsWith("OPT1") ||
                    course.code.startsWith("OPT2") ||
                    course.code.startsWith("OPT3")
                ) {
                    div.classList.add("opt");
                }

                // =================================================
                // ===== INFORMACIÓN DEL RAMO =====================
                // =================================================

                div.innerHTML = `
                    <strong>${course.code}</strong><br>
                    ${course.name}<br>
                    <small>${course.credits} créditos</small>
                `;

                // =================================================
                // ===== ESTADO DEL RAMO ==========================
                // =================================================

                const unlocked =
                    isUnlocked(course);

                if (approved.includes(course.code)) {

                    div.classList.add("approved");

                } else if (unlocked) {

                    div.classList.add("available");

                } else {

                    div.classList.add("locked");
                }

               // =================================================
// ===== BOTÓN PRERREQUISITOS =====================
// =================================================

const prereqs = course.prereq || [];

// Solo crear flecha si tiene prerrequisitos
if (prereqs.length > 0) {

    const prereqButton =
        document.createElement("button");

    prereqButton.className =
        "prereq-button";

    prereqButton.type =
        "button";

    prereqButton.textContent =
        "▼";

    // Evita que al tocar la flecha
    // se marque/desmarque el ramo
    prereqButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            const existing =
                div.querySelector(
                    ".prereq-container"
                );

            if (existing) {

                existing.remove();

                prereqButton.textContent =
                    "▼";

                return;
            }

            // ================================
            // CREAR PANEL
            // ================================

            const prereqContainer =
                document.createElement("div");

            prereqContainer.className =
                "prereq-container";

            const prereqTitle =
                document.createElement("div");

            prereqTitle.className =
                "prereq-title";

            prereqTitle.textContent =
                "Prerrequisitos:";

            prereqContainer.appendChild(
                prereqTitle
            );

            // ================================
            // MOSTRAR PRERREQUISITOS
            // ================================

            prereqs.forEach(req => {

                const item =
                    document.createElement("div");

                item.classList.add(
                    "prereq-item"
                );

                const reqCourse =
                    courseMap[req];

                const isApproved =
                    approved.includes(req);

                if (isApproved) {

                    item.classList.add(
                        "prereq-approved"
                    );

                } else {

                    item.classList.add(
                        "prereq-not-approved"
                    );
                }

                if (reqCourse) {

                    item.textContent =
                        `${req} - ${reqCourse.name}`;

                } else {

                    item.textContent =
                        req;
                }

                prereqContainer.appendChild(
                    item
                );
            });

            div.appendChild(
                prereqContainer
            );

            prereqButton.textContent =
                "▲";
        }
    );

    div.appendChild(
        prereqButton
    );
}

                // =================================================
                // ===== CLICK PARA APROBAR / DESAPROBAR ==========
                // =================================================

                if (
                    unlocked ||
                    approved.includes(course.code)
                ) {

                    div.addEventListener(
                        "click",
                        () => {

                            if (
                                approved.includes(
                                    course.code
                                )
                            ) {

                                removeWithDependents(
                                    course.code
                                );

                            } else {

                                approved.push(
                                    course.code
                                );
                            }

                            localStorage.setItem(
                                STORAGE_KEY,
                                JSON.stringify(
                                    approved
                                )
                            );

                            render();
                        }
                    );
                }

                semDiv.appendChild(div);
            });

            grid.appendChild(semDiv);
        }

        updateProgress();
    }

    render();
});
