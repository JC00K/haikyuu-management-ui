import { useParams, Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Save, Shuffle } from "lucide-react";
import { useRosterPlayers } from "@/hooks/useRoster";
import { useLineup } from "@/hooks/useLineup";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import { getPositionDisplayName } from "@/types/enums/position.enum";
import { Position } from "@/types/enums";
import styles from "./LineupBuilderPage.module.css";

/**
 * Lineup Builder Page
 * Drag & drop interface for creating volleyball lineups
 *
 * Uses lucide-react:
 * - ArrowLeft (back button)
 * - RotateCcw (reset button)
 * - Save (save button)
 * - Shuffle (auto-fill button)
 *
 * Uses @dnd-kit (to be implemented):
 * - DndContext
 * - Draggable
 * - Droppable
 *
 * NOTE: This is a placeholder structure. Full drag & drop will be implemented separately.
 */
const LineupBuilderPage = () => {
  const { rosterId } = useParams<{ rosterId: string }>();
  const id = rosterId ? parseInt(rosterId) : 0;

  const { data: players, isLoading } = useRosterPlayers(id);
  const {
    lineup,
    isComplete,
    initializeLineup,
    resetLineup,
    playersInLineup,
    availablePlayers,
  } = useLineup(id, players || []);

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading lineup builder..." />;
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <Link to={`/roster/${id}`} className={styles.backButton}>
          <ArrowLeft size={18} />
          <span>Back to Roster</span>
        </Link>

        <div className={styles.actions}>
          <button className={styles.actionButton} onClick={initializeLineup}>
            <Shuffle size={18} />
            <span>Auto-Fill</span>
          </button>
          <button className={styles.actionButton} onClick={resetLineup}>
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
          <button className={styles.saveButton} disabled={!isComplete}>
            <Save size={18} />
            <span>Save Lineup</span>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Lineup Builder</h1>
        <p className={styles.subtitle}>
          {isComplete
            ? "✅ Lineup is complete!"
            : `${playersInLineup.length}/7 positions filled`}
        </p>
      </div>

      {/* Court Layout - Placeholder */}
      <div className={styles.courtSection}>
        <h2 className={styles.sectionTitle}>Volleyball Court</h2>
        <div className={styles.court}>
          {/* Back Row */}
          <div className={styles.courtRow}>
            <div className={styles.courtLabel}>Back Row</div>
            <div className={styles.positionSlot}>
              <div className={styles.positionLabel}>
                {getPositionDisplayName(Position.WING_SPIKER)} 1
              </div>
              {lineup.wingSpikers[0] ? (
                <div className={styles.playerInSlot}>
                  {lineup.wingSpikers[0].name}
                  <span className={styles.playerNumber}>
                    #{lineup.wingSpikers[0].jerseyNumber}
                  </span>
                </div>
              ) : (
                <div className={styles.emptySlot}>Drop player here</div>
              )}
            </div>
            <div className={styles.positionSlot}>
              <div className={styles.positionLabel}>
                {getPositionDisplayName(Position.MIDDLE_BLOCKER)} 1
              </div>
              {lineup.middleBlockers[0] ? (
                <div className={styles.playerInSlot}>
                  {lineup.middleBlockers[0].name}
                  <span className={styles.playerNumber}>
                    #{lineup.middleBlockers[0].jerseyNumber}
                  </span>
                </div>
              ) : (
                <div className={styles.emptySlot}>Drop player here</div>
              )}
            </div>
            <div className={styles.positionSlot}>
              <div className={styles.positionLabel}>
                {getPositionDisplayName(Position.SETTER)}
              </div>
              {lineup.setter ? (
                <div className={styles.playerInSlot}>
                  {lineup.setter.name}
                  <span className={styles.playerNumber}>
                    #{lineup.setter.jerseyNumber}
                  </span>
                </div>
              ) : (
                <div className={styles.emptySlot}>Drop player here</div>
              )}
            </div>
          </div>

          {/* Front Row */}
          <div className={styles.courtRow}>
            <div className={styles.courtLabel}>Front Row</div>
            <div className={styles.positionSlot}>
              <div className={styles.positionLabel}>
                {getPositionDisplayName(Position.OUTSIDE_HITTER)}
              </div>
              {lineup.outsideHitter ? (
                <div className={styles.playerInSlot}>
                  {lineup.outsideHitter.name}
                  <span className={styles.playerNumber}>
                    #{lineup.outsideHitter.jerseyNumber}
                  </span>
                </div>
              ) : (
                <div className={styles.emptySlot}>Drop player here</div>
              )}
            </div>
            <div className={styles.positionSlot}>
              <div className={styles.positionLabel}>
                {getPositionDisplayName(Position.MIDDLE_BLOCKER)} 2
              </div>
              {lineup.middleBlockers[1] ? (
                <div className={styles.playerInSlot}>
                  {lineup.middleBlockers[1].name}
                  <span className={styles.playerNumber}>
                    #{lineup.middleBlockers[1].jerseyNumber}
                  </span>
                </div>
              ) : (
                <div className={styles.emptySlot}>Drop player here</div>
              )}
            </div>
            <div className={styles.positionSlot}>
              <div className={styles.positionLabel}>
                {getPositionDisplayName(Position.WING_SPIKER)} 2
              </div>
              {lineup.wingSpikers[1] ? (
                <div className={styles.playerInSlot}>
                  {lineup.wingSpikers[1].name}
                  <span className={styles.playerNumber}>
                    #{lineup.wingSpikers[1].jerseyNumber}
                  </span>
                </div>
              ) : (
                <div className={styles.emptySlot}>Drop player here</div>
              )}
            </div>
          </div>

          {/* Libero */}
          <div className={styles.liberoRow}>
            <div className={styles.positionSlot}>
              <div className={styles.positionLabel}>
                {getPositionDisplayName(Position.LIBERO)}
              </div>
              {lineup.libero ? (
                <div className={styles.playerInSlot}>
                  {lineup.libero.name}
                  <span className={styles.playerNumber}>
                    #{lineup.libero.jerseyNumber}
                  </span>
                </div>
              ) : (
                <div className={styles.emptySlot}>Drop player here</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bench - Available Players */}
      <div className={styles.benchSection}>
        <h2 className={styles.sectionTitle}>
          Bench ({availablePlayers.length} available)
        </h2>
        <div className={styles.bench}>
          {availablePlayers.map((player) => (
            <div key={player.id} className={styles.benchPlayer}>
              <div className={styles.benchPlayerName}>{player.name}</div>
              <div className={styles.benchPlayerMeta}>
                #{player.jerseyNumber} •{" "}
                {getPositionDisplayName(player.position)}
              </div>
            </div>
          ))}
          {availablePlayers.length === 0 && (
            <div className={styles.emptyBench}>
              All players are in the lineup
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className={styles.infoBox}>
        <h3>🚧 Drag & Drop Coming Soon</h3>
        <p>
          Full drag & drop functionality will be implemented using @dnd-kit. For
          now, use the "Auto-Fill" button to populate the lineup.
        </p>
        <p>
          <strong>Position Requirements:</strong> 1 Setter, 2 Middle Blockers, 2
          Wing Spikers, 1 Outside Hitter, 1 Libero
        </p>
      </div>
    </div>
  );
};

export default LineupBuilderPage;
