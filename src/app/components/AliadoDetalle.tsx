import {
  Home,
  ChevronRight,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  FileText
} from 'lucide-react';

interface AliadoDetalleProps {
  aliado: any;
  onVolver: () => void;
}

export function AliadoDetalle({ aliado, onVolver }: AliadoDetalleProps) {

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
        <span className="text-gray-900 font-semibold">Detalle del Aliado</span>
      </div>

      {/* Botón volver */}
      <button
        onClick={onVolver}
        className="mb-4 flex items-center gap-2 text-[#922735] hover:text-[#7a1f2d] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Volver al listado</span>
      </button>

      {/* Header con información principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="mb-3">
          <h1 className="text-[#922735] text-2xl font-bold mb-2">{aliado.nombre}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span>{aliado.tipo}</span>
            <span className="text-gray-400">•</span>
            <span>{aliado.categoria}</span>
            <span className="text-gray-400">•</span>
            <span>Activo</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-600">
          <Phone className="w-3 h-3" />
          <span>{aliado.telefono}</span>
          <span className="text-gray-400">•</span>
          <Mail className="w-3 h-3" />
          <span>{aliado.correo}</span>
          <span className="text-gray-400">•</span>
          <MapPin className="w-3 h-3" />
          <span>{aliado.direccion}, {aliado.ciudad}</span>
          <span className="text-gray-400">•</span>
          <Calendar className="w-3 h-3" />
          <span>Registrado: {aliado.fechaRegistro}</span>
        </div>
      </div>

      {/* Información del Aliado */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="space-y-6">
              {/* Información de Contacto */}
              <div>
                <h3 className="text-gray-900 font-semibold text-base mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#922735]" />
                  Información de Contacto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Persona de contacto</label>
                    <p className="text-sm font-medium text-gray-900">{aliado.nombreContacto}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">RFC</label>
                    <p className="text-sm font-medium text-gray-900">{aliado.rfc || 'No especificado'}</p>
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div>
                <h3 className="text-gray-900 font-semibold text-base mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#922735]" />
                  Ubicación
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-900 mb-2">{aliado.direccion}</p>
                  <p className="text-sm text-gray-600">{aliado.ciudad}, {aliado.estado}</p>
                </div>
              </div>

              {/* Beneficios */}
              <div>
                <h3 className="text-gray-900 font-semibold text-base mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#922735]" />
                  Beneficios Ofrecidos
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-900">
                      <span className="text-[#922735] mt-1">•</span>
                      <span>Descuentos especiales para portadores de Pasaporte Joven</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-900">
                      <span className="text-[#922735] mt-1">•</span>
                      <span>Acceso prioritario a eventos y actividades</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-900">
                      <span className="text-[#922735] mt-1">•</span>
                      <span>Promociones exclusivas mensuales</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Estadísticas */}
              <div>
                <h3 className="text-gray-900 font-semibold text-base mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#922735]" />
                  Estadísticas
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-[#922735]">2</p>
                    <p className="text-xs text-gray-600 mt-1">Actividades</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-[#922735]">45</p>
                    <p className="text-xs text-gray-600 mt-1">Canjes</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-[#922735]">320</p>
                    <p className="text-xs text-gray-600 mt-1">Jóvenes</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-[#922735]">98%</p>
                    <p className="text-xs text-gray-600 mt-1">Satisfacción</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

