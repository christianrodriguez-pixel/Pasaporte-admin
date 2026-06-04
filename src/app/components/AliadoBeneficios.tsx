import {
  Home,
  ChevronRight,
  ArrowLeft,
  Gift,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Coins,
  ShieldCheck
} from 'lucide-react';

interface AliadoBeneficiosProps {
  aliado: any;
  onVolver: () => void;
}

export function AliadoBeneficios({ aliado, onVolver }: AliadoBeneficiosProps) {
  const cantidadBeneficios = aliado.beneficios || 0;
  const beneficiosBase = [
    {
      id: '1',
      nombre: `Descuento especial ${aliado.nombre}`,
      tipo: 'Descuento',
      categoria: aliado.categoria,
      vigenciaInicio: '01/01/2026',
      vigenciaFin: '31/12/2026',
      nivel: 'Todos los niveles',
      puntosRequeridos: 80,
      canjesRealizados: 34,
      limiteCanjes: 150,
      estado: 'Publicado'
    },
    {
      id: '2',
      nombre: `Promocion exclusiva ${aliado.ciudad}`,
      tipo: 'Promocion',
      categoria: aliado.categoria,
      vigenciaInicio: '01/03/2026',
      vigenciaFin: '30/09/2026',
      nivel: 'Protagonista',
      puntosRequeridos: 120,
      canjesRealizados: 18,
      limiteCanjes: 75,
      estado: 'Publicado'
    },
    {
      id: '3',
      nombre: `Beneficio joven ${aliado.tipo}`,
      tipo: 'Beneficio',
      categoria: aliado.categoria,
      vigenciaInicio: '15/05/2026',
      vigenciaFin: '15/11/2026',
      nivel: 'Todos los niveles',
      puntosRequeridos: 0,
      canjesRealizados: 52,
      limiteCanjes: 200,
      estado: 'Registrado'
    }
  ];

  const beneficios = beneficiosBase.slice(0, cantidadBeneficios);
  const totalCanjes = beneficios.reduce((total, beneficio) => total + beneficio.canjesRealizados, 0);
  const totalPuntosCanjeados = beneficios.reduce(
    (total, beneficio) => total + beneficio.canjesRealizados * beneficio.puntosRequeridos,
    0
  );
  const totalLimite = beneficios.reduce((total, beneficio) => total + beneficio.limiteCanjes, 0);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-2 text-xs md:text-sm mb-4 md:mb-6">
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 hidden sm:inline">Inicio</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <button onClick={onVolver} className="text-gray-600 hover:text-gray-900">
          Aliados
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">Beneficios del Aliado</span>
      </div>

      <button
        onClick={onVolver}
        className="mb-4 flex items-center gap-2 text-[#922735] hover:text-[#7a1f2d] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Volver al listado de aliados</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#FAF7F0' }}>
          <h1 className="text-[#922735] text-2xl font-bold mb-2">{aliado.nombre}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span>{aliado.tipo}</span>
            <span className="text-gray-400">-</span>
            <span>{aliado.categoria}</span>
            <span className="text-gray-400">-</span>
            <span>RFC: {aliado.rfc || 'No especificado'}</span>
          </div>
        </div>
        <div className="px-6 py-4 flex flex-wrap items-center gap-3 text-xs text-gray-600">
          <Phone className="w-3 h-3" />
          <span>{aliado.telefono}</span>
          <span className="text-gray-400">-</span>
          <Mail className="w-3 h-3" />
          <span>{aliado.correo}</span>
          <span className="text-gray-400">-</span>
          <MapPin className="w-3 h-3" />
          <span>{aliado.direccion}, {aliado.ciudad}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
            <Gift className="w-4 h-4 text-[#922735]" />
            Beneficios
          </div>
          <p className="text-2xl font-bold text-gray-900">{beneficios.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
            <Users className="w-4 h-4 text-[#922735]" />
            Usuarios con canje
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalCanjes}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
            <Coins className="w-4 h-4 text-[#922735]" />
            Puntos canjeados
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalPuntosCanjeados}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2">
            <ShieldCheck className="w-4 h-4 text-[#922735]" />
            Limite total
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalLimite}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#FAF7F0' }}>
          <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#922735]" />
            Beneficios registrados ({beneficios.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#C9A961] to-[#D4B871]">
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Beneficio</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Tipo / Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Vigencia</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Nivel</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Puntos por canje</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Usuarios con canje</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Puntos canjeados</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Limite</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {beneficios.map((beneficio) => {
                const puntosCanjeados = beneficio.canjesRealizados * beneficio.puntosRequeridos;
                const disponibles = beneficio.limiteCanjes - beneficio.canjesRealizados;

                return (
                  <tr key={beneficio.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{beneficio.nombre}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{beneficio.tipo}</span>
                        <span className="text-xs text-gray-500">{beneficio.categoria}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        {beneficio.vigenciaInicio} - {beneficio.vigenciaFin}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{beneficio.nivel}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{beneficio.puntosRequeridos}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{beneficio.canjesRealizados}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{puntosCanjeados}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{beneficio.canjesRealizados} / {beneficio.limiteCanjes}</span>
                        <span className="text-xs text-gray-500">{disponibles} disponibles</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{beneficio.estado}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {beneficios.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-500">
            Este aliado no tiene beneficios registrados.
          </div>
        )}
      </div>
    </div>
  );
}
