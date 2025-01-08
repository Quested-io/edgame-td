export function generateRandomWord(activationWords: string[]): string {
  if (!activationWords || activationWords.length === 0) {
    throw new Error("No activation words provided");
  }
  return activationWords[Math.floor(Math.random() * activationWords.length)];
}

export function spawnWord(
  words: string[],
  speed: number,
  lanes: number
): {
  id: string;
  word: string;
  position: number;
  lane: number;
  speed: number;
  originalSpeed: number;
} {
  if (!words || words.length === 0) {
    throw new Error("No words provided for spawning");
  }

  const word = words[Math.floor(Math.random() * words.length)];
  const lane = Math.floor(Math.random() * lanes);

  console.log("Spawning word", word, "in lane", lane);
  return {
    id: Date.now().toString(),
    word,
    position: 0,
    lane,
    speed,
    originalSpeed: speed,
  };
}
