// Todo este contenido (precios, horarios, clases) es de EJEMPLO y se ajusta con el gimnasio.

export const NAME = "Gimnasio Elite Maya";
export const PHONE = "+502 3807-8175";
export const WA_NUMBER = "50238078175";

export const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
export const dayShort = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Horario de apertura por día (0 = domingo ... 6 = sábado). Formato 24 horas.
export const hours = {
  1: ["05:00", "21:00"],
  2: ["05:00", "21:00"],
  3: ["05:00", "21:00"],
  4: ["05:00", "21:00"],
  5: ["05:00", "21:00"],
  6: ["06:00", "17:00"],
  0: ["07:00", "12:00"],
};

// Duración del plan y descuento por pagar varios meses juntos
export const durations = [
  { id: "mensual", label: "Mensual", months: 1, off: 0 },
  { id: "trimestral", label: "Trimestral", months: 3, off: 0.1 },
  { id: "anual", label: "Anual", months: 12, off: 0.2 },
];

// "base" es el precio de un mes, en quetzales
export const plans = [
  {
    id: "basico",
    name: "Básico",
    base: 200,
    text: "Para empezar con lo esencial.",
    inc: ["Sala de pesas", "Zona de cardio", "Rutina inicial"],
  },
  {
    id: "plus",
    name: "Plus",
    base: 300,
    featured: true,
    text: "Entrena con guía y variedad.",
    inc: ["Todo lo del Básico", "Clases grupales", "Evaluación física cada mes"],
  },
  {
    id: "elite",
    name: "Elite",
    base: 450,
    text: "Acompañamiento personal.",
    inc: ["Todo lo del Plus", "4 sesiones al mes con entrenador", "Plan de entrenamiento a tu medida"],
  },
];

export function priceOf(plan, dur) {
  const full = plan.base * dur.months;
  const total = Math.round(full * (1 - dur.off));
  return { total, perMonth: Math.round(total / dur.months), saved: full - total };
}

// Fotos opcionales en dev/img. Si el archivo no existe, se muestra una ilustración de respaldo.
export const areas = [
  {
    id: "pesas",
    icon: "dumbbell",
    img: "img/pesas.jpg",
    title: "Sala de pesas",
    text: "Máquinas, mancuernas y barras para trabajar fuerza y masa muscular.",
  },
  {
    id: "cardio",
    icon: "pulse",
    img: "img/cardio.jpg",
    title: "Zona de cardio",
    text: "Caminadoras y bicicletas para quemar calorías y mejorar tu resistencia.",
  },
  {
    id: "funcional",
    icon: "kettlebell",
    img: "img/funcional.jpg",
    title: "Crosstraining y funcional",
    text: "Espacio libre para circuitos, pesas rusas y trabajo con el peso del cuerpo.",
  },
  {
    id: "clases",
    icon: "group",
    img: "img/clases.jpg",
    title: "Clases grupales",
    text: "Sesiones guiadas para entrenar acompañado y con ritmo.",
  },
];

// Clases de ejemplo por día (1 = lunes ... 6 = sábado)
export const classes = {
  1: [
    { t: "06:00", n: "Funcional", l: "Todos los niveles" },
    { t: "18:00", n: "Pesas para principiantes", l: "Principiantes" },
    { t: "19:30", n: "Cardio dirigido", l: "Todos los niveles" },
  ],
  2: [
    { t: "06:00", n: "Movilidad y estiramiento", l: "Todos los niveles" },
    { t: "18:30", n: "Funcional", l: "Intermedio" },
    { t: "20:00", n: "Pesas", l: "Intermedio" },
  ],
  3: [
    { t: "06:00", n: "Cardio dirigido", l: "Todos los niveles" },
    { t: "18:00", n: "Pesas para principiantes", l: "Principiantes" },
    { t: "19:30", n: "Funcional", l: "Todos los niveles" },
  ],
  4: [
    { t: "06:00", n: "Funcional", l: "Intermedio" },
    { t: "18:30", n: "Movilidad y estiramiento", l: "Todos los niveles" },
    { t: "20:00", n: "Cardio dirigido", l: "Todos los niveles" },
  ],
  5: [
    { t: "06:00", n: "Pesas", l: "Intermedio" },
    { t: "18:00", n: "Funcional", l: "Todos los niveles" },
    { t: "19:30", n: "Circuito libre", l: "Todos los niveles" },
  ],
  6: [
    { t: "07:00", n: "Funcional", l: "Todos los niveles" },
    { t: "09:00", n: "Pesas para principiantes", l: "Principiantes" },
    { t: "11:00", n: "Movilidad y estiramiento", l: "Todos los niveles" },
  ],
};

export const goals = [
  "Bajar de peso",
  "Ganar masa muscular",
  "Mejorar mi condición física",
  "Moverme mejor y sin dolor",
];

export const turns = ["la mañana", "la tarde", "la noche"];
