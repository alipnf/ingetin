import { TaskCardProps } from '@/types/task-card';

export const dummyTasks: TaskCardProps[] = [
  {
    title: 'Tugas Besar Pemrograman Web',
    description: 'Membuat website e-commerce menggunakan React dan Firebase',
    deadline: '2024-06-10',
    link: 'https://github.com/your-repo/tubes-web',
    status: 'proses',
    googleCalendar: true,
  },
  {
    title: 'Laporan Praktikum Jaringan Komputer',
    description:
      'Menyusun laporan hasil konfigurasi jaringan LAN & simulasi di Cisco Packet Tracer',
    deadline: '2024-06-05',
    status: 'belum',
    googleCalendar: false,
  },
  {
    title: 'Presentasi Proyek Akhir Kewirausahaan',
    description: 'Menyiapkan presentasi ide bisnis digital dan pitch deck',
    deadline: '2024-06-01',
    status: 'selesai',
    googleCalendar: true,
  },
  {
    title: 'Tugas Makalah Sistem Operasi',
    description:
      'Membuat makalah tentang perbandingan algoritma penjadwalan CPU',
    deadline: '2024-06-08',
    link: 'https://drive.google.com/your-makalah',
    status: 'belum',
    googleCalendar: false,
  },
];
