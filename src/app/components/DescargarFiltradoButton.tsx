import { Download } from 'lucide-react';

interface DescargarFiltradoButtonProps {
  filename: string;
}

const limpiarTexto = (valor: string) => valor.replace(/\s+/g, ' ').trim();

const escaparCsv = (valor: string) => {
  const limpio = limpiarTexto(valor);
  return `"${limpio.replace(/"/g, '""')}"`;
};

export function DescargarFiltradoButton({ filename }: DescargarFiltradoButtonProps) {
  const descargarCsv = () => {
    const tabla = document.querySelector('main table');
    if (!tabla) return;

    const filas = Array.from(tabla.querySelectorAll('tr'));
    const contenido = filas
      .map((fila) =>
        Array.from(fila.querySelectorAll('th, td'))
          .map((celda) => escaparCsv(celda.textContent ?? ''))
          .join(',')
      )
      .join('\n');

    const blob = new Blob([`\ufeff${contenido}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={descargarCsv}
      className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-white transition-colors"
    >
      <Download className="w-4 h-4 text-[#922735]" />
      Descargar
    </button>
  );
}
