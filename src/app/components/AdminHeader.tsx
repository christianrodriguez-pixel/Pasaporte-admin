import tamaulipasLogo from '../../imports/tamaulipas-horizontal-blanco.png';

export function AdminHeader() {
  return (
    <header className="bg-[#922735] h-[72px] px-6 flex items-center shadow-md">
      <img src={tamaulipasLogo} alt="Tamaulipas Gobierno del Estado" className="h-[47px] w-auto" />
    </header>
  );
}

