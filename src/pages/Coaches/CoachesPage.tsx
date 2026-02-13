import { useState } from "react";
import { Plus } from "lucide-react";
import { useCoaches } from "@/hooks/useCoaches";
import { CharacterCard } from "@/components/common/Card/Character/CharacterCard";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import { CoachRole, CoachingStyle } from "@/types/enums";
import {
  getCoachRoleDisplayName,
  getAllCoachRoles,
} from "@/types/enums/coach-role.enum";
import {
  getCoachingStyleDisplayName,
  getAllCoachingStyles,
} from "@/types/enums/coaching-style.enum";
import styles from "./CoachesPage.module.css";

/**
 * Coaches Page
 * Displays all coaches with role and style filtering
 *
 * Uses lucide-react:
 * - Plus (add coach button)
 */
const CoachesPage = () => {
  const { data: coaches, isLoading, error } = useCoaches();
  const [selectedRole, setSelectedRole] = useState<CoachRole | "ALL">("ALL");
  const [selectedStyle, setSelectedStyle] = useState<CoachingStyle | "ALL">(
    "ALL",
  );

  // Filter coaches
  const filteredCoaches = coaches?.filter((coach) => {
    const roleMatch =
      selectedRole === "ALL" || coach.coachRole === selectedRole;
    const styleMatch =
      selectedStyle === "ALL" || coach.coachingStyle === selectedStyle;
    return roleMatch && styleMatch;
  });

  // Calculate stats
  const headCoachCount =
    coaches?.filter((c) => c.coachRole === CoachRole.HEAD).length || 0;
  const assistantCoachCount =
    coaches?.filter((c) => c.coachRole === CoachRole.ASSISTANT).length || 0;
  const activeCoachCount = coaches?.filter((c) => !c.isRetired).length || 0;
  const retiredCoachCount = coaches?.filter((c) => c.isRetired).length || 0;

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading coaches..." />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Coaches</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header with Add Button */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Coaches</h1>
          <p className={styles.subtitle}>Manage your coaching staff</p>
        </div>
        <button className={styles.addButton}>
          <Plus size={20} />
          <span>Add Coach</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.totalStat}>
          <span className={styles.statValue}>
            {filteredCoaches?.length || 0}
          </span>
          <span className={styles.statLabel}>Total Coaches</span>
        </div>

        {/* Role Breakdown */}
        <div className={styles.breakdown}>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Head:</span>
            <span className={styles.breakdownValue}>{headCoachCount}</span>
          </div>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Assistant:</span>
            <span className={styles.breakdownValue}>{assistantCoachCount}</span>
          </div>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Active:</span>
            <span className={styles.breakdownValue}>{activeCoachCount}</span>
          </div>
          <div className={styles.breakdownItem}>
            <span className={styles.breakdownLabel}>Retired:</span>
            <span className={styles.breakdownValue}>{retiredCoachCount}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter by Role:</label>
          <select
            value={selectedRole}
            onChange={(e) =>
              setSelectedRole(e.target.value as CoachRole | "ALL")
            }
            className={styles.filterSelect}>
            <option value="ALL">All Roles</option>
            {getAllCoachRoles()
              .filter(
                (role) =>
                  role == CoachRole.HEAD || role === CoachRole.ASSISTANT,
              )
              .map((role) => (
                <option key={role} value={role}>
                  {getCoachRoleDisplayName(role)}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter by Style:</label>
          <select
            value={selectedStyle}
            onChange={(e) =>
              setSelectedStyle(e.target.value as CoachingStyle | "ALL")
            }
            className={styles.filterSelect}>
            <option value="ALL">All Styles</option>
            {getAllCoachingStyles()
              .filter((style) => style !== CoachingStyle.NONCOACH)
              .map((style) => (
                <option key={style} value={style}>
                  {getCoachingStyleDisplayName(style)}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Coaches Grid */}
      {filteredCoaches && filteredCoaches.length > 0 ? (
        <div className={styles.grid}>
          {filteredCoaches.map((coach) => (
            <CharacterCard
              key={coach.id}
              character={coach}
              onClick={() => {
                // TODO: Open coach detail modal
                console.log("Coach clicked:", coach);
              }}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>👨‍🏫</div>
          <h3>No Coaches Found</h3>
          <p>
            {selectedRole === "ALL" && selectedStyle === "ALL"
              ? 'No coaches have been created yet. Click "Add Coach" to get started.'
              : "No coaches match the selected filters."}
          </p>
          <button className={styles.emptyButton}>
            <Plus size={18} />
            <span>Add Your First Coach</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CoachesPage;
