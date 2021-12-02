import * as data from "./data";
import { COLORS } from "./theme";

export const CARRERAS = [
  {
    id: "ingles",
    link: "https://isfdyt24-bue.infd.edu.ar/sitio/wp-content/uploads/2020/06/anexo_ingles_caja_curricular-1.pdf",
    graph: data.ingles,
    nombre: "Inglés (Plan Nuevo)",
    nombrecorto: "Inglés",
    creditos: {
      total: 36,
      obligatorias: 34,
      electivas: 2,
      checkbox: [
      ],
      materias: [
        {
          id: "95.61",
          nombrecorto: "TPP",
          bg: COLORS.findecarrera[50],
          color: "findecarrera",
        },
      ],
    },
  }
];

export default CARRERAS;
