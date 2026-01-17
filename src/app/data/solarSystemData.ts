export interface CelestialBody {
    id: string;
    name: string;
    type: "star" | "terrestrial" | "gas-giant" | "ice-giant";
    accentColor: string;
    image: string; // 2K texture for 3D sphere
    panelImage: string; // Original photo for info panel
    narrative: string;
    narrativePosition: "center" | "left" | "right";
    description: string;
    facts: string[];
    // Sun-specific
    age?: string;
    surfaceTemp?: string;
    coreTemp?: string;
    // Planet-specific
    diameter?: string;
    mass?: string;
    distanceFromSun?: string;
    orbitalPeriod?: string;
    dayLength?: string;
    temperature?: string;
}

export const solarSystem: CelestialBody[] = [
    {
        id: "sun",
        name: "The Sun",
        type: "star",
        accentColor: "#FDB813",
        image: "/Texture/solar_011_sun.png",
        panelImage: "/images/solar_01_sun.jpg",
        narrative: "The Sun. Heart of Our Solar System.",
        narrativePosition: "center",
        age: "4.6 Billion Years",
        diameter: "1.39 Million km",
        mass: "1.989 × 10³⁰ kg",
        surfaceTemp: "5,500°C",
        coreTemp: "15 Million °C",
        description:
            "The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun radiates energy mainly as visible light, ultraviolet light, and infrared radiation, and is the most important source of energy for life on Earth.",
        facts: [
            "Produces enough energy every second to power Earth for 500,000 years",
            "Light takes 8 minutes 20 seconds to reach Earth",
            "Will continue burning for another 5 billion years",
            "Contains 99.86% of all mass in our solar system",
        ],
    },
    {
        id: "mercury",
        name: "Mercury",
        type: "terrestrial",
        accentColor: "#8C7853",
        image: "/Texture/solar_022_mercury.png",
        panelImage: "/images/solar_02_mercury.jpg",
        narrative: "The Swift Messenger. Closest to the Sun.",
        narrativePosition: "left",
        diameter: "4,879 km",
        mass: "3.285 × 10²³ kg",
        distanceFromSun: "57.9 Million km",
        orbitalPeriod: "88 Earth Days",
        dayLength: "59 Earth Days",
        temperature: "-180°C to 430°C",
        description:
            "Mercury is the smallest planet in our solar system and the closest to the Sun. Despite its proximity to the Sun, Mercury is not the hottest planet - that title goes to Venus. Mercury's surface resembles that of Earth's Moon, scarred by many impact craters.",
        facts: [
            "Has no atmosphere to retain heat, causing extreme temperature swings",
            "A year on Mercury is only 88 Earth days",
            "Has been visited by only two spacecraft: Mariner 10 and MESSENGER",
            "Named after the Roman messenger god for its swift orbit",
        ],
    },
    {
        id: "venus",
        name: "Venus",
        type: "terrestrial",
        accentColor: "#FFC649",
        image: "/Texture/solar_033_venus.png",
        panelImage: "/images/solar_03_venus.jpg",
        narrative: "Earth's Twin. Veiled in Mystery.",
        narrativePosition: "right",
        diameter: "12,104 km",
        mass: "4.867 × 10²⁴ kg",
        distanceFromSun: "108.2 Million km",
        orbitalPeriod: "225 Earth Days",
        dayLength: "243 Earth Days",
        temperature: "465°C Average",
        description:
            "Venus is Earth's closest planetary neighbor and is sometimes called Earth's twin because of their similar size and mass. However, Venus has a dense, toxic atmosphere filled with carbon dioxide and thick clouds of sulfuric acid, making it the hottest planet in our solar system.",
        facts: [
            "Rotates in the opposite direction to most planets",
            "A day on Venus is longer than its year",
            "Surface pressure is 92 times that of Earth",
            "Named after the Roman goddess of love and beauty",
        ],
    },
    {
        id: "earth",
        name: "Earth",
        type: "terrestrial",
        accentColor: "#4A90E2",
        image: "/Texture/solar_044_earth.png",
        panelImage: "/images/solar_04_earth.png",
        narrative: "Our Blue Marble. The Only Known Life.",
        narrativePosition: "center",
        diameter: "12,742 km",
        mass: "5.972 × 10²⁴ kg",
        distanceFromSun: "149.6 Million km",
        orbitalPeriod: "365.25 Days",
        dayLength: "24 Hours",
        temperature: "-89°C to 57°C",
        description:
            "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth's surface is water-covered, which is why it appears blue from space. Earth's atmosphere and magnetic field protect life from harmful solar radiation.",
        facts: [
            "The only planet not named after a Greek or Roman deity",
            "Has a powerful magnetic field that protects us from solar winds",
            "Earth's rotation is gradually slowing down",
            "Home to over 8 million species of life",
        ],
    },
    {
        id: "mars",
        name: "Mars",
        type: "terrestrial",
        accentColor: "#E27B58",
        image: "/Texture/solar_055_mars.png",
        panelImage: "/images/solar_05_mars.png",
        narrative: "The Red Planet. Future Frontier.",
        narrativePosition: "right",
        diameter: "6,779 km",
        mass: "6.39 × 10²³ kg",
        distanceFromSun: "227.9 Million km",
        orbitalPeriod: "687 Earth Days",
        dayLength: "24h 37m",
        temperature: "-125°C to 20°C",
        description:
            "Mars is the fourth planet from the Sun and is often called the Red Planet due to iron oxide (rust) on its surface. Mars has the largest volcano and canyon in the solar system - Olympus Mons and Valles Marineris. Scientists believe Mars once had liquid water on its surface.",
        facts: [
            "Has the largest volcano in the solar system: Olympus Mons",
            "Home to the longest canyon: Valles Marineris",
            "Has two small moons: Phobos and Deimos",
            "Multiple rovers are currently exploring its surface",
        ],
    },
    {
        id: "jupiter",
        name: "Jupiter",
        type: "gas-giant",
        accentColor: "#C88B3A",
        image: "/Texture/solar_066_jupiter.png",
        panelImage: "/images/solar_06_jupiter.png",
        narrative: "King of Planets. Storm Giant.",
        narrativePosition: "center",
        diameter: "139,820 km",
        mass: "1.898 × 10²⁷ kg",
        distanceFromSun: "778.5 Million km",
        orbitalPeriod: "11.86 Earth Years",
        dayLength: "9h 56m",
        temperature: "-110°C Average",
        description:
            "Jupiter is the largest planet in our solar system and is a gas giant composed primarily of hydrogen and helium. Its most famous feature is the Great Red Spot, a giant storm that has been raging for hundreds of years. Jupiter has at least 95 known moons.",
        facts: [
            "The Great Red Spot is a storm larger than Earth",
            "Has at least 95 moons, including the four large Galilean moons",
            "Could fit over 1,300 Earths inside it",
            "Has the strongest magnetic field of any planet",
        ],
    },
    {
        id: "saturn",
        name: "Saturn",
        type: "gas-giant",
        accentColor: "#FAD5A5",
        image: "/Texture/solar_077_saturn.png",
        panelImage: "/images/solar_07_saturn.png",
        narrative: "Lord of the Rings. Majestic Beauty.",
        narrativePosition: "left",
        diameter: "116,460 km",
        mass: "5.683 × 10²⁶ kg",
        distanceFromSun: "1.43 Billion km",
        orbitalPeriod: "29.46 Earth Years",
        dayLength: "10h 42m",
        temperature: "-140°C Average",
        description:
            "Saturn is the sixth planet from the Sun and is famous for its spectacular ring system. The rings are made mostly of ice particles, rocky debris, and dust. Saturn is a gas giant like Jupiter, composed mainly of hydrogen and helium.",
        facts: [
            "Its rings span up to 282,000 km but are only 10 meters thick",
            "Saturn is less dense than water - it would float!",
            "Has 146 known moons, including Titan with its thick atmosphere",
            "Winds can reach up to 1,800 km/h near its equator",
        ],
    },
    {
        id: "uranus",
        name: "Uranus",
        type: "ice-giant",
        accentColor: "#4FD0E7",
        image: "/Texture/solar_088_uranus.png",
        panelImage: "/images/solar_08_uranus.png",
        narrative: "The Tilted Ice Giant.",
        narrativePosition: "right",
        diameter: "50,724 km",
        mass: "8.681 × 10²⁵ kg",
        distanceFromSun: "2.87 Billion km",
        orbitalPeriod: "84 Earth Years",
        dayLength: "17h 14m",
        temperature: "-195°C Average",
        description:
            "Uranus is the seventh planet from the Sun and is classified as an ice giant. It has the most extreme axial tilt of any planet, rotating on its side at 98 degrees. This unusual tilt causes extreme seasons that last over 20 years each.",
        facts: [
            "Rotates on its side with an axial tilt of 98 degrees",
            "Has 13 known rings, discovered in 1977",
            "The coldest planetary atmosphere in the solar system",
            "First planet discovered using a telescope (1781)",
        ],
    },
    {
        id: "neptune",
        name: "Neptune",
        type: "ice-giant",
        accentColor: "#4166F5",
        image: "/Texture/solar_099_neptune.png",
        panelImage: "/images/solar_09_neptune.png",
        narrative: "The Deep Blue Mystery.",
        narrativePosition: "center",
        diameter: "49,528 km",
        mass: "1.024 × 10²⁶ kg",
        distanceFromSun: "4.5 Billion km",
        orbitalPeriod: "165 Earth Years",
        dayLength: "16h 6m",
        temperature: "-200°C Average",
        description:
            "Neptune is the eighth and farthest known planet from the Sun. It is an ice giant with a deep blue color caused by methane in its atmosphere. Neptune has the strongest winds in the solar system, reaching speeds up to 2,100 km/h.",
        facts: [
            "Has the strongest winds in the solar system at 2,100 km/h",
            "Only visited once by Voyager 2 in 1989",
            "Its largest moon Triton orbits in the opposite direction",
            "Takes 165 Earth years to orbit the Sun once",
        ],
    },
];

export const narrativeText = [
    { start: 0, end: 0.1, text: "The Sun. Heart of Our Solar System.", position: "center" as const },
    { start: 0.12, end: 0.2, text: "The Swift Messenger. Closest to the Sun.", position: "left" as const },
    { start: 0.23, end: 0.31, text: "Earth's Twin. Veiled in Mystery.", position: "right" as const },
    { start: 0.34, end: 0.42, text: "Our Blue Marble. The Only Known Life.", position: "center" as const },
    { start: 0.45, end: 0.53, text: "The Red Planet. Future Frontier.", position: "right" as const },
    { start: 0.56, end: 0.64, text: "King of Planets. Storm Giant.", position: "center" as const },
    { start: 0.67, end: 0.75, text: "Lord of the Rings. Majestic Beauty.", position: "left" as const },
    { start: 0.78, end: 0.86, text: "The Tilted Ice Giant.", position: "right" as const },
    { start: 0.89, end: 0.97, text: "The Deep Blue Mystery.", position: "center" as const },
];
