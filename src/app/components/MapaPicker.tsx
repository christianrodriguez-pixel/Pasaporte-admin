import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface MapaPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialPosition?: { lat: number; lng: number };
}

export function MapaPicker({ onLocationSelect, initialPosition }: MapaPickerProps) {
  // Centro predeterminado en Tamaulipas (Victoria)
  const [position, setPosition] = useState<{ lat: number; lng: number }>(
    initialPosition || { lat: 23.7369, lng: -99.1411 }
  );

  // Actualizar posición cuando cambie initialPosition desde el padre
  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setPosition({ lat, lng });
    onLocationSelect(lat, lng);
  };

  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps?q=${position.lat},${position.lng}`, '_blank');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-gray-700 text-sm font-semibold">
          Coordenadas de ubicación
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-xs font-medium mb-2">
            Latitud
          </label>
          <input
            type="number"
            step="0.000001"
            value={position.lat}
            onChange={(e) => {
              const lat = parseFloat(e.target.value) || 0;
              handleLocationSelect(lat, position.lng);
            }}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-xs font-medium mb-2">
            Longitud
          </label>
          <input
            type="number"
            step="0.000001"
            value={position.lng}
            onChange={(e) => {
              const lng = parseFloat(e.target.value) || 0;
              handleLocationSelect(position.lat, lng);
            }}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-transparent"
          />
        </div>
      </div>

      {/* Mapa estático de OpenStreetMap */}
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-100" style={{ height: '300px' }}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${position.lng - 0.01},${position.lat - 0.01},${position.lng + 0.01},${position.lat + 0.01}&layer=mapnik&marker=${position.lat},${position.lng}`}
          title="Mapa de ubicación"
        />
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={openInGoogleMaps}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Ver en Google Maps
        </button>

        <div className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
          <p>
            Introduce manualmente las coordenadas o pega un link de Google Maps en el campo superior.
            El mapa se actualizará automáticamente.
          </p>
        </div>
      </div>
    </div>
  );
}

