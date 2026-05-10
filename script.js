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
        semesters[sem].forEach(c => {
            allCourses.push(c.code);
            courseMap[c.code] = c;
        });
    }

    // ===== LIMPIEZA AUTOMÁTICA =====
    approved = approved.filter(code => allCourses.includes(code));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(approved));

    // ===== PRERREQUISITOS =====
    function isUnlocked(course) {
        const prereqOk = course.prereq.every(p => approved.includes(p));
        const creditsOk = course.minCredits
            ? calculateApprovedCredits() >= course.minCredits
            : true;
        return prereqOk && creditsOk;
    }

    // ===== DESAPROBACIÓN EN CASCADA =====
    function removeWithDependents(code) {
        const toRemove = new Set([code]);
        let changed = true;

        while (changed) {
            changed = false;
            approved.forEach(c => {
                const prereq = courseMap[c]?.prereq || [];
                if (prereq.some(p => toRemove.has(p)) && !toRemove.has(c)) {
                    toRemove.add(c);
                    changed = true;
                }
            });
        }

        approved = approved.filter(c => !toRemove.has(c));
    }

    // ===== CRÉDITOS =====
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

    // ===== PROGRESO =====
    function updateProgress() {
        const approvedCredits = calculateApprovedCredits();
        const totalCredits = calculateTotalCredits();

        const approvedCourses = approved.length;
        const totalCourses = allCourses.length;

        const percent = totalCredits === 0
            ? 0
            : ((approvedCredits / totalCredits) * 100).toFixed(1);

        progressFill.style.width = percent + "%";
        progressText.textContent = `Progreso: ${percent}%`;
        creditsText.innerHTML = `
            Créditos aprobados: ${approvedCredits} / ${totalCredits}<br>
            Ramos aprobados: ${approvedCourses} / ${totalCourses}
        `;
    }

    // ===== RENDER =====
    function render() {
        grid.innerHTML = "";

        for (let sem = 1; sem <= 11; sem++) {
            if (!semesters[sem]) continue;

            const semDiv = document.createElement("div");
            semDiv.className = "semester";

            const title = document.createElement("h2");
            title.textContent = `S${sem}`;
            semDiv.appendChild(title);

            semesters[sem].forEach(course => {
                const div = document.createElement("div");
                div.classList.add("course");

                if (course.code.startsWith("MAT")) div.classList.add("mat");
                if (course.code.startsWith("EIQ")) div.classList.add("eiq");
                if (course.code.startsWith("ING")) div.classList.add("ing");
                if (course.code.startsWith("QUI")) div.classList.add("qui");
                if (course.code.startsWith("FIS")) div.classList.add("fis");
                if (course.code.startsWith("FIN")) div.classList.add("fin");
                if (course.code.startsWith("ICA")) div.classList.add("ica");

                if (
                    course.code.startsWith("ICR") ||
                    course.code.startsWith("IER") ||
                    course.code.startsWith("FOFU")
                ) div.classList.add("rosado");

                if (
                    course.code.startsWith("OPT1") ||
                    course.code.startsWith("OPT2") ||
                    course.code.startsWith("OPT3")
                ) div.classList.add("opt");

                div.innerHTML = `
                    <strong>${course.code}</strong><br>
                    ${course.name}<br>
                    <small>${course.credits} créditos</small>
                `;

                const unlocked = isUnlocked(course);

                if (approved.includes(course.code)) {
                    div.classList.add("approved");
                } else if (unlocked) {
                    div.classList.add("available");
                } else {
                    div.classList.add("locked");
                }

                if (unlocked || approved.includes(course.code)) {
                    div.addEventListener("click", () => {
                        if (approved.includes(course.code)) {
                            removeWithDependents(course.code);
                        } else {
                            approved.push(course.code);
                        }

                        localStorage.setItem(
                            STORAGE_KEY,
                            JSON.stringify(approved)
                        );

                        render();
                    });
                }

                semDiv.appendChild(div);
            });

            grid.appendChild(semDiv);
        }

        updateProgress();
    }

    render();
});
