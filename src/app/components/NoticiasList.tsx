import { ChangeEvent, FormEvent, MouseEvent, useMemo, useState } from 'react';
import {
  Archive,
  AlignLeft,
  ArrowLeft,
  ArrowUpDown,
  Bold,
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Copy,
  Edit,
  ExternalLink,
  Eye,
  Home,
  Image as ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  MoreVertical,
  Plus,
  Redo2,
  RotateCcw,
  Search,
  Send,
  SlidersHorizontal,
  Strikethrough,
  Table2,
  Trash2,
  Underline,
  Undo2,
  Upload
} from 'lucide-react';
import { getCategoriasActivasPorSeccion, getClasificacionesActivas } from '../data/catalogos';
import { DescargarFiltradoButton } from './DescargarFiltradoButton';

type EstadoNoticia = 'Registrado' | 'Publicado' | 'Cancelado';
type Vista = 'lista' | 'formulario' | 'detalle';
type TipoLiga = 'ninguna' | 'beneficio' | 'explora' | 'url';
type PosicionMenu = { top: number; left: number };

interface Noticia {
  id: string;
  fechaRegistro: string;
  titulo: string;
  clasificacion: string;
  categoria: string;
  contenido: string;
  vigenciaInicio: string;
  vigenciaFin: string;
  imagenPreview: string;
  tipoLiga: TipoLiga;
  registroRelacionado: string;
  urlExterna: string;
  textoBoton: string;
  estado: EstadoNoticia;
  vistas: number;
}

type FormularioNoticia = Omit<Noticia, 'id' | 'fechaRegistro' | 'estado' | 'vistas'>;

const beneficiosRelacionados = [
  '20% de descuento en entradas',
  'Cafe gratis en compras mayores a $200',
  '2x1 en libros seleccionados',
  'Descuento en cursos de programacion'
];

const exploraRelacionados = [
  'Talleres',
  'Conferencias',
  'Festival',
  'Cursos'
];

const noticiaVacia: FormularioNoticia = {
  titulo: '',
  clasificacion: '',
  categoria: '',
  contenido: '',
  vigenciaInicio: '',
  vigenciaFin: '',
  imagenPreview: '',
  tipoLiga: 'ninguna',
  registroRelacionado: '',
  urlExterna: '',
  textoBoton: 'Ir al sitio oficial'
};

const noticiasIniciales: Noticia[] = [
  {
    id: '1',
    fechaRegistro: '29/05/2026',
    titulo: 'Nuevos horarios de atencion INJUVE Tamaulipas',
    clasificacion: 'Cultura',
    categoria: 'Comunicado',
    contenido:
      'En INJUVE Tamaulipas trabajamos para brindarte un mejor servicio. Por ello, te compartimos nuestros nuevos horarios y canales de atencion para que puedas realizar tus consultas y tramites de forma mas agil y eficiente.',
    vigenciaInicio: '2026-05-29',
    vigenciaFin: '2026-12-31',
    imagenPreview: '',
    tipoLiga: 'url',
    registroRelacionado: '',
    urlExterna: 'https://www.tamaulipas.gob.mx/injuve/',
    textoBoton: 'Ir al sitio oficial',
    estado: 'Publicado',
    vistas: 1240
  },
  {
    id: '2',
    fechaRegistro: '25/05/2026',
    titulo: 'Convocatoria abierta para cursos de verano',
    clasificacion: 'Educacion',
    categoria: 'Convocatorias',
    contenido: 'Los jovenes interesados podran registrarse en los cursos disponibles desde la app movil.',
    vigenciaInicio: '2026-06-01',
    vigenciaFin: '2026-07-15',
    imagenPreview: '',
    tipoLiga: 'explora',
    registroRelacionado: 'Cursos',
    urlExterna: '',
    textoBoton: 'Ver cursos',
    estado: 'Registrado',
    vistas: 0
  },
  {
    id: '3',
    fechaRegistro: '20/05/2026',
    titulo: 'Aviso de mantenimiento en plataforma',
    clasificacion: 'Educacion',
    categoria: 'Avisos',
    contenido: 'Durante el mantenimiento algunos servicios pueden no estar disponibles temporalmente.',
    vigenciaInicio: '2026-05-20',
    vigenciaFin: '2026-06-15',
    imagenPreview: '',
    tipoLiga: 'ninguna',
    registroRelacionado: '',
    urlExterna: '',
    textoBoton: '',
    estado: 'Cancelado',
    vistas: 315
  }
];

const getEstadoClasses = (estado: EstadoNoticia) => {
  if (estado === 'Publicado') return 'bg-green-100 text-green-800';
  if (estado === 'Cancelado') return 'bg-red-100 text-red-800';
  return 'bg-blue-100 text-blue-800';
};

const herramientasEditor = [
  { icon: Bold, label: 'Negrita' },
  { icon: Italic, label: 'Cursiva' },
  { icon: Underline, label: 'Subrayado' },
  { icon: Strikethrough, label: 'Tachado' },
  { icon: AlignLeft, label: 'Alinear' },
  { icon: ListOrdered, label: 'Lista numerada' },
  { icon: List, label: 'Lista' },
  { icon: Link, label: 'Enlace' },
  { icon: Table2, label: 'Tabla' },
  { icon: Undo2, label: 'Deshacer' },
  { icon: Redo2, label: 'Rehacer' }
];

export function NoticiasList() {
  const categoriasNoticias = getCategoriasActivasPorSeccion('noticias');
  const clasificaciones = getClasificacionesActivas();

  const [vista, setVista] = useState<Vista>('lista');
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [filtros, setFiltros] = useState({ categoria: '', estado: '' });
  const [noticias, setNoticias] = useState<Noticia[]>(noticiasIniciales);
  const [formulario, setFormulario] = useState<FormularioNoticia>(noticiaVacia);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null);
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [posicionMenu, setPosicionMenu] = useState<PosicionMenu | null>(null);
  const [modalPublicar, setModalPublicar] = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [modalRestaurar, setModalRestaurar] = useState(false);
  const [observaciones, setObservaciones] = useState('');

  const noticiasFiltradas = useMemo(() => {
    const busquedaNormalizada = busqueda.trim().toLowerCase();
    return noticias.filter((noticia) => {
      const coincideBusqueda =
        !busquedaNormalizada ||
        noticia.titulo.toLowerCase().includes(busquedaNormalizada) ||
        noticia.contenido.toLowerCase().includes(busquedaNormalizada) ||
        noticia.categoria.toLowerCase().includes(busquedaNormalizada);
      const coincideCategoria = !filtros.categoria || noticia.categoria === filtros.categoria;
      const coincideEstado = !filtros.estado || noticia.estado === filtros.estado;
      return coincideBusqueda && coincideCategoria && coincideEstado;
    });
  }, [busqueda, filtros, noticias]);

  const limpiarFormulario = () => {
    setFormulario(noticiaVacia);
    setNoticiaSeleccionada(null);
  };

  const abrirNuevaNoticia = () => {
    limpiarFormulario();
    setVista('formulario');
  };

  const abrirEditar = (noticia: Noticia) => {
    if (noticia.estado === 'Publicado') {
      setNoticiaSeleccionada(noticia);
      setModalCancelar(true);
      return;
    }

    setNoticiaSeleccionada(noticia);
    setFormulario({
      titulo: noticia.titulo,
      clasificacion: noticia.clasificacion,
      categoria: noticia.categoria,
      contenido: noticia.contenido,
      vigenciaInicio: noticia.vigenciaInicio,
      vigenciaFin: noticia.vigenciaFin,
      imagenPreview: noticia.imagenPreview,
      tipoLiga: noticia.tipoLiga,
      registroRelacionado: noticia.registroRelacionado,
      urlExterna: noticia.urlExterna,
      textoBoton: noticia.textoBoton
    });
    setMenuAbierto(null);
    setPosicionMenu(null);
    setVista('formulario');
  };

  const guardarNoticia = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const noticiaGuardada: Noticia = {
      id: noticiaSeleccionada?.id ?? String(Date.now()),
      fechaRegistro: noticiaSeleccionada?.fechaRegistro ?? new Date().toLocaleDateString('es-MX'),
      ...formulario,
      estado: noticiaSeleccionada?.estado ?? 'Registrado',
      vistas: noticiaSeleccionada?.vistas ?? 0
    };

    setNoticias((actuales) =>
      noticiaSeleccionada
        ? actuales.map((noticia) => (noticia.id === noticiaSeleccionada.id ? noticiaGuardada : noticia))
        : [noticiaGuardada, ...actuales]
    );
    limpiarFormulario();
    setVista('lista');
  };

  const handleImagen = (event: ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormulario((actual) => ({ ...actual, imagenPreview: String(reader.result) }));
    };
    reader.readAsDataURL(archivo);
  };

  const abrirDetalle = (noticia: Noticia) => {
    setNoticiaSeleccionada(noticia);
    setMenuAbierto(null);
    setPosicionMenu(null);
    setVista('detalle');
  };

  const alternarMenuAcciones = (event: MouseEvent<HTMLButtonElement>, noticiaId: string) => {
    if (menuAbierto === noticiaId) {
      setMenuAbierto(null);
      setPosicionMenu(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const anchoMenu = 224;
    const altoMenuEstimado = 176;
    const espacioInferior = window.innerHeight - rect.bottom;
    const top =
      espacioInferior < altoMenuEstimado
        ? Math.max(8, rect.top - altoMenuEstimado - 8)
        : rect.bottom + 8;
    const left = Math.min(
      window.innerWidth - anchoMenu - 8,
      Math.max(8, rect.right - anchoMenu)
    );

    setMenuAbierto(noticiaId);
    setPosicionMenu({ top, left });
  };

  const cerrarMenuAcciones = () => {
    setMenuAbierto(null);
    setPosicionMenu(null);
  };

  const abrirModalPublicar = (noticia: Noticia) => {
    setNoticiaSeleccionada(noticia);
    setModalPublicar(true);
    setObservaciones('');
    cerrarMenuAcciones();
  };

  const abrirModalCancelar = (noticia: Noticia) => {
    setNoticiaSeleccionada(noticia);
    setModalCancelar(true);
    setObservaciones('');
    cerrarMenuAcciones();
  };

  const abrirModalRestaurar = (noticia: Noticia) => {
    setNoticiaSeleccionada(noticia);
    setModalRestaurar(true);
    setObservaciones('');
    cerrarMenuAcciones();
  };

  const actualizarEstadoNoticia = (estado: EstadoNoticia) => {
    if (!noticiaSeleccionada) return;

    const noticiaActualizada = { ...noticiaSeleccionada, estado };

    setNoticias((actuales) =>
      actuales.map((noticia) =>
        noticia.id === noticiaSeleccionada.id ? noticiaActualizada : noticia
      )
    );
    setNoticiaSeleccionada((actual) => (actual?.id === noticiaActualizada.id ? noticiaActualizada : actual));
  };

  const confirmarPublicar = () => {
    actualizarEstadoNoticia('Publicado');
    setModalPublicar(false);
    setNoticiaSeleccionada(null);
  };

  const confirmarCancelar = () => {
    actualizarEstadoNoticia('Cancelado');
    setModalCancelar(false);
    setNoticiaSeleccionada(null);
    setObservaciones('');
  };

  const confirmarRestaurar = () => {
    actualizarEstadoNoticia('Registrado');
    setModalRestaurar(false);
    setNoticiaSeleccionada(null);
    setObservaciones('');
  };

  const duplicarNoticia = (noticia: Noticia) => {
    const copia: Noticia = {
      ...noticia,
      id: String(Date.now()),
      titulo: `${noticia.titulo} (copia)`,
      estado: 'Registrado',
      vistas: 0,
      fechaRegistro: new Date().toLocaleDateString('es-MX')
    };
    setNoticias((actuales) => [copia, ...actuales]);
    cerrarMenuAcciones();
  };

  const registrosRelacionados =
    formulario.tipoLiga === 'beneficio'
      ? beneficiosRelacionados
      : formulario.tipoLiga === 'explora'
        ? exploraRelacionados
        : [];

  if (vista === 'formulario') {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
          <Home className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600 hidden sm:inline">Inicio</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button onClick={() => setVista('lista')} className="text-gray-600 hover:text-gray-900">
            Noticias
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-semibold">
            {noticiaSeleccionada ? 'Editar noticia' : 'Nueva noticia'}
          </span>
        </div>

        <div className="mb-4 md:mb-6">
          <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">
            {noticiaSeleccionada ? 'Editar Noticia' : 'Nueva Noticia'}
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Define el contenido, vigencia y destino que se mostrara en la app movil.
          </p>
        </div>

        <form onSubmit={guardarNoticia}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#FAF7F0' }}>
              <h2 className="text-gray-900 font-semibold">Contenido y publicacion</h2>
            </div>

            <div className="p-4 md:p-6 space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Titulo *</label>
                <input
                  value={formulario.titulo}
                  onChange={(event) => setFormulario({ ...formulario, titulo: event.target.value })}
                  placeholder="Ej: Nuevos horarios de atencion INJUVE Tamaulipas"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Tipo de noticia *</label>
                  <select
                    value={formulario.categoria}
                    onChange={(event) => setFormulario({ ...formulario, categoria: event.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    {categoriasNoticias.map((categoria) => (
                      <option key={categoria.id} value={categoria.nombre}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Clasificacion *</label>
                  <select
                    value={formulario.clasificacion}
                    onChange={(event) => setFormulario({ ...formulario, clasificacion: event.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Seleccionar clasificacion</option>
                    {clasificaciones.map((clasificacion) => (
                      <option key={clasificacion.id} value={clasificacion.nombre}>
                        {clasificacion.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Vigencia *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={formulario.vigenciaInicio}
                      onChange={(event) => setFormulario({ ...formulario, vigenciaInicio: event.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      required
                    />
                    <input
                      type="date"
                      value={formulario.vigenciaFin}
                      onChange={(event) => setFormulario({ ...formulario, vigenciaFin: event.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Contenido *</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#922735] focus-within:border-transparent">
                  <div className="flex items-center flex-wrap border-b border-gray-200 bg-gray-50">
                    <button
                      type="button"
                      className="h-10 px-3 border-r border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                      title="Formato"
                    >
                      A1
                    </button>
                    {herramientasEditor.map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        type="button"
                        title={label}
                        className="h-10 w-10 border-r border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={formulario.contenido}
                    onChange={(event) => setFormulario({ ...formulario, contenido: event.target.value })}
                    rows={12}
                    placeholder="Escribe el contenido completo que se mostrara en la app movil..."
                    className="w-full px-4 py-3 text-sm focus:outline-none resize-none min-h-[260px]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Imagen principal</label>
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#922735] transition-colors">
                  <Upload className="w-6 h-6 text-[#922735]" />
                  <span className="text-sm text-gray-700 font-medium">Subir imagen para la app movil</span>
                  <span className="text-xs text-gray-500">PNG o JPG recomendado</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImagen} />
                </label>
              </div>

              <div className="border-t border-gray-200 pt-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Destino del boton en app movil</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Tipo de enlace</label>
                    <select
                      value={formulario.tipoLiga}
                      onChange={(event) =>
                        setFormulario({
                          ...formulario,
                          tipoLiga: event.target.value as TipoLiga,
                          registroRelacionado: '',
                          urlExterna: ''
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="ninguna">Sin boton</option>
                      <option value="beneficio">Ligar a Beneficio</option>
                      <option value="explora">Ligar a Explora</option>
                      <option value="url">URL externa</option>
                    </select>
                  </div>

                  {formulario.tipoLiga !== 'ninguna' && (
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">Texto del boton</label>
                      <input
                        value={formulario.textoBoton}
                        onChange={(event) => setFormulario({ ...formulario, textoBoton: event.target.value })}
                        placeholder="Ej: Ir al sitio oficial"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      />
                    </div>
                  )}

                  {(formulario.tipoLiga === 'beneficio' || formulario.tipoLiga === 'explora') && (
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">Registro ligado</label>
                      <select
                        value={formulario.registroRelacionado}
                        onChange={(event) => setFormulario({ ...formulario, registroRelacionado: event.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                      >
                        <option value="">Seleccionar registro</option>
                        {registrosRelacionados.map((registro) => (
                          <option key={registro} value={registro}>
                            {registro}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {formulario.tipoLiga === 'url' && (
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">URL destino</label>
                      <input
                        value={formulario.urlExterna}
                        onChange={(event) => setFormulario({ ...formulario, urlExterna: event.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setVista('lista')}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#922735] text-white rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors"
                >
                  Guardar noticia
                </button>
              </div>
            </div>
          </div>

        </form>
      </div>
    );
  }

  if (vista === 'detalle' && noticiaSeleccionada) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <button
          onClick={() => setVista('lista')}
          className="inline-flex items-center gap-2 text-sm text-[#922735] font-semibold hover:text-[#7a1f2d] mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al listado
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#FAF7F0' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{noticiaSeleccionada.titulo}</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {noticiaSeleccionada.categoria} | {noticiaSeleccionada.clasificacion}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${getEstadoClasses(noticiaSeleccionada.estado)}`}>
                {noticiaSeleccionada.estado}
              </span>
            </div>
          </div>

          <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
            <div>
              {noticiaSeleccionada.imagenPreview ? (
                <img src={noticiaSeleccionada.imagenPreview} alt={noticiaSeleccionada.titulo} className="w-full max-h-80 object-cover rounded-lg mb-4" />
              ) : (
                <div className="w-full h-56 bg-gray-100 rounded-lg flex items-center justify-center mb-4 text-gray-400">
                  <ImageIcon className="w-10 h-10" />
                </div>
              )}
              <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-line">{noticiaSeleccionada.contenido}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-xs font-semibold text-gray-500">Vigencia</span>
                <span className="text-gray-900">{noticiaSeleccionada.vigenciaInicio} a {noticiaSeleccionada.vigenciaFin}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500">Destino</span>
                <span className="text-gray-900">
                  {noticiaSeleccionada.tipoLiga === 'ninguna'
                    ? 'Sin boton'
                    : noticiaSeleccionada.tipoLiga === 'url'
                      ? noticiaSeleccionada.urlExterna
                      : noticiaSeleccionada.registroRelacionado}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500">Vistas</span>
                <span className="text-gray-900">{noticiaSeleccionada.vistas.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Noticias</span>
      </div>

      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Gestion de Noticias</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Administra avisos, comunicados y convocatorias visibles en la app movil.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-200 flex justify-end">
          <button
            onClick={abrirNuevaNoticia}
            className="bg-[#922735] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Noticia</span>
          </button>
        </div>

        <div className="px-4 md:px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
                className="flex items-center gap-2 py-2 hover:opacity-80 transition-opacity"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#922735]" />
                <span className="text-gray-700 font-semibold text-sm">Filtros Avanzados</span>
                {filtrosAbiertos ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {filtrosAbiertos && <DescargarFiltradoButton filename="noticias-filtradas" />}
            </div>

            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={busqueda}
                  onChange={(event) => setBusqueda(event.target.value)}
                  placeholder="Buscar por titulo, contenido o tipo..."
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {filtrosAbiertos && (
            <div className="pt-3 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-xs font-semibold mb-1.5">Tipo de noticia</label>
                  <select
                    value={filtros.categoria}
                    onChange={(event) => setFiltros({ ...filtros, categoria: event.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                  >
                    <option value="">Todos</option>
                    {categoriasNoticias.map((categoria) => (
                      <option key={categoria.id} value={categoria.nombre}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-semibold mb-1.5">Estado</label>
                  <select
                    value={filtros.estado}
                    onChange={(event) => setFiltros({ ...filtros, estado: event.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                  >
                    <option value="">Todos</option>
                    <option value="Registrado">Registrado</option>
                    <option value="Publicado">Publicado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setFiltros({ categoria: '', estado: '' })}
                className="text-[#922735] text-xs font-semibold underline hover:text-[#7a1f2d] transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        <div className="px-4 md:px-6 py-3 border-b border-gray-200 flex items-center gap-2 text-xs text-gray-600">
          <span>Mostrar</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>entradas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#C9A961] to-[#D4B871]">
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Noticia
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Tipo
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Clasificacion
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Vigencia
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Liga
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Estado
                  </div>
                </th>
                <th className="px-4 py-3.5 text-center">
                  <div className="text-white text-[11px] font-semibold uppercase tracking-wider">
                    Acciones
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {noticiasFiltradas.map((noticia) => (
                <tr key={noticia.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3.5 text-sm">
                    <div className="max-w-sm">
                      <div className="text-gray-900 font-medium line-clamp-1">{noticia.titulo}</div>
                      <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">{noticia.contenido}</div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">{noticia.categoria}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">{noticia.clasificacion}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      <span>{noticia.vigenciaInicio} - {noticia.vigenciaFin}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {noticia.tipoLiga === 'ninguna' ? (
                      'Sin liga'
                    ) : (
                      <div className="flex items-center gap-1">
                        <Link className="w-3.5 h-3.5 text-[#922735]" />
                        <span>{noticia.tipoLiga === 'url' ? 'Sitio externo' : noticia.registroRelacionado}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-3.5 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getEstadoClasses(noticia.estado)}`}>
                      {noticia.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="relative">
                      <button
                        onClick={(event) => alternarMenuAcciones(event, noticia.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {menuAbierto === noticia.id && posicionMenu && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={cerrarMenuAcciones} />
                          <div
                            className="fixed z-50 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                            style={{ top: posicionMenu.top, left: posicionMenu.left }}
                          >
                            <button
                              onClick={() => abrirDetalle(noticia)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4 text-[#922735]" />
                              Ver detalle
                            </button>

                            {noticia.estado === 'Registrado' && (
                              <>
                                <button
                                  onClick={() => abrirEditar(noticia)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <Edit className="w-4 h-4 text-[#922735]" />
                                  Editar
                                </button>
                                <button
                                  onClick={() => abrirModalPublicar(noticia)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <Send className="w-4 h-4 text-[#922735]" />
                                  Publicar
                                </button>
                                <button
                                  onClick={() => abrirModalCancelar(noticia)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4 text-[#922735]" />
                                  Cancelar
                                </button>
                              </>
                            )}

                            {noticia.estado === 'Publicado' && (
                              <>
                                <button
                                  onClick={() => abrirModalCancelar(noticia)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <Archive className="w-4 h-4 text-[#922735]" />
                                  Cancelar publicacion
                                </button>
                                <button
                                  onClick={() => duplicarNoticia(noticia)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <Copy className="w-4 h-4 text-[#922735]" />
                                  Duplicar
                                </button>
                              </>
                            )}

                            {noticia.estado === 'Cancelado' && (
                              <button
                                onClick={() => abrirModalRestaurar(noticia)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                              >
                                <RotateCcw className="w-4 h-4 text-[#922735]" />
                                Restaurar
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {noticiasFiltradas.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                    No se encontraron noticias con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            Mostrando {noticiasFiltradas.length > 0 ? 1 : 0} a {noticiasFiltradas.length} de {noticiasFiltradas.length} entradas
          </p>
          <div className="flex items-center gap-2">
            <button className="px-2 md:px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              Anterior
            </button>
            <button className="px-3 py-1.5 bg-[#922735] text-white rounded text-xs font-medium">1</button>
            <button className="px-2 md:px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Publicar */}
      {modalPublicar && noticiaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Publicar Noticia</h3>
                  <p className="text-sm text-gray-600">La noticia estara visible para los usuarios</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                Estas seguro que deseas publicar la noticia "<strong>{noticiaSeleccionada.titulo}</strong>"?
                La noticia sera visible en la app movil durante la vigencia configurada.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setModalPublicar(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarPublicar}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Publicar Noticia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cancelar */}
      {modalCancelar && noticiaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Cancelar Noticia</h3>
                  <p className="text-sm text-gray-600">La noticia dejara de estar visible</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Estas seguro que deseas cancelar la noticia "<strong>{noticiaSeleccionada.titulo}</strong>"?
                Esta accion cambiara el estado de la noticia a cancelado.
              </p>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Motivo de cancelacion</label>
                <textarea
                  value={observaciones}
                  onChange={(event) => setObservaciones(event.target.value)}
                  rows={4}
                  placeholder="Describe el motivo..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setModalCancelar(false);
                    setObservaciones('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  No, mantener
                </button>
                <button
                  onClick={confirmarCancelar}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Si, cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Restaurar */}
      {modalRestaurar && noticiaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Restaurar Noticia</h3>
                  <p className="text-sm text-gray-600">La noticia volvera al estado Registrado</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                Estas seguro que deseas restaurar la noticia "<strong>{noticiaSeleccionada.titulo}</strong>"?
                Podras editarla o publicarla nuevamente.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setModalRestaurar(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarRestaurar}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Restaurar Noticia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
