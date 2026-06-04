import { Home, ChevronRight, Save, X, ChevronLeft, Building2, MapPin, Phone, Mail, Tag, Plus, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';
import { MapaPicker } from './MapaPicker';
import { getCategoriasActivasPorSeccion, getClasificacionesActivas } from '../data/catalogos';

interface RangoHorario {
  id: string;
  horaInicio: string;
  horaFin: string;
}

interface ConfiguracionDia {
  dia: string;
  activo: boolean;
  rangosHorarios: RangoHorario[];
}

interface NuevoBeneficioAliadoProps {
  onVolver: () => void;
  aliado: any;
  beneficio?: any;
}

type TabType = 'informacion' | 'ubicacion' | 'vigencia' | 'detalles' | 'movil';

export function NuevoBeneficioAliado({ onVolver, aliado, beneficio }: NuevoBeneficioAliadoProps) {
  const esEdicion = !!beneficio;
  const [tabActivo, setTabActivo] = useState<TabType>('informacion');
  const [requiereInscripcion, setRequiereInscripcion] = useState(false);
  const [tieneCosto, setTieneCosto] = useState(false);
  const [esPermanente, setEsPermanente] = useState(false);
  const [todoElDia, setTodoElDia] = useState(false);
  const clasificacionesActivas = getClasificacionesActivas();
  const categoriasBeneficios = getCategoriasActivasPorSeccion('beneficios');

  // Estados para ubicación
  const [direccion, setDireccion] = useState(aliado.direccion || '');
  const [municipio, setMunicipio] = useState('');
  const [coordenadas, setCoordenadas] = useState<{ lat: number; lng: number }>({
    lat: 23.7369,
    lng: -99.1411
  });

  const diasSemana = [
    { id: 'lunes', nombre: 'Lunes', abrev: 'L' },
    { id: 'martes', nombre: 'Martes', abrev: 'M' },
    { id: 'miercoles', nombre: 'Miércoles', abrev: 'X' },
    { id: 'jueves', nombre: 'Jueves', abrev: 'J' },
    { id: 'viernes', nombre: 'Viernes', abrev: 'V' },
    { id: 'sabado', nombre: 'Sábado', abrev: 'S' },
    { id: 'domingo', nombre: 'Domingo', abrev: 'D' }
  ];

  const [configuracionDias, setConfiguracionDias] = useState<ConfiguracionDia[]>(
    diasSemana.map(dia => ({
      dia: dia.id,
      activo: false,
      rangosHorarios: []
    }))
  );

  const toggleDia = (diaId: string) => {
    setConfiguracionDias(prev => prev.map(config => {
      if (config.dia === diaId) {
        const nuevoActivo = !config.activo;
        return {
          ...config,
          activo: nuevoActivo,
          rangosHorarios: nuevoActivo && config.rangosHorarios.length === 0
            ? [{ id: Date.now().toString(), horaInicio: '09:00', horaFin: '18:00' }]
            : config.rangosHorarios
        };
      }
      return config;
    }));
  };

  const agregarRangoHorario = (diaId: string) => {
    setConfiguracionDias(prev => prev.map(config => {
      if (config.dia === diaId) {
        return {
          ...config,
          rangosHorarios: [
            ...config.rangosHorarios,
            { id: Date.now().toString(), horaInicio: '09:00', horaFin: '18:00' }
          ]
        };
      }
      return config;
    }));
  };

  const eliminarRangoHorario = (diaId: string, rangoId: string) => {
    setConfiguracionDias(prev => prev.map(config => {
      if (config.dia === diaId) {
        return {
          ...config,
          rangosHorarios: config.rangosHorarios.filter(rango => rango.id !== rangoId)
        };
      }
      return config;
    }));
  };

  const actualizarRangoHorario = (diaId: string, rangoId: string, campo: 'horaInicio' | 'horaFin', valor: string) => {
    setConfiguracionDias(prev => prev.map(config => {
      if (config.dia === diaId) {
        return {
          ...config,
          rangosHorarios: config.rangosHorarios.map(rango => {
            if (rango.id === rangoId) {
              return { ...rango, [campo]: valor };
            }
            return rango;
          })
        };
      }
      return config;
    }));
  };

  const seleccionarTodosDias = () => {
    setConfiguracionDias(prev => prev.map(config => ({
      ...config,
      activo: true,
      rangosHorarios: config.rangosHorarios.length === 0
        ? [{ id: Date.now().toString(), horaInicio: '09:00', horaFin: '18:00' }]
        : config.rangosHorarios
    })));
  };

  const deseleccionarTodosDias = () => {
    setConfiguracionDias(prev => prev.map(config => ({
      ...config,
      activo: false
    })));
  };

  const tabs = [
    { id: 'informacion' as TabType, label: 'Información', numero: 1 },
    { id: 'ubicacion' as TabType, label: 'Ubicación', numero: 2 },
    { id: 'vigencia' as TabType, label: 'Vigencia', numero: 3 },
    { id: 'detalles' as TabType, label: 'Detalles', numero: 4 },
    { id: 'movil' as TabType, label: 'App Móvil', numero: 5 }
  ];

  const tabActualIndex = tabs.findIndex(t => t.id === tabActivo);
  const esPrimerTab = tabActualIndex === 0;
  const esUltimoTab = tabActualIndex === tabs.length - 1;

  const handleSiguiente = () => {
    if (!esUltimoTab) {
      setTabActivo(tabs[tabActualIndex + 1].id);
    }
  };

  const handleAtras = () => {
    if (!esPrimerTab) {
      setTabActivo(tabs[tabActualIndex - 1].id);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <button onClick={onVolver} className="text-gray-600 hover:text-gray-900">
          Beneficios Disponibles
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">{esEdicion ? 'Editar Beneficio' : 'Nuevo Beneficio'}</span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">
          {esEdicion ? 'Editar Beneficio' : 'Registrar Nuevo Beneficio'}
        </h1>
        <p className="text-gray-600 text-xs md:text-sm">
          {esEdicion
            ? 'Actualiza la información del beneficio'
            : 'Registra un nuevo beneficio, promoción o descuento para el aliado seleccionado'
          }
        </p>
      </div>

      {/* Contenedor de información del aliado */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
        <div className="flex items-start gap-4">
          {/* Icono del aliado */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-[#922735] to-[#7a1f2d] rounded-lg flex items-center justify-center shadow-md">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Información del aliado */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{aliado.nombre}</h2>

            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs text-gray-600 mb-3">
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#922735]" />
                <span>{aliado.tipo || 'Tipo de aliado'}</span>
              </div>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#922735]" />
                <span>{aliado.categoria || 'Categoría'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
              {aliado.telefono && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{aliado.telefono}</span>
                </div>
              )}
              {aliado.correo && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{aliado.correo}</span>
                </div>
              )}
              {aliado.direccion && (
                <div className="flex items-center gap-1.5 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{aliado.direccion}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor del formulario con tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tab headers */}
        <div className="border-b border-gray-200" style={{ backgroundColor: '#FAF7F0' }}>
          <div className="flex flex-wrap gap-6 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTabActivo(tab.id)}
                className={`flex items-center gap-2 px-2 py-3 text-sm font-medium transition-colors relative ${
                  tabActivo === tab.id
                    ? 'text-[#922735]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  tabActivo === tab.id ? 'bg-[#922735] text-white' : 'bg-gray-300 text-gray-700'
                }`}>
                  {tab.numero}
                </span>
                {tab.label}
                {tabActivo === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#922735]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <form className="p-6">
          {/* Tab: Información del Beneficio */}
          {tabActivo === 'informacion' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-gray-900 font-semibold text-base mb-2">Información del Beneficio</h2>
                <p className="text-gray-600 text-xs mb-4">
                  Proporciona los datos generales del beneficio o descuento
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Nombre del beneficio *
                  </label>
                  <input
                    type="text"
                    defaultValue={beneficio?.nombre}
                    placeholder="Ej: 2x1 en entradas"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    required
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Nombre corto y descriptivo del beneficio
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      clasificacion *
                    </label>
                    <select
                      defaultValue={beneficio?.clasificacion}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                      required
                    >
                      <option value="">Seleccionar clasificacion</option>
                      {clasificacionesActivas.map((clasificacion) => (
                        <option key={clasificacion.id} value={clasificacion.nombre}>
                          {clasificacion.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Categoría *
                    </label>
                    <select
                      defaultValue={beneficio?.categoria}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      {categoriasBeneficios.map((categoria) => (
                        <option key={categoria.id} value={categoria.nombre}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Dirigido a nivel *
                    </label>
                    <select
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                      required
                    >
                      <option value="">Seleccionar nivel</option>
                      <option value="todos">Todos los niveles</option>
                      <option value="basico">Básico</option>
                      <option value="protagonista">Protagonista</option>
                      <option value="leyenda">Leyenda</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Descripción detallada *
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={beneficio?.descripcion}
                    placeholder="Describe los detalles del beneficio, cómo funciona, requisitos, etc..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    required
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Información completa sobre el beneficio
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Ubicación */}
          {tabActivo === 'ubicacion' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-gray-900 font-semibold text-base mb-2">Ubicación del Beneficio</h2>
                <p className="text-gray-600 text-xs mb-4">
                  Define dónde se encuentra disponible este beneficio
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Municipio *
                    </label>
                    <select
                      value={municipio}
                      onChange={(e) => setMunicipio(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                      required
                    >
                      <option value="">Seleccionar municipio</option>
                      <option value="cd-victoria">Cd. Victoria</option>
                      <option value="tampico">Tampico</option>
                      <option value="reynosa">Reynosa</option>
                      <option value="matamoros">Matamoros</option>
                      <option value="nuevo-laredo">Nuevo Laredo</option>
                      <option value="madero">Cd. Madero</option>
                      <option value="altamira">Altamira</option>
                      <option value="mante">El Mante</option>
                      <option value="rio-bravo">Río Bravo</option>
                      <option value="valle-hermoso">Valle Hermoso</option>
                      <option value="miguel-aleman">Miguel Alemán</option>
                      <option value="otro">Otro municipio</option>
                    </select>
                    <p className="text-gray-500 text-xs mt-1">
                      Ubicación del beneficio en Tamaulipas
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Código postal
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 87000"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Código postal de la ubicación
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Ej: Calle Hidalgo #123, Centro"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    required
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Dirección completa donde se puede obtener el beneficio
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Referencias adicionales
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej: Frente al parque central, al lado de..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Puntos de referencia para facilitar la ubicación
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Link de Google Maps
                    </label>
                    <input
                      type="text"
                      placeholder="Pega aquí el enlace de Google Maps"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Pega el enlace completo de Google Maps para obtener las coordenadas automáticamente
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Rango de cobertura para canje de beneficio
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 5 km a la redonda"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Define el alcance donde los usuarios podran realizar el canje
                    </p>
                  </div>

                  <MapaPicker
                    onLocationSelect={(lat, lng) => setCoordenadas({ lat, lng })}
                    initialPosition={coordenadas}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab: Vigencia */}
          {tabActivo === 'vigencia' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-gray-900 font-semibold text-base mb-2">Configuración de Vigencia</h2>
                <p className="text-gray-600 text-xs mb-4">
                  Define cuándo y en qué horarios estará disponible el beneficio
                </p>
              </div>

              {/* Fechas de vigencia */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#922735]" />
                  Periodo de Vigencia
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-2">
                      Fecha de inicio *
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      required={!esPermanente}
                      disabled={esPermanente}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-2">
                      Fecha de término
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      disabled={esPermanente}
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={esPermanente}
                    onChange={(e) => setEsPermanente(e.target.checked)}
                    className="w-4 h-4 text-[#922735] border-gray-300 rounded focus:ring-[#922735]"
                  />
                  <span className="text-gray-700 text-sm font-semibold">Beneficio permanente (sin fecha de término)</span>
                </label>
              </div>

              {/* Configuración de días y horarios */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Días y Horarios de Disponibilidad</h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={seleccionarTodosDias}
                      className="text-xs text-[#922735] hover:underline font-semibold"
                    >
                      Todos
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      type="button"
                      onClick={deseleccionarTodosDias}
                      className="text-xs text-gray-600 hover:underline font-semibold"
                    >
                      Ninguno
                    </button>
                  </div>
                </div>

                {/* Selector de días */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {diasSemana.map(dia => {
                    const config = configuracionDias.find(c => c.dia === dia.id);
                    return (
                      <button
                        key={dia.id}
                        type="button"
                        onClick={() => toggleDia(dia.id)}
                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                          config?.activo
                            ? 'bg-[#922735] text-white shadow-md'
                            : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
                        }`}
                        title={dia.nombre}
                      >
                        {dia.abrev}
                      </button>
                    );
                  })}
                </div>

                {/* Configuración de horarios por día */}
                <div className="space-y-3">
                  {configuracionDias.filter(config => config.activo).map(config => {
                    const diaInfo = diasSemana.find(d => d.id === config.dia);
                    return (
                      <div key={config.dia} className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-900">{diaInfo?.nombre}</span>
                          <button
                            type="button"
                            onClick={() => agregarRangoHorario(config.dia)}
                            className="text-xs text-[#922735] hover:underline font-semibold flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Agregar horario
                          </button>
                        </div>

                        {config.rangosHorarios.length === 0 ? (
                          <p className="text-xs text-gray-500 italic">Sin horarios configurados</p>
                        ) : (
                          <div className="space-y-2">
                            {config.rangosHorarios.map(rango => (
                              <div key={rango.id} className="flex items-center gap-2">
                                <input
                                  type="time"
                                  value={rango.horaInicio}
                                  onChange={(e) => actualizarRangoHorario(config.dia, rango.id, 'horaInicio', e.target.value)}
                                  className="px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                                />
                                <span className="text-gray-500 text-xs">a</span>
                                <input
                                  type="time"
                                  value={rango.horaFin}
                                  onChange={(e) => actualizarRangoHorario(config.dia, rango.id, 'horaFin', e.target.value)}
                                  className="px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                                />
                                {config.rangosHorarios.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => eliminarRangoHorario(config.dia, rango.id)}
                                    className="p-1 hover:bg-red-50 rounded transition-colors"
                                    title="Eliminar horario"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {configuracionDias.filter(c => c.activo).length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">Selecciona al menos un día para configurar los horarios</p>
                    </div>
                  )}
                </div>

                {/* Opción todo el día */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={todoElDia}
                      onChange={(e) => setTodoElDia(e.target.checked)}
                      className="w-4 h-4 text-[#922735] border-gray-300 rounded focus:ring-[#922735]"
                    />
                    <span className="text-gray-700 text-sm font-semibold">Disponible todo el día (24 horas)</span>
                  </label>
                  <p className="text-gray-500 text-xs mt-1 ml-6">
                    El beneficio estará disponible las 24 horas en los días seleccionados
                  </p>
                </div>
              </div>

              {/* Resumen de configuración */}
              {configuracionDias.some(c => c.activo) && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Resumen de Disponibilidad</h4>
                  <div className="text-xs text-gray-800 space-y-1">
                    {configuracionDias.filter(c => c.activo).map(config => {
                      const diaInfo = diasSemana.find(d => d.id === config.dia);
                      return (
                        <div key={config.dia} className="flex items-start gap-2">
                          <span className="font-semibold min-w-[80px]">{diaInfo?.nombre}:</span>
                          <span>
                            {todoElDia ? '24 horas' : (
                              config.rangosHorarios.length > 0
                                ? config.rangosHorarios.map(r => `${r.horaInicio} - ${r.horaFin}`).join(', ')
                                : 'Sin horarios'
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab: Detalles Adicionales */}
          {tabActivo === 'detalles' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-gray-900 font-semibold text-base mb-2">Detalles Adicionales</h2>
                <p className="text-gray-600 text-xs mb-4">
                  Información complementaria sobre el beneficio
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Cantidad de usos
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                  >
                    <option value="ilimitado">Ilimitado</option>
                    <option value="1">Una vez por usuario</option>
                    <option value="2">Dos veces por usuario</option>
                    <option value="5">Cinco veces por usuario</option>
                  </select>
                  <p className="text-gray-500 text-xs mt-1">
                    Veces que un usuario puede usar este beneficio
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Cupo máximo
                  </label>
                  <input
                    type="number"
                    placeholder="Ej: 100"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Opcional - Número máximo de participantes
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Puntos requeridos
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    defaultValue="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Puntos que el usuario debe tener para acceder (0 = sin requisito)
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Términos y condiciones
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Restricciones, limitaciones o términos especiales..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Opcional - Condiciones especiales del beneficio
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Configuración App Móvil */}
          {tabActivo === 'movil' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-gray-900 font-semibold text-base mb-2">Configuración para App Móvil</h2>
                <p className="text-gray-600 text-xs mb-4">
                  Define cómo se mostrará este beneficio en la aplicación móvil del Pasaporte Joven Tamaulipas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Imagen del beneficio *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#922735] file:text-white hover:file:bg-[#7a1f2d]"
                    required
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Imagen principal que se mostrará en la app móvil (recomendado: 1200x630px)
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={requiereInscripcion}
                      onChange={(e) => setRequiereInscripcion(e.target.checked)}
                      className="w-4 h-4 text-[#922735] border-gray-300 rounded focus:ring-[#922735]"
                    />
                    <span className="text-gray-700 text-sm font-semibold">Requiere inscripción previa</span>
                  </label>
                  <p className="text-gray-500 text-xs mt-1 ml-6">
                    Los jóvenes deberán inscribirse antes de obtener el beneficio
                  </p>
                </div>

                {requiereInscripcion && (
                  <>
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Fecha límite de inscripción
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      />
                      <p className="text-gray-500 text-xs mt-1">
                        Último día para inscribirse
                      </p>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Link de inscripción
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      />
                      <p className="text-gray-500 text-xs mt-1">
                        URL del formulario de inscripción
                      </p>
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={tieneCosto}
                      onChange={(e) => setTieneCosto(e.target.checked)}
                      className="w-4 h-4 text-[#922735] border-gray-300 rounded focus:ring-[#922735]"
                    />
                    <span className="text-gray-700 text-sm font-semibold">Tiene costo</span>
                  </label>
                  <p className="text-gray-500 text-xs mt-1 ml-6">
                    El beneficio tiene algún costo o pago
                  </p>
                </div>

                {tieneCosto && (
                  <>
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Costo regular
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                        />
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        Precio normal sin descuento
                      </p>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Costo con Pasaporte Joven
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                        />
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        Precio especial para portadores del pasaporte
                      </p>
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Teléfono de contacto
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej: (834) 123-4567"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Número de contacto para información del beneficio
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Instrucciones para canjear
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ej: Presentar el código QR del pasaporte joven en caja antes de pagar..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Pasos que debe seguir el joven para aprovechar el beneficio
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Botones de navegación */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
            {/* Botón izquierdo: Cancelar en el primer tab, Atrás en los demás */}
            {esPrimerTab ? (
              <button
                type="button"
                onClick={onVolver}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAtras}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Atrás
              </button>
            )}

            {/* Botones de la derecha */}
            <div className="flex items-center gap-3">
              {/* Botón Guardar como borrador - solo en tabs que no son el primero */}
              {!esPrimerTab && (
                <button
                  type="button"
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Guardar como borrador
                </button>
              )}

              {/* Botón Siguiente o Guardar beneficio */}
              {!esUltimoTab ? (
                <button
                  type="button"
                  onClick={handleSiguiente}
                  className="px-6 py-2.5 bg-[#922735] text-white rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors flex items-center gap-2"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C9A961] text-white rounded-lg text-sm font-medium hover:bg-[#b89850] transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Guardar beneficio
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


