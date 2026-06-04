import { useState } from 'react';
import {
  Home,
  ChevronRight,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Search,
  Eye,
  MoreVertical,
  ArrowUpDown,
  Plus,
  X,
  AlertCircle,
  Flag,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { UsuarioJovenDetalle } from './UsuarioJovenDetalle';
import { DescargarFiltradoButton } from './DescargarFiltradoButton';

// Tipos de datos
type EstadoType = 'activo' | 'suspendido' | 'en-revision';

type NivelType = 'basico' | 'protagonista' | 'leyenda';

interface UsuarioJoven {
  id: string;
  fechaRegistro: string;
  nombre: string;
  curp: string;
  edad: number;
  municipio: string;
  telefono: string;
  correo: string;
  puntos: number;
  checkIns: number;
  nivel: NivelType;
  estado: EstadoType;
}

export function UsuarioJovenList() {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [filtros, setFiltros] = useState({
    estado: '',
    municipio: '',
    rangoEdad: '',
    fechaInicio: '',
    fechaFin: ''
  });
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<UsuarioJoven | null>(null);

  const [modalSuspenderAbierto, setModalSuspenderAbierto] = useState(false);
  const [usuarioParaSuspender, setUsuarioParaSuspender] = useState<UsuarioJoven | null>(null);
  const [observacionesSuspender, setObservacionesSuspender] = useState('');

  const [modalRevisionAbierto, setModalRevisionAbierto] = useState(false);
  const [usuarioParaRevision, setUsuarioParaRevision] = useState<UsuarioJoven | null>(null);
  const [observacionesRevision, setObservacionesRevision] = useState('');

  const [modalAutorizarAbierto, setModalAutorizarAbierto] = useState(false);
  const [usuarioParaAutorizar, setUsuarioParaAutorizar] = useState<UsuarioJoven | null>(null);
  const [observacionesAutorizar, setObservacionesAutorizar] = useState('');

  const [modalReactivarAbierto, setModalReactivarAbierto] = useState(false);
  const [usuarioParaReactivar, setUsuarioParaReactivar] = useState<UsuarioJoven | null>(null);
  const [observacionesReactivar, setObservacionesReactivar] = useState('');

  // Datos mock de usuarios jóvenes
  const usuarios: UsuarioJoven[] = [
    {
      id: '1',
      fechaRegistro: '15/05/2026',
      nombre: 'María González Hernández',
      curp: 'GOHM020315MTSLRR04',
      edad: 24,
      municipio: 'Victoria',
      telefono: '834-123-4567',
      correo: 'maria.gonzalez@email.com',
      puntos: 1250,
      checkIns: 18,
      nivel: 'protagonista',
      estado: 'activo'
    },
    {
      id: '2',
      fechaRegistro: '14/05/2026',
      nombre: 'Juan Carlos Pérez López',
      curp: 'PELJ030720HTLRPN09',
      edad: 22,
      municipio: 'Tampico',
      telefono: '833-234-5678',
      correo: 'juan.perez@email.com',
      puntos: 0,
      checkIns: 0,
      nivel: 'basico',
      estado: 'suspendido'
    },
    {
      id: '3',
      fechaRegistro: '13/05/2026',
      nombre: 'Ana Sofía Martínez Ruiz',
      curp: 'MARA041205MTLRZN02',
      edad: 21,
      municipio: 'Reynosa',
      telefono: '899-345-6789',
      correo: 'ana.martinez@email.com',
      puntos: 850,
      checkIns: 12,
      nivel: 'basico',
      estado: 'en-revision'
    },
    {
      id: '4',
      fechaRegistro: '12/05/2026',
      nombre: 'Carlos Eduardo Ramírez Sánchez',
      curp: 'RASC990810HTLMNN07',
      edad: 26,
      municipio: 'Matamoros',
      telefono: '868-456-7890',
      correo: 'carlos.ramirez@email.com',
      puntos: 2100,
      checkIns: 25,
      nivel: 'leyenda',
      estado: 'activo'
    },
    {
      id: '5',
      fechaRegistro: '11/05/2026',
      nombre: 'Luisa Fernanda Torres García',
      curp: 'TOGL010925MTLRRS08',
      edad: 24,
      municipio: 'Nuevo Laredo',
      telefono: '867-567-8901',
      correo: 'luisa.torres@email.com',
      puntos: 1680,
      checkIns: 22,
      nivel: 'protagonista',
      estado: 'activo'
    },
    {
      id: '6',
      fechaRegistro: '10/05/2026',
      nombre: 'Roberto Daniel Flores Mendoza',
      curp: 'FOMR000315HTLLNB03',
      edad: 26,
      municipio: 'Victoria',
      telefono: '834-678-9012',
      correo: 'roberto.flores@email.com',
      puntos: 0,
      checkIns: 0,
      nivel: 'basico',
      estado: 'suspendido'
    },
    {
      id: '7',
      fechaRegistro: '09/05/2026',
      nombre: 'Gabriela Monserrat Díaz Castro',
      curp: 'DICG021118MTLZSB06',
      edad: 23,
      municipio: 'Tampico',
      telefono: '833-789-0123',
      correo: 'gabriela.diaz@email.com',
      puntos: 450,
      checkIns: 8,
      nivel: 'basico',
      estado: 'en-revision'
    },
    {
      id: '8',
      fechaRegistro: '08/05/2026',
      nombre: 'Diego Alejandro Morales Herrera',
      curp: 'MOHD030522HTLRRG01',
      edad: 22,
      municipio: 'Reynosa',
      telefono: '899-890-1234',
      correo: 'diego.morales@email.com',
      puntos: 1920,
      checkIns: 27,
      nivel: 'protagonista',
      estado: 'activo'
    },
    {
      id: '9',
      fechaRegistro: '07/05/2026',
      nombre: 'Valeria Stephanie Cruz Ortiz',
      curp: 'COOV041008MTLRRL05',
      edad: 21,
      municipio: 'Matamoros',
      telefono: '868-901-2345',
      correo: 'valeria.cruz@email.com',
      puntos: 320,
      checkIns: 5,
      nivel: 'basico',
      estado: 'suspendido'
    },
    {
      id: '10',
      fechaRegistro: '06/05/2026',
      nombre: 'Fernando Javier Gutiérrez Vázquez',
      curp: 'GUVF990620HTLTRS02',
      edad: 26,
      municipio: 'Victoria',
      telefono: '834-012-3456',
      correo: 'fernando.gutierrez@email.com',
      puntos: 1540,
      checkIns: 20,
      nivel: 'protagonista',
      estado: 'activo'
    }
  ];
  
  const getEstadoTexto = (estado: EstadoType) => {
    const estados = {
      'activo': 'Activo',
      'suspendido': 'Suspendido',
      'en-revision': 'En Revisión'
    };
    return estados[estado];
  };

  const getNivelTexto = (nivel: NivelType) => {
    const niveles = {
      'basico': { icon: '⭐', label: 'Básico' },
      'protagonista': { icon: '🏆', label: 'Protagonista' },
      'leyenda': { icon: '👑', label: 'Leyenda' }
    };
    return niveles[nivel];
  };

  const getEstadoIndicador = (estado: EstadoType) => {
    const estados = {
      'activo': { color: 'bg-green-500', label: 'Activo' },
      'suspendido': { color: 'bg-red-500', label: 'Suspendido' },
      'en-revision': { color: 'bg-blue-500', label: 'En Revisión' }
    };
    return estados[estado];
  };

  const normalizarTexto = (texto: string) =>
    texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');

  const convertirFecha = (fecha: string) => {
    const [dia, mes, anio] = fecha.split('/');
    return `${anio}-${mes}-${dia}`;
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const busquedaNormalizada = busqueda.trim().toLowerCase();
    const coincideBusqueda =
      !busquedaNormalizada ||
      usuario.nombre.toLowerCase().includes(busquedaNormalizada) ||
      usuario.curp.toLowerCase().includes(busquedaNormalizada) ||
      usuario.correo.toLowerCase().includes(busquedaNormalizada);

    const coincideEstado = !filtros.estado || usuario.estado === filtros.estado;
    const coincideMunicipio = !filtros.municipio || normalizarTexto(usuario.municipio) === filtros.municipio;
    const coincideRangoEdad =
      !filtros.rangoEdad ||
      (() => {
        const [edadMinima, edadMaxima] = filtros.rangoEdad.split('-').map(Number);
        return usuario.edad >= edadMinima && usuario.edad <= edadMaxima;
      })();

    const fechaUsuario = convertirFecha(usuario.fechaRegistro);
    const coincideFechaInicio = !filtros.fechaInicio || fechaUsuario >= filtros.fechaInicio;
    const coincideFechaFin = !filtros.fechaFin || fechaUsuario <= filtros.fechaFin;

    return (
      coincideBusqueda &&
      coincideEstado &&
      coincideMunicipio &&
      coincideRangoEdad &&
      coincideFechaInicio &&
      coincideFechaFin
    );
  });
  
  // Si hay un usuario seleccionado, mostrar el detalle
  if (usuarioSeleccionado) {
    return (
      <UsuarioJovenDetalle
        usuario={usuarioSeleccionado}
        onVolver={() => setUsuarioSeleccionado(null)}
      />
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Usuario Joven</span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Listado de Usuarios Jóvenes</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Administra y gestiona los registros de usuarios jóvenes del programa Pasaporte Joven
        </p>
      </div>
      
      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Búsqueda General y Filtros */}
        <div className="px-4 md:px-6 py-4 bg-gray-50 border-b border-gray-200">
          {/* Fila con filtros avanzados y búsqueda */}
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
                {filtrosAbiertos && <DescargarFiltradoButton filename="usuarios-joven-filtrados" />}
              </div>
            </div>

            {/* Búsqueda General */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, CURP o correo..."
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4">
                  {/* Estado */}
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Estado
                    </label>
                    <select
                      value={filtros.estado}
                      onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="">Todos</option>
                      <option value="activo">Activo</option>
                      <option value="suspendido">Suspendido</option>
                      <option value="en-revision">En Revisión</option>
                    </select>
                  </div>

                  {/* Municipio */}
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Municipio
                    </label>
                    <select
                      value={filtros.municipio}
                      onChange={(e) => setFiltros({ ...filtros, municipio: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="">Todos</option>
                      <option value="victoria">Victoria</option>
                      <option value="tampico">Tampico</option>
                      <option value="reynosa">Reynosa</option>
                      <option value="matamoros">Matamoros</option>
                      <option value="nuevo-laredo">Nuevo Laredo</option>
                    </select>
                  </div>

                  {/* Rango de Edad */}
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Rango de Edad
                    </label>
                    <select
                      value={filtros.rangoEdad}
                      onChange={(e) => setFiltros({ ...filtros, rangoEdad: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="">Todos</option>
                      <option value="18-21">18-21 años</option>
                      <option value="22-25">22-25 años</option>
                      <option value="26-29">26-29 años</option>
                    </select>
                  </div>
                </div>

                {/* Rango de Fechas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <div className="md:col-span-3 lg:col-span-1">
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Rango de Fechas
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="date"
                        value={filtros.fechaInicio}
                        onChange={(e) => setFiltros({ ...filtros, fechaInicio: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                      />
                      <span className="text-gray-500 text-center sm:text-left">—</span>
                      <input
                        type="date"
                        value={filtros.fechaFin}
                        onChange={(e) => setFiltros({ ...filtros, fechaFin: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3 lg:col-span-2 flex items-end">
                    <button
                      onClick={() => setFiltros({ estado: '', municipio: '', rangoEdad: '', fechaInicio: '', fechaFin: '' })}
                      className="text-[#922735] text-xs font-semibold underline hover:text-[#7a1f2d] transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  </div>
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
                    Fecha de Registro
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Nombre / CURP
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Edad
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Municipio
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Teléfono
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Correo Electrónico
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Puntos
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Nivel
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Estado
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
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
              {usuariosFiltrados.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="bg-white hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {usuario.fechaRegistro}
                  </td>
                  <td className="px-3 py-3.5 text-sm">
                    <div>
                      <div className="text-gray-900 font-medium">{usuario.nombre}</div>
                      <div className="text-gray-500 text-xs font-mono mt-0.5">{usuario.curp}</div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {usuario.edad} años
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {usuario.municipio}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {usuario.telefono}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {usuario.correo}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-900 font-semibold">
                    {usuario.puntos.toLocaleString()}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <span>{getNivelTexto(usuario.nivel).icon}</span>
                      <span>{getNivelTexto(usuario.nivel).label}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {getEstadoTexto(usuario.estado)}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="relative">
                      <button
                        onClick={() => setMenuAbierto(menuAbierto === usuario.id ? null : usuario.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {menuAbierto === usuario.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setMenuAbierto(null)}
                          />
                          <div className="absolute right-0 top-8 z-20 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                            {/* Ver Detalle - disponible para todos */}
                            <button
                              onClick={() => {
                                setUsuarioSeleccionado(usuario);
                                setMenuAbierto(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4 text-[#922735]" />
                              Ver Detalle
                            </button>

                            {/* Acciones para estado ACTIVO */}
                            {usuario.estado === 'activo' && (
                              <>
                                <button
                                  onClick={() => {
                                    setUsuarioParaSuspender(usuario);
                                    setModalSuspenderAbierto(true);
                                    setMenuAbierto(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <AlertCircle className="w-4 h-4 text-[#922735]" />
                                  Suspender
                                </button>
                                <button
                                  onClick={() => {
                                    setUsuarioParaRevision(usuario);
                                    setModalRevisionAbierto(true);
                                    setMenuAbierto(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <Flag className="w-4 h-4 text-[#922735]" />
                                  Marcar para revisión
                                </button>
                              </>
                            )}

                            {/* Acciones para estado SUSPENDIDO */}
                            {usuario.estado === 'suspendido' && (
                              <button
                                onClick={() => {
                                  setUsuarioParaReactivar(usuario);
                                  setModalReactivarAbierto(true);
                                  setMenuAbierto(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                              >
                                <RotateCcw className="w-4 h-4 text-[#922735]" />
                                Reactivar usuario
                              </button>
                            )}

                            {/* Acciones para estado EN REVISIÓN */}
                            {usuario.estado === 'en-revision' && (
                              <>
                                <button
                                  onClick={() => {
                                    setUsuarioParaSuspender(usuario);
                                    setModalSuspenderAbierto(true);
                                    setMenuAbierto(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <AlertCircle className="w-4 h-4 text-[#922735]" />
                                  Suspender cuenta
                                </button>
                                <button
                                  onClick={() => {
                                    setUsuarioParaAutorizar(usuario);
                                    setModalAutorizarAbierto(true);
                                    setMenuAbierto(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-[#922735]" />
                                  Autorizar cuenta
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {usuariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-sm text-gray-500">
                    No se encontraron usuarios con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            Mostrando {usuariosFiltrados.length > 0 ? 1 : 0} a {usuariosFiltrados.length} de {usuariosFiltrados.length} entradas
          </p>
          <div className="flex items-center gap-2">
            <button className="px-2 md:px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="hidden sm:inline">« Anterior</span>
              <span className="sm:hidden">«</span>
            </button>
            <button className="px-3 py-1.5 bg-[#922735] text-white rounded text-xs font-medium">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-2 md:px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="hidden sm:inline">Siguiente »</span>
              <span className="sm:hidden">»</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal para suspender cuenta */}
      {modalSuspenderAbierto && usuarioParaSuspender && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">Suspender cuenta</h2>
                <button
                  onClick={() => {
                    setModalSuspenderAbierto(false);
                    setUsuarioParaSuspender(null);
                    setObservacionesSuspender('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <h3 className="text-base font-semibold text-[#922735]">{usuarioParaSuspender.nombre}</h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Observaciones *
                  </label>
                  <textarea
                    value={observacionesSuspender}
                    onChange={(e) => setObservacionesSuspender(e.target.value)}
                    placeholder="Describe el motivo de la suspensión..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setModalSuspenderAbierto(false);
                      setUsuarioParaSuspender(null);
                      setObservacionesSuspender('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (observacionesSuspender.trim()) {
                        // Aquí iría la lógica para suspender la cuenta
                        alert(`Cuenta suspendida: ${usuarioParaSuspender.nombre}\nMotivo: ${observacionesSuspender}`);
                        setObservacionesSuspender('');
                        setModalSuspenderAbierto(false);
                        setUsuarioParaSuspender(null);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#922735] text-white rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Suspender cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para marcar para revisión */}
      {modalRevisionAbierto && usuarioParaRevision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">Marcar para revisión</h2>
                <button
                  onClick={() => {
                    setModalRevisionAbierto(false);
                    setUsuarioParaRevision(null);
                    setObservacionesRevision('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <h3 className="text-base font-semibold text-[#922735]">{usuarioParaRevision.nombre}</h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Observaciones *
                  </label>
                  <textarea
                    value={observacionesRevision}
                    onChange={(e) => setObservacionesRevision(e.target.value)}
                    placeholder="Describe qué debe revisarse..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setModalRevisionAbierto(false);
                      setUsuarioParaRevision(null);
                      setObservacionesRevision('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (observacionesRevision.trim()) {
                        // Aquí iría la lógica para marcar para revisión
                        alert(`Usuario marcado para revisión: ${usuarioParaRevision.nombre}\nMotivo: ${observacionesRevision}`);
                        setObservacionesRevision('');
                        setModalRevisionAbierto(false);
                        setUsuarioParaRevision(null);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#C9A961] text-white rounded-lg text-sm font-medium hover:bg-[#b89850] transition-colors"
                  >
                    <Flag className="w-4 h-4" />
                    Marcar para revisión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para autorizar cuenta */}
      {modalAutorizarAbierto && usuarioParaAutorizar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">Autorizar cuenta</h2>
                <button
                  onClick={() => {
                    setModalAutorizarAbierto(false);
                    setUsuarioParaAutorizar(null);
                    setObservacionesAutorizar('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <h3 className="text-base font-semibold text-[#922735]">{usuarioParaAutorizar.nombre}</h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Observaciones (opcional)
                  </label>
                  <textarea
                    value={observacionesAutorizar}
                    onChange={(e) => setObservacionesAutorizar(e.target.value)}
                    placeholder="Agrega un comentario sobre la autorización..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setModalAutorizarAbierto(false);
                      setUsuarioParaAutorizar(null);
                      setObservacionesAutorizar('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      // Aquí iría la lógica para autorizar la cuenta
                      alert(`Cuenta autorizada: ${usuarioParaAutorizar.nombre}${observacionesAutorizar ? `\nComentario: ${observacionesAutorizar}` : ''}`);
                      setObservacionesAutorizar('');
                      setModalAutorizarAbierto(false);
                      setUsuarioParaAutorizar(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Autorizar cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para reactivar usuario */}
      {modalReactivarAbierto && usuarioParaReactivar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">Reactivar usuario</h2>
                <button
                  onClick={() => {
                    setModalReactivarAbierto(false);
                    setUsuarioParaReactivar(null);
                    setObservacionesReactivar('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <h3 className="text-base font-semibold text-[#922735]">{usuarioParaReactivar.nombre}</h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Observaciones (opcional)
                  </label>
                  <textarea
                    value={observacionesReactivar}
                    onChange={(e) => setObservacionesReactivar(e.target.value)}
                    placeholder="Agrega un comentario sobre la reactivación..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setModalReactivarAbierto(false);
                      setUsuarioParaReactivar(null);
                      setObservacionesReactivar('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      // Aquí iría la lógica para reactivar el usuario
                      alert(`Usuario reactivado: ${usuarioParaReactivar.nombre}${observacionesReactivar ? `\nComentario: ${observacionesReactivar}` : ''}`);
                      setObservacionesReactivar('');
                      setModalReactivarAbierto(false);
                      setUsuarioParaReactivar(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reactivar usuario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

