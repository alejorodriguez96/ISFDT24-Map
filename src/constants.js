import CARRERAS from "./carreras";
import { COLORS } from "./theme";

export const USER_FORM =
  "https://docs.google.com/forms/d/1ZRb0hJ4fZjlaV-NNtmBHVb5y92Hxzq--4jKQaQD62CQ/formResponse";

export const USER_FORM_ENTRIES = {
  padron: "entry.315974123",
  carrera: "entry.1215075080",
  orientacion: "entry.2135693433",
  finDeCarrera: "entry.1619476447",
};

export const GRAPH_FORM =
  "https://docs.google.com/forms/d/1Oq7oHVvGcx7Ikn5UYo5B53fqZnrjK0srJCDOT9xVTik/formResponse";

export const GRAPH_FORM_ENTRIES = {
  padron: "entry.315974123",
  carrera: "entry.1215075080",
  map: "entry.2135693433",
};

export const BUGS_FORM =
  "https://docs.google.com/forms/d/1Mr4-4qWqZKaobjG3GI30aPvC5qlMsd6Eib3YGUbLd2k/formResponse";

export const BUGS_FORM_ENTRIES = {
  padron: "entry.108884877",
  carrera: "entry.30310619",
  orientacion: "entry.2052513370",
  finDeCarrera: "entry.1835776497",
  bug: "entry.817568535",
};

export const SPREADSHEET =
  "https://sheets.googleapis.com/v4/spreadsheets/1Tq4vU1AEoA7_ekdMSkyXhYEbeUY5ESa0cAx4vs5bRKY/values";

export const SHEETS = {
  user: "usuarios",
  registros: "registros",
};

export const KEY = "AIzaSyAh5pkFqQv0vpZI7qx5K9Mw2x6soFeTeC0";

export const GRUPOS = {
  Aprobadas: { color: COLORS.aprobadas[400] },
  CBC: {
    shape: "hexagon",
    size: 30,
  },
  "*CBC": {
    color: COLORS.aprobadas[100],
    shape: "square",
    size: 15,
  },
  Habilitadas: { color: COLORS.habilitadas[400] },
  "En Final": { color: COLORS.enfinal[400] },
  "Materias Obligatorias": { color: COLORS.obligatorias[400] },
  "Materias Electivas": { color: COLORS.electivas[400] },
  "Fin de Carrera": {
    color: COLORS.findecarrera[400],
    shape: "diamond",
    size: 45,
  },
  "Fin de Carrera (Obligatorio)": {
    color: COLORS.findecarrera[400],
    shape: "diamond",
    size: 45,
  },
  Cursando: { color: COLORS.cursando[500] },
  "A Cursar (1)": { color: COLORS.futuro[100] },
  "A Cursar (2)": { color: COLORS.futuro[200] },
  "A Cursar (3)": { color: COLORS.futuro[300] },
  "A Cursar (4)": { color: COLORS.futuro[400] },
  "A Cursar (5)": { color: COLORS.futuro[500] },
  "A Cursar (6)": { color: COLORS.futuro[600] },
  "A Cursar (7)": { color: COLORS.futuro[700] },
  "A Cursar (8)": { color: COLORS.futuro[800] },
  "A Cursar (9)": { color: COLORS.futuro[900] },
  "A Cursar (10)": { color: COLORS.futuro[1000] },
  ...CARRERAS.filter((c) => c.orientaciones)
    .flatMap((c) => c.orientaciones)
    .reduce(function (map, obj) {
      obj.color = COLORS[obj.colorScheme][500];
      map[obj.nombre] = obj;
      return map;
    }, {}),
};

export const GRAPHOPTIONS = {
  nodes: { shape: "box" },
  interaction: {
    hover: true,
  },
  physics: {
    // Las fisicas del grafo estan desactivadas porque no son compatibles con el atributo .hidden de los nodos individuales
    // Al hacer un batch update de nodos donde cambia el atributo hidden, se rearma todo el grafo, haciendo que ande todo mal
    // La solucion a esto sería no manejar el .hidden a nivel individual, pero a nivel grupo
    // Entonces, se puede tener un grupo nuevo 'HiddenGroup' que tenga hidden en true, y poner que todos los otros grupos tengan hidden en false
    // Asi, el boton de prender y apagar nodos tiene que manejar el grupo, y no directamente el atributo hidden
    // Se puede tener un nuevo atributo custom (nodo._hidden), y que ese atributo sea el que al cambiar haga que el nodo cambie de grupo (en el actualizar() de Node.js)
    // enabled: true
    enabled: false,
    hierarchicalRepulsion: {
      nodeDistance: 90,
    },
    stabilization: {
      iterations: 30,
      fit: true,
    },
  },
  layout: {
    hierarchical: {
      enabled: true,
      levelSeparation: 145,
      treeSpacing: 0,
      edgeMinimization: false,
      direction: "LR",
    },
  },
  edges: {
    arrowStrikethrough: false,
    arrows: {
      to: { enabled: true, scaleFactor: 0.7, type: "arrow" },
    },
    color: { inherit: "from" },
  },
  groups: { ...GRUPOS },
};
