import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useSchools } from "@/hooks/useSchools";
import { SchoolCard } from "@/components/common/Card/School/SchoolCard";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import { unique } from "@/lib/utils";
import styles from "./SchoolsPage.module.css";

/**
 * Schools Page
 * Displays all schools with prefecture filtering
 *
 * Uses lucide-react:
 * - Plus (add school button)
 */
const SchoolsPage = () => {
  const { data: schools, isLoading, error } = useSchools();
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("ALL");

  // Get unique prefectures from schools
  const prefectures = useMemo(() => {
    if (!schools) return [];
    return unique(schools.map((s) => s.prefecture).filter(Boolean)).sort();
  }, [schools]);

  // Filter schools by prefecture
  const filteredSchools = schools?.filter(
    (school) =>
      selectedPrefecture === "ALL" || school.prefecture === selectedPrefecture,
  );

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading schools..." />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Schools</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header with Add Button */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Schools</h1>
          <p className={styles.subtitle}>
            Manage volleyball schools and academies
          </p>
        </div>
        <button className={styles.addButton}>
          <Plus size={20} />
          <span>Add School</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.totalStat}>
          <span className={styles.statValue}>
            {filteredSchools?.length || 0}
          </span>
          <span className={styles.statLabel}>
            {selectedPrefecture === "ALL"
              ? "Total Schools"
              : `Schools in ${selectedPrefecture}`}
          </span>
        </div>

        {/* Prefecture Breakdown */}
        <div className={styles.breakdown}>
          {prefectures.slice(0, 5).map((prefecture) => (
            <div key={prefecture} className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>{prefecture}:</span>
              <span className={styles.breakdownValue}>
                {schools?.filter((s) => s.prefecture === prefecture).length ||
                  0}
              </span>
            </div>
          ))}
          {prefectures.length > 5 && (
            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>
                +{prefectures.length - 5} more
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter by Prefecture:</label>
          <select
            value={selectedPrefecture}
            onChange={(e) => setSelectedPrefecture(e.target.value)}
            className={styles.filterSelect}>
            <option value="ALL">All Prefectures</option>
            {prefectures.map((prefecture) => (
              <option key={prefecture} value={prefecture}>
                {prefecture}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schools Grid */}
      {filteredSchools && filteredSchools.length > 0 ? (
        <div className={styles.grid}>
          {filteredSchools.map((school) => (
            <SchoolCard
              key={school.id}
              school={school}
              onClick={() => {
                // TODO: Navigate to school detail page
                console.log("School clicked:", school);
              }}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🏫</div>
          <h3>No Schools Found</h3>
          <p>
            {selectedPrefecture === "ALL"
              ? 'No schools have been created yet. Click "Add School" to get started.'
              : `No schools found in ${selectedPrefecture}.`}
          </p>
          <button className={styles.emptyButton}>
            <Plus size={18} />
            <span>Add Your First School</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SchoolsPage;
