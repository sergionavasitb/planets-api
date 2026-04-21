const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

// ─────────────────────────────────────────
// STATIC — GLB files
// ─────────────────────────────────────────
app.use("/models", express.static(path.join(__dirname, "models"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".glb")) {
      res.setHeader("Content-Type", "model/gltf-binary");
      res.setHeader("Cache-Control", "public, max-age=86400");
    }
  }
}));

const baseUrl = (req) => {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  return `${protocol}://${req.get("host")}`;
};

// ─────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────
// star | planet | dwarf_planet | moon | asteroid | comet
// deep_space | exoplanet | space_mission | black_hole

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const bodiesData = {

  // ══════════════════════════════════════
  // ESTRELLAS
  // ══════════════════════════════════════
  "001": {
    id: "001", name: "Sol", name_en: "Sun",
    category: "star", subcategory: "Estrella principal de secuencia",
    order: 1,
    type: "Enana amarilla (G2V)",
    glb_file: "sun.glb",
    description: "La estrella central de nuestro sistema solar. Contiene el 99,86% de toda la masa del sistema. Genera energía mediante fusión nuclear de hidrógeno en helio, con una luminosidad de 3,8×10²⁶ vatios. Ha quemado aproximadamente la mitad de su hidrógeno y le quedan unos 5.000 millones de años de vida.",
    fun_fact: "Un millón de Tierras cabrían dentro del Sol. La luz que emite tarda 8 minutos en llegar a la Tierra, pero ha tardado 100.000 años en viajar desde el núcleo hasta la superficie.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/600px-thumbnail.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/280px-thumbnail.jpg",
    },
    physical: {
      diameter_km: 1_392_700,
      mass_kg: "1.989e30",
      density_gcc: 1.41,
      gravity_ms2: 274,
      escape_velocity_kms: 617.5,
      rotation_period_days: 25.38,
      surface_temp_c: 5_505,
      core_temp_million_c: 15,
      age_billion_years: 4.6,
      luminosity_watts: "3.8e26",
      spectral_class: "G2V",
    },
    composition: { "Hidrógeno": "73%", "Helio": "25%", "Oxígeno": "0.77%", "Carbono": "0.29%", "Otros": "0.94%" },
    moons: [], rings: false,
  },

  "002": {
    id: "002", name: "Sirius A", name_en: "Sirius A",
    category: "star", subcategory: "Estrella más brillante del cielo nocturno",
    order: 2,
    type: "Estrella de secuencia principal (A1V)",
    glb_file: "sirius.glb",
    description: "La estrella más brillante del cielo nocturno, a solo 8,6 años luz de la Tierra. Forma un sistema binario con Sirius B, una enana blanca. Es 25 veces más luminosa que el Sol y tiene el doble de masa. Los antiguos egipcios usaban su salida helíaca para predecir la crecida del Nilo.",
    fun_fact: "Sirius B, su compañera enana blanca, tiene el tamaño de la Tierra pero la masa del Sol. Una cucharada de su material pesaría 5 toneladas.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sirius_A_and_B_Hubble_photo.editted.PNG/600px-Sirius_A_and_B_Hubble_photo.editted.PNG",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sirius_A_and_B_Hubble_photo.editted.PNG/280px-Sirius_A_and_B_Hubble_photo.editted.PNG",
    },
    physical: {
      diameter_km: 2_394_000,
      mass_solar: 2.063,
      luminosity_solar: 25.4,
      surface_temp_c: 9_940,
      distance_ly: 8.6,
      spectral_class: "A1V",
      age_billion_years: 0.24,
    },
    moons: [], rings: false,
    discovery: { year: "Conocida en la antigüedad" },
  },

  "003": {
    id: "003", name: "Betelgeuse", name_en: "Betelgeuse",
    category: "star", subcategory: "Supergigante roja",
    order: 3,
    type: "Supergigante roja (M1-M2 Ia-ab)",
    glb_file: "beetleguese.glb",
    description: "Una de las estrellas más grandes conocidas, en la constelación de Orión. Si estuviera en el centro de nuestro sistema solar, su superficie llegaría hasta el cinturón de asteroides. Está en la fase final de su vida y se espera que explote como supernova en los próximos 100.000 años.",
    fun_fact: "En 2019-2020, Betelgeuse se oscureció misteriosamente (el Gran Oscurecimiento), alarmando a los astrónomos. Resultó ser polvo expulsado por la propia estrella.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/ESO_-_Betelgeuse_%28by%29.jpg/600px-ESO_-_Betelgeuse_%28by%29.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/ESO_-_Betelgeuse_%28by%29.jpg/280px-ESO_-_Betelgeuse_%28by%29.jpg",
    },
    physical: {
      diameter_solar: 764,
      mass_solar: 16.5,
      luminosity_solar: 126_000,
      surface_temp_c: 3_315,
      distance_ly: 700,
      spectral_class: "M1-M2 Ia-ab",
      age_million_years: 8,
    },
    moons: [], rings: false,
    discovery: { year: "Conocida en la antigüedad" },
  },

  "004": {
    id: "004", name: "Enana Blanca", name_en: "White Dwarf",
    category: "star", subcategory: "Remanente estelar",
    order: 4,
    type: "Enana blanca (DA)",
    glb_file: "white_dwarf.glb",
    description: "El núcleo expuesto de una estrella como el Sol después de agotar su combustible nuclear. Es uno de los objetos más densos del universo observable. Con el tiempo se enfriará hasta convertirse en una enana negra, aunque el universo no tiene aún la edad suficiente para que exista ninguna.",
    fun_fact: "Una enana blanca tiene la densidad de un millón de veces la del agua. Una cucharilla de su material pesaría unas 15 toneladas.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/White_dwarf_artist%27s_impression.jpg/600px-White_dwarf_artist%27s_impression.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/White_dwarf_artist%27s_impression.jpg/280px-White_dwarf_artist%27s_impression.jpg",
    },
    physical: {
      diameter_km: 10_000,
      mass_solar: 0.6,
      density_gcc: 1_000_000,
      surface_temp_c: 25_000,
      spectral_class: "DA",
    },
    moons: [], rings: false,
  },

  "005": {
    id: "005", name: "Pulsar", name_en: "Pulsar",
    category: "star", subcategory: "Estrella de neutrones rotatoria",
    order: 5,
    type: "Estrella de neutrones (pulsar de radio)",
    glb_file: "pulsar.glb",
    description: "Una estrella de neutrones que emite haces de radiación electromagnética desde sus polos magnéticos. Al rotar, el haz barre el espacio como un faro cósmico. Pueden rotar cientos de veces por segundo con una precisión comparable a los mejores relojes atómicos.",
    fun_fact: "La primera señal de un pulsar fue tan regular que en 1967 Jocelyn Bell Burnell pensó que podía ser de origen extraterrestre, y lo llamaron LGM-1 (Little Green Men).",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Chandra-crab.jpg/600px-Chandra-crab.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Chandra-crab.jpg/280px-Chandra-crab.jpg",
    },
    physical: {
      diameter_km: 20,
      mass_solar: 1.4,
      density_gcc: "~5e14",
      rotation_per_second: "up to 716",
      magnetic_field_tesla: "1e8",
    },
    moons: [], rings: false,
  },

  // ══════════════════════════════════════
  // PLANETAS DEL SISTEMA SOLAR
  // ══════════════════════════════════════
  "010": {
    id: "010", name: "Mercurio", name_en: "Mercury",
    category: "planet", subcategory: "Planeta interior rocoso",
    order: 10,
    type: "Planeta rocoso",
    glb_file: "mercurio.glb",
    description: "El planeta más pequeño y más cercano al Sol. Sin atmósfera significativa, las temperaturas oscilan entre -180°C y 430°C. Un año dura solo 88 días terrestres, pero un día solar dura 176 días. Tiene un núcleo de hierro enormemente grande en proporción a su tamaño.",
    fun_fact: "A pesar de ser el más cercano al Sol, Mercurio no es el más caliente. Ese récord lo tiene Venus gracias a su efecto invernadero.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/600px-Mercury_in_true_color.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/280px-Mercury_in_true_color.jpg",
    },
    physical: { diameter_km: 4_879, mass_kg: "3.30e23", density_gcc: 5.43, gravity_ms2: 3.7, escape_velocity_kms: 4.25, rotation_period_days: 58.65, axial_tilt_deg: 0.034, core_radius_km: 1_800 },
    orbital: { distance_from_sun_km: 57_910_000, perihelion_km: 46_000_000, aphelion_km: 69_820_000, orbital_period_days: 88, orbital_speed_kms: 47.87, eccentricity: 0.2056, inclination_deg: 7.0 },
    atmosphere: { present: true, composition: { "O₂": "42%", "Na": "29%", "H₂": "22%", "He": "6%" }, surface_pressure_atm: "~5e-15" },
    temperature: { min_c: -180, max_c: 430, mean_c: 167 },
    moons: [], rings: false,
    explored_by: ["Mariner 10 (1974)", "MESSENGER (2011–2015)", "BepiColombo (2025, en camino)"],
  },

  "011": {
    id: "011", name: "Venus", name_en: "Venus",
    category: "planet", subcategory: "Planeta interior rocoso",
    order: 11,
    type: "Planeta rocoso",
    glb_file: "venus.glb",
    description: "El planeta más caliente del sistema solar (462°C de media) gracias a un efecto invernadero extremo de CO₂. Gira en sentido retrógrado, con una presión atmosférica 92 veces la terrestre. Su día es más largo que su año. Tiene más volcanes que cualquier otro planeta.",
    fun_fact: "En Venus el Sol sale por el oeste. Si pudieras estar en su superficie, el cielo sería de color naranja y llovería ácido sulfúrico.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Venus_2_Approach_Image.jpg/600px-Venus_2_Approach_Image.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Venus_2_Approach_Image.jpg/280px-Venus_2_Approach_Image.jpg",
    },
    physical: { diameter_km: 12_104, mass_kg: "4.87e24", density_gcc: 5.24, gravity_ms2: 8.87, escape_velocity_kms: 10.36, rotation_period_days: -243.02, axial_tilt_deg: 177.36, volcanoes_known: 1_600 },
    orbital: { distance_from_sun_km: 108_200_000, perihelion_km: 107_476_000, aphelion_km: 108_942_000, orbital_period_days: 224.7, orbital_speed_kms: 35.02, eccentricity: 0.0067, inclination_deg: 3.39 },
    atmosphere: { present: true, composition: { "CO₂": "96.5%", "N₂": "3.5%", "SO₂": "trazas" }, surface_pressure_atm: 92 },
    temperature: { min_c: 462, max_c: 462, mean_c: 462 },
    moons: [], rings: false,
    explored_by: ["Venera 7 (1970, primer aterrizaje)", "Magellan (1990)", "Venus Express (2006)", "EnVision (previsto 2031)"],
  },

  "012": {
    id: "012", name: "Tierra", name_en: "Earth",
    category: "planet", subcategory: "Planeta habitado",
    order: 12,
    type: "Planeta rocoso",
    glb_file: "tierra.glb",
    description: "El único planeta conocido con vida. El 71% de su superficie está cubierta de agua líquida. Tiene una atmósfera rica en nitrógeno y oxígeno, un campo magnético protector y una luna que estabiliza su inclinación axial, creando las condiciones perfectas para la vida.",
    fun_fact: "La Tierra no es perfectamente esférica. Está achatada por los polos y abultada en el ecuador debido a su rotación, con una diferencia de 43 km entre ambos radios.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/600px-The_Earth_seen_from_Apollo_17.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/280px-The_Earth_seen_from_Apollo_17.jpg",
    },
    physical: { diameter_km: 12_756, mass_kg: "5.97e24", density_gcc: 5.51, gravity_ms2: 9.81, escape_velocity_kms: 11.19, rotation_period_days: 0.9973, axial_tilt_deg: 23.44, ocean_coverage_pct: 71, magnetic_field: true },
    orbital: { distance_from_sun_km: 149_600_000, perihelion_km: 147_098_291, aphelion_km: 152_098_233, orbital_period_days: 365.25, orbital_speed_kms: 29.78, eccentricity: 0.0167, inclination_deg: 0.0 },
    atmosphere: { present: true, composition: { "N₂": "78.09%", "O₂": "20.95%", "Ar": "0.93%", "CO₂": "0.04%" }, surface_pressure_atm: 1 },
    temperature: { min_c: -88, max_c: 58, mean_c: 15 },
    moons: [{ name: "Luna", id: "050", diameter_km: 3_474, distance_km: 384_400 }],
    rings: false,
  },

  "013": {
    id: "013", name: "Marte", name_en: "Mars",
    category: "planet", subcategory: "Planeta exterior rocoso",
    order: 13,
    type: "Planeta rocoso",
    glb_file: "marte.glb",
    description: "El Planeta Rojo. Alberga el Olympus Mons (21 km de altura, el volcán más grande del sistema solar) y el Valles Marineris (4.000 km de largo, 7 km de profundidad). Hay evidencias claras de que tuvo océanos de agua líquida hace 3.000 millones de años. Principal objetivo de la exploración humana futura.",
    fun_fact: "Un día en Marte (un sol) dura 24h 37min, casi igual que en la Tierra. Sus dos lunas, Fobos y Deimos, son probablemente asteroides capturados del cinturón principal.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/280px-OSIRIS_Mars_true_color.jpg",
    },
    physical: { diameter_km: 6_792, mass_kg: "6.39e23", density_gcc: 3.93, gravity_ms2: 3.72, escape_velocity_kms: 5.03, rotation_period_days: 1.026, axial_tilt_deg: 25.19, highest_mountain_km: 21, longest_canyon_km: 4_000 },
    orbital: { distance_from_sun_km: 227_900_000, perihelion_km: 206_620_000, aphelion_km: 249_230_000, orbital_period_days: 687, orbital_speed_kms: 24.08, eccentricity: 0.0935, inclination_deg: 1.85 },
    atmosphere: { present: true, composition: { "CO₂": "95.3%", "N₂": "2.7%", "Ar": "1.6%" }, surface_pressure_atm: 0.006 },
    temperature: { min_c: -143, max_c: 35, mean_c: -63 },
    moons: [{ name: "Fobos", diameter_km: 22.2, distance_km: 9_376 }, { name: "Deimos", diameter_km: 12.4, distance_km: 23_463 }],
    rings: false,
    explored_by: ["Viking 1 (1976)", "Pathfinder (1997)", "Opportunity (2004)", "Curiosity (2012)", "Perseverance (2021)"],
  },

  "014": {
    id: "014", name: "Júpiter", name_en: "Jupiter",
    category: "planet", subcategory: "Gigante gaseoso",
    order: 14,
    type: "Gigante gaseoso",
    glb_file: "jupiter.glb",
    description: "El planeta más grande del sistema solar, con una masa 318 veces la de la Tierra. Su Gran Mancha Roja es una tormenta activa desde hace más de 350 años. Su campo magnético es 20.000 veces más fuerte que el terrestre. Actúa como escudo gravitacional del sistema solar interior.",
    fun_fact: "Júpiter emite más calor del que recibe del Sol — su interior todavía está contrayéndose lentamente, liberando energía gravitacional. Rota tan rápido que su día dura menos de 10 horas.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/600px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/280px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    },
    physical: { diameter_km: 142_984, mass_kg: "1.90e27", density_gcc: 1.33, gravity_ms2: 24.79, escape_velocity_kms: 59.5, rotation_period_hours: 9.93, axial_tilt_deg: 3.13, great_red_spot_width_km: 16_000 },
    orbital: { distance_from_sun_km: 778_500_000, perihelion_km: 740_520_000, aphelion_km: 816_620_000, orbital_period_years: 11.86, orbital_speed_kms: 13.07, eccentricity: 0.0489, inclination_deg: 1.3 },
    atmosphere: { present: true, composition: { "H₂": "89.8%", "He": "10.2%", "CH₄": "trazas", "NH₃": "trazas" }, surface_pressure_atm: null },
    temperature: { min_c: -108, max_c: -108, mean_c: -108 },
    moons: [{ name: "Ío", id: "053" }, { name: "Europa", id: "054" }, { name: "Ganímedes", id: "055" }, { name: "Calisto", id: "056" }],
    moons_total: 95,
    rings: true,
    explored_by: ["Pioneer 10 (1973)", "Voyager 1&2 (1979)", "Galileo (1995–2003)", "Juno (2016–presente)"],
  },

  "015": {
    id: "015", name: "Saturno", name_en: "Saturn",
    category: "planet", subcategory: "Gigante gaseoso con anillos",
    order: 15,
    type: "Gigante gaseoso",
    glb_file: "saturno.glb",
    description: "El planeta con los anillos más espectaculares del sistema solar, compuestos de hielo y roca. Es el planeta menos denso — flotaría en agua. Sus anillos tienen 282.000 km de diámetro pero solo 1 km de grosor. Tiene 146 lunas confirmadas, más que cualquier otro planeta.",
    fun_fact: "Los anillos de Saturno son geológicamente jóvenes — se formaron hace entre 10 y 100 millones de años, cuando ya existían los dinosaurios en la Tierra.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/600px-Saturn_during_Equinox.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/280px-Saturn_during_Equinox.jpg",
    },
    physical: { diameter_km: 120_536, mass_kg: "5.68e26", density_gcc: 0.69, gravity_ms2: 10.44, escape_velocity_kms: 35.5, rotation_period_hours: 10.66, axial_tilt_deg: 26.73, ring_diameter_km: 282_000, ring_thickness_km: 1 },
    orbital: { distance_from_sun_km: 1_432_000_000, perihelion_km: 1_352_550_000, aphelion_km: 1_514_500_000, orbital_period_years: 29.46, orbital_speed_kms: 9.68, eccentricity: 0.0565, inclination_deg: 2.49 },
    atmosphere: { present: true, composition: { "H₂": "96.3%", "He": "3.25%", "CH₄": "trazas" }, surface_pressure_atm: null },
    temperature: { min_c: -178, max_c: -178, mean_c: -178 },
    moons: [{ name: "Titán", id: "057" }, { name: "Encélado", id: "058" }],
    moons_total: 146,
    rings: true,
    explored_by: ["Pioneer 11 (1979)", "Voyager 1&2 (1980-81)", "Cassini-Huygens (2004–2017)"],
  },

  "016": {
    id: "016", name: "Urano", name_en: "Uranus",
    category: "planet", subcategory: "Gigante helado",
    order: 16,
    type: "Gigante helado",
    glb_file: "uranus.glb",
    description: "Gira sobre su eje de forma casi horizontal (97,8°), probablemente tras una colisión masiva en su formación. Es el planeta más frío del sistema solar (-224°C), a pesar de no ser el más lejano. Tiene 13 anillos y 27 lunas, todas con nombres de personajes de Shakespeare y Alexander Pope.",
    fun_fact: "Urano emite menos calor del que recibe del Sol — algo único entre los gigantes gaseosos. Sus lunas tienen nombres de obras de Shakespeare: Miranda, Ariel, Umbriel, Titania y Oberón.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/600px-Uranus2.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/280px-Uranus2.jpg",
    },
    physical: { diameter_km: 51_118, mass_kg: "8.68e25", density_gcc: 1.27, gravity_ms2: 8.87, escape_velocity_kms: 21.3, rotation_period_hours: 17.24, axial_tilt_deg: 97.77 },
    orbital: { distance_from_sun_km: 2_867_000_000, perihelion_km: 2_735_560_000, aphelion_km: 3_006_390_000, orbital_period_years: 84, orbital_speed_kms: 6.81, eccentricity: 0.0457, inclination_deg: 0.77 },
    atmosphere: { present: true, composition: { "H₂": "82.5%", "He": "15.2%", "CH₄": "2.3%" }, surface_pressure_atm: null },
    temperature: { min_c: -224, max_c: -197, mean_c: -224 },
    moons: [{ name: "Miranda" }, { name: "Ariel" }, { name: "Titania" }, { name: "Oberón" }],
    moons_total: 27,
    rings: true,
    explored_by: ["Voyager 2 (1986)"],
    discovery: { discoverer: "William Herschel", year: 1781 },
  },

  "017": {
    id: "017", name: "Neptuno", name_en: "Neptune",
    category: "planet", subcategory: "Gigante helado",
    order: 17,
    type: "Gigante helado",
    glb_file: "neptune.glb",
    description: "El planeta más alejado del Sol y el primero descubierto por predicciones matemáticas. Sus vientos son los más rápidos del sistema solar (2.100 km/h). Tardó 165 años en completar su primera órbita desde su descubrimiento. Tiene una gran tormenta llamada la Gran Mancha Oscura.",
    fun_fact: "Le Verrier calculó la posición exacta de Neptuno en 1846 sin haberlo observado nunca, solo analizando las perturbaciones en la órbita de Urano. Fue encontrado a menos de 1° de donde él predijo.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/600px-Neptune_Full.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/280px-Neptune_Full.jpg",
    },
    physical: { diameter_km: 49_528, mass_kg: "1.02e26", density_gcc: 1.64, gravity_ms2: 11.15, escape_velocity_kms: 23.5, rotation_period_hours: 16.11, axial_tilt_deg: 28.32, max_wind_speed_kms: 0.58 },
    orbital: { distance_from_sun_km: 4_515_000_000, perihelion_km: 4_459_630_000, aphelion_km: 4_537_000_000, orbital_period_years: 165, orbital_speed_kms: 5.43, eccentricity: 0.0113, inclination_deg: 1.77 },
    atmosphere: { present: true, composition: { "H₂": "80%", "He": "19%", "CH₄": "1.5%" }, surface_pressure_atm: null },
    temperature: { min_c: -218, max_c: -200, mean_c: -218 },
    moons: [{ name: "Tritón", id: "059" }],
    moons_total: 16,
    rings: true,
    explored_by: ["Voyager 2 (1989)"],
    discovery: { discoverer: "Urbain Le Verrier / Johann Galle", year: 1846 },
  },

  // ══════════════════════════════════════
  // PLANETAS ENANOS
  // ══════════════════════════════════════
  "020": {
    id: "020", name: "Plutón", name_en: "Pluto",
    category: "dwarf_planet", subcategory: "Cinturón de Kuiper",
    order: 20,
    type: "Planeta enano",
    glb_file: "pluto.glb",
    description: "El planeta enano más famoso. Planeta oficial hasta 2006, cuando la UAI redefinió el concepto. New Horizons reveló en 2015 un mundo geológicamente activo con montañas de hielo de agua de 3.500 m, llanuras de nitrógeno y una atmósfera tenue. Tiene un 'corazón' de nitrógeno congelado llamado Tombaugh Regio.",
    fun_fact: "Caronte, su luna principal, es tan grande (1.212 km) respecto a Plutón que ambos orbitan un punto en el espacio entre ellos. Son técnicamente un sistema binario.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pluto-01_Stern_03_Pluto_Color_TXT.jpg/600px-Pluto-01_Stern_03_Pluto_Color_TXT.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pluto-01_Stern_03_Pluto_Color_TXT.jpg/280px-Pluto-01_Stern_03_Pluto_Color_TXT.jpg",
    },
    physical: { diameter_km: 2_376, mass_kg: "1.30e22", density_gcc: 1.85, gravity_ms2: 0.62, escape_velocity_kms: 1.23, rotation_period_days: -6.387, axial_tilt_deg: 122.53 },
    orbital: { distance_from_sun_km: 5_906_380_000, perihelion_km: 4_436_820_000, aphelion_km: 7_375_930_000, orbital_period_years: 248, orbital_speed_kms: 4.67, eccentricity: 0.2488, inclination_deg: 17.14 },
    atmosphere: { present: true, composition: { "N₂": "~90%", "CH₄": "~10%", "CO": "trazas" }, surface_pressure_atm: 0.00001 },
    temperature: { min_c: -240, max_c: -218, mean_c: -229 },
    moons: [{ name: "Caronte", diameter_km: 1_212, distance_km: 19_591 }, { name: "Nix" }, { name: "Hidra" }],
    rings: false,
    explored_by: ["New Horizons (2015, primer sobrevuelo)"],
    discovery: { discoverer: "Clyde Tombaugh", year: 1930 },
  },

  "021": {
    id: "021", name: "Eris", name_en: "Eris",
    category: "dwarf_planet", subcategory: "Disco disperso",
    order: 21,
    type: "Planeta enano",
    glb_file: "eris.glb",
    description: "El planeta enano más masivo del sistema solar, ligeramente más pequeño que Plutón pero un 27% más denso. Su descubrimiento en 2005 por Mike Brown fue el detonante que llevó a redefinir el concepto de planeta y a la polémica reclasificación de Plutón. Orbita en el disco disperso, mucho más allá del cinturón de Kuiper.",
    fun_fact: "Eris fue apodado 'Xena' informalmente antes de recibir su nombre oficial. Su luna Disnomia (la diosa de la ilegalidad) hace referencia al nombre de la actriz Lucy Lawless, quien interpretaba a Xena.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Eris_and_dysnomia2.jpg/600px-Eris_and_dysnomia2.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Eris_and_dysnomia2.jpg/280px-Eris_and_dysnomia2.jpg",
    },
    physical: { diameter_km: 2_326, mass_kg: "1.66e22", density_gcc: 2.52, gravity_ms2: 0.82, escape_velocity_kms: 1.38, rotation_period_hours: 25.9 },
    orbital: { distance_from_sun_km: 10_120_000_000, orbital_period_years: 557, eccentricity: 0.44, inclination_deg: 44.04 },
    temperature: { min_c: -243, max_c: -217, mean_c: -231 },
    moons: [{ name: "Disnomia", diameter_km: 700, distance_km: 37_350 }],
    rings: false,
    discovery: { discoverer: "Mike Brown, Chad Trujillo, David Rabinowitz", year: 2005 },
  },

  "022": {
    id: "022", name: "Makemake", name_en: "Makemake",
    category: "dwarf_planet", subcategory: "Cinturón de Kuiper",
    order: 22,
    type: "Planeta enano",
    glb_file: "makemake.glb",
    description: "El segundo planeta enano más brillante del cinturón de Kuiper después de Plutón. Su superficie está cubierta de metano, etano y nitrógeno congelados, lo que le da un color rojizo. Fue descubierto justo después de Semana Santa de 2005 y lleva el nombre del dios creador de la isla de Pascua.",
    fun_fact: "En 2016 se descubrió que Makemake tiene una pequeña luna oscura apodada MK2, cuya existencia pasó desapercibida durante años porque es tan oscura que absorbe el 97% de la luz.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Makemake_and_its_moon.jpg/600px-Makemake_and_its_moon.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Makemake_and_its_moon.jpg/280px-Makemake_and_its_moon.jpg",
    },
    physical: { diameter_km: 1_430, mass_kg: "3.1e21", density_gcc: 1.7, gravity_ms2: 0.57, rotation_period_hours: 22.8 },
    orbital: { distance_from_sun_km: 6_850_000_000, orbital_period_years: 309, eccentricity: 0.162, inclination_deg: 28.96 },
    temperature: { min_c: -243, max_c: -238, mean_c: -239 },
    moons: [{ name: "MK 2", diameter_km: 175, distance_km: 21_000 }],
    rings: false,
    discovery: { discoverer: "Mike Brown et al.", year: 2005 },
  },

  "023": {
    id: "023", name: "Haumea", name_en: "Haumea",
    category: "dwarf_planet", subcategory: "Cinturón de Kuiper",
    order: 23,
    type: "Planeta enano",
    glb_file: "haumea.glb",
    description: "El planeta enano con la forma más peculiar: un elipsoide triaxial parecido a un balón de rugby (2.322 × 1.704 × 1.138 km). Su rotación de solo 3,9 horas es la más rápida de todos los objetos grandes del sistema solar. Tiene dos lunas y, sorprendentemente, un sistema de anillos.",
    fun_fact: "La velocidad de rotación de Haumea es tan extrema que su ecuador se mueve a 900 m/s — si fuera mucho más rápida, la propia fuerza centrífuga la desintegraría.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Haumea_Hubble.png/400px-Haumea_Hubble.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Haumea_Hubble.png/280px-Haumea_Hubble.png",
    },
    physical: { dimensions_km: "2322 × 1704 × 1138", mass_kg: "4.01e21", density_gcc: 2.0, gravity_ms2: 0.63, rotation_period_hours: 3.9 },
    orbital: { distance_from_sun_km: 6_452_000_000, orbital_period_years: 284, eccentricity: 0.191, inclination_deg: 28.19 },
    temperature: { min_c: -241, max_c: -223, mean_c: -231 },
    moons: [{ name: "Hiʻiaka", diameter_km: 320, distance_km: 49_880 }, { name: "Namaka", diameter_km: 170, distance_km: 25_657 }],
    rings: true,
    discovery: { discoverer: "Mike Brown et al.", year: 2004 },
  },

  "024": {
    id: "024", name: "Ceres", name_en: "Ceres",
    category: "dwarf_planet", subcategory: "Cinturón de asteroides (interior)",
    order: 24,
    type: "Planeta enano",
    glb_file: "ceres.glb",
    description: "El objeto más grande del cinturón de asteroides y el único planeta enano del sistema solar interior. Tiene criovolcanes (volcanes de hielo de agua y sal) y el misterioso cráter Occator con brillantes depósitos de carbonato de sodio. Contiene más agua dulce que toda la Tierra.",
    fun_fact: "Fue considerado planeta durante casi 50 años (1801-1850) antes de ser reclasificado como asteroide, y volvió a ser reclasificado como planeta enano en 2006. Es el único objeto del cinturón de asteroides con forma esférica.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg/600px-Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg/280px-Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg",
    },
    physical: { diameter_km: 945, mass_kg: "9.38e20", density_gcc: 2.16, gravity_ms2: 0.28, escape_velocity_kms: 0.51, rotation_period_hours: 9.07 },
    orbital: { distance_from_sun_km: 413_700_000, orbital_period_years: 4.6, eccentricity: 0.076, inclination_deg: 10.59 },
    temperature: { min_c: -163, max_c: -38, mean_c: -105 },
    moons: [], rings: false,
    explored_by: ["Dawn (2015–2018)"],
    discovery: { discoverer: "Giuseppe Piazzi", year: 1801 },
  },

  // ══════════════════════════════════════
  // LUNAS
  // ══════════════════════════════════════
  "050": {
    id: "050", name: "Luna", name_en: "Moon",
    category: "moon", subcategory: "Satélite de la Tierra",
    order: 50, parent_id: "012",
    type: "Satélite natural",
    glb_file: "moon.glb",
    description: "El único satélite natural de la Tierra y el quinto satélite más grande del sistema solar. Las misiones Apollo (1969–1972) llevaron 12 astronautas a su superficie y trajeron 382 kg de rocas lunares. Estabiliza la inclinación axial de la Tierra, lo que hace posible nuestro clima estable.",
    fun_fact: "La Luna se aleja de la Tierra 3,8 cm cada año. Hace 1.400 millones de años, un día terrestre duraba solo 18 horas. Se formó hace 4.500 millones de años tras el impacto de un proto-planeta llamado Theia con la Tierra primitiva.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/600px-FullMoon2010.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/280px-FullMoon2010.jpg",
    },
    physical: { diameter_km: 3_474, mass_kg: "7.35e22", density_gcc: 3.34, gravity_ms2: 1.62, escape_velocity_kms: 2.38, rotation_period_days: 27.32, axial_tilt_deg: 6.68 },
    orbital: { distance_from_earth_km: 384_400, perihelion_km: 362_600, aphelion_km: 405_500, orbital_period_days: 27.32, orbital_speed_kms: 1.022, eccentricity: 0.0549 },
    atmosphere: { present: false },
    temperature: { min_c: -183, max_c: 127, mean_c: -53 },
    moons: [], rings: false,
    explored_by: ["Luna 2 (primer impacto, 1959)", "Apollo 11 (primer alunizaje, 1969)", "Apollo 17 (última misión, 1972)", "Chang'e 5 (muestra, 2020)", "Artemis (previsto 2026)"],
  },

  "051": {
    id: "051", name: "Tritón", name_en: "Triton",
    category: "moon", subcategory: "Luna mayor de Neptuno",
    order: 51, parent_id: "017",
    type: "Satélite natural (capturado)",
    glb_file: "triton.glb",
    description: "La luna más grande de Neptuno y el único satélite grande del sistema solar que orbita en sentido retrógrado (contrario al giro de su planeta), lo que indica que fue capturado del cinturón de Kuiper. Tiene géiseres de nitrógeno activos y una temperatura de -235°C, la más fría medida en el sistema solar.",
    fun_fact: "Tritón se acerca lentamente a Neptuno y en unos 3.600 millones de años será desgarrado por las fuerzas de marea, formando un nuevo sistema de anillos alrededor de Neptuno.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Triton_moon_mosaic_Voyager_2_%28large%29.jpg/600px-Triton_moon_mosaic_Voyager_2_%28large%29.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Triton_moon_mosaic_Voyager_2_%28large%29.jpg/280px-Triton_moon_mosaic_Voyager_2_%28large%29.jpg",
    },
    physical: { diameter_km: 2_707, mass_kg: "2.14e22", density_gcc: 2.06, gravity_ms2: 0.78, escape_velocity_kms: 1.46, rotation_period_days: -5.877 },
    orbital: { distance_from_neptune_km: 354_759, orbital_period_days: 5.877, eccentricity: 0.000016, retrograde: true },
    temperature: { min_c: -235, max_c: -235, mean_c: -235 },
    moons: [], rings: false,
    explored_by: ["Voyager 2 (1989)"],
    discovery: { discoverer: "William Lassell", year: 1846 },
  },

  "052": {
    id: "052", name: "Encélado", name_en: "Enceladus",
    category: "moon", subcategory: "Luna de Saturno",
    order: 52, parent_id: "015",
    type: "Satélite natural",
    glb_file: "enceladus.glb",
    description: "Una de las lunas más brillantes del sistema solar (albedo ~1.4). Tiene géiseres en el polo sur que expulsan agua, sal, hidrógeno molecular y moléculas orgánicas al espacio, alimentando el anillo E de Saturno. Bajo su corteza de hielo existe un océano global de agua salada con actividad hidrotermal.",
    fun_fact: "Cassini voló a través de las plumas de Encélado y detectó hidrógeno molecular, lo que sugiere reacciones hidrotermales activas en el fondo de su océano — exactamente el tipo de entorno donde surgió la vida en la Tierra.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Enceladus_from_Cassini_orbit_insertion.jpg/600px-Enceladus_from_Cassini_orbit_insertion.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Enceladus_from_Cassini_orbit_insertion.jpg/280px-Enceladus_from_Cassini_orbit_insertion.jpg",
    },
    physical: { diameter_km: 504, mass_kg: "1.08e20", density_gcc: 1.61, gravity_ms2: 0.11, escape_velocity_kms: 0.24, rotation_period_days: 1.37 },
    orbital: { distance_from_saturn_km: 238_020, orbital_period_days: 1.37, eccentricity: 0.0047 },
    temperature: { min_c: -201, max_c: -128, mean_c: -198 },
    moons: [], rings: false,
    explored_by: ["Voyager 2 (1981)", "Cassini (2005–2017)"],
    discovery: { discoverer: "William Herschel", year: 1789 },
  },

  "053": {
    id: "053", name: "Ío", name_en: "Io",
    category: "moon", subcategory: "Luna de Júpiter",
    order: 53, parent_id: "014",
    type: "Satélite natural (galileano)",
    glb_file: "io.glb",
    description: "La luna más volcánicamente activa del sistema solar. Tiene más de 400 volcanes activos y sus erupciones pueden lanzar material hasta 500 km de altura. Su color amarillo-naranja se debe al azufre depositado por los volcanes. Las fuerzas de marea de Júpiter generan tanto calor que su interior está completamente fundido.",
    fun_fact: "Ío completa una órbita alrededor de Júpiter en 42 horas. La Voyager 1 descubrió sus volcanes en 1979 — literalmente días después de que un astrónomo publicara un artículo prediciendo que los habría.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/600px-Io_highest_resolution_true_color.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/280px-Io_highest_resolution_true_color.jpg",
    },
    physical: { diameter_km: 3_643, mass_kg: "8.93e22", density_gcc: 3.53, gravity_ms2: 1.80, escape_velocity_kms: 2.56, rotation_period_days: 1.77, active_volcanoes: 400 },
    orbital: { distance_from_jupiter_km: 421_800, orbital_period_days: 1.77, eccentricity: 0.004 },
    temperature: { min_c: -143, max_c: 1_600, mean_c: -130 },
    moons: [], rings: false,
    explored_by: ["Voyager 1&2 (1979)", "Galileo (1995)", "Juno (2023)"],
    discovery: { discoverer: "Galileo Galilei", year: 1610 },
  },

  "054": {
    id: "054", name: "Europa", name_en: "Europa",
    category: "moon", subcategory: "Luna de Júpiter",
    order: 54, parent_id: "014",
    type: "Satélite natural (galileano)",
    glb_file: "europa.glb",
    description: "Bajo su superficie de hielo existe un océano de agua líquida salada con el doble de agua que todos los océanos terrestres. Es el candidato más prometedor para albergar vida en el sistema solar. Su superficie muestra líneas de ruptura y reorganización del hielo causadas por las fuerzas de marea de Júpiter.",
    fun_fact: "El calor generado por las fuerzas de marea de Júpiter mantiene el océano de Europa líquido a pesar de estar a 780 millones de km del Sol. La misión Europa Clipper llegará en 2030 para investigar su habitabilidad.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon-with-margins.jpg/600px-Europa-moon-with-margins.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon-with-margins.jpg/280px-Europa-moon-with-margins.jpg",
    },
    physical: { diameter_km: 3_122, mass_kg: "4.80e22", density_gcc: 3.01, gravity_ms2: 1.31, escape_velocity_kms: 2.02, rotation_period_days: 3.55, ocean_depth_km: 100 },
    orbital: { distance_from_jupiter_km: 671_100, orbital_period_days: 3.55, eccentricity: 0.009 },
    temperature: { min_c: -223, max_c: -148, mean_c: -160 },
    moons: [], rings: false,
    explored_by: ["Voyager 1&2 (1979)", "Galileo (1995)", "Europa Clipper (llegada 2030)"],
    discovery: { discoverer: "Galileo Galilei", year: 1610 },
  },

  "055": {
    id: "055", name: "Ganímedes", name_en: "Ganymede",
    category: "moon", subcategory: "Luna de Júpiter",
    order: 55, parent_id: "014",
    type: "Satélite natural (galileano)",
    glb_file: "ganymede.glb",
    description: "La luna más grande del sistema solar, más grande incluso que Mercurio, aunque con menos masa. Es el único satélite natural con campo magnético propio. Tiene un océano subsuperficial de agua salada y una atmósfera tenue de oxígeno. La misión JUICE de la ESA llegará en 2034.",
    fun_fact: "Si Ganímedes orbitara el Sol en lugar de Júpiter, sería clasificado como planeta. Su diámetro de 5.268 km supera al de Mercurio en 8%.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ganymede_-_Perijove_34_Composite.png/600px-Ganymede_-_Perijove_34_Composite.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ganymede_-_Perijove_34_Composite.png/280px-Ganymede_-_Perijove_34_Composite.png",
    },
    physical: { diameter_km: 5_268, mass_kg: "1.48e23", density_gcc: 1.94, gravity_ms2: 1.43, escape_velocity_kms: 2.74, rotation_period_days: 7.15 },
    orbital: { distance_from_jupiter_km: 1_070_400, orbital_period_days: 7.15, eccentricity: 0.0013 },
    temperature: { min_c: -203, max_c: -121, mean_c: -163 },
    moons: [], rings: false,
    explored_by: ["Voyager 1&2 (1979)", "Galileo (1995)", "JUICE ESA (llegada 2034)"],
    discovery: { discoverer: "Galileo Galilei", year: 1610 },
  },

  "056": {
    id: "056", name: "Calisto", name_en: "Callisto",
    category: "moon", subcategory: "Luna de Júpiter",
    order: 56, parent_id: "014",
    type: "Satélite natural (galileano)",
    glb_file: "calisto.glb",
    description: "La más craterizada del sistema solar, con una superficie de 4.000 millones de años sin renovar por actividad geológica. Está tan alejada de Júpiter que recibe poca radiación, convirtiéndola en candidata ideal para una base humana en el sistema joviano. Podría tener un océano salado bajo su corteza.",
    fun_fact: "Calisto no está en resonancia orbital con las otras lunas galileanas, lo que significa que sus mareas son débiles y no tiene volcanes ni tectónica activa, dejando su superficie como un fósil del sistema solar primitivo.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Callisto.jpg/600px-Callisto.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Callisto.jpg/280px-Callisto.jpg",
    },
    physical: { diameter_km: 4_821, mass_kg: "1.08e23", density_gcc: 1.83, gravity_ms2: 1.24, escape_velocity_kms: 2.44, rotation_period_days: 16.69 },
    orbital: { distance_from_jupiter_km: 1_882_700, orbital_period_days: 16.69, eccentricity: 0.0074 },
    temperature: { min_c: -193, max_c: -108, mean_c: -139 },
    moons: [], rings: false,
    explored_by: ["Voyager 1&2 (1979)", "Galileo (1995)"],
    discovery: { discoverer: "Galileo Galilei", year: 1610 },
  },

  "057": {
    id: "057", name: "Titán", name_en: "Titan",
    category: "moon", subcategory: "Luna de Saturno",
    order: 57, parent_id: "015",
    type: "Satélite natural",
    glb_file: "titan.glb",
    description: "La luna más grande de Saturno y la segunda del sistema solar. Es el único satélite con una atmósfera densa (1,5 veces la presión terrestre) y el único cuerpo aparte de la Tierra con líquidos estables en superficie: ríos, lagos y mares de metano y etano líquidos. La sonda Huygens aterrizó en 2005.",
    fun_fact: "La atmósfera de Titán es tan densa y la gravedad tan baja que un humano con alas en los brazos podría volar. La misión Dragonfly de la NASA lanzará un helicóptero a Titán en 2028.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Titan_in_true_color.jpg/600px-Titan_in_true_color.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Titan_in_true_color.jpg/280px-Titan_in_true_color.jpg",
    },
    physical: { diameter_km: 5_150, mass_kg: "1.35e23", density_gcc: 1.88, gravity_ms2: 1.35, escape_velocity_kms: 2.64, rotation_period_days: 15.95 },
    orbital: { distance_from_saturn_km: 1_221_870, orbital_period_days: 15.95, eccentricity: 0.0288 },
    atmosphere: { present: true, composition: { "N₂": "98.4%", "CH₄": "1.4%", "H₂": "0.2%" }, surface_pressure_atm: 1.5 },
    temperature: { min_c: -183, max_c: -179, mean_c: -179 },
    moons: [], rings: false,
    explored_by: ["Cassini (2004–2017)", "Huygens (aterrizaje 2005)", "Dragonfly (previsto 2034)"],
    discovery: { discoverer: "Christiaan Huygens", year: 1655 },
  },

  // ══════════════════════════════════════
  // ASTEROIDES Y COMETAS
  // ══════════════════════════════════════
  "070": {
    id: "070", name: "Vesta", name_en: "Vesta",
    category: "asteroid", subcategory: "Cinturón de asteroides principal",
    order: 70,
    type: "Asteroide diferenciado",
    glb_file: "vesta.glb",
    description: "El segundo objeto más masivo del cinturón de asteroides. Tiene corteza, manto y núcleo diferenciados como un planeta rocoso. Su polo sur tiene un cráter de impacto de 460 km de diámetro y 13 km de profundidad llamado Rheasilvia. Fragmentos de Vesta han llegado a la Tierra como meteoritos HED.",
    fun_fact: "Los meteoritos HED (Howardita-Eucrita-Diogenita) representan el 6% de todos los meteoritos encontrados en la Tierra, y todos proceden de Vesta. Puedes tener un trozo de Vesta en tu mano.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Vesta_full_mosaic.jpg/600px-Vesta_full_mosaic.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Vesta_full_mosaic.jpg/280px-Vesta_full_mosaic.jpg",
    },
    physical: { diameter_km: 525, mass_kg: "2.59e20", density_gcc: 3.46, gravity_ms2: 0.25, rotation_period_hours: 5.34 },
    orbital: { distance_from_sun_km: 353_400_000, orbital_period_years: 3.63, eccentricity: 0.089, inclination_deg: 7.14 },
    temperature: { min_c: -188, max_c: -23, mean_c: -106 },
    moons: [], rings: false,
    explored_by: ["Dawn (2011–2012)"],
    discovery: { discoverer: "Heinrich Wilhelm Olbers", year: 1807 },
  },

  "071": {
    id: "071", name: "Bennu", name_en: "Bennu",
    category: "asteroid", subcategory: "Asteroide próximo a la Tierra (Apollo)",
    order: 71,
    type: "Asteroide carbonáceo tipo B",
    glb_file: "bennu.glb",
    description: "Asteroide carbonáceo formado hace 4.500 millones de años. La misión OSIRIS-REx recogió 121 gramos de su superficie en 2020 y los trajo a la Tierra en 2023, revelando aminoácidos y agua — ingredientes clave para la vida. Tiene una pequeña pero real probabilidad de impactar la Tierra en el siglo XXII.",
    fun_fact: "Los análisis de la muestra de Bennu encontraron más de 33 aminoácidos diferentes, incluyendo algunos nunca vistos antes en meteoritos. Bennu es literalmente una cápsula del tiempo del sistema solar primitivo.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bennu_mosaic_Mar2019.png/600px-Bennu_mosaic_Mar2019.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bennu_mosaic_Mar2019.png/280px-Bennu_mosaic_Mar2019.png",
    },
    physical: { diameter_km: 0.565, mass_kg: "7.33e10", density_gcc: 1.19, gravity_ms2: 0.000006, rotation_period_hours: 5.87, surface_type: "Carbonáceo, muy oscuro" },
    orbital: { distance_from_sun_km: 168_100_000, orbital_period_days: 436.6, eccentricity: 0.204, inclination_deg: 6.03, impact_probability: "0.057% entre 2178-2290" },
    temperature: { min_c: -73, max_c: 127, mean_c: -6 },
    moons: [], rings: false,
    explored_by: ["OSIRIS-REx (2018–2021, muestra 2023)"],
    discovery: { discoverer: "LINEAR Survey", year: 1999 },
  },

  "072": {
    id: "072", name: "Arrokoth", name_en: "Arrokoth",
    category: "asteroid", subcategory: "Objeto transneptuniano",
    order: 72,
    type: "Objeto del cinturón de Kuiper (contacto binario)",
    glb_file: "Arrokoth.glb",
    description: "El objeto más lejano explorado de cerca por una nave espacial. Tiene una forma peculiar de muñeco de nieve: dos lóbulos (Ultima y Thule) que se unieron suavemente hace 4.500 millones de años. Su color rojizo se debe a la presencia de tolinas (compuestos orgánicos complejos). Es un fósil del sistema solar en su infancia.",
    fun_fact: "New Horizons tardó 13 años en llegar a Arrokoth, que está a 6.600 millones de km del Sol. La señal de radio tardó 6 horas en llegar a la Tierra desde allí.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Arrokoth_%28color%2C_February_2019%29.png/600px-Arrokoth_%28color%2C_February_2019%29.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Arrokoth_%28color%2C_February_2019%29.png/280px-Arrokoth_%28color%2C_February_2019%29.png",
    },
    physical: { length_km: 36, mass_kg: "~7.5e14", density_gcc: 0.5, rotation_period_hours: 15.92 },
    orbital: { distance_from_sun_km: 6_600_000_000, orbital_period_years: 297, eccentricity: 0.04, inclination_deg: 2.45 },
    temperature: { min_c: -252, max_c: -252, mean_c: -252 },
    moons: [], rings: false,
    explored_by: ["New Horizons (sobrevuelo 1 enero 2019)"],
    discovery: { discoverer: "Telescopio Hubble / NASA", year: 2014 },
  },

  "073": {
    id: "073", name: "Cometa Halley", name_en: "Halley's Comet",
    category: "comet", subcategory: "Cometa periódico de período corto",
    order: 73,
    type: "Cometa",
    glb_file: "halleycomet.glb",
    description: "El cometa más famoso de la historia, visible a simple vista desde la Tierra cada 75-76 años. Su núcleo de 15×8 km tiene una de las superficies más oscuras del sistema solar (albedo 0.03). Cada aproximación al Sol pierde entre 1 y 3 metros de material. Ha sido observado por humanos desde al menos el 240 a.C.",
    fun_fact: "El Cometa Halley fue el primer cometa reconocido como periódico por Edmund Halley en 1705. Su próxima visita será en julio de 2061. Mark Twain nació y murió en años de paso del Cometa Halley (1835 y 1910).",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Halley%27s_Comet_1986.jpg/600px-Halley%27s_Comet_1986.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Halley%27s_Comet_1986.jpg/280px-Halley%27s_Comet_1986.jpg",
    },
    physical: { nucleus_km: "15×8", mass_kg: "2.2e14", density_gcc: 0.6, rotation_period_hours: 52.8, surface_albedo: 0.03 },
    orbital: { perihelion_km: 87_800_000, aphelion_km: 6_000_000_000, orbital_period_years: 75.3, eccentricity: 0.967, inclination_deg: 162.3, next_perihelion: "2061" },
    temperature: { min_c: -270, max_c: 77, mean_c: -70 },
    moons: [], rings: false,
    explored_by: ["Giotto ESA (1986)", "Vega 1&2 (1986)", "ICE (1985)"],
    discovery: { discoverer: "Edmund Halley (período calculado 1705)", first_recorded: "240 a.C." },
  },

  "074": {
    id: "074", name: "Cometa Rosetta (67P)", name_en: "Comet 67P",
    category: "comet", subcategory: "Cometa periódico",
    order: 74,
    type: "Cometa de período corto",
    glb_file: "esa_rosetta_comet.glb",
    description: "El cometa Churyumov-Gerasimenko (67P), famoso por ser el primer cometa orbitado y aterrizado por una nave espacial. La misión Rosetta de la ESA orbitó el cometa durante más de 2 años (2014-2016) y lanzó el módulo Philae, que aterrizó en su superficie. Detectó aminoácidos glicina y agua con diferente composición a la terrestre.",
    fun_fact: "El módulo Philae rebotó dos veces antes de aterrizar definitivamente en un lugar sombreado donde sus paneles solares no podían cargar. Funcionó 57 horas. La misión Rosetta terminó impactando deliberadamente contra el cometa el 30 de septiembre de 2016.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Comet_on_19_September_2014_NavCam.jpg/600px-Comet_on_19_September_2014_NavCam.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Comet_on_19_September_2014_NavCam.jpg/280px-Comet_on_19_September_2014_NavCam.jpg",
    },
    physical: { length_km: 4.3, mass_kg: "9.98e12", density_gcc: 0.53, rotation_period_hours: 12.4, shape: "Forma de goma de mascar (bilobulado)" },
    orbital: { perihelion_km: 185_500_000, aphelion_km: 850_000_000, orbital_period_years: 6.44, eccentricity: 0.641 },
    temperature: { min_c: -270, max_c: -13, mean_c: -93 },
    moons: [], rings: false,
    explored_by: ["Rosetta ESA + Philae (órbita 2014-2016, impacto final 2016)"],
    discovery: { discoverer: "Klim Churyumov / Svetlana Gerasimenko", year: 1969 },
  },

  "075": {
    id: "075", name: "ʻOumuamua", name_en: "'Oumuamua",
    category: "comet", subcategory: "Objeto interestelar",
    order: 75,
    type: "Primer objeto interestelar conocido",
    glb_file: "ioumuamua.glb",
    description: "El primer objeto de origen interestelar detectado en el sistema solar (2017). Tenía una forma alargada inusual y aceleró al alejarse del Sol de forma no explicada por la gravedad, lo que generó debate científico. Llegó del sistema de la estrella Vega y se aleja a 26 km/s.",
    fun_fact: "El astrónomo Avi Loeb de Harvard propuso que ʻOumuamua podría ser una vela solar artificial de una civilización extraterrestre. La hipótesis es controvertida, pero no ha sido refutada definitivamente. En 2019 llegó 'Borisov', el segundo interestelar conocido.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Oumuamua_Hubble.png/600px-Oumuamua_Hubble.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Oumuamua_Hubble.png/280px-Oumuamua_Hubble.png",
    },
    physical: { length_km: 0.4, width_km: 0.04, density_gcc: "desconocida", tumbling: true },
    orbital: { speed_kms: 26, origin: "Sistema estelar de Vega (aprox.)", hyperbolic: true, eccentricity: 1.2 },
    temperature: { min_c: -270, max_c: -20, mean_c: -150 },
    moons: [], rings: false,
    discovery: { discoverer: "Robert Weryk (Pan-STARRS)", year: 2017 },
  },

  // ══════════════════════════════════════
  // AGUJEROS NEGROS Y ESPACIO PROFUNDO
  // ══════════════════════════════════════
  "080": {
    id: "080", name: "Gargantúa", name_en: "Gargantua",
    category: "deep_space", subcategory: "Agujero negro (ficción científica)",
    order: 80,
    type: "Agujero negro supermasivo (modelo cinematográfico)",
    glb_file: "gargantua_the_black_hole.glb",
    description: "El agujero negro ficticio de la película Interstellar (2014). Fue el primero renderizado con precisión física real: el equipo de Kip Thorne (Premio Nobel de Física 2017) escribió las ecuaciones de relatividad general para que el motor de efectos visuales las resolviera. El resultado fue tan preciso que generó nuevas publicaciones científicas.",
    fun_fact: "El render de Gargantúa requería 100 horas de cómputo por fotograma y produjo 800 TB de datos visuales. Las imágenes reveló un fenómeno no descrito antes: cómo luce el disco de acreción de un agujero negro para un observador cercano.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Gargantua_%28Interstellar_black_hole%29.png/600px-Gargantua_%28Interstellar_black_hole%29.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Gargantua_%28Interstellar_black_hole%29.png/280px-Gargantua_%28Interstellar_black_hole%29.png",
    },
    physical: { mass_solar: 100_000_000, spin: "0.6 (muy alta)", event_horizon_km: 300_000_000, fictional: true },
    references: { film: "Interstellar (2014)", director: "Christopher Nolan", physicist: "Kip Thorne (Nobel 2017)" },
    moons: [], rings: false,
  },

  "081": {
    id: "081", name: "Agujero Negro", name_en: "Black Hole",
    category: "deep_space", subcategory: "Singularidad gravitacional",
    order: 81,
    type: "Agujero negro estelar",
    glb_file: "black_hole.glb",
    description: "Una región del espacio-tiempo donde la gravedad es tan intensa que nada, ni la luz, puede escapar más allá del horizonte de sucesos. Se forman cuando estrellas masivas colapsan al final de su vida. Pueden ser de masa estelar (5-100 masas solares) o supermasivos (millones a miles de millones de masas solares).",
    fun_fact: "La primera foto de un agujero negro fue tomada en 2019 por el Event Horizon Telescope: el agujero negro M87*, con 6.500 millones de masas solares. En 2022 se fotografió Sagitario A*, el agujero negro del centro de nuestra galaxia.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/600px-Black_hole_-_Messier_87_crop_max_res.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/280px-Black_hole_-_Messier_87_crop_max_res.jpg",
    },
    physical: { types: ["Estelar: 5-100 masas solares", "Supermasivo: millones-miles de millones", "Primordial: posiblemente sub-atómico"], no_hair_theorem: "Solo masa, carga y spin definen un agujero negro" },
    moons: [], rings: false,
  },

  "082": {
    id: "082", name: "Nube de Oort", name_en: "Oort Cloud",
    category: "deep_space", subcategory: "Reservorio de cometas",
    order: 82,
    type: "Nube de cuerpos helados",
    glb_file: "oort.glb",
    description: "La región más exterior y remota del sistema solar, una esfera de billones de cuerpos helados que rodea el Sol a una distancia de entre 2.000 y 100.000 UA. Es el origen de los cometas de largo período. Nunca ha sido observada directamente — su existencia se infiere de la trayectoria de los cometas.",
    fun_fact: "La Nube de Oort es tan extensa que su límite exterior está a 1,87 años luz del Sol — casi la mitad de camino hasta la estrella más cercana. Ni Voyager 1, con 163 UA de distancia, ha llegado aún a su límite interior.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oort_cloud_Sedna_orbit.svg/600px-Oort_cloud_Sedna_orbit.svg.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oort_cloud_Sedna_orbit.svg/280px-Oort_cloud_Sedna_orbit.svg.png",
    },
    physical: { inner_limit_au: 2_000, outer_limit_au: 100_000, outer_limit_ly: 1.87, estimated_objects: "~2 billones", total_mass_earth: 5 },
    moons: [], rings: false,
    discovery: { discoverer: "Jan Oort (hipótesis)", year: 1950 },
  },

  "083": {
    id: "083", name: "Nebulosa Helix", name_en: "Helix Nebula",
    category: "deep_space", subcategory: "Nebulosa planetaria",
    order: 83,
    type: "Nebulosa planetaria (NGC 7293)",
    glb_file: "helix_nebula.glb",
    description: "La nebulosa planetaria más cercana a la Tierra (650 años luz). Llamada el 'Ojo de Dios', es el remanente de una estrella similar al Sol que agotó su combustible. Las capas externas fueron expulsadas y están siendo ionizadas por el núcleo central (una enana blanca). Tiene unos 10.600 años de antigüedad.",
    fun_fact: "A pesar de llamarse 'nebulosa planetaria', no tiene nada que ver con los planetas. El nombre viene del siglo XVIII, cuando los astrónomos confundían su aspecto circular con el disco de un planeta visto por telescopio.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Helix_nebula_-_december_2012.jpg/600px-Helix_nebula_-_december_2012.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Helix_nebula_-_december_2012.jpg/280px-Helix_nebula_-_december_2012.jpg",
    },
    physical: { diameter_ly: 2.5, distance_ly: 650, age_years: 10_600, central_star_temp_c: 120_000 },
    moons: [], rings: false,
    discovery: { discoverer: "Karl Ludwig Harding", year: 1824 },
  },

  "084": {
    id: "084", name: "Vía Láctea", name_en: "Milky Way",
    category: "deep_space", subcategory: "Nuestra galaxia",
    order: 84,
    type: "Galaxia espiral barrada (SBbc)",
    glb_file: "milky_way_galaxy.glb",
    description: "La galaxia que alberga nuestro sistema solar. Tiene entre 100.000 y 400.000 millones de estrellas y un agujero negro supermasivo central llamado Sagitario A* de 4 millones de masas solares. Nuestro Sol orbita el centro galáctico cada 225 millones de años (un 'año galáctico'). Colisionará con Andrómeda en 4.500 millones de años.",
    fun_fact: "Solo desde 2020 podemos saber con precisión dónde estamos en la Vía Láctea gracias al telescopio GAIA. Estamos en el Brazo de Orión, un brazo menor a unos 26.000 años luz del centro.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO_-_Milky_Way.jpg/600px-ESO_-_Milky_Way.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO_-_Milky_Way.jpg/280px-ESO_-_Milky_Way.jpg",
    },
    physical: { diameter_ly: 105_700, thickness_ly: 1_000, mass_solar_masses: "~1.5e12", estimated_stars: "100.000-400.000 millones", age_billion_years: 13.6, distance_to_center_ly: 26_000, central_black_hole: "Sagitario A* — 4 millones de masas solares" },
    moons: [], rings: false,
  },

  "086": {
    id: "086", name: "PSO J318.5-22", name_en: "PSO J318.5-22",
    category: "deep_space", subcategory: "Planeta vagabundo",
    order: 86,
    type: "Planeta vagabundo (sin estrella)",
    glb_file: "PSO J318.5-22.glb",
    description: "Un planeta vagabundo — un planeta sin estrella que viaja libremente por el espacio interestelar. Tiene 6 veces la masa de Júpiter, solo 12 millones de años de edad y se encuentra a 80 años luz de la Tierra. Su temperatura superficial es de unos 1.100°C. Se formó como un planeta y fue expulsado de su sistema.",
    fun_fact: "Se estima que pueden existir más planetas vagabundos que estrellas en nuestra galaxia. Cada sistema planetario puede expulsar decenas de planetas durante su formación caótica.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Lonely_Planet_%2814561003964%29.jpg/600px-Lonely_Planet_%2814561003964%29.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Lonely_Planet_%2814561003964%29.jpg/280px-Lonely_Planet_%2814561003964%29.jpg",
    },
    physical: { mass_jupiter: 6, temperature_c: 1_100, age_million_years: 12, distance_ly: 80 },
    moons: [], rings: false,
    discovery: { discoverer: "Pan-STARRS 1 Survey", year: 2013 },
  },

  // ══════════════════════════════════════
  // EXOPLANETAS
  // ══════════════════════════════════════
  "090": {
    id: "090", name: "Kepler-452b", name_en: "Kepler-452b",
    category: "exoplanet", subcategory: "Super-Tierra en zona habitable",
    order: 90,
    type: "Super-Tierra (posiblemente rocoso)",
    glb_file: "kepler-452b.glb",
    description: "Apodado 'la Tierra 2.0' o el primo mayor de la Tierra. Orbita una estrella G2 (casi idéntica al Sol) en la zona habitable, a una distancia similar a la Tierra-Sol. Tiene 60% más de diámetro y 5 veces más masa que la Tierra. Recibe un 10% más de energía estelar que la Tierra. Lleva 6.000 millones de años en la zona habitable — más que la Tierra.",
    fun_fact: "Si Kepler-452b tiene actividad volcánica (lo que es probable dada su masa), podría tener un efecto invernadero que lo hace demasiado caliente para la vida. Pero si tiene placas tectónicas y océanos, podría ser habitable.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Kepler-452b_artist_concept.jpg/600px-Kepler-452b_artist_concept.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Kepler-452b_artist_concept.jpg/280px-Kepler-452b_artist_concept.jpg",
    },
    physical: { radius_earth: 1.6, mass_earth: 5, gravity_ms2: "~15 estimado", surface_type: "Posiblemente rocoso con agua" },
    orbital: { distance_from_star_au: 1.046, orbital_period_days: 385, star_type: "G2V (casi igual al Sol)", distance_from_earth_ly: 1_402, habitable_zone: true },
    temperature: { mean_c: "similar a la Tierra (estimado)" },
    moons: [], rings: false,
    discovery: { discoverer: "Misión Kepler (NASA)", year: 2015 },
  },

  "091": {
    id: "091", name: "Kepler-22b", name_en: "Kepler-22b",
    category: "exoplanet", subcategory: "Super-Tierra en zona habitable",
    order: 91,
    type: "Super-Tierra (composición desconocida)",
    glb_file: "kepler_22b.glb",
    description: "El primer exoplaneta confirmado orbitando en la zona habitable de una estrella similar al Sol. Tiene 2,4 veces el radio terrestre — podría ser rocoso, oceánico o gaseoso. Su temperatura de equilibrio es de unos 22°C si tiene un efecto invernadero moderado. Está a 600 años luz.",
    fun_fact: "Kepler-22b fue el candidato número 22 de la zona habitable de Kepler. Su temperatura de equilibrio de 22°C le llevó a la prensa a llamarlo 'el planeta más parecido a la Tierra'. Pero su composición sigue siendo desconocida.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kepler-22b_artist_concept.jpg/600px-Kepler-22b_artist_concept.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kepler-22b_artist_concept.jpg/280px-Kepler-22b_artist_concept.jpg",
    },
    physical: { radius_earth: 2.4, mass_earth: "desconocida", temperature_equilibrium_c: 22 },
    orbital: { distance_from_star_au: 0.849, orbital_period_days: 290, star_type: "G5V", distance_from_earth_ly: 620, habitable_zone: true },
    moons: [], rings: false,
    discovery: { discoverer: "Misión Kepler (NASA)", year: 2011 },
  },

  "092": {
    id: "092", name: "Kepler-10c", name_en: "Kepler-10c",
    category: "exoplanet", subcategory: "Mega-Tierra (posiblemente rocosa)",
    order: 92,
    type: "Mega-Tierra",
    glb_file: "kepler_10c.glb",
    description: "Un exoplaneta inusualmente masivo para su tamaño (17 masas terrestres con 2,3 radios terrestres), lo que sugiere que podría ser un planeta rocoso extremadamente denso — una 'Mega-Tierra'. Si es rocoso, tiene una gravedad superficial unas 3 veces mayor que la terrestre. Orbita muy cerca de su estrella.",
    fun_fact: "Kepler-10c desafió los modelos de formación planetaria: se pensaba que un planeta tan masivo no podría ser rocoso porque debería haber acumulado una atmósfera de hidrógeno durante su formación. Su composición sigue siendo debatida.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Kepler-10_system.jpg/600px-Kepler-10_system.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Kepler-10_system.jpg/280px-Kepler-10_system.jpg",
    },
    physical: { radius_earth: 2.35, mass_earth: 17.2, density_gcc: 7.1 },
    orbital: { distance_from_star_au: 0.241, orbital_period_days: 45.3, star_type: "G-type", distance_from_earth_ly: 564 },
    temperature: { mean_c: 584 },
    moons: [], rings: false,
    discovery: { discoverer: "Misión Kepler (NASA)", year: 2011 },
  },

  "093": {
    id: "093", name: "WASP-12b", name_en: "WASP-12b",
    category: "exoplanet", subcategory: "Júpiter caliente en espiral de muerte",
    order: 93,
    type: "Júpiter caliente",
    glb_file: "wasp-12b.glb",
    description: "Un Júpiter caliente en una órbita de solo 1 día terrestre, tan cerca de su estrella que está siendo literalmente devorado. Las mareas estelares deforman el planeta haciéndolo ovalado. Pierde 1/1.000 de su masa cada año y se destruirá completamente en unos 3 millones de años. Absorbe el 94% de la luz que recibe.",
    fun_fact: "WASP-12b es uno de los objetos más oscuros conocidos del universo — tan negro como el asfalto. La temperatura de su lado iluminado es de 2.600°C, caliente como algunas estrellas.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Artist%27s_impression_of_WASP-12b.jpg/600px-Artist%27s_impression_of_WASP-12b.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Artist%27s_impression_of_WASP-12b.jpg/280px-Artist%27s_impression_of_WASP-12b.jpg",
    },
    physical: { mass_jupiter: 1.47, radius_jupiter: 1.79, albedo: 0.06, tidal_distortion: true },
    orbital: { distance_from_star_au: 0.0229, orbital_period_days: 1.09, star_type: "F-type", distance_from_earth_ly: 871, estimated_destruction_years: 3_000_000 },
    temperature: { min_c: 1_500, max_c: 2_600, mean_c: 2_200 },
    moons: [], rings: false,
    discovery: { discoverer: "WASP Survey", year: 2008 },
  },

  "094": {
    id: "094", name: "WASP-193b", name_en: "WASP-193b",
    category: "exoplanet", subcategory: "Júpiter ultra-esponjoso",
    order: 94,
    type: "Júpiter caliente ultra-inflado",
    glb_file: "wasp-193b.glb",
    description: "El segundo exoplaneta menos denso conocido: 40% más grande que Júpiter pero con solo 14% de su masa, con una densidad comparable al algodón de azúcar. Orbita su estrella cada 6,25 días. La razón por la que es tan esponjoso sigue siendo un misterio científico activo.",
    fun_fact: "WASP-193b tiene una densidad de solo 0,059 g/cm³ — para que te hagas una idea, el agua tiene 1 g/cm³ y el Saturno (ya muy esponjoso) tiene 0,69 g/cm³. WASP-193b flotaría en agua como si fuera una bola de corcho gigante.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Artist%27s_illustration_of_WASP-193_b_%28cropped%29.jpg/600px-Artist%27s_illustration_of_WASP-193_b_%28cropped%29.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Artist%27s_illustration_of_WASP-193_b_%28cropped%29.jpg/280px-Artist%27s_illustration_of_WASP-193_b_%28cropped%29.jpg",
    },
    physical: { mass_jupiter: 0.14, radius_jupiter: 1.46, density_gcc: 0.059 },
    orbital: { distance_from_star_au: 0.068, orbital_period_days: 6.25, distance_from_earth_ly: 1_232 },
    temperature: { mean_c: 1_000 },
    moons: [], rings: false,
    discovery: { discoverer: "WASP Survey", year: 2023 },
  },

  "095": {
    id: "095", name: "HD 189733b", name_en: "HD 189733b",
    category: "exoplanet", subcategory: "Júpiter caliente con lluvia de cristal",
    order: 95,
    type: "Júpiter caliente",
    glb_file: "hd_189733_b.glb",
    description: "El exoplaneta más estudiado. Parece un bonito planeta azul, pero es un lugar infernal: su atmósfera de 1.000°C contiene partículas de silicato de hierro que forman nubes de cristal. Los vientos de 8.700 km/h transportan estos cristales horizontalmente — llueve cristal fundido de forma horizontal.",
    fun_fact: "HD 189733b es azul no por el agua sino por las nubes de silicato. Su cara nocturna tiene 260°C menos que la cara diurna — una diferencia de temperatura tan extrema que genera los vientos más fuertes conocidos en cualquier planeta.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Illustration_of_HD_189733b.jpg/600px-Illustration_of_HD_189733b.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Illustration_of_HD_189733b.jpg/280px-Illustration_of_HD_189733b.jpg",
    },
    physical: { mass_jupiter: 1.13, radius_jupiter: 1.14, color: "Azul cobalto" },
    orbital: { distance_from_star_au: 0.0313, orbital_period_days: 2.22, distance_from_earth_ly: 63 },
    temperature: { min_c: 973, max_c: 1_231, mean_c: 1_030 },
    atmosphere: { present: true, composition: { "H₂": "mayoría", "Si partículas": "nubes de cristal" }, wind_speed_kms: 2.4 },
    moons: [], rings: false,
    discovery: { discoverer: "Bouchy et al.", year: 2005 },
  },

  "096": {
    id: "096", name: "Próxima Centauri b", name_en: "Proxima Centauri b",
    category: "exoplanet", subcategory: "Exoplaneta más cercano a la Tierra",
    order: 96,
    type: "Súper-Tierra o Tierra (posiblemente rocoso)",
    glb_file: "proxima_centauri_b_.glb",
    description: "El exoplaneta confirmado más cercano a la Tierra, orbitando Próxima Centauri (la estrella más cercana al Sol) a solo 4,24 años luz. Está en la zona habitable, pero su estrella (una enana roja) emite erupciones de radiación UV y rayos X que podrían ser letales sin un escudo magnético o una atmósfera densa.",
    fun_fact: "Con la tecnología actual, llegar a Próxima Centauri b tardaría 80.000 años. El proyecto Breakthrough Starshot propone enviar nanonsondas al 20% de la velocidad de la luz que llegarían en 20 años.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Artist%27s_impression_of_Proxima_Centauri_b.jpg/600px-Artist%27s_impression_of_Proxima_Centauri_b.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Artist%27s_impression_of_Proxima_Centauri_b.jpg/280px-Artist%27s_impression_of_Proxima_Centauri_b.jpg",
    },
    physical: { mass_earth_min: 1.07, radius_earth: "desconocido", tidally_locked: "posiblemente" },
    orbital: { distance_from_star_au: 0.0485, orbital_period_days: 11.2, star_type: "Enana roja M5.5V", distance_from_earth_ly: 4.24, habitable_zone: true },
    temperature: { mean_c: -39 },
    moons: [], rings: false,
    discovery: { discoverer: "Anglada-Escudé et al.", year: 2016 },
  },

  "097": {
    id: "097", name: "55 Cancri e", name_en: "55 Cancri e",
    category: "exoplanet", subcategory: "Super-Tierra de alta densidad",
    order: 97,
    type: "Super-Tierra (posiblemente rica en carbono)",
    glb_file: "cancri_e.glb",
    description: "Una Super-Tierra que podría estar cubierta de grafito y diamante en su manto, según algunos modelos. Orbita su estrella cada 18 horas, con temperaturas de 2.400°C en su superficie. Investigaciones recientes del JWST sugieren que podría tener una atmósfera secundaria de CO₂ o SO₂.",
    fun_fact: "55 Cancri e fue llamado 'el planeta diamante' por medios de comunicación, aunque la hipótesis es especulativa. Lo que sí es seguro es que su superficie es de roca fundida con un océano de lava permanente.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/55_Cancri_e_-_artist_impression.jpg/600px-55_Cancri_e_-_artist_impression.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/55_Cancri_e_-_artist_impression.jpg/280px-55_Cancri_e_-_artist_impression.jpg",
    },
    physical: { mass_earth: 8.08, radius_earth: 1.875, density_gcc: 10.9 },
    orbital: { distance_from_star_au: 0.0154, orbital_period_hours: 17.7, distance_from_earth_ly: 41 },
    temperature: { mean_c: 2_400 },
    moons: [], rings: false,
    discovery: { discoverer: "McArthur et al.", year: 2004 },
  },

  "098": {
    id: "098", name: "J1407b", name_en: "J1407b",
    category: "exoplanet", subcategory: "Super-Saturno con anillos gigantes",
    order: 98,
    type: "Super-Saturno / Exoanillo",
    glb_file: "j1407b.glb",
    description: "Un exoplaneta o subenana marrón con un sistema de anillos 200 veces mayor que los de Saturno. Su sistema de anillos tiene un diámetro de 180 millones de km — si Saturno tuviera estos anillos, serían visibles a simple vista desde la Tierra y aparecerían más grandes que la Luna llena.",
    fun_fact: "Los anillos de J1407b tienen una brecha en ellos que sugiere que hay una luna en formación dentro del sistema. El telescopio Webb podría ayudar a confirmar su naturaleza exacta.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/J1407b_ring_system_artistic_impression.jpg/600px-J1407b_ring_system_artistic_impression.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/J1407b_ring_system_artistic_impression.jpg/280px-J1407b_ring_system_artistic_impression.jpg",
    },
    physical: { mass_jupiter: "10-40 estimado", ring_diameter_km: 180_000_000, ring_vs_saturn: "200x más grandes" },
    orbital: { orbital_period_years: "~10 estimado", distance_from_earth_ly: 434 },
    moons: [], rings: true,
    discovery: { discoverer: "Matthew Kenworthy / Eric Mamajek", year: 2012 },
  },

  // ══════════════════════════════════════
  // MISIONES ESPACIALES
  // ══════════════════════════════════════
  "100": {
    id: "100", name: "Voyager 1 & 2", name_en: "Voyager 1 & 2",
    category: "space_mission", subcategory: "Sondas interestelares",
    order: 100,
    type: "Sonda espacial (NASA)",
    glb_file: "voyager_nasa.glb",
    description: "Las sondas más lejanas jamás lanzadas por la humanidad. Voyager 1 y 2 fueron lanzadas con 16 días de diferencia en 1977. Aprovecharon una alineación planetaria inusual que ocurre cada 176 años para visitar los cuatro gigantes gaseosos usando la gravedad como propulsión. En 2012 Voyager 1 cruzó la heliopausa, convirtiéndose en el primer objeto humano en el espacio interestelar. Voyager 2 la cruzó en 2018.\n\nCada Voyager lleva el Disco de Oro de Carl Sagan: un disco bañado en oro con 115 imágenes, sonidos de la Tierra, música de Bach a Chuck Berry, y saludos en 55 idiomas. En la portada del disco, Sagan incluyó instrucciones para reproducirlo y la posición del Sol respecto a 14 pulsares conocidos. Si una civilización lo encontrara, podría saber de dónde venimos.\n\nCarl Sagan pidió a la NASA que Voyager 1 se girara justo antes de abandonar el sistema solar para fotografiar la Tierra desde 6.000 millones de km. Esa imagen, de 1990, muestra la Tierra como un punto azul pálido de 0,12 píxeles. Sagan escribió: 'Ese punto azul pálido es aquí, es nuestro hogar, es nosotros.'",
    fun_fact: "Las señales de Voyager 1 viajan a la velocidad de la luz y tardan más de 22 horas en llegar a la Tierra. La nave funciona con una batería de plutonio de 420 vatios — menos que una bombilla. Se estima que dejarán de funcionar alrededor de 2025-2030 cuando la energía se agote.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Voyager_spacecraft.jpg/600px-Voyager_spacecraft.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Voyager_spacecraft.jpg/280px-Voyager_spacecraft.jpg",
    },
    specs: {
      mass_kg: 733,
      power_source: "RTG — plutonio-238 (420W iniciales)",
      launch_voyager1: "5 septiembre 1977",
      launch_voyager2: "20 agosto 1977",
      voyager1_distance_au: 163,
      voyager2_distance_au: 136,
      speed_kms: 17,
      planets_visited: ["Júpiter", "Saturno", "Urano (solo V2)", "Neptuno (solo V2)"],
      golden_record: true,
      pale_blue_dot_photo: "14 febrero 1990, desde 6.000 millones de km",
      carl_sagan_quote: "Ese punto azul pálido es aquí, es nuestro hogar, es nosotros.",
      interstellar_voyager1: "2012",
      interstellar_voyager2: "2018",
    },
    moons: [], rings: false,
  },

  "101": {
    id: "101", name: "ISS", name_en: "International Space Station",
    category: "space_mission", subcategory: "Estación espacial",
    order: 101,
    type: "Estación espacial (NASA/ESA/Roscosmos/JAXA/CSA)",
    glb_file: "iss.glb",
    description: "La estructura más grande jamás construida en el espacio. Orbita a 408 km de altitud a 27.600 km/h, completando 15,5 órbitas diarias. Ha sido habitada de forma continua desde noviembre de 2000. Es el laboratorio científico más complejo en órbita, con experimentos de biología, física, astronomía y meteorología.",
    fun_fact: "Desde la ISS se ven 16 amaneceres y 16 atardeceres cada día. Los astronautas envejecen unos milisegundos más lentamente que en la Tierra — la dilatación del tiempo de la relatividad especial. La ISS es visible a simple vista desde la Tierra.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/600px-International_Space_Station_after_undocking_of_STS-132.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/280px-International_Space_Station_after_undocking_of_STS-132.jpg",
    },
    specs: { mass_kg: 420_000, orbit_altitude_km: 408, orbital_speed_kms: 7.66, crew: 7, modules: 16, launch_first_module: "20 noviembre 1998", length_m: 109, width_m: 73, solar_panels_m2: 2_500 },
    moons: [], rings: false,
  },

  "102": {
    id: "102", name: "Estación MIR", name_en: "MIR Space Station",
    category: "space_mission", subcategory: "Estación espacial soviética/rusa",
    order: 102,
    type: "Estación espacial (URSS/Rusia)",
    glb_file: "mir_station.glb",
    description: "La primera estación espacial modular de la historia. Operativa de 1986 a 2001, fue durante años la estación espacial más grande en órbita. Fue hogar de cosmonautas durante un total de 4.594 días acumulados. Se desintegró controladamente en el Pacífico el 23 de marzo de 2001.",
    fun_fact: "El cosmonauta Valeri Polyakov vivió en la Mir 437 días consecutivos — el récord de estancia en el espacio de una sola misión. Al regresar, necesitó ayuda para caminar pero se recuperó por completo.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Mir_space_station.jpg/600px-Mir_space_station.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Mir_space_station.jpg/280px-Mir_space_station.jpg",
    },
    specs: { mass_kg: 137_000, orbit_altitude_km: 354, launch_date: "20 febrero 1986", deorbit_date: "23 marzo 2001", total_crewed_days: 4_594, longest_mission_days: 437, cosmonauts_hosted: 125 },
    moons: [], rings: false,
  },

  "103": {
    id: "103", name: "Telescopio Hubble", name_en: "Hubble Space Telescope",
    category: "space_mission", subcategory: "Telescopio óptico en órbita",
    order: 103,
    type: "Telescopio espacial (NASA/ESA)",
    glb_file: "hubble.glb",
    description: "El telescopio espacial más famoso de la historia. En órbita desde 1990, ha capturado más de 1,5 millones de imágenes del universo. Contribuyó a determinar que el universo tiene 13.800 millones de años, a descubrir la energía oscura, a medir la velocidad de expansión del universo y a fotografiar planetas del sistema solar con precisión sin precedentes.",
    fun_fact: "El primer espejo del Hubble tenía un defecto de fabricación de 2,2 micrómetros (1/50 del grosor de un cabello humano) que arruinó las primeras imágenes. La NASA envió una misión de reparación en 1993 con correctores ópticos — como unas gafas para el telescopio — y funcionó perfectamente.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/600px-HST-SM4.jpeg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/280px-HST-SM4.jpeg",
    },
    specs: { mass_kg: 11_110, orbit_altitude_km: 537, launch_date: "24 abril 1990", mirror_diameter_m: 2.4, wavelengths: "Ultravioleta, visible e infrarrojo cercano", images_taken: 1_500_000, repair_missions: 5 },
    moons: [], rings: false,
  },

  "104": {
    id: "104", name: "Telescopio James Webb", name_en: "James Webb Space Telescope",
    category: "space_mission", subcategory: "Telescopio infrarrojo en L2",
    order: 104,
    type: "Telescopio espacial infrarrojo (NASA/ESA/CSA)",
    glb_file: "webb.glb",
    description: "El telescopio espacial más potente jamás construido. Lanzado el 25 de diciembre de 2021, operativo desde julio de 2022. Observa en infrarrojo, permitiendo ver las primeras galaxias del universo (13.000 millones de años de antigüedad), atmósferas de exoplanetas, regiones de formación estelar y detalles del sistema solar imposibles para el Hubble.",
    fun_fact: "El escudo solar del Webb tiene el tamaño de una cancha de tenis y lo mantiene a -233°C en la sombra mientras el lado del Sol está a 85°C. Sus 18 espejos hexagonales de berilio bañado en oro se alinean con una precisión de 20 nanómetros.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/The_James_Webb_Space_Telescope.jpg/600px-The_James_Webb_Space_Telescope.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/The_James_Webb_Space_Telescope.jpg/280px-The_James_Webb_Space_Telescope.jpg",
    },
    specs: { mass_kg: 6_200, orbit: "Punto de Lagrange L2 (1,5M km de la Tierra)", launch_date: "25 diciembre 2021", mirror_diameter_m: 6.5, mirror_segments: 18, wavelengths: "Infrarrojo (0,6–28 μm)", sunshield_layers: 5 },
    moons: [], rings: false,
  },

  "105": {
    id: "105", name: "Perseverance", name_en: "Perseverance",
    category: "space_mission", subcategory: "Rover marciano NASA Mars 2020",
    order: 105,
    type: "Rover marciano (NASA)",
    glb_file: "perseverance.glb",
    description: "El rover más sofisticado enviado a Marte. Aterrizó en el cráter Jezero el 18 de febrero de 2021. Busca signos de vida microbiana antigua, recoge muestras para su futura devolución a la Tierra (2033) y llevó el helicóptero Ingenuity, el primer vuelo motorizado en otro planeta (19 de abril de 2021).",
    fun_fact: "Perseverance produjo oxígeno respirable en Marte por primera vez con el experimento MOXIE — una demostración clave para futuras misiones humanas. Ingenuity completó más de 70 vuelos antes de ser dado de baja en enero de 2024.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PIA24543.jpg/600px-PIA24543.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PIA24543.jpg/280px-PIA24543.jpg",
    },
    specs: { mass_kg: 1_025, power_source: "RTG (plutonio-238)", launch_date: "30 julio 2020", landing_date: "18 febrero 2021", location: "Cráter Jezero, Marte", instruments: 7, cameras: 23, samples_collected: 23, helicopter: "Ingenuity" },
    moons: [], rings: false,
  },

  "106": {
    id: "106", name: "Curiosity", name_en: "Curiosity",
    category: "space_mission", subcategory: "Rover marciano NASA MSL",
    order: 106,
    type: "Rover marciano (NASA)",
    glb_file: "curiosity.glb",
    description: "Rover nuclear activo en Marte desde agosto de 2012. Explora el cráter Gale y el Monte Sharp (Aeolis Mons). Ha confirmado que Marte tuvo condiciones habitables en el pasado, detectado moléculas orgánicas complejas y medido la radiación para planificar misiones humanas futuras.",
    fun_fact: "Curiosity lleva grabado en sus ruedas el código Morse con las letras 'JPL', dejando ese mensaje impreso en el suelo de Marte en cada huella. Ha recorrido más de 32 km en más de 4.000 días marcianos.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg/600px-Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg/280px-Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg",
    },
    specs: { mass_kg: 899, power_source: "RTG (plutonio-238)", launch_date: "26 noviembre 2011", landing_date: "6 agosto 2012", location: "Cráter Gale, Monte Sharp, Marte", total_distance_km: 32, sols_active: 4000, drillholes: 40 },
    moons: [], rings: false,
  },

  "107": {
    id: "107", name: "Galileo Orbiter", name_en: "Galileo Orbiter",
    category: "space_mission", subcategory: "Sonda orbitadora de Júpiter",
    order: 107,
    type: "Sonda espacial (NASA)",
    glb_file: "galileo_orbiter.glb",
    description: "La primera nave en orbitar Júpiter (1995-2003). Descubrió el océano subsuperficial de Europa, la actividad volcánica extrema de Ío, el campo magnético de Ganímedes y el océano de Calisto. Terminó su misión sumergiéndose deliberadamente en Júpiter para evitar contaminar Europa.",
    fun_fact: "Galileo tuvo un fallo en su antena principal que nunca pudo desplegarse, lo que redujo drásticamente su capacidad de transmisión de datos. A pesar de ello, envió datos comprimidos que revolucionaron nuestro conocimiento del sistema joviano.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/GalileoProbe.jpg/600px-GalileoProbe.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/GalileoProbe.jpg/280px-GalileoProbe.jpg",
    },
    specs: { mass_kg: 2_564, launch_date: "18 octubre 1989", jupiter_orbit_insertion: "7 diciembre 1995", end_of_mission: "21 septiembre 2003", orbits_completed: 35, discoveries: ["Océano Europa", "Volcanes Ío", "Campo magnético Ganímedes"] },
    moons: [], rings: false,
  },

  "108": {
    id: "108", name: "Módulo Lunar Apollo 11", name_en: "Apollo 11 Lunar Module",
    category: "space_mission", subcategory: "Primer alunizaje tripulado",
    order: 108,
    type: "Módulo lunar (NASA)",
    glb_file: "apollo_11_lunar_module.glb",
    description: "El módulo lunar Eagle de la misión Apollo 11, que llevó a Neil Armstrong y Buzz Aldrin a la superficie de la Luna el 20 de julio de 1969. Es el objeto que hizo posible el mayor logro tecnológico de la humanidad. Aterrizó en el Mar de la Tranquilidad con solo 30 segundos de combustible restantes.",
    fun_fact: "Armstrong dijo: 'Houston, Tranquility Base here. The Eagle has landed.' Buzz Aldrin fue el primero en orinar en la Luna (dentro de su traje). Michael Collins orbitó solo en el módulo de mando, convirtiéndose en la persona más solitaria de la historia.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Apollo_11_lunar_module.jpg/600px-Apollo_11_lunar_module.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Apollo_11_lunar_module.jpg/280px-Apollo_11_lunar_module.jpg",
    },
    specs: { crew: ["Neil Armstrong", "Buzz Aldrin"], command_module_pilot: "Michael Collins", landing_date: "20 julio 1969", landing_site: "Mar de la Tranquilidad", surface_time_hours: 21.5, moonwalk_duration_hours: 2.5, samples_kg: 21.55, fuel_remaining_seconds: 30 },
    moons: [], rings: false,
  },

  "109": {
    id: "109", name: "Sputnik 1 & 2 (Laika)", name_en: "Sputnik 1 & 2",
    category: "space_mission", subcategory: "Primeros satélites artificiales",
    order: 109,
    type: "Satélite artificial (URSS)",
    glb_file: "sputnik_1.glb",
    description: "Sputnik 1 (4 octubre 1957) fue el primer satélite artificial de la historia, lanzado por la URSS. Una esfera metálica de 58 cm que emitía pitidos de radio. Sputnik 2 (3 noviembre 1957) fue el primero en llevar un ser vivo al espacio: Laika, una perra callejera de Moscú. Laika sobrevivió el lanzamiento pero murió de estrés térmico pocas horas después. El mundo supo la verdad décadas más tarde.",
    fun_fact: "Laika fue la primera terrícola en ver el planeta Tierra desde el espacio. Nunca hubo plan de retorno para ella — la tecnología de reentrada no existía aún. Hoy tiene estatuas en su honor en Moscú. La URSS dijo que vivió varios días; la realidad es que murió en pocas horas.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sputnik_asm.jpg/600px-Sputnik_asm.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sputnik_asm.jpg/280px-Sputnik_asm.jpg",
    },
    specs: {
      sputnik1: { mass_kg: 83.6, diameter_cm: 58, launch_date: "4 octubre 1957", orbital_period_min: 96.2, orbits_completed: 1_440, reentry: "4 enero 1958" },
      sputnik2: { mass_kg: 508, launch_date: "3 noviembre 1957", passenger: "Laika (perra callejera)", passenger_fate: "Murió de estrés térmico pocas horas tras el lanzamiento", reentry: "14 abril 1958" },
    },
    moons: [], rings: false,
  },

  "110": {
    id: "110", name: "Sputnik 3", name_en: "Sputnik 3",
    category: "space_mission", subcategory: "Satélite científico soviético",
    order: 110,
    type: "Satélite científico (URSS)",
    glb_file: "sputnik_3.glb",
    description: "El tercer satélite artificial soviético y el primero diseñado específicamente para investigación científica. Lanzado el 15 de mayo de 1958, pesaba 1.327 kg y llevaba 12 instrumentos científicos. Estudió la ionosfera, los campos magnéticos, los rayos cósmicos y la meteorología espacial. Permaneció en órbita hasta 1960.",
    fun_fact: "Sputnik 3 debería haber sido el primero, pero su grabadora de datos falló antes del lanzamiento. Los datos científicos que recogió sentaron las bases de la física del espacio cercano a la Tierra. Su diseño en forma de cono fue un icono del diseño espacial soviético.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Sputnik-3.jpg/600px-Sputnik-3.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Sputnik-3.jpg/280px-Sputnik-3.jpg",
    },
    specs: { mass_kg: 1_327, shape: "Cono", launch_date: "15 mayo 1958", instruments: 12, orbital_period_min: 105.9, reentry: "6 abril 1960" },
    moons: [], rings: false,
  },

  "111": {
    id: "111", name: "Vostok 1", name_en: "Vostok 1",
    category: "space_mission", subcategory: "Primer vuelo espacial tripulado",
    order: 111,
    type: "Nave espacial tripulada (URSS)",
    glb_file: "vostok1.glb",
    description: "La nave que llevó al primer ser humano al espacio. El 12 de abril de 1961, Yuri Gagarin completó una órbita completa alrededor de la Tierra en 108 minutos a bordo del Vostok 1, convirtiéndose en el primer cosmonauta de la historia. La cápsula descendió en paracaídas y Gagarin se eyectó a 7 km de altura aterrizando por separado, aunque la URSS ocultó este detalle durante años para cumplir las reglas de la FAI.",
    fun_fact: "Gagarin dijo al ver la Tierra desde el espacio: '¡La Tierra es azul! ¡Qué maravillosa, es asombrosa!' El vuelo duró solo 108 minutos, pero cambió la historia para siempre. Gagarin nunca volvió a volar al espacio — era demasiado valioso como símbolo para arriesgar en otra misión.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Vostok_spacecraft.jpg/600px-Vostok_spacecraft.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Vostok_spacecraft.jpg/280px-Vostok_spacecraft.jpg",
    },
    specs: {
      mass_kg: 4_725,
      crew: ["Yuri Gagarin"],
      launch_date: "12 abril 1961",
      launch_site: "Cosmódromo de Baikonur, Kazajistán",
      flight_duration_min: 108,
      orbits_completed: 1,
      max_altitude_km: 327,
      landing_date: "12 abril 1961",
      landing_site: "Región de Sarátov, URSS",
      ejection_altitude_km: 7,
    },
    moons: [], rings: false,
    discovery: { discoverer: "OKB-1 / Sergei Korolev", year: 1961 },
  },

  "112": {
    id: "112", name: "Pioneer 11", name_en: "Pioneer 11",
    category: "space_mission", subcategory: "Primera sonda en Saturno",
    order: 112,
    type: "Sonda espacial (NASA)",
    glb_file: "pioneer_11.glb",
    description: "La segunda nave espacial en cruzar el cinturón de asteroides y la primera en sobrevolar Saturno (1979). Descubrió el anillo F de Saturno y dos de sus lunas. Como la Voyager, lleva una placa con la imagen de un hombre y una mujer y la posición del Sol en la galaxia. En 1995 sus transmisores se apagaron.",
    fun_fact: "Pioneer 11 se acerca actualmente a la estrella Lambda Aquilae, a la que llegará en unos 4 millones de años. La placa que lleva fue diseñada por Carl Sagan y Frank Drake — es la primera tarjeta de visita de la humanidad enviada a las estrellas.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Pioneer_10_and_Pioneer_11_-_GPN-2002-000006.jpg/600px-Pioneer_10_and_Pioneer_11_-_GPN-2002-000006.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Pioneer_10_and_Pioneer_11_-_GPN-2002-000006.jpg/280px-Pioneer_10_and_Pioneer_11_-_GPN-2002-000006.jpg",
    },
    specs: { mass_kg: 259, power_source: "RTG (plutonio-238)", launch_date: "6 abril 1973", saturn_flyby: "1 septiembre 1979", signal_lost: "1995", discoveries: ["Anillo F de Saturno", "2 lunas de Saturno", "Campo magnético de Júpiter"] },
    moons: [], rings: false,
  },

  "113": {
    id: "113", name: "Parker Solar Probe", name_en: "Parker Solar Probe",
    category: "space_mission", subcategory: "Sonda solar más cercana",
    order: 113,
    type: "Sonda solar (NASA)",
    glb_file: "parker_solar_probe.glb",
    description: "La nave más rápida y la que más cerca ha llegado al Sol en la historia. En 2024 alcanzó 6,1 millones de km de la corona solar, viajando a 690.000 km/h — la velocidad más alta alcanzada por un objeto fabricado por humanos. Estudia el viento solar y los mecanismos de calentamiento de la corona.",
    fun_fact: "A 690.000 km/h, Parker podría viajar de New York a Los Ángeles en 21 segundos. Su escudo térmico aguanta temperaturas de 1.370°C por fuera mientras los instrumentos están a temperatura ambiente por dentro.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Parker_Solar_Probe.jpg/600px-Parker_Solar_Probe.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Parker_Solar_Probe.jpg/280px-Parker_Solar_Probe.jpg",
    },
    specs: { mass_kg: 685, launch_date: "12 agosto 2018", max_speed_kms: 690_000, closest_approach_km: 6_100_000, shield_temp_c: 1_370, instruments: 4 },
    moons: [], rings: false,
  },

  "114": {
    id: "114", name: "Juno", name_en: "Juno",
    category: "space_mission", subcategory: "Orbitador de Júpiter",
    order: 114,
    type: "Sonda espacial (NASA)",
    glb_file: "juno.glb",
    description: "La primera nave solar en alcanzar el sistema joviano. Orbita Júpiter en una órbita polar muy elíptica para esquivar los cinturones de radiación. Ha revelado que Júpiter tiene un núcleo difuso y 'esponjoso' en lugar de sólido, que sus auroras son las más poderosas del sistema solar y que sus ciclones polares tienen hasta 1.400 km de diámetro.",
    fun_fact: "Juno lleva tres pequeñas figuras de LEGO a bordo: Galileo Galilei (con su telescopio), el dios romano Júpiter y su esposa Juno. Es la primera vez que LEGO ha ido al espacio exterior.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Juno_spacecraft_model_1.png/600px-Juno_spacecraft_model_1.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Juno_spacecraft_model_1.png/280px-Juno_spacecraft_model_1.png",
    },
    specs: { mass_kg: 3_625, power_source: "Solar (paneles)", launch_date: "5 agosto 2011", jupiter_orbit_insertion: "5 julio 2016", orbital_period_days: 53, lego_figures: ["Galileo", "Júpiter", "Juno"] },
    moons: [], rings: false,
  },

  // ══════════════════════════════════════
  // FICCIÓN CIENTÍFICA
  // ══════════════════════════════════════
  "115": {
    id: "115", name: "Nave del Planeta Express", name_en: "Planet Express Ship",
    category: "fantasy", subcategory: "Nave de ficción (Futurama)",
    order: 115,
    type: "Nave espacial ficticia (Serie Futurama)",
    glb_file: "planet_express_spaceship.glb",
    description: "La nave de reparto de la empresa Planet Express de la serie de animación Futurama (1999-2023). Creada por Matt Groening, la serie está ambientada en el año 3000. La nave usa un motor de materia oscura y puede doblar el espacio para viajar más rápido que la luz. Es culturalmente icónica como símbolo del optimismo espacial con humor.",
    fun_fact: "Futurama fue creada por Matt Groening (The Simpsons) y David X. Cohen. Contiene más referencias científicas reales que cualquier otra comedia animada — varios guionistas tienen doctorados en ciencias. El número de teléfono de Planet Express es 1-800-PACKAGE.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Planet_Express_Futurama.png/600px-Planet_Express_Futurama.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Planet_Express_Futurama.png/280px-Planet_Express_Futurama.png",
    },
    specs: { fictional: true, universe: "Futurama (Fox/Comedy Central)", year_set: 3000, engine: "Motor de materia oscura", crew: ["Fry", "Leela", "Bender"], mission: "Reparto interestelar" },
    moons: [], rings: false,
  },

  "116": {
    id: "116", name: "Halo Ring", name_en: "Halo Ring",
    category: "fantasy", subcategory: "Estructura de ficción (Halo)",
    order: 116,
    type: "Instalación Forerunner (videojuego Halo)",
    glb_file: "halo_ring.glb",
    description: "Los Anillos Halo son megaestructuras ficticias del universo de Halo (Microsoft/Bungie/343 Industries). Son instalaciones de 10.000 km de diámetro construidas por los Forerunners para contener y estudiar al Flood (un parásito extraterrestre). En caso de activación, erradican toda vida sensible en un radio de 25.000 años luz.",
    fun_fact: "El concepto del Anillo Halo fue inspirado en la idea del Mundo Anillo de Larry Niven (1970) y en la esfera de Dyson. La serie Halo es una de las más influyentes de los videojuegos y tiene una serie de TV en Paramount+.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Halo_ring.jpg/600px-Halo_ring.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Halo_ring.jpg/280px-Halo_ring.jpg",
    },
    specs: { fictional: true, universe: "Halo (Microsoft/Bungie/343)", diameter_km: 10_000, width_km: 318, gravity: "0.99g (interior)", purpose: "Contención del Flood / arma de erradicación masiva", installations: 7 },
    moons: [], rings: false,
  },

  "117": {
    id: "117", name: "Estrella de la Muerte", name_en: "Death Star",
    category: "fantasy", subcategory: "Estación de batalla (Star Wars)",
    order: 117,
    type: "Estación espacial de batalla (Star Wars)",
    glb_file: "death_star.glb",
    description: "La megaestructura icónica del universo Star Wars. Una luna artificial con capacidad para destruir planetas con su superlaser. Tiene 160 km de diámetro y alberga más de un millón de tripulantes. Fue destruida dos veces por la Alianza Rebelde. Luke Skywalker la destruyó disparando fotones de combustible en un tubo de escape de 2 metros usando La Fuerza.",
    fun_fact: "Físicos del MIT calcularon que construir la Estrella de la Muerte costaría 852 cuatrillones de dólares solo en acero, y tardaría 833.000 años. En 2012, la Casa Blanca rechazó formalmente una petición ciudadana de construirla.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Death_star1.png/600px-Death_star1.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Death_star1.png/280px-Death_star1.png",
    },
    specs: { fictional: true, universe: "Star Wars (Lucasfilm/Disney)", diameter_km: 160, crew: 1_186_295, weapon: "Superlaser (destructor de planetas)", destroyed: ["Batalla de Yavin (Episodio IV)", "Batalla de Endor (Episodio VI)"] },
    moons: [], rings: false,
  },

  "118": {
    id: "118", name: "Nave Transformers Cybertron", name_en: "Transformers Cybertron Ship",
    category: "fantasy", subcategory: "Nave de ficción (Transformers)",
    order: 118,
    type: "Nave espacial ficticia (Transformers)",
    glb_file: "transformers-_the_planet_cybertron.glb",
    description: "Representación de Cybertron, el planeta natal de los Transformers en la franquicia de Hasbro/Paramount. Cybertron es un planeta mecánico completamente artificial y consciente, hogar de los Autobots y Decepticons. En algunas versiones del canon, fue el propio Unicrón (un planeta devorador de mundos) quien lo creó.",
    fun_fact: "Cybertron inspiró el concepto científico de 'mundo mecánico'. En astrofísica teórica, una Esfera de Dyson sería una megaestructura que envuelve una estrella para capturar su energía — similar al concepto de Cybertron.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Cybertron.jpg/600px-Cybertron.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Cybertron.jpg/280px-Cybertron.jpg",
    },
    specs: { fictional: true, universe: "Transformers (Hasbro/Paramount)", type: "Planeta mecánico artificial", inhabitants: ["Autobots", "Decepticons"], diameter_km: "Similar a la Tierra (varía según el canon)" },
    moons: [], rings: false,
  },

  "119": {
    id: "119", name: "Estación Espacial 2001", name_en: "Space Station V (2001)",
    category: "fantasy", subcategory: "Estación espacial de ficción",
    order: 119,
    type: "Estación espacial ficticia (2001: A Space Odyssey)",
    glb_file: "space_station_v_2001_a_space_odyssey.glb",
    description: "La Estación Espacial V de la película '2001: Una Odisea del Espacio' (Stanley Kubrick, 1968). Una rueda giratoria de 300 m de diámetro que crea gravedad artificial mediante la rotación. Diseñada por Harry Lange con asesoramiento de la NASA y empresas aeroespaciales reales, su diseño influyó en el diseño real de estaciones espaciales durante décadas.",
    fun_fact: "Kubrick y Clarke diseñaron la estación en 1964-65 — cinco años antes de que el hombre llegara a la Luna. Muchos ingenieros de la NASA admiten que '2001' influyó directamente en sus diseños. La escena del vals con Strauss es una de las más icónicas de la historia del cine.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Space_Station_V_2001.jpg/600px-Space_Station_V_2001.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Space_Station_V_2001.jpg/280px-Space_Station_V_2001.jpg",
    },
    specs: { fictional: true, universe: "2001: A Space Odyssey (Stanley Kubrick, 1968)", diameter_m: 300, gravity: "Artificial (rotación)", ost: "Danubio Azul — Johann Strauss II" },
    moons: [], rings: false,
  },

  "120": {
    id: "120", name: "Nave Namek", name_en: "Namek Spaceship",
    category: "fantasy", subcategory: "Nave de ficción (Dragon Ball Z)",
    order: 120,
    type: "Nave espacial ficticia (Dragon Ball Z)",
    glb_file: "namek_spaceship.glb",
    description: "La nave espacial namekiana del universo Dragon Ball Z (Akira Toriyama). Los namekianos son una especie extraterrestre verde con antenas que pueden regenerar extremidades y tienen habilidades sobrenaturales. El Planeta Namek fue el escenario del arco más famoso de Dragon Ball Z, donde Goku se transformó en Super Saiyan por primera vez.",
    fun_fact: "Dragon Ball Z es una de las series de anime más influyentes de la historia. El grito de Goku transformándose en Super Saiyan dura varios episodios — se convirtió en un meme cultural. La franquicia ha generado más de 20.000 millones de dólares en ventas globales.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/1/17/Dragon_ball_logo.svg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/1/17/Dragon_ball_logo.svg",
    },
    specs: { fictional: true, universe: "Dragon Ball Z (Akira Toriyama)", origin_planet: "Namek", purpose: "Transporte interestelar namekiano" },
    moons: [], rings: false,
  },

  "085": {
    id: "085", name: "Vía Láctea Chocolatina", name_en: "Milky Way (chocolate)",
    category: "fantasy", subcategory: "Nuestra galaxia (versión especial)",
    order: 999,
    type: "Galaxia espiral barrada (SBbc)",
    glb_file: "milky_way_chocolatina.glb",
    description: "Representación alternativa de la Vía Láctea. Mismos datos que su hermana, pero con una estética diferente para visualizaciones y proyectos 3D. Contiene los mismos 400.000 millones de estrellas, el mismo agujero negro Sagitario A* y el mismo Sol perdido en un brazo espiral.",
    fun_fact: "El nombre 'Vía Láctea' viene del latín Via Lactea, que significa 'camino de leche'. Los griegos la llamaban Galaxías Kýklos (círculo lechoso), de donde viene la palabra 'galaxia'.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO_-_Milky_Way.jpg/600px-ESO_-_Milky_Way.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO_-_Milky_Way.jpg/280px-ESO_-_Milky_Way.jpg",
    },
    physical: { diameter_ly: 105_700, age_billion_years: 13.6, estimated_stars: "100.000-400.000 millones" },
    moons: [], rings: false,
  },
};

// ─────────────────────────────────────────
// COLECCIONES
// ─────────────────────────────────────────
const allBodies   = Object.values(bodiesData).sort((a, b) => a.order - b.order);
const planetsOnly = allBodies.filter(b => b.category === "planet");

const CATEGORIES = ["star","planet","dwarf_planet","moon","asteroid","comet","deep_space","exoplanet","space_mission","black_hole"];

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────
app.use((req, res, next) => {
  res.setHeader("X-API-Name", "Planets API");
  res.setHeader("X-API-Version", "4.0.0");
  next();
});

// ─────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────

// GET /
app.get("/", (req, res) => {
  const base = baseUrl(req);
  res.json({
    name: "🪐 Planets API",
    version: "4.0.0",
    description: "API REST del Sistema Solar y más allá — modelos 3D GLB, datos científicos, exoplanetas, misiones espaciales y espacio profundo",
    endpoints: {
      "GET /v1/bodies":                  "Todos los cuerpos (filtro: ?category=)",
      "GET /v1/bodies/:id":              "Cuerpo por ID numérico",
      "GET /v1/bodies/:id/model":        "Redirige al archivo GLB",
      "GET /v1/planets":                 "Solo los 8 planetas del sistema solar",
      "GET /v1/planets/:id":             "Planeta por ID numérico",
      "GET /v1/planets/:id/moons":       "Lunas de un planeta",
      "GET /v1/search?name=":            "Buscar por nombre (español/inglés)",
      "GET /v1/compare?a=&b=":           "Comparar dos cuerpos por ID",
      "GET /v1/random":                  "Cuerpo aleatorio (?category= opcional)",
      "GET /v1/fact/:id":                "Curiosidad destacada de un cuerpo",
      "GET /v1/categories":              "Lista de categorías disponibles",
      "GET /v1/stats":                   "Estadísticas generales",
    },
    categories: CATEGORIES,
    total_bodies: allBodies.length,
    models_base_url: `${base}/models/`,
    id_format: "ID numérico de 3 dígitos (ej: 010 = Mercurio, 090 = Kepler-452b, 100 = Voyager)",
  });
});

// GET /v1/categories
app.get("/v1/categories", (req, res) => {
  const counts = {};
  CATEGORIES.forEach(c => { counts[c] = allBodies.filter(b => b.category === c).length; });
  res.json({ categories: CATEGORIES, counts });
});

// GET /v1/bodies
app.get("/v1/bodies", (req, res) => {
  const { category } = req.query;
  const base = baseUrl(req);
  let result = allBodies;
  if (category) result = result.filter(b => b.category === category);
  res.json({
    count: result.length,
    bodies: result.map(b => ({
      id: b.id,
      name: b.name,
      name_en: b.name_en,
      category: b.category,
      subcategory: b.subcategory,
      type: b.type,
      thumbnail: b.images?.thumbnail,
      model_url: `${base}/models/${b.glb_file}`,
    })),
  });
});

// GET /v1/bodies/:id
app.get("/v1/bodies/:id", (req, res) => {
  const id = req.params.id.padStart(3, "0");
  const body = bodiesData[id];
  if (!body) return res.status(404).json({ error: "Cuerpo no encontrado", tip: "El ID debe ser numérico (ej: 010, 090, 100)", valid_ids: Object.keys(bodiesData) });
  const base = baseUrl(req);
  res.json({ ...body, model_url: `${base}/models/${body.glb_file}` });
});

// GET /v1/bodies/:id/model
app.get("/v1/bodies/:id/model", (req, res) => {
  const id = req.params.id.padStart(3, "0");
  const body = bodiesData[id];
  if (!body) return res.status(404).json({ error: "Cuerpo no encontrado" });
  res.redirect(`/models/${body.glb_file}`);
});

// GET /v1/planets
app.get("/v1/planets", (req, res) => {
  const { rings, moons } = req.query;
  const base = baseUrl(req);
  let result = planetsOnly;
  if (rings !== undefined) result = result.filter(p => p.rings === (rings === "true"));
  if (moons !== undefined) result = result.filter(p => p.moons.length >= parseInt(moons));
  res.json({
    count: result.length,
    planets: result.map(p => ({
      id: p.id, name: p.name, order: p.order, type: p.type,
      diameter_km: p.physical?.diameter_km,
      moons_count: p.moons?.length,
      rings: p.rings,
      thumbnail: p.images?.thumbnail,
      model_url: `${base}/models/${p.glb_file}`,
    })),
  });
});

// GET /v1/planets/:id
app.get("/v1/planets/:id", (req, res) => {
  const id = req.params.id.padStart(3, "0");
  const planet = bodiesData[id];
  if (!planet || planet.category !== "planet") {
    return res.status(404).json({ error: "Planeta no encontrado", tip: "Para otros cuerpos usa /v1/bodies/:id", valid_planet_ids: planetsOnly.map(p => p.id) });
  }
  const base = baseUrl(req);
  res.json({ ...planet, model_url: `${base}/models/${planet.glb_file}` });
});

// GET /v1/planets/:id/moons
app.get("/v1/planets/:id/moons", (req, res) => {
  const id = req.params.id.padStart(3, "0");
  const planet = bodiesData[id];
  if (!planet) return res.status(404).json({ error: "Planeta no encontrado" });
  res.json({ planet: planet.name, moon_count: planet.moons?.length || 0, moons: planet.moons || [] });
});

// GET /v1/search
app.get("/v1/search", (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Debes proporcionar ?name=" });
  const base = baseUrl(req);
  const results = allBodies.filter(b =>
    b.name?.toLowerCase().includes(name.toLowerCase()) ||
    b.name_en?.toLowerCase().includes(name.toLowerCase())
  );
  res.json({
    query: name, count: results.length,
    results: results.map(b => ({
      id: b.id, name: b.name, category: b.category, subcategory: b.subcategory,
      thumbnail: b.images?.thumbnail,
      model_url: `${base}/models/${b.glb_file}`,
    })),
  });
});

// GET /v1/compare
app.get("/v1/compare", (req, res) => {
  const { a, b } = req.query;
  if (!a || !b) return res.status(400).json({ error: "Debes proporcionar ?a=id1&b=id2" });
  const bodyA = bodiesData[a.padStart(3, "0")];
  const bodyB = bodiesData[b.padStart(3, "0")];
  if (!bodyA || !bodyB) return res.status(404).json({ error: "Uno o ambos cuerpos no encontrados" });
  const base = baseUrl(req);
  const cmp = (label, vA, vB, unit = "") => ({
    label,
    [bodyA.name]: `${vA ?? "N/A"}${unit}`,
    [bodyB.name]: `${vB ?? "N/A"}${unit}`,
    larger: (vA != null && vB != null) ? (vA > vB ? bodyA.name : vB > vA ? bodyB.name : "Igual") : "N/A",
  });
  res.json({
    bodies: [bodyA.name, bodyB.name],
    ids: [bodyA.id, bodyB.id],
    categories: [bodyA.category, bodyB.category],
    images: { [bodyA.name]: bodyA.images?.thumbnail, [bodyB.name]: bodyB.images?.thumbnail },
    models: { [bodyA.name]: `${base}/models/${bodyA.glb_file}`, [bodyB.name]: `${base}/models/${bodyB.glb_file}` },
    comparison: [
      cmp("Diámetro", bodyA.physical?.diameter_km, bodyB.physical?.diameter_km, " km"),
      cmp("Gravedad", bodyA.physical?.gravity_ms2, bodyB.physical?.gravity_ms2, " m/s²"),
      cmp("Temperatura media", bodyA.temperature?.mean_c, bodyB.temperature?.mean_c, " °C"),
      cmp("Lunas", bodyA.moons?.length, bodyB.moons?.length),
    ],
  });
});

// GET /v1/random
app.get("/v1/random", (req, res) => {
  const { category } = req.query;
  const base = baseUrl(req);
  let pool = allBodies;
  if (category) pool = pool.filter(b => b.category === category);
  if (!pool.length) return res.status(404).json({ error: "No hay cuerpos en esa categoría", valid_categories: CATEGORIES });
  const body = pool[Math.floor(Math.random() * pool.length)];
  res.json({ ...body, model_url: `${base}/models/${body.glb_file}` });
});

// GET /v1/fact/:id
app.get("/v1/fact/:id", (req, res) => {
  const id = req.params.id.padStart(3, "0");
  const body = bodiesData[id];
  if (!body) return res.status(404).json({ error: "Cuerpo no encontrado" });
  res.json({ id: body.id, name: body.name, category: body.category, fun_fact: body.fun_fact || "Sin curiosidad registrada.", thumbnail: body.images?.thumbnail });
});

// GET /v1/stats
app.get("/v1/stats", (req, res) => {
  const stats = {};
  CATEGORIES.forEach(c => { stats[c] = allBodies.filter(b => b.category === c).length; });
  const planets = planetsOnly;
  const byDiam = [...planets].sort((a,b) => b.physical?.diameter_km - a.physical?.diameter_km);
  const byGrav = [...planets].sort((a,b) => b.physical?.gravity_ms2 - a.physical?.gravity_ms2);
  const byMoons = [...planets].sort((a,b) => (b.moons_total||b.moons?.length||0) - (a.moons_total||a.moons?.length||0));
  res.json({
    total_bodies: allBodies.length,
    by_category: stats,
    planets: {
      largest: { name: byDiam[0]?.name, diameter_km: byDiam[0]?.physical?.diameter_km },
      smallest: { name: byDiam.at(-1)?.name, diameter_km: byDiam.at(-1)?.physical?.diameter_km },
      most_moons: { name: byMoons[0]?.name, moons: byMoons[0]?.moons_total || byMoons[0]?.moons?.length },
      highest_gravity: { name: byGrav[0]?.name, gravity_ms2: byGrav[0]?.physical?.gravity_ms2 },
      hottest: { name: "Venus", temp_c: 462 },
      coldest_known: { name: "Tritón", temp_c: -235 },
    },
    fastest_object: { name: "Parker Solar Probe", speed_kms: 690_000 },
    farthest_spacecraft: { name: "Voyager 1", distance_au: 163 },
    carl_sagan_quote: "Ese punto azul pálido es aquí, es nuestro hogar, es nosotros.",
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint no encontrado", message: `'${req.path}' no existe. Visita / para ver todos los endpoints.` });
});

// ─────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n🪐 Planets API v4.0 en http://localhost:${PORT}`);
  console.log(`📦 ${Object.keys(bodiesData).length} cuerpos cargados`);
  console.log(`🗂️  Modelos en http://localhost:${PORT}/models/\n`);
});

module.exports = app;
