import * as Icons from 'lucide-react';
import { PlayerTower } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface TowerIconProps {
  tower: PlayerTower;
  isDisabled: boolean;
  onEquip: (towerId: string) => void;
}

export default function TowerIcon({ tower, isDisabled, onEquip }: TowerIconProps) {
  const Icon = Icons[tower.icon as keyof typeof Icons];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={tower.isEquipped ? "default" : "outline"}
          size="icon"
          className="w-16 h-16"
          onClick={() => onEquip(tower.id)}
          disabled={!tower.isEquipped && isDisabled}
        >
          <Icon className="w-8 h-8" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-bold">{tower.name}</p>
        <p className="text-sm">{tower.description}</p>
        <p className="text-sm text-muted-foreground">Word: {tower.activationWord}</p>
        <p className="text-sm text-muted-foreground">Cooldown: {tower.cooldown / 1000}s</p>
      </TooltipContent>
    </Tooltip>
  );
}