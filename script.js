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
    let previousSize = -1; // Initialize with a value that won't match any size
    for (let i = 0; i < days; i++) {
        let dailyTopics;
        let attempts = 0;
        do {
            dailyTopics = shuffleArray([...topics]).slice(0, getRandomInt(13, 22));
            attempts++;
            console.log(`Attempt ${attempts}: ${dailyTopics.length} topics`);
            if (attempts > 1000) {
                alert('Exceeded limit of attempts');
                return;
            }
        } while (
            isSimilarToAnyDay(dailyTopics, allDaysTopics) ||
            dailyTopics.length === previousSize // Ensure it's not the same size as the previous day's topics
        );
        previousSize = dailyTopics.length; // Update the size for the next iteration
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
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(num);
    return num;
}

function isSimilarToAnyDay(dailyTopics, allDaysTopics) {
    return allDaysTopics.some(dayTopics => {
        const intersection = dailyTopics.filter(topic => dayTopics.includes(topic));
        return intersection.length > 14; // Adjust the threshold if needed
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
