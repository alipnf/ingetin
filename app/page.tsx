import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center px-5 md:px-0">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-auto">
        {/* Section Text / Hero */}
        <div className="lg:col-span-2 lg:row-span-3 flex flex-col justify-center gap-4">
          <h1 className="text-2xl font-bold">Jangan Lupa Deadline Tugasmu!</h1>
          <p className="text-muted-foreground">
            Aplikasi ini bantu kamu ngatur tugas dengan mudah dan terintegrasi
            langsung ke Google Calendar. Biar semua deadline tetap on track dan
            nggak kelewat!
          </p>
          <Button size={'lg'} className="w-1/2">
            Mulai Sekarang
          </Button>
        </div>

        {/* Cards - Responsive Grid */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <CardFeature />
          <CardFeature />
          <CardFeature />
          <CardFeature />
        </div>
      </div>
    </main>
  );
}

function CardFeature() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
