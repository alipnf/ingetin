import { TaskCardProps } from '@/types/task-card';

export const dummyTasks: TaskCardProps[] = [
  {
    title: 'Membuat UI Dashboard',
    description: 'Membuat tampilan dashboard dengan komponen yang reusable',
    deadline: '2024-03-25',
    link: 'https://github.com/your-repo/dashboard',
    status: 'proses',
  },
  {
    title: 'Implementasi Autentikasi',
    description: 'Mengimplementasikan sistem login dan register',
    deadline: '2024-03-28',
    status: 'belum',
  },
  {
    title: 'Setup Database',
    description: 'Menyiapkan struktur database dan relasi antar tabel',
    deadline: '2024-03-20',
    status: 'selesai',
  },
  {
    title: 'Testing API Endpoints',
    description: 'Melakukan testing untuk semua endpoint API',
    deadline: '2024-03-30',
    link: 'https://api-docs.example.com',
    status: 'belum',
  },
]; 