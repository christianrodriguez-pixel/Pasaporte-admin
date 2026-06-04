import {
  Home,
  ChevronRight,
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  Eye,
  CheckCircle,
  Clock,
  Star,
  Building2,
  Phone,
  Mail,
  MoreVertical,
  QrCode,
  Copy
} from 'lucide-react';
import { useState } from 'react';
import { ActividadDetalle } from './ActividadDetalle';
import { GenerarQRModal } from './GenerarQRModal';

interface AliadoActividadesProps {
  aliado: any;
  onVolver: () => void;
}

export function AliadoActividades({ aliado, onVolver }: AliadoActividadesProps) {
  const [actividadSeleccionada, setActividadSeleccionada] = useState<any | null>(null);
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [actividadQR, setActividadQR] = useState<any | null>(null);

  // Mock data de actividades con usuarios inscritos y check-ins
  const actividades = [
    {
      id: '1',
      nombre: 'Taller de Emprendimiento Digital',
      tipo: 'Taller',
      fecha: '2024-06-15',
      hora: '10:00 AM',
      ubicacion: 'Centro Cultural, Tampico',
      puntosRequeridos: 50,
      puntosOtorgados: 100,
      prioridad: 'alta',
      estado: 'Activa',
      totalInscritos: 25,
      totalCheckIns: 22,
      inscritos: [
        { id: '1', nombre: 'Juan Pérez García', correo: 'juan.perez@email.com', hizoChekin: true, fechaChekin: '2024-06-15 10:15 AM' },
        { id: '2', nombre: 'María López Hernández', correo: 'maria.lopez@email.com', hizoChekin: true, fechaChekin: '2024-06-15 10:20 AM' },
        { id: '3', nombre: 'Carlos Ramírez Torres', correo: 'carlos.ramirez@email.com', hizoChekin: true, fechaChekin: '2024-06-15 10:18 AM' },
        { id: '4', nombre: 'Ana Martínez Flores', correo: 'ana.martinez@email.com', hizoChekin: false, fechaChekin: null },
        { id: '5', nombre: 'Luis González Reyes', correo: 'luis.gonzalez@email.com', hizoChekin: true, fechaChekin: '2024-06-15 10:25 AM' },
      ]
    },
    {
      id: '2',
      nombre: 'Concierto Jóvenes Talentos',
      tipo: 'Evento Cultural',
      fecha: '2024-06-20',
      hora: '7:00 PM',
      ubicacion: 'Teatro Municipal, Tampico',
      puntosRequeridos: 0,
      puntosOtorgados: 50,
      prioridad: 'destacada',
      estado: 'Próximamente',
      totalInscritos: 120,
      totalCheckIns: 0,
      inscritos: []
    },
    {
      id: '3',
      nombre: 'Descuento en Librería',
      tipo: 'Beneficio',
      fecha: '2024-05-01',
      hora: 'Todo el día',
      ubicacion: 'Todas las sucursales',
      puntosRequeridos: 20,
      puntosOtorgados: 0,
      prioridad: 'media',
      estado: 'Activa',
      totalInscritos: 0,
      totalCheckIns: 85,
      inscritos: []
    }
  ];

  if (actividadSeleccionada) {
    return (
      <ActividadDetalle
        actividad={actividadSeleccionada}
        aliado={aliado}
        onVolver={() => setActividadSeleccionada(null)}
      />
    );
  }

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
        <span className="text-gray-900 font-semibold">Actividades del Aliado</span>
      </div>

      {/* Botón volver */}
      <button
        onClick={onVolver}
        className="mb-4 flex items-center gap-2 text-[#922735] hover:text-[#7a1f2d] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Volver al listado de aliados</span>
      </button>

      {/* Información del Aliado */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="mb-3">
          <h1 className="text-[#922735] text-2xl font-bold mb-2">{aliado.nombre}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span>{aliado.tipo}</span>
            <span className="text-gray-400">•</span>
            <span>{aliado.categoria}</span>
            <span className="text-gray-400">•</span>
            <span>RFC: {aliado.rfc || 'No especificado'}</span>
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
          <span>Registro: {aliado.fechaRegistro}</span>
        </div>
      </div>

      {/* Actividades */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
            <Star className="w-5 h-5 text-[#922735]" />
            Actividades ({actividades.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actividad</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Fecha y Hora</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Puntos</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Inscritos</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Check-ins</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {actividades.map((actividad) => (
                <tr key={actividad.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{actividad.nombre}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{actividad.tipo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        {actividad.fecha}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {actividad.hora}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      {actividad.ubicacion}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {actividad.puntosRequeridos > 0 && (
                        <span className="text-xs text-gray-600">
                          -{actividad.puntosRequeridos} pts
                        </span>
                      )}
                      {actividad.puntosOtorgados > 0 && (
                        <span className="text-xs text-gray-600">
                          +{actividad.puntosOtorgados} pts
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{actividad.totalInscritos}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{actividad.totalCheckIns}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{actividad.estado}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative">
                      <button
                        onClick={() => setMenuAbierto(menuAbierto === actividad.id ? null : actividad.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {menuAbierto === actividad.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setMenuAbierto(null)}
                          />
                          <div className="absolute right-0 top-8 z-20 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                            <button
                              onClick={() => {
                                setActividadSeleccionada(actividad);
                                setMenuAbierto(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4 text-[#922735]" />
                              Ver Detalle
                            </button>
                            <button
                              onClick={() => {
                                setActividadSeleccionada(actividad);
                                setMenuAbierto(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Users className="w-4 h-4 text-[#922735]" />
                              Ver Usuarios
                            </button>
                            <button
                              onClick={() => {
                                setActividadQR(actividad);
                                setMenuAbierto(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <QrCode className="w-4 h-4 text-[#922735]" />
                              Generar QR
                            </button>
                            <button
                              onClick={() => {
                                const confirmacion = window.confirm(`¿Deseas duplicar la actividad "${actividad.nombre}"?`);
                                if (confirmacion) {
                                  alert('Actividad duplicada exitosamente');
                                }
                                setMenuAbierto(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <Copy className="w-4 h-4 text-[#922735]" />
                              Duplicar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {actividades.length === 0 && (
          <div className="p-12 text-center">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Este aliado no tiene actividades registradas</p>
          </div>
        )}
      </div>

      {/* Modal de QR */}
      {actividadQR && (
        <GenerarQRModal
          actividad={actividadQR}
          aliado={aliado}
          onClose={() => setActividadQR(null)}
        />
      )}
    </div>
  );
}

