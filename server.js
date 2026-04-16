const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

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
// HELPER
// ─────────────────────────────────────────
const baseUrl = (req) => {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  return `${protocol}://${req.get("host")}`;
};

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const bodiesData = {

  // ════════════════════════════════════════
  // ESTRELLA
  // ════════════════════════════════════════
  sun: {
    id: 1, name: "Sol", name_en: "Sun",
    category: "star", order: 0,
    type: "Estrella enana amarilla (G2V)",
    glb_file: "sun.glb",
    description: "La estrella central de nuestro sistema solar. Contiene el 99,86% de toda la masa del sistema solar. Su energía proviene de la fusión nuclear de hidrógeno en helio, liberando una luminosidad de 3,8×10²⁶ vatios.",
    fun_fact: "Un millón de Tierras cabrían dentro del Sol.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/600px-thumbnail.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/280px-thumbnail.jpg",
    },
    physical: { diameter_km: 1_392_700, mass_kg: "1.989e30", density_gcc: 1.41, gravity_ms2: 274, escape_velocity_kms: 617.5, rotation_period_days: 25.38, surface_temp_c: 5_505, core_temp_c: 15_000_000, age_billion_years: 4.6 },
    moons: [], rings: false,
  },

  // ════════════════════════════════════════
  // PLANETAS
  // ════════════════════════════════════════
  mercury: {
    id: 2, name: "Mercurio", name_en: "Mercury",
    category: "planet", order: 1,
    type: "Planeta rocoso",
    glb_file: "mercurio.glb",
    description: "El planeta más pequeño y más cercano al Sol. Un año en Mercurio dura solo 88 días terrestres, pero un día solar dura 176 días. Sin atmósfera significativa, sus temperaturas oscilan entre -180°C y 430°C.",
    fun_fact: "A pesar de ser el más cercano al Sol, no es el más caliente — ese récord lo tiene Venus.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/600px-Mercury_in_true_color.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/280px-Mercury_in_true_color.jpg",
    },
    physical: { diameter_km: 4_879, mass_kg: "3.30e23", density_gcc: 5.43, gravity_ms2: 3.7, escape_velocity_kms: 4.25, rotation_period_days: 58.65, axial_tilt_deg: 0.034 },
    orbital: { distance_from_sun_km: 57_910_000, perihelion_km: 46_000_000, aphelion_km: 69_820_000, orbital_period_days: 88, orbital_speed_kms: 47.87, eccentricity: 0.2056, inclination_deg: 7.0 },
    atmosphere: { present: true, composition: { "O₂": "42%", "Na": "29%", "H₂": "22%", "He": "6%" }, surface_pressure_atm: "~5e-15" },
    temperature: { min_c: -180, max_c: 430, mean_c: 167 },
    moons: [], rings: false,
    explored_by: ["Mariner 10 (1974)", "MESSENGER (2011–2015)", "BepiColombo (en camino)"],
  },

  venus: {
    id: 3, name: "Venus", name_en: "Venus",
    category: "planet", order: 2,
    type: "Planeta rocoso",
    glb_file: "venus.glb",
    description: "El planeta más caliente del sistema solar gracias a un efecto invernadero extremo. Gira en sentido retrógrado, lo que significa que el Sol sale por el oeste. Su presión atmosférica es 92 veces la terrestre.",
    fun_fact: "Un día en Venus (243 días terrestres) es más largo que su año (225 días).",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Venus_2_Approach_Image.jpg/600px-Venus_2_Approach_Image.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Venus_2_Approach_Image.jpg/280px-Venus_2_Approach_Image.jpg",
    },
    physical: { diameter_km: 12_104, mass_kg: "4.87e24", density_gcc: 5.24, gravity_ms2: 8.87, escape_velocity_kms: 10.36, rotation_period_days: -243.02, axial_tilt_deg: 177.36 },
    orbital: { distance_from_sun_km: 108_200_000, perihelion_km: 107_476_000, aphelion_km: 108_942_000, orbital_period_days: 224.7, orbital_speed_kms: 35.02, eccentricity: 0.0067, inclination_deg: 3.39 },
    atmosphere: { present: true, composition: { "CO₂": "96.5%", "N₂": "3.5%", "SO₂": "trazas" }, surface_pressure_atm: 92 },
    temperature: { min_c: 462, max_c: 462, mean_c: 462 },
    moons: [], rings: false,
    explored_by: ["Venera 7 (1970)", "Magellan (1990)", "Venus Express (2006)"],
  },

  earth: {
    id: 4, name: "Tierra", name_en: "Earth",
    category: "planet", order: 3,
    type: "Planeta rocoso",
    glb_file: "tierra.glb",
    description: "El único planeta conocido con vida. Tiene agua líquida en superficie, una atmósfera rica en oxígeno y un campo magnético que la protege de la radiación solar. El 71% de su superficie está cubierta de agua.",
    fun_fact: "La Tierra no es perfectamente esférica — está achatada por los polos y abultada en el ecuador.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/600px-The_Earth_seen_from_Apollo_17.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/280px-The_Earth_seen_from_Apollo_17.jpg",
    },
    physical: { diameter_km: 12_756, mass_kg: "5.97e24", density_gcc: 5.51, gravity_ms2: 9.81, escape_velocity_kms: 11.19, rotation_period_days: 0.9973, axial_tilt_deg: 23.44 },
    orbital: { distance_from_sun_km: 149_600_000, perihelion_km: 147_098_291, aphelion_km: 152_098_233, orbital_period_days: 365.25, orbital_speed_kms: 29.78, eccentricity: 0.0167, inclination_deg: 0.0 },
    atmosphere: { present: true, composition: { "N₂": "78.09%", "O₂": "20.95%", "Ar": "0.93%", "CO₂": "0.04%" }, surface_pressure_atm: 1 },
    temperature: { min_c: -88, max_c: 58, mean_c: 15 },
    moons: [{ name: "Luna", diameter_km: 3_474, distance_km: 384_400 }],
    rings: false,
    explored_by: ["Hogar de la humanidad"],
  },

  mars: {
    id: 5, name: "Marte", name_en: "Mars",
    category: "planet", order: 4,
    type: "Planeta rocoso",
    glb_file: "marte.glb",
    description: "El Planeta Rojo. Alberga el Olympus Mons, el volcán más alto del sistema solar (21 km), y el Valles Marineris, un sistema de cañones de 4.000 km. Hay evidencias de que tuvo agua líquida en su pasado.",
    fun_fact: "Un día en Marte (sol) dura 24h 37min — casi igual que en la Tierra.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/280px-OSIRIS_Mars_true_color.jpg",
    },
    physical: { diameter_km: 6_792, mass_kg: "6.39e23", density_gcc: 3.93, gravity_ms2: 3.72, escape_velocity_kms: 5.03, rotation_period_days: 1.026, axial_tilt_deg: 25.19 },
    orbital: { distance_from_sun_km: 227_900_000, perihelion_km: 206_620_000, aphelion_km: 249_230_000, orbital_period_days: 687, orbital_speed_kms: 24.08, eccentricity: 0.0935, inclination_deg: 1.85 },
    atmosphere: { present: true, composition: { "CO₂": "95.3%", "N₂": "2.7%", "Ar": "1.6%" }, surface_pressure_atm: 0.006 },
    temperature: { min_c: -143, max_c: 35, mean_c: -63 },
    moons: [{ name: "Fobos", diameter_km: 22.2, distance_km: 9_376 }, { name: "Deimos", diameter_km: 12.4, distance_km: 23_463 }],
    rings: false,
    explored_by: ["Viking 1 (1976)", "Pathfinder (1997)", "Curiosity (2012)", "Perseverance (2021)"],
  },

  jupiter: {
    id: 6, name: "Júpiter", name_en: "Jupiter",
    category: "planet", order: 5,
    type: "Gigante gaseoso",
    glb_file: "jupiter.glb",
    description: "El planeta más grande del sistema solar, con una masa 318 veces la de la Tierra. Su Gran Mancha Roja es una tormenta activa desde hace más de 350 años. Su campo magnético es 20.000 veces más fuerte que el terrestre.",
    fun_fact: "Júpiter actúa como escudo del sistema solar, atrayendo con su gravedad muchos asteroides y cometas.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/600px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/280px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    },
    physical: { diameter_km: 142_984, mass_kg: "1.90e27", density_gcc: 1.33, gravity_ms2: 24.79, escape_velocity_kms: 59.5, rotation_period_days: 0.414, axial_tilt_deg: 3.13 },
    orbital: { distance_from_sun_km: 778_500_000, perihelion_km: 740_520_000, aphelion_km: 816_620_000, orbital_period_days: 4_333, orbital_speed_kms: 13.07, eccentricity: 0.0489, inclination_deg: 1.3 },
    atmosphere: { present: true, composition: { "H₂": "89.8%", "He": "10.2%" }, surface_pressure_atm: null },
    temperature: { min_c: -108, max_c: -108, mean_c: -108 },
    moons: [{ name: "Ío", diameter_km: 3_643, distance_km: 421_800 }, { name: "Europa", diameter_km: 3_122, distance_km: 671_100 }, { name: "Ganímedes", diameter_km: 5_268, distance_km: 1_070_400 }, { name: "Calisto", diameter_km: 4_821, distance_km: 1_882_700 }],
    rings: true,
    explored_by: ["Pioneer 10 (1973)", "Voyager 1&2 (1979)", "Galileo (1995)", "Juno (2016)"],
  },

  saturn: {
    id: 7, name: "Saturno", name_en: "Saturn",
    category: "planet", order: 6,
    type: "Gigante gaseoso",
    glb_file: "saturno.glb",
    description: "Famoso por sus espectaculares anillos compuestos de hielo y roca. Es el planeta menos denso del sistema solar — flotaría en agua. Sus anillos tienen 282.000 km de diámetro pero solo 1 km de grosor.",
    fun_fact: "Saturno tiene 146 lunas conocidas, más que cualquier otro planeta del sistema solar.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/600px-Saturn_during_Equinox.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/280px-Saturn_during_Equinox.jpg",
    },
    physical: { diameter_km: 120_536, mass_kg: "5.68e26", density_gcc: 0.69, gravity_ms2: 10.44, escape_velocity_kms: 35.5, rotation_period_days: 0.444, axial_tilt_deg: 26.73 },
    orbital: { distance_from_sun_km: 1_432_000_000, perihelion_km: 1_352_550_000, aphelion_km: 1_514_500_000, orbital_period_days: 10_759, orbital_speed_kms: 9.68, eccentricity: 0.0565, inclination_deg: 2.49 },
    atmosphere: { present: true, composition: { "H₂": "96.3%", "He": "3.25%" }, surface_pressure_atm: null },
    temperature: { min_c: -178, max_c: -178, mean_c: -178 },
    moons: [{ name: "Titán", diameter_km: 5_150, distance_km: 1_221_870 }, { name: "Encélado", diameter_km: 504, distance_km: 238_020 }, { name: "Mimas", diameter_km: 396, distance_km: 185_540 }],
    rings: true,
    explored_by: ["Pioneer 11 (1979)", "Voyager 1&2 (1980-81)", "Cassini-Huygens (2004–2017)"],
  },

  uranus: {
    id: 8, name: "Urano", name_en: "Uranus",
    category: "planet", order: 7,
    type: "Gigante helado",
    glb_file: "uranus.glb",
    description: "Gira sobre su eje de forma casi horizontal (97,8°), probablemente tras una colisión masiva en su formación. Es el planeta más frío del sistema solar con -224°C. Tiene 13 anillos y 27 lunas conocidas.",
    fun_fact: "Urano emite menos calor del que recibe del Sol, algo único entre los planetas gigantes.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/600px-Uranus2.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/280px-Uranus2.jpg",
    },
    physical: { diameter_km: 51_118, mass_kg: "8.68e25", density_gcc: 1.27, gravity_ms2: 8.87, escape_velocity_kms: 21.3, rotation_period_days: -0.718, axial_tilt_deg: 97.77 },
    orbital: { distance_from_sun_km: 2_867_000_000, perihelion_km: 2_735_560_000, aphelion_km: 3_006_390_000, orbital_period_days: 30_687, orbital_speed_kms: 6.81, eccentricity: 0.0457, inclination_deg: 0.77 },
    atmosphere: { present: true, composition: { "H₂": "82.5%", "He": "15.2%", "CH₄": "2.3%" }, surface_pressure_atm: null },
    temperature: { min_c: -224, max_c: -197, mean_c: -224 },
    moons: [{ name: "Miranda", diameter_km: 471.6, distance_km: 129_390 }, { name: "Ariel", diameter_km: 1_157, distance_km: 191_020 }, { name: "Titania", diameter_km: 1_577, distance_km: 435_910 }],
    rings: true,
    explored_by: ["Voyager 2 (1986)"],
    discovery: { discoverer: "William Herschel", year: 1781 },
  },

  neptune: {
    id: 9, name: "Neptuno", name_en: "Neptune",
    category: "planet", order: 8,
    type: "Gigante helado",
    glb_file: "neptune.glb",
    description: "El planeta más alejado del Sol. Sus vientos son los más rápidos del sistema solar, alcanzando 2.100 km/h. Tardó 165 años en completar su primera órbita completa desde su descubrimiento en 1846.",
    fun_fact: "Neptuno fue el primer planeta descubierto mediante predicciones matemáticas, antes de observarlo con telescopio.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/600px-Neptune_Full.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/280px-Neptune_Full.jpg",
    },
    physical: { diameter_km: 49_528, mass_kg: "1.02e26", density_gcc: 1.64, gravity_ms2: 11.15, escape_velocity_kms: 23.5, rotation_period_days: 0.671, axial_tilt_deg: 28.32 },
    orbital: { distance_from_sun_km: 4_515_000_000, perihelion_km: 4_459_630_000, aphelion_km: 4_537_000_000, orbital_period_days: 60_190, orbital_speed_kms: 5.43, eccentricity: 0.0113, inclination_deg: 1.77 },
    atmosphere: { present: true, composition: { "H₂": "80%", "He": "19%", "CH₄": "1.5%" }, surface_pressure_atm: null },
    temperature: { min_c: -218, max_c: -200, mean_c: -218 },
    moons: [{ name: "Tritón", diameter_km: 2_707, distance_km: 354_759 }, { name: "Nereida", diameter_km: 340, distance_km: 5_513_400 }],
    rings: true,
    explored_by: ["Voyager 2 (1989)"],
    discovery: { discoverer: "Urbain Le Verrier / Johann Galle", year: 1846 },
  },

  // ════════════════════════════════════════
  // PLANETAS ENANOS
  // ════════════════════════════════════════
  pluto: {
    id: 10, name: "Plutón", name_en: "Pluto",
    category: "dwarf_planet", order: 9,
    type: "Planeta enano (cinturón de Kuiper)",
    glb_file: "pluto.glb",
    description: "El planeta enano más famoso. Clasificado como planeta hasta 2006. La misión New Horizons reveló montañas de hielo de agua de 3.500 m, llanuras de nitrógeno y una atmósfera tenue. Tiene un corazón en forma de corazón llamado Tombaugh Regio.",
    fun_fact: "Caronte, su luna principal, es tan grande respecto a Plutón que ambos orbitan alrededor de un punto entre ellos.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pluto-01_Stern_03_Pluto_Color_TXT.jpg/600px-Pluto-01_Stern_03_Pluto_Color_TXT.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pluto-01_Stern_03_Pluto_Color_TXT.jpg/280px-Pluto-01_Stern_03_Pluto_Color_TXT.jpg",
    },
    physical: { diameter_km: 2_376, mass_kg: "1.30e22", density_gcc: 1.85, gravity_ms2: 0.62, escape_velocity_kms: 1.23, rotation_period_days: -6.387, axial_tilt_deg: 122.53 },
    orbital: { distance_from_sun_km: 5_906_380_000, perihelion_km: 4_436_820_000, aphelion_km: 7_375_930_000, orbital_period_days: 90_560, orbital_speed_kms: 4.67, eccentricity: 0.2488, inclination_deg: 17.14 },
    atmosphere: { present: true, composition: { "N₂": "~90%", "CH₄": "~10%", "CO": "trazas" }, surface_pressure_atm: 0.00001 },
    temperature: { min_c: -240, max_c: -218, mean_c: -229 },
    moons: [{ name: "Caronte", diameter_km: 1_212, distance_km: 19_591 }, { name: "Nix", diameter_km: 49.8, distance_km: 48_694 }, { name: "Hidra", diameter_km: 61.4, distance_km: 64_738 }],
    rings: false,
    explored_by: ["New Horizons (2015)"],
    discovery: { discoverer: "Clyde Tombaugh", year: 1930 },
  },

  eris: {
    id: 11, name: "Eris", name_en: "Eris",
    category: "dwarf_planet", order: 10,
    type: "Planeta enano (disco disperso)",
    glb_file: "eris.glb",
    description: "El planeta enano más masivo del sistema solar, ligeramente más pequeño que Plutón pero más denso. Su descubrimiento en 2005 fue el detonante que llevó a redefinir el concepto de planeta y a reclasificar Plutón.",
    fun_fact: "Eris tarda 559 años en orbitar el Sol — cuando fue descubierto, estaba en su punto más lejano.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Eris_and_dysnomia2.jpg/600px-Eris_and_dysnomia2.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Eris_and_dysnomia2.jpg/280px-Eris_and_dysnomia2.jpg",
    },
    physical: { diameter_km: 2_326, mass_kg: "1.66e22", density_gcc: 2.52, gravity_ms2: 0.82, escape_velocity_kms: 1.38, rotation_period_days: 25.9 },
    orbital: { distance_from_sun_km: 10_120_000_000, orbital_period_days: 203_830, eccentricity: 0.44, inclination_deg: 44.04 },
    temperature: { min_c: -243, max_c: -217, mean_c: -231 },
    moons: [{ name: "Disnomia", diameter_km: 700, distance_km: 37_350 }],
    rings: false,
    discovery: { discoverer: "Mike Brown et al.", year: 2005 },
  },

  makemake: {
    id: 12, name: "Makemake", name_en: "Makemake",
    category: "dwarf_planet", order: 11,
    type: "Planeta enano (cinturón de Kuiper)",
    glb_file: "makemake.glb",
    description: "El segundo planeta enano más brillante del cinturón de Kuiper después de Plutón. Su superficie está cubierta de metano, etano y posiblemente nitrógeno congelados, lo que le da un color rojizo.",
    fun_fact: "Makemake fue descubierto justo después de Pascua de 2005, y recibe su nombre del dios creador de la isla de Pascua.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Makemake_and_its_moon.jpg/600px-Makemake_and_its_moon.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Makemake_and_its_moon.jpg/280px-Makemake_and_its_moon.jpg",
    },
    physical: { diameter_km: 1_430, mass_kg: "3.1e21", density_gcc: 1.7, gravity_ms2: 0.57, rotation_period_days: 0.9511 },
    orbital: { distance_from_sun_km: 6_850_000_000, orbital_period_days: 112_897, eccentricity: 0.162, inclination_deg: 28.96 },
    temperature: { min_c: -243, max_c: -238, mean_c: -239 },
    moons: [{ name: "MK 2", diameter_km: 175, distance_km: 21_000 }],
    rings: false,
    discovery: { discoverer: "Mike Brown et al.", year: 2005 },
  },

  haumea: {
    id: 13, name: "Haumea", name_en: "Haumea",
    category: "dwarf_planet", order: 12,
    type: "Planeta enano (cinturón de Kuiper)",
    glb_file: "haumea.glb",
    description: "El planeta enano con la forma más extraña del sistema solar: es un elipsoide triaxial parecido a un balón de rugby, resultado de su rapidísima rotación. Tiene dos lunas y, sorprendentemente, un sistema de anillos.",
    fun_fact: "Haumea completa una rotación en solo 3,9 horas — la más rápida de todos los objetos grandes del sistema solar.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Haumea_Hubble.png/400px-Haumea_Hubble.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Haumea_Hubble.png/280px-Haumea_Hubble.png",
    },
    physical: { diameter_km: 1_632, mass_kg: "4.01e21", density_gcc: 2.0, gravity_ms2: 0.63, rotation_period_days: 0.163 },
    orbital: { distance_from_sun_km: 6_452_000_000, orbital_period_days: 103_774, eccentricity: 0.191, inclination_deg: 28.19 },
    temperature: { min_c: -241, max_c: -223, mean_c: -231 },
    moons: [{ name: "Hiʻiaka", diameter_km: 320, distance_km: 49_880 }, { name: "Namaka", diameter_km: 170, distance_km: 25_657 }],
    rings: true,
    discovery: { discoverer: "Mike Brown et al.", year: 2004 },
  },

  ceres: {
    id: 14, name: "Ceres", name_en: "Ceres",
    category: "dwarf_planet", order: 13,
    type: "Planeta enano (cinturón de asteroides)",
    glb_file: "ceres.glb",
    description: "El objeto más grande del cinturón de asteroides y el único planeta enano del sistema solar interior. Tiene criovolcanes (volcanes de hielo) y brillantes depósitos de sal en el cráter Occator que fueron visibles desde la Tierra.",
    fun_fact: "Ceres fue considerado planeta durante 50 años antes de ser reclasificado. Contiene más agua dulce que toda la Tierra.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg/600px-Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg/280px-Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg",
    },
    physical: { diameter_km: 945, mass_kg: "9.38e20", density_gcc: 2.16, gravity_ms2: 0.28, escape_velocity_kms: 0.51, rotation_period_days: 0.378 },
    orbital: { distance_from_sun_km: 413_700_000, orbital_period_days: 1_680, eccentricity: 0.076, inclination_deg: 10.59 },
    temperature: { min_c: -163, max_c: -38, mean_c: -105 },
    moons: [], rings: false,
    explored_by: ["Dawn (2015–2018)"],
    discovery: { discoverer: "Giuseppe Piazzi", year: 1801 },
  },

  // ════════════════════════════════════════
  // LUNAS
  // ════════════════════════════════════════
  moon: {
    id: 401, name: "Luna", name_en: "Moon",
    category: "moon", order: 3.1,
    type: "Satélite natural",
    glb_file: "moon.glb",
    parent: "earth",
    description: "El único satélite natural de la Tierra. Es el quinto satélite más grande del sistema solar y el único cuerpo extraterrestre visitado por humanos. Las misiones Apollo (1969–1972) trajeron 382 kg de rocas lunares.",
    fun_fact: "La Luna se aleja de la Tierra 3,8 cm cada año. Hace 1.400 millones de años, un día terrestre duraba solo 18 horas.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/600px-FullMoon2010.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/280px-FullMoon2010.jpg",
    },
    physical: { diameter_km: 3_474, mass_kg: "7.35e22", density_gcc: 3.34, gravity_ms2: 1.62, escape_velocity_kms: 2.38, rotation_period_days: 27.32, axial_tilt_deg: 6.68 },
    orbital: { distance_from_earth_km: 384_400, perihelion_km: 362_600, aphelion_km: 405_500, orbital_period_days: 27.32, orbital_speed_kms: 1.022, eccentricity: 0.0549, inclination_deg: 5.14 },
    atmosphere: { present: false },
    temperature: { min_c: -183, max_c: 127, mean_c: -53 },
    moons: [], rings: false,
    explored_by: ["Luna 2 (1959)", "Apollo 11 (1969)", "Apollo 17 (1972)", "Chang'e 5 (2020)"],
  },

  europa: {
    id: 601, name: "Europa", name_en: "Europa",
    category: "moon", order: 5.2,
    type: "Luna de Júpiter",
    glb_file: "europa.glb",
    parent: "jupiter",
    description: "Una de las lunas galileanas de Júpiter. Bajo su superficie helada existe un océano de agua líquida salada con el doble de agua que todos los océanos terrestres. Es uno de los mejores candidatos a albergar vida en el sistema solar.",
    fun_fact: "El calor generado por las fuerzas de marea de Júpiter mantiene el océano subsuperficial líquido a pesar de estar a 780 millones de km del Sol.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon-with-margins.jpg/600px-Europa-moon-with-margins.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon-with-margins.jpg/280px-Europa-moon-with-margins.jpg",
    },
    physical: { diameter_km: 3_122, mass_kg: "4.80e22", density_gcc: 3.01, gravity_ms2: 1.31, escape_velocity_kms: 2.02, rotation_period_days: 3.55 },
    orbital: { distance_from_jupiter_km: 671_100, orbital_period_days: 3.55, eccentricity: 0.009 },
    temperature: { min_c: -223, max_c: -148, mean_c: -160 },
    moons: [], rings: false,
    explored_by: ["Voyager 1&2 (1979)", "Galileo (1995)", "Europa Clipper (2024, en camino)"],
    discovery: { discoverer: "Galileo Galilei", year: 1610 },
  },

  ganymede: {
    id: 201, name: "Ganímedes", name_en: "Ganymede",
    category: "moon", order: 5.3,
    type: "Luna de Júpiter",
    glb_file: "ganymede.glb",
    parent: "jupiter",
    description: "La luna más grande del sistema solar, incluso más grande que el planeta Mercurio. Es el único satélite natural con campo magnético propio. Tiene un océano subsuperficial de agua salada y una atmósfera tenue de oxígeno.",
    fun_fact: "Ganímedes es más grande que Mercurio pero tiene menos de la mitad de su masa, porque está compuesto principalmente de hielo de agua.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ganymede_-_Perijove_34_Composite.png/600px-Ganymede_-_Perijove_34_Composite.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ganymede_-_Perijove_34_Composite.png/280px-Ganymede_-_Perijove_34_Composite.png",
    },
    physical: { diameter_km: 5_268, mass_kg: "1.48e23", density_gcc: 1.94, gravity_ms2: 1.43, escape_velocity_kms: 2.74, rotation_period_days: 7.15 },
    orbital: { distance_from_jupiter_km: 1_070_400, orbital_period_days: 7.15, eccentricity: 0.0013 },
    temperature: { min_c: -203, max_c: -121, mean_c: -163 },
    moons: [], rings: false,
    explored_by: ["Voyager 1&2 (1979)", "Galileo (1995)", "JUICE (2023, en camino)"],
    discovery: { discoverer: "Galileo Galilei", year: 1610 },
  },

  io: {
    id: 602, name: "Ío", name_en: "Io",
    category: "moon", order: 5.1,
    type: "Luna de Júpiter",
    glb_file: "io.glb",
    parent: "jupiter",
    description: "La luna más volcánicamente activa del sistema solar. Tiene más de 400 volcanes activos y sus erupciones pueden lanzar material hasta 500 km de altura. Su color amarillo-naranja se debe al azufre depositado por los volcanes.",
    fun_fact: "Las fuerzas de marea de Júpiter generan tanto calor en Ío que su interior está completamente fundido.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/600px-Io_highest_resolution_true_color.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/280px-Io_highest_resolution_true_color.jpg",
    },
    physical: { diameter_km: 3_643, mass_kg: "8.93e22", density_gcc: 3.53, gravity_ms2: 1.80, escape_velocity_kms: 2.56, rotation_period_days: 1.77 },
    orbital: { distance_from_jupiter_km: 421_800, orbital_period_days: 1.77, eccentricity: 0.004 },
    temperature: { min_c: -143, max_c: 1_600, mean_c: -130 },
    moons: [], rings: false,
    explored_by: ["Voyager 1&2 (1979)", "Galileo (1995)", "Juno (2023)"],
    discovery: { discoverer: "Galileo Galilei", year: 1610 },
  },

  titan: {
    id: 701, name: "Titán", name_en: "Titan",
    category: "moon", order: 6.1,
    type: "Luna de Saturno",
    glb_file: "titan.glb",
    parent: "saturn",
    description: "La luna más grande de Saturno y la segunda del sistema solar. Es el único satélite con una atmósfera densa (1,5 veces la presión terrestre) y el único cuerpo aparte de la Tierra con líquidos estables en superficie: ríos y lagos de metano líquido.",
    fun_fact: "La atmósfera de Titán es tan densa y la gravedad tan baja que un humano podría volar con alas en los brazos.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Titan_in_true_color.jpg/600px-Titan_in_true_color.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Titan_in_true_color.jpg/280px-Titan_in_true_color.jpg",
    },
    physical: { diameter_km: 5_150, mass_kg: "1.35e23", density_gcc: 1.88, gravity_ms2: 1.35, escape_velocity_kms: 2.64, rotation_period_days: 15.95 },
    orbital: { distance_from_saturn_km: 1_221_870, orbital_period_days: 15.95, eccentricity: 0.0288 },
    atmosphere: { present: true, composition: { "N₂": "98.4%", "CH₄": "1.4%", "H₂": "0.2%" }, surface_pressure_atm: 1.5 },
    temperature: { min_c: -183, max_c: -179, mean_c: -179 },
    moons: [], rings: false,
    explored_by: ["Cassini-Huygens (2004)", "Dragonfly (previsto 2034)"],
    discovery: { discoverer: "Christiaan Huygens", year: 1655 },
  },

  enceladus: {
    id: 702, name: "Encélado", name_en: "Enceladus",
    category: "moon", order: 6.2,
    type: "Luna de Saturno",
    glb_file: "enceladus.glb",
    parent: "saturn",
    description: "Una de las lunas más brillantes del sistema solar gracias a su superficie de hielo puro. Tiene géiseres en el polo sur que expulsan agua, sal y moléculas orgánicas al espacio — alimentando el anillo E de Saturno. Tiene un océano global bajo el hielo.",
    fun_fact: "La Cassini detectó hidrógeno molecular en los géiseres de Encélado, lo que sugiere actividad hidrotermal en el fondo de su océano.",
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

  triton: {
    id: 901, name: "Tritón", name_en: "Triton",
    category: "moon", order: 8.1,
    type: "Luna de Neptuno",
    glb_file: "triton.glb",
    parent: "neptune",
    description: "La luna más grande de Neptuno y el único satélite grande del sistema solar que orbita en sentido contrario al giro de su planeta (órbita retrógrada). Esto indica que fue capturado del cinturón de Kuiper. Tiene géiseres de nitrógeno.",
    fun_fact: "Tritón se acerca lentamente a Neptuno y en unos 3.600 millones de años será desgarrado por las fuerzas de marea, formando un sistema de anillos.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Triton_moon_mosaic_Voyager_2_%28large%29.jpg/600px-Triton_moon_mosaic_Voyager_2_%28large%29.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Triton_moon_mosaic_Voyager_2_%28large%29.jpg/280px-Triton_moon_mosaic_Voyager_2_%28large%29.jpg",
    },
    physical: { diameter_km: 2_707, mass_kg: "2.14e22", density_gcc: 2.06, gravity_ms2: 0.78, escape_velocity_kms: 1.46, rotation_period_days: -5.877 },
    orbital: { distance_from_neptune_km: 354_759, orbital_period_days: 5.877, eccentricity: 0.000016 },
    temperature: { min_c: -235, max_c: -235, mean_c: -235 },
    moons: [], rings: false,
    explored_by: ["Voyager 2 (1989)"],
    discovery: { discoverer: "William Lassell", year: 1846 },
  },

  calisto: {
    id: 603, name: "Calisto", name_en: "Callisto",
    category: "moon", order: 5.4,
    type: "Luna de Júpiter",
    glb_file: "calisto.glb",
    parent: "jupiter",
    description: "La luna más alejada de las galileanas y la más craterizada del sistema solar. Su superficie, de 4.000 millones de años de antigüedad, no ha sido renovada por actividad geológica. Podría tener un océano salado bajo su corteza.",
    fun_fact: "Calisto recibe tan poca radiación de Júpiter que se considera uno de los mejores candidatos para una base humana en el sistema joviano.",
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

  // ════════════════════════════════════════
  // ASTEROIDES Y COMETAS
  // ════════════════════════════════════════
  vesta: {
    id: 2000, name: "Vesta", name_en: "Vesta",
    category: "asteroid", order: 20,
    type: "Asteroide (cinturón principal)",
    glb_file: "vesta.glb",
    description: "El segundo objeto más masivo del cinturón de asteroides y el más brillante visto desde la Tierra. Tiene una corteza, manto y núcleo diferenciados, como un planeta rocoso. Su polo sur tiene un cráter de impacto de 460 km de diámetro.",
    fun_fact: "Fragmentos de Vesta han llegado a la Tierra como meteoritos — los llamados HED, que representan el 6% de todos los meteoritos encontrados.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Vesta_full_mosaic.jpg/600px-Vesta_full_mosaic.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Vesta_full_mosaic.jpg/280px-Vesta_full_mosaic.jpg",
    },
    physical: { diameter_km: 525, mass_kg: "2.59e20", density_gcc: 3.46, gravity_ms2: 0.25, rotation_period_days: 0.226 },
    orbital: { distance_from_sun_km: 353_400_000, orbital_period_days: 1_325, eccentricity: 0.089, inclination_deg: 7.14 },
    temperature: { min_c: -188, max_c: -23, mean_c: -106 },
    moons: [], rings: false,
    explored_by: ["Dawn (2011–2012)"],
    discovery: { discoverer: "Heinrich Wilhelm Olbers", year: 1807 },
  },

  bennu: {
    id: 2001, name: "Bennu", name_en: "Bennu",
    category: "asteroid", order: 21,
    type: "Asteroide próximo a la Tierra (Apollo)",
    glb_file: "bennu.glb",
    description: "Un asteroide carbonáceo de tipo B que se formó hace unos 4.500 millones de años. La misión OSIRIS-REx recogió 121 gramos de su superficie en 2020 y los trajo a la Tierra en 2023. Contiene aminoácidos y agua, ingredientes para la vida.",
    fun_fact: "Bennu tiene una probabilidad de impactar la Tierra del 0,057% entre 2178 y 2290 — la más alta de cualquier asteroide conocido.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bennu_mosaic_Mar2019.png/600px-Bennu_mosaic_Mar2019.png",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bennu_mosaic_Mar2019.png/280px-Bennu_mosaic_Mar2019.png",
    },
    physical: { diameter_km: 0.565, mass_kg: "7.33e10", density_gcc: 1.19, gravity_ms2: 0.000006, rotation_period_days: 0.245 },
    orbital: { distance_from_sun_km: 168_100_000, orbital_period_days: 436.6, eccentricity: 0.204, inclination_deg: 6.03 },
    temperature: { min_c: -73, max_c: 127, mean_c: -6 },
    moons: [], rings: false,
    explored_by: ["OSIRIS-REx (2018–2021)"],
    discovery: { discoverer: "LINEAR Survey", year: 1999 },
  },

  halley_comet: {
    id: 2002, name: "Cometa Halley", name_en: "Halley's Comet",
    category: "comet", order: 30,
    type: "Cometa periódico de período corto",
    glb_file: "halleycomet.glb",
    description: "El cometa más famoso y el único visible a simple vista desde la Tierra dos veces en una vida humana. Su núcleo mide 15×8 km y tiene una de las superficies más oscuras del sistema solar. En cada paso cerca del Sol pierde entre 1 y 3 metros de material.",
    fun_fact: "El Cometa Halley fue el primer cometa reconocido como periódico, gracias a Edmund Halley en 1705. Su próxima visita será en 2061.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Halley%27s_Comet_1986.jpg/600px-Halley%27s_Comet_1986.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Halley%27s_Comet_1986.jpg/280px-Halley%27s_Comet_1986.jpg",
    },
    physical: { diameter_km: 15, mass_kg: "2.2e14", density_gcc: 0.6, rotation_period_days: 2.2 },
    orbital: { perihelion_km: 87_800_000, aphelion_km: 6_000_000_000, orbital_period_days: 27_507, eccentricity: 0.967, inclination_deg: 162.3 },
    temperature: { min_c: -270, max_c: 77, mean_c: -70 },
    moons: [], rings: false,
    explored_by: ["Giotto (1986)", "Vega 1&2 (1986)"],
    discovery: { discoverer: "Edmund Halley (período)", year: 1705 },
  },

  // ════════════════════════════════════════
  // NAVES Y TELESCOPIOS
  // ════════════════════════════════════════
  perseverance: {
    id: 3000, name: "Perseverance", name_en: "Perseverance",
    category: "spacecraft", order: 100,
    type: "Rover marciano (NASA)",
    glb_file: "perseverance.glb",
    description: "El rover más sofisticado enviado a Marte. Aterrizó en el cráter Jezero el 18 de febrero de 2021. Busca signos de vida microbiana antigua, recoge muestras para su futura devolución a la Tierra y llevó el helicóptero Ingenuity, el primer vuelo motorizado en otro planeta.",
    fun_fact: "Perseverance produjo oxígeno respirable en Marte por primera vez mediante el experimento MOXIE.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PIA24543.jpg/600px-PIA24543.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PIA24543.jpg/280px-PIA24543.jpg",
    },
    specs: { mass_kg: 1_025, power_source: "RTG (plutonio-238)", launch_date: "30 julio 2020", landing_date: "18 febrero 2021", location: "Cráter Jezero, Marte", instruments: 7, cameras: 23 },
    moons: [], rings: false,
  },

  curiosity: {
    id: 3001, name: "Curiosity", name_en: "Curiosity",
    category: "spacecraft", order: 101,
    type: "Rover marciano (NASA)",
    glb_file: "curiosity.glb",
    description: "Rover nuclear activo en Marte desde agosto de 2012. Explora el cráter Gale y el Monte Sharp. Ha confirmado que Marte tuvo condiciones habitables en el pasado, detectado moléculas orgánicas y medido la radiación para planificación de misiones humanas.",
    fun_fact: "Curiosity lleva grabado en sus ruedas el código Morse con las letras JPL, que deja impreso en el suelo de Marte.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg/600px-Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg/280px-Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg",
    },
    specs: { mass_kg: 899, power_source: "RTG (plutonio-238)", launch_date: "26 noviembre 2011", landing_date: "6 agosto 2012", location: "Cráter Gale, Marte", total_distance_km: 32 },
    moons: [], rings: false,
  },

  hubble: {
    id: 3002, name: "Telescopio Hubble", name_en: "Hubble Space Telescope",
    category: "spacecraft", order: 102,
    type: "Telescopio espacial (NASA/ESA)",
    glb_file: "hubble.glb",
    description: "El telescopio espacial más famoso de la historia. En órbita desde 1990, ha capturado más de 1,5 millones de imágenes del universo. Ha contribuido a determinar la edad del universo (13.800 millones de años) y a descubrir la energía oscura.",
    fun_fact: "Las imágenes del Campo Profundo del Hubble muestran miles de galaxias en un área del cielo del tamaño de un grano de arena a brazo extendido.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/600px-HST-SM4.jpeg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/280px-HST-SM4.jpeg",
    },
    specs: { mass_kg: 11_110, orbit_altitude_km: 537, launch_date: "24 abril 1990", mirror_diameter_m: 2.4, wavelengths: "Ultravioleta, visible e infrarrojo cercano" },
    moons: [], rings: false,
  },

  webb: {
    id: 3003, name: "Telescopio James Webb", name_en: "James Webb Space Telescope",
    category: "spacecraft", order: 103,
    type: "Telescopio espacial infrarrojo (NASA/ESA/CSA)",
    glb_file: "webb.glb",
    description: "El telescopio espacial más potente jamás construido. Lanzado el 25 de diciembre de 2021 y operativo desde julio de 2022. Observa en infrarrojo, permitiendo ver las primeras galaxias del universo, atmósferas de exoplanetas y regiones de formación estelar ocultas al Hubble.",
    fun_fact: "El espejo primario del Webb tiene 18 segmentos hexagonales de berilio bañado en oro y mide 6,5 metros — no cabría en ningún cohete si no fuera plegable.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/The_James_Webb_Space_Telescope.jpg/600px-The_James_Webb_Space_Telescope.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/The_James_Webb_Space_Telescope.jpg/280px-The_James_Webb_Space_Telescope.jpg",
    },
    specs: { mass_kg: 6_200, orbit: "Punto de Lagrange L2 (1,5M km de la Tierra)", launch_date: "25 diciembre 2021", mirror_diameter_m: 6.5, wavelengths: "Infrarrojo (0,6–28 μm)" },
    moons: [], rings: false,
  },

  voyager: {
    id: 3004, name: "Voyager 1", name_en: "Voyager 1",
    category: "spacecraft", order: 104,
    type: "Sonda interestelar (NASA)",
    glb_file: "voyager.glb",
    description: "El objeto fabricado por humanos más lejano del universo. Lanzada en 1977, cruzó la heliopausa en 2012 convirtiéndose en la primera nave en el espacio interestelar. Sigue enviando datos desde más de 23.000 millones de km de la Tierra.",
    fun_fact: "Las señales de radio de Voyager 1 viajan a la velocidad de la luz y tardan más de 22 horas en llegar a la Tierra.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Voyager_spacecraft.jpg/600px-Voyager_spacecraft.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Voyager_spacecraft.jpg/280px-Voyager_spacecraft.jpg",
    },
    specs: { mass_kg: 733, power_source: "RTG (plutonio-238)", launch_date: "5 septiembre 1977", distance_from_sun_au: 163, speed_kms: 17 },
    moons: [], rings: false,
  },

  iss: {
    id: 3005, name: "Estación Espacial Internacional", name_en: "International Space Station",
    category: "spacecraft", order: 105,
    type: "Estación espacial (NASA/ESA/Roscosmos/JAXA/CSA)",
    glb_file: "iss.glb",
    description: "La estructura más grande jamás construida en el espacio. Orbita a 408 km de altitud a 27.600 km/h, completando 15,5 órbitas diarias. Ha sido habitada de forma continua desde noviembre del año 2000. Es un laboratorio científico internacional en microgravedad.",
    fun_fact: "Desde la ISS se ven 16 amaneceres y 16 atardeceres cada día. Los astronautas envejecen unos milisegundos más lentamente que en la Tierra.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/600px-International_Space_Station_after_undocking_of_STS-132.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/280px-International_Space_Station_after_undocking_of_STS-132.jpg",
    },
    specs: { mass_kg: 420_000, orbit_altitude_km: 408, orbital_speed_kms: 7.66, crew: 7, modules: 16, launch_first_module: "20 noviembre 1998", length_m: 109, width_m: 73 },
    moons: [], rings: false,
  },

  // ════════════════════════════════════════
  // GALAXIA
  // ════════════════════════════════════════
  milky_way: {
    id: 0, name: "Vía Láctea", name_en: "Milky Way",
    category: "galaxy", order: 999,
    type: "Galaxia espiral barrada (SBbc)",
    glb_file: "galaxia.glb",
    description: "La galaxia que alberga nuestro sistema solar. Tiene entre 100.000 y 400.000 millones de estrellas y un agujero negro supermasivo en su centro llamado Sagitario A*, con 4 millones de masas solares. Nuestro Sol orbita el centro galáctico cada 225 millones de años.",
    fun_fact: "La Vía Láctea colisionará con la galaxia de Andrómeda en unos 4.500 millones de años, formando una nueva galaxia elíptica.",
    images: {
      main: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO_-_Milky_Way.jpg/600px-ESO_-_Milky_Way.jpg",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO_-_Milky_Way.jpg/280px-ESO_-_Milky_Way.jpg",
    },
    physical: { diameter_ly: 105_700, thickness_ly: 1_000, mass_solar_masses: "~1.5e12", estimated_stars: "100.000–400.000 millones", age_billion_years: 13.6, distance_to_center_ly: 26_000, central_black_hole: "Sagitario A* (4M masas solares)" },
    moons: [], rings: false,
  },
};

// ─────────────────────────────────────────
// COLECCIONES
// ─────────────────────────────────────────
const planetsOnly = Object.values(bodiesData).filter(b => b.category === "planet").sort((a, b) => a.order - b.order);
const allBodies = Object.values(bodiesData).sort((a, b) => a.order - b.order);

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────
app.use((req, res, next) => {
  res.setHeader("X-API-Name", "Planets API");
  res.setHeader("X-API-Version", "3.0.0");
  next();
});

// ─────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────

app.get("/", (req, res) => {
  const base = baseUrl(req);
  res.json({
    name: "🪐 Planets API",
    version: "3.0.0",
    description: "API REST del Sistema Solar con modelos 3D GLB, fotos y datos científicos",
    endpoints: {
      "GET /v1/bodies":                 "Lista todos los cuerpos con filtros opcionales",
      "GET /v1/bodies/:id":             "Datos completos de un cuerpo + model_url",
      "GET /v1/bodies/:id/model":       "Redirige directamente al archivo GLB",
      "GET /v1/planets":                "Solo los 8 planetas principales",
      "GET /v1/planets/:id":            "Datos completos de un planeta",
      "GET /v1/planets/:id/moons":      "Lunas de un planeta",
      "GET /v1/search?name=":           "Buscar por nombre (español o inglés)",
      "GET /v1/compare?a=&b=":          "Comparar dos cuerpos",
      "GET /v1/random":                 "Cuerpo aleatorio",
      "GET /v1/random?category=moon":   "Cuerpo aleatorio por categoría",
      "GET /v1/fact/:id":               "Curiosidad destacada de un cuerpo",
      "GET /v1/stats":                  "Estadísticas generales",
    },
    categories: ["star", "planet", "dwarf_planet", "moon", "asteroid", "comet", "spacecraft", "galaxy"],
    total_bodies: allBodies.length,
    models_base_url: `${base}/models/`,
  });
});

// Todos los cuerpos
app.get("/v1/bodies", (req, res) => {
  const { category } = req.query;
  const base = baseUrl(req);
  let result = allBodies;
  if (category) result = result.filter(b => b.category === category);
  res.json({
    count: result.length,
    bodies: result.map(b => ({
      id: b.id, name: b.name, category: b.category, type: b.type,
      thumbnail: b.images?.thumbnail,
      model_url: `${base}/models/${b.glb_file}`,
    })),
  });
});

// Cuerpo por ID
app.get("/v1/bodies/:id", (req, res) => {
  const body = bodiesData[req.params.id.toLowerCase().replace(/-/g, "_")];
  if (!body) return res.status(404).json({ error: "Cuerpo no encontrado", valid_ids: Object.keys(bodiesData) });
  const base = baseUrl(req);
  res.json({ ...body, model_url: `${base}/models/${body.glb_file}` });
});

// Redirect al GLB
app.get("/v1/bodies/:id/model", (req, res) => {
  const body = bodiesData[req.params.id.toLowerCase().replace(/-/g, "_")];
  if (!body) return res.status(404).json({ error: "Cuerpo no encontrado" });
  res.redirect(`/models/${body.glb_file}`);
});

// Planetas
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
      diameter_km: p.physical.diameter_km,
      moons: p.moons.length, rings: p.rings,
      thumbnail: p.images.thumbnail,
      model_url: `${base}/models/${p.glb_file}`,
    })),
  });
});

// Planeta por ID
app.get("/v1/planets/:id", (req, res) => {
  const planet = bodiesData[req.params.id.toLowerCase()];
  if (!planet || planet.category !== "planet") {
    return res.status(404).json({
      error: "Planeta no encontrado",
      tip: "Para Sol, Luna, Plutón, asteroides o naves usa /v1/bodies/:id",
      valid_planet_ids: planetsOnly.map(p => p.id),
    });
  }
  const base = baseUrl(req);
  res.json({ ...planet, model_url: `${base}/models/${planet.glb_file}` });
});

// Lunas de un planeta
app.get("/v1/planets/:id/moons", (req, res) => {
  const planet = bodiesData[req.params.id.toLowerCase()];
  if (!planet) return res.status(404).json({ error: "Planeta no encontrado" });
  res.json({ planet: planet.name, moon_count: planet.moons.length, moons: planet.moons });
});

// Búsqueda
app.get("/v1/search", (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Debes proporcionar ?name=" });
  const base = baseUrl(req);
  const results = allBodies.filter(b =>
    b.name.toLowerCase().includes(name.toLowerCase()) ||
    b.name_en.toLowerCase().includes(name.toLowerCase())
  );
  res.json({
    query: name, count: results.length,
    results: results.map(b => ({
      id: b.id, name: b.name, category: b.category,
      thumbnail: b.images?.thumbnail,
      model_url: `${base}/models/${b.glb_file}`,
    })),
  });
});

// Comparar
app.get("/v1/compare", (req, res) => {
  const { a, b } = req.query;
  if (!a || !b) return res.status(400).json({ error: "Debes proporcionar ?a=id1&b=id2" });
  const bodyA = bodiesData[a.toLowerCase().replace(/-/g, "_")];
  const bodyB = bodiesData[b.toLowerCase().replace(/-/g, "_")];
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

// Aleatorio
app.get("/v1/random", (req, res) => {
  const { category } = req.query;
  const base = baseUrl(req);
  let pool = allBodies;
  if (category) pool = pool.filter(b => b.category === category);
  if (!pool.length) return res.status(404).json({ error: "No hay cuerpos en esa categoría" });
  const body = pool[Math.floor(Math.random() * pool.length)];
  res.json({ ...body, model_url: `${base}/models/${body.glb_file}` });
});

// Curiosidad
app.get("/v1/fact/:id", (req, res) => {
  const body = bodiesData[req.params.id.toLowerCase().replace(/-/g, "_")];
  if (!body) return res.status(404).json({ error: "Cuerpo no encontrado" });
  res.json({
    id: body.id, name: body.name,
    fun_fact: body.fun_fact || "No hay curiosidad registrada para este cuerpo.",
    thumbnail: body.images?.thumbnail,
  });
});

// Stats
app.get("/v1/stats", (req, res) => {
  const byDiameter = [...planetsOnly].sort((a, b) => b.physical.diameter_km - a.physical.diameter_km);
  const byMoons = [...planetsOnly].sort((a, b) => b.moons.length - a.moons.length);
  const byGravity = [...planetsOnly].sort((a, b) => b.physical.gravity_ms2 - a.physical.gravity_ms2);
  const categories = {};
  allBodies.forEach(b => { categories[b.category] = (categories[b.category] || 0) + 1; });
  res.json({
    total_bodies: allBodies.length,
    by_category: categories,
    total_planets: planetsOnly.length,
    largest_planet: { name: byDiameter[0].name, diameter_km: byDiameter[0].physical.diameter_km },
    smallest_planet: { name: byDiameter.at(-1).name, diameter_km: byDiameter.at(-1).physical.diameter_km },
    most_moons: { name: byMoons[0].name, moons: byMoons[0].moons.length },
    highest_gravity: { name: byGravity[0].name, gravity_ms2: byGravity[0].physical.gravity_ms2 },
    hottest: { name: "Venus", temp_c: 462 },
    coldest: { name: "Tritón", temp_c: -235 },
    farthest_spacecraft: { name: "Voyager 1", distance_au: 163 },
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint no encontrado", message: `'${req.path}' no existe. Visita / para ver todos los endpoints.` });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n🪐 Planets API v3.0 en http://localhost:${PORT}`);
  console.log(`🗂️  Modelos en http://localhost:${PORT}/models/\n`);
});

module.exports = app;