const semesters = {
    1: [
        { code: "EIQ110", name: "Fundamentos de Procesos Químicos", prereq: [], credits: 2 },
        { code: "FIN100", name: "Desarrollo Integral y Comunicación Para Ingeniería", prereq: [], credits: 3 },
        { code: "MAT1001", name: "Fundamentos de Matematicas para Ingenieria", prereq: [], credits: 6 },
        { code: "QUI100", name: "Quimica para Ingenieria", prereq: [], credits: 5 },
        { code: "IER010", name: "Antropologia Cristiana", prereq: [], credits: 2 }
    ],
    2: [
        { code: "EIQ120", name: "Fundamentos de Ingeniería", prereq: [], credits: 4 },
        { code: "MAT1002", name: "Cálculo Diferencial e Integral", prereq: ["MAT1001"], credits: 6 },
        { code: "QUI161", name: "Química Inorgánica", prereq: ["QUI100"], credits: 5 },
        { code: "FOFU1", name: "Formacion Fundamental 1", prereq: [], credits: 2 }
    ],
    3: [
        { code: "EIQ220", name: "Balance de Materia", prereq: ["EIQ120"], credits: 4 },
        { code: "FIS1002", name: "Física para Ingeniería", prereq: ["MAT1002"], credits: 5 },
        { code: "ICA213", name: "Economía", prereq: ["MAT1001"], credits: 3 },
        { code: "ING9001", name: "Inglés 1", prereq: [], credits: 2 },
        { code: "MAT1003", name: "Cálculo en Varias Variables", prereq: ["MAT1002"], credits: 4 }
    ],
    4: [
        { code: "EIQ242", name: "Elementos de Fisico química", prereq: ["EIQ120"], credits: 4 },
        { code: "EIQ263", name: "Química Orgánica Industrial", prereq: ["QUI100"], credits: 5 },
        { code: "EIQ288", name: "Métodos Estadísticos en Ingeniería", prereq: ["MAT1003"], credits: 4 },
        { code: "ING9002", name: "Inglés 2", prereq: ["ING9001"], credits: 2 },
        { code: "MAT1005", name: "Ecuaciones Diferenciales", prereq: ["MAT1003"], credits: 4 }
    ],
    5: [
        { code: "EIQ262", name: "Ciencia de Materiales", prereq: ["QUI161"], credits: 4 },
        { code: "EIQ311", name: "Termodinámica de Procesos", prereq: ["EIQ242"], credits: 4 },
        { code: "EIQ312", name: "Administración de la Producción", prereq: ["ICA213"], credits: 3 },
        { code: "EIQ314", name: "Interpretación de Planos", prereq: ["EIQ220"], credits: 3 },
        { code: "ING9003", name: "Inglés 3", prereq: ["ING9002"], credits: 2 },
        { code: "FOFU2", name: "Formacion Fundamental 2", prereq: [], credits: 2 }
    ],
    6: [
        { code: "EIQ356", name: "Mecánica de Fluidos", prereq: ["FIS1002"], credits: 4 },
        { code: "EIQ359", name: "Termodinámica del Equilibrio", prereq: ["EIQ311"], credits: 4 },
        { code: "EIQ366", name: "Métodos Numéricos", prereq: ["MAT1005"], credits: 4 },
        { code: "EIQ377", name: "Sistemas Eléctricos de Procesos", prereq: ["FIS1002"], credits: 4 },
        { code: "ING9004", name: "Inglés 4", prereq: ["ING9003"], credits: 2 }
    ],
    7: [
        { code: "EIQ415", name: "Lab. Química Aplicada", prereq: ["EIQ263"], credits: 4 },
        { code: "EIQ416", name: "Prevención de Riesgos Industriales", prereq: ["EIQ312"], credits: 3 },
        { code: "EIQ432", name: "Cálculo de Procesos Químicos", prereq: ["EIQ311"], credits: 5 },
        { code: "EIQ453", name: "Transferencia de Calor", prereq: ["EIQ356"], credits: 4 },
        { code: "FOFU3", name: "Formacion Fundamental 3", prereq: [], credits: 2 },
        { code: "OPT1", name: "Optativo 1", prereq: [], credits: 2 }
    ],
    8: [
        { code: "EIQ451", name: "Transferencia de Masa", prereq: ["EIQ359"], credits: 4 },
        { code: "EIQ474", name: "Reactores Químicos 1", prereq: ["EIQ359"], credits: 4 },
        { code: "EIQ476", name: "Ingeniería Económica", prereq: ["EIQ312"], credits: 3 },
        { code: "EIQ492", name: "Electroquímica", prereq: ["EIQ359"], credits: 4 },
        { code: "IER020", name: "Etica cristiana", prereq: [], credits: 2 },
        { code: "OPT2", name: "Optativo 2", prereq: [], credits: 2 }
    ],
    9: [
        { code: "EIQ500", name: "Simulación de Procesos", prereq: ["EIQ366"], credits: 4 },
        { code: "EIQ514", name: "Procesos de Separación", prereq: ["EIQ451"], credits: 5 },
        { code: "EIQ518", name: "Diseño de Equipos", prereq: ["EIQ262"], credits: 3 },
        { code: "EIQ526", name: "Ingeniería Ambiental", prereq: ["EIQ416"], credits: 4 },
        { code: "EIQ536", name: "Reactores Químicos 2", prereq: ["EIQ474"], credits: 4 }
    ],
    10: [
        { code: "EIQ553", name: "Control de Procesos Químicos", prereq: ["EIQ432"], credits: 5 },
        { code: "EIQ577", name: "Diseño de Plantas", prereq: ["EIQ476"], credits: 3 },
        { code: "EIQ582", name: "Proyecto de Título 1", prereq: [], minCredits: 155, credits: 6 },
        { code: "EIQ597", name: "Lab. Operaciones Unitarias", prereq: ["EIQ451"], credits: 4 },
        { code: "OPT3", name: "Optativo 3", prereq: [], credits: 2 }
    ],
    11: [
        { code: "EIQ625", name: "Proyecto de Título 2", prereq: ["EIQ582"], credits: 16 }
    ]
};
