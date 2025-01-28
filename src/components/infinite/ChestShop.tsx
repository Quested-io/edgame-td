import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { chests, VOWELS, CONSONANTS } from '@/data/chests';
import useInfiniteGameStore from '@/store/infiniteGameStore';
import { toast } from '@/hooks/use-toast';

interface ChestShopProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchaseAttempt: (cost: number) => boolean;
}

export default function ChestShop({ isOpen, onClose, onPurchaseAttempt }: ChestShopProps) {
  const { removeCoins, addLetters } = useInfiniteGameStore();
  const [purchasing, setPurchasing] = useState(false);

  const getRandomLetter = (pool: string[]): string => {
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const handlePurchase = (chestType: string) => {
    const chest = chests.find(c => c.id === chestType);
    if (!chest) return;

    if (!onPurchaseAttempt(chest.cost)) return;

    setPurchasing(true);
    let letters: string[] = [];

    switch (chest.type) {
      case 'basic':
        letters = Array(3).fill(0).map(() =>
          getRandomLetter([...VOWELS, ...CONSONANTS])
        );
        break;
      case 'vowel':
        letters = Array(3).fill(0).map(() => getRandomLetter(VOWELS));
        break;
      case 'consonant':
        letters = Array(3).fill(0).map(() => getRandomLetter(CONSONANTS));
        break;
      case 'special':
        letters = ['s', ...Array(2).fill(0).map(() =>
          getRandomLetter([...VOWELS, ...CONSONANTS])
        )];
        break;
    }

    removeCoins(chest.cost);
    addLetters(letters);

    toast({
      title: "Chest Opened!",
      description: `You got: ${letters.join(', ').toUpperCase()}`,
    });

    setPurchasing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Letter Shop</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chests.map((chest) => {
            const Icon = chest.IconComponent;
            return (
              <Card key={chest.id} className="p-4 flex flex-col items-center">
                <Icon className="w-8 h-8 mb-2" />
                <h3 className="font-semibold">{chest.name}</h3>
                <p className="text-sm text-muted-foreground text-center mb-2">
                  {chest.description}
                </p>
                <Button
                  onClick={() => handlePurchase(chest.id)}
                  disabled={purchasing}
                  className="w-full"
                >
                  {chest.cost} coins
                </Button>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
