// Imports
var express = require("express");
var cors = require("cors");

// Express app initialization
var app = express();
app.use(express.json());
app.use(cors());
app.listen(3000, () => console.log("Server running on port 3000"));

// Constants declarations
const ciudades = [
    "Buenos Aires (Argentina)",
    "Shanghai (China)",
    "Tokio (Japón)",
    "Bruselas (Bélgica)",
    "Roma (Italia)",
    "Pekin (China)",
    "Moscu (Rusia)",
    "Milan (Italia)",
    "Fukuoka (Japón)",
    "Barcelona (España)",
    "El Cairo (Egipto)",
    "Abu Dabi (Emiratos Árabes Unidos)",
    "Hong Kong (China)",
    "San Petesburgo (Rusia)",
    "Estocolmo (Suecia)",
    "Londres (Inglaterra)",
    "Tianjin (China)",
    "Berlin (Alemania)",
    "Nagoya (Japón)",
    "Chongqing (China)",
    "Glasgow (Escocia)",
    "Wuhan (China)",
    "Hangzhou (China)",
    "Varsovia (Polonia)",
    "Riad (Arabia Saudí)",
    "Qingdao (China)",
    "Nanking (China)",
    "Dalian (China)",
    "Delhi (India)",
    "Tel Aviv (Israel)",
    "Praga (República Checa)",
    "Kiev (Ucrania)",
    "Kuwait (Kuwait)",
    "Bombay (India)",
    "Taipei (Taiwan)",
    "Dublin (Irlanda)",
    "Seul (Corea del Sur)",
    "Copenhague (Dinamarca)",
    "Singapur (Singapur)",
    "Estambul (Turquía)",
    "Busan (Corea del Sur)",
    "Kuala Lumpur (Malasia)",
    "Amsterdam (Paises Bajos)",
    "Yakarta (Indonesia)",
    "Paris (Francia)",
    "Bangkok (Tailandia)",
    "Viena (Austria)",
    "Atenas (Grecia)",
    "Johannesburgo (Sudáfrica)",
    "Birmingham (Inglaterra)",
    "Budapest (Hungria)",
    "Colonia (Alemania)",
    "Lille (Francia)",
    "Frackfurt (Alemania)",
    "Lagos (Nigeria)",
    "Abiyan (Costa de Marfil)",
    "Sydney (Australia)",
    "Lyon (Francia)",
    "Melbourne (Australia)",
    "Nueva York (EEUU)",
    "Toronto (Canada)",
    "Manila (Filipinas)",
    "Montreal (Canadá)",
    "Los Angeles (EEUU)",
    "Chicago (EEUU)",
    "San Francisco (EEUU)",
    "Miami (EEUU)",
    "Washington DC (EEUU)",
    "Las Vegas (EEUU)",
    "Boston (EEUU)",
    "Houston (EEUU)",
    "Seattle (EEUU)",
    "Nueva Orleans (EEUU)",
    "Dallas (EEUU)",
    "Atlanta (EEUU)",
    "Filadelfia (EEUU)",
    "Portland (EEUU)",
    "Baltimore (EEUU)",
    "Sacramento (EEUU)",
    "San Diego (EEUU)",
    "Denver (EEUU)",
    "Detroit (EEUU)",
    "Orlando (EEUU)",
    "Kansas City (EEUU)",
    "Columbus (EEUU)",
    "Phoenix (EEUU)",
    "San Luis (EEUU)",
    "Nashville (EEUU)",
    "Cincinatti (EEUU)",
    "Milwaukke (EEUU)",
    "El Paso (EEUU)",
    "Rio de Janeiro (Brasil)",
    "Lima (Perú)",
    "Sao Paulo (Brasil)",
    "Bogota (Colombia)",
    "Brasilia (Brasil)",
    "Ciudad de México (México)",
    "Monterrey (México)",
    "Lisboa (Portugal)",
    "Madrid (España)"
]

const traducciones = {
    'en': {
        'titles': {'app-title': 'Angular Project Module 3'},
        'labels': {'language': 'Language', 'name': 'Name', 'url': 'Image URL', 'services': 'Services', 'description': 'Description'},
        'services': {'housekeeping': 'Housekeeping', 'bed': 'Bed', 'wifi': 'WiFi'},
        'messages': {
            'error': {
                'required': 'Required',
                'invalid-name': 'Invalid name (must have at least {{value}} characters)',
                'min-suggest-name': 'Write a minimum of {{value}} characters to enable suggestions',
                'no-suggestions': 'No suggestions',
            }
        },
        'buttons': {'delete': 'Delete', 'details': 'Details', 'save': 'Save'},
    },
    'es': {
        'titles': {'app-title': 'Proyecto Angular Módulo 3'},
        'labels': {'language': 'Idioma', 'name': 'Nombre', 'url': 'URL de la imagen', 'services': 'Servicios', 'description': 'Descripción'},
        'services': {'housekeeping': 'Limpieza', 'bed': 'Cama', 'wifi': 'WiFi'},
        'messages': {
            'error': {
                'required': 'Requerido',
                'invalid-name': 'Nombre inválido (debe tener al menos {{value}} caracteres)',
                'min-suggest-name': 'Escriba un mínimo de {{value}} caracteres para habilitar sugerencias',
                'no-suggestions': 'No hay sugerencias',
            }
        },
        'buttons': {'delete': 'Borrar', 'details': 'Detalles', 'save': 'Guardar'},
    },
    'de': {
        'titles': {'app-title': 'Angular Projekt Modul 3'},
        'labels': {'language': 'Sprache', 'name': 'Name', 'url': 'Bild URL', 'services': 'Services', 'description': 'Beschreibung'},
        'services': {'housekeeping': 'Reinigung', 'bed': 'Bett', 'wifi': 'WiFi'},
        'messages': {
            'error': {
                'required': 'Obligatorische',
                'invalid-name': 'Ungültiger Name (muss mindestens {{value}} Zeichen haben)',
                'min-suggest-name': 'Schreiben Sie mindestens {{value}} Zeichen, um Vorschläge zu aktivieren',
                'no-suggestions': 'Keine Vorschläge',
            }
        },
        'buttons': {'delete': 'Löschen', 'details': 'Einzelheiten', 'save': 'Speichern'},
    }
}

var misDestinos = [
    {nombre: "Fukuoka (Japón)", url: 'https://i.ytimg.com/vi/_8-bz3lZFLs/maxresdefault.jpg'},
    {nombre: "Berlin (Alemania)", url: 'https://blog.gaijinpot.com/app/uploads/sites/4/2014/12/fukuoka-tower.jpg'},
];

app.get("/my", (req, res, next) => res.json(misDestinos));
app.post("/my", (req, res, next) => {
    console.log(req.body);
    misDestinos.push(req.body.nuevo);
    res.json(misDestinos);
});
app.delete("/my", (req, res, next) => {
    console.log(req.body);
    const id = JSON.stringify(req.body.id);
    misDestinos.filter(d => d.id != id);
    res.json(misDestinos);
});


// Gets all the city suggestions
app.get("/url", (req, res, next) => res.json(ciudades));

// Gets the suggested cities (for typeahead) given a string
app.get("/ciudades", (req, res, next) => {
    const text = req.query.q.toString().toLowerCase();
    res.json(
        ciudades.filter(elem => elem.toLowerCase().indexOf(text) != -1)
        );
    });

// Gets the translations in a given language
app.get("/api/translation", (req, res, next) => {
    console.log(req.query.lang);
    res.json(traducciones[req.query.lang]);
});