import { useState } from 'react';
import { Home, ChevronRight, Save, X, Building, User, MapPin, FileText, ChevronLeft, ChevronDown } from 'lucide-react';
import { MapaPicker } from './MapaPicker';

interface NuevoAliadoProps {
  onVolver: () => void;
  aliado?: any;
}

type TabType = 'basica' | 'contacto' | 'ubicacion' | 'convenio';

export function NuevoAliado({ onVolver, aliado }: NuevoAliadoProps) {
  const esEdicion = !!aliado;
  const [activeTab, setActiveTab] = useState<TabType>('basica');
  const categoriasDisponibles = [
    'EducaciÃ³n',
    'Salud',
    'Cultura',
    'Deportes',
    'TecnologÃ­a',
    'Empleo',
    'Comercio',
    'Entretenimiento'
  ];
  const categoriasIniciales = Array.isArray(aliado?.categoria)
    ? aliado.categoria
    : aliado?.categoria
      ? String(aliado.categoria).split(',').map((categoria) => categoria.trim()).filter(Boolean)
      : [];
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>(categoriasIniciales);
  const [comboCategoriasAbierto, setComboCategoriasAbierto] = useState(false);
  const [coordenadas, setCoordenadas] = useState<{ lat: number; lng: number } | null>(
    aliado?.coordenadas || null
  );
  const [googleMapsLink, setGoogleMapsLink] = useState('');

  const tabs = [
    { id: 'basica' as TabType, label: 'Información Básica', icon: Building },
    { id: 'contacto' as TabType, label: 'Información de Contacto', icon: User },
    { id: 'ubicacion' as TabType, label: 'Ubicación', icon: MapPin },
    { id: 'convenio' as TabType, label: 'Información del Convenio', icon: FileText }
  ];

  const getCurrentTabIndex = () => tabs.findIndex(tab => tab.id === activeTab);
  const isFirstTab = getCurrentTabIndex() === 0;
  const isLastTab = getCurrentTabIndex() === tabs.length - 1;

  const goToNextTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const extraerCoordenadasDeLink = (link: string) => {
    try {
      // Patrones comunes de Google Maps
      // https://www.google.com/maps?q=23.7369,-99.1411
      // https://www.google.com/maps/@23.7369,-99.1411,15z
      // https://maps.google.com/?q=23.7369,-99.1411

      const patterns = [
        /@(-?\d+\.\d+),(-?\d+\.\d+)/,  // @lat,lng
        /q=(-?\d+\.\d+),(-?\d+\.\d+)/,  // q=lat,lng
        /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/, // !3dlat!4dlng
      ];

      for (const pattern of patterns) {
        const match = link.match(pattern);
        if (match) {
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[2]);
          if (!isNaN(lat) && !isNaN(lng)) {
            setCoordenadas({ lat, lng });
            return true;
          }
        }
      }

      alert('No se pudieron extraer las coordenadas del link. Verifica que sea un link válido de Google Maps.');
      return false;
    } catch (error) {
      console.error('Error al extraer coordenadas:', error);
      alert('Error al procesar el link de Google Maps.');
      return false;
    }
  };

  const handleGoogleMapsLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setGoogleMapsLink(link);
    if (link.trim()) {
      extraerCoordenadasDeLink(link);
    }
  };

  const toggleCategoria = (categoria: string) => {
    setCategoriasSeleccionadas((actuales) =>
      actuales.includes(categoria)
        ? actuales.filter((categoriaSeleccionada) => categoriaSeleccionada !== categoria)
        : [...actuales, categoria]
    );
  };

  const quitarCategoria = (categoria: string) => {
    setCategoriasSeleccionadas((actuales) =>
      actuales.filter((categoriaSeleccionada) => categoriaSeleccionada !== categoria)
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <button onClick={onVolver} className="text-gray-600 hover:text-gray-900">
          Aliados
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">
          {esEdicion ? 'Editar Aliado' : 'Nuevo Aliado'}
        </span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">
          {esEdicion ? 'Editar Aliado' : 'Registrar Nuevo Aliado'}
        </h1>
        <p className="text-gray-600 text-xs md:text-sm">
          {esEdicion
            ? 'Actualiza la información del aliado y sus beneficios'
            : 'Completa la información del nuevo aliado para registrarlo en el sistema'
          }
        </p>
      </div>

      {/* Formulario con Tabs */}
      <form className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tab headers */}
          <div className="border-b border-gray-200" style={{ backgroundColor: '#FAF7F0' }}>
            <div className="flex flex-wrap gap-6 px-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-2 py-3 text-sm font-medium transition-colors relative ${
                      activeTab === tab.id
                        ? 'text-[#922735]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#922735]"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {/* Tab 1: Información Básica */}
            {activeTab === 'basica' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-900 font-semibold text-base mb-1">Datos Generales</h3>
                  <p className="text-gray-600 text-xs mb-4">
                    Proporciona los datos generales del aliado
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Nombre del aliado *
                    </label>
                    <input
                      type="text"
                      defaultValue={aliado?.nombre}
                      placeholder="Ej: Secretaría de Desarrollo Social"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      required
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Nombre completo o razón social del aliado
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Tipo de aliado *
                    </label>
                    <select
                      defaultValue={aliado?.tipo}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                      required
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="Oficina de Gobierno">Oficina de Gobierno</option>
                      <option value="Empresa Privada">Empresa Privada</option>
                      <option value="Asociación Civil">Asociación Civil</option>
                      <option value="Institución Educativa">Institución Educativa</option>
                      <option value="Centro Cultural">Centro Cultural</option>
                      <option value="Centro Deportivo">Centro Deportivo</option>
                      <option value="Comercio Local">Comercio Local</option>
                      <option value="Centro de Salud">Centro de Salud</option>
                    </select>
                    <p className="text-gray-500 text-xs mt-1">
                      clasificacion del tipo de aliado
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Categoría *
                    </label>
                    <input
                      type="hidden"
                      name="categoria"
                      value={categoriasSeleccionadas.join(', ')}
                      required
                    />
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setComboCategoriasAbierto(!comboCategoriasAbierto)}
                        className="w-full min-h-[42px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white flex items-center justify-between gap-2 text-left"
                      >
                        <div className="flex flex-wrap gap-2 flex-1">
                          {categoriasSeleccionadas.length > 0 ? (
                            categoriasSeleccionadas.map((categoria) => (
                              <span
                                key={categoria}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#FAF7F0] text-[#922735] text-xs font-semibold"
                              >
                                {categoria}
                                <span
                                  role="button"
                                  tabIndex={0}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    quitarCategoria(categoria);
                                  }}
                                  onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                      event.preventDefault();
                                      event.stopPropagation();
                                      quitarCategoria(categoria);
                                    }
                                  }}
                                  className="rounded hover:bg-[#eadfcd] p-0.5"
                                  aria-label={`Quitar ${categoria}`}
                                >
                                  <X className="w-3 h-3" />
                                </span>
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500">Seleccionar categoria</span>
                          )}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${comboCategoriasAbierto ? 'rotate-180' : ''}`} />
                      </button>

                      {comboCategoriasAbierto && (
                        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-56 overflow-y-auto">
                          {categoriasDisponibles.map((categoria) => (
                            <button
                              key={categoria}
                              type="button"
                              onClick={() => toggleCategoria(categoria)}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                            >
                              <span className={`w-4 h-4 rounded border flex items-center justify-center ${
                                categoriasSeleccionadas.includes(categoria)
                                  ? 'bg-[#922735] border-[#922735]'
                                  : 'border-gray-300'
                              }`}>
                                {categoriasSeleccionadas.includes(categoria) && (
                                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                )}
                              </span>
                              <span className="text-gray-700">{categoria}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <select
                      name="categoriaSeleccionMultiple"
                      multiple
                      defaultValue={Array.isArray(aliado?.categoria) ? aliado.categoria : aliado?.categoria ? [aliado.categoria] : []}
                      className="hidden"
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="Educación">Educación</option>
                      <option value="Salud">Salud</option>
                      <option value="Cultura">Cultura</option>
                      <option value="Deportes">Deportes</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Empleo">Empleo</option>
                      <option value="Comercio">Comercio</option>
                      <option value="Entretenimiento">Entretenimiento</option>
                    </select>
                    <p className="text-gray-500 text-xs mt-1">
                      Categoría de servicios que ofrece
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      RFC
                    </label>
                    <input
                      type="text"
                      defaultValue={aliado?.rfc}
                      placeholder="ABC123456XYZ"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent uppercase"
                      maxLength={13}
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Opcional - Registro Federal de Contribuyentes
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Sitio Web
                    </label>
                    <input
                      type="url"
                      defaultValue={aliado?.sitioWeb}
                      placeholder="https://www.ejemplo.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Opcional - Página web oficial
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Mensaje Breve
                    </label>
                    <textarea
                      rows={3}
                      defaultValue={aliado?.mensajeBreve}
                      placeholder="Descripción breve del aliado y los beneficios que ofrece..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Opcional - Mensaje breve sobre el aliado (máximo 200 caracteres)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Información de Contacto */}
            {activeTab === 'contacto' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-900 font-semibold text-base mb-1">Datos de Contacto</h3>
                  <p className="text-gray-600 text-xs mb-4">
                    Datos de la persona responsable del convenio
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Nombre del contacto *
                    </label>
                    <input
                      type="text"
                      defaultValue={aliado?.nombreContacto}
                      placeholder="Ej: Lic. María González"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      required
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Persona responsable del aliado
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Cargo
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Director de Vinculación"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Opcional - Puesto del contacto
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      defaultValue={aliado?.telefono}
                      placeholder="834-123-4567"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      required
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Número telefónico del contacto
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Teléfono alternativo
                    </label>
                    <input
                      type="tel"
                      placeholder="834-123-4567"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Opcional - Número adicional de contacto
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      defaultValue={aliado?.correo}
                      placeholder="contacto@ejemplo.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      required
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Email principal para comunicaciones
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Ubicación */}
            {activeTab === 'ubicacion' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-900 font-semibold text-base mb-1">Dirección Física</h3>
                  <p className="text-gray-600 text-xs mb-4">
                    Ubicación física del aliado
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Dirección completa *
                    </label>
                    <input
                      type="text"
                      defaultValue={aliado?.direccion}
                      placeholder="Calle, número, colonia"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      required
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Domicilio completo del aliado
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Ciudad *
                    </label>
                    <select
                      defaultValue={aliado?.ciudad}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent bg-white"
                      required
                    >
                      <option value="">Seleccionar ciudad</option>
                      <option value="Victoria">Victoria</option>
                      <option value="Tampico">Tampico</option>
                      <option value="Reynosa">Reynosa</option>
                      <option value="Matamoros">Matamoros</option>
                      <option value="Nuevo Laredo">Nuevo Laredo</option>
                      <option value="Altamira">Altamira</option>
                      <option value="Ciudad Madero">Ciudad Madero</option>
                    </select>
                    <p className="text-gray-500 text-xs mt-1">
                      Ciudad donde opera
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Estado *
                    </label>
                    <input
                      type="text"
                      defaultValue={aliado?.estado || 'Tamaulipas'}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                      required
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      placeholder="87000"
                      maxLength={5}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Opcional - CP de 5 dígitos
                    </p>
                  </div>
                </div>

                {/* Link de Google Maps */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Link de Google Maps
                    </label>
                    <input
                      type="text"
                      value={googleMapsLink}
                      onChange={handleGoogleMapsLinkChange}
                      placeholder="Pega aquí el link de Google Maps (ej: https://www.google.com/maps/@23.7369,-99.1411,15z)"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Opcional - Las coordenadas se extraerán automáticamente del link
                    </p>
                  </div>

                  {/* Mapa de ubicación */}
                  <MapaPicker
                    onLocationSelect={(lat, lng) => setCoordenadas({ lat, lng })}
                    initialPosition={coordenadas || undefined}
                  />
                </div>
              </div>
            )}

            {/* Tab 4: Información del Convenio */}
            {activeTab === 'convenio' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-900 font-semibold text-base mb-1">Datos del Convenio</h3>
                  <p className="text-gray-600 text-xs mb-4">
                    Información sobre el acuerdo con el aliado
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Fecha de inicio del convenio
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Opcional - Fecha de inicio del acuerdo
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Fecha de vencimiento
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Opcional - Fecha de término del convenio
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Observaciones
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Notas adicionales, términos especiales del convenio, observaciones relevantes..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent resize-none"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Opcional - Información adicional sobre el convenio o el aliado
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navegación entre tabs */}
          <div className="px-6 pb-6 flex justify-between items-center border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={goToPreviousTab}
              disabled={isFirstTab}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isFirstTab
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-[#922735] hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            <div className="flex gap-2">
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === getCurrentTabIndex()
                      ? 'bg-[#922735]'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {!isLastTab ? (
              <button
                type="button"
                onClick={goToNextTab}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#922735] hover:bg-gray-50 rounded-lg transition-colors"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onVolver}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C9A961] text-white rounded-lg text-sm font-medium hover:bg-[#b89850] transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {esEdicion ? 'Guardar Cambios' : 'Registrar Aliado'}
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

