import { Home, ChevronRight, Mail, Phone, MapPin, Calendar, Clock, User, Coins } from 'lucide-react';
import { useState } from 'react';

interface UsuarioJovenDetalleProps {
  usuario: {
    id: string;
    nombre: string;
    correo: string;
    telefono: string;
    municipio: string;
    edad: number;
    puntos: number;
    checkIns: number;
    nivel: 'basico' | 'protagonista' | 'leyenda';
    estado: 'activo' | 'pendiente' | 'en-revision' | 'inactivo';
    fechaRegistro: string;
  };
  onVolver: () => void;
}

type TabType = 'perfil' | 'puntos';

export function UsuarioJovenDetalle({ usuario, onVolver }: UsuarioJovenDetalleProps) {
  const [activeTab, setActiveTab] = useState<TabType>('perfil');

  // Obtener iniciales del nombre
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  const getEstadoBadge = (estado: string) => {
    const badges = {
      'activo': { bg: 'bg-green-100', text: 'text-green-700', label: 'Activo' },
      'pendiente': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendiente' },
      'en-revision': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'En Revisión' },
      'inactivo': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Inactivo' }
    };
    return badges[estado as keyof typeof badges] || badges.activo;
  };

  const estadoBadge = getEstadoBadge(usuario.estado);
  const canjes = Math.floor(usuario.checkIns / 3); // Mock: 3 check-ins = 1 canje

  const getNivelBadge = (nivel: 'basico' | 'protagonista' | 'leyenda') => {
    const badges = {
      'basico': {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        icon: '⭐',
        label: 'Básico'
      },
      'protagonista': {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        icon: '🏆',
        label: 'Protagonista'
      },
      'leyenda': {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        icon: '👑',
        label: 'Leyenda'
      }
    };
    return badges[nivel];
  };

  const nivelBadge = getNivelBadge(usuario.nivel);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <button onClick={onVolver} className="text-gray-600 hover:text-[#922735] transition-colors">
          Usuario Joven
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Detalle</span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Detalle de Usuario Joven</h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Consulta y gestiona la información completa del usuario registrado en el programa Pasaporte Joven
        </p>
      </div>

      {/* Contenido */}
      <div className="space-y-6">
        {/* Información principal */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Perfil compacto */}
              <div className="flex items-center gap-4 flex-1">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-[#922735] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg font-bold">
                    {getInitials(usuario.nombre)}
                  </span>
                </div>

                {/* Info básica */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-lg font-bold text-gray-900">{usuario.nombre}</h3>
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${nivelBadge.bg} ${nivelBadge.text} flex items-center gap-1`}>
                      <span>{nivelBadge.icon}</span>
                      {nivelBadge.label}
                    </span>
                  </div>

                  {/* Detalles de contacto en una línea */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span>{usuario.correo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{usuario.telefono}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>Cd. {usuario.municipio}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{usuario.edad} años</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>Último acceso: {usuario.fechaRegistro}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estadísticas compactas */}
              <div className="flex gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#922735]">{usuario.puntos.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Puntos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#922735]">{usuario.checkIns}</div>
                  <div className="text-xs text-gray-600">Check-ins</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#922735]">{canjes}</div>
                  <div className="text-xs text-gray-600">Canjes</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tab headers */}
          <div className="border-b border-gray-200" style={{ backgroundColor: '#FAF7F0' }}>
            <div className="flex flex-wrap gap-6 px-4">
              <button
                onClick={() => setActiveTab('perfil')}
                className={`flex items-center gap-2 px-2 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'perfil'
                    ? 'text-[#922735]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="w-4 h-4" />
                Perfil
                {activeTab === 'perfil' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#922735]"></div>
                )}
              </button>

              <button
                onClick={() => setActiveTab('puntos')}
                className={`flex items-center gap-2 px-2 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'puntos'
                    ? 'text-[#922735]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Coins className="w-4 h-4" />
                Puntos
                {activeTab === 'puntos' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#922735]"></div>
                )}
              </button>
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'perfil' && (
              <div>
                <h3 className="text-gray-900 font-semibold text-base mb-4">Datos de cuenta</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {/* Nombre completo */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Nombre completo</span>
                    <span className="text-sm text-gray-900 font-medium">{usuario.nombre}</span>
                  </div>

                  {/* Correo electrónico */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Correo electrónico</span>
                    <span className="text-sm text-gray-900 font-medium">{usuario.correo}</span>
                  </div>

                  {/* Teléfono */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Teléfono</span>
                    <span className="text-sm text-gray-900 font-medium">{usuario.telefono}</span>
                  </div>

                  {/* Municipio */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Municipio</span>
                    <span className="text-sm text-gray-900 font-medium">Cd. {usuario.municipio}</span>
                  </div>

                  {/* Edad */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Edad</span>
                    <span className="text-sm text-gray-900 font-medium">{usuario.edad} años</span>
                  </div>

                  {/* Estado de cuenta */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Estado de cuenta</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoBadge(usuario.estado).bg} ${getEstadoBadge(usuario.estado).text}`}>
                      {getEstadoBadge(usuario.estado).label}
                    </span>
                  </div>

                  {/* Correo verificado */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Correo verificado</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Verificado
                    </span>
                  </div>

                  {/* Fecha de registro */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Fecha de registro</span>
                    <span className="text-sm text-gray-900 font-medium">{usuario.fechaRegistro}</span>
                  </div>

                  {/* Última actividad */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Última actividad</span>
                    <span className="text-sm text-gray-900 font-medium">{usuario.fechaRegistro}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'puntos' && (
              <div>
                {/* Copy descriptivo */}
                <div className="mb-6">
                  <h3 className="text-gray-900 font-semibold text-base mb-2">Gestión de Puntos</h3>
                  <p className="text-gray-600 text-sm">
                    Visualiza el historial completo de actividad del usuario: puntos acumulados por check-ins en eventos y actividades,
                    canjes realizados en aliados comerciales, y aprovechamiento de promociones y descuentos disponibles en el programa.
                  </p>
                </div>

                {/* Resumen de puntos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Saldo disponible */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-[#922735] mb-2">{usuario.puntos.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Saldo disponible</div>
                  </div>

                  {/* Total acumulados */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">+{(usuario.puntos + (canjes * 100)).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total acumulados</div>
                  </div>

                  {/* Total canjeados */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-gray-600 mb-2">-{(canjes * 100).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total canjeados</div>
                  </div>
                </div>

                {/* Historial de actividad */}
                <div>
                  <h3 className="text-gray-900 font-semibold text-base mb-4">Historial de actividad</h3>

                  <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actividad</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aliado / Lugar</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoría</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Puntos</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">2026-05-14 10:15</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            <div className="font-medium">Taller de habilidades digitales</div>
                            <div className="text-xs text-gray-500 mt-0.5">Asistencia y participación</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            <div className="font-medium">Casa de la Cultura</div>
                            <div className="text-xs text-gray-500 mt-0.5">Victoria, Tamaulipas</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Capacitación
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Check-in
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700 whitespace-nowrap">+100</td>
                        </tr>

                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">2026-05-10 14:30</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            <div className="font-medium">15% de descuento en bebidas</div>
                            <div className="text-xs text-gray-500 mt-0.5">Promoción aprovechada</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            <div className="font-medium">Café Nómada</div>
                            <div className="text-xs text-gray-500 mt-0.5">Tampico, Tamaulipas</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Gastronomía
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Canje
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700 whitespace-nowrap">-200</td>
                        </tr>

                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">2026-05-02 09:00</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            <div className="font-medium">Jornada de orientación vocacional</div>
                            <div className="text-xs text-gray-500 mt-0.5">Evento comunitario</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            <div className="font-medium">INJUVE Reynosa</div>
                            <div className="text-xs text-gray-500 mt-0.5">Reynosa, Tamaulipas</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Orientación
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Check-in
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700 whitespace-nowrap">+50</td>
                        </tr>

                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">2026-04-28 16:45</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            <div className="font-medium">Clase muestra de CrossFit</div>
                            <div className="text-xs text-gray-500 mt-0.5">Primera visita</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            <div className="font-medium">Gimnasio Norte</div>
                            <div className="text-xs text-gray-500 mt-0.5">Matamoros, Tamaulipas</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Deportes
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Check-in
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700 whitespace-nowrap">+30</td>
                        </tr>

                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">2026-04-10 11:00</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            <div className="font-medium">Clase de yoga sin costo</div>
                            <div className="text-xs text-gray-500 mt-0.5">Beneficio canjeado</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            <div className="font-medium">Centro Wellness Vida</div>
                            <div className="text-xs text-gray-500 mt-0.5">Victoria, Tamaulipas</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Deportes
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Canje
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700 whitespace-nowrap">-150</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

