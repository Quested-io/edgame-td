import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import TowerCard from "./TowerCard.tsx";
import useGameStore from "@/store/gameStore.ts";
import { allTowers } from "@/data/allTowers.ts";

interface TowerInventoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TowerInventory({
  isOpen,
  onClose,
}: TowerInventoryProps) {
  const { inventory } = useGameStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Tower Inventory</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground mb-4">
          <p>Your collection of towers. Unlock more by completing levels!</p>
        </div>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allTowers.map((tower) => (
              <TowerCard
                key={tower.id}
                tower={tower}
                playerTower={inventory?.towers.find(
                  (t) => t.towerId === tower.id
                )}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
