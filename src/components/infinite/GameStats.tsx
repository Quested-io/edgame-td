import { Card } from "@/components/ui/card";
import useInfiniteGameStore from '@/store/infiniteGameStore';
import { Trophy, Coins, Type, Star } from 'lucide-react';

export default function GameStats() {
  const { stats } = useInfiniteGameStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          <div>
            <div className="text-sm font-medium">Words Found</div>
            <div className="text-2xl">{stats.wordsFound}</div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4" />
          <div>
            <div className="text-sm font-medium">Coins Earned</div>
            <div className="text-2xl">{stats.coinsEarned}</div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4" />
          <div>
            <div className="text-sm font-medium">Longest Word</div>
            <div className="text-2xl">{stats.longestWord || '-'}</div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4" />
          <div>
            <div className="text-sm font-medium">Total Score</div>
            <div className="text-2xl">{stats.totalScore}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
