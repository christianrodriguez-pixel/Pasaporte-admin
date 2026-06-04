import { X, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

interface GenerarQRModalProps {
  actividad: any;
  aliado: any;
  onClose: () => void;
}

export function GenerarQRModal({ actividad, aliado, onClose }: GenerarQRModalProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  // Datos para el QR
  const qrData = JSON.stringify({
    id: actividad.id,
    actividad: actividad.nombre,
    aliado: aliado.nombre,
    fecha: actividad.fecha || actividad.fechaInicio,
    hora: actividad.hora || '10:00 AM',
    ubicacion: actividad.ubicacion || 'Tampico, Tamaulipas',
    tipo: actividad.tipo,
    puntos: actividad.puntosOtorgados || actividad.puntosRequeridos || 0
  });

  const handleDescargar = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    // Convertir SVG a Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      // Descargar como PNG
      const link = document.createElement('a');
      link.download = `QR-${actividad.nombre.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Código QR de Actividad</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Información de la actividad */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h4 className="text-[#922735] font-bold text-lg mb-2">{actividad.nombre}</h4>
              <p className="text-sm text-gray-600 mb-1">{aliado.nombre}</p>
              <p className="text-xs text-gray-500">{actividad.fecha || actividad.fechaInicio} • {actividad.hora || '10:00 AM'}</p>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center">
              <div
                ref={qrRef}
                className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4"
              >
                <QRCodeSVG
                  value={qrData}
                  size={256}
                  level="H"
                  includeMargin={true}
                  bgColor="#ffffff"
                  fgColor="#922735"
                />
              </div>

              <p className="text-xs text-gray-500 text-center mb-4">
                Escanea este código QR para registrar tu asistencia
              </p>

              {/* Botones */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleDescargar}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#922735] text-white text-sm font-medium rounded-lg hover:bg-[#7a1f2d] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Descargar QR
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

