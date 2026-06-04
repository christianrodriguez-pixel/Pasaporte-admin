import tamaulipasLogo from '../../imports/tamaulipas-horizontal-blanco.png';

interface AdminHeaderProps {
  sidebarCollapsed: boolean;
}

export function AdminHeader({ sidebarCollapsed }: AdminHeaderProps) {
  return (
    <header className="bg-[#922735] h-[72px] px-6 flex items-center shadow-md">
      {sidebarCollapsed ? (
        /* Solo T cuando está colapsado */
        <div className="text-white font-bold text-4xl">T</div>
      ) : (
        <img src={tamaulipasLogo} alt="Tamaulipas Gobierno del Estado" className="h-[52px] w-auto" />
      )}
    </header>
  );
}

