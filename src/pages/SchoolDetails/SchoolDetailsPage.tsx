import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Trophy, UserCircle, Briefcase } from "lucide-react";
import { useSchool, useSchoolCharacters } from "@/hooks/useSchools";
import { CharacterCard } from "@/components/common/Card/Character/CharacterCard";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import { Role } from "@/types/enums";
import styles from "./SchoolDetailsPage.module.css";

/**
 * School Detail Page
 * Displays individual school information with all characters
 *
 * Uses lucide-react:
 * - ArrowLeft (back button)
 * - Users, Trophy, UserCircle, Briefcase (stat icons)
 */
const SchoolDetailPage = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const id = schoolId ? parseInt(schoolId) : 0;

  const {
    data: school,
    isLoading: loadingSchool,
    error: errorSchool,
  } = useSchool(id);
  const {
    data: characters,
    isLoading: loadingCharacters,
    error: errorCharacters,
  } = useSchoolCharacters(school?.name || "");

  const isLoading = loadingSchool || loadingCharacters;
  const error = errorSchool || errorCharacters;

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading school details..." />;
  }

  if (error || !school) {
    return (
      <div className={styles.error}>
        <h2>Error Loading School</h2>
        <p>{error?.message || "School not found"}</p>
        <Link to="/schools" className={styles.backLink}>
          <ArrowLeft size={18} />
          <span>Back to Schools</span>
        </Link>
      </div>
    );
  }

  // Parse colors
  const colors = school.colors?.split(",").map((c) => c.trim()) || [
    "#1a1a1a",
    "#FF6600",
  ];
  const primaryColor = colors[0];
  const secondaryColor = colors[1] || colors[0];

  // Calculate role counts
  const playerCount =
    characters?.filter((c) => c.role === Role.PLAYER).length || 0;
  const coachCount =
    characters?.filter((c) => c.role === Role.COACH).length || 0;
  const managementCount =
    characters?.filter((c) => c.role === Role.MANAGEMENT).length || 0;
  const totalCount = characters?.length || 0;

  return (
    <div className={styles.page}>
      {/* Back Button */}
      <Link to="/schools" className={styles.backButton}>
        <ArrowLeft size={18} />
        <span>Back to Schools</span>
      </Link>

      {/* School Header */}
      <div
        className={styles.schoolHeader}
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        }}>
        <div className={styles.schoolInfo}>
          <h1 className={styles.schoolName}>{school.name}</h1>
          <div className={styles.schoolMeta}>
            <span className={styles.prefecture}>{school.prefecture}</span>
            {school.motto && (
              <>
                <span className={styles.separator}>•</span>
                <span className={styles.motto}>"{school.motto}"</span>
              </>
            )}
          </div>
          {school.mascot && (
            <div className={styles.mascot}>
              <span>Mascot: {school.mascot}</span>
            </div>
          )}
        </div>

        {/* Color Swatches */}
        <div className={styles.colorSwatches}>
          {colors.map((color, index) => (
            <div
              key={index}
              className={styles.colorSwatch}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: primaryColor }}>
            <Users size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{totalCount}</div>
            <div className={styles.statLabel}>Total Members</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#FF6600" }}>
            <Trophy size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{playerCount}</div>
            <div className={styles.statLabel}>Players</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#1976D2" }}>
            <UserCircle size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{coachCount}</div>
            <div className={styles.statLabel}>Coaches</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#7B1FA2" }}>
            <Briefcase size={24} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{managementCount}</div>
            <div className={styles.statLabel}>Management</div>
          </div>
        </div>
      </div>

      {/* Characters Section */}
      <div className={styles.charactersSection}>
        <h2 className={styles.sectionTitle}>Team Members</h2>

        {characters && characters.length > 0 ? (
          <div className={styles.grid}>
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => {
                  console.log("Character clicked:", character);
                }}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🏐</div>
            <h3>No Team Members</h3>
            <p>This school doesn't have any team members yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolDetailPage;
