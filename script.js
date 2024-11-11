// Inicializa el mapa centrado en una ubicación (Madrid por defecto)
var map = L.map('map').setView([39.22602289889401, -0.5196093152681471], 13);  

// Definir la capa de mapa base (OpenStreetMap)
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
});

// Definir la capa de satélite (Esri)
var esriSatelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Map data © OpenStreetMap contributors, Esri, Maxar, Earthstar Geographics, and the GIS User Community'
});

// Añadir la capa OSM por defecto al mapa
osmLayer.addTo(map);

// Definir puntos con coordenadas, mensaje y contraseña única para cada punto
const puntos = [
    { lat: 39.23509070281437, lon: -0.52382259080081, mensaje: "Punt 1. <br>PISTA: Arbre 4", password: "porrompompero", valor: "Recollida de menjar per a una ONG" },
    { lat: 39.22760969763428, lon: -0.5192457369932357, mensaje: "Punt 2. <br>PISTA: Arbustos", password: "bocadillodetortilla", valor: "Olimpiades" },
    { lat: 39.219924317097956, lon: -0.5191564105012296, mensaje: "Punt 3. <br>PISTA: Font", password: "escauts", valor: "Gymkana oberta al poble"},
    { lat: 39.22985874271473, lon: -0.5244855937522747, mensaje: "Punt 4. <br>PISTA: Porta", password: "peroelbrownienoeraunpostre", valor: "Podcast"},
    { lat: 39.22661251523016, lon: -0.524963760799067, mensaje: "Punt 5. <br>PISTA: Escales", password: "estaniteiximdearanya", valor: "Spar benèfic per al poble"}
];

// Añadir marcadores para cada punto en el mapa
puntos.forEach(function(punto) {
    var marker = L.marker([punto.lat, punto.lon]).addTo(map);
    marker.bindPopup(`
        <div class="popup-content">
            <p>${punto.mensaje}</p>
            <input type="password" class="passwordInput" placeholder="Contrasenya" />
            <button onclick="checkPassword(this, '${punto.password}', '${punto.valor}')">Veure empresa</button>
            <p class="responseMessage"></p>
        </div>
    `);
});

// Función para verificar la contraseña específica de cada punto
function checkPassword(button, correctPassword, valor) {
    var input = button.previousElementSibling.value; // Obtiene el valor del input anterior
    var responseMessage = button.nextElementSibling; // Obtiene el mensaje de respuesta

    if(input === correctPassword) {
        // Mensaje de éxito
        responseMessage.textContent = "Contrasenya correcta! si heu fet trampes ens anem a enterar!";
        responseMessage.style.color = "green";

        // Añadir un campo de texto adicional con el valor correspondiente al punto
        var additionalTextField = document.createElement("textarea");
        additionalTextField.value = valor; // Usar el valor único para cada punto
        additionalTextField.disabled = true; // Hacer que el campo sea de solo lectura

        // Insertar el campo de texto al popup
        button.parentElement.appendChild(additionalTextField);
    } else {
        responseMessage.textContent = "Contraseña incorrecta. xe, busque-ho i no s'ho inventeu, canalles!";
        responseMessage.style.color = "red";
    }
}
// Añadir el control de capas para alternar entre el mapa OSM y la vista satélite Esri
var baseMaps = {
    "Mapa normal": osmLayer,
    "Mapa Satèlit": esriSatelliteLayer
};

// Añadir el control de capas al mapa
var layersControl = L.control.layers(baseMaps);
layersControl.addTo(map);

// Mostrar el control en la consola para verificar si está siendo añadido
console.log("Control de capas añadido:", layersControl);