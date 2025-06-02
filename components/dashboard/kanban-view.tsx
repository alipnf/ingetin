import { Wrench, AlertCircle, ArrowLeft } from 'lucide-react';

interface KanbanViewProps {
  setViewMode: (mode: 'list' | 'kanban') => void;
}

export function KanbanView({ setViewMode }: KanbanViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-md w-full shadow-lg">
        <div className="flex justify-center mb-4">
          <Wrench className="w-16 h-16 text-gray-600" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Sedang Dalam Maintenance
          </h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Fitur Kanban View sedang dalam proses pemeliharaan untuk meningkatkan
          performa dan menambahkan fitur baru yang lebih baik.
        </p>

        <p className="text-xs text-gray-500 mb-6">
          Terima kasih atas pengertiannya. Kami akan segera mengembalikan fitur
          ini dengan pengalaman yang lebih baik.
        </p>

        <button
          onClick={() => setViewMode('list')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke List View
        </button>
      </div>
    </div>
  );
}
