import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Users } from "lucide-react";
import {
  useRoster,
  useRosterPlayers,
  useRosterCoaches,
  useRosterManagement,
  useRemoveCharacterFromRoster,
} from "@/hooks/useRoster";
import { CharacterCard } from "@/components/common/Card/Character/CharacterCard";
import { PlayerCard } from "@/components/common/Card/Player/PlayerCard";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import styles from "./RosterPage.module.css";

/**
 * Roster Page
 * Displays and manages roster members (players, coaches, management)
 *
 * Uses lucide-react:
 * - ArrowLeft (back button)
 * - Plus (add member button)
 * - Trash2 (remove member button)
 * - Users (roster icon)
 */
const RosterPage = () => {
  const { rosterId } = useParams<{ rosterId: string }>();
  const id = rosterId ? parseInt(rosterId) : 0;

  const { data: roster, isLoading: loadingRoster } = useRoster(id);
  const { data: players, isLoading: loadingPlayers } = useRosterPlayers(id);
  const { data: coaches, isLoading: loadingCoaches } = useRosterCoaches(id);
  const { data: management, isLoading: loadingManagement } =
    useRosterManagement(id);
  const removeCharacter = useRemoveCharacterFromRoster();

  const isLoading =
    loadingRoster || loadingPlayers || loadingCoaches || loadingManagement;

  const handleRemoveMember = (characterId: number) => {
    if (
      confirm("Are you sure you want to remove this member from the roster?")
    ) {
      removeCharacter.mutate({ rosterId: id, characterId });
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading roster..." />;
  }

  if (!roster) {
    return (
      <div className={styles.error}>
        <h2>Roster Not Found</h2>
        <p>The roster you're looking for doesn't exist.</p>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const totalMembers =
    (players?.length || 0) + (coaches?.length || 0) + (management?.length || 0);

  return (
    <div className={styles.page}>
      {/* Back Button */}
      <Link to="/" className={styles.backButton}>
        <ArrowLeft size={18} />
        <span>Back</span>
      </Link>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.rosterIcon}>
            <Users size={32} />
          </div>
          <div>
            <h1 className={styles.title}>Roster</h1>
            <p className={styles.subtitle}>Manage your team roster</p>
          </div>
        </div>
        <button className={styles.addButton}>
          <Plus size={20} />
          <span>Add Member</span>
        </button>
      </div>

      {/* Stats */}
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{totalMembers}</span>
          <span className={styles.statLabel}>Total Members</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{players?.length || 0}</span>
          <span className={styles.statLabel}>Players</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{coaches?.length || 0}</span>
          <span className={styles.statLabel}>Coaches</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{management?.length || 0}</span>
          <span className={styles.statLabel}>Management</span>
        </div>
      </div>

      {/* Players Section */}
      {players && players.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Players ({players.length})</h2>
          <div className={styles.grid}>
            {players.map((player) => (
              <div key={player.id} className={styles.cardWrapper}>
                <PlayerCard player={player} />
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveMember(player.id!)}
                  title="Remove from roster">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coaches Section */}
      {coaches && coaches.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Coaches ({coaches.length})</h2>
          <div className={styles.grid}>
            {coaches.map((coach) => (
              <div key={coach.id} className={styles.cardWrapper}>
                <CharacterCard character={coach} />
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveMember(coach.id!)}
                  title="Remove from roster">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Management Section */}
      {management && management.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Management ({management.length})
          </h2>
          <div className={styles.grid}>
            {management.map((member) => (
              <div key={member.id} className={styles.cardWrapper}>
                <CharacterCard character={member} />
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveMember(member.id!)}
                  title="Remove from roster">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalMembers === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🏐</div>
          <h3>No Roster Members</h3>
          <p>This roster is empty. Click "Add Member" to get started.</p>
          <button className={styles.emptyButton}>
            <Plus size={18} />
            <span>Add First Member</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RosterPage;
