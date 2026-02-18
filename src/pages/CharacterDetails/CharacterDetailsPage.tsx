import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useCharacter } from "@/hooks/useCharacters";
import { usePlayer } from "@/hooks/usePlayers";
import { useCoach } from "@/hooks/useCoaches";
import { useManagementMember } from "@/hooks/useManagement";
import { useAlumniMember } from "@/hooks/useAlumni";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import { getRoleColor } from "@/lib/theme";
import { getPositionDisplayName } from "@/types/enums/position.enum";
import { getCoachRoleDisplayName } from "@/types/enums/coach-role.enum";
import { getCoachingStyleDisplayName } from "@/types/enums/coaching-style.enum";
import { getManagementRoleDisplayName } from "@/types/enums/management-role.enum";
import { getYearDisplayName } from "@/types/enums/year.enum";
import { Role } from "@/types/enums";
import { formatHeight } from "@/lib/utils";
import styles from "./CharacterDetailsPage.module.css";

/**
 * Character Detail Page
 * Displays detailed information for any character type
 * Fetches base character first, then fetches subtype-specific data based on role
 *
 * Uses lucide-react:
 * - ArrowLeft (back button)
 * - Edit (edit button)
 * - Trash2 (delete button)
 */
const CharacterDetailPage = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const id = characterId ? parseInt(characterId) : 0;

  // Fetch base character to determine role
  const {
    data: character,
    isLoading: loadingCharacter,
    error: errorCharacter,
  } = useCharacter(id);

  // Conditionally fetch subtype based on role
  const { data: player, isLoading: loadingPlayer } = usePlayer(id, {
    enabled: character?.role === Role.PLAYER,
  });
  const { data: coach, isLoading: loadingCoach } = useCoach(id, {
    enabled: character?.role === Role.COACH,
  });
  const { data: management, isLoading: loadingManagement } =
    useManagementMember(id, {
      enabled: character?.role === Role.MANAGEMENT,
    });
  const { data: alumni, isLoading: loadingAlumni } = useAlumniMember(id, {
    enabled: character?.role === Role.ALUMNI,
  });

  const isLoading =
    loadingCharacter ||
    loadingPlayer ||
    loadingCoach ||
    loadingManagement ||
    loadingAlumni;

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading character..." />;
  }

  if (errorCharacter || !character) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Character</h2>
        <p>{errorCharacter?.message || "Character not found"}</p>
        <button onClick={() => navigate(-1)} className={styles.backLink}>
          <ArrowLeft size={18} />
          <span>Go Back</span>
        </button>
      </div>
    );
  }

  const roleColor = getRoleColor(character.role);

  // Get role-specific details from the appropriate subtype
  const getRoleSpecificInfo = () => {
    if (character.role === Role.PLAYER && player) {
      return [
        { label: "Position", value: getPositionDisplayName(player.position) },
        { label: "Jersey Number", value: player.jerseyNumber != null ? `#${player.jerseyNumber}` : "Not found" },
        {
          label: "Year",
          value: player.year ? getYearDisplayName(player.year) : "N/A",
        },
      ];
    }

    if (character.role === Role.COACH && coach) {
      return [
        {
          label: "Coach Role",
          value: getCoachRoleDisplayName(coach.coachRole),
        },
        {
          label: "Coaching Style",
          value: getCoachingStyleDisplayName(coach.coachingStyle),
        },
        { label: "Status", value: coach.isRetired ? "Retired" : "Active" },
      ];
    }

    if (character.role === Role.MANAGEMENT && management) {
      return [
        {
          label: "Management Role",
          value: getManagementRoleDisplayName(management.managementRole),
        },
      ];
    }

    if (character.role === Role.ALUMNI && alumni) {
      return [
        {
          label: "Type",
          value: alumni.formerPlayer ? "Former Player" : "Alumni",
        },
      ];
    }

    return [];
  };

  const roleSpecificInfo = getRoleSpecificInfo();

  return (
    <div className={styles.page}>
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      {/* Character Header */}
      <div className={styles.header} style={{ backgroundColor: roleColor }}>
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <img
              src={`/api/v1/proxy/image?url=${encodeURIComponent(character.imgUrl)}`}
              alt={character.name}
              className={styles.image}
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400"><text x="50%" y="50%" font-size="48" text-anchor="middle">🏐</text></svg>';
              }}
            />
          </div>
        </div>

        <div className={styles.headerInfo}>
          <div className={styles.roleBadge}>{character.role}</div>
          <h1 className={styles.name}>{character.name}</h1>
          <div className={styles.basicInfo}>
            <span>Age: {character.age ?? "Not found"}</span>
            <span>•</span>
            <span>{formatHeight(character.height)}</span>
            {character.schoolName && (
              <>
                <span>•</span>
                <span>{character.schoolName}</span>
              </>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.editButton}>
            <Edit size={18} />
            <span>Edit</span>
          </button>
          <button className={styles.deleteButton}>
            <Trash2 size={18} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Role-Specific Information */}
      {roleSpecificInfo.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {character.role === Role.PLAYER && "Player Details"}
            {character.role === Role.COACH && "Coach Details"}
            {character.role === Role.MANAGEMENT && "Management Details"}
            {character.role === Role.ALUMNI && "Alumni Details"}
            {character.role === Role.FAN && "Fan Details"}
          </h2>
          <div className={styles.infoGrid}>
            {roleSpecificInfo.map((info) => (
              <div key={info.label} className={styles.infoItem}>
                <div className={styles.infoLabel}>{info.label}</div>
                <div className={styles.infoValue}>{info.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* General Information */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>General Information</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Role</div>
            <div className={styles.infoValue}>{character.role}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Age</div>
            <div className={styles.infoValue}>
              {character.age != null ? `${character.age} years` : "Not found"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>Height</div>
            <div className={styles.infoValue}>
              {formatHeight(character.height)}
            </div>
          </div>
          {character.schoolName && (
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>School</div>
              <div className={styles.infoValue}>{character.schoolName}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;
