import {
  Home,
  ChevronRight,
  ArrowLeft,
  Users,
  Mail,
  Download,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface ActividadDetalleProps {
  actividad: any;
  aliado: any;
  onInicio?: () => void;
  onVolver: () => void;
}

const usuariosInscritos = [
  {
    id: '1',
    nombre: 'Maria Gonzalez Hernandez',
    municipio: 'Victoria',
    telefono: '834-123-4567',
    correo: 'maria.gonzalez@email.com',
    puntos: 1250,
    checkIns: 18,
    asistio: true,
    nivel: 'protagonista',
    estado: 'activo'
  },
  {
    id: '2',
    nombre: 'Juan Carlos Perez Lopez',
    municipio: 'Tampico',
    telefono: '833-234-5678',
    correo: 'juan.perez@email.com',
    puntos: 0,
    checkIns: 0,
    asistio: false,
    nivel: 'basico',
    estado: 'suspendido'
  },
  {
    id: '3',
    nombre: 'Ana Sofia Martinez Ruiz',
    municipio: 'Reynosa',
    telefono: '899-345-6789',
    correo: 'ana.martinez@email.com',
    puntos: 850,
    checkIns: 12,
    asistio: true,
    nivel: 'basico',
    estado: 'en-revision'
  },
  {
    id: '4',
    nombre: 'Carlos Eduardo Ramirez Sanchez',
    municipio: 'Matamoros',
    telefono: '868-456-7890',
    correo: 'carlos.ramirez@email.com',
    puntos: 2100,
    checkIns: 25,
    asistio: true,
    nivel: 'leyenda',
    estado: 'activo'
  },
  {
    id: '5',
    nombre: 'Luisa Fernanda Torres Garcia',
    municipio: 'Nuevo Laredo',
    telefono: '867-567-8901',
    correo: 'luisa.torres@email.com',
    puntos: 1680,
    checkIns: 22,
    asistio: true,
    nivel: 'protagonista',
    estado: 'activo'
  }
];

const getNivelTexto = (nivel: string) => {
  const niveles: Record<string, string> = {
    basico: 'Basico',
    protagonista: 'Protagonista',
    leyenda: 'Leyenda'
  };
  return niveles[nivel] ?? nivel;
};

const getEstadoTexto = (estado: string) => {
  const estados: Record<string, string> = {
    activo: 'Activo',
    suspendido: 'Suspendido',
    'en-revision': 'En revision'
  };
  return estados[estado] ?? estado;
};

export function ActividadDetalle({ actividad, aliado, onInicio, onVolver }: ActividadDetalleProps) {
  const fechaInicio = actividad.fechaInicio ?? actividad.fecha ?? '-';
  const fechaFin = actividad.fechaFin ?? actividad.fecha ?? '-';
  const puntos = actividad.puntosOtorgados ?? actividad.puntosRequeridos ?? 0;
  const totalAsistentes = usuariosInscritos.filter((usuario) => usuario.asistio).length;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6 flex-wrap">
        <button
          type="button"
          onClick={onInicio}
          className="flex items-center gap-2 text-gray-600 hover:text-[#922735] transition-colors disabled:cursor-default disabled:hover:text-gray-600"
          disabled={!onInicio}
        >
          <Home className="w-4 h-4 text-gray-500" />
          <span className="hidden sm:inline">Inicio</span>
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <button onClick={onVolver} className="text-gray-600 hover:text-[#922735] transition-colors">
          Explora
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Detalle de Actividad</span>
      </div>

      <button
        onClick={onVolver}
        className="mb-4 flex items-center gap-2 text-[#922735] hover:text-[#7a1f2d] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Volver a Explora</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#FAF7F0' }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-gray-900 font-bold text-base md:text-lg">{actividad.nombre}</h1>
            <span className="inline-flex w-fit px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
              {actividad.estado}
            </span>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <h2 className="text-[#922735] font-semibold text-sm mb-4">Informacion del registro</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <span className="text-gray-600 font-semibold">Aliado:</span>
              <span className="text-gray-900">{actividad.aliado || aliado.nombre}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <span className="text-gray-600 font-semibold">Tipo:</span>
              <span className="text-gray-900">{actividad.tipo}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <span className="text-gray-600 font-semibold">Clasificacion:</span>
              <span className="text-gray-900">{actividad.clasificacion}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <span className="text-gray-600 font-semibold">Categoria:</span>
              <span className="text-gray-900">{actividad.categoria}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <span className="text-gray-600 font-semibold">Nivel:</span>
              <span className="text-gray-900">{actividad.nivel}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <span className="text-gray-600 font-semibold">Puntos:</span>
              <span className="text-gray-900">{puntos} pts</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <span className="text-gray-600 font-semibold">Vigencia:</span>
              <span className="text-gray-900">{fechaInicio} - {fechaFin}</span>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <span className="text-gray-600 font-semibold">Ubicacion:</span>
              <span className="text-gray-900">{actividad.ubicacion ?? 'Tamaulipas'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ backgroundColor: '#FAF7F0' }}>
          <div>
            <h2 className="text-[#922735] font-semibold text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              Usuarios inscritos
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Asistieron {totalAsistentes} de {usuariosInscritos.length} usuarios inscritos.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition-colors">
            <Download className="w-4 h-4" />
            Exportar lista
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Municipio</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Telefono</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Correo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Nivel</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Check-in</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuariosInscritos.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{usuario.nombre}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{usuario.municipio}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{usuario.telefono}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-gray-500" />
                      {usuario.correo}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{getNivelTexto(usuario.nivel)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {usuario.asistio ? (
                      <div className="flex items-center gap-1 text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>Si</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-700">
                        <XCircle className="w-4 h-4" />
                        <span>No</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{getEstadoTexto(usuario.estado)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {usuariosInscritos.length === 0 && (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No hay usuarios inscritos en esta actividad</p>
          </div>
        )}
      </div>
    </div>
  );
}
