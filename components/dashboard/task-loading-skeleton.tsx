import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export function TaskLoadingSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-2">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
        {/* Description skeleton */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Deadline skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
        </div>

        {/* Link skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
        </div>

        {/* Status skeleton */}
        <div className="space-y-1.5">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {/* Edit button skeleton */}
        <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
        {/* Delete button skeleton */}
        <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
      </CardFooter>
    </Card>
  );
}

// Multiple loading skeletons
export function TaskLoadingGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(count)].map((_, i) => (
        <TaskLoadingSkeleton key={i} />
      ))}
    </div>
  );
}

// Simple loading card
export function SimpleLoadingCard() {
  return (
    <div className="h-40 bg-gray-200 animate-pulse rounded-lg border" />
  );
}

// List of simple loading cards
export function SimpleLoadingList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <SimpleLoadingCard key={i} />
      ))}
    </div>
  );
} 