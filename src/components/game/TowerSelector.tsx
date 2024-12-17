import { ScrollArea } from '@/components/ui/scroll-area';
import { PlayerTower } from '@/types/game';
import TowerIcon from './TowerIcon';

interface TowerSelectorProps {
  towers: PlayerTower[];
  onEquipTower: (towerId: string) => void;
}

export default function TowerSelector({ towers, onEquipTower }: TowerSelectorProps) {
  const equippedCount = towers.filter(t => t.isEquipped).length;

  return (
    <ScrollArea className="h-24 w-full border rounded-lg p-2">
      <div className="flex gap-2">
        {towers.filter(t => t.isUnlocked).map((tower) => (
          <TowerIcon
            key={tower.id}
            tower={tower}
            isDisabled={!tower.isEquipped && equippedCount >= 5}
            onEquip={onEquipTower}
          />
        ))}
      </div>
    </ScrollArea>
  );
}