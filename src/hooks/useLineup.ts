import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { PlayerDTO } from "@/types/dto";
import { Position } from "@/types/enums";
import { groupBy } from "@/lib/utils";

/**
 * Lineup formation structure
 * Represents a volleyball starting lineup (7 players)
 */
export interface LineupFormation {
  setter: PlayerDTO | null; // 1 Setter
  middleBlockers: [PlayerDTO | null, PlayerDTO | null]; // 2 Middle Blockers
  wingSpikers: [PlayerDTO | null, PlayerDTO | null]; // 2 Wing Spikers
  outsideHitter: PlayerDTO | null; // 1 Outside Hitter
  libero: PlayerDTO | null; // 1 Libero
}

/**
 * Position slot type for drag & drop
 */
export type PositionSlot =
  | "setter"
  | "middleBlocker1"
  | "middleBlocker2"
  | "wingSpiker1"
  | "wingSpiker2"
  | "outsideHitter"
  | "libero";

/**
 * Empty lineup template
 */
const EMPTY_LINEUP: LineupFormation = {
  setter: null,
  middleBlockers: [null, null],
  wingSpikers: [null, null],
  outsideHitter: null,
  libero: null,
};

/**
 * Custom hook for managing volleyball lineup with drag & drop
 * Handles position constraints and local storage persistence
 *
 * @param rosterId - ID of the roster
 * @param players - Array of available players
 * @returns Lineup state and management functions
 *
 * @example
 * const { lineup, addPlayer, removePlayer, swapPlayers, resetLineup } = useLineup(1, players);
 */
export function useLineup(rosterId: number, players: PlayerDTO[] = []) {
  // Persist lineup in localStorage by roster ID
  const [lineup, setLineup, clearLineup] = useLocalStorage<LineupFormation>(
    `lineup_${rosterId}`,
    EMPTY_LINEUP,
  );

  /**
   * Auto-fill lineup from available players
   * Takes first N players of each position
   */
  const autoFillLineup = useCallback((): LineupFormation => {
    const byPosition = groupBy(players, "position");

    return {
      setter: byPosition[Position.SETTER]?.[0] || null,
      middleBlockers: [
        byPosition[Position.MIDDLE_BLOCKER]?.[0] || null,
        byPosition[Position.MIDDLE_BLOCKER]?.[1] || null,
      ],
      wingSpikers: [
        byPosition[Position.WING_SPIKER]?.[0] || null,
        byPosition[Position.WING_SPIKER]?.[1] || null,
      ],
      outsideHitter: byPosition[Position.OUTSIDE_HITTER]?.[0] || null,
      libero: byPosition[Position.LIBERO]?.[0] || null,
    };
  }, [players]);

  /**
   * Add player to specific position slot
   */
  const addPlayer = useCallback(
    (player: PlayerDTO, slot: PositionSlot) => {
      setLineup((current) => {
        const updated = { ...current };

        switch (slot) {
          case "setter":
            updated.setter = player;
            break;
          case "middleBlocker1":
            updated.middleBlockers = [player, current.middleBlockers[1]];
            break;
          case "middleBlocker2":
            updated.middleBlockers = [current.middleBlockers[0], player];
            break;
          case "wingSpiker1":
            updated.wingSpikers = [player, current.wingSpikers[1]];
            break;
          case "wingSpiker2":
            updated.wingSpikers = [current.wingSpikers[0], player];
            break;
          case "outsideHitter":
            updated.outsideHitter = player;
            break;
          case "libero":
            updated.libero = player;
            break;
        }

        return updated;
      });
    },
    [setLineup],
  );

  /**
   * Remove player from specific position slot
   */
  const removePlayer = useCallback(
    (slot: PositionSlot) => {
      setLineup((current) => {
        const updated = { ...current };

        switch (slot) {
          case "setter":
            updated.setter = null;
            break;
          case "middleBlocker1":
            updated.middleBlockers = [null, current.middleBlockers[1]];
            break;
          case "middleBlocker2":
            updated.middleBlockers = [current.middleBlockers[0], null];
            break;
          case "wingSpiker1":
            updated.wingSpikers = [null, current.wingSpikers[1]];
            break;
          case "wingSpiker2":
            updated.wingSpikers = [current.wingSpikers[0], null];
            break;
          case "outsideHitter":
            updated.outsideHitter = null;
            break;
          case "libero":
            updated.libero = null;
            break;
        }

        return updated;
      });
    },
    [setLineup],
  );

  /**
   * Swap two players in the lineup
   */
  const swapPlayers = useCallback(
    (slot1: PositionSlot, slot2: PositionSlot) => {
      setLineup((current) => {
        const updated = { ...current };

        const getPlayer = (slot: PositionSlot): PlayerDTO | null => {
          switch (slot) {
            case "setter":
              return current.setter;
            case "middleBlocker1":
              return current.middleBlockers[0];
            case "middleBlocker2":
              return current.middleBlockers[1];
            case "wingSpiker1":
              return current.wingSpikers[0];
            case "wingSpiker2":
              return current.wingSpikers[1];
            case "outsideHitter":
              return current.outsideHitter;
            case "libero":
              return current.libero;
          }
        };

        const player1 = getPlayer(slot1);
        const player2 = getPlayer(slot2);

        // Set player2 to slot1
        if (player2) {
          switch (slot1) {
            case "setter":
              updated.setter = player2;
              break;
            case "middleBlocker1":
              updated.middleBlockers = [player2, updated.middleBlockers[1]];
              break;
            case "middleBlocker2":
              updated.middleBlockers = [updated.middleBlockers[0], player2];
              break;
            case "wingSpiker1":
              updated.wingSpikers = [player2, updated.wingSpikers[1]];
              break;
            case "wingSpiker2":
              updated.wingSpikers = [updated.wingSpikers[0], player2];
              break;
            case "outsideHitter":
              updated.outsideHitter = player2;
              break;
            case "libero":
              updated.libero = player2;
              break;
          }
        }

        // Set player1 to slot2
        if (player1) {
          switch (slot2) {
            case "setter":
              updated.setter = player1;
              break;
            case "middleBlocker1":
              updated.middleBlockers = [player1, updated.middleBlockers[1]];
              break;
            case "middleBlocker2":
              updated.middleBlockers = [updated.middleBlockers[0], player1];
              break;
            case "wingSpiker1":
              updated.wingSpikers = [player1, updated.wingSpikers[1]];
              break;
            case "wingSpiker2":
              updated.wingSpikers = [updated.wingSpikers[0], player1];
              break;
            case "outsideHitter":
              updated.outsideHitter = player1;
              break;
            case "libero":
              updated.libero = player1;
              break;
          }
        }

        return updated;
      });
    },
    [setLineup],
  );

  /**
   * Reset lineup to empty state
   */
  const resetLineup = useCallback(() => {
    setLineup(EMPTY_LINEUP);
  }, [setLineup]);

  /**
   * Initialize lineup with auto-fill
   */
  const initializeLineup = useCallback(() => {
    const filled = autoFillLineup();
    setLineup(filled);
  }, [autoFillLineup, setLineup]);

  /**
   * Check if lineup is complete (all 7 positions filled)
   */
  const isComplete = useMemo(() => {
    return !!(
      lineup.setter &&
      lineup.middleBlockers[0] &&
      lineup.middleBlockers[1] &&
      lineup.wingSpikers[0] &&
      lineup.wingSpikers[1] &&
      lineup.outsideHitter &&
      lineup.libero
    );
  }, [lineup]);

  /**
   * Get all players currently in the lineup
   */
  const playersInLineup = useMemo(() => {
    const players: PlayerDTO[] = [];

    if (lineup.setter) players.push(lineup.setter);
    if (lineup.middleBlockers[0]) players.push(lineup.middleBlockers[0]);
    if (lineup.middleBlockers[1]) players.push(lineup.middleBlockers[1]);
    if (lineup.wingSpikers[0]) players.push(lineup.wingSpikers[0]);
    if (lineup.wingSpikers[1]) players.push(lineup.wingSpikers[1]);
    if (lineup.outsideHitter) players.push(lineup.outsideHitter);
    if (lineup.libero) players.push(lineup.libero);

    return players;
  }, [lineup]);

  /**
   * Get available players (not in lineup)
   */
  const availablePlayers = useMemo(() => {
    const inLineupIds = new Set(playersInLineup.map((p) => p.id));
    return players.filter((p) => !inLineupIds.has(p.id));
  }, [players, playersInLineup]);

  return {
    lineup,
    setLineup,
    addPlayer,
    removePlayer,
    swapPlayers,
    resetLineup,
    initializeLineup,
    autoFillLineup,
    clearLineup,
    isComplete,
    playersInLineup,
    availablePlayers,
  };
}
