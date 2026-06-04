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
  X
} from 'lucide-react';
import { DescargarFiltradoButton } from './DescargarFiltradoButton';

interface TipoActividad {
  id: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  color: string;
  icono: string;
  orden: number;
  activo: boolean;
}

export function ActividadesCatalogo() {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [actividadEditando, setActividadEditando] = useState<TipoActividad | null>(null);

  const tiposActividad: TipoActividad[] = [
    {
      id: '1',
      nombre: 'Evento',
      tipo: 'evento',
      descripcion: 'Eventos culturales, deportivos o recreativos',
      color: '#F59E0B',
      icono: '🎭',
      orden: 1,
      activo: true
    },
    {
      id: '2',
      nombre: 'Taller',
      tipo: 'taller',
      descripcion: 'Talleres de capacitación y desarrollo de habilidades',
      color: '#10B981',
      icono: '🔧',
      orden: 2,
      activo: true
    },
    {
      id: '3',
      nombre: 'Sorteo',
      tipo: 'sorteo',
      descripcion: 'Sorteos y concursos para jóvenes',
      color: '#3B82F6',
      icono: '🎲',
      orden: 3,
      activo: true
    },
    {
      id: '4',
      nombre: 'Torneo',
      tipo: 'torneo',
      descripcion: 'Torneos deportivos y competencias',
      color: '#8B5CF6',
      icono: '🏆',
      orden: 4,
      activo: true
    }
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">Catálogos</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Tipos de Actividades</span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Catálogo de Tipos de Actividades</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Gestiona los tipos de actividades que los aliados pueden ofrecer a los jóvenes
        </p>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Botón nueva actividad */}
        <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-200 flex justify-end">
          <button
            onClick={() => {
              setActividadEditando(null);
              setModalAbierto(true);
            }}
            className="bg-[#922735] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Tipo</span>
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
                {filtrosAbiertos && <DescargarFiltradoButton filename="tipos-actividades-filtrados" />}
              </div>
            </div>

            {/* Búsqueda General */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar tipos de actividades..."
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Tipo
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
                      Estado
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white">
                      <option value="">Todos</option>
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
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
                    Orden
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Actividad
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
                    Descripción
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
              {tiposActividad.map((actividad) => (
                <tr key={actividad.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3.5 text-sm text-gray-700 font-semibold">
                    {actividad.orden}
                  </td>
                  <td className="px-3 py-3.5 text-sm">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                        style={{ backgroundColor: `${actividad.color}20` }}
                      >
                        {actividad.icono}
                      </div>
                      <span className="text-gray-900 font-medium">{actividad.nombre}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-600 capitalize">
                    {actividad.tipo}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">
                    {actividad.descripcion}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {actividad.activo ? 'Activo' : 'Inactivo'}
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
                          <div className="absolute right-0 top-8 z-20 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                            <button
                              onClick={() => {
                                setActividadEditando(actividad);
                                setModalAbierto(true);
                                setMenuAbierto(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Pencil className="w-4 h-4 text-[#922735]" />
                              Editar
                            </button>
                            <button
                              onClick={() => setMenuAbierto(null)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4 text-[#922735]" />
                              Eliminar
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
            Mostrando 1 a {tiposActividad.length} de {tiposActividad.length} entradas
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

      {/* Modal para crear/editar tipo de actividad */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">
                  {actividadEditando ? 'Editar Tipo de Actividad' : 'Nuevo Tipo de Actividad'}
                </h2>
                <button
                  onClick={() => {
                    setModalAbierto(false);
                    setActividadEditando(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {actividadEditando && (
                <h3 className="text-base font-semibold text-[#922735]">{actividadEditando.nombre}</h3>
              )}
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Nombre de la actividad *
                  </label>
                  <input
                    type="text"
                    defaultValue={actividadEditando?.nombre}
                    placeholder="Ej: Evento"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Tipo de actividad *
                  </label>
                  <select
                    defaultValue={actividadEditando?.tipo}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                  >
                    <option value="">Seleccionar</option>
                    <option value="evento">Evento</option>
                    <option value="taller">Taller</option>
                    <option value="sorteo">Sorteo</option>
                    <option value="torneo">Torneo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Descripción *
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={actividadEditando?.descripcion}
                    placeholder="Describe este tipo de actividad..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Icono (emoji) *
                    </label>
                    <input
                      type="text"
                      defaultValue={actividadEditando?.icono}
                      placeholder="🎭"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent text-2xl text-center"
                      maxLength={2}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Color *
                    </label>
                    <input
                      type="color"
                      defaultValue={actividadEditando?.color || '#F59E0B'}
                      className="w-full h-[42px] border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Orden de visualización *
                  </label>
                  <input
                    type="number"
                    defaultValue={actividadEditando?.orden}
                    min="1"
                    placeholder="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={actividadEditando?.activo ?? true}
                      className="w-4 h-4 text-[#922735] border-gray-300 rounded focus:ring-[#922735]"
                    />
                    <span className="text-gray-700 text-sm font-semibold">Tipo activo</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setModalAbierto(false);
                      setActividadEditando(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#C9A961] text-white rounded-lg text-sm font-medium hover:bg-[#b89850] transition-colors"
                  >
                    {actividadEditando ? 'Guardar Cambios' : 'Crear Tipo'}
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

