import { useState } from 'react';
import {
  Home,
  ChevronRight,
  Search,
  Plus,
  Edit2,
  Trash2,
  X
} from 'lucide-react';

interface Nivel {
  id: string;
  nombre: string;
  icono: string;
  puntosMinimos: number;
  puntosMaximos: number;
  beneficios: string;
  observaciones: string;
  activo: boolean;
  fechaCreacion: string;
}

export function NivelesCatalogo() {
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nivelEditando, setNivelEditando] = useState<Nivel | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    icono: '',
    puntosMinimos: '',
    puntosMaximos: '',
    beneficios: '',
    observaciones: '',
    activo: true
  });

  const [niveles, setNiveles] = useState<Nivel[]>([
    {
      id: '1',
      nombre: 'Básico',
      icono: '⭐',
      puntosMinimos: 0,
      puntosMaximos: 999,
      beneficios: 'Acceso a eventos básicos y descuentos del 5%',
      observaciones: 'Nivel inicial para todos los usuarios nuevos',
      activo: true,
      fechaCreacion: '2026-01-15'
    },
    {
      id: '2',
      nombre: 'Protagonista',
      icono: '🏆',
      puntosMinimos: 1000,
      puntosMaximos: 2499,
      beneficios: 'Acceso prioritario a eventos, descuentos del 15%, talleres exclusivos',
      observaciones: 'Usuarios con participación activa y constante',
      activo: true,
      fechaCreacion: '2026-01-15'
    },
    {
      id: '3',
      nombre: 'Leyenda',
      icono: '👑',
      puntosMinimos: 2500,
      puntosMaximos: 999999,
      beneficios: 'Todos los beneficios anteriores, eventos VIP, embajador del programa, descuentos del 25%',
      observaciones: 'Usuarios más comprometidos con el programa',
      activo: true,
      fechaCreacion: '2026-01-15'
    }
  ]);

  const abrirModal = (nivel?: Nivel) => {
    if (nivel) {
      setNivelEditando(nivel);
      setFormData({
        nombre: nivel.nombre,
        icono: nivel.icono,
        puntosMinimos: nivel.puntosMinimos.toString(),
        puntosMaximos: nivel.puntosMaximos.toString(),
        beneficios: nivel.beneficios,
        observaciones: nivel.observaciones,
        activo: nivel.activo
      });
    } else {
      setNivelEditando(null);
      setFormData({
        nombre: '',
        icono: '',
        puntosMinimos: '',
        puntosMaximos: '',
        beneficios: '',
        observaciones: '',
        activo: true
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setNivelEditando(null);
    setFormData({
      nombre: '',
      icono: '',
      puntosMinimos: '',
      puntosMaximos: '',
      beneficios: '',
      observaciones: '',
      activo: true
    });
  };

  const guardarNivel = () => {
    if (nivelEditando) {
      // Editar nivel existente
      setNiveles(niveles.map(n =>
        n.id === nivelEditando.id
          ? {
              ...n,
              nombre: formData.nombre,
              icono: formData.icono,
              puntosMinimos: parseInt(formData.puntosMinimos),
              puntosMaximos: parseInt(formData.puntosMaximos),
              beneficios: formData.beneficios,
              observaciones: formData.observaciones,
              activo: formData.activo
            }
          : n
      ));
    } else {
      // Crear nuevo nivel
      const nuevoNivel: Nivel = {
        id: Date.now().toString(),
        nombre: formData.nombre,
        icono: formData.icono,
        puntosMinimos: parseInt(formData.puntosMinimos),
        puntosMaximos: parseInt(formData.puntosMaximos),
        beneficios: formData.beneficios,
        observaciones: formData.observaciones,
        activo: formData.activo,
        fechaCreacion: new Date().toISOString().split('T')[0]
      };
      setNiveles([...niveles, nuevoNivel]);
    }
    cerrarModal();
  };

  const eliminarNivel = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este nivel?')) {
      setNiveles(niveles.filter(n => n.id !== id));
    }
  };

  const nivelesFiltrados = niveles.filter(nivel =>
    nivel.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    nivel.beneficios.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">Catálogos</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Niveles de Usuario</span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Catálogo de Niveles de Usuario</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Administra los niveles de gamificación que los usuarios pueden alcanzar según sus puntos acumulados
        </p>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Búsqueda y Acción */}
        <div className="px-4 md:px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Búsqueda */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar nivel..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
              />
            </div>

            {/* Botón Agregar */}
            <button
              onClick={() => abrirModal()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#922735] text-white rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agregar Nivel
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#C9A961] to-[#D4B871]">
                <th className="px-4 py-3.5 text-left">
                  <div className="text-white text-[11px] font-semibold uppercase tracking-wider">
                    Nivel
                  </div>
                </th>
                <th className="px-4 py-3.5 text-left">
                  <div className="text-white text-[11px] font-semibold uppercase tracking-wider">
                    Rango de Puntos
                  </div>
                </th>
                <th className="px-4 py-3.5 text-left">
                  <div className="text-white text-[11px] font-semibold uppercase tracking-wider">
                    Beneficios
                  </div>
                </th>
                <th className="px-4 py-3.5 text-left">
                  <div className="text-white text-[11px] font-semibold uppercase tracking-wider">
                    Observaciones
                  </div>
                </th>
                <th className="px-4 py-3.5 text-center">
                  <div className="text-white text-[11px] font-semibold uppercase tracking-wider">
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
              {nivelesFiltrados.map((nivel) => (
                <tr key={nivel.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{nivel.icono}</span>
                      <span className="text-gray-900 font-medium">{nivel.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">
                    {nivel.puntosMinimos.toLocaleString()} - {nivel.puntosMaximos.toLocaleString()} pts
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 max-w-xs">
                    <div className="line-clamp-2">{nivel.beneficios}</div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 max-w-xs">
                    <div className="line-clamp-2">{nivel.observaciones}</div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      nivel.activo
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}>
                      {nivel.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => abrirModal(nivel)}
                        className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4 text-[#922735]" />
                      </button>
                      <button
                        onClick={() => eliminarNivel(nivel.id)}
                        className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-600">
            Mostrando {nivelesFiltrados.length} de {niveles.length} niveles
          </p>
        </div>
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 rounded-t-lg" style={{ backgroundColor: '#FAF7F0' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 uppercase">
                  {nivelEditando ? 'Editar Nivel' : 'Agregar Nivel'}
                </h2>
                <button
                  onClick={cerrarModal}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {nivelEditando && (
                <h3 className="text-base font-semibold text-[#922735]">{nivelEditando.nombre}</h3>
              )}
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {/* Nombre del nivel */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Nombre del nivel *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Básico, Protagonista, Leyenda"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                  />
                </div>

                {/* Icono */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Icono / Emoji *
                  </label>
                  <input
                    type="text"
                    value={formData.icono}
                    onChange={(e) => setFormData({ ...formData, icono: e.target.value })}
                    placeholder="Ej: ⭐ 🏆 👑"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    maxLength={2}
                  />
                  <p className="text-xs text-gray-500 mt-1">Copia y pega un emoji</p>
                </div>

                {/* Rango de puntos */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Puntos mínimos *
                    </label>
                    <input
                      type="number"
                      value={formData.puntosMinimos}
                      onChange={(e) => setFormData({ ...formData, puntosMinimos: e.target.value })}
                      placeholder="0"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Puntos máximos *
                    </label>
                    <input
                      type="number"
                      value={formData.puntosMaximos}
                      onChange={(e) => setFormData({ ...formData, puntosMaximos: e.target.value })}
                      placeholder="999"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      min="0"
                    />
                  </div>
                </div>

                {/* Beneficios */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Beneficios del nivel *
                  </label>
                  <textarea
                    value={formData.beneficios}
                    onChange={(e) => setFormData({ ...formData, beneficios: e.target.value })}
                    placeholder="Describe los beneficios que obtienen los usuarios en este nivel..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                {/* Observaciones */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Observaciones
                  </label>
                  <textarea
                    value={formData.observaciones}
                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                    placeholder="Notas adicionales sobre este nivel..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    rows={2}
                  />
                </div>

                {/* Estado */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.activo}
                      onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                      className="w-4 h-4 text-[#922735] border-gray-300 rounded focus:ring-[#922735]"
                    />
                    <span className="text-sm text-gray-700 font-medium">Nivel activo</span>
                  </label>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={cerrarModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={guardarNivel}
                    disabled={!formData.nombre || !formData.icono || !formData.puntosMinimos || !formData.puntosMaximos || !formData.beneficios}
                    className="px-4 py-2 bg-[#C9A961] text-white rounded-lg text-sm font-medium hover:bg-[#b89850] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {nivelEditando ? 'Guardar cambios' : 'Crear nivel'}
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

