import {
  LayoutDashboard,
  Users,
  Handshake,
  FolderTree,
  FileText,
  Settings,
  UserCog,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Award,
  BookOpen,
  Bell,
  Building2,
  Tag,
  Star,
  MapPin,
  Newspaper,
  Gift
} from 'lucide-react';
import { useState } from 'react';
import injuveLogo from '../../imports/injuve-tamaulipas.png';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export function Sidebar({ collapsed, onToggle, activeModule, onModuleChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogosExpanded, setCatalogosExpanded] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'usuario-joven', label: 'Usuario Joven', icon: Users },
    { id: 'aliados', label: 'Aliados', icon: Handshake },
    { id: 'beneficios', label: 'Beneficios Disponibles', icon: Gift },
    { id: 'actividades-modulo', label: 'Explora', icon: Star },
    { id: 'noticias', label: 'Noticias', icon: Newspaper },
    { id: 'catalogos', label: 'Catálogos', icon: FolderTree },
    { id: 'reportes', label: 'Reportes', icon: FileText },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
    { id: 'administrador', label: 'Administrador', icon: UserCog },
  ];
  
  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 w-14 h-14 bg-[#922735] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#7a1f2d] transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 top-[73px]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-white shadow-lg transition-all duration-300 z-40
          ${collapsed ? 'w-[60px]' : 'w-[240px]'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
      {/* Header del sidebar con botón de colapsar */}
      <div className="h-[95px] p-4 border-b border-gray-200">
        {!collapsed ? (
          <div className="h-full flex items-center justify-between gap-3">
            <div className="flex-1 flex flex-col items-start justify-center">
              <img src={injuveLogo} alt="INJUVE Tamaulipas" className="h-[22px] w-auto object-contain" />
              <p className="mt-2 text-gray-500 text-[11px] leading-tight">
                Sistema Administrativo<br />Pasaporte Joven
              </p>
            </div>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>
      
      {/* Menu items */}
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          // Catálogos tiene submenú
          if (item.id === 'catalogos') {
            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (!collapsed) {
                      setCatalogosExpanded(!catalogosExpanded);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    activeModule === 'niveles' || activeModule === 'tipos-aliados' || activeModule === 'categorias-aliados' || activeModule === 'clasificaciones' || activeModule === 'tipos-beneficios' || activeModule === 'zonas-geograficas' || isActive
                      ? 'bg-[#922735] text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
                  {!collapsed && (
                    <>
                      <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${catalogosExpanded ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </button>

                {/* Submenú de Catálogos */}
                {!collapsed && catalogosExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    <button
                      onClick={() => {
                        onModuleChange('niveles');
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                        activeModule === 'niveles'
                          ? 'bg-[#C9A961] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Award className="w-4 h-4 flex-shrink-0" />
                      <span>Niveles</span>
                    </button>
                    <button
                      onClick={() => {
                        onModuleChange('tipos-aliados');
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                        activeModule === 'tipos-aliados'
                          ? 'bg-[#C9A961] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span>Tipos de Aliados</span>
                    </button>
                    <button
                      onClick={() => {
                        onModuleChange('categorias-aliados');
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                        activeModule === 'categorias-aliados'
                          ? 'bg-[#C9A961] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Tag className="w-4 h-4 flex-shrink-0" />
                      <span>Categorías</span>
                    </button>
                    <button
                      onClick={() => {
                        onModuleChange('clasificaciones');
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                        activeModule === 'clasificaciones'
                          ? 'bg-[#C9A961] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FolderTree className="w-4 h-4 flex-shrink-0" />
                      <span>clasificaciones</span>
                    </button>
                    <button
                      onClick={() => {
                        onModuleChange('tipos-beneficios');
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                        activeModule === 'tipos-beneficios'
                          ? 'bg-[#C9A961] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Gift className="w-4 h-4 flex-shrink-0" />
                      <span>Tipos de Beneficios</span>
                    </button>
                    <button
                      onClick={() => {
                        onModuleChange('zonas-geograficas');
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                        activeModule === 'zonas-geograficas'
                          ? 'bg-[#C9A961] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>Zonas Geográficas</span>
                    </button>
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.id}
              translate={item.id === 'dashboard' ? 'no' : undefined}
              onClick={() => {
                onModuleChange(item.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-[#922735] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <Icon className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
              {!collapsed && (
                <span className="text-sm font-medium" translate={item.id === 'dashboard' ? 'no' : undefined}>{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Documento Técnico al final */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
        <button
          onClick={() => {
            onModuleChange('documento-tecnico');
            setMobileOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
            activeModule === 'documento-tecnico'
              ? 'bg-[#C9A961] text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100'
          } ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Documento Técnico' : ''}
        >
          <BookOpen className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
          {!collapsed && (
            <span className="text-sm font-medium">Documento Técnico</span>
          )}
        </button>
      </div>
    </aside>
    </>
  );
}

