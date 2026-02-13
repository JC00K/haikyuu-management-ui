import { useSchools } from "@/hooks/useSchools";
import { RosterCard } from "@/components/common/Card/Roster/RosterCard";
import { RosterWithId } from "@/types/dto";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import { Users } from "lucide-react";
import styles from "./RostersPage.module.css";

/**
 * Rosters Page
 * Displays all rosters with member counts
 * Allows browsing and managing team rosters
 *
 * Uses lucide-react:
 * - Users (roster icon)
 */
const RostersPage = () => {
  const { data: schools, isLoading, error } = useSchools();

  // Transform schools into rosters with metadata
  const rosters: RosterWithId[] =
    schools?.map((school) => ({
      id: school.id || 0,
      schoolId: school.id || 0,
      schoolName: school.name,
      schoolColors: school.colors,
      players: school.roster?.players || [],
      coaches: school.roster?.coaches || [],
      management: school.roster?.management || [],
    })) || [];

  // Calculate averages
  const avgPlayersPerRoster =
    rosters && rosters.length > 0
      ? (
          rosters.reduce((sum, r) => sum + (r.players?.length || 0), 0) /
          rosters.length
        ).toFixed(1)
      : 0;

  const avgCoachesPerRoster =
    rosters && rosters.length > 0
      ? (
          rosters.reduce((sum, r) => sum + (r.coaches?.length || 0), 0) /
          rosters.length
        ).toFixed(1)
      : 0;

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading rosters..." />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Rosters</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <Users size={32} />
          </div>
          <div>
            <h1 className={styles.title}>Rosters</h1>
            <p className={styles.subtitle}>Browse and manage team rosters</p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.totalStat}>
          <span className={styles.statValue}>{rosters?.length || 0}</span>
          <span className={styles.statLabel}>Total Rosters</span>
        </div>

        {/* Roster Breakdown */}
        <div className={styles.breakdown}>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Avg Players:</span>
            <span className={styles.breakdownValue}>{avgPlayersPerRoster}</span>
          </div>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Avg Coaches:</span>
            <span className={styles.breakdownValue}>{avgCoachesPerRoster}</span>
          </div>
        </div>
      </div>

      {/* Rosters Grid */}
      {rosters && rosters.length > 0 ? (
        <div className={styles.grid}>
          {rosters.map((roster) => (
            <RosterCard key={roster.id} roster={roster} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🏐</div>
          <h3>No Rosters Found</h3>
          <p>
            No rosters have been created yet. Create a school to get started.
          </p>
          <button className={styles.emptyButton}>
            <span>Go to Schools</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RostersPage;
