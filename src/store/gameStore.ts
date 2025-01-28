import { create } from "zustand";
import { instance, IProfile } from "@quested/sdk";
import { allTowers } from "@/data/allTowers.ts";
import { allLevels } from "@/data/allLevels.ts";

export interface GameStore {
  player: null | IProfile;
  inventory: null | IPlayerInventory;
  stats: null | IPlayerStats;
  unlockTower: (towerId: string) => void;
  saveLevelResult: (levelId: string, score: number) => void;
  initPlayer(): void;
}

export interface IPlayerInventory {
  towers: IPlayerTower[];
  levels: IPlayerLevel[];
}

export interface IPlayerTower {
  towerId: string;
  usages: number;
  isUnlocked: boolean;
}

export interface IPlayerLevel {
  levelId: string;
  maxScore: number;
}

export interface IPlayerStats {
  gamesPlayed: number;
  maxInfiniteLevel: number;
}

// const DefaultStats: IPlayerStats = {
//   gamesPlayed: 0,
//   maxInfiniteLevel: 0,
// };

const DefaultInventory: IPlayerInventory = {
  towers: allTowers.map((t) => ({
    towerId: t.id,
    usages: 0,
    isUnlocked: false,
  })),
  levels: allLevels.map((l) => ({ levelId: l.id, maxScore: 0 })),
};

const useGameStore = create<GameStore>((set) => ({
  player: null,
  inventory: null,
  stats: null,
  unlockTower: (towerId) =>
    set((state) => {
      if (!state.inventory) return state; // Return original state if inventory is null
      const tower = allTowers.find((t) => t.id === towerId);
      if (!tower) return state; // Return original state if tower not found

      // Create a deep copy of the inventory to maintain immutability
      const updatedInventory = {
        ...state.inventory,
        towers: state.inventory.towers.map((t) =>
          t.towerId === towerId ? { ...t, isUnlocked: true } : t
        ),
      };

      instance.api.player.setGameProperty(
        "inventory",
        JSON.stringify(updatedInventory)
      );
      return { inventory: updatedInventory };
    }),
  saveLevelResult: (levelId, score) =>
    set((state) => {
      console.log("Saving level result: ", levelId, score, state.inventory);
      if (!state.inventory) return state; // Return original state if inventory is null
      const level = allLevels.find((l) => l.id === levelId);
      if (!level) return state; // Return original state if level not found

      // Create a deep copy of the inventory to maintain immutability
      const updatedInventory = {
        ...state.inventory,
        levels: state.inventory.levels.map((l) =>
          l.levelId === levelId
            ? { ...l, maxScore: Math.max(l.maxScore, score) }
            : l
        ),
      };

      console.log("Updated inventory: ", updatedInventory);
      instance.api.player.setGameProperty(
        "inventory",
        JSON.stringify(updatedInventory)
      );
      return { inventory: updatedInventory };
    }),
  initPlayer: async () => {
    instance.api.player
      .me()
      .then((profile) => {
        console.log("Profile: ", profile);
        if (!profile) return;
        set({ player: profile });
      })
      .catch((err) => {
        console.error(err);
        set({ player: null });
      });
    instance.api.player
      .getGameProperty("inventory")
      .then((inventory) => {
        console.log("Inventory: ", inventory);
        if (!inventory) {
          set({ inventory: DefaultInventory });
          return
        }
        console.log(JSON.parse(inventory));
        set({ inventory: JSON.parse(inventory) });
      })
      .catch((err) => {
        console.error(err);
        set({ inventory: DefaultInventory });
      });
  },
}));

export default useGameStore;
