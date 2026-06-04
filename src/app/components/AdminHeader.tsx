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
        /* Logo completo de Tamaulipas */
        <div className="flex items-center gap-3">
          {/* Icono T estilizado de Tamaulipas */}
          <svg className="h-8 w-8" viewBox="0 0 40 40" fill="none">
            <path d="M8 8 L20 8 L20 12 L16 12 L16 32 L24 32 L24 12 L20 12 L20 8 L32 8 L32 12 L28 12 L28 36 L12 36 L12 12 L8 12 Z" fill="white"/>
            <path d="M6 10 L10 6 L10 14 L6 10 Z M30 10 L34 6 L34 14 L30 10 Z" fill="white"/>
          </svg>
          {/* Texto Tamaulipas */}
          <span className="text-white font-semibold text-lg tracking-wide">Tamaulipas</span>
          {/* Círculo con R */}
          <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center ml-1">
            <span className="text-white text-xs font-bold">R</span>
          </div>
        </div>
      )}
    </header>
  );
}

