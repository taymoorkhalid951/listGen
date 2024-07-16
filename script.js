// OLD TOPICS (60)

// const topics = [
//     "Despido injustificado", "Robo con violencia", "Custodia de menores", "Accidente de tráfico",
//     "Arrendamiento", "Incumplimiento de contrato", "Acoso laboral", "Divorcio contencioso",
//     "Daños por colisión", "Usurpación", "Tráfico de drogas", "Mediación familiar",
//     "Multas de tráfico", "Propiedad intelectual", "Derechos de licencia por maternidad/paternidad",
//     "Pago de horas extras", "Fraude", "Pensión alimenticia", "Seguro de auto", "Venta de inmuebles",
//     "Negligencia profesional", "Contratación temporal", "Violencia doméstica", "Conducción bajo influencia",
//     "Expropiación", "Violación", "Disputas de herencia", "Licencias de conducir suspendidas",
//     "Zonas de conservación", "Beneficios y compensaciones laborales", "Evaluaciones de desempeño injustas",
//     "Homicidio culposo", "Cambio de nombre", "Renovación de contratos de arrendamiento",
//     "Litigios contractuales", "Condiciones de trabajo inseguras", "Lesiones personales en accidentes",
//     "Reconocimiento de paternidad", "Competencia desleal", "Venta de vehículos defectuosos",
//     "Tutela de menores", "Desalojos", "Procedimientos disciplinarios", "Derecho de paso",
//     "Protección al consumidor", "Discriminación en el trabajo", "Separación legal",
//     "Licencias comerciales", "Vandalismo", "Adopción", "Reclamaciones de seguro",
//     "Disputas de copropiedad", "Quiebra", "Reclamaciones por lesiones en el trabajo",
//     "Delitos cibernéticos", "Robo de vehículo", "Asalto", "Tráfico de personas", "Extorsión",
//     "Acuerdos de no competencia", "Falsificación de documentos laborales"
// ];

// NEW TOPICS (30)

const topics = [
    "Despido injustificado",
    "Custodia de menores",
    "Incumplimiento de contrato",
    "Acoso laboral",
    "Divorcio contencioso",
    "Pago de horas extras",
    "Pensión alimenticia",
    "Venta de inmuebles",
    "Violencia doméstica",
    "Disputas de herencia",
    "Licencias de conducir suspendidas",
    "Beneficios y compensaciones laborales",
    "Separación legal",
    "Registros Mercantiles",
    "Registro a cámaras de comercio",
    "Importación / Exportación",
    "Demandas laborales",
    "Incapacidades e indemnizaciones",
    "Incapacidad parcial o permanentes",
    "Escrituraciones",
    "Planos",
    "Demarcación de propiedades",
    "Representaciones en tribunales",
    "Defensas y acusaciones",
    "Matrimonios / Divorcios",
    "Patria potestad de hijos",
    "Obligaciones conyugales",
    "Herencias de propiedad",
    "Traspasos",
    "compra/venta",
    "Ley de tránsito y multas"
];



const startButton = document.getElementById('startButton');
const resultsContainer = document.getElementById('results');

startButton.addEventListener('click', () => {
    resultsContainer.innerHTML = '';
    const allDaysTopics = generateUniqueDailyTopics(30);
    displayResults(allDaysTopics);
});

function generateUniqueDailyTopics(days) {
    const allDaysTopics = [];
    for (let i = 0; i < days; i++) {
        let dailyTopics;
        let attempts = 0;
        do {
            dailyTopics = shuffleArray(shuffleArray([...topics])).slice(0, getRandomInt(13, 23));
            attempts++;
            if(attempts > 1000) {
                alert('Exceeded Limit of attempts');
                return;
            }
        } while (isSimilarToAnyDay(dailyTopics, allDaysTopics));
        allDaysTopics.push(dailyTopics);
    }
    return allDaysTopics;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function isSimilarToAnyDay(dailyTopics, allDaysTopics) {
    return allDaysTopics.some(dayTopics => {
        const intersection = dailyTopics.filter(topic => dayTopics.includes(topic));
        return intersection.length > 8;
    });
}

function displayResults(allDaysTopics) {
    allDaysTopics.forEach((dailyTopics, index) => {
        const dayTitle = document.createElement('h3');
        dayTitle.innerText = `Día ${index + 1}`;
        resultsContainer.appendChild(dayTitle);

        const dayList = document.createElement('ul');
        dailyTopics.forEach(topic => {
            const listItem = document.createElement('li');
            listItem.innerText = topic;
            dayList.appendChild(listItem);
        });
        resultsContainer.appendChild(dayList);
    });
    allDaysTopics.forEach((dailyTopics, index) => {
        const arrayContainer = document.createElement('div');
        const isLastDay = index === allDaysTopics.length - 1;
    
        if (isLastDay) {
            arrayContainer.innerText = `"Día ${index + 1}": ${JSON.stringify(dailyTopics)}`;
        } else {
            arrayContainer.innerText = `"Día ${index + 1}": ${JSON.stringify(dailyTopics)},`;
        }
    
        resultsContainer.appendChild(arrayContainer);
    });
    
}
