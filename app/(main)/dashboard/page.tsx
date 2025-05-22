import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Dashboard() {
  return (
    <main className="container mx-auto min-h-screen justify-center px-5 md:px-0">
      <h1>hello</h1>

      <Tabs defaultValue="semua">
        <TabsList className="w-full">
          <TabsTrigger value="semua">semua</TabsTrigger>
          <TabsTrigger value="belum dikerjakan">belum dikerjakan</TabsTrigger>
          <TabsTrigger value="sedang dikerjakan">sedang dikerjakan</TabsTrigger>
          <TabsTrigger value="selesai">selesai</TabsTrigger>
        </TabsList>
        <TabsContent value="semua">semua</TabsContent>
        <TabsContent value="belum dikerjakan">belum dikerjakan</TabsContent>
        <TabsContent value="sedang dikerjakan">sedang dikerjakan</TabsContent>
        <TabsContent value="selesai">selesai</TabsContent>
      </Tabs>
    </main>
  );
}
