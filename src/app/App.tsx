import { useState } from 'react';
import { AdminHeader } from './components/AdminHeader';
import { Sidebar } from './components/Sidebar';
import { UsuarioJovenList } from './components/UsuarioJovenList';
import { NivelesCatalogo } from './components/NivelesCatalogo';
import { DocumentoTecnico } from './components/DocumentoTecnico';
import { Notificaciones } from './components/Notificaciones';
import { AliadosList } from './components/AliadosList';
import { TiposAliadosCatalogo } from './components/TiposAliadosCatalogo';
import { CategoriasAliadosCatalogo } from './components/CategoriasAliadosCatalogo';
import { ClasificacionesCatalogo } from './components/ClasificacionesCatalogo';
import { BeneficiosCatalogo } from './components/BeneficiosCatalogo';
import { ZonasGeograficasCatalogo } from './components/ZonasGeograficasCatalogo';
import { ActividadesList } from './components/ActividadesList';
import { NoticiasList } from './components/NoticiasList';
import { BeneficiosList } from './components/BeneficiosList';

type ModuloType = 'dashboard' | 'usuario-joven' | 'aliados' | 'beneficios' | 'actividades-modulo' | 'noticias' | 'catalogos' | 'niveles' | 'tipos-aliados' | 'categorias-aliados' | 'clasificaciones' | 'tipos-beneficios' | 'zonas-geograficas' | 'reportes' | 'notificaciones' | 'configuracion' | 'administrador' | 'documento-tecnico';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [moduloActivo, setModuloActivo] = useState<ModuloType>('usuario-joven');

  const renderModulo = () => {
    switch (moduloActivo) {
      case 'usuario-joven':
        return <UsuarioJovenList />;
      case 'aliados':
        return <AliadosList />;
      case 'beneficios':
        return <BeneficiosList />;
      case 'actividades-modulo':
        return <ActividadesList onInicio={() => setModuloActivo('usuario-joven')} />;
      case 'noticias':
        return <NoticiasList />;
      case 'niveles':
        return <NivelesCatalogo />;
      case 'tipos-aliados':
        return <TiposAliadosCatalogo />;
      case 'categorias-aliados':
        return <CategoriasAliadosCatalogo />;
      case 'clasificaciones':
        return <ClasificacionesCatalogo />;
      case 'tipos-beneficios':
        return <BeneficiosCatalogo />;
      case 'zonas-geograficas':
        return <ZonasGeograficasCatalogo />;
      case 'notificaciones':
        return <Notificaciones />;
      case 'documento-tecnico':
        return <DocumentoTecnico />;
      default:
        return <UsuarioJovenList />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Header guindo */}
        <AdminHeader sidebarCollapsed={sidebarCollapsed} />
        {/* Franja amarilla */}
        <div className="h-1 bg-gradient-to-r from-[#C9A961] to-[#E4C989]" />
      </div>

      <div className="flex pt-[73px]">
        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeModule={moduloActivo}
          onModuleChange={setModuloActivo}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[60px]' : 'lg:ml-[240px]'}`}>
          {renderModulo()}
        </main>
      </div>
    </div>
  );
}
