export type SeccionCategoria = 'beneficios' | 'explora' | 'noticias';

export interface ClasificacionCatalogo {
  id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export interface CategoriaCatalogo {
  id: string;
  nombre: string;
  descripcion: string;
  seccion: SeccionCategoria;
  activo: boolean;
}

export const clasificacionesCatalogo: ClasificacionCatalogo[] = [
  {
    id: '1',
    nombre: 'Cultura',
    descripcion: 'Contenido cultural, artistico y comunitario',
    activo: true
  },
  {
    id: '2',
    nombre: 'Educacion',
    descripcion: 'Contenido educativo, academico y de capacitacion',
    activo: true
  },
  {
    id: '3',
    nombre: 'Salud',
    descripcion: 'Contenido de salud, bienestar y prevencion',
    activo: true
  },
  {
    id: '4',
    nombre: 'Deportes',
    descripcion: 'Contenido deportivo, recreativo y de activacion fisica',
    activo: true
  }
];

export const categoriasCatalogo: CategoriaCatalogo[] = [
  {
    id: 'beneficios-1',
    nombre: 'Promociones',
    descripcion: 'Promociones vigentes para usuarios del programa',
    seccion: 'beneficios',
    activo: true
  },
  {
    id: 'beneficios-2',
    nombre: 'Descuentos',
    descripcion: 'Descuentos directos en productos o servicios',
    seccion: 'beneficios',
    activo: true
  },
  {
    id: 'explora-1',
    nombre: 'Talleres',
    descripcion: 'Talleres presenciales o virtuales para jovenes',
    seccion: 'explora',
    activo: true
  },
  {
    id: 'explora-2',
    nombre: 'Conferencias',
    descripcion: 'Conferencias, platicas y charlas informativas',
    seccion: 'explora',
    activo: true
  },
  {
    id: 'explora-3',
    nombre: 'Festival',
    descripcion: 'Festivales y eventos especiales',
    seccion: 'explora',
    activo: true
  },
  {
    id: 'explora-4',
    nombre: 'Cursos',
    descripcion: 'Cursos de formacion y capacitacion',
    seccion: 'explora',
    activo: true
  },
  {
    id: 'noticias-1',
    nombre: 'Avisos',
    descripcion: 'Avisos oficiales para usuarios de la app movil',
    seccion: 'noticias',
    activo: true
  },
  {
    id: 'noticias-2',
    nombre: 'Comunicado',
    descripcion: 'Comunicados institucionales',
    seccion: 'noticias',
    activo: true
  },
  {
    id: 'noticias-3',
    nombre: 'Convocatorias',
    descripcion: 'Convocatorias abiertas para jovenes',
    seccion: 'noticias',
    activo: true
  }
];

export const getCategoriasActivasPorSeccion = (seccion: SeccionCategoria) =>
  categoriasCatalogo.filter((categoria) => categoria.seccion === seccion && categoria.activo);

export const getClasificacionesActivas = () =>
  clasificacionesCatalogo.filter((clasificacion) => clasificacion.activo);
