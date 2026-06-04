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
  Eye,
  Plus,
  AlertCircle,
  Pencil,
  Star,
  Gift,
  CheckCircle,
  XCircle,
  Ban,
  X
} from 'lucide-react';
import { NuevoAliado } from './NuevoAliado';
import { AliadoDetalle } from './AliadoDetalle';
import { AliadoActividades } from './AliadoActividades';
import { AliadoBeneficios } from './AliadoBeneficios';
import { DescargarFiltradoButton } from './DescargarFiltradoButton';

type EstatusType = 'activo' | 'pendiente';
type OrigenType = 'admin' | 'preregistro';
type VistaType = 'lista' | 'formulario' | 'detalle' | 'actividades' | 'beneficios';

interface Aliado {
  id: string;
  folio: string;
  fechaRegistro: string;
  nombre: string;
  tipo: string;
  categoria: string;
  nombreContacto: string;
  telefono: string;
  correo: string;
  ciudad: string;
  estado: string;
  beneficios: number;
  estatus: EstatusType;
  origen: OrigenType;
  rfc?: string;
  direccion: string;
}

export function AliadosList() {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [filtros, setFiltros] = useState({
    tipo: '',
    ciudad: '',
    estatus: '',
    origen: ''
  });
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [vistaActual, setVistaActual] = useState<VistaType>('lista');
  const [aliadoSeleccionado, setAliadoSeleccionado] = useState<Aliado | null>(null);

  const [modalRechazarAbierto, setModalRechazarAbierto] = useState(false);
  const [aliadoParaRechazar, setAliadoParaRechazar] = useState<Aliado | null>(null);
  const [observacionesRechazar, setObservacionesRechazar] = useState('');

  const [modalAutorizarAbierto, setModalAutorizarAbierto] = useState(false);
  const [aliadoParaAutorizar, setAliadoParaAutorizar] = useState<Aliado | null>(null);
  const [observacionesAutorizar, setObservacionesAutorizar] = useState('');

  const [modalSuspenderAbierto, setModalSuspenderAbierto] = useState(false);
  const [aliadoParaSuspender, setAliadoParaSuspender] = useState<Aliado | null>(null);
  const [observacionesSuspender, setObservacionesSuspender] = useState('');

  // Renderizar vista según estado
  if (vistaActual === 'formulario') {
    return (
      <NuevoAliado
        onVolver={() => {
          setVistaActual('lista');
          setAliadoSeleccionado(null);
        }}
        aliado={aliadoSeleccionado}
      />
    );
  }

  if (vistaActual === 'detalle' && aliadoSeleccionado) {
    return (
      <AliadoDetalle
        aliado={aliadoSeleccionado}
        onVolver={() => {
          setVistaActual('lista');
          setAliadoSeleccionado(null);
        }}
      />
    );
  }

  if (vistaActual === 'actividades' && aliadoSeleccionado) {
    return (
      <AliadoActividades
        aliado={aliadoSeleccionado}
        onVolver={() => {
          setVistaActual('lista');
          setAliadoSeleccionado(null);
        }}
      />
    );
  }

  if (vistaActual === 'beneficios' && aliadoSeleccionado) {
    return (
      <AliadoBeneficios
        aliado={aliadoSeleccionado}
        onVolver={() => {
          setVistaActual('lista');
          setAliadoSeleccionado(null);
        }}
      />
    );
  }

  const aliados: Aliado[] = [
    {
      id: '1',
      folio: 'AL-2024-001',
      fechaRegistro: '15/01/2024',
      nombre: 'Secretaría de Desarrollo Social',
      tipo: 'Oficina de Gobierno',
      categoria: 'Educación',
      nombreContacto: 'Lic. María González',
      telefono: '834-123-4567',
      correo: 'contacto@sedesol.tam.gob.mx',
      ciudad: 'Victoria',
      estado: 'Tamaulipas',
      direccion: 'Av. Principal 123',
      beneficios: 3,
      estatus: 'activo',
      origen: 'admin',
      rfc: 'SDS240115ABC'
    },
    {
      id: '2',
      folio: 'AL-2024-002',
      fechaRegistro: '20/02/2024',
      nombre: 'Grupo Industrial del Norte',
      tipo: 'Empresa Privada',
      categoria: 'Empleo',
      nombreContacto: 'Ing. Roberto Martínez',
      telefono: '834-234-5678',
      correo: 'rh@grupoindustrial.com',
      ciudad: 'Reynosa',
      estado: 'Tamaulipas',
      direccion: 'Parque Industrial Km 8',
      beneficios: 3,
      estatus: 'activo',
      origen: 'admin',
      rfc: 'GIN120520XYZ'
    },
    {
      id: '3',
      folio: 'AL-2024-003',
      fechaRegistro: '10/03/2024',
      nombre: 'Fundación Juventud Unida',
      tipo: 'Asociación Civil',
      categoria: 'Cultura',
      nombreContacto: 'Mtro. Carlos López',
      telefono: '834-345-6789',
      correo: 'info@juventudunida.org',
      ciudad: 'Tampico',
      estado: 'Tamaulipas',
      direccion: 'Calle Reforma 456',
      beneficios: 3,
      estatus: 'activo',
      origen: 'admin',
      rfc: 'FJU100310AAA'
    },
    {
      id: '4',
      folio: 'AL-2024-004',
      fechaRegistro: '25/01/2024',
      nombre: 'Universidad Tecnológica de Tamaulipas',
      tipo: 'Institución Educativa',
      categoria: 'Educación',
      nombreContacto: 'Dr. Ana Ramírez',
      telefono: '834-456-7890',
      correo: 'vinculacion@utt.edu.mx',
      ciudad: 'Victoria',
      estado: 'Tamaulipas',
      direccion: 'Blvd. Universitario s/n',
      beneficios: 3,
      estatus: 'activo',
      origen: 'admin',
      rfc: 'UTT950825BBB'
    },
    {
      id: '5',
      folio: 'AL-2024-005',
      fechaRegistro: '18/05/2024',
      nombre: 'Cafetería La Esquina',
      tipo: 'Comercio Local',
      categoria: 'Comercio',
      nombreContacto: 'Sr. Juan Morales',
      telefono: '834-678-9012',
      correo: 'contacto@laesquina.com',
      ciudad: 'Nuevo Laredo',
      estado: 'Tamaulipas',
      direccion: 'Av. Hidalgo 321',
      beneficios: 2,
      estatus: 'pendiente',
      origen: 'admin',
      rfc: 'CLE180524CCC'
    },
    {
      id: '6',
      folio: 'AL-2024-006',
      fechaRegistro: '22/05/2024',
      nombre: 'Gimnasio Fitness Pro',
      tipo: 'Comercio Local',
      categoria: 'Deportes',
      nombreContacto: 'Lic. Laura Sánchez',
      telefono: '834-789-0123',
      correo: 'info@fitnesspro.com.mx',
      ciudad: 'Tampico',
      estado: 'Tamaulipas',
      direccion: 'Calle Ejército 789',
      beneficios: 0,
      estatus: 'pendiente',
      origen: 'preregistro',
      rfc: 'FPR220524DDD'
    },
    {
      id: '7',
      folio: 'AL-2024-007',
      fechaRegistro: '23/05/2024',
      nombre: 'Restaurante El Buen Sabor',
      tipo: 'Comercio Local',
      categoria: 'Gastronomía',
      nombreContacto: 'Chef Pedro Hernández',
      telefono: '834-890-1234',
      correo: 'contacto@elbuensabor.mx',
      ciudad: 'Matamoros',
      estado: 'Tamaulipas',
      direccion: 'Av. Insurgentes 234',
      beneficios: 0,
      estatus: 'pendiente',
      origen: 'preregistro'
    },
    {
      id: '8',
      folio: 'AL-2024-008',
      fechaRegistro: '24/05/2024',
      nombre: 'Librería Páginas y Más',
      tipo: 'Comercio Local',
      categoria: 'Cultura',
      nombreContacto: 'Mtra. Isabel Cruz',
      telefono: '834-901-2345',
      correo: 'ventas@paginasymas.com',
      ciudad: 'Victoria',
      estado: 'Tamaulipas',
      direccion: 'Calle Juárez 567',
      beneficios: 0,
      estatus: 'pendiente',
      origen: 'preregistro',
      rfc: 'PYM240524EEE'
    },
    {
      id: '9',
      folio: 'AL-2024-009',
      fechaRegistro: '25/05/2024',
      nombre: 'Academia de Idiomas Global',
      tipo: 'Institución Educativa',
      categoria: 'Educación',
      nombreContacto: 'Lic. Antonio Ruiz',
      telefono: '834-012-3456',
      correo: 'admisiones@academiaglobal.edu.mx',
      ciudad: 'Reynosa',
      estado: 'Tamaulipas',
      direccion: 'Blvd. Morelos 890',
      beneficios: 0,
      estatus: 'pendiente',
      origen: 'preregistro',
      rfc: 'AIG250524FFF'
    }
  ];

  const getEstatusTexto = (estatus: EstatusType) => {
    const estatuses = {
      'activo': 'Activo',
      'pendiente': 'Pendiente'
    };
    return estatuses[estatus];
  };

  const getOrigenTexto = (origen: OrigenType) => {
    const origenes = {
      'admin': 'Registrado por Admin',
      'preregistro': 'Preregistro Landing'
    };
    return origenes[origen];
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Aliados</span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Gestión de Aliados</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Administra los aliados y sus beneficios para usuarios del sistema
        </p>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Botón nuevo aliado */}
        <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-200 flex justify-end">
          <button
            onClick={() => {
              setAliadoSeleccionado(null);
              setVistaActual('formulario');
            }}
            className="bg-[#922735] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Aliado</span>
          </button>
        </div>

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
                {filtrosAbiertos && <DescargarFiltradoButton filename="aliados-filtrados" />}
              </div>
            </div>

            {/* Búsqueda General */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, contacto o correo..."
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
                  {/* Tipo */}
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Tipo de Aliado
                    </label>
                    <select
                      value={filtros.tipo}
                      onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="">Todos</option>
                      <option value="gobierno">Oficina de Gobierno</option>
                      <option value="empresa">Empresa Privada</option>
                      <option value="asociacion">Asociación Civil</option>
                      <option value="educativa">Institución Educativa</option>
                      <option value="cultural">Centro Cultural</option>
                      <option value="deportivo">Centro Deportivo</option>
                      <option value="comercio">Comercio Local</option>
                    </select>
                  </div>

                  {/* Ciudad */}
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Ciudad
                    </label>
                    <select
                      value={filtros.ciudad}
                      onChange={(e) => setFiltros({ ...filtros, ciudad: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="">Todas</option>
                      <option value="victoria">Victoria</option>
                      <option value="tampico">Tampico</option>
                      <option value="reynosa">Reynosa</option>
                      <option value="matamoros">Matamoros</option>
                      <option value="nuevo-laredo">Nuevo Laredo</option>
                    </select>
                  </div>

                  {/* Estatus */}
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Estatus
                    </label>
                    <select
                      value={filtros.estatus}
                      onChange={(e) => setFiltros({ ...filtros, estatus: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="">Todos</option>
                      <option value="activo">Activo</option>
                      <option value="pendiente">Pendiente</option>
                    </select>
                  </div>

                  {/* Origen */}
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Origen de Registro
                    </label>
                    <select
                      value={filtros.origen}
                      onChange={(e) => setFiltros({ ...filtros, origen: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="">Todos</option>
                      <option value="admin">Registrado por Admin</option>
                      <option value="preregistro">Preregistro Landing</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => setFiltros({ tipo: '', ciudad: '', estatus: '', origen: '' })}
                    className="text-[#922735] text-xs font-semibold underline hover:text-[#7a1f2d] transition-colors"
                  >
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
                    Folio / Fecha
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Nombre / Tipo
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Contacto
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Municipio
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    N° Beneficios
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Estatus
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Origen
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
              {aliados
                .sort((a, b) => {
                  // Primero los preregistros, luego los admin
                  if (a.origen === 'preregistro' && b.origen === 'admin') return -1;
                  if (a.origen === 'admin' && b.origen === 'preregistro') return 1;
                  return 0;
                })
                .map((aliado) => (
                <tr key={aliado.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3.5 text-sm">
                    <div>
                      <div className="text-gray-900 font-semibold">{aliado.folio}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{aliado.fechaRegistro}</div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm">
                    <div>
                      <div className="text-gray-900 font-medium">{aliado.nombre}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{aliado.tipo}</div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm">
                    <div>
                      <div className="text-gray-700">{aliado.telefono}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{aliado.correo}</div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {aliado.ciudad}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-center text-gray-900 font-semibold">
                    {aliado.beneficios}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {getEstatusTexto(aliado.estatus)}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {getOrigenTexto(aliado.origen)}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="relative">
                      <button
                        onClick={() => setMenuAbierto(menuAbierto === aliado.id ? null : aliado.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {menuAbierto === aliado.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setMenuAbierto(null)}
                          />
                          <div className="absolute right-0 top-8 z-20 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                            {/* Ver Detalle - disponible para todos */}
                            <button
                              onClick={() => {
                                setAliadoSeleccionado(aliado);
                                setVistaActual('detalle');
                                setMenuAbierto(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4 text-[#922735]" />
                              Ver Detalle
                            </button>
                            <button
                              onClick={() => {
                                setAliadoSeleccionado(aliado);
                                setVistaActual('beneficios');
                                setMenuAbierto(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Gift className="w-4 h-4 text-[#922735]" />
                              Ver Beneficios
                            </button>

                            {/* Acciones para estado PENDIENTE */}
                            {aliado.estatus === 'pendiente' && (
                              <>
                                <button
                                  onClick={() => {
                                    setAliadoSeleccionado(aliado);
                                    setVistaActual('formulario');
                                    setMenuAbierto(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <Pencil className="w-4 h-4 text-[#922735]" />
                                  Editar
                                </button>
                                <button
                                  onClick={() => {
                                    setAliadoParaRechazar(aliado);
                                    setModalRechazarAbierto(true);
                                    setMenuAbierto(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <XCircle className="w-4 h-4 text-[#922735]" />
                                  Rechazar
                                </button>
                                <button
                                  onClick={() => {
                                    setAliadoParaAutorizar(aliado);
                                    setModalAutorizarAbierto(true);
                                    setMenuAbierto(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-[#922735]" />
                                  Autorizar
                                </button>
                              </>
                            )}

                            {/* Acciones para estado ACTIVO */}
                            {aliado.estatus === 'activo' && (
                              <>
                                <button
                                  onClick={() => {
                                    setAliadoSeleccionado(aliado);
                                    setVistaActual('actividades');
                                    setMenuAbierto(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <Star className="w-4 h-4 text-[#922735]" />
                                  Ver Actividades
                                </button>
                                <button
                                  onClick={() => {
                                    setAliadoSeleccionado(aliado);
                                    setVistaActual('formulario');
                                    setMenuAbierto(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <Pencil className="w-4 h-4 text-[#922735]" />
                                  Editar
                                </button>
                                <button
                                  onClick={() => {
                                    setAliadoParaSuspender(aliado);
                                    setModalSuspenderAbierto(true);
                                    setMenuAbierto(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                  <Ban className="w-4 h-4 text-[#922735]" />
                                  Suspender
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
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            Mostrando 1 a {aliados.length} de {aliados.length} entradas
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

      {/* Modal para rechazar aliado */}
      {modalRechazarAbierto && aliadoParaRechazar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">Rechazar aliado</h2>
                <button
                  onClick={() => {
                    setModalRechazarAbierto(false);
                    setAliadoParaRechazar(null);
                    setObservacionesRechazar('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <h3 className="text-base font-semibold text-[#922735]">{aliadoParaRechazar.nombre}</h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Motivo del rechazo *
                  </label>
                  <textarea
                    value={observacionesRechazar}
                    onChange={(e) => setObservacionesRechazar(e.target.value)}
                    placeholder="Describe el motivo por el cual se rechaza este aliado..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setModalRechazarAbierto(false);
                      setAliadoParaRechazar(null);
                      setObservacionesRechazar('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (observacionesRechazar.trim()) {
                        alert(`Aliado rechazado: ${aliadoParaRechazar.nombre}\nMotivo: ${observacionesRechazar}`);
                        setObservacionesRechazar('');
                        setModalRechazarAbierto(false);
                        setAliadoParaRechazar(null);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Rechazar aliado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para autorizar aliado */}
      {modalAutorizarAbierto && aliadoParaAutorizar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">Autorizar aliado</h2>
                <button
                  onClick={() => {
                    setModalAutorizarAbierto(false);
                    setAliadoParaAutorizar(null);
                    setObservacionesAutorizar('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <h3 className="text-base font-semibold text-[#922735]">{aliadoParaAutorizar.nombre}</h3>
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
                      setAliadoParaAutorizar(null);
                      setObservacionesAutorizar('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      alert(`Aliado autorizado: ${aliadoParaAutorizar.nombre}${observacionesAutorizar ? `\nComentario: ${observacionesAutorizar}` : ''}`);
                      setObservacionesAutorizar('');
                      setModalAutorizarAbierto(false);
                      setAliadoParaAutorizar(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Autorizar aliado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para suspender aliado */}
      {modalSuspenderAbierto && aliadoParaSuspender && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">Suspender aliado</h2>
                <button
                  onClick={() => {
                    setModalSuspenderAbierto(false);
                    setAliadoParaSuspender(null);
                    setObservacionesSuspender('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <h3 className="text-base font-semibold text-[#922735]">{aliadoParaSuspender.nombre}</h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Motivo de la suspensión *
                  </label>
                  <textarea
                    value={observacionesSuspender}
                    onChange={(e) => setObservacionesSuspender(e.target.value)}
                    placeholder="Describe el motivo por el cual se suspende este aliado..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setModalSuspenderAbierto(false);
                      setAliadoParaSuspender(null);
                      setObservacionesSuspender('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (observacionesSuspender.trim()) {
                        alert(`Aliado suspendido: ${aliadoParaSuspender.nombre}\nMotivo: ${observacionesSuspender}`);
                        setObservacionesSuspender('');
                        setModalSuspenderAbierto(false);
                        setAliadoParaSuspender(null);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#922735] text-white rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors"
                  >
                    <Ban className="w-4 h-4" />
                    Suspender aliado
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

