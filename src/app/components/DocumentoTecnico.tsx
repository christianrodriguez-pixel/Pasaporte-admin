import { Home, ChevronRight, Download } from 'lucide-react';

export function DocumentoTecnico() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Documento Técnico</span>
      </div>

      {/* Título y descripción */}
      <div className="mb-4 md:mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[#922735] text-xl md:text-2xl font-bold mb-2">Documento Técnico del Sistema</h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Especificaciones técnicas, reglas de negocio y validaciones para el desarrollo
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#922735] text-white rounded-lg text-sm font-medium hover:bg-[#7a1f2d] transition-colors">
          <Download className="w-4 h-4" />
          Exportar PDF
        </button>
      </div>

      {/* Contenido del documento */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 space-y-8">
        {/* 1. Información General */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#C9A961]">
            1. Información General del Proyecto
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Nombre del Sistema</h3>
              <p className="text-gray-700">Sistema Administrativo del Programa Pasaporte Joven - INJUVE Tamaulipas</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Objetivo</h3>
              <p className="text-gray-700">
                Gestionar y administrar el programa de gamificación "Pasaporte Joven", permitiendo el control de usuarios,
                aliados, puntos, check-ins, canjes y configuración de niveles de participación.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tecnologías Recomendadas</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Frontend:</strong> React 18+, TypeScript, Tailwind CSS v4</li>
                <li><strong>Backend:</strong> Node.js/Express o Python/FastAPI</li>
                <li><strong>Base de datos:</strong> PostgreSQL o MySQL</li>
                <li><strong>Autenticación:</strong> JWT + OAuth 2.0</li>
                <li><strong>Storage:</strong> AWS S3 o similar para archivos adjuntos</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Estructura de Módulos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#C9A961]">
            2. Estructura de Módulos
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">2.1 Módulo de Usuario Joven</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="text-gray-700"><strong>Descripción:</strong> Gestión completa de los usuarios jóvenes registrados en el programa.</p>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Funcionalidades:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Listado de usuarios con filtros avanzados (estado, municipio, rango de edad, fechas)</li>
                    <li>Búsqueda general por nombre, CURP o correo</li>
                    <li>Vista detallada de usuario con tabs: Perfil, Puntos, Notas internas</li>
                    <li>Acciones contextuales: Ver detalle, Agregar nota, Suspender cuenta, Marcar para revisión</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Campos del Usuario:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Fecha de Registro:</strong> Formato DD/MM/YYYY</li>
                    <li><strong>Nombre completo:</strong> Texto obligatorio</li>
                    <li><strong>CURP:</strong> 18 caracteres, validación de formato oficial</li>
                    <li><strong>Edad:</strong> Entero, rango 18-29 años</li>
                    <li><strong>Municipio:</strong> Catálogo predefinido de municipios de Tamaulipas</li>
                    <li><strong>Teléfono:</strong> 10 dígitos, formato XXX-XXX-XXXX</li>
                    <li><strong>Correo electrónico:</strong> Validación de formato email, único en el sistema</li>
                    <li><strong>Puntos acumulados:</strong> Entero, no negativo</li>
                    <li><strong>Check-ins realizados:</strong> Entero, contador de visitas</li>
                    <li><strong>Nivel:</strong> Básico, Protagonista o Leyenda (según puntos)</li>
                    <li><strong>Estado:</strong> Activo, Pendiente de Verificación, En Revisión, Inactivo</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">2.2 Módulo de Aliados</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="text-gray-700"><strong>Descripción:</strong> Gestión de comercios y organizaciones aliadas que ofrecen beneficios a los jóvenes.</p>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Campos del Aliado:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Nombre comercial:</strong> Texto obligatorio</li>
                    <li><strong>RFC:</strong> 12 o 13 caracteres según persona física o moral</li>
                    <li><strong>Tipo de aliado:</strong> Referencia a catálogo de tipos</li>
                    <li><strong>Categoría:</strong> Referencia a catálogo de categorías</li>
                    <li><strong>Datos de contacto:</strong> Nombre, teléfono, correo</li>
                    <li><strong>Dirección completa:</strong> Calle, municipio, ciudad, estado</li>
                    <li><strong>Estado:</strong> Activo/Inactivo</li>
                    <li><strong>Actividades:</strong> Relación con tabla de actividades ofrecidas</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Funcionalidades:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Crear y editar aliados con formulario multi-paso</li>
                    <li>Asociar múltiples actividades a un aliado</li>
                    <li>Vista de detalle con tabs: Información y Actividades</li>
                    <li>Registro de nueva actividad desde el detalle del aliado</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">2.3 Módulo de Catálogos</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="text-gray-700"><strong>Descripción:</strong> Configuración de catálogos del sistema.</p>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">2.3.1 Catálogo de Niveles de Usuario</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Nombre del nivel:</strong> Texto obligatorio (ej: Básico, Protagonista, Leyenda)</li>
                    <li><strong>Icono/Emoji:</strong> Representación visual del nivel, máximo 2 caracteres</li>
                    <li><strong>Rango de puntos:</strong> Puntos mínimos y máximos para alcanzar el nivel</li>
                    <li><strong>Beneficios:</strong> Descripción de las ventajas del nivel</li>
                    <li><strong>Observaciones:</strong> Notas adicionales sobre el nivel</li>
                    <li><strong>Estado:</strong> Activo/Inactivo</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-800 mb-2">2.3.2 Catálogo de Tipos de Aliados</p>
                  <p className="text-gray-700 mb-2"><strong>Tipos Configurados en el Prototipo (8 tipos):</strong></p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>🏛️ Oficina de Gobierno (Azul #3B82F6)</li>
                    <li>🏢 Empresa Privada (Púrpura #8B5CF6)</li>
                    <li>🤝 Asociación Civil (Verde #10B981)</li>
                    <li>🎓 Institución Educativa (Ámbar #F59E0B)</li>
                    <li>🎭 Centro Cultural (Rosa #EC4899)</li>
                    <li>⚽ Centro Deportivo (Rojo #EF4444)</li>
                    <li>🏪 Comercio Local (Cian #06B6D4)</li>
                    <li>🏥 Centro de Salud (Teal #14B8A6)</li>
                  </ul>
                  <p className="text-gray-700 mt-2"><strong>Campos:</strong> ID, Nombre, Descripción, Icono (emoji), Color (hexadecimal), Activo (booleano)</p>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-800 mb-2">2.3.3 Catálogo de Categorías de Aliados</p>
                  <p className="text-gray-700 mb-2"><strong>Categorías Configuradas en el Prototipo (8 categorías):</strong></p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>📚 Educación (Azul #3B82F6) - Orden: 1</li>
                    <li>🏥 Salud (Verde #10B981) - Orden: 2</li>
                    <li>🎭 Cultura (Púrpura #8B5CF6) - Orden: 3</li>
                    <li>⚽ Deportes (Rojo #EF4444) - Orden: 4</li>
                    <li>💻 Tecnología (Índigo #6366F1) - Orden: 5</li>
                    <li>💼 Empleo (Ámbar #F59E0B) - Orden: 6</li>
                    <li>🛍️ Comercio (Rosa #EC4899) - Orden: 7</li>
                    <li>🎪 Entretenimiento (Teal #14B8A6) - Orden: 8</li>
                  </ul>
                  <p className="text-gray-700 mt-2"><strong>Campos:</strong> ID, Nombre, Descripción, Color (hexadecimal), Icono (emoji), Orden (para organización visual), Activo (booleano)</p>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-800 mb-2">2.3.4 Catálogo de Tipos de Actividades</p>
                  <p className="text-gray-700 mb-2"><strong>IMPORTANTE:</strong> Las actividades solo pueden ser de tipo: Evento, Taller, Sorteo o Torneo</p>
                  <p className="text-gray-700 mb-2"><strong>NO se permiten:</strong> Promoción, Descuento ni Beneficio (estos pertenecen al módulo de Beneficios)</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Evento:</strong> Actividades puntuales con fecha específica</li>
                    <li><strong>Taller:</strong> Capacitaciones y cursos formativos</li>
                    <li><strong>Sorteo:</strong> Rifas y sorteos de premios</li>
                    <li><strong>Torneo:</strong> Competencias deportivas o de habilidades</li>
                  </ul>
                  <p className="text-gray-700 mt-2"><strong>Campos:</strong> ID, Nombre, Descripción, Tipo (Temporal, Permanente, Programado), Color, Icono</p>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-800 mb-2">2.3.5 Catálogo de Zonas Geográficas</p>
                  <p className="text-gray-700 mb-2"><strong>Zonas Configuradas en el Prototipo:</strong></p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Zona Norte:</strong> Incluye municipios del norte de Tamaulipas</li>
                    <li><strong>Zona Centro:</strong> Incluye municipios del centro de Tamaulipas</li>
                    <li><strong>Zona Sur:</strong> Incluye municipios del sur de Tamaulipas</li>
                    <li><strong>Todas las Zonas:</strong> Opción para seleccionar todo el estado</li>
                  </ul>
                  <p className="text-gray-700 mt-2"><strong>Campos:</strong> ID, Nombre, Descripción, Municipios (JSON array), Población Estimada, Color (hexadecimal), Activo (booleano)</p>
                  <p className="text-gray-700 mt-2"><strong>Uso:</strong> Permite regionalizar notificaciones y actividades, segmentar comunicaciones por zona geográfica</p>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-800 mb-2">Validaciones de Niveles:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Los rangos de puntos no deben traslaparse entre niveles</li>
                    <li>Debe existir al menos un nivel activo en todo momento</li>
                    <li>El nivel "Básico" debe empezar en 0 puntos</li>
                    <li>Los puntos máximos de un nivel deben ser mayores a los puntos mínimos</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">2.4 Módulo de Actividades</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="text-gray-700"><strong>Descripción:</strong> Gestión de actividades, promociones y beneficios ofrecidos por aliados.</p>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Estructura de Actividad (5 Tabs):</p>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Tab 1: Información de la Actividad</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Nombre:</strong> Título de la actividad (obligatorio)</li>
                    <li><strong>Tipo de actividad:</strong> Evento, Taller, Sorteo o Torneo (sin Promoción, Descuento ni Beneficio)</li>
                    <li><strong>Categoría:</strong> 12 opciones disponibles:
                      <ul className="ml-6 mt-1">
                        <li>• Entretenimiento</li>
                        <li>• Gastronomía</li>
                        <li>• Cultura</li>
                        <li>• Deportes</li>
                        <li>• Educación</li>
                        <li>• Salud y Bienestar</li>
                        <li>• Tecnología</li>
                        <li>• Comercio</li>
                        <li>• Servicios</li>
                        <li>• Transporte</li>
                        <li>• Turismo</li>
                        <li>• Moda y Accesorios</li>
                      </ul>
                    </li>
                    <li><strong>Dirigido a nivel:</strong> Todos los niveles, Básico, Protagonista, Embajador o Leyenda</li>
                    <li><strong>Descripción detallada:</strong> Explicación completa (obligatoria)</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Tab 2: Ubicación</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Municipio:</strong> Catálogo de 43 municipios de Tamaulipas (incluyendo Victoria, Tampico, Reynosa, Matamoros, Nuevo Laredo, entre otros)</li>
                    <li><strong>Código postal:</strong> Opcional, 5 dígitos</li>
                    <li><strong>Dirección:</strong> Dirección completa de la actividad (obligatoria)</li>
                    <li><strong>Referencias adicionales:</strong> Puntos de referencia opcionales</li>
                    <li><strong>Link de Google Maps:</strong> URL para obtener coordenadas automáticamente mediante regex</li>
                    <li><strong>Radio de cobertura para check-in:</strong> Campo OBLIGATORIO de 10-5000 metros que define el área geográfica donde los usuarios podrán hacer check-in desde la app móvil. Opciones rápidas: 50m (muy cercano), 100m (cercano/default), 200m (normal), 500m (amplio), 1km (muy amplio), o personalizado</li>
                    <li><strong>Coordenadas GPS:</strong> Latitud y longitud del punto central (OBLIGATORIAS, pueden seleccionarse en el MapaPicker interactivo)</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Tab 3: Vigencia</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Fecha de inicio:</strong> Cuándo inicia la actividad</li>
                    <li><strong>Fecha de término:</strong> Cuándo finaliza</li>
                    <li><strong>Permanente:</strong> Checkbox si no tiene vencimiento</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Tab 4: Detalles Adicionales</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Cantidad de usos:</strong> Ilimitado o número específico por usuario</li>
                    <li><strong>Cupo máximo:</strong> Total de participantes permitidos</li>
                    <li><strong>Puntos requeridos:</strong> Puntos que el usuario debe gastar para acceder (0 = sin costo de puntos)</li>
                    <li><strong>Puntos otorgados:</strong> Puntos que el usuario recibe al completar la actividad (0 = no otorga)</li>
                    <li><strong>Términos y condiciones:</strong> Restricciones especiales</li>
                    <li><strong>Estado:</strong> Activa/Inactiva</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Tab 5: Configuración App Móvil</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Imagen:</strong> Archivo de imagen principal (1200x630px recomendado)</li>
                    <li><strong>Sección en la app:</strong> Destacados, Promociones, Eventos, Talleres, Deportes, Cultura, etc.</li>
                    <li><strong>Prioridad:</strong> Baja, Media, Alta, Destacada (afecta orden de visualización)</li>
                    <li><strong>Municipio y Dirección:</strong> Ubicación física</li>
                    <li><strong>Requiere inscripción:</strong> Si/No, con fecha límite y link de inscripción</li>
                    <li><strong>Tiene costo:</strong> Si/No, con costo regular y costo con Pasaporte Joven</li>
                    <li><strong>Horarios disponibles:</strong> Cuándo está disponible</li>
                    <li><strong>Teléfono de contacto:</strong> Para información</li>
                    <li><strong>Instrucciones para canjear:</strong> Pasos detallados</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">2.5 Módulo de Beneficios</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="text-gray-700"><strong>Descripción:</strong> Gestión del ciclo de vida completo de beneficios ofrecidos por aliados, desde borrador hasta archivo.</p>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Estados del Beneficio:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Borrador:</strong> Beneficio en construcción, no visible para usuarios</li>
                    <li><strong>Registrado:</strong> Beneficio completo pero no publicado</li>
                    <li><strong>Publicado:</strong> Beneficio activo y visible en la app móvil</li>
                    <li><strong>Pausado:</strong> Beneficio temporalmente inactivo</li>
                    <li><strong>Cancelado:</strong> Beneficio cancelado permanentemente</li>
                    <li><strong>Archivado:</strong> Beneficio fuera de circulación (puede restaurarse)</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Acciones por Estado:</p>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Estado: Borrador</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Ver detalles</li>
                    <li>Editar</li>
                    <li>Publicar (pasa a estado Publicado)</li>
                    <li>Eliminar (eliminación permanente)</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Estado: Registrado</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Ver detalles</li>
                    <li>Editar</li>
                    <li>Publicar (pasa a estado Publicado)</li>
                    <li>Cancelar (pasa a estado Cancelado)</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Estado: Publicado</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Ver detalles</li>
                    <li><strong>NO se puede editar</strong> (restricción crítica)</li>
                    <li>Pausar (pasa a estado Pausado)</li>
                    <li>Cancelar (pasa a estado Cancelado)</li>
                    <li>Archivar (solo si la vigencia ha caducado)</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Estado: Pausado</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Ver detalles</li>
                    <li>Reactivar (vuelve a estado Publicado)</li>
                    <li>Cancelar (pasa a estado Cancelado)</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Estado: Cancelado</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Ver detalles únicamente</li>
                    <li>No se pueden realizar otras acciones</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Estado: Archivado</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Ver detalles</li>
                    <li>Restaurar (vuelve a estado Borrador para su reactivación)</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Estructura de Beneficio (4 Tabs):</p>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Tab 1: Información del Beneficio</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Nombre:</strong> Título corto y descriptivo del beneficio</li>
                    <li><strong>Tipo:</strong> Promoción, Descuento o Beneficio</li>
                    <li><strong>Categoría:</strong> Referencia al catálogo de categorías</li>
                    <li><strong>Nivel requerido:</strong> Todos, Básico, Protagonista o Leyenda</li>
                    <li><strong>Descripción detallada:</strong> Explicación completa del beneficio</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Tab 2: Vigencia</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Fecha de inicio:</strong> Cuándo inicia el beneficio</li>
                    <li><strong>Fecha de término:</strong> Cuándo finaliza (opcional si es permanente)</li>
                    <li><strong>Permanente:</strong> Checkbox para beneficios sin vencimiento</li>
                    <li><strong>Días y horarios:</strong> Configuración específica de disponibilidad por día de la semana</li>
                    <li><strong>Rangos horarios:</strong> Múltiples rangos horarios por día</li>
                    <li><strong>Todo el día:</strong> Opción para disponibilidad 24 horas</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Tab 3: Detalles Adicionales</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Cantidad de usos:</strong> Ilimitado o número específico por usuario</li>
                    <li><strong>Cupo máximo:</strong> Total de participantes permitidos (opcional)</li>
                    <li><strong>Puntos requeridos:</strong> Puntos necesarios para acceder (0 = sin requisito)</li>
                    <li><strong>Términos y condiciones:</strong> Restricciones especiales (opcional)</li>
                    <li><strong>Estado inicial:</strong> Activo/Inactivo al crear</li>
                  </ul>

                  <p className="font-semibold text-gray-700 mt-3 mb-1">Tab 4: Configuración App Móvil</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Imagen:</strong> Archivo principal (1200x630px recomendado)</li>
                    <li><strong>Sección en la app:</strong> Destacados, Promociones, Eventos, etc.</li>
                    <li><strong>Prioridad:</strong> Baja, Media, Alta o Destacada</li>
                    <li><strong>Municipio:</strong> Ubicación del beneficio</li>
                    <li><strong>Dirección:</strong> Dirección física (opcional)</li>
                    <li><strong>Requiere inscripción:</strong> Con fecha límite y link si aplica</li>
                    <li><strong>Tiene costo:</strong> Con costo regular y costo con Pasaporte Joven</li>
                    <li><strong>Horarios disponibles:</strong> Texto descriptivo de horarios</li>
                    <li><strong>Teléfono de contacto:</strong> Para información</li>
                    <li><strong>Instrucciones para canjear:</strong> Pasos detallados para el usuario</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Navegación entre Tabs:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Primer tab (Información):</strong> Botón "Cancelar" (izquierda) y "Siguiente" (derecha)</li>
                    <li><strong>Tabs intermedios (Vigencia, Detalles):</strong> Botón "Atrás" (izquierda), "Guardar como borrador" y "Siguiente" (derecha)</li>
                    <li><strong>Último tab (App Móvil):</strong> Botón "Atrás" (izquierda), "Guardar como borrador" y "Guardar beneficio" (derecha)</li>
                    <li>El botón "Guardar como borrador" aparece en todos los tabs excepto el primero</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Reglas de Archivado:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>CRÍTICO:</strong> Solo se puede archivar un beneficio en estado "Publicado" cuando su vigencia ha caducado</li>
                    <li>La fecha de término debe ser anterior a la fecha actual para habilitar el archivado</li>
                    <li>Los beneficios permanentes (sin fecha de término) NO pueden archivarse automáticamente</li>
                    <li>Un beneficio archivado puede restaurarse, volviendo a estado "Borrador"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">2.6 Módulo de Notificaciones</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="text-gray-700"><strong>Descripción:</strong> Sistema de envío de notificaciones a usuarios de la app móvil.</p>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Campos de Notificación:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Título:</strong> Título corto de la notificación</li>
                    <li><strong>Mensaje:</strong> Contenido completo</li>
                    <li><strong>Tipo:</strong> Push, Email o Sistema</li>
                    <li><strong>Destinatarios por nivel:</strong> Todos, Básico, Protagonista, Leyenda</li>
                    <li><strong>Zona geográfica:</strong> Todas, Zona Norte, Zona Centro, Zona Sur</li>
                    <li><strong>Programar envío:</strong> Opcional, fecha y hora específica</li>
                    <li><strong>Estado:</strong> Enviada, Programada, Borrador</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Métricas:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Tasa de lectura:</strong> Porcentaje de usuarios que abrieron la notificación</li>
                    <li><strong>Total enviados:</strong> Cantidad de destinatarios</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Reglas de Negocio */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#C9A961]">
            3. Reglas de Negocio Críticas
          </h2>

          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.1 Sistema de Puntos y Niveles</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Los usuarios inician automáticamente en el nivel "Básico" con 0 puntos</li>
                <li>El nivel del usuario debe actualizarse automáticamente al alcanzar los puntos correspondientes</li>
                <li>Los puntos solo pueden ser otorgados por check-ins validados o canjes aprobados</li>
                <li>Los puntos negativos no están permitidos</li>
                <li>Al canjear beneficios, los puntos se restan del total del usuario</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.2 Estados de Usuario</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Activo:</strong> Usuario validado, puede realizar check-ins y canjes</li>
                <li><strong>Pendiente de Verificación:</strong> Usuario registrado pero sin validar documentación</li>
                <li><strong>En Revisión:</strong> Usuario marcado para revisión administrativa, no puede realizar acciones</li>
                <li><strong>Inactivo:</strong> Usuario suspendido o dado de baja, no puede acceder al sistema</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.3 Notas Internas</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Todas las notas deben registrar el usuario administrador que la creó</li>
                <li>Las notas deben incluir fecha y hora de creación</li>
                <li>Las notas no pueden ser modificadas una vez creadas (solo agregar nuevas)</li>
                <li>Las notas son privadas, solo visibles para administradores</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.4 Suspensión de Cuenta</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Requiere observaciones obligatorias explicando el motivo</li>
                <li>Debe registrar el administrador que realizó la acción</li>
                <li>Al suspender, el usuario pasa automáticamente a estado "Inactivo"</li>
                <li>El usuario suspendido no puede realizar ninguna acción en la app móvil</li>
                <li>Debe generarse un registro de auditoría de la suspensión</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.5 Marcar para Revisión</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Requiere observaciones obligatorias detallando qué revisar</li>
                <li>El usuario pasa automáticamente a estado "En Revisión"</li>
                <li>Durante la revisión, el usuario no puede acumular nuevos puntos ni hacer canjes</li>
                <li>Debe notificar al usuario que su cuenta está en proceso de revisión</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.6 Sistema de Actividades y Puntos</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Puntos Requeridos:</strong> Una actividad puede requerir puntos para participar (el usuario debe tener el saldo disponible)</li>
                <li><strong>Puntos Otorgados:</strong> Una actividad puede otorgar puntos al completarse (recompensa por participación)</li>
                <li><strong>Flexibilidad:</strong> Una actividad puede requerir Y otorgar puntos simultáneamente, solo requerir, solo otorgar, o ninguno</li>
                <li>Los puntos requeridos se deben validar contra el saldo actual del usuario antes de permitir el canje</li>
                <li>Los puntos otorgados se suman automáticamente al completar la actividad</li>
                <li>Si una actividad tiene cupo máximo, debe validarse disponibilidad antes de permitir participación</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.7 Priorización de Actividades en App Móvil</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Prioridad Baja:</strong> Aparece al final de la lista en su sección</li>
                <li><strong>Prioridad Media:</strong> Visualización normal en orden cronológico</li>
                <li><strong>Prioridad Alta:</strong> Aparece en las primeras posiciones de su sección</li>
                <li><strong>Prioridad Destacada:</strong> Aparece en el carrusel principal de inicio y al inicio de su sección</li>
                <li>Las actividades destacadas deben tener imagen obligatoriamente</li>
                <li>Solo se deben mostrar actividades vigentes (entre fecha de inicio y término)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.8 Regionalización y Zonas Geográficas</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Un municipio solo puede pertenecer a una zona geográfica a la vez</li>
                <li>Las notificaciones pueden enviarse a todas las zonas o a zonas específicas</li>
                <li>Los usuarios se asignan automáticamente a una zona según su municipio de residencia</li>
                <li>Las actividades se muestran prioritariamente a usuarios de la misma zona geográfica</li>
                <li>Al cambiar los municipios de una zona, actualizar automáticamente la asignación de usuarios</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.9 Gestión de Beneficios - Ciclo de Vida</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Borrador a Publicado:</strong> Solo se puede publicar si todos los campos obligatorios están completos</li>
                <li><strong>Edición restringida:</strong> Los beneficios en estado "Publicado" NO pueden editarse para mantener integridad con usuarios</li>
                <li><strong>Pausa temporal:</strong> Un beneficio "Publicado" puede pausarse y luego reactivarse sin perder su configuración</li>
                <li><strong>Archivado inteligente:</strong> Solo se puede archivar un beneficio "Publicado" cuando su vigencia ha caducado (fecha_fin {'<'} fecha_actual)</li>
                <li><strong>Restauración desde archivo:</strong> Un beneficio archivado vuelve a estado "Borrador" para permitir ajustes antes de republicar</li>
                <li><strong>Cancelación permanente:</strong> La cancelación es una acción irreversible, el beneficio queda marcado permanentemente</li>
                <li><strong>Eliminación limitada:</strong> Solo se pueden eliminar beneficios en estado "Borrador" (no publicados)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.10 Validación de Vigencia de Beneficios</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>La fecha de término debe ser posterior a la fecha de inicio</li>
                <li>Un beneficio permanente no tiene fecha de término y nunca caduca automáticamente</li>
                <li>La vigencia se valida contra la fecha actual del sistema para determinar si está activo</li>
                <li>Los beneficios con vigencia caducada no se muestran en la app móvil aunque estén en estado "Publicado"</li>
                <li>Al caducar la vigencia, se debe habilitar la opción de "Archivar" para limpieza del sistema</li>
                <li>Los rangos horarios configurados se respetan dentro del periodo de vigencia</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.11 Configuración de Horarios de Beneficios</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Se pueden configurar días específicos de la semana en los que el beneficio está disponible</li>
                <li>Cada día puede tener múltiples rangos horarios (ej: 9:00-13:00 y 16:00-20:00)</li>
                <li>La opción "Todo el día" (24 horas) sobrescribe los rangos horarios específicos</li>
                <li>Los horarios configurados se muestran en la app móvil para informar al usuario</li>
                <li>Un beneficio puede estar configurado solo para ciertos días sin estar disponible todos los días</li>
                <li>La validación de horarios se hace en conjunto con la validación de vigencia</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.12 Notificaciones Segmentadas</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Las notificaciones pueden combinarse por nivel Y zona (Ej: Solo nivel Leyenda de Zona Norte)</li>
                <li>Las notificaciones programadas se envían automáticamente en la fecha/hora especificada</li>
                <li>Debe registrarse la tasa de apertura para análisis de efectividad</li>
                <li>Los borradores no se envían y pueden editarse libremente</li>
                <li>Las notificaciones enviadas no pueden modificarse, solo puede verse su detalle</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3.13 Sistema de Check-in con Geolocalización</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Radio de cobertura obligatorio:</strong> Toda actividad DEBE tener configurado un radio de cobertura entre 10 y 5000 metros desde el punto central (coordenadas GPS)</li>
                <li><strong>Validación de proximidad:</strong> El botón de check-in en la app móvil solo se habilitará cuando el usuario se encuentre FÍSICAMENTE dentro del radio de cobertura configurado</li>
                <li><strong>Cálculo de distancia:</strong> El sistema debe calcular la distancia en tiempo real entre la ubicación actual del usuario (GPS del dispositivo móvil) y las coordenadas centrales de la actividad</li>
                <li><strong>Permisos de ubicación:</strong> El usuario debe tener activados los permisos de ubicación en su dispositivo para poder realizar check-in</li>
                <li><strong>Precisión GPS:</strong> Se requiere una precisión mínima de GPS para evitar check-ins falsos debido a señales GPS deficientes</li>
                <li><strong>Valores predeterminados:</strong> El radio por defecto es 100 metros (cercano). Opciones rápidas: 50m (muy cercano), 100m (cercano), 200m (normal), 500m (amplio), 1km (muy amplio)</li>
                <li><strong>Registro de check-in:</strong> Al realizar un check-in exitoso, debe guardarse: fecha/hora, coordenadas del usuario, distancia calculada desde el punto central</li>
                <li><strong>Prevención de fraude:</strong> Implementar límite de tiempo entre check-ins en la misma actividad para evitar check-ins múltiples fraudulentos</li>
                <li><strong>Experiencia de usuario:</strong> La app móvil debe mostrar un mensaje claro indicando la distancia actual del usuario respecto a la actividad y cuándo estará habilitado el check-in</li>
                <li><strong>Coordenadas centrales:</strong> Las coordenadas GPS pueden obtenerse automáticamente desde un link de Google Maps o seleccionarse manualmente en el mapa interactivo del panel administrativo</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Validaciones Técnicas */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#C9A961]">
            4. Validaciones Técnicas Obligatorias
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Validación de CURP</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Longitud exacta de 18 caracteres</li>
                <li>Formato: 4 letras, 6 dígitos (fecha), 1 letra (sexo), 2 letras (estado), 3 letras (nombres), 2 caracteres (homoclave)</li>
                <li>La fecha de nacimiento en el CURP debe ser consistente con la edad del usuario</li>
                <li>No debe existir duplicado en la base de datos</li>
                <li>Validar contra API del RENAPO (opcional pero recomendado)</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4.2 Validación de Email</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Formato válido según RFC 5322</li>
                <li>Único en la base de datos</li>
                <li>Requerir verificación por email (envío de código)</li>
                <li>No permitir emails desechables (usar blacklist de dominios)</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4.3 Validación de Teléfono</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>10 dígitos numéricos</li>
                <li>Iniciar con dígito válido de lada mexicana (no 0, no 1)</li>
                <li>Opcional: validar con API de telefonía para verificar operador</li>
                <li>Permitir formato con o sin guiones, normalizar en base de datos</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4.4 Validación de Edad</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Rango permitido: 18 a 29 años</li>
                <li>Calcular automáticamente desde fecha de nacimiento del CURP</li>
                <li>Actualizar la edad automáticamente cada año en el cumpleaños del usuario</li>
                <li>Al cumplir 30 años, marcar usuario como "fuera de rango" pero mantener histórico</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4.5 Validación de Actividades</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Tipo de actividad:</strong> Debe ser uno de: Evento, Taller, Sorteo o Torneo (NO se permite Promoción, Descuento ni Beneficio)</li>
                <li><strong>Categoría:</strong> Debe seleccionarse una categoría del catálogo configurado</li>
                <li><strong>Puntos requeridos:</strong> No pueden ser negativos</li>
                <li><strong>Puntos otorgados:</strong> No pueden ser negativos</li>
                <li><strong>Vigencia:</strong> Fecha de término debe ser posterior a fecha de inicio</li>
                <li><strong>Radio de cobertura:</strong> OBLIGATORIO. Rango permitido: 10 a 5000 metros. Valor por defecto: 100 metros</li>
                <li><strong>Coordenadas GPS:</strong> OBLIGATORIAS. Latitud debe estar entre -90 y 90. Longitud debe estar entre -180 y 180</li>
                <li><strong>Dirección:</strong> Campo obligatorio para referencia del usuario</li>
                <li><strong>Municipio:</strong> Debe ser uno del catálogo de municipios de Tamaulipas</li>
                <li><strong>Imagen:</strong> Formatos aceptados: JPG, PNG, WEBP. Tamaño máximo: 5MB</li>
                <li><strong>Prioridad destacada:</strong> Requiere imagen obligatoriamente</li>
                <li><strong>Cupo:</strong> Si se especifica, debe ser mayor a 0</li>
                <li><strong>Costos:</strong> Si tiene costo, el precio con pasaporte debe ser menor o igual al regular</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4.6 Validación de Zonas Geográficas</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Un municipio solo puede pertenecer a una zona a la vez</li>
                <li>Al asignar municipio a zona, validar que no esté en otra zona activa</li>
                <li>Color debe ser formato hexadecimal válido (#RRGGBB)</li>
                <li>Debe haber al menos un municipio asignado por zona</li>
                <li>No se puede eliminar una zona si tiene notificaciones asociadas enviadas</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4.7 Validación de Beneficios</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Nombre:</strong> Obligatorio, máximo 200 caracteres</li>
                <li><strong>Descripción:</strong> Obligatoria, texto completo sin límite estricto</li>
                <li><strong>Vigencia:</strong> Fecha de término debe ser posterior a fecha de inicio (si no es permanente)</li>
                <li><strong>Puntos requeridos:</strong> No pueden ser negativos, mínimo 0</li>
                <li><strong>Horarios:</strong> Al menos un día debe estar seleccionado si no es "todo el día"</li>
                <li><strong>Rangos horarios:</strong> Hora de fin debe ser posterior a hora de inicio</li>
                <li><strong>Imagen:</strong> Formatos JPG, PNG, WEBP. Tamaño máximo: 5MB. Dimensiones recomendadas: 1200x630px</li>
                <li><strong>Costos:</strong> Si tiene costo, el precio con pasaporte debe ser menor o igual al regular</li>
                <li><strong>Link de inscripción:</strong> Debe ser una URL válida si requiere inscripción</li>
                <li><strong>Fecha límite inscripción:</strong> Debe ser anterior a fecha de inicio del beneficio</li>
                <li><strong>Cambio de estado:</strong> Validar que la transición de estado sea permitida según las reglas de negocio</li>
                <li><strong>Archivado:</strong> Solo permitir si estado = "publicado" Y fecha_termino {'<'} fecha_actual</li>
                <li><strong>Edición:</strong> No permitir edición si estado = "publicado"</li>
                <li><strong>Eliminación:</strong> Solo permitir si estado = "borrador"</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4.8 Validación de Notificaciones</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Título:</strong> Máximo 200 caracteres</li>
                <li><strong>Mensaje:</strong> Máximo 500 caracteres para push, ilimitado para email</li>
                <li><strong>Fecha programada:</strong> Debe ser futura, mínimo 5 minutos desde ahora</li>
                <li><strong>Destinatarios:</strong> Validar que existan usuarios que cumplan los criterios</li>
                <li>No permitir edición de notificaciones ya enviadas</li>
                <li>Las notificaciones programadas pueden cancelarse antes del envío</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Estructura de Base de Datos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#C9A961]">
            5. Estructura de Base de Datos (Propuesta)
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tabla: usuarios_jovenes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Campo</th>
                      <th className="px-3 py-2 text-left font-semibold">Tipo</th>
                      <th className="px-3 py-2 text-left font-semibold">Restricciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-3 py-2">id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">PRIMARY KEY</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">fecha_registro</td>
                      <td className="px-3 py-2">TIMESTAMP</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT NOW()</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">nombre_completo</td>
                      <td className="px-3 py-2">VARCHAR(200)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">curp</td>
                      <td className="px-3 py-2">CHAR(18)</td>
                      <td className="px-3 py-2">NOT NULL, UNIQUE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">edad</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, CHECK (edad BETWEEN 18 AND 29)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">municipio_id</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, FK a tabla municipios</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">telefono</td>
                      <td className="px-3 py-2">VARCHAR(15)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">correo</td>
                      <td className="px-3 py-2">VARCHAR(100)</td>
                      <td className="px-3 py-2">NOT NULL, UNIQUE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">puntos_acumulados</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT 0, CHECK (puntos_acumulados {'>='} 0)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">total_checkins</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT 0</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">nivel_id</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, FK a tabla niveles</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">estado</td>
                      <td className="px-3 py-2">ENUM</td>
                      <td className="px-3 py-2">'activo', 'pendiente', 'en_revision', 'inactivo'</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">created_at</td>
                      <td className="px-3 py-2">TIMESTAMP</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT NOW()</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">updated_at</td>
                      <td className="px-3 py-2">TIMESTAMP</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT NOW()</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tabla: niveles</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Campo</th>
                      <th className="px-3 py-2 text-left font-semibold">Tipo</th>
                      <th className="px-3 py-2 text-left font-semibold">Restricciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-3 py-2">id</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">PRIMARY KEY, AUTO_INCREMENT</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">nombre</td>
                      <td className="px-3 py-2">VARCHAR(50)</td>
                      <td className="px-3 py-2">NOT NULL, UNIQUE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">icono</td>
                      <td className="px-3 py-2">VARCHAR(10)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">puntos_minimos</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, CHECK (puntos_minimos {'>='} 0)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">puntos_maximos</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">beneficios</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">observaciones</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">activo</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT TRUE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">created_at</td>
                      <td className="px-3 py-2">TIMESTAMP</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT NOW()</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tabla: notas_internas</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Campo</th>
                      <th className="px-3 py-2 text-left font-semibold">Tipo</th>
                      <th className="px-3 py-2 text-left font-semibold">Restricciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-3 py-2">id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">PRIMARY KEY</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">usuario_joven_id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">NOT NULL, FK a usuarios_jovenes</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">administrador_id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">NOT NULL, FK a tabla administradores</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">texto</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">created_at</td>
                      <td className="px-3 py-2">TIMESTAMP</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT NOW()</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tabla: zonas_geograficas</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Campo</th>
                      <th className="px-3 py-2 text-left font-semibold">Tipo</th>
                      <th className="px-3 py-2 text-left font-semibold">Restricciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-3 py-2">id</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">PRIMARY KEY, AUTO_INCREMENT</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">nombre</td>
                      <td className="px-3 py-2">VARCHAR(100)</td>
                      <td className="px-3 py-2">NOT NULL, UNIQUE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">descripcion</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">municipios</td>
                      <td className="px-3 py-2">JSON / TEXT[]</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">color</td>
                      <td className="px-3 py-2">VARCHAR(7)</td>
                      <td className="px-3 py-2">NOT NULL (formato hex)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">activo</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT TRUE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tabla: aliados</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Campo</th>
                      <th className="px-3 py-2 text-left font-semibold">Tipo</th>
                      <th className="px-3 py-2 text-left font-semibold">Restricciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-3 py-2">id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">PRIMARY KEY</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">nombre</td>
                      <td className="px-3 py-2">VARCHAR(200)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">rfc</td>
                      <td className="px-3 py-2">VARCHAR(13)</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">tipo_id</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, FK a tipos_aliados</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">categoria_id</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, FK a categorias_aliados</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">nombre_contacto</td>
                      <td className="px-3 py-2">VARCHAR(200)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">telefono</td>
                      <td className="px-3 py-2">VARCHAR(15)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">correo</td>
                      <td className="px-3 py-2">VARCHAR(100)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">direccion</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">municipio</td>
                      <td className="px-3 py-2">VARCHAR(100)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">activo</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT TRUE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">fecha_registro</td>
                      <td className="px-3 py-2">TIMESTAMP</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT NOW()</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tabla: actividades</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Campo</th>
                      <th className="px-3 py-2 text-left font-semibold">Tipo</th>
                      <th className="px-3 py-2 text-left font-semibold">Restricciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-3 py-2">id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">PRIMARY KEY</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">aliado_id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">NOT NULL, FK a aliados</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">nombre</td>
                      <td className="px-3 py-2">VARCHAR(200)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">tipo_id</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, FK a tipos_actividades (Evento, Taller, Sorteo, Torneo)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">categoria_id</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, FK a categorias_aliados</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">nivel_requerido</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NULL, FK a niveles</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">descripcion</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">fecha_inicio</td>
                      <td className="px-3 py-2">DATE</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">fecha_termino</td>
                      <td className="px-3 py-2">DATE</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">es_permanente</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">DEFAULT FALSE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">usos_permitidos</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NULL (NULL = ilimitado)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">cupo_maximo</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">puntos_requeridos</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">DEFAULT 0</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">puntos_otorgados</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">DEFAULT 0</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">imagen_url</td>
                      <td className="px-3 py-2">VARCHAR(500)</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">seccion_app</td>
                      <td className="px-3 py-2">VARCHAR(50)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">prioridad</td>
                      <td className="px-3 py-2">ENUM</td>
                      <td className="px-3 py-2">'baja', 'media', 'alta', 'destacada'</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">requiere_inscripcion</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">DEFAULT FALSE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">tiene_costo</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">DEFAULT FALSE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">costo_regular</td>
                      <td className="px-3 py-2">DECIMAL(10,2)</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">costo_con_pasaporte</td>
                      <td className="px-3 py-2">DECIMAL(10,2)</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">municipio</td>
                      <td className="px-3 py-2">VARCHAR(100)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">direccion</td>
                      <td className="px-3 py-2">VARCHAR(500)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">codigo_postal</td>
                      <td className="px-3 py-2">VARCHAR(10)</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">referencias_adicionales</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">latitud</td>
                      <td className="px-3 py-2">DECIMAL(10,8)</td>
                      <td className="px-3 py-2">NOT NULL, CHECK (latitud BETWEEN -90 AND 90)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">longitud</td>
                      <td className="px-3 py-2">DECIMAL(11,8)</td>
                      <td className="px-3 py-2">NOT NULL, CHECK (longitud BETWEEN -180 AND 180)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">radio_cobertura_metros</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT 100, CHECK (radio_cobertura_metros BETWEEN 10 AND 5000)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">activo</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">DEFAULT TRUE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>📍 Campos de Geolocalización:</strong> Los campos latitud, longitud y radio_cobertura_metros son OBLIGATORIOS para el funcionamiento del sistema de check-in en la app móvil. El radio de cobertura determina el área geográfica donde se habilitará el botón de check-in para los usuarios.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tabla: beneficios</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Campo</th>
                      <th className="px-3 py-2 text-left font-semibold">Tipo</th>
                      <th className="px-3 py-2 text-left font-semibold">Restricciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-3 py-2">id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">PRIMARY KEY</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">aliado_id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">NOT NULL, FK a aliados</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">nombre</td>
                      <td className="px-3 py-2">VARCHAR(200)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">tipo_beneficio</td>
                      <td className="px-3 py-2">ENUM</td>
                      <td className="px-3 py-2">'promocion', 'descuento', 'beneficio'</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">categoria_id</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, FK a categorias_aliados</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">nivel_requerido_id</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NULL (NULL = todos los niveles), FK a niveles</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">descripcion</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">fecha_inicio</td>
                      <td className="px-3 py-2">DATE</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">fecha_termino</td>
                      <td className="px-3 py-2">DATE</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">es_permanente</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">DEFAULT FALSE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">configuracion_horaria</td>
                      <td className="px-3 py-2">JSON</td>
                      <td className="px-3 py-2">NULL (días y rangos horarios)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">todo_el_dia</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">DEFAULT FALSE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">usos_permitidos</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NULL (NULL = ilimitado)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">cupo_maximo</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">puntos_requeridos</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">DEFAULT 0</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">terminos_condiciones</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">imagen_url</td>
                      <td className="px-3 py-2">VARCHAR(500)</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">seccion_app</td>
                      <td className="px-3 py-2">VARCHAR(50)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">prioridad</td>
                      <td className="px-3 py-2">ENUM</td>
                      <td className="px-3 py-2">'baja', 'media', 'alta', 'destacada'</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">municipio</td>
                      <td className="px-3 py-2">VARCHAR(100)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">direccion</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">requiere_inscripcion</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">DEFAULT FALSE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">fecha_limite_inscripcion</td>
                      <td className="px-3 py-2">DATE</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">link_inscripcion</td>
                      <td className="px-3 py-2">VARCHAR(500)</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">tiene_costo</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">DEFAULT FALSE</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">costo_regular</td>
                      <td className="px-3 py-2">DECIMAL(10,2)</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">costo_con_pasaporte</td>
                      <td className="px-3 py-2">DECIMAL(10,2)</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">horarios_disponibles</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">telefono_contacto</td>
                      <td className="px-3 py-2">VARCHAR(15)</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">instrucciones_canje</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">estado</td>
                      <td className="px-3 py-2">ENUM</td>
                      <td className="px-3 py-2">'borrador', 'registrado', 'publicado', 'pausado', 'cancelado', 'archivado'</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">created_at</td>
                      <td className="px-3 py-2">TIMESTAMP</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT NOW()</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">updated_at</td>
                      <td className="px-3 py-2">TIMESTAMP</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT NOW()</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tabla: notificaciones</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Campo</th>
                      <th className="px-3 py-2 text-left font-semibold">Tipo</th>
                      <th className="px-3 py-2 text-left font-semibold">Restricciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-3 py-2">id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">PRIMARY KEY</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">titulo</td>
                      <td className="px-3 py-2">VARCHAR(200)</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">mensaje</td>
                      <td className="px-3 py-2">TEXT</td>
                      <td className="px-3 py-2">NOT NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">tipo</td>
                      <td className="px-3 py-2">ENUM</td>
                      <td className="px-3 py-2">'push', 'email', 'sistema'</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">nivel_destinatario</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NULL (NULL = todos)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">zona_geografica_id</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NULL (NULL = todas), FK a zonas_geograficas</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">estado</td>
                      <td className="px-3 py-2">ENUM</td>
                      <td className="px-3 py-2">'enviada', 'programada', 'borrador'</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">fecha_programada</td>
                      <td className="px-3 py-2">TIMESTAMP</td>
                      <td className="px-3 py-2">NULL</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">total_enviados</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">DEFAULT 0</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">total_leidos</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">DEFAULT 0</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">created_at</td>
                      <td className="px-3 py-2">TIMESTAMP</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT NOW()</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tabla: check_ins (Recomendada)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Campo</th>
                      <th className="px-3 py-2 text-left font-semibold">Tipo</th>
                      <th className="px-3 py-2 text-left font-semibold">Restricciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-3 py-2">id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">PRIMARY KEY</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">usuario_id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">NOT NULL, FK a usuarios_jovenes</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">actividad_id</td>
                      <td className="px-3 py-2">UUID</td>
                      <td className="px-3 py-2">NOT NULL, FK a actividades</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">latitud_usuario</td>
                      <td className="px-3 py-2">DECIMAL(10,8)</td>
                      <td className="px-3 py-2">NOT NULL (coordenada del usuario al hacer check-in)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">longitud_usuario</td>
                      <td className="px-3 py-2">DECIMAL(11,8)</td>
                      <td className="px-3 py-2">NOT NULL (coordenada del usuario al hacer check-in)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">distancia_metros</td>
                      <td className="px-3 py-2">DECIMAL(10,2)</td>
                      <td className="px-3 py-2">NOT NULL (distancia calculada desde punto central de actividad)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">precision_gps_metros</td>
                      <td className="px-3 py-2">DECIMAL(10,2)</td>
                      <td className="px-3 py-2">NULL (precisión reportada por el dispositivo GPS)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">puntos_otorgados</td>
                      <td className="px-3 py-2">INTEGER</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT 0 (puntos dados al usuario por este check-in)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">dispositivo_modelo</td>
                      <td className="px-3 py-2">VARCHAR(100)</td>
                      <td className="px-3 py-2">NULL (modelo del dispositivo móvil)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">sistema_operativo</td>
                      <td className="px-3 py-2">VARCHAR(50)</td>
                      <td className="px-3 py-2">NULL (iOS, Android)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">validado</td>
                      <td className="px-3 py-2">BOOLEAN</td>
                      <td className="px-3 py-2">DEFAULT TRUE (si pasó validaciones de geolocalización)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">created_at</td>
                      <td className="px-3 py-2">TIMESTAMP</td>
                      <td className="px-3 py-2">NOT NULL, DEFAULT NOW()</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>⚠️ Tabla Recomendada:</strong> Esta tabla es esencial para llevar un registro histórico de todos los check-ins realizados, permitiendo auditoría, análisis de participación, detección de fraudes y cálculo preciso de puntos otorgados. Los campos de geolocalización permiten verificar retroactivamente la validez de los check-ins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. APIs Requeridas */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#C9A961]">
            6. APIs y Endpoints Requeridos
          </h2>

          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Usuarios Jóvenes</h3>
              <ul className="list-none text-gray-700 space-y-1 font-mono text-sm">
                <li><span className="text-green-600 font-bold">GET</span> /api/usuarios-jovenes - Listar usuarios con filtros</li>
                <li><span className="text-blue-600 font-bold">GET</span> /api/usuarios-jovenes/:id - Obtener detalle de usuario</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/usuarios-jovenes - Crear nuevo usuario</li>
                <li><span className="text-orange-600 font-bold">PUT</span> /api/usuarios-jovenes/:id - Actualizar usuario</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/usuarios-jovenes/:id/suspender - Suspender cuenta</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/usuarios-jovenes/:id/revision - Marcar para revisión</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/usuarios-jovenes/:id/notas - Agregar nota interna</li>
                <li><span className="text-green-600 font-bold">GET</span> /api/usuarios-jovenes/:id/notas - Listar notas del usuario</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Niveles</h3>
              <ul className="list-none text-gray-700 space-y-1 font-mono text-sm">
                <li><span className="text-green-600 font-bold">GET</span> /api/niveles - Listar niveles activos</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/niveles - Crear nuevo nivel</li>
                <li><span className="text-orange-600 font-bold">PUT</span> /api/niveles/:id - Actualizar nivel</li>
                <li><span className="text-red-600 font-bold">DELETE</span> /api/niveles/:id - Eliminar nivel</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Aliados</h3>
              <ul className="list-none text-gray-700 space-y-1 font-mono text-sm">
                <li><span className="text-green-600 font-bold">GET</span> /api/aliados - Listar aliados con filtros</li>
                <li><span className="text-blue-600 font-bold">GET</span> /api/aliados/:id - Obtener detalle de aliado</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/aliados - Crear nuevo aliado</li>
                <li><span className="text-orange-600 font-bold">PUT</span> /api/aliados/:id - Actualizar aliado</li>
                <li><span className="text-red-600 font-bold">DELETE</span> /api/aliados/:id - Eliminar aliado</li>
                <li><span className="text-green-600 font-bold">GET</span> /api/aliados/:id/actividades - Listar actividades del aliado</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Actividades</h3>
              <ul className="list-none text-gray-700 space-y-1 font-mono text-sm">
                <li><span className="text-green-600 font-bold">GET</span> /api/actividades - Listar actividades con filtros</li>
                <li><span className="text-blue-600 font-bold">GET</span> /api/actividades/:id - Obtener detalle de actividad</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/actividades - Crear nueva actividad</li>
                <li><span className="text-orange-600 font-bold">PUT</span> /api/actividades/:id - Actualizar actividad</li>
                <li><span className="text-red-600 font-bold">DELETE</span> /api/actividades/:id - Eliminar actividad</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/actividades/:id/imagen - Subir imagen de actividad</li>
                <li><span className="text-green-600 font-bold">GET</span> /api/actividades/destacadas - Obtener actividades destacadas para app</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/actividades/:id/validar-ubicacion - Validar si usuario está dentro del radio de cobertura</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/actividades/:id/check-in - Registrar check-in con validación de geolocalización</li>
                <li><span className="text-green-600 font-bold">GET</span> /api/actividades/:id/check-ins - Listar check-ins de una actividad</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Zonas Geográficas</h3>
              <ul className="list-none text-gray-700 space-y-1 font-mono text-sm">
                <li><span className="text-green-600 font-bold">GET</span> /api/zonas - Listar zonas geográficas</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/zonas - Crear nueva zona</li>
                <li><span className="text-orange-600 font-bold">PUT</span> /api/zonas/:id - Actualizar zona</li>
                <li><span className="text-red-600 font-bold">DELETE</span> /api/zonas/:id - Eliminar zona</li>
                <li><span className="text-green-600 font-bold">GET</span> /api/zonas/:id/municipios - Obtener municipios de la zona</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Beneficios</h3>
              <ul className="list-none text-gray-700 space-y-1 font-mono text-sm">
                <li><span className="text-green-600 font-bold">GET</span> /api/beneficios - Listar beneficios con filtros por estado, categoría, nivel</li>
                <li><span className="text-blue-600 font-bold">GET</span> /api/beneficios/:id - Obtener detalle completo de beneficio</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/beneficios - Crear nuevo beneficio (estado inicial: borrador)</li>
                <li><span className="text-orange-600 font-bold">PUT</span> /api/beneficios/:id - Actualizar beneficio (solo si estado permite edición)</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/beneficios/:id/publicar - Cambiar estado de borrador/registrado a publicado</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/beneficios/:id/pausar - Pausar beneficio publicado</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/beneficios/:id/reactivar - Reactivar beneficio pausado</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/beneficios/:id/cancelar - Cancelar beneficio (acción permanente)</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/beneficios/:id/archivar - Archivar beneficio (solo si vigencia caducada)</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/beneficios/:id/restaurar - Restaurar beneficio archivado a borrador</li>
                <li><span className="text-red-600 font-bold">DELETE</span> /api/beneficios/:id - Eliminar beneficio (solo si estado = borrador)</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/beneficios/:id/imagen - Subir imagen del beneficio</li>
                <li><span className="text-green-600 font-bold">GET</span> /api/beneficios/vigentes - Obtener beneficios vigentes y publicados para app</li>
                <li><span className="text-green-600 font-bold">GET</span> /api/aliados/:id/beneficios - Listar beneficios de un aliado específico</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Notificaciones</h3>
              <ul className="list-none text-gray-700 space-y-1 font-mono text-sm">
                <li><span className="text-green-600 font-bold">GET</span> /api/notificaciones - Listar notificaciones con filtros</li>
                <li><span className="text-blue-600 font-bold">GET</span> /api/notificaciones/:id - Obtener detalle de notificación</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/notificaciones - Crear y enviar notificación</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/notificaciones/:id/programar - Programar envío</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/notificaciones/:id/enviar - Enviar notificación de borrador</li>
                <li><span className="text-green-600 font-bold">GET</span> /api/notificaciones/:id/metricas - Obtener métricas de lectura</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Catálogos</h3>
              <ul className="list-none text-gray-700 space-y-1 font-mono text-sm">
                <li><span className="text-green-600 font-bold">GET</span> /api/catalogos/tipos-aliados - Listar tipos de aliados</li>
                <li><span className="text-green-600 font-bold">GET</span> /api/catalogos/categorias-aliados - Listar categorías</li>
                <li><span className="text-green-600 font-bold">GET</span> /api/catalogos/tipos-actividades - Listar tipos de actividades</li>
                <li><span className="text-yellow-600 font-bold">POST</span> /api/catalogos/* - Crear entrada en catálogo</li>
                <li><span className="text-orange-600 font-bold">PUT</span> /api/catalogos/*/:id - Actualizar entrada</li>
                <li><span className="text-red-600 font-bold">DELETE</span> /api/catalogos/*/:id - Eliminar entrada</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 7. Configuración App Móvil */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#C9A961]">
            7. Especificaciones para App Móvil
          </h2>

          <div className="space-y-4">
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Secciones de la App</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Destacados:</strong> Carrusel principal con actividades destacadas (prioridad: destacada)</li>
                <li><strong>Promociones y Descuentos:</strong> Ofertas y descuentos vigentes</li>
                <li><strong>Eventos y Actividades:</strong> Eventos próximos con fecha específica</li>
                <li><strong>Talleres y Capacitación:</strong> Programas educativos y formativos</li>
                <li><strong>Deportes y Recreación:</strong> Actividades deportivas y recreativas</li>
                <li><strong>Arte y Cultura:</strong> Actividades culturales y artísticas</li>
                <li><strong>Gastronomía:</strong> Descuentos en restaurantes y establecimientos de comida</li>
                <li><strong>Otros:</strong> Entretenimiento, Educación, Salud, Tecnología, Servicios</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Criterios de Visualización</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Solo mostrar actividades vigentes (entre fecha inicio y término)</li>
                <li>Ordenar por prioridad: Destacada → Alta → Media → Baja</li>
                <li>Dentro de cada prioridad, ordenar por fecha de creación (más recientes primero)</li>
                <li>Filtrar por nivel del usuario (mostrar solo actividades para su nivel o "Todos")</li>
                <li>Priorizar actividades de la misma zona geográfica del usuario</li>
                <li>Validar que el usuario tenga puntos suficientes si la actividad requiere puntos</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Especificaciones de Imagen</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Dimensiones recomendadas:</strong> 1200x630px (ratio 1.9:1)</li>
                <li><strong>Formato:</strong> JPG, PNG o WEBP</li>
                <li><strong>Peso máximo:</strong> 5MB</li>
                <li><strong>Optimización:</strong> Comprimir imágenes antes de subir para mejorar rendimiento</li>
                <li><strong>Fallback:</strong> Mostrar imagen placeholder si no hay imagen</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Flujo de Canje en App Móvil</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>1. Usuario selecciona actividad desde su sección correspondiente</li>
                <li>2. Validar puntos disponibles si la actividad los requiere</li>
                <li>3. Validar cupo disponible si la actividad tiene límite</li>
                <li>4. Mostrar detalle completo: descripción, términos, costos, instrucciones</li>
                <li>5. Si requiere inscripción, redirigir a link de inscripción</li>
                <li>6. Generar código QR único de canje para presentar al aliado</li>
                <li>7. Al validar canje: restar puntos requeridos y sumar puntos otorgados</li>
                <li>8. Registrar transacción en historial del usuario</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 8. Consideraciones de Seguridad */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#C9A961]">
            8. Consideraciones de Seguridad
          </h2>

          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">⚠️ Crítico - Implementación Obligatoria</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Autenticación JWT con refresh tokens</li>
                <li>Control de acceso basado en roles (RBAC)</li>
                <li>Encriptación de datos sensibles (CURP) en base de datos</li>
                <li>Auditoría completa de todas las acciones administrativas</li>
                <li>Rate limiting en endpoints públicos</li>
                <li>Validación y sanitización de todas las entradas de usuario</li>
                <li>HTTPS obligatorio en producción</li>
                <li>Logs de seguridad centralizados</li>
                <li>Backup automático diario de base de datos</li>
                <li>Política de contraseñas robustas para administradores</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 9. Notas Adicionales */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#C9A961]">
            9. Notas Adicionales para Desarrollo
          </h2>

          <div className="space-y-4">
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">✅ Funcionalidades Implementadas en el Prototipo</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Módulo de Usuarios Jóvenes</strong> - Completo con filtros avanzados, búsqueda, detalle con tabs (Perfil, Puntos), acciones (suspender, revisar, reactivar), historial de puntos</li>
                <li><strong>Módulo de Aliados</strong> - Gestión completa con formulario multi-paso (4 tabs), MapaPicker, extracción de coordenadas, filtros, búsqueda, acciones según estado (pendiente/activo)</li>
                <li><strong>Sistema de Actividades</strong> - Gestión de estados (Borrador, Registrado, Publicado, Pausado, Cancelado, Archivado), puntos requeridos/otorgados, geolocalización, generación de QR, vista de usuarios inscritos</li>
                <li><strong>Sistema de Beneficios</strong> - Gestión completa de ciclo de vida con estados, vigencia, horarios configurables, puntos, formulario multi-tab</li>
                <li><strong>Módulo de Noticias</strong> - Listado, filtros, búsqueda, estados (Publicada, Borrador, Archivada), contador de visitas</li>
                <li><strong>Catálogos Configurables</strong> - Niveles (3 niveles con rangos de puntos), Tipos de Aliados (8 tipos), Categorías (8 categorías), Tipos de Actividades, Beneficios, Zonas Geográficas</li>
                <li><strong>Notificaciones</strong> - Sistema segmentado por nivel y zona geográfica, tipos (Push, Email, Sistema), estados (Enviada, Programada, Borrador), métricas de lectura</li>
                <li><strong>Componentes Utilitarios</strong> - GenerarQRModal (código QR con datos JSON), MapaPicker (selector de ubicación con OpenStreetMap), SeleccionarAliadoModal</li>
                <li><strong>Navegación y UI</strong> - Sidebar colapsable, breadcrumbs, filtros avanzados, tablas paginadas, modales de confirmación, badges de estado</li>
                <li><strong>Diseño Responsive</strong> - Mobile-first con breakpoints Tailwind, tablas con scroll horizontal, formularios adaptables</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">⚙️ Funcionalidades Pendientes de Desarrollo Backend</h3>
              <p className="text-gray-700 mb-2">Las siguientes funcionalidades tienen UI implementada pero requieren desarrollo backend:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>API REST:</strong> Todos los endpoints CRUD para cada módulo</li>
                <li><strong>Sistema de Check-ins:</strong> Validación de geolocalización en tiempo real, cálculo de distancia, prevención de fraude</li>
                <li><strong>Transacciones de Puntos:</strong> Sistema de débito/crédito con auditoría completa, actualización automática de niveles</li>
                <li><strong>Dashboard Analítico:</strong> Métricas y estadísticas en tiempo real (KPIs, gráficos, tendencias)</li>
                <li><strong>Generación de Reportes:</strong> Exportación a PDF/Excel de usuarios, actividades, aliados, transacciones</li>
                <li><strong>Notificaciones Push:</strong> Integración con Firebase Cloud Messaging o similar</li>
                <li><strong>Autenticación y Autorización:</strong> JWT, roles (Super Admin, Admin, Operador), permisos granulares</li>
                <li><strong>Gestión de Administradores:</strong> CRUD de usuarios administradores con roles</li>
                <li><strong>App Móvil:</strong> Desarrollo de aplicación nativa o híbrida para iOS y Android</li>
                <li><strong>Validación de Canjes:</strong> Sistema de códigos únicos de un solo uso, validación en tiempo real</li>
                <li><strong>Integración RENAPO:</strong> API para validación de CURP auténtico</li>
                <li><strong>Storage de Archivos:</strong> Carga y almacenamiento de imágenes (AWS S3, CloudFlare R2, o similar)</li>
                <li><strong>Sistema de Logs:</strong> Auditoría completa de todas las acciones administrativas</li>
                <li><strong>Cron Jobs:</strong> Tareas programadas (envío de notificaciones, archivado automático, actualización de niveles)</li>
              </ul>
            </div>

            <div className="bg-gray-100 border-l-4 border-gray-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Diseño y UX Implementado</h3>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-gray-800">Paleta de Colores Corporativos:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Primario (Guindo):</strong> #922735 - Usado en header, botones principales, títulos</li>
                    <li><strong>Secundario (Oro):</strong> #C9A961 - Usado en franja decorativa, acentos, bordes destacados</li>
                    <li><strong>Terciario (Oro claro):</strong> #D4B871, #E4C989 - Gradientes y variaciones</li>
                    <li><strong>Fondo Principal:</strong> #F5F5F7 - Fondo general de la aplicación</li>
                    <li><strong>Fondo Tarjetas:</strong> #FFFFFF - Tarjetas y contenedores</li>
                    <li><strong>Texto Primario:</strong> #111827 (gray-900)</li>
                    <li><strong>Texto Secundario:</strong> #6B7280 (gray-500)</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Tipografía:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Familia Principal:</strong> Encode Sans (importada desde Google Fonts)</li>
                    <li><strong>Ubicación de Imports:</strong> /src/styles/fonts.css</li>
                    <li><strong>Uso:</strong> Aplicada globalmente mediante theme.css</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Sistema de Diseño Responsive:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Enfoque:</strong> Mobile-first</li>
                    <li><strong>Breakpoints:</strong> sm: 640px, md: 768px, lg: 1024px, xl: 1280px</li>
                    <li><strong>Sidebar:</strong> Colapsable, 240px expandido / 60px colapsado</li>
                    <li><strong>Header:</strong> Altura fija 72px + franja 4px</li>
                    <li><strong>Tablas:</strong> Scroll horizontal en móvil, completas en desktop</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Componentes UI (Radix UI):</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Accordion, Alert Dialog, Avatar, Badge</li>
                    <li>Checkbox, Dialog, Dropdown Menu, Form</li>
                    <li>Label, Popover, Select, Separator</li>
                    <li>Switch, Tabs, Tooltip, y más...</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Iconografía y Elementos Visuales:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Librería de Iconos:</strong> Lucide React (v0.487.0)</li>
                    <li><strong>Emojis:</strong> Usados en niveles (⭐🏆👑) y categorías</li>
                    <li><strong>Badges de Estado:</strong> Colores semánticos (verde=activo, rojo=suspendido, amarillo=revisión)</li>
                    <li><strong>Modales:</strong> Overlay con opacidad 50% (bg-black/50)</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Patrones de Interacción:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li><strong>Navegación por Tabs:</strong> Usada en detalles de usuario, formularios multi-paso</li>
                    <li><strong>Menús Contextuales:</strong> Dropdown con acciones por fila (⋮ tres puntos)</li>
                    <li><strong>Modales de Confirmación:</strong> Para acciones destructivas (eliminar, suspender, cancelar)</li>
                    <li><strong>Breadcrumbs:</strong> En todas las vistas para contexto de navegación</li>
                    <li><strong>Filtros Avanzados:</strong> Panel colapsable con múltiples criterios</li>
                    <li><strong>Paginación:</strong> Selector de registros (10/25/50/100) + navegación de páginas</li>
                    <li><strong>Estados de Carga:</strong> Skeletons y spinners</li>
                    <li><strong>Tooltips:</strong> Información contextual en hover</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Datos de Ejemplo en el Prototipo */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#C9A961]">
            10. Datos de Ejemplo (Mock Data) en el Prototipo
          </h2>

          <div className="space-y-4">
            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Usuarios Jóvenes (10 registros)</h3>
              <ul className="list-none text-gray-700 space-y-1 text-sm">
                <li><strong>1.</strong> María González López - Protagonista, Activo, 1250 puntos, Victoria</li>
                <li><strong>2.</strong> Juan Carlos Pérez - Básico, Suspendido, 0 puntos, Tampico</li>
                <li><strong>3.</strong> Ana Sofía Martínez - Básico, En Revisión, 850 puntos, Reynosa</li>
                <li><strong>4.</strong> Carlos Eduardo Ramírez - Leyenda, Activo, 2100 puntos, Matamoros</li>
                <li><strong>5.</strong> Laura Patricia Hernández - Básico, Activo, 450 puntos, Nuevo Laredo</li>
                <li><strong>6.</strong> Miguel Ángel Torres - Protagonista, Activo, 1890 puntos, Victoria</li>
                <li><strong>7.</strong> Daniela Alejandra Ruiz - Básico, Activo, 320 puntos, Tampico</li>
                <li><strong>8.</strong> Jorge Luis Flores - Leyenda, Activo, 3200 puntos, Reynosa</li>
                <li><strong>9.</strong> Gabriela Sánchez Cruz - Protagonista, Activo, 1560 puntos, Victoria</li>
                <li><strong>10.</strong> Roberto Carlos Mendoza - Básico, Activo, 780 puntos, Matamoros</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Aliados (9 registros)</h3>
              <ul className="list-none text-gray-700 space-y-1 text-sm">
                <li><strong>1.</strong> Secretaría de Desarrollo Social - Oficina de Gobierno, Educación, Victoria</li>
                <li><strong>2.</strong> Grupo Industrial del Norte - Empresa Privada, Empleo, Reynosa</li>
                <li><strong>3.</strong> Fundación Juventud Unida - Asociación Civil, Cultura, Tampico</li>
                <li><strong>4.</strong> Universidad Autónoma de Tamaulipas - Institución Educativa, Educación, Victoria</li>
                <li><strong>5.</strong> Casa de la Cultura - Centro Cultural, Cultura, Matamoros</li>
                <li><strong>6.</strong> Polideportivo Tamaulipas - Centro Deportivo, Deportes, Nuevo Laredo</li>
                <li><strong>7.</strong> Café Cultural El Encuentro - Comercio Local, Entretenimiento, Victoria</li>
                <li><strong>8.</strong> Centro de Salud Comunitario - Centro de Salud, Salud, Tampico</li>
                <li><strong>9.</strong> Tech Hub Tamaulipas - Empresa Privada, Tecnología, Reynosa</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Actividades (12 registros)</h3>
              <ul className="list-none text-gray-700 space-y-1 text-sm">
                <li><strong>1.</strong> Concierto de rock en vivo - Evento, Publicado, 150 pts otorgados</li>
                <li><strong>2.</strong> Taller de fotografía digital - Taller, Publicado, 200 pts otorgados</li>
                <li><strong>3.</strong> Maratón ciudad Victoria - Evento, Registrado, 300 pts otorgados</li>
                <li><strong>4.</strong> Sorteo smartphones - Sorteo, Publicado, 500 pts requeridos</li>
                <li><strong>5.</strong> Torneo de fútbol 7 - Torneo, Publicado, 100 pts otorgados</li>
                <li><strong>6.</strong> Taller de emprendimiento - Taller, Borrador</li>
                <li><strong>7.</strong> Festival de arte urbano - Evento, Pausado</li>
                <li><strong>8.</strong> Curso de programación web - Taller, Publicado, 250 pts otorgados</li>
                <li><strong>9.</strong> Concierto sinfónico - Evento, Cancelado</li>
                <li><strong>10.</strong> Torneo ajedrez estatal - Torneo, Archivado</li>
                <li><strong>11.</strong> Taller de cocina saludable - Taller, Publicado, 150 pts otorgados</li>
                <li><strong>12.</strong> Sorteo bicicletas - Sorteo, Registrado, 300 pts requeridos</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Beneficios (12 registros)</h3>
              <ul className="list-none text-gray-700 space-y-1 text-sm">
                <li><strong>1.</strong> 20% descuento en Cinépolis - Descuento, Publicado, 0 pts requeridos</li>
                <li><strong>2.</strong> Café gratis en Café Nómada - Promoción, Borrador, 50 pts requeridos</li>
                <li><strong>3.</strong> Entrada gratuita museo los martes - Beneficio, Pausado, 0 pts</li>
                <li><strong>4.</strong> 2x1 en hamburguesas - Promoción, Publicado, 100 pts requeridos</li>
                <li><strong>5.</strong> Descuento gimnasio 30% - Descuento, Registrado, 200 pts</li>
                <li><strong>6.</strong> Pizza gratis los viernes - Promoción, Cancelado</li>
                <li><strong>7.</strong> Acceso VIP eventos culturales - Beneficio, Publicado, solo Leyenda, 500 pts</li>
                <li><strong>8.</strong> 15% descuento librería - Descuento, Publicado, 0 pts</li>
                <li><strong>9.</strong> Clase de yoga gratis - Beneficio, Archivado</li>
                <li><strong>10.</strong> Descuento 25% cine arte - Descuento, Publicado, solo Protagonista</li>
                <li><strong>11.</strong> Corte de cabello gratis - Promoción, Borrador, 150 pts</li>
                <li><strong>12.</strong> Entrada gratis parque acuático - Beneficio, Pausado, 300 pts</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Noticias (5 registros)</h3>
              <ul className="list-none text-gray-700 space-y-1 text-sm">
                <li><strong>1.</strong> "INJUVE lanza nuevo programa de becas" - Educación, Publicada, 1250 visitas</li>
                <li><strong>2.</strong> "Gran éxito en el Festival Joven 2024" - Cultura, Publicada, 2100 visitas</li>
                <li><strong>3.</strong> "Nuevos talleres de emprendimiento disponibles" - Emprendimiento, Publicada, 890 visitas</li>
                <li><strong>4.</strong> "Convocatoria torneo deportivo estatal" - Deportes, Borrador</li>
                <li><strong>5.</strong> "Programa de salud mental para jóvenes" - Salud, Archivada, 560 visitas</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Notificaciones (5 registros)</h3>
              <ul className="list-none text-gray-700 space-y-1 text-sm">
                <li><strong>1.</strong> "Nueva actividad disponible cerca de ti" - Push, Usuario específico, Enviada</li>
                <li><strong>2.</strong> "¡Felicidades! Subiste de nivel" - Sistema, Niveles Bronce/Plata, Enviada</li>
                <li><strong>3.</strong> "Recuerda verificar tu cuenta" - Email, Usuarios sin verificar, Programada</li>
                <li><strong>4.</strong> "Evento especial este fin de semana" - Push, Todos, Zona Norte, Borrador</li>
                <li><strong>5.</strong> "Nuevos beneficios en tu ciudad" - Sistema, Todos, Zona Centro, Enviada</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Niveles de Usuario (3 niveles configurados)</h3>
              <ul className="list-none text-gray-700 space-y-1 text-sm">
                <li><strong>1. ⭐ Básico:</strong> 0-999 puntos - "Acceso a eventos básicos y descuentos del 5%. Nivel inicial para nuevos usuarios."</li>
                <li><strong>2. 🏆 Protagonista:</strong> 1000-2499 puntos - "Acceso prioritario a eventos, descuentos del 15%, talleres exclusivos."</li>
                <li><strong>3. 👑 Leyenda:</strong> 2500+ puntos - "Todos los beneficios anteriores más eventos VIP, rol de embajador, descuentos del 25%."</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Municipios de Tamaulipas (Principales 7 ciudades en filtros)</h3>
              <ul className="list-none text-gray-700 space-y-1 text-sm">
                <li>• Victoria (Capital)</li>
                <li>• Tampico</li>
                <li>• Reynosa</li>
                <li>• Matamoros</li>
                <li>• Nuevo Laredo</li>
                <li>• Altamira</li>
                <li>• Madero</li>
                <li><em>Nota: El catálogo completo incluye los 43 municipios de Tamaulipas</em></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer del documento */}
        <div className="pt-8 mt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600 text-center">
            Documento Técnico Actualizado con Información del Prototipo | Sistema Pasaporte Joven - INJUVE Tamaulipas
          </p>
          <p className="text-xs text-gray-500 text-center mt-2">
            Última actualización: {new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
          <p className="text-xs text-gray-500 text-center mt-1">
            Versión del Prototipo: React 18.3.1 + TypeScript + Tailwind CSS 4.1.12
          </p>
        </div>
      </div>
    </div>
  );
}

