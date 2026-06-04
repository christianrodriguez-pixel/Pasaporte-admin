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

interface TipoAliado {
  id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

const tiposIniciales: TipoAliado[] = [
  {
    id: '1',
    nombre: 'Oficina de Gobierno',
    descripcion: 'Dependencias gubernamentales federales, estatales y municipales',
    activo: true
  },
  {
    id: '2',
    nombre: 'Empresa Privada',
    descripcion: 'Empresas del sector privado que ofrecen beneficios a jovenes',
    activo: true
  },
  {
    id: '3',
    nombre: 'Asociacion Civil',
    descripcion: 'Organizaciones sin fines de lucro y asociaciones civiles',
    activo: true
  },
  {
    id: '4',
    nombre: 'Institucion Educativa',
    descripcion: 'Universidades, tecnologicos y centros de capacitacion',
    activo: true
  },
  {
    id: '5',
    nombre: 'Centro Cultural',
    descripcion: 'Museos, teatros, galerias y espacios culturales',
    activo: true
  },
  {
    id: '6',
    nombre: 'Centro Deportivo',
    descripcion: 'Gimnasios, clubes deportivos y complejos recreativos',
    activo: true
  },
  {
    id: '7',
    nombre: 'Comercio Local',
    descripcion: 'Negocios locales, restaurantes, tiendas y servicios',
    activo: true
  },
  {
    id: '8',
    nombre: 'Centro de Salud',
    descripcion: 'Clinicas, hospitales y centros de atencion medica',
    activo: false
  }
];

export function TiposAliadosCatalogo() {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [filtros, setFiltros] = useState({ estado: '' });
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tipoEditando, setTipoEditando] = useState<TipoAliado | null>(null);
  const [tipos, setTipos] = useState<TipoAliado[]>(tiposIniciales);

  const tiposFiltrados = tipos.filter((tipo) => {
    const busquedaNormalizada = busqueda.trim().toLowerCase();
    const coincideBusqueda =
      !busquedaNormalizada ||
      tipo.nombre.toLowerCase().includes(busquedaNormalizada) ||
      tipo.descripcion.toLowerCase().includes(busquedaNormalizada);
    const coincideEstado =
      !filtros.estado ||
      (filtros.estado === 'activo' && tipo.activo) ||
      (filtros.estado === 'inactivo' && !tipo.activo);

    return coincideBusqueda && coincideEstado;
  });

  const guardarTipo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const tipoGuardado: TipoAliado = {
      id: tipoEditando?.id ?? String(Date.now()),
      nombre: String(formData.get('nombre') ?? ''),
      descripcion: String(formData.get('descripcion') ?? ''),
      activo: formData.get('activo') === 'on'
    };

    setTipos((tiposActuales) =>
      tipoEditando
        ? tiposActuales.map((tipo) => (tipo.id === tipoEditando.id ? tipoGuardado : tipo))
        : [tipoGuardado, ...tiposActuales]
    );
    setModalAbierto(false);
    setTipoEditando(null);
  };

  const alternarEstadoTipo = (tipoId: string) => {
    setTipos((tiposActuales) =>
      tiposActuales.map((tipo) =>
        tipo.id === tipoId ? { ...tipo, activo: !tipo.activo } : tipo
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
        <span className="text-gray-900 font-semibold">Tipos de Aliados</span>
      </div>

      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Catalogo de Tipos de Aliados</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Gestiona los tipos disponibles para clasificar aliados dentro del sistema
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-200 flex justify-end">
          <button
            onClick={() => {
              setTipoEditando(null);
              setModalAbierto(true);
            }}
            className="bg-[#922735] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Tipo</span>
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
                {filtrosAbiertos && <DescargarFiltradoButton filename="tipos-aliados-filtrados" />}
              </div>
            </div>

            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar tipos de aliados..."
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
                    onChange={(event) => setFiltros({ estado: event.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                  >
                    <option value="">Todos</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setFiltros({ estado: '' })}
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
                    Nombre del Tipo
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <div className="flex items-center gap-2 text-white text-[11px] font-semibold uppercase tracking-wider">
                    Descripcion del Tipo
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
              {tiposFiltrados.map((tipo) => (
                <tr key={tipo.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3.5 text-sm text-gray-900 font-medium">
                    {tipo.nombre}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">
                    {tipo.descripcion}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">
                    {tipo.activo ? 'Activo' : 'Inactivo'}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="relative">
                      <button
                        onClick={() => setMenuAbierto(menuAbierto === tipo.id ? null : tipo.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {menuAbierto === tipo.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setMenuAbierto(null)}
                          />
                          <div className="absolute right-0 top-8 z-20 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                            <button
                              onClick={() => {
                                setTipoEditando(tipo);
                                setModalAbierto(true);
                                setMenuAbierto(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Pencil className="w-4 h-4 text-[#922735]" />
                              Editar
                            </button>
                            <button
                              onClick={() => alternarEstadoTipo(tipo.id)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Power className="w-4 h-4 text-[#922735]" />
                              {tipo.activo ? 'Desactivar' : 'Activar'}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {tiposFiltrados.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-500">
                    No se encontraron tipos de aliados con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            Mostrando {tiposFiltrados.length > 0 ? 1 : 0} a {tiposFiltrados.length} de {tiposFiltrados.length} entradas
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
                  {tipoEditando ? 'Editar Tipo de Aliado' : 'Nuevo Tipo de Aliado'}
                </h2>
                <button
                  onClick={() => {
                    setModalAbierto(false);
                    setTipoEditando(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {tipoEditando && (
                <h3 className="text-base font-semibold text-[#922735]">{tipoEditando.nombre}</h3>
              )}
            </div>

            <div className="p-6">
              <form className="space-y-4" onSubmit={guardarTipo}>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Nombre del tipo de aliado *
                  </label>
                  <input
                    name="nombre"
                    type="text"
                    required
                    defaultValue={tipoEditando?.nombre}
                    placeholder="Ej: Empresa Privada"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Descripcion del tipo de aliado *
                  </label>
                  <textarea
                    name="descripcion"
                    rows={3}
                    required
                    defaultValue={tipoEditando?.descripcion}
                    placeholder="Describe que aliados pertenecen a este tipo..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      name="activo"
                      type="checkbox"
                      defaultChecked={tipoEditando?.activo ?? true}
                      className="w-4 h-4 text-[#922735] border-gray-300 rounded focus:ring-[#922735]"
                    />
                    <span className="text-gray-700 text-sm font-semibold">Tipo de aliado activo</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setModalAbierto(false);
                      setTipoEditando(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#C9A961] text-white rounded-lg text-sm font-medium hover:bg-[#b89850] transition-colors"
                  >
                    {tipoEditando ? 'Guardar Cambios' : 'Crear Tipo'}
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

