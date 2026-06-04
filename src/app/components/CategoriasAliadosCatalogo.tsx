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
  Plus,
  Pencil,
  Power,
  X
} from 'lucide-react';
import { DescargarFiltradoButton } from './DescargarFiltradoButton';
import { categoriasCatalogo } from '../data/catalogos';

type SeccionType = 'beneficios' | 'explora' | 'noticias';

interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  seccion: SeccionType;
  activo: boolean;
}

const secciones: Record<SeccionType, string> = {
  beneficios: 'Beneficios Disponibles',
  explora: 'Explora',
  noticias: 'Noticias'
};

export function CategoriasAliadosCatalogo() {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [filtros, setFiltros] = useState({
    estado: '',
    seccion: ''
  });
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>(categoriasCatalogo);

  const categoriasFiltradas = categorias.filter((categoria) => {
    const busquedaNormalizada = busqueda.trim().toLowerCase();
    const coincideBusqueda =
      !busquedaNormalizada ||
      categoria.nombre.toLowerCase().includes(busquedaNormalizada) ||
      categoria.descripcion.toLowerCase().includes(busquedaNormalizada);
    const coincideEstado =
      !filtros.estado ||
      (filtros.estado === 'activo' && categoria.activo) ||
      (filtros.estado === 'inactivo' && !categoria.activo);
    const coincideSeccion = !filtros.seccion || categoria.seccion === filtros.seccion;

    return coincideBusqueda && coincideEstado && coincideSeccion;
  });

  const guardarCategoria = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const categoriaGuardada: Categoria = {
      id: categoriaEditando?.id ?? String(Date.now()),
      nombre: String(formData.get('nombre') ?? ''),
      descripcion: String(formData.get('descripcion') ?? ''),
      seccion: String(formData.get('seccion') ?? 'beneficios') as SeccionType,
      activo: formData.get('activo') === 'on'
    };

    setCategorias((categoriasActuales) =>
      categoriaEditando
        ? categoriasActuales.map((categoria) =>
            categoria.id === categoriaEditando.id ? categoriaGuardada : categoria
          )
        : [categoriaGuardada, ...categoriasActuales]
    );
    setModalAbierto(false);
    setCategoriaEditando(null);
  };

  const alternarEstadoCategoria = (categoriaId: string) => {
    setCategorias((categoriasActuales) =>
      categoriasActuales.map((categoria) =>
        categoria.id === categoriaId
          ? { ...categoria, activo: !categoria.activo }
          : categoria
      )
    );
    setMenuAbierto(null);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">Catalogos</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Categorias</span>
      </div>

      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Catalogo de Categorias</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Gestiona las categorias que se mostraran en Beneficios Disponibles, Explora y Noticias
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-200 flex justify-end">
          <button
            onClick={() => {
              setCategoriaEditando(null);
              setModalAbierto(true);
            }}
            className="bg-[#922735] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Categoria</span>
          </button>
        </div>

        <div className="px-4 md:px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
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
                {filtrosAbiertos && <DescargarFiltradoButton filename="categorias-aliados-filtradas" />}
              </div>
            </div>

            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar categorias..."
                  value={busqueda}
                  onChange={(event) => setBusqueda(event.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {filtrosAbiertos && (
            <div className="pt-3 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                    Estado
                  </label>
                  <select
                    value={filtros.estado}
                    onChange={(event) => setFiltros({ ...filtros, estado: event.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                  >
                    <option value="">Todos</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-semibold mb-1.5">
                    Seccion
                  </label>
                  <select
                    value={filtros.seccion}
                    onChange={(event) => setFiltros({ ...filtros, seccion: event.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                  >
                    <option value="">Todas</option>
                    <option value="beneficios">Beneficios Disponibles</option>
                    <option value="explora">Explora</option>
                    <option value="noticias">Noticias</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setFiltros({ estado: '', seccion: '' })}
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
                    Nombre de la Categoria
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Descripcion de la Categoria
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Seccion
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
              {categoriasFiltradas.map((categoria) => (
                <tr key={categoria.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3.5 text-sm text-gray-900 font-medium">
                    {categoria.nombre}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">
                    {categoria.descripcion}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {secciones[categoria.seccion]}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {categoria.activo ? 'Activo' : 'Inactivo'}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="relative">
                      <button
                        onClick={() => setMenuAbierto(menuAbierto === categoria.id ? null : categoria.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {menuAbierto === categoria.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setMenuAbierto(null)}
                          />
                          <div className="absolute right-0 top-8 z-20 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                            <button
                              onClick={() => {
                                setCategoriaEditando(categoria);
                                setModalAbierto(true);
                                setMenuAbierto(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Pencil className="w-4 h-4 text-[#922735]" />
                              Editar
                            </button>
                            <button
                              onClick={() => alternarEstadoCategoria(categoria.id)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Power className="w-4 h-4 text-[#922735]" />
                              {categoria.activo ? 'Desactivar' : 'Activar'}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {categoriasFiltradas.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                    No se encontraron categorias con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            Mostrando {categoriasFiltradas.length > 0 ? 1 : 0} a {categoriasFiltradas.length} de {categoriasFiltradas.length} entradas
          </p>
          <div className="flex items-center gap-2">
            <button className="px-2 md:px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="hidden sm:inline">Anterior</span>
              <span className="sm:hidden">&lt;</span>
            </button>
            <button className="px-3 py-1.5 bg-[#922735] text-white rounded text-xs font-medium">
              1
            </button>
            <button className="px-2 md:px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="hidden sm:inline">Siguiente</span>
              <span className="sm:hidden">&gt;</span>
            </button>
          </div>
        </div>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">
                  {categoriaEditando ? 'Editar Categoria' : 'Nueva Categoria'}
                </h2>
                <button
                  onClick={() => {
                    setModalAbierto(false);
                    setCategoriaEditando(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {categoriaEditando && (
                <h3 className="text-base font-semibold text-[#922735]">{categoriaEditando.nombre}</h3>
              )}
            </div>

            <div className="p-6">
              <form className="space-y-4" onSubmit={guardarCategoria}>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Nombre de la categoria *
                  </label>
                  <input
                    name="nombre"
                    type="text"
                    required
                    defaultValue={categoriaEditando?.nombre}
                    placeholder="Ej: Educacion"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Descripcion de la categoria *
                  </label>
                  <textarea
                    name="descripcion"
                    rows={3}
                    required
                    defaultValue={categoriaEditando?.descripcion}
                    placeholder="Describe donde se usara esta categoria..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Seccion donde se visualiza *
                  </label>
                  <select
                    name="seccion"
                    required
                    defaultValue={categoriaEditando?.seccion ?? 'beneficios'}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                  >
                    <option value="beneficios">Beneficios Disponibles</option>
                    <option value="explora">Explora</option>
                    <option value="noticias">Noticias</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      name="activo"
                      type="checkbox"
                      defaultChecked={categoriaEditando?.activo ?? true}
                      className="w-4 h-4 text-[#922735] border-gray-300 rounded focus:ring-[#922735]"
                    />
                    <span className="text-gray-700 text-sm font-semibold">Categoria activa</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setModalAbierto(false);
                      setCategoriaEditando(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#C9A961] text-white rounded-lg text-sm font-medium hover:bg-[#b89850] transition-colors"
                  >
                    {categoriaEditando ? 'Guardar Cambios' : 'Crear Categoria'}
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

