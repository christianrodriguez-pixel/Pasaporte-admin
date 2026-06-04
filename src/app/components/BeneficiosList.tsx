import { useState } from 'react';
import {
  Home,
  ChevronRight,
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Search,
  MoreVertical,
  ArrowUpDown,
  Plus,
  Pencil,
  Eye,
  PauseCircle,
  XCircle,
  PlayCircle,
  Send,
  Trash2,
  Archive,
  RotateCcw,
  Users,
  Mail,
  Download
} from 'lucide-react';
import { SeleccionarAliadoModal } from './SeleccionarAliadoModal';
import { NuevoBeneficioAliado } from './NuevoBeneficioAliado';
import { DescargarFiltradoButton } from './DescargarFiltradoButton';

interface Beneficio {
  id: string;
  nombre: string;
  aliado: string;
  tipoBeneficio: string;
  clasificaciong;
  categoria: string;
      clasificacion: 'Cultura',
  vigenciaInicio: string;
  vigenciaFin: string;
  nivel: string;
  puntosRequeridos: number;
  estado: 'Borrador' | 'Registrado' | 'Publicado' | 'Pausado' | 'Cancelado' | 'Archivado';
}

export function BeneficiosList() {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [vistaActual, setVistaActual] = useState<'lista' | 'nueva' | 'editar' | 'detalle' | 'usuarios'>('lista');
  const [aliadoSeleccionado, setAliadoSeleccionado] = useState<any>(null);
  const [beneficioSeleccionado, setBeneficioSeleccionado] = useState<Beneficio | null>(null);

  // Estados de modales
  const [modalAliadoAbierta, setModalAliadoAbierta] = useState(false);
  const [modalPublicar, setModalPublicar] = useState(false);
  const [modalPausar, setModalPausar] = useState(false);
  const [modalReactivar, setModalReactivar] = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [modalArchivar, setModalArchivar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalRestaurar, setModalRestaurar] = useState(false);

  const beneficios: Beneficio[] = [
    {
      id: '1',
      nombre: '20% de descuento en entradas',
      aliado: 'Cinépolis Tampico',
      tipoBeneficio: 'Descuento',
      categoria: 'Entretenimiento',
      clasificacion: 'Cultura',
      vigenciaInicio: '01/01/2026',
      vigenciaFin: '31/12/2026',
      nivel: 'Todos los niveles',
      puntosRequeridos: 0,
      estado: 'Publicado'
    },
    {
      id: '2',
      nombre: 'Café gratis en compras mayores a $200',
      aliado: 'Café Nómada',
      tipoBeneficio: 'Promoción',
      categoria: 'Gastronomía',
      clasificacion: 'Cultura',
      vigenciaInicio: '15/05/2026',
      vigenciaFin: '31/12/2026',
      nivel: 'Básico',
      puntosRequeridos: 50,
      estado: 'Borrador'
    },
    {
      id: '3',
      nombre: 'Entrada gratuita los martes',
      aliado: 'Casa de la Cultura Victoria',
      tipoBeneficio: 'Beneficio',
      categoria: 'Cultura',
      clasificacion: 'Cultura',
      vigenciaInicio: '01/06/2026',
      vigenciaFin: '30/11/2026',
      nivel: 'Todos los niveles',
      puntosRequeridos: 0,
      estado: 'Pausado'
    },
    {
      id: '4',
      nombre: '30% de descuento en mensualidad',
      aliado: 'Gimnasio Norte',
      tipoBeneficio: 'Descuento',
      categoria: 'Deportes',
      clasificacion: 'Deportes',
      vigenciaInicio: '01/03/2026',
      vigenciaFin: '31/05/2026',
      nivel: 'Protagonista',
      puntosRequeridos: 200,
      estado: 'Cancelado'
    },
    {
      id: '5',
      nombre: '2x1 en libros seleccionados',
      aliado: 'Librería Universitaria',
      tipoBeneficio: 'Promoción',
      categoria: 'Educación',
      clasificacion: 'Educacion',
      vigenciaInicio: '01/01/2026',
      vigenciaFin: '30/04/2026',
      nivel: 'Todos los niveles',
      puntosRequeridos: 100,
      estado: 'Registrado'
    },
    {
      id: '6',
      nombre: 'Descuento en cursos de programación',
      aliado: 'Tech Hub Tamaulipas',
      tipoBeneficio: 'Descuento',
      categoria: 'Educación',
      clasificacion: 'Educacion',
      vigenciaInicio: '01/01/2025',
      vigenciaFin: '31/12/2025',
      nivel: 'Todos los niveles',
      puntosRequeridos: 150,
      estado: 'Archivado'
    },
    {
      id: '7',
      nombre: '15% de descuento en consulta',
      aliado: 'Clínica Dental Sonrisa',
      tipoBeneficio: 'Descuento',
      categoria: 'Salud',
      clasificacion: 'Salud',
      vigenciaInicio: '01/02/2026',
      vigenciaFin: '31/08/2026',
      nivel: 'Protagonista',
      puntosRequeridos: 250,
      estado: 'Publicado'
    },
    {
      id: '8',
      nombre: 'Taller de fotografía gratis',
      aliado: 'Escuela de Artes Visuales',
      tipoBeneficio: 'Beneficio',
      categoria: 'Cultura',
      clasificacion: 'Cultura',
      vigenciaInicio: '01/06/2026',
      vigenciaFin: '30/06/2026',
      nivel: 'Todos los niveles',
      puntosRequeridos: 0,
      estado: 'Registrado'
    },
    {
      id: '9',
      nombre: 'Acceso VIP a conciertos',
      aliado: 'Teatro Metropolitan',
      tipoBeneficio: 'Beneficio',
      categoria: 'Entretenimiento',
      clasificacion: 'Cultura',
      vigenciaInicio: '01/01/2026',
      vigenciaFin: '31/03/2026',
      nivel: 'Leyenda',
      puntosRequeridos: 500,
      estado: 'Publicado'
    },
    {
      id: '10',
      nombre: 'Descuento en ropa deportiva',
      aliado: 'Deportes Total',
      tipoBeneficio: 'Descuento',
      categoria: 'Deportes',
      clasificacion: 'Deportes',
      vigenciaInicio: '01/04/2026',
      vigenciaFin: '30/09/2026',
      nivel: 'Básico',
      puntosRequeridos: 75,
      estado: 'Borrador'
    },
    {
      id: '11',
      nombre: 'Clase de yoga gratuita',
      aliado: 'Centro Holístico Zen',
      tipoBeneficio: 'Beneficio',
      categoria: 'Salud',
      clasificacion: 'Salud',
      vigenciaInicio: '01/03/2026',
      vigenciaFin: '31/05/2026',
      nivel: 'Todos los niveles',
      puntosRequeridos: 0,
      estado: 'Pausado'
    },
    {
      id: '12',
      nombre: 'Boletos de cine 2x1',
      aliado: 'Cinemark Ciudad Victoria',
      tipoBeneficio: 'Promoción',
      categoria: 'Entretenimiento',
      clasificacion: 'Cultura',
      vigenciaInicio: '01/01/2025',
      vigenciaFin: '30/06/2025',
      nivel: 'Todos los niveles',
      puntosRequeridos: 120,
      estado: 'Archivado'
    }
  ];

  const aliadosMock = [
    { id: '1', nombre: 'Cinépolis Tampico', tipo: 'Empresa Privada', categoria: 'Entretenimiento' },
    { id: '2', nombre: 'Café Nómada', tipo: 'Comercio Local', categoria: 'Comercio' },
    { id: '3', nombre: 'Casa de la Cultura Victoria', tipo: 'Centro Cultural', categoria: 'Cultura' },
    { id: '4', nombre: 'Gimnasio Norte', tipo: 'Centro Deportivo', categoria: 'Deportes' },
    { id: '5', nombre: 'Librería Universitaria', tipo: 'Comercio Local', categoria: 'Educación' },
    { id: '6', nombre: 'Tech Hub Tamaulipas', tipo: 'Institución Educativa', categoria: 'Tecnología' }
  ];

  const usuariosBeneficiados = [
    { id: '1', nombre: 'Maria Gonzalez Hernandez', municipio: 'Victoria', telefono: '834-123-4567', correo: 'maria.gonzalez@email.com', nivel: 'Protagonista', estado: 'Activo', fechaCanje: '15/05/2026', puntosCanjeados: 120 },
    { id: '2', nombre: 'Carlos Eduardo Ramirez Sanchez', municipio: 'Matamoros', telefono: '868-456-7890', correo: 'carlos.ramirez@email.com', nivel: 'Leyenda', estado: 'Activo', fechaCanje: '18/05/2026', puntosCanjeados: 120 },
    { id: '3', nombre: 'Luisa Fernanda Torres Garcia', municipio: 'Nuevo Laredo', telefono: '867-567-8901', correo: 'luisa.torres@email.com', nivel: 'Protagonista', estado: 'Activo', fechaCanje: '20/05/2026', puntosCanjeados: 120 },
    { id: '4', nombre: 'Diego Alejandro Morales Herrera', municipio: 'Reynosa', telefono: '899-890-1234', correo: 'diego.morales@email.com', nivel: 'Basico', estado: 'Activo', fechaCanje: '22/05/2026', puntosCanjeados: 120 }
  ];

  const handleNuevoBeneficio = () => {
    setModalAliadoAbierta(true);
  };

  const handleSelectAliado = (aliado: any) => {
    setAliadoSeleccionado(aliado);
    setVistaActual('nueva');
  };

  const handleVolverLista = () => {
    setVistaActual('lista');
    setAliadoSeleccionado(null);
  };

  const getBadgeColor = (estado: Beneficio['estado']) => {
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

  const handleVerDetalle = (beneficio: Beneficio) => {
    setBeneficioSeleccionado(beneficio);
    setVistaActual('detalle');
  };

  const handleVerUsuarios = (beneficio: Beneficio) => {
    setBeneficioSeleccionado(beneficio);
    setVistaActual('usuarios');
  };

  const handleEditar = (beneficio: Beneficio) => {
    setBeneficioSeleccionado(beneficio);
    setVistaActual('editar');
  };

  // Handlers para abrir modales
  const handlePublicar = (beneficio: Beneficio) => {
    setBeneficioSeleccionado(beneficio);
    setModalPublicar(true);
  };

  const handlePausar = (beneficio: Beneficio) => {
    setBeneficioSeleccionado(beneficio);
    setModalPausar(true);
  };

  const handleReactivar = (beneficio: Beneficio) => {
    setBeneficioSeleccionado(beneficio);
    setModalReactivar(true);
  };

  const handleCancelar = (beneficio: Beneficio) => {
    setBeneficioSeleccionado(beneficio);
    setModalCancelar(true);
  };

  const handleArchivar = (beneficio: Beneficio) => {
    setBeneficioSeleccionado(beneficio);
    setModalArchivar(true);
  };

  const handleEliminar = (beneficio: Beneficio) => {
    setBeneficioSeleccionado(beneficio);
    setModalEliminar(true);
  };

  const handleRestaurar = (beneficio: Beneficio) => {
    setBeneficioSeleccionado(beneficio);
    setModalRestaurar(true);
  };

  // Funciones de confirmación
  const confirmarPublicar = () => {
    console.log('Publicando beneficio:', beneficioSeleccionado);
    setModalPublicar(false);
    setBeneficioSeleccionado(null);
  };

  const confirmarPausar = () => {
    console.log('Pausando beneficio:', beneficioSeleccionado);
    setModalPausar(false);
    setBeneficioSeleccionado(null);
  };

  const confirmarReactivar = () => {
    console.log('Reactivando beneficio:', beneficioSeleccionado);
    setModalReactivar(false);
    setBeneficioSeleccionado(null);
  };

  const confirmarCancelar = () => {
    console.log('Cancelando beneficio:', beneficioSeleccionado);
    setModalCancelar(false);
    setBeneficioSeleccionado(null);
  };

  const confirmarArchivar = () => {
    console.log('Archivando beneficio:', beneficioSeleccionado);
    setModalArchivar(false);
    setBeneficioSeleccionado(null);
  };

  const confirmarEliminar = () => {
    console.log('Eliminando beneficio:', beneficioSeleccionado);
    setModalEliminar(false);
    setBeneficioSeleccionado(null);
  };

  const confirmarRestaurar = () => {
    console.log('Restaurando beneficio:', beneficioSeleccionado);
    setModalRestaurar(false);
    setBeneficioSeleccionado(null);
  };

  // Función auxiliar para verificar si la vigencia ha caducado
  const vigenciaHaCaducado = (beneficio: Beneficio): boolean => {
    const hoy = new Date();
    const partesFecha = beneficio.vigenciaFin.split('/');
    const fechaFin = new Date(
      parseInt(partesFecha[2]),
      parseInt(partesFecha[1]) - 1,
      parseInt(partesFecha[0])
    );
    return hoy > fechaFin;
  };

  const getAccionesPorEstado = (beneficio: Beneficio) => {
    const acciones = [];

    // Ver detalle siempre está disponible
    acciones.push({
      icono: Eye,
      label: 'Ver detalles',
      color: 'text-[#922735]',
      onClick: () => {
        setMenuAbierto(null);
        handleVerDetalle(beneficio);
      }
    });
    acciones.push({
      icono: Users,
      label: 'Ver usuarios',
      color: 'text-[#922735]',
      onClick: () => {
        setMenuAbierto(null);
        handleVerUsuarios(beneficio);
      }
    });

    switch (beneficio.estado) {
      case 'Borrador':
        acciones.push({
          icono: Pencil,
          label: 'Editar',
          color: 'text-[#922735]',
          onClick: () => {
            setMenuAbierto(null);
            handleEditar(beneficio);
          }
        });
        acciones.push({
          icono: Trash2,
          label: 'Eliminar',
          color: 'text-red-600',
          onClick: () => {
            setMenuAbierto(null);
            handleEliminar(beneficio);
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
            handleEditar(beneficio);
          }
        });
        acciones.push({
          icono: Send,
          label: 'Publicar',
          color: 'text-green-600',
          onClick: () => {
            setMenuAbierto(null);
            handlePublicar(beneficio);
          }
        });
        acciones.push({
          icono: XCircle,
          label: 'Cancelar',
          color: 'text-red-600',
          onClick: () => {
            setMenuAbierto(null);
            handleCancelar(beneficio);
          }
        });
        break;

      case 'Publicado':
        acciones.push({
          icono: PauseCircle,
          label: 'Pausar',
          color: 'text-yellow-600',
          onClick: () => {
            setMenuAbierto(null);
            handlePausar(beneficio);
          }
        });
        acciones.push({
          icono: XCircle,
          label: 'Cancelar',
          color: 'text-red-600',
          onClick: () => {
            setMenuAbierto(null);
            handleCancelar(beneficio);
          }
        });
        // Solo se puede archivar si la vigencia ha caducado
        if (vigenciaHaCaducado(beneficio)) {
          acciones.push({
            icono: Archive,
            label: 'Archivar',
            color: 'text-purple-600',
            onClick: () => {
              setMenuAbierto(null);
              handleArchivar(beneficio);
            }
          });
        }
        break;

      case 'Pausado':
        acciones.push({
          icono: PlayCircle,
          label: 'Reactivar',
          color: 'text-green-600',
          onClick: () => {
            setMenuAbierto(null);
            handleReactivar(beneficio);
          }
        });
        acciones.push({
          icono: XCircle,
          label: 'Cancelar',
          color: 'text-red-600',
          onClick: () => {
            setMenuAbierto(null);
            handleCancelar(beneficio);
          }
        });
        break;

      case 'Cancelado':
        // Solo se puede archivar si estaba publicado y la vigencia caducó
        // Para simplificar, permitimos archivar cualquier cancelado
        break;

      case 'Archivado':
        acciones.push({
          icono: RotateCcw,
          label: 'Restaurar',
          color: 'text-blue-600',
          onClick: () => {
            setMenuAbierto(null);
            handleRestaurar(beneficio);
          }
        });
        break;
    }

    return acciones;
  };

  // Si está en vista de nuevo beneficio, mostrar el formulario
  if (vistaActual === 'nueva' && aliadoSeleccionado) {
    return <NuevoBeneficioAliado onVolver={handleVolverLista} aliado={aliadoSeleccionado} />;
  }

  // Si está en vista de editar beneficio
  if (vistaActual === 'editar' && beneficioSeleccionado) {
    return <NuevoBeneficioAliado onVolver={handleVolverLista} aliado={{ nombre: beneficioSeleccionado.aliado }} beneficio={beneficioSeleccionado} />;
  }

  // Si está en vista de detalle
  if (vistaActual === 'detalle' && beneficioSeleccionado) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs md:text-sm mb-4">
          <Home className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600 hidden sm:inline">Inicio</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button onClick={handleVolverLista} className="text-gray-600 hover:text-gray-900">
            Beneficios Disponibles
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-semibold">Detalle del Beneficio</span>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between" style={{ backgroundColor: '#FAF7F0' }}>
            <div className="flex-1">
              <h2 className="text-base font-bold text-gray-900 mb-1">{beneficioSeleccionado.nombre}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(beneficioSeleccionado.estado)}`}>
                {beneficioSeleccionado.estado}
              </span>
            </div>
          </div>

          {/* Detalles compactos */}
          <div className="px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              <div className="flex items-start gap-2">
                <label className="text-xs font-semibold text-gray-500 w-28 flex-shrink-0 pt-0.5">Aliado:</label>
                <p className="text-sm text-gray-900 flex-1">{beneficioSeleccionado.aliado}</p>
              </div>
              <div className="flex items-start gap-2">
                <label className="text-xs font-semibold text-gray-500 w-28 flex-shrink-0 pt-0.5">Tipo:</label>
                <p className="text-sm text-gray-900 flex-1">{beneficioSeleccionado.tipoBeneficio}</p>
              </div>
              <div className="flex items-start gap-2">
                <label className="text-xs font-semibold text-gray-500 w-28 flex-shrink-0 pt-0.5">clasificacion:</label>
                <p className="text-sm text-gray-900 flex-1">{beneficioSeleccionado.clasificacion}</p>
              </div>
              <div className="flex items-start gap-2">
                <label className="text-xs font-semibold text-gray-500 w-28 flex-shrink-0 pt-0.5">Categoría:</label>
                <p className="text-sm text-gray-900 flex-1">{beneficioSeleccionado.categoria}</p>
              </div>
              <div className="flex items-start gap-2">
                <label className="text-xs font-semibold text-gray-500 w-28 flex-shrink-0 pt-0.5">Nivel:</label>
                <p className="text-sm text-gray-900 flex-1">{beneficioSeleccionado.nivel}</p>
              </div>
              <div className="flex items-start gap-2">
                <label className="text-xs font-semibold text-gray-500 w-28 flex-shrink-0 pt-0.5">Puntos:</label>
                <p className="text-sm text-gray-900 flex-1 font-semibold">
                  {beneficioSeleccionado.puntosRequeridos === 0 ? '0 -' : `${beneficioSeleccionado.puntosRequeridos} puntos`}
                </p>
              </div>
              <div className="flex items-start gap-2 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 w-28 flex-shrink-0 pt-0.5">Vigencia:</label>
                <p className="text-sm text-gray-900 flex-1">{beneficioSeleccionado.vigenciaInicio} - {beneficioSeleccionado.vigenciaFin}</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="px-4 py-3 border-t border-gray-200 flex gap-3">
            <button
              onClick={handleVolverLista}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Volver
            </button>
            {(beneficioSeleccionado.estado === 'Borrador' || beneficioSeleccionado.estado === 'Registrado') && (
              <button
                onClick={() => handleEditar(beneficioSeleccionado)}
                className="px-4 py-2 bg-[#922735] text-white rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (vistaActual === 'usuarios' && beneficioSeleccionado) {
    const totalUsuarios = usuariosBeneficiados.length;
    const totalPuntosCanjeados = usuariosBeneficiados.reduce(
      (total, usuario) => total + usuario.puntosCanjeados,
      0
    );
    const puntosPorCanje = beneficioSeleccionado.puntosRequeridos;

    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-2 text-xs md:text-sm mb-4">
          <Home className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600 hidden sm:inline">Inicio</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button onClick={handleVolverLista} className="text-gray-600 hover:text-gray-900">
            Beneficios Disponibles
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-semibold">Usuarios beneficiados</span>
        </div>

        <button
          onClick={handleVolverLista}
          className="mb-4 flex items-center gap-2 text-[#922735] hover:text-[#7a1f2d] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Volver a beneficios</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 md:px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#FAF7F0' }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-gray-900 font-bold text-base md:text-lg">{beneficioSeleccionado.nombre}</h1>
              <span className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(beneficioSeleccionado.estado)}`}>
                {beneficioSeleccionado.estado}
              </span>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <h2 className="text-[#922735] font-semibold text-sm mb-4">Informacion del beneficio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
              <div className="grid grid-cols-[130px_1fr] gap-3">
                <span className="text-gray-600 font-semibold">Aliado:</span>
                <span className="text-gray-900">{beneficioSeleccionado.aliado}</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-3">
                <span className="text-gray-600 font-semibold">Tipo:</span>
                <span className="text-gray-900">{beneficioSeleccionado.tipoBeneficio}</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-3">
                <span className="text-gray-600 font-semibold">Categoria:</span>
                <span className="text-gray-900">{beneficioSeleccionado.categoria}</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-3">
                <span className="text-gray-600 font-semibold">Nivel:</span>
                <span className="text-gray-900">{beneficioSeleccionado.nivel}</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-3">
                <span className="text-gray-600 font-semibold">Puntos por canje:</span>
                <span className="text-gray-900 font-semibold">{puntosPorCanje} pts</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-3">
                <span className="text-gray-600 font-semibold">Vigencia:</span>
                <span className="text-gray-900">{beneficioSeleccionado.vigenciaInicio} - {beneficioSeleccionado.vigenciaFin}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-600 mb-2">Usuarios beneficiados</p>
            <p className="text-2xl font-bold text-gray-900">{totalUsuarios}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-600 mb-2">Puntos canjeados</p>
            <p className="text-2xl font-bold text-gray-900">{totalPuntosCanjeados}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-600 mb-2">Promedio por usuario</p>
            <p className="text-2xl font-bold text-gray-900">
              {totalUsuarios > 0 ? Math.round(totalPuntosCanjeados / totalUsuarios) : 0}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ backgroundColor: '#FAF7F0' }}>
            <div>
              <h2 className="text-[#922735] font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4" />
                Lista de usuarios beneficiados
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Usuarios que realizaron canje de puntos o uso del beneficio.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition-colors">
              <Download className="w-4 h-4" />
              Exportar lista
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#C9A961] to-[#D4B871]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Municipio</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Telefono</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Correo electronico</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Nivel</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Fecha de canje</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Puntos</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usuariosBeneficiados.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{usuario.nombre}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{usuario.municipio}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{usuario.telefono}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-500" />
                        {usuario.correo}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{usuario.nivel}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{usuario.fechaCanje}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{usuario.puntosCanjeados}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{usuario.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {usuariosBeneficiados.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No hay usuarios beneficiados registrados.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Beneficios Disponibles</span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Beneficios Disponibles</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Administra todos los beneficios y descuentos ofrecidos por los aliados
        </p>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Botón nuevo beneficio */}
        <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-200 flex justify-end">
          <button
            onClick={handleNuevoBeneficio}
            className="bg-[#922735] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Beneficio</span>
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
                {filtrosAbiertos && <DescargarFiltradoButton filename="beneficios-filtrados" />}
              </div>
            </div>

            {/* Búsqueda General */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar beneficios..."
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
                      Tipo de Beneficio
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white">
                      <option value="">Todos</option>
                      <option value="promocion">Promoción</option>
                      <option value="descuento">Descuento</option>
                      <option value="beneficio">Beneficio</option>
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
                      Nivel
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white">
                      <option value="">Todos</option>
                      <option value="todos">Todos los niveles</option>
                      <option value="basico">Básico</option>
                      <option value="protagonista">Protagonista</option>
                      <option value="embajador">Embajador</option>
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
                    <span>Beneficio</span>
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
                    <span>Vigencia</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    <span>Nivel</span>
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
              {beneficios.map((beneficio) => (
                <tr key={beneficio.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3.5 text-sm text-gray-900 font-medium">
                    {beneficio.nombre}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {beneficio.aliado}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {beneficio.tipoBeneficio}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {beneficio.clasificacion}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {beneficio.categoria}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {beneficio.vigenciaInicio} - {beneficio.vigenciaFin}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {beneficio.nivel}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700 font-semibold">
                    -{beneficio.puntosRequeridos} pts
                  </td>
                  <td className="px-3 py-3.5 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getBadgeColor(beneficio.estado)}`}>
                      {beneficio.estado}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-sm">
                    <div className="relative flex justify-center">
                      <button
                        onClick={() => setMenuAbierto(menuAbierto === beneficio.id ? null : beneficio.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {menuAbierto === beneficio.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setMenuAbierto(null)}
                          />
                          <div className="absolute right-0 top-8 z-20 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                            {getAccionesPorEstado(beneficio).map((accion, index) => {
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
            Mostrando 1 a {beneficios.length} de {beneficios.length} entradas
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

      {/* Modal de Seleccionar Aliado */}
      <SeleccionarAliadoModal
        isOpen={modalAliadoAbierta}
        onClose={() => setModalAliadoAbierta(false)}
        onSelectAliado={handleSelectAliado}
        aliados={aliadosMock}
      />

      {/* Modal de Publicar */}
      {modalPublicar && beneficioSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Publicar Beneficio</h3>
                  <p className="text-sm text-gray-600">El beneficio estará visible para los usuarios</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas publicar el beneficio "<strong>{beneficioSeleccionado.nombre}</strong>"?
                Los usuarios podrán ver y acceder a este beneficio inmediatamente.
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
                  Publicar Beneficio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Pausar */}
      {modalPausar && beneficioSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <PauseCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Pausar Beneficio</h3>
                  <p className="text-sm text-gray-600">Esta acción pausará temporalmente el beneficio</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas pausar el beneficio "<strong>{beneficioSeleccionado.nombre}</strong>"?
                Los usuarios no podrán acceder a este beneficio hasta que sea reactivado.
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
                  Pausar Beneficio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reactivar */}
      {modalReactivar && beneficioSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Reactivar Beneficio</h3>
                  <p className="text-sm text-gray-600">El beneficio volverá a estar disponible</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas reactivar el beneficio "<strong>{beneficioSeleccionado.nombre}</strong>"?
                Los usuarios podrán acceder nuevamente a este beneficio.
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
                  Reactivar Beneficio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cancelar */}
      {modalCancelar && beneficioSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Cancelar Beneficio</h3>
                  <p className="text-sm text-gray-600">Esta acción es permanente</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas cancelar el beneficio "<strong>{beneficioSeleccionado.nombre}</strong>"?
                Esta acción no se puede deshacer y el beneficio quedará cancelado permanentemente.
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
      {modalArchivar && beneficioSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Archive className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Archivar Beneficio</h3>
                  <p className="text-sm text-gray-600">El beneficio se moverá al archivo</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas archivar el beneficio "<strong>{beneficioSeleccionado.nombre}</strong>"?
                El beneficio dejará de estar visible pero podrás restaurarlo más tarde si es necesario.
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
                  Archivar Beneficio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Eliminar */}
      {modalEliminar && beneficioSeleccionado && (
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
                ¿Estás seguro que deseas eliminar el borrador "<strong>{beneficioSeleccionado.nombre}</strong>"?
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
      {modalRestaurar && beneficioSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Restaurar Beneficio</h3>
                  <p className="text-sm text-gray-600">El beneficio volverá como borrador</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ¿Estás seguro que deseas restaurar el beneficio "<strong>{beneficioSeleccionado.nombre}</strong>"?
                El beneficio volverá al estado de borrador y podrás editarlo antes de publicarlo nuevamente.
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
                  Restaurar Beneficio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

