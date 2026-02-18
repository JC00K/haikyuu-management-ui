import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCharacters } from "@/hooks/useCharacters";
import { CharacterCard } from "@/components/common/Card/Character/CharacterCard";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import { Role } from "@/types/enums";
import { getRoleDisplayName, getAllRoles } from "@/types/enums/role.enum";
import styles from "./AllCharactersPage.module.css";

/**
 * All Characters Page
 * Displays all characters regardless of subtype
 * Includes filtering by role
 */
const AllCharactersPage = () => {
  const navigate = useNavigate();
  const { data: characters, isLoading, error } = useCharacters();
  const [selectedRole, setSelectedRole] = useState<Role | "ALL">("ALL");

  // Filter characters by role
  const filteredCharacters = characters?.filter(
    (character) => selectedRole === "ALL" || character.role === selectedRole,
  );

  // Calculate role counts
  const roleCounts = characters?.reduce(
    (acc, char) => {
      acc[char.role] = (acc[char.role] || 0) + 1;
      return acc;
    },
    {} as Record<Role, number>,
  );

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading characters..." />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Characters</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>All Characters</h1>
        <p className={styles.subtitle}>
          Browse all characters across all roles
        </p>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.totalStat}>
          <span className={styles.statValue}>
            {filteredCharacters?.length || 0}
          </span>
          <span className={styles.statLabel}>
            {selectedRole === "ALL"
              ? "Total Characters"
              : getRoleDisplayName(selectedRole)}
          </span>
        </div>

        {/* Role Breakdown */}
        <div className={styles.roleBreakdown}>
          {getAllRoles().map((role) => (
            <div key={role} className={styles.roleStat}>
              <span className={styles.roleLabel}>
                {getRoleDisplayName(role)}:
              </span>
              <span className={styles.roleValue}>
                {roleCounts?.[role] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter by Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as Role | "ALL")}
            className={styles.filterSelect}>
            <option value="ALL">All Roles</option>
            {getAllRoles().map((role) => (
              <option key={role} value={role}>
                {getRoleDisplayName(role)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Characters Grid */}
      {filteredCharacters && filteredCharacters.length > 0 ? (
        <div className={styles.grid}>
          {filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => navigate(`/characters/${character.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🏐</div>
          <h3>No Characters Found</h3>
          <p>
            {selectedRole === "ALL"
              ? "No characters have been created yet."
              : `No ${getRoleDisplayName(selectedRole).toLowerCase()} found.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllCharactersPage;
