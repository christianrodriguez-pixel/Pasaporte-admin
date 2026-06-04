import { useState } from 'react';
import {
  Home,
  ChevronRight,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Search,
  MoreVertical,
  ArrowUpDown,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Calendar,
  Users,
  QrCode,
  Copy,
  PauseCircle,
  XCircle,
  PlayCircle,
  Send,
  Archive,
  RotateCcw
} from 'lucide-react';
import { NuevaActividadAliado } from './NuevaActividadAliado';
import { ActividadDetalle } from './ActividadDetalle';
import { GenerarQRModal } from './GenerarQRModal';
import { SeleccionarAliadoModal } from './SeleccionarAliadoModal';
import { DescargarFiltradoButton } from './DescargarFiltradoButton';

interface Actividad {
  id: string;
  nombre: string;
  aliado: string;
  tipo: string;
  categoria: string;
  clasificacion: string;
  nivel: string;
  fechaInicio: string;
  fechaFin: string;
  puntosOtorgados: number;
  estado: 'Borrador' | 'Registrado' | 'Publicado' | 'Pausado' | 'Cancelado' | 'Archivado';
}

interface ActividadesListProps {
  onInicio?: () => void;
}

export function ActividadesList({ onInicio }: ActividadesListProps) {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [vistaActual, setVistaActual] = useState<'lista' | 'nueva' | 'detalle'>('lista');
  const [aliadoSeleccionado, setAliadoSeleccionado] = useState<any>(null);
  const [actividadSeleccionada, setActividadSeleccionada] = useState<any>(null);
  const [actividadQR, setActividadQR] = useState<any>(null);
  const [modalAliadoAbierta, setModalAliadoAbierta] = useState(false);

  // Estados de modales de acciones
  const [modalPublicar, setModalPublicar] = useState(false);
  const [modalPausar, setModalPausar] = useState(false);
  const [modalReactivar, setModalReactivar] = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [modalArchivar, setModalArchivar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalRestaurar, setModalRestaurar] = useState(false);
  const [modalDuplicar, setModalDuplicar] = useState(false);

  const [actividades, setActividades] = useState<Actividad[]>([
    {
      id: '1',
      nombre: 'Concierto de rock en vivo',
      aliado: 'Teatro Metropolitan',
      tipo: 'Evento',
      categoria: 'Entretenimiento',
      clasificacion: 'Cultura',
      nivel: 'Todos los niveles',
      fechaInicio: '01/06/2026',
      fechaFin: '30/06/2026',
      puntosOtorgados: 150,
      estado: 'Publicado'
    },
    {
      id: '2',
      nombre: 'Taller de fotografía digital',
      aliado: 'Escuela de Artes Visuales',
      tipo: 'Taller',
      categoria: 'Cultura',
      clasificacion: 'Cultura',
      nivel: 'Básico',
      fechaInicio: '15/05/2026',
      fechaFin: '31/12/2026',
      puntosOtorgados: 200,
      estado: 'Publicado'
    },
    {
      id: '3',
      nombre: 'Maratón ciudad Victoria',
      aliado: 'Gimnasio Norte',
      tipo: 'Evento',
      categoria: 'Deportes',
      clasificacion: 'Deportes',
      nivel: 'Todos los niveles',
      fechaInicio: '10/06/2026',
      fechaFin: '10/06/2026',
      puntosOtorgados: 300,
      estado: 'Registrado'
    },
    {
      id: '4',
      nombre: 'Taller de emprendimiento',
      aliado: 'Casa de la Cultura Victoria',
      tipo: 'Taller',
      categoria: 'Educación',
      clasificacion: 'Educacion',
      nivel: 'Protagonista',
      fechaInicio: '01/05/2026',
      fechaFin: '31/05/2026',
      puntosOtorgados: 250,
      estado: 'Pausado'
    },
    {
      id: '5',
      nombre: 'Noche de cine francés',
      aliado: 'Cinépolis Tampico',
      tipo: 'Evento',
      categoria: 'Cultura',
      clasificacion: 'Cultura',
      nivel: 'Todos los niveles',
      fechaInicio: '01/07/2026',
      fechaFin: '15/07/2026',
      puntosOtorgados: 100,
      estado: 'Borrador'
    },
    {
      id: '6',
      nombre: 'Clase de cocina mexicana',
      aliado: 'Café Nómada',
      tipo: 'Taller',
      categoria: 'Gastronomía',
      clasificacion: 'Cultura',
      nivel: 'Todos los niveles',
      fechaInicio: '20/06/2026',
      fechaFin: '20/06/2026',
      puntosOtorgados: 180,
      estado: 'Publicado'
    },
    {
      id: '7',
      nombre: 'Torneo de ajedrez',
      aliado: 'Casa de la Cultura Victoria',
      tipo: 'Evento',
      categoria: 'Entretenimiento',
      clasificacion: 'Cultura',
      nivel: 'Básico',
      fechaInicio: '01/01/2026',
      fechaFin: '31/03/2026',
      puntosOtorgados: 120,
      estado: 'Cancelado'
    },
    {
      id: '8',
      nombre: 'Conferencia de tecnología',
      aliado: 'Tech Hub Tamaulipas',
      tipo: 'Evento',
      categoria: 'Tecnología',
      clasificacion: 'Cultura',
      nivel: 'Protagonista',
      fechaInicio: '15/06/2026',
      fechaFin: '15/06/2026',
      puntosOtorgados: 220,
      estado: 'Registrado'
    },
    {
      id: '9',
      nombre: 'Exposición de arte contemporáneo',
      aliado: 'Museo de Arte Moderno',
      tipo: 'Evento',
      categoria: 'Cultura',
      clasificacion: 'Cultura',
      nivel: 'Todos los niveles',
      fechaInicio: '01/06/2026',
      fechaFin: '30/08/2026',
      puntosOtorgados: 80,
      estado: 'Publicado'
    },
    {
      id: '10',
      nombre: 'Taller de yoga y meditación',
      aliado: 'Centro Holístico Zen',
      tipo: 'Taller',
      categoria: 'Salud',
      clasificacion: 'Salud',
      nivel: 'Todos los niveles',
      fechaInicio: '01/07/2026',
      fechaFin: '31/07/2026',
      puntosOtorgados: 150,
      estado: 'Borrador'
    },
    {
      id: '11',
      nombre: 'Competencia de robótica',
      aliado: 'Tech Hub Tamaulipas',
      tipo: 'Evento',
      categoria: 'Tecnología',
      clasificacion: 'Cultura',
      nivel: 'Protagonista',
      fechaInicio: '01/01/2025',
      fechaFin: '30/06/2025',
      puntosOtorgados: 350,
      estado: 'Archivado'
    },
    {
      id: '12',
      nombre: 'Festival de música electrónica',
      aliado: 'Teatro Metropolitan',
      tipo: 'Evento',
      categoria: 'Entretenimiento',
      clasificacion: 'Cultura',
      nivel: 'Leyenda',
      fechaInicio: '01/08/2026',
      fechaFin: '03/08/2026',
      puntosOtorgados: 400,
      estado: 'Publicado'
    }
  ]);

  const aliadosMock = [
    { id: '1', nombre: 'Cinépolis Tampico', tipo: 'Empresa Privada', categoria: 'Entretenimiento' },
    { id: '2', nombre: 'Café Nómada', tipo: 'Comercio Local', categoria: 'Comercio' },
    { id: '3', nombre: 'Casa de la Cultura Victoria', tipo: 'Centro Cultural', categoria: 'Cultura' },
    { id: '4', nombre: 'Gimnasio Norte', tipo: 'Centro Deportivo', categoria: 'Deportes' },
    { id: '5', nombre: 'Tech Hub Tamaulipas', tipo: 'Institución Educativa', categoria: 'Tecnología' },
    { id: '6', nombre: 'Teatro Metropolitan', tipo: 'Centro Cultural', categoria: 'Entretenimiento' },
    { id: '7', nombre: 'Escuela de Artes Visuales', tipo: 'Institución Educativa', categoria: 'Cultura' },
    { id: '8', nombre: 'Museo de Arte Moderno', tipo: 'Centro Cultural', categoria: 'Cultura' },
    { id: '9', nombre: 'Centro Holístico Zen', tipo: 'Centro de Bienestar', categoria: 'Salud' }
  ];

  const handleNuevaActividad = () => {
    setModalAliadoAbierta(true);
  };

  const handleSelectAliado = (aliado: any) => {
    setAliadoSeleccionado(aliado);
    setVistaActual('nueva');
  };

  const handleVolverLista = () => {
    setVistaActual('lista');
    setAliadoSeleccionado(null);
    setActividadSeleccionada(null);
  };

  // Handlers para acciones
  const handleVerDetalle = (actividad: Actividad) => {
    setActividadSeleccionada(actividad);
    setVistaActual('detalle');
  };

  const handleEditar = (actividad: Actividad) => {
    setActividadSeleccionada(actividad);
    const aliadoActividad = aliadosMock.find((aliado) => aliado.nombre === actividad.aliado) || { id: '1', nombre: actividad.aliado };
    setAliadoSeleccionado(aliadoActividad);
    setVistaActual('nueva');
  };

  const handlePublicar = (actividad: Actividad) => {
    setActividadSeleccionada(actividad);
    setModalPublicar(true);
  };

  const handlePausar = (actividad: Actividad) => {
    setActividadSeleccionada(actividad);
    setModalPausar(true);
  };

  const handleReactivar = (actividad: Actividad) => {
    setActividadSeleccionada(actividad);
    setModalReactivar(true);
  };

  const handleCancelar = (actividad: Actividad) => {
    setActividadSeleccionada(actividad);
    setModalCancelar(true);
  };

  const handleArchivar = (actividad: Actividad) => {
    setActividadSeleccionada(actividad);
    setModalArchivar(true);
  };

  const handleEliminar = (actividad: Actividad) => {
    setActividadSeleccionada(actividad);
    setModalEliminar(true);
  };

  const handleRestaurar = (actividad: Actividad) => {
    setActividadSeleccionada(actividad);
    setModalRestaurar(true);
  };

  const handleDuplicar = (actividad: Actividad) => {
    setActividadSeleccionada(actividad);
    setModalDuplicar(true);
  };

  const actualizarEstadoActividad = (estado: Actividad['estado']) => {
    if (!actividadSeleccionada) return;

    setActividades((actuales) =>
      actuales.map((actividad) =>
        actividad.id === actividadSeleccionada.id ? { ...actividad, estado } : actividad
      )
    );
  };

  // Funciones de confirmación
  const confirmarPublicar = () => {
    actualizarEstadoActividad('Publicado');
    setModalPublicar(false);
    setActividadSeleccionada(null);
  };

  const confirmarPausar = () => {
    actualizarEstadoActividad('Pausado');
    setModalPausar(false);
    setActividadSeleccionada(null);
  };

  const confirmarReactivar = () => {
    actualizarEstadoActividad('Publicado');
    setModalReactivar(false);
    setActividadSeleccionada(null);
  };

  const confirmarCancelar = () => {
    actualizarEstadoActividad('Cancelado');
    setModalCancelar(false);
    setActividadSeleccionada(null);
  };

  const confirmarArchivar = () => {
    actualizarEstadoActividad('Archivado');
    setModalArchivar(false);
    setActividadSeleccionada(null);
  };

  const confirmarEliminar = () => {
    if (actividadSeleccionada) {
      setActividades((actuales) => actuales.filter((actividad) => actividad.id !== actividadSeleccionada.id));
    }
    setModalEliminar(false);
    setActividadSeleccionada(null);
  };

  const confirmarRestaurar = () => {
    actualizarEstadoActividad('Borrador');
    setModalRestaurar(false);
    setActividadSeleccionada(null);
  };

  const confirmarDuplicar = () => {
    if (!actividadSeleccionada) return;

    const copia: Actividad = {
      ...actividadSeleccionada,
      id: String(Date.now()),
      nombre: `${actividadSeleccionada.nombre} (copia)`,
      estado: 'Borrador'
    };

    setActividades((actuales) => [copia, ...actuales]);
    setModalDuplicar(false);
    setActividadSeleccionada(null);
  };

  // Función auxiliar para verificar si la vigencia ha caducado
  const vigenciaHaCaducado = (actividad: Actividad): boolean => {
    const hoy = new Date();
    const partesFecha = actividad.fechaFin.split('/');
    const fechaFin = new Date(
      parseInt(partesFecha[2]),
      parseInt(partesFecha[1]) - 1,
      parseInt(partesFecha[0])
    );
    return hoy > fechaFin;
  };

  const getAccionesPorEstado = (actividad: Actividad) => {
    const acciones = [];

    // Ver detalle siempre está disponible
    acciones.push({
      icono: Eye,
      label: 'Ver Detalle',
      color: 'text-[#922735]',
      onClick: () => {
        setMenuAbierto(null);
        handleVerDetalle(actividad);
      }
    });

    // Ver usuarios siempre está disponible
    acciones.push({
      icono: Users,
      label: 'Ver Usuarios',
      color: 'text-[#922735]',
      onClick: () => {
        setMenuAbierto(null);
        handleVerDetalle(actividad);
      }
    });

    // Generar QR siempre está disponible
    acciones.push({
      icono: QrCode,
      label: 'Generar QR',
      color: 'text-[#922735]',
      onClick: () => {
        setMenuAbierto(null);
        setActividadQR(actividad);
      }
    });

    switch (actividad.estado) {
      case 'Borrador':
        acciones.push({
          icono: Pencil,
          label: 'Editar',
          color: 'text-[#922735]',
          onClick: () => {
            setMenuAbierto(null);
            handleEditar(actividad);
          }
        });
        acciones.push({
          icono: Copy,
          label: 'Duplicar',
          color: 'text-[#922735]',
          onClick: () => {
            setMenuAbierto(null);
            handleDuplicar(actividad);
          }
        });
        acciones.push({
          icono: Trash2,
          label: 'Eliminar',
          color: 'text-red-600',
          onClick: () => {
            setMenuAbierto(null);
            handleEliminar(actividad);
          }
        });
        break;

      case 'Registrado':
        acciones.push({
          icono: Pencil,
          label: 'Editar',
          color: 'text-[#922735]',
          onClick: () => {
            setMenuAbierto(null);
            handleEditar(actividad);
          }
        });
        acciones.push({
          icono: Send,
          label: 'Publicar',
          color: 'text-green-600',
          onClick: () => {
            setMenuAbierto(null);
            handlePublicar(actividad);
          }
        });
        acciones.push({
          icono: Copy,
          label: 'Duplicar',
          color: 'text-[#922735]',
          onClick: () => {
            setMenuAbierto(null);
            handleDuplicar(actividad);
          }
        });
        acciones.push({
          icono: XCircle,
          label: 'Cancelar',
          color: 'text-red-600',
          onClick: () => {
            setMenuAbierto(null);
            handleCancelar(actividad);
          }
        });
        break;

      case 'Publicado':
        acciones.push({
          icono: Copy,
          label: 'Duplicar',
          color: 'text-[#922735]',
          onClick: () => {
            setMenuAbierto(null);
            handleDuplicar(actividad);
          }
        });
        acciones.push({
          icono: PauseCircle,
          label: 'Pausar',
          color: 'text-yellow-600',
          onClick: () => {
            setMenuAbierto(null);
            handlePausar(actividad);
          }
        });
        acciones.push({
          icono: XCircle,
          label: 'Cancelar',
          color: 'text-red-600',
          onClick: () => {
            setMenuAbierto(null);
            handleCancelar(actividad);
          }
        });
        // Solo se puede archivar si la vigencia ha caducado
        if (vigenciaHaCaducado(actividad)) {
          acciones.push({
            icono: Archive,
            label: 'Archivar',
            color: 'text-purple-600',
            onClick: () => {
              setMenuAbierto(null);
              handleArchivar(actividad);
            }
          });
        }
        break;

      case 'Pausado':
        acciones.push({
          icono: Copy,
          label: 'Duplicar',
          color: 'text-[#922735]',
          onClick: () => {
            setMenuAbierto(null);
            handleDuplicar(actividad);
          }
        });
        acciones.push({
          icono: PlayCircle,
          label: 'Reactivar',
          color: 'text-green-600',
          onClick: () => {
            setMenuAbierto(null);
            handleReactivar(actividad);
          }
        });
        acciones.push({
          icono: XCircle,
          label: 'Cancelar',
          color: 'text-red-600',
          onClick: () => {
            setMenuAbierto(null);
            handleCancelar(actividad);
          }
        });
        break;

      case 'Cancelado':
        // Solo ver detalle, usuarios y QR
        break;

      case 'Archivado':
        acciones.push({
          icono: RotateCcw,
          label: 'Restaurar',
          color: 'text-blue-600',
          onClick: () => {
            setMenuAbierto(null);
            handleRestaurar(actividad);
          }
        });
        break;
    }

    return acciones;
  };

  const getBadgeColor = (estado: Actividad['estado']) => {
    switch (estado) {
      case 'Borrador':
        return 'bg-gray-100 text-gray-800';
      case 'Registrado':
        return 'bg-blue-100 text-blue-800';
      case 'Publicado':
        return 'bg-green-100 text-green-800';
      case 'Pausado':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      case 'Archivado':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Vista de detalle de actividad
  if (vistaActual === 'detalle' && actividadSeleccionada) {
    // Buscar el aliado de la actividad
    const aliadoActividad = aliadosMock.find(a => a.nombre === actividadSeleccionada.aliado) || { id: '1', nombre: actividadSeleccionada.aliado };

    // Transformar la actividad al formato esperado por ActividadDetalle
    const actividadConDatos = {
      ...actividadSeleccionada,
      fecha: actividadSeleccionada.fechaInicio,
      hora: '10:00 AM',
      ubicacion: 'Tampico, Tamaulipas',
      prioridad: actividadSeleccionada.estado === 'Publicado' ? 'alta' : 'normal',
      descripcion: 'Registro del modulo Explora visible en la app movil segun su estatus, vigencia, nivel dirigido y configuracion del aliado.',
      totalInscritos: 25,
      totalCheckIns: 22
    };

    return (
      <ActividadDetalle
        actividad={actividadConDatos}
        aliado={aliadoActividad}
        onInicio={onInicio}
        onVolver={handleVolverLista}
      />
    );
  }

  if (vistaActual === 'nueva' && aliadoSeleccionado) {
    return <NuevaActividadAliado onInicio={onInicio} onVolver={handleVolverLista} aliado={aliadoSeleccionado} />;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <button
          type="button"
          onClick={onInicio}
          className="flex items-center gap-2 text-gray-600 hover:text-[#922735] transition-colors disabled:cursor-default disabled:hover:text-gray-600"
          disabled={!onInicio}
        >
          <Home className="w-4 h-4 text-gray-500" />
          <span className="hidden sm:inline">Inicio</span>
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Explora</span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Explora</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Administra todas las actividades, promociones y beneficios ofrecidos por los aliados
        </p>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Botón nueva actividad */}
        <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-200 flex justify-end">
          <button
            onClick={handleNuevaActividad}
            className="bg-[#922735] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Actividad</span>
          </button>
        </div>

        {/* Búsqueda General y Filtros */}
        <div className="px-4 md:px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            {/* Filtros Avanzados */}
            <div className="flex-shrink-0">
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
                {filtrosAbiertos && <DescargarFiltradoButton filename="explora-filtrado" />}
              </div>
            </div>

            {/* Búsqueda General */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar actividades..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Panel de Filtros Avanzados */}
          <div>
            {filtrosAbiertos && (
              <div className="pt-3 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Tipo de Actividad
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white">
                      <option value="">Todos</option>
                      <option value="evento">Evento</option>
                      <option value="taller">Taller</option>
                      <option value="sorteo">Sorteo</option>
                      <option value="torneo">Torneo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Categoría
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white">
                      <option value="">Todas</option>
                      <option value="entretenimiento">Entretenimiento</option>
                      <option value="gastronomia">Gastronomía</option>
                      <option value="cultura">Cultura</option>
                      <option value="deportes">Deportes</option>
                      <option value="educacion">Educación</option>
                      <option value="salud">Salud y Bienestar</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="comercio">Comercio</option>
                      <option value="servicios">Servicios</option>
                      <option value="transporte">Transporte</option>
                      <option value="turismo">Turismo</option>
                      <option value="moda">Moda y Accesorios</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Dirigido a Nivel
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white">
                      <option value="">Todos</option>
                      <option value="todos">Todos los niveles</option>
                      <option value="basico">Básico</option>
                      <option value="protagonista">Protagonista</option>
                      <option value="embajador">Embajador</option>
                      <option value="leyenda">Leyenda</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Estado
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white">
                      <option value="">Todos</option>
                      <option value="borrador">Borrador</option>
                      <option value="registrado">Registrado</option>
                      <option value="publicado">Publicado</option>
                      <option value="pausado">Pausado</option>
                      <option value="cancelado">Cancelado</option>
                      <option value="archivado">Archivado</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-end">
                  <button className="text-[#922735] text-xs font-semibold underline hover:text-[#7a1f2d] transition-colors">
                    Limpiar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mostrar entradas */}
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

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#C9A961] to-[#D4B871]">
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    <span>Actividad</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    <span>Aliado</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    <span>Tipo</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    <span>Clasificacion</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    <span>Categoría</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    <span>Dirigido a Nivel</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    <span>Vigencia</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    <span>Puntos</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    <span>Estado</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-center">
                  <span className="text-white text-[11px] font-semibold uppercase tracking-wider">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {actividades.map((actividad) => (
                <tr key={actividad.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3.5 text-sm text-gray-900 font-medium">
                    {actividad.nombre}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {actividad.aliado}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {actividad.tipo}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {actividad.clasificacion}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {actividad.categoria}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {actividad.nivel}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {actividad.fechaInicio} - {actividad.fechaFin}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700 font-semibold">
                    +{actividad.puntosOtorgados} pts
                  </td>
                  <td className="px-3 py-3.5 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getBadgeColor(actividad.estado)}`}>
                      {actividad.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="relative">
                      <button
                        onClick={() => setMenuAbierto(menuAbierto === actividad.id ? null : actividad.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {menuAbierto === actividad.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setMenuAbierto(null)}
                          />
                          <div className="absolute right-0 top-8 z-20 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                            {getAccionesPorEstado(actividad).map((accion, index) => {
                              const Icono = accion.icono;
                              return (
                                <button
                                  key={index}
                                  onClick={accion.onClick}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <Icono className={`w-4 h-4 ${accion.color}`} />
                                  {accion.label}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            Mostrando 1 a {actividades.length} de {actividades.length} entradas
          </p>
          <div className="flex items-center gap-2">
            <button className="px-2 md:px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="hidden sm:inline">« Anterior</span>
              <span className="sm:hidden">«</span>
            </button>
            <button className="px-3 py-1.5 bg-[#922735] text-white rounded text-xs font-medium">
              1
            </button>
            <button className="px-2 md:px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="hidden sm:inline">Siguiente »</span>
              <span className="sm:hidden">»</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Publicar */}
      {modalPublicar && actividadSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Publicar Actividad</h3>
                  <p className="text-sm text-gray-600">La actividad estará visible para los usuarios</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas publicar la actividad "<strong>{actividadSeleccionada.nombre}</strong>"?
                Los usuarios podrán ver y acceder a esta actividad inmediatamente.
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
                  Publicar Actividad
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Pausar */}
      {modalPausar && actividadSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <PauseCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Pausar Actividad</h3>
                  <p className="text-sm text-gray-600">Esta acción pausará temporalmente la actividad</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas pausar la actividad "<strong>{actividadSeleccionada.nombre}</strong>"?
                Los usuarios no podrán acceder a esta actividad hasta que sea reactivada.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setModalPausar(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarPausar}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
                >
                  Pausar Actividad
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reactivar */}
      {modalReactivar && actividadSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Reactivar Actividad</h3>
                  <p className="text-sm text-gray-600">La actividad volverá a estar disponible</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas reactivar la actividad "<strong>{actividadSeleccionada.nombre}</strong>"?
                Los usuarios podrán acceder nuevamente a esta actividad.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setModalReactivar(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarReactivar}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Reactivar Actividad
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cancelar */}
      {modalCancelar && actividadSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Cancelar Actividad</h3>
                  <p className="text-sm text-gray-600">Esta acción es permanente</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas cancelar la actividad "<strong>{actividadSeleccionada.nombre}</strong>"?
                Esta acción no se puede deshacer y la actividad quedará cancelada permanentemente.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setModalCancelar(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  No, mantener
                </button>
                <button
                  onClick={confirmarCancelar}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Sí, cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Archivar */}
      {modalArchivar && actividadSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Archive className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Archivar Actividad</h3>
                  <p className="text-sm text-gray-600">La actividad se moverá al archivo</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas archivar la actividad "<strong>{actividadSeleccionada.nombre}</strong>"?
                La actividad dejará de estar visible pero podrás restaurarla más tarde si es necesario.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setModalArchivar(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarArchivar}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Archivar Actividad
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Eliminar */}
      {modalEliminar && actividadSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Eliminar Borrador</h3>
                  <p className="text-sm text-gray-600">Esta acción es permanente y no se puede deshacer</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas eliminar el borrador "<strong>{actividadSeleccionada.nombre}</strong>"?
                Esta acción eliminará permanentemente el borrador y no se podrá recuperar.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setModalEliminar(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  No, mantener
                </button>
                <button
                  onClick={confirmarEliminar}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Restaurar */}
      {modalRestaurar && actividadSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Restaurar Actividad</h3>
                  <p className="text-sm text-gray-600">La actividad volverá como borrador</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas restaurar la actividad "<strong>{actividadSeleccionada.nombre}</strong>"?
                La actividad volverá al estado de borrador y podrás editarla antes de publicarla nuevamente.
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
                  Restaurar Actividad
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Duplicar */}
      {modalDuplicar && actividadSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Copy className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Duplicar Actividad</h3>
                  <p className="text-sm text-gray-600">Se creara una copia como borrador</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estas seguro que deseas duplicar la actividad "<strong>{actividadSeleccionada.nombre}</strong>"?
                La copia quedara en estado Borrador para que puedas revisarla antes de publicarla.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setModalDuplicar(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarDuplicar}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Duplicar Actividad
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de QR */}
      {actividadQR && (
        <GenerarQRModal
          actividad={actividadQR}
          aliado={aliadosMock.find(a => a.nombre === actividadQR.aliado) || { id: '1', nombre: actividadQR.aliado }}
          onClose={() => setActividadQR(null)}
        />
      )}

      {/* Modal de Seleccionar Aliado */}
      <SeleccionarAliadoModal
        isOpen={modalAliadoAbierta}
        onClose={() => setModalAliadoAbierta(false)}
        onSelectAliado={handleSelectAliado}
        aliados={aliadosMock}
      />
    </div>
  );
}

