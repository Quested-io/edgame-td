import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Store, Trophy, Coins } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import useInfiniteGameStore from "@/store/infiniteGameStore";
import LetterInventory from "@/components/infinite/LetterInventory";
import ChestShop from "@/components/infinite/ChestShop";
import RelicDisplay from "@/components/infinite/RelicDisplay";
import EventDialog from "@/components/infinite/EventDialog";
import GameStats from "@/components/infinite/GameStats";
import { generateMerchantEvent, generateFortuneEvent, generateTradeEvent } from "@/data/events";
import { isValidWord } from "@/lib/wordDisctionary";

const INITIAL_LETTERS = ['a', 'e', 'i', 'o', 'u', 'r', 's', 't', 'n', 'l'];

export default function InfiniteModePage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [showShop, setShowShop] = useState(false);
  const [showRelics, setShowRelics] = useState(false);
  const [shouldTriggerEvent, setShouldTriggerEvent] = useState(false);
  const {
    letters,
    coins,
    currentEvent,
    wordsForNextEvent,
    addCoins,
    removeCoins,
    addLetters,
    removeLetters,
    wordCompleted,
    claimFreeCoins,
    setEvent,
    resetGame
  } = useInfiniteGameStore();

  // Reset game state when component mounts
  useEffect(() => {
    resetGame();
    addLetters(INITIAL_LETTERS);
  }, [resetGame, addLetters]);

  // Free coins timer
  useEffect(() => {
    const interval = setInterval(claimFreeCoins, 5000);
    return () => clearInterval(interval);
  }, [claimFreeCoins]);

  const triggerRandomEvent = useCallback(() => {
    const events = [
      () => generateMerchantEvent(addCoins, removeCoins, addLetters),
      () => generateFortuneEvent(addCoins, addLetters),
      () => generateTradeEvent(addLetters, removeLetters)
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    setEvent(randomEvent());
    setShouldTriggerEvent(false);
  }, [addCoins, removeCoins, addLetters, removeLetters, setEvent]);

  // Watch for event triggers
  useEffect(() => {
    if (shouldTriggerEvent && !currentEvent) {
      triggerRandomEvent();
    }
  }, [shouldTriggerEvent, currentEvent, triggerRandomEvent]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInput(value);

    if (isValidWord(value)) {
      console.log("Valid word", value);
      const canForm = canFormWord(value);
      if (canForm) {
        removeLetters(value.split(''));
        wordCompleted(value);
        addCoins(value.length * 10);
        setInput('');

        // Check if we should trigger an event after this word
        if (wordsForNextEvent === 1) { // Will become 0 after wordCompleted
          setShouldTriggerEvent(true);
        }

        toast({
          title: "Word Found!",
          description: `You earned ${value.length * 10} coins!`,
        });
      }
    }
  };

  const canFormWord = (word: string): boolean => {
    const letterCount = new Map<string, number>();
    for (const [letter, count] of letters) {
      letterCount.set(letter, count);
    }

    for (const letter of word) {
      const count = letterCount.get(letter) || 0;
      if (count === 0) return false;
      letterCount.set(letter, count - 1);
    }

    return true;
  };

  const handleChestPurchase = (cost: number) => {
    if (coins < cost) {
      toast({
        title: "Not enough coins",
        description: `You need ${cost - coins} more coins to buy this chest.`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleEventComplete = () => {
    setEvent(null);
  };

  const handleExit = () => {
    resetGame();
    navigate("/levels");
  };

  return (
    <div className="container p-4 space-y-4 max-w-4xl mx-auto">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">Infinite Word Builder</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              <span>{coins}</span>
            </div>
            <Button variant="outline" onClick={handleExit}>
              Exit Game
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <Button onClick={() => setShowShop(true)}>
            <Store className="w-4 h-4 mr-2" />
            Shop
          </Button>
          <Button variant="outline" onClick={() => setShowRelics(true)}>
            <Trophy className="w-4 h-4 mr-2" />
            Relics
          </Button>
        </div>

        <GameStats />
      </Card>

      <div className="space-y-4">
        <LetterInventory />

        <Input
          value={input}
          onChange={handleInput}
          placeholder="Type your word..."
          className="text-center text-xl py-6"
          autoFocus
        />
      </div>

      <ChestShop
        isOpen={showShop}
        onClose={() => setShowShop(false)}
        onPurchaseAttempt={handleChestPurchase}
      />
      <RelicDisplay isOpen={showRelics} onClose={() => setShowRelics(false)} />
      <EventDialog
        event={currentEvent}
        onClose={handleEventComplete}
      />
    </div>
  );
}
