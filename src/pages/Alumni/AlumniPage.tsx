import { useState } from "react";
import { Plus } from "lucide-react";
import { useAlumni, useFormerPlayers } from "@/hooks/useAlumni";
import { CharacterCard } from "@/components/common/Card/Character/CharacterCard";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import styles from "./AlumniPage.module.css";

/**
 * Alumni Page
 * Displays all alumni with former player filtering
 *
 * Uses lucide-react:
 * - Plus (add alumni button)
 */
const AlumniPage = () => {
  const [showFormerPlayersOnly, setShowFormerPlayersOnly] = useState(false);

  const {
    data: allAlumni,
    isLoading: loadingAll,
    error: errorAll,
  } = useAlumni();
  const {
    data: formerPlayers,
    isLoading: loadingFormer,
    error: errorFormer,
  } = useFormerPlayers();

  const isLoading = showFormerPlayersOnly ? loadingFormer : loadingAll;
  const error = showFormerPlayersOnly ? errorFormer : errorAll;
  const alumni = showFormerPlayersOnly ? formerPlayers : allAlumni;

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading alumni..." />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Alumni</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  const formerPlayerCount = formerPlayers?.length || 0;
  const totalAlumniCount = allAlumni?.length || 0;

  return (
    <div className={styles.page}>
      {/* Header with Add Button */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Alumni</h1>
          <p className={styles.subtitle}>Former players and team members</p>
        </div>
        <button className={styles.addButton}>
          <Plus size={20} />
          <span>Add Alumni</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.totalStat}>
          <span className={styles.statValue}>{alumni?.length || 0}</span>
          <span className={styles.statLabel}>
            {showFormerPlayersOnly ? "Former Players" : "Total Alumni"}
          </span>
        </div>

        {/* Breakdown */}
        <div className={styles.breakdown}>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Total Alumni:</span>
            <span className={styles.breakdownValue}>{totalAlumniCount}</span>
          </div>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Former Players:</span>
            <span className={styles.breakdownValue}>{formerPlayerCount}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>
            <input
              type="checkbox"
              checked={showFormerPlayersOnly}
              onChange={(e) => setShowFormerPlayersOnly(e.target.checked)}
              className={styles.checkbox}
            />
            <span>Show Former Players Only</span>
          </label>
        </div>
      </div>

      {/* Alumni Grid */}
      {alumni && alumni.length > 0 ? (
        <div className={styles.grid}>
          {alumni.map((member) => (
            <CharacterCard
              key={member.id}
              character={member}
              onClick={() => {
                // TODO: Open alumni detail modal
                console.log("Alumni clicked:", member);
              }}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🎓</div>
          <h3>No Alumni Found</h3>
          <p>
            {showFormerPlayersOnly
              ? "No former players found."
              : 'No alumni have been created yet. Click "Add Alumni" to get started.'}
          </p>
          <button className={styles.emptyButton}>
            <Plus size={18} />
            <span>Add Your First Alumni</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AlumniPage;
