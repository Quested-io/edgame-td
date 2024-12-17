import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlayerTower } from '@/types/game';
import TowerCard from './TowerCard';

interface TowerInventoryProps {
  isOpen: boolean;
  onClose: () => void;
  towers: PlayerTower[];
  onEquipTower: (towerId: string) => void;
  isPreGame?: boolean;
}

export default function TowerInventory({
  isOpen,
  onClose,
  towers,
  onEquipTower,
  isPreGame = false
}: TowerInventoryProps) {
  const equippedCount = towers.filter(t => t.isEquipped).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isPreGame ? 'Select Towers for Battle' : 'Tower Inventory'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-sm text-muted-foreground mb-4">
          {isPreGame ? (
            <p>Select up to 5 towers to use in battle. Choose wisely!</p>
          ) : (
            <p>Your collection of towers. Unlock more by completing levels!</p>
          )}
          <p className="mt-2">Equipped: {equippedCount}/5</p>
        </div>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {towers.filter(t => t.isUnlocked).map((tower) => (
              <TowerCard
                key={tower.id}
                tower={tower}
                onEquip={onEquipTower}
                disabled={!tower.isEquipped && equippedCount >= 5}
                showEquip={isPreGame}
              />
            ))}
          </div>
        </ScrollArea>

        {isPreGame && (
          <div className="mt-4 flex justify-end">
            <Button
              onClick={onClose}
              disabled={equippedCount === 0}
            >
              Start Battle
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}