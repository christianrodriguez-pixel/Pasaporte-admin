import { useState } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';

interface Aliado {
  id: string;
  nombre: string;
  tipo?: string;
  categoria?: string;
}

interface SeleccionarAliadoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAliado: (aliado: Aliado) => void;
  aliados?: Aliado[];
}

export function SeleccionarAliadoModal({ isOpen, onClose, onSelectAliado, aliados }: SeleccionarAliadoModalProps) {
  const [busqueda, setBusqueda] = useState('');

  const aliadosDefault: Aliado[] = [
    { id: '1', nombre: 'Cinépolis Tampico', tipo: 'Empresa Privada', categoria: 'Entretenimiento' },
    { id: '2', nombre: 'Café Nómada', tipo: 'Comercio Local', categoria: 'Comercio' },
    { id: '3', nombre: 'Casa de la Cultura Victoria', tipo: 'Centro Cultural', categoria: 'Cultura' },
    { id: '4', nombre: 'Gimnasio Norte', tipo: 'Centro Deportivo', categoria: 'Deportes' },
    { id: '5', nombre: 'Librería Universitaria', tipo: 'Comercio Local', categoria: 'Educación' },
    { id: '6', nombre: 'Tech Hub Tamaulipas', tipo: 'Institución Educativa', categoria: 'Tecnología' }
  ];

  const listaAliados = aliados || aliadosDefault;

  const aliadosFiltrados = listaAliados.filter(aliado =>
    aliado.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSelectAliado = (aliado: Aliado) => {
    onSelectAliado(aliado);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="px-8 pt-6 pb-4 flex items-start justify-between border-b-0">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">SELECCIONAR ALIADO</h2>
            <p className="text-[#922735] font-semibold text-sm">
              Elige el aliado para el cual deseas crear una nueva actividad
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar aliado por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-3 border border-[#922735] rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#922735] focus:border-[#922735]"
                autoFocus
              />
            </div>
          </div>

          {/* Lista de aliados */}
          <div className="max-h-80 overflow-y-auto mb-6">
            {aliadosFiltrados.length > 0 ? (
              <div className="space-y-2">
                {aliadosFiltrados.map((aliado) => (
                  <button
                    key={aliado.id}
                    onClick={() => handleSelectAliado(aliado)}
                    className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left group border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-semibold text-base">
                          {aliado.nombre}
                        </h3>
                        {aliado.tipo && aliado.categoria && (
                          <p className="text-sm text-gray-500 mt-0.5">
                            {aliado.tipo} • {aliado.categoria}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500 text-sm">
                  No se encontraron aliados con ese nombre
                </p>
              </div>
            )}
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

