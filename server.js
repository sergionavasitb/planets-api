const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────
// STATIC — sirve los archivos GLB
// ─────────────────────────────────────────
app.use("/models", express.static(path.join(__dirname, "models"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".glb")) {
      res.setHeader("Content-Type", "model/gltf-binary");
      res.setHeader("Cache-Control", "public, max-age=86400");
    }
  }
}));

// ─────────────────────────────────────────
// HELPER — construye la URL base
// ─────────────────────────────────────────
const baseUrl = (req) => `${req.protocol}://${req.get("host")}`;

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const bodiesData = {
  // ── SOL ──────────────────────────────
  sun: {
    id: "sun",
    name: "Sol",
    name_en: "Sun",
    category: "star",
    order: 0,
    type: "Estrella enana amarilla (G2V)",
    glb_file: "sun.glb",
    description:
      "La estrella central de nuestro sistema solar. Contiene el 99,86% de toda la masa del sistema solar y su energía proviene de la fusión nuclear de hidrógeno en helio en su núcleo.",
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
      core_temp_c: 15_000_000,
    },
    moons: [],
    rings: false,
  },

  // ── MERCURIO ─────────────────────────
  mercury: {
    id: "mercury",
    name: "Mercurio",
    name_en: "Mercury",
    category: "planet",
    order: 1,
    type: "Planeta rocoso",
    glb_file: "mercurio.glb",
    description:
      "El planeta más pequeño y más cercano al Sol. Sus temperaturas extremas varían cientos de grados entre el día y la noche debido a la ausencia de atmósfera significativa.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/600px-Mercury_in_true_color.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/280px-Mercury_in_true_color.jpg",
    },
    physical: {
      diameter_km: 4_879,
      mass_kg: "3.30e23",
      density_gcc: 5.43,
      gravity_ms2: 3.7,
      escape_velocity_kms: 4.25,
      rotation_period_days: 58.65,
      axial_tilt_deg: 0.034,
    },
    orbital: {
      distance_from_sun_km: 57_910_000,
      perihelion_km: 46_000_000,
      aphelion_km: 69_820_000,
      orbital_period_days: 88,
      orbital_speed_kms: 47.87,
      eccentricity: 0.2056,
      inclination_deg: 7.0,
    },
    atmosphere: {
      present: true,
      composition: { "Oxígeno (O₂)": "42%", "Sodio (Na)": "29%", "Hidrógeno (H₂)": "22%", "Helio (He)": "6%" },
      surface_pressure_atm: "~5e-15",
    },
    temperature: { min_c: -180, max_c: 430, mean_c: 167 },
    moons: [],
    rings: false,
    explored_by: ["Mariner 10 (1974)", "MESSENGER (2011–2015)", "BepiColombo (en camino)"],
  },

  // ── VENUS ────────────────────────────
  venus: {
    id: "venus",
    name: "Venus",
    name_en: "Venus",
    category: "planet",
    order: 2,
    type: "Planeta rocoso",
    glb_file: "venus.glb",
    description:
      "El planeta más caliente del sistema solar gracias a un extremo efecto invernadero. Gira en sentido retrógrado y un día en Venus dura más que su año.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Venus_2_Approach_Image.jpg/600px-Venus_2_Approach_Image.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Venus_2_Approach_Image.jpg/280px-Venus_2_Approach_Image.jpg",
    },
    physical: {
      diameter_km: 12_104,
      mass_kg: "4.87e24",
      density_gcc: 5.24,
      gravity_ms2: 8.87,
      escape_velocity_kms: 10.36,
      rotation_period_days: -243.02,
      axial_tilt_deg: 177.36,
    },
    orbital: {
      distance_from_sun_km: 108_200_000,
      perihelion_km: 107_476_000,
      aphelion_km: 108_942_000,
      orbital_period_days: 224.7,
      orbital_speed_kms: 35.02,
      eccentricity: 0.0067,
      inclination_deg: 3.39,
    },
    atmosphere: {
      present: true,
      composition: { "CO₂": "96.5%", "Nitrógeno (N₂)": "3.5%", "SO₂": "trazas" },
      surface_pressure_atm: 92,
    },
    temperature: { min_c: 462, max_c: 462, mean_c: 462 },
    moons: [],
    rings: false,
    explored_by: ["Venera 7 (1970)", "Magellan (1990)", "Venus Express (2006)"],
  },

  // ── TIERRA ───────────────────────────
  earth: {
    id: "earth",
    name: "Tierra",
    name_en: "Earth",
    category: "planet",
    order: 3,
    type: "Planeta rocoso",
    glb_file: "tierra.glb",
    description:
      "El único planeta conocido con vida. Cuenta con agua líquida en su superficie, una atmósfera rica en oxígeno y un campo magnético que la protege de la radiación solar.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/600px-The_Earth_seen_from_Apollo_17.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/280px-The_Earth_seen_from_Apollo_17.jpg",
    },
    physical: {
      diameter_km: 12_756,
      mass_kg: "5.97e24",
      density_gcc: 5.51,
      gravity_ms2: 9.81,
      escape_velocity_kms: 11.19,
      rotation_period_days: 0.9973,
      axial_tilt_deg: 23.44,
    },
    orbital: {
      distance_from_sun_km: 149_600_000,
      perihelion_km: 147_098_291,
      aphelion_km: 152_098_233,
      orbital_period_days: 365.25,
      orbital_speed_kms: 29.78,
      eccentricity: 0.0167,
      inclination_deg: 0.0,
    },
    atmosphere: {
      present: true,
      composition: { "Nitrógeno (N₂)": "78.09%", "Oxígeno (O₂)": "20.95%", "Argón (Ar)": "0.93%", "CO₂": "0.04%" },
      surface_pressure_atm: 1,
    },
    temperature: { min_c: -88, max_c: 58, mean_c: 15 },
    moons: [{ name: "Luna", diameter_km: 3_474, distance_km: 384_400 }],
    rings: false,
    explored_by: ["Sede de la humanidad"],
  },

  // ── LUNA ─────────────────────────────
  moon: {
    id: "moon",
    name: "Luna",
    name_en: "Moon",
    category: "moon",
    order: 3.1,
    type: "Satélite natural",
    glb_file: "moon.glb",
    parent: "earth",
    description:
      "El único satélite natural de la Tierra y el quinto más grande del sistema solar. Es el único cuerpo extraterrestre en el que han pisado seres humanos (misiones Apollo, 1969–1972).",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/600px-FullMoon2010.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/280px-FullMoon2010.jpg",
    },
    physical: {
      diameter_km: 3_474,
      mass_kg: "7.35e22",
      density_gcc: 3.34,
      gravity_ms2: 1.62,
      escape_velocity_kms: 2.38,
      rotation_period_days: 27.32,
      axial_tilt_deg: 6.68,
    },
    orbital: {
      distance_from_earth_km: 384_400,
      perihelion_km: 362_600,
      aphelion_km: 405_500,
      orbital_period_days: 27.32,
      orbital_speed_kms: 1.022,
      eccentricity: 0.0549,
      inclination_deg: 5.14,
    },
    atmosphere: { present: false },
    temperature: { min_c: -183, max_c: 127, mean_c: -53 },
    moons: [],
    rings: false,
    explored_by: ["Luna 2 (1959)", "Apollo 11 (1969)", "Apollo 17 (1972)", "Chang'e 5 (2020)"],
  },

  // ── MARTE ────────────────────────────
  mars: {
    id: "mars",
    name: "Marte",
    name_en: "Mars",
    category: "planet",
    order: 4,
    type: "Planeta rocoso",
    glb_file: "marte.glb",
    description:
      "El Planeta Rojo. Alberga el volcán más grande del sistema solar (Olympus Mons) y evidencia de agua líquida en su pasado. Principal objetivo de exploración humana.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/280px-OSIRIS_Mars_true_color.jpg",
    },
    physical: {
      diameter_km: 6_792,
      mass_kg: "6.39e23",
      density_gcc: 3.93,
      gravity_ms2: 3.72,
      escape_velocity_kms: 5.03,
      rotation_period_days: 1.026,
      axial_tilt_deg: 25.19,
    },
    orbital: {
      distance_from_sun_km: 227_900_000,
      perihelion_km: 206_620_000,
      aphelion_km: 249_230_000,
      orbital_period_days: 687,
      orbital_speed_kms: 24.08,
      eccentricity: 0.0935,
      inclination_deg: 1.85,
    },
    atmosphere: {
      present: true,
      composition: { "CO₂": "95.3%", "Nitrógeno (N₂)": "2.7%", "Argón (Ar)": "1.6%" },
      surface_pressure_atm: 0.006,
    },
    temperature: { min_c: -143, max_c: 35, mean_c: -63 },
    moons: [
      { name: "Fobos", diameter_km: 22.2, distance_km: 9_376 },
      { name: "Deimos", diameter_km: 12.4, distance_km: 23_463 },
    ],
    rings: false,
    explored_by: ["Viking 1 (1976)", "Pathfinder (1997)", "Curiosity (2012)", "Perseverance (2021)"],
  },

  // ── JÚPITER ──────────────────────────
  jupiter: {
    id: "jupiter",
    name: "Júpiter",
    name_en: "Jupiter",
    category: "planet",
    order: 5,
    type: "Gigante gaseoso",
    glb_file: "jupiter.glb",
    description:
      "El planeta más grande del sistema solar. Su Gran Mancha Roja es una tormenta activa desde hace más de 350 años. Tiene 95 lunas conocidas.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/600px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/280px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    },
    physical: {
      diameter_km: 142_984,
      mass_kg: "1.90e27",
      density_gcc: 1.33,
      gravity_ms2: 24.79,
      escape_velocity_kms: 59.5,
      rotation_period_days: 0.414,
      axial_tilt_deg: 3.13,
    },
    orbital: {
      distance_from_sun_km: 778_500_000,
      perihelion_km: 740_520_000,
      aphelion_km: 816_620_000,
      orbital_period_days: 4_333,
      orbital_speed_kms: 13.07,
      eccentricity: 0.0489,
      inclination_deg: 1.3,
    },
    atmosphere: {
      present: true,
      composition: { "Hidrógeno (H₂)": "89.8%", "Helio (He)": "10.2%" },
      surface_pressure_atm: null,
    },
    temperature: { min_c: -108, max_c: -108, mean_c: -108 },
    moons: [
      { name: "Ío", diameter_km: 3_643, distance_km: 421_800 },
      { name: "Europa", diameter_km: 3_122, distance_km: 671_100 },
      { name: "Ganímedes", diameter_km: 5_268, distance_km: 1_070_400 },
      { name: "Calisto", diameter_km: 4_821, distance_km: 1_882_700 },
    ],
    rings: true,
    explored_by: ["Pioneer 10 (1973)", "Voyager 1 & 2 (1979)", "Galileo (1995)", "Juno (2016)"],
  },

  // ── SATURNO ──────────────────────────
  saturn: {
    id: "saturn",
    name: "Saturno",
    name_en: "Saturn",
    category: "planet",
    order: 6,
    type: "Gigante gaseoso",
    glb_file: "saturno.glb",
    description:
      "Famoso por sus espectaculares anillos de hielo y roca. Es el planeta menos denso del sistema solar — flotaría en agua. Tiene 146 lunas conocidas.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/600px-Saturn_during_Equinox.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/280px-Saturn_during_Equinox.jpg",
    },
    physical: {
      diameter_km: 120_536,
      mass_kg: "5.68e26",
      density_gcc: 0.69,
      gravity_ms2: 10.44,
      escape_velocity_kms: 35.5,
      rotation_period_days: 0.444,
      axial_tilt_deg: 26.73,
    },
    orbital: {
      distance_from_sun_km: 1_432_000_000,
      perihelion_km: 1_352_550_000,
      aphelion_km: 1_514_500_000,
      orbital_period_days: 10_759,
      orbital_speed_kms: 9.68,
      eccentricity: 0.0565,
      inclination_deg: 2.49,
    },
    atmosphere: {
      present: true,
      composition: { "Hidrógeno (H₂)": "96.3%", "Helio (He)": "3.25%" },
      surface_pressure_atm: null,
    },
    temperature: { min_c: -178, max_c: -178, mean_c: -178 },
    moons: [
      { name: "Titán", diameter_km: 5_150, distance_km: 1_221_870 },
      { name: "Encélado", diameter_km: 504, distance_km: 238_020 },
      { name: "Mimas", diameter_km: 396, distance_km: 185_540 },
    ],
    rings: true,
    explored_by: ["Pioneer 11 (1979)", "Voyager 1 & 2 (1980-81)", "Cassini-Huygens (2004–2017)"],
  },

  // ── URANO ────────────────────────────
  uranus: {
    id: "uranus",
    name: "Urano",
    name_en: "Uranus",
    category: "planet",
    order: 7,
    type: "Gigante helado",
    glb_file: "uranus.glb",
    description:
      "Gira sobre su eje de forma casi horizontal (98°), probablemente resultado de una colisión masiva. Es el planeta más frío del sistema solar pese a no ser el más lejano.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/600px-Uranus2.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/280px-Uranus2.jpg",
    },
    physical: {
      diameter_km: 51_118,
      mass_kg: "8.68e25",
      density_gcc: 1.27,
      gravity_ms2: 8.87,
      escape_velocity_kms: 21.3,
      rotation_period_days: -0.718,
      axial_tilt_deg: 97.77,
    },
    orbital: {
      distance_from_sun_km: 2_867_000_000,
      perihelion_km: 2_735_560_000,
      aphelion_km: 3_006_390_000,
      orbital_period_days: 30_687,
      orbital_speed_kms: 6.81,
      eccentricity: 0.0457,
      inclination_deg: 0.77,
    },
    atmosphere: {
      present: true,
      composition: { "Hidrógeno (H₂)": "82.5%", "Helio (He)": "15.2%", "Metano (CH₄)": "2.3%" },
      surface_pressure_atm: null,
    },
    temperature: { min_c: -224, max_c: -197, mean_c: -224 },
    moons: [
      { name: "Miranda", diameter_km: 471.6, distance_km: 129_390 },
      { name: "Ariel", diameter_km: 1_157, distance_km: 191_020 },
      { name: "Titania", diameter_km: 1_577, distance_km: 435_910 },
    ],
    rings: true,
    explored_by: ["Voyager 2 (1986)"],
    discovery: { discoverer: "William Herschel", year: 1781 },
  },

  // ── NEPTUNO ──────────────────────────
  neptune: {
    id: "neptune",
    name: "Neptuno",
    name_en: "Neptune",
    category: "planet",
    order: 8,
    type: "Gigante helado",
    glb_file: "neptune.glb",
    description:
      "El planeta más alejado del Sol. Sus vientos son los más rápidos del sistema solar, alcanzando 2.100 km/h. Tardó 165 años en completar su primera órbita desde su descubrimiento.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/600px-Neptune_Full.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/280px-Neptune_Full.jpg",
    },
    physical: {
      diameter_km: 49_528,
      mass_kg: "1.02e26",
      density_gcc: 1.64,
      gravity_ms2: 11.15,
      escape_velocity_kms: 23.5,
      rotation_period_days: 0.671,
      axial_tilt_deg: 28.32,
    },
    orbital: {
      distance_from_sun_km: 4_515_000_000,
      perihelion_km: 4_459_630_000,
      aphelion_km: 4_537_000_000,
      orbital_period_days: 60_190,
      orbital_speed_kms: 5.43,
      eccentricity: 0.0113,
      inclination_deg: 1.77,
    },
    atmosphere: {
      present: true,
      composition: { "Hidrógeno (H₂)": "80%", "Helio (He)": "19%", "Metano (CH₄)": "1.5%" },
      surface_pressure_atm: null,
    },
    temperature: { min_c: -218, max_c: -200, mean_c: -218 },
    moons: [
      { name: "Tritón", diameter_km: 2_707, distance_km: 354_759 },
      { name: "Nereida", diameter_km: 340, distance_km: 5_513_400 },
    ],
    rings: true,
    explored_by: ["Voyager 2 (1989)"],
    discovery: { discoverer: "Urbain Le Verrier / Johann Galle", year: 1846 },
  },

  // ── PLUTÓN ───────────────────────────
  pluto: {
    id: "pluto",
    name: "Plutón",
    name_en: "Pluto",
    category: "dwarf_planet",
    order: 9,
    type: "Planeta enano",
    glb_file: "pluto.glb",
    description:
      "El planeta enano más famoso del sistema solar. Fue considerado el noveno planeta hasta 2006. La sonda New Horizons reveló en 2015 su sorprendente geología activa y la gran llanura de nitrógeno Tombaugh Regio.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pluto-01_Stern_03_Pluto_Color_TXT.jpg/600px-Pluto-01_Stern_03_Pluto_Color_TXT.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pluto-01_Stern_03_Pluto_Color_TXT.jpg/280px-Pluto-01_Stern_03_Pluto_Color_TXT.jpg",
    },
    physical: {
      diameter_km: 2_376,
      mass_kg: "1.30e22",
      density_gcc: 1.85,
      gravity_ms2: 0.62,
      escape_velocity_kms: 1.23,
      rotation_period_days: -6.387,
      axial_tilt_deg: 122.53,
    },
    orbital: {
      distance_from_sun_km: 5_906_380_000,
      perihelion_km: 4_436_820_000,
      aphelion_km: 7_375_930_000,
      orbital_period_days: 90_560,
      orbital_speed_kms: 4.67,
      eccentricity: 0.2488,
      inclination_deg: 17.14,
    },
    atmosphere: {
      present: true,
      composition: { "Nitrógeno (N₂)": "~90%", "Metano (CH₄)": "~10%", "CO": "trazas" },
      surface_pressure_atm: 0.00001,
    },
    temperature: { min_c: -240, max_c: -218, mean_c: -229 },
    moons: [
      { name: "Caronte", diameter_km: 1_212, distance_km: 19_591 },
      { name: "Nix", diameter_km: 49.8, distance_km: 48_694 },
      { name: "Hidra", diameter_km: 61.4, distance_km: 64_738 },
    ],
    rings: false,
    explored_by: ["New Horizons (2015)"],
    discovery: { discoverer: "Clyde Tombaugh", year: 1930 },
  },

  // ── VÍA LÁCTEA ───────────────────────
  milky_way: {
    id: "milky_way",
    name: "Vía Láctea",
    name_en: "Milky Way",
    category: "galaxy",
    order: 99,
    type: "Galaxia espiral barrada (SBbc)",
    glb_file: "galaxia.glb",
    description:
      "La galaxia que alberga nuestro sistema solar. Contiene entre 100.000 y 400.000 millones de estrellas. Nuestro Sol se encuentra en el Brazo de Orión, a unos 26.000 años luz del centro galáctico.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO_-_Milky_Way.jpg/600px-ESO_-_Milky_Way.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO_-_Milky_Way.jpg/280px-ESO_-_Milky_Way.jpg",
    },
    physical: {
      diameter_ly: 105_700,
      thickness_ly: 1_000,
      mass_solar_masses: "~1.5e12",
      estimated_stars: "100.000–400.000 millones",
      age_billion_years: 13.6,
      distance_to_center_ly: 26_000,
    },
    moons: [],
    rings: false,
  },
};

// Planetas ordenados (solo planetas del sistema solar)
const planetsOnly = Object.values(bodiesData)
  .filter((b) => b.category === "planet")
  .sort((a, b) => a.order - b.order);

// Todos los cuerpos
const allBodies = Object.values(bodiesData).sort((a, b) => a.order - b.order);

// ─────────────────────────────────────────
// MIDDLEWARE HEADERS
// ─────────────────────────────────────────
app.use((req, res, next) => {
  res.setHeader("X-API-Name", "Planets API");
  res.setHeader("X-API-Version", "2.0.0");
  next();
});

// ─────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────

// GET /  →  info general
app.get("/", (req, res) => {
  const base = baseUrl(req);
  res.json({
    name: "🪐 Planets API",
    version: "2.0.0",
    description: "API REST completa del Sistema Solar con modelos 3D GLB, fotos y datos científicos",
    endpoints: {
      "GET /v1/bodies":                  "Lista todos los cuerpos (planetas, sol, luna, plutón, galaxia)",
      "GET /v1/bodies/:id":              "Datos completos de un cuerpo",
      "GET /v1/bodies/:id/model":        "URL directa del modelo 3D GLB",
      "GET /v1/planets":                 "Solo los 8 planetas principales",
      "GET /v1/planets/:id":             "Datos completos de un planeta",
      "GET /v1/planets/:id/moons":       "Lunas de un planeta",
      "GET /v1/search?name=":            "Buscar por nombre",
      "GET /v1/compare?a=earth&b=mars":  "Comparar dos cuerpos",
      "GET /v1/stats":                   "Estadísticas del sistema solar",
    },
    body_ids: Object.keys(bodiesData),
    models_base_url: `${base}/models/`,
    example_model: `${base}/models/tierra.glb`,
  });
});

// GET /v1/bodies  →  todos los cuerpos
app.get("/v1/bodies", (req, res) => {
  const { category } = req.query;
  const base = baseUrl(req);
  let result = allBodies;
  if (category) result = result.filter((b) => b.category === category);
  res.json({
    count: result.length,
    bodies: result.map((b) => ({
      id: b.id,
      name: b.name,
      category: b.category,
      type: b.type,
      thumbnail: b.images?.thumbnail,
      model_url: `${base}/models/${b.glb_file}`,
    })),
  });
});

// GET /v1/bodies/:id  →  cuerpo completo
app.get("/v1/bodies/:id", (req, res) => {
  const body = bodiesData[req.params.id.toLowerCase().replace("-", "_")];
  if (!body) {
    return res.status(404).json({
      error: "Cuerpo no encontrado",
      valid_ids: Object.keys(bodiesData),
    });
  }
  const base = baseUrl(req);
  res.json({ ...body, model_url: `${base}/models/${body.glb_file}` });
});

// GET /v1/bodies/:id/model  →  redirect al GLB
app.get("/v1/bodies/:id/model", (req, res) => {
  const body = bodiesData[req.params.id.toLowerCase().replace("-", "_")];
  if (!body) return res.status(404).json({ error: "Cuerpo no encontrado" });
  res.redirect(`/models/${body.glb_file}`);
});

// GET /v1/planets  →  lista planetas
app.get("/v1/planets", (req, res) => {
  const { rings, moons } = req.query;
  const base = baseUrl(req);
  let result = planetsOnly;
  if (rings !== undefined) result = result.filter((p) => p.rings === (rings === "true"));
  if (moons !== undefined) result = result.filter((p) => p.moons.length >= parseInt(moons));
  res.json({
    count: result.length,
    planets: result.map((p) => ({
      id: p.id,
      name: p.name,
      order: p.order,
      type: p.type,
      diameter_km: p.physical.diameter_km,
      moons: p.moons.length,
      rings: p.rings,
      thumbnail: p.images.thumbnail,
      model_url: `${base}/models/${p.glb_file}`,
    })),
  });
});

// GET /v1/planets/:id
app.get("/v1/planets/:id", (req, res) => {
  const planet = bodiesData[req.params.id.toLowerCase()];
  if (!planet || planet.category !== "planet") {
    return res.status(404).json({
      error: "Planeta no encontrado",
      tip: "Para el Sol, Luna, Plutón o galaxia usa /v1/bodies/:id",
      valid_planet_ids: planetsOnly.map((p) => p.id),
    });
  }
  const base = baseUrl(req);
  res.json({ ...planet, model_url: `${base}/models/${planet.glb_file}` });
});

// GET /v1/planets/:id/moons
app.get("/v1/planets/:id/moons", (req, res) => {
  const planet = bodiesData[req.params.id.toLowerCase()];
  if (!planet) return res.status(404).json({ error: "Planeta no encontrado" });
  res.json({ planet: planet.name, moon_count: planet.moons.length, moons: planet.moons });
});

// GET /v1/search?name=
app.get("/v1/search", (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Debes proporcionar el parámetro ?name=" });
  const base = baseUrl(req);
  const results = allBodies.filter(
    (b) =>
      b.name.toLowerCase().includes(name.toLowerCase()) ||
      b.name_en.toLowerCase().includes(name.toLowerCase())
  );
  res.json({
    query: name,
    count: results.length,
    results: results.map((b) => ({
      id: b.id,
      name: b.name,
      category: b.category,
      type: b.type,
      thumbnail: b.images?.thumbnail,
      model_url: `${base}/models/${b.glb_file}`,
    })),
  });
});

// GET /v1/compare?a=earth&b=mars
app.get("/v1/compare", (req, res) => {
  const { a, b } = req.query;
  if (!a || !b) return res.status(400).json({ error: "Debes proporcionar ?a=id1&b=id2" });
  const bodyA = bodiesData[a.toLowerCase().replace("-", "_")];
  const bodyB = bodiesData[b.toLowerCase().replace("-", "_")];
  if (!bodyA || !bodyB) return res.status(404).json({ error: "Uno o ambos cuerpos no encontrados" });
  const base = baseUrl(req);

  const cmp = (label, vA, vB, unit = "") => ({
    label,
    [bodyA.name]: `${vA}${unit}`,
    [bodyB.name]: `${vB}${unit}`,
    larger: vA > vB ? bodyA.name : vB > vA ? bodyB.name : "Igual",
  });

  res.json({
    bodies: [bodyA.name, bodyB.name],
    images: {
      [bodyA.name]: bodyA.images?.thumbnail,
      [bodyB.name]: bodyB.images?.thumbnail,
    },
    models: {
      [bodyA.name]: `${base}/models/${bodyA.glb_file}`,
      [bodyB.name]: `${base}/models/${bodyB.glb_file}`,
    },
    comparison: [
      cmp("Diámetro", bodyA.physical?.diameter_km, bodyB.physical?.diameter_km, " km"),
      cmp("Gravedad", bodyA.physical?.gravity_ms2, bodyB.physical?.gravity_ms2, " m/s²"),
      cmp("Temperatura media", bodyA.temperature?.mean_c, bodyB.temperature?.mean_c, " °C"),
      cmp("Lunas", bodyA.moons?.length, bodyB.moons?.length),
    ],
  });
});

// GET /v1/stats
app.get("/v1/stats", (req, res) => {
  const planets = planetsOnly;
  const byDiameter = [...planets].sort((a, b) => b.physical.diameter_km - a.physical.diameter_km);
  const byMoons = [...planets].sort((a, b) => b.moons.length - a.moons.length);
  const byGravity = [...planets].sort((a, b) => b.physical.gravity_ms2 - a.physical.gravity_ms2);
  res.json({
    total_bodies: allBodies.length,
    total_planets: planets.length,
    total_moons: planets.reduce((acc, p) => acc + p.moons.length, 0),
    planets_with_rings: planets.filter((p) => p.rings).length,
    largest_planet: { name: byDiameter[0].name, diameter_km: byDiameter[0].physical.diameter_km },
    smallest_planet: { name: byDiameter.at(-1).name, diameter_km: byDiameter.at(-1).physical.diameter_km },
    most_moons: { name: byMoons[0].name, moons: byMoons[0].moons.length },
    highest_gravity: { name: byGravity[0].name, gravity_ms2: byGravity[0].physical.gravity_ms2 },
    hottest: { name: "Venus", max_temp_c: 462 },
    coldest: { name: "Urano", min_temp_c: -224 },
    types: {
      rocky: planets.filter((p) => p.type === "Planeta rocoso").map((p) => p.name),
      gas_giant: planets.filter((p) => p.type === "Gigante gaseoso").map((p) => p.name),
      ice_giant: planets.filter((p) => p.type === "Gigante helado").map((p) => p.name),
    },
    extras: {
      dwarf_planets: ["Plutón"],
      moons: ["Luna"],
      stars: ["Sol"],
      galaxies: ["Vía Láctea"],
    },
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint no encontrado",
    message: `La ruta '${req.path}' no existe. Visita / para ver los endpoints disponibles.`,
  });
});

// ─────────────────────────────────────────
app.listen(PORT,'0.0.0.0', () => {
  console.log(`\n🪐 Planets API v2.0 corriendo en http://localhost:${PORT}`);
  console.log(`🗂️  Modelos 3D en http://localhost:${PORT}/models/`);
  console.log(`📖 Endpoints en http://localhost:${PORT}/\n`);
});

module.exports = app;
