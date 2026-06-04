import { FormEvent, useState } from 'react';
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
  X,
  Send,
  Trash2,
  Users,
  Clock
} from 'lucide-react';
import { DescargarFiltradoButton } from './DescargarFiltradoButton';

type TipoNotificacion = 'push' | 'email' | 'sistema';
type EstadoNotificacion = 'enviada' | 'programada' | 'borrador';
type SegmentoDestinatarios = 'todos' | 'nivel' | 'inscritos-explora';

interface EnvioProgramado {
  id: string;
  fecha: string;
  hora: string;
}

interface ActividadExplora {
  id: string;
  nombre: string;
  tipo: string;
  fecha: string;
  inscritos: number;
}

interface FormularioNotificacion {
  titulo: string;
  mensaje: string;
  tipo: TipoNotificacion;
  segmento: SegmentoDestinatarios;
  nivel: string;
  actividadExploraId: string;
  zona: string;
  programarEnvio: boolean;
  enviosProgramados: EnvioProgramado[];
}

interface Notificacion {
  id: string;
  fecha: string;
  titulo: string;
  mensaje: string;
  tipo: TipoNotificacion;
  destinatarios: string;
  zona?: string;
  estado: EstadoNotificacion;
  leidas: number;
  total: number;
}

const actividadesExplora: ActividadExplora[] = [
  { id: '1', nombre: 'Taller de emprendimiento joven', tipo: 'Taller', fecha: '10/06/2026', inscritos: 48 },
  { id: '2', nombre: 'Maraton ciudad Victoria', tipo: 'Evento', fecha: '15/06/2026', inscritos: 126 },
  { id: '3', nombre: 'Curso de programacion web', tipo: 'Curso', fecha: '20/06/2026', inscritos: 72 },
  { id: '4', nombre: 'Festival cultural juvenil', tipo: 'Evento', fecha: '03/08/2026', inscritos: 210 }
];

const formularioInicial: FormularioNotificacion = {
  titulo: '',
  mensaje: '',
  tipo: 'push',
  segmento: 'todos',
  nivel: 'todos',
  actividadExploraId: actividadesExplora[0]?.id ?? '',
  zona: 'todas',
  programarEnvio: false,
  enviosProgramados: [{ id: '1', fecha: '', hora: '' }]
};

export function Notificaciones() {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [filtros, setFiltros] = useState({
    tipo: '',
    estado: ''
  });
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formulario, setFormulario] = useState<FormularioNotificacion>(formularioInicial);

  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: '1',
      fecha: '20/05/2026 14:30',
      titulo: 'Actualización de Pasaporte Joven',
      mensaje: 'Tu pasaporte ha alcanzado el nivel Bronce. ¡Sigue acumulando puntos!',
      tipo: 'push',
      destinatarios: 'Usuario: Juan Pérez',
      zona: 'Todas',
      estado: 'enviada',
      leidas: 1,
      total: 1
    },
    {
      id: '2',
      fecha: '19/05/2026 10:00',
      titulo: 'Nuevo beneficio disponible',
      mensaje: 'Ya puedes canjear tu descuento en cines participantes.',
      tipo: 'push',
      destinatarios: 'Nivel: Bronce, Plata',
      zona: 'Zona Sur',
      estado: 'enviada',
      leidas: 245,
      total: 320
    },
    {
      id: '3',
      fecha: '18/05/2026 16:45',
      titulo: 'Evento próximo: Taller de emprendimiento',
      mensaje: 'Te invitamos al taller este sábado 25 de mayo.',
      tipo: 'email',
      destinatarios: 'Todos los usuarios',
      zona: 'Zona Norte',
      estado: 'enviada',
      leidas: 580,
      total: 1250
    },
    {
      id: '4',
      fecha: '25/05/2026 09:00',
      titulo: 'Recordatorio: Verifica tu información',
      mensaje: 'Por favor actualiza tus datos de contacto.',
      tipo: 'sistema',
      destinatarios: 'Usuarios sin verificar',
      zona: 'Todas',
      estado: 'programada',
      leidas: 0,
      total: 45
    },
    {
      id: '5',
      fecha: '17/05/2026 08:00',
      titulo: 'Bienvenido al Pasaporte Joven',
      mensaje: 'Descubre todos los beneficios que tenemos para ti.',
      tipo: 'email',
      destinatarios: 'Nuevos registros',
      zona: 'Zona Centro',
      estado: 'borrador',
      leidas: 0,
      total: 0
    }
  ]);

  const actividadSeleccionada = actividadesExplora.find(
    (actividad) => actividad.id === formulario.actividadExploraId
  );

  const getTipoTexto = (tipo: TipoNotificacion) => {
    const tipos = {
      'push': 'Push',
      'email': 'Email',
      'sistema': 'Sistema'
    };
    return tipos[tipo];
  };

  const getEstadoTexto = (estado: EstadoNotificacion) => {
    const estados = {
      'enviada': 'Enviada',
      'programada': 'Programada',
      'borrador': 'Borrador'
    };
    return estados[estado];
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setFormulario(formularioInicial);
  };

  const actualizarEnvioProgramado = (id: string, campo: 'fecha' | 'hora', valor: string) => {
    setFormulario((actual) => ({
      ...actual,
      enviosProgramados: actual.enviosProgramados.map((envio) =>
        envio.id === id ? { ...envio, [campo]: valor } : envio
      )
    }));
  };

  const agregarEnvioProgramado = () => {
    setFormulario((actual) => ({
      ...actual,
      enviosProgramados: [
        ...actual.enviosProgramados,
        { id: String(Date.now()), fecha: '', hora: '' }
      ]
    }));
  };

  const eliminarEnvioProgramado = (id: string) => {
    setFormulario((actual) => ({
      ...actual,
      enviosProgramados:
        actual.enviosProgramados.length === 1
          ? actual.enviosProgramados
          : actual.enviosProgramados.filter((envio) => envio.id !== id)
    }));
  };

  const getResumenDestinatarios = () => {
    if (formulario.segmento === 'inscritos-explora') {
      return actividadSeleccionada
        ? `Inscritos Explora: ${actividadSeleccionada.nombre}`
        : 'Inscritos Explora';
    }

    if (formulario.segmento === 'nivel') {
      const niveles: Record<string, string> = {
        todos: 'Todos los niveles',
        basico: 'Nivel Basico',
        protagonista: 'Nivel Protagonista',
        leyenda: 'Nivel Leyenda'
      };
      return niveles[formulario.nivel] ?? 'Por nivel';
    }

    return 'Todos los usuarios';
  };

  const getTotalDestinatarios = () => {
    if (formulario.segmento === 'inscritos-explora') return actividadSeleccionada?.inscritos ?? 0;
    if (formulario.segmento === 'nivel') return formulario.nivel === 'todos' ? 1250 : 320;
    return 1250;
  };

  const guardarNotificacion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const primerEnvio = formulario.enviosProgramados[0];
    const fechaProgramada =
      formulario.programarEnvio && primerEnvio?.fecha && primerEnvio?.hora
        ? `${primerEnvio.fecha} ${primerEnvio.hora}`
        : new Date().toLocaleString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

    const nuevaNotificacion: Notificacion = {
      id: String(Date.now()),
      fecha:
        formulario.programarEnvio && formulario.enviosProgramados.length > 1
          ? `${fechaProgramada} + ${formulario.enviosProgramados.length - 1} envios`
          : fechaProgramada,
      titulo: formulario.titulo,
      mensaje: formulario.mensaje,
      tipo: formulario.tipo,
      destinatarios: getResumenDestinatarios(),
      zona: formulario.zona === 'todas' ? 'Todas' : formulario.zona,
      estado: formulario.programarEnvio ? 'programada' : 'enviada',
      leidas: 0,
      total: getTotalDestinatarios()
    };

    setNotificaciones((actuales) => [nuevaNotificacion, ...actuales]);
    cerrarModal();
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Notificaciones</span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Gestión de Notificaciones</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Administra y envía notificaciones a los usuarios del sistema
        </p>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Búsqueda General y Filtros */}
        <div className="px-4 md:px-6 py-4 bg-gray-50 border-b border-gray-200">
          {/* Búsqueda General */}
          <div className="mb-4">
            <label className="block text-gray-700 text-xs font-semibold mb-2">
              Búsqueda General
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por título o mensaje..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtros Avanzados */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
                className="flex items-center justify-between py-2 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#922735]" />
                  <span className="text-gray-700 font-semibold text-sm">Filtros Avanzados</span>
                </div>
                {filtrosAbiertos ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {filtrosAbiertos && <DescargarFiltradoButton filename="notificaciones-filtradas" />}
            </div>

            {filtrosAbiertos && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                  {/* Tipo */}
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Tipo de Notificación
                    </label>
                    <select
                      value={filtros.tipo}
                      onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="">Todos</option>
                      <option value="push">Push</option>
                      <option value="email">Email</option>
                      <option value="sistema">Sistema</option>
                    </select>
                  </div>

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
                      <option value="enviada">Enviada</option>
                      <option value="programada">Programada</option>
                      <option value="borrador">Borrador</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => setFiltros({ tipo: '', estado: '' })}
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
        <div className="px-4 md:px-6 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Mostrar</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span>entradas</span>
          </div>

          <button
            onClick={() => setModalAbierto(true)}
            className="bg-[#922735] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#7a1f2d] transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nueva Notificación</span>
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#C9A961] to-[#D4B871]">
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Fecha
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Título / Mensaje
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
                    Destinatarios
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Zona
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Estado
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Tasa de Lectura
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
              {notificaciones.map((notif) => (
                <tr key={notif.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {notif.fecha}
                  </td>
                  <td className="px-3 py-3.5 text-sm">
                    <div>
                      <div className="text-gray-900 font-medium">{notif.titulo}</div>
                      <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">{notif.mensaje}</div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {getTipoTexto(notif.tipo)}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {notif.destinatarios}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {notif.zona}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {getEstadoTexto(notif.estado)}
                  </td>
                  <td className="px-3 py-3.5 text-sm">
                    {notif.estado === 'enviada' ? (
                      <div>
                        <div className="text-gray-900 font-semibold">
                          {Math.round((notif.leidas / notif.total) * 100)}%
                        </div>
                        <div className="text-gray-500 text-xs">
                          {notif.leidas} de {notif.total}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="relative">
                      <button
                        onClick={() => setMenuAbierto(menuAbierto === notif.id ? null : notif.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {menuAbierto === notif.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setMenuAbierto(null)}
                          />
                          <div className="absolute right-0 top-8 z-20 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                            <button
                              onClick={() => setMenuAbierto(null)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4 text-[#922735]" />
                              Ver Detalle
                            </button>
                            <button
                              onClick={() => setMenuAbierto(null)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Send className="w-4 h-4 text-[#922735]" />
                              Reenviar
                            </button>
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
            Mostrando 1 a {notificaciones.length} de {notificaciones.length} entradas
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

      {/* Modal para crear notificación */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">Nueva Notificación</h2>
                <button
                  onClick={cerrarModal}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6" onSubmit={guardarNotificacion}>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Título de la notificación *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Nueva actualizacion disponible"
                    value={formulario.titulo}
                    onChange={(event) => setFormulario({ ...formulario, titulo: event.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Escribe el contenido de la notificacion..."
                    value={formulario.mensaje}
                    onChange={(event) => setFormulario({ ...formulario, mensaje: event.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Tipo de notificación *
                    </label>
                    <select
                      value={formulario.tipo}
                      onChange={(event) => setFormulario({ ...formulario, tipo: event.target.value as TipoNotificacion })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="push">Notificación Push</option>
                      <option value="email">Correo Electrónico</option>
                      <option value="sistema">Notificación del Sistema</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Segmento de destinatarios *
                    </label>
                    <select
                      value={formulario.segmento}
                      onChange={(event) =>
                        setFormulario({ ...formulario, segmento: event.target.value as SegmentoDestinatarios })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="todos">Todos los usuarios</option>
                      <option value="nivel">Usuarios por nivel</option>
                      <option value="inscritos-explora">Inscritos a evento o actividad de Explora</option>
                    </select>
                  </div>
                </div>

                {formulario.segmento === 'nivel' && (
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Destinatarios por nivel *
                    </label>
                    <select
                      value={formulario.nivel}
                      onChange={(event) => setFormulario({ ...formulario, nivel: event.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      <option value="todos">Todos los niveles</option>
                      <option value="basico">Nivel Basico</option>
                      <option value="protagonista">Nivel Protagonista</option>
                      <option value="leyenda">Nivel Leyenda</option>
                    </select>
                  </div>
                )}

                {formulario.segmento === 'inscritos-explora' && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-[#922735]" />
                      <h3 className="text-sm font-semibold text-gray-900">
                        Enviar solo a inscritos de Explora
                      </h3>
                    </div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Evento o actividad *
                    </label>
                    <select
                      value={formulario.actividadExploraId}
                      onChange={(event) => setFormulario({ ...formulario, actividadExploraId: event.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                    >
                      {actividadesExplora.map((actividad) => (
                        <option key={actividad.id} value={actividad.id}>
                          {actividad.nombre} - {actividad.tipo} - {actividad.fecha}
                        </option>
                      ))}
                    </select>
                    {actividadSeleccionada && (
                      <p className="text-gray-600 text-xs mt-2">
                        Se enviara a {actividadSeleccionada.inscritos} usuarios inscritos en esta actividad.
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Zona geográfica *
                  </label>
                  <select
                    value={formulario.zona}
                    onChange={(event) => setFormulario({ ...formulario, zona: event.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                  >
                    <option value="todas">Todas las zonas</option>
                    <option value="zona-norte">Zona Norte</option>
                    <option value="zona-centro">Zona Centro</option>
                    <option value="zona-sur">Zona Sur</option>
                  </select>
                  <p className="text-gray-500 text-xs mt-1">
                    Envía la notificación solo a usuarios de una zona específica o a todo el estado
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={formulario.programarEnvio}
                      onChange={(event) => setFormulario({ ...formulario, programarEnvio: event.target.checked })}
                      className="w-4 h-4 text-[#922735] border-gray-300 rounded focus:ring-[#922735]"
                    />
                    <span className="text-gray-700 text-sm font-semibold">Programar envio</span>
                  </label>
                  {formulario.programarEnvio ? (
                    <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <Clock className="w-4 h-4 text-[#922735]" />
                        Programacion de envios
                      </div>
                      {formulario.enviosProgramados.map((envio, index) => (
                        <div key={envio.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-end">
                          <div>
                            <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                              Fecha de envio {index + 1}
                            </label>
                            <input
                              type="date"
                              value={envio.fecha}
                              onChange={(event) => actualizarEnvioProgramado(envio.id, 'fecha', event.target.value)}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                              required={formulario.programarEnvio}
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 text-xs font-semibold mb-1.5">Hora</label>
                            <input
                              type="time"
                              value={envio.hora}
                              onChange={(event) => actualizarEnvioProgramado(envio.id, 'hora', event.target.value)}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                              required={formulario.programarEnvio}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => eliminarEnvioProgramado(envio.id)}
                            disabled={formulario.enviosProgramados.length === 1}
                            className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="md:hidden">Eliminar</span>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={agregarEnvioProgramado}
                        className="text-[#922735] text-sm font-semibold hover:text-[#7a1f2d] transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar otro envio
                      </button>
                      <p className="text-xs text-gray-500">
                        Puedes programar la misma notificacion mas de una vez y en diferentes horarios.
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-xs">
                      Si no se programa, la notificacion se enviara al confirmar.
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={cerrarModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Guardar Borrador
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-[#922735] text-white rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Notificación
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

