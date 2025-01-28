import { Badge } from "@/components/ui/badge";
import useInfiniteGameStore from '@/store/infiniteGameStore';

export default function LetterInventory() {
  const { letters } = useInfiniteGameStore();

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg justify-center">
      {Array.from(letters.entries()).map(([letter, count], index) => (
        <div key={index} className="relative">
          <Badge
            variant="secondary"
            className="text-lg px-4 py-2"
          >
            {letter.toUpperCase()}
            <span className="absolute -bottom-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
              {count}
            </span>
          </Badge>
        </div>
      ))}
    </div>
  );
}
