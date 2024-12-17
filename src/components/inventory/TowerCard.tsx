import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayerTower } from '@/types/game';
import * as Icons from 'lucide-react';

interface TowerCardProps {
  tower: PlayerTower;
  onEquip: (towerId: string) => void;
  disabled: boolean;
  showEquip: boolean;
}

const rarityColors = {
  common: 'bg-slate-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-amber-500'
};

export default function TowerCard({ tower, onEquip, disabled, showEquip }: TowerCardProps) {
  const Icon = Icons[tower.icon as keyof typeof Icons];

  return (
    <Card className={tower.isEquipped ? 'border-primary' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {tower.name}
          </CardTitle>
          <Badge className={rarityColors[tower.rarity]}>
            {tower.rarity}
          </Badge>
        </div>
        <CardDescription>{tower.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p>Activation Word: <span className="font-mono">{tower.activationWord}</span></p>
          <p>Cooldown: {tower.cooldown / 1000}s</p>
          {showEquip && (
            <Button
              variant={tower.isEquipped ? "outline" : "default"}
              className="w-full mt-2"
              onClick={() => onEquip(tower.id)}
              disabled={disabled && !tower.isEquipped}
            >
              {tower.isEquipped ? 'Remove' : 'Equip'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}