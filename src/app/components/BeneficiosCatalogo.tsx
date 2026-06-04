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

interface TipoBeneficio {
  id: string;
  nombre: string;
  descripcion: string;
  orden: number;
}

export function BeneficiosCatalogo() {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [beneficioEditando, setBeneficioEditando] = useState<TipoBeneficio | null>(null);

  const tiposBeneficio: TipoBeneficio[] = [
    {
      id: '1',
      nombre: 'Promoción',
      descripcion: 'Ofertas y promociones especiales por tiempo limitado',
      orden: 1
    },
    {
      id: '2',
      nombre: 'Descuento',
      descripcion: 'Descuentos aplicables en productos o servicios',
      orden: 2
    },
    {
      id: '3',
      nombre: 'Beneficio',
      descripcion: 'Ventajas exclusivas para usuarios del pasaporte joven',
      orden: 3
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
        <span className="text-gray-900 font-semibold">Tipos de Beneficios</span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Catálogo de Tipos de Beneficios</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Gestiona los tipos de beneficios que los aliados pueden ofrecer a los jóvenes
        </p>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Botón nuevo tipo */}
        <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-200 flex justify-end">
          <button
            onClick={() => {
              setBeneficioEditando(null);
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
                {filtrosAbiertos && <DescargarFiltradoButton filename="tipos-beneficios-filtrados" />}
              </div>
            </div>

            {/* Búsqueda General */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar tipos de beneficios..."
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
                <div className="grid grid-cols-1 gap-3 md:gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                      Orden
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white">
                      <option value="">Todos</option>
                      <option value="asc">Ascendente</option>
                      <option value="desc">Descendente</option>
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
                    Nombre
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Descripción
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
              {tiposBeneficio.map((beneficio) => (
                <tr key={beneficio.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3.5 text-sm text-gray-700 font-semibold">
                    {beneficio.orden}
                  </td>
                  <td className="px-3 py-3.5 text-sm">
                    <span className="text-gray-900 font-medium">{beneficio.nombre}</span>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">
                    {beneficio.descripcion}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="relative">
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
                          <div className="absolute right-0 top-8 z-20 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                            <button
                              onClick={() => {
                                setBeneficioEditando(beneficio);
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
            Mostrando 1 a {tiposBeneficio.length} de {tiposBeneficio.length} entradas
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

      {/* Modal para crear/editar tipo de beneficio */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">
                  {beneficioEditando ? 'Editar Tipo de Beneficio' : 'Nuevo Tipo de Beneficio'}
                </h2>
                <button
                  onClick={() => {
                    setModalAbierto(false);
                    setBeneficioEditando(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {beneficioEditando && (
                <h3 className="text-base font-semibold text-[#922735]">{beneficioEditando.nombre}</h3>
              )}
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Nombre del tipo *
                  </label>
                  <input
                    type="text"
                    defaultValue={beneficioEditando?.nombre}
                    placeholder="Ej: Promoción, 2x1, Entrada Gratuita"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Descripción *
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={beneficioEditando?.descripcion}
                    placeholder="Describe este tipo de beneficio..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Orden de visualización *
                  </label>
                  <input
                    type="number"
                    defaultValue={beneficioEditando?.orden}
                    min="1"
                    placeholder="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setModalAbierto(false);
                      setBeneficioEditando(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#C9A961] text-white rounded-lg text-sm font-medium hover:bg-[#b89850] transition-colors"
                  >
                    {beneficioEditando ? 'Guardar Cambios' : 'Crear Tipo'}
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

