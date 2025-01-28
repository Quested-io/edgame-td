import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import useInfiniteGameStore from '@/store/infiniteGameStore';
import * as Icons from 'lucide-react';

interface RelicDisplayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RelicDisplay({ isOpen, onClose }: RelicDisplayProps) {
  const { relics } = useInfiniteGameStore();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Active Relics</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relics.map((relic) => {
            const Icon = Icons[relic.icon as keyof typeof Icons];
            return (
              <div
                key={relic.id}
                className="flex items-center gap-3 p-3 bg-muted rounded-lg"
              >
                {/*@ts-expect-error dynamic icon*/}
                <Icon className="w-6 h-6" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{relic.name}</h3>
                    <Badge className={getRarityColor(relic.rarity)}>
                      {relic.rarity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {relic.description}
                  </p>
                </div>
              </div>
            );
          })}
          {relics.length === 0 && (
            <p className="text-muted-foreground col-span-2 text-center py-4">
              No relics found yet. Keep playing to discover some!
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
