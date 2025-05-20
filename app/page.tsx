import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, ListTodo, Target } from 'lucide-react';

const features = [
  {
    title: 'Kelola Tugas',
    content: 'Buat, edit, dan kelola tugas dengan mudah',
    icon: <ListTodo className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Pengingat Deadline',
    content: 'Dapatkan notifikasi untuk deadline penting',
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Google Calendar',
    content: 'Sinkronisasi otomatis dengan Google Calendar',
    icon: <Calendar className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Manajemen Waktu',
    content: 'Atur prioritas dan fokus pada tugas penting',
    icon: <Target className="w-6 h-6 text-primary" />,
  },
];

type CardFeatureProps = {
  title: string;
  content: string;
  icon?: React.ReactNode;
};

function CardFeature({ title, content, icon }: CardFeatureProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-3">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center px-5 md:px-0">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-auto">
        <div className="lg:col-span-2 lg:row-span-3 flex flex-col justify-center gap-4">
          <h1 className="text-2xl font-bold">Jangan Lupa Deadline Tugasmu!</h1>
          <p className="text-muted-foreground">
            Aplikasi ini bantu kamu ngatur tugas dengan mudah dan terintegrasi
            langsung ke Google Calendar. Biar semua deadline tetap on track dan
            nggak kelewat!
          </p>
          <Button size="lg" className="w-1/2">
            Mulai Sekarang
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {features.map((feat, index) => (
            <CardFeature
              key={index}
              title={feat.title}
              content={feat.content}
              icon={feat.icon}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
