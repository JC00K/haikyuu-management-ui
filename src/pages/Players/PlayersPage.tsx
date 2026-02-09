import { useState } from "react";
import { Plus } from "lucide-react";
import { usePlayers } from "@/hooks/usePlayers";
import { PlayerCard } from "@/components/common/Card/Player/PlayerCard";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import { Position } from "@/types/enums";
import {
  getPositionDisplayName,
  getAllPositions,
  getPositionAbbreviation,
} from "@/types/enums/position.enum";
import { average } from "@/lib/utils";
import styles from "./PlayersPage.module.css";

/**
 * Players Page
 * Displays all players with position filtering
 * Shows player stats and allows creating new players
 *
 * Uses lucide-react:
 * - Plus (add player button)
 */
const PlayersPage = () => {
  const { data: players, isLoading, error } = usePlayers();
  const [selectedPosition, setSelectedPosition] = useState<Position | "ALL">(
    "ALL",
  );

  // Filter players by position
  const filteredPlayers = players?.filter(
    (player) =>
      selectedPosition === "ALL" || player.position === selectedPosition,
  );

  // Calculate position counts
  const positionCounts = players?.reduce(
    (acc, player) => {
      acc[player.position] = (acc[player.position] || 0) + 1;
      return acc;
    },
    {} as Record<Position, number>,
  );

  // Calculate average height
  const avgHeight = players ? average(players.map((p) => p.height)) : 0;

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading players..." />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Players</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header with Add Button */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Players</h1>
          <p className={styles.subtitle}>Manage your volleyball players</p>
        </div>
        <button className={styles.addButton}>
          <Plus size={20} />
          <span>Add Player</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.totalStat}>
          <span className={styles.statValue}>
            {filteredPlayers?.length || 0}
          </span>
          <span className={styles.statLabel}>
            {selectedPosition === "ALL"
              ? "Total Players"
              : getPositionDisplayName(selectedPosition)}
          </span>
        </div>

        {/* Average Height */}
        <div className={styles.avgStat}>
          <span className={styles.avgLabel}>Avg Height:</span>
          <span className={styles.avgValue}>{avgHeight.toFixed(1)} cm</span>
        </div>

        {/* Position Breakdown */}
        <div className={styles.positionBreakdown}>
          {getAllPositions()
            .filter((pos) => pos !== Position.NONE)
            .map((position) => (
              <div key={position} className={styles.positionStat}>
                <span className={styles.positionAbbr}>
                  {getPositionAbbreviation(position)}:
                </span>
                <span className={styles.positionValue}>
                  {positionCounts?.[position] || 0}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter by Position:</label>
          <select
            value={selectedPosition}
            onChange={(e) =>
              setSelectedPosition(e.target.value as Position | "ALL")
            }
            className={styles.filterSelect}>
            <option value="ALL">All Positions</option>
            {getAllPositions()
              .filter((pos) => pos !== Position.NONE)
              .map((position) => (
                <option key={position} value={position}>
                  {getPositionDisplayName(position)}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Players Grid */}
      {filteredPlayers && filteredPlayers.length > 0 ? (
        <div className={styles.grid}>
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onClick={() => {
                // TODO: Open player detail modal
                console.log("Player clicked:", player);
              }}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🏐</div>
          <h3>No Players Found</h3>
          <p>
            {selectedPosition === "ALL"
              ? 'No players have been created yet. Click "Add Player" to get started.'
              : `No ${getPositionDisplayName(selectedPosition).toLowerCase()}s found.`}
          </p>
          <button className={styles.emptyButton}>
            <Plus size={18} />
            <span>Add Your First Player</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayersPage;
