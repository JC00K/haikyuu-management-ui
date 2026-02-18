import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useFans } from "@/hooks/useFans";
import { CharacterCard } from "@/components/common/Card/Character/CharacterCard";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import { Modal } from "@/components/common/Modal/Modal";
import { FanForm } from "@/components/forms/FanForm/FanForm";
import styles from "./FansPage.module.css";

/**
 * Fans Page
 * Displays all fans
 *
 * Uses lucide-react:
 * - Plus (add fan button)
 */
const FansPage = () => {
  const navigate = useNavigate();
  const { data: fans, isLoading, error } = useFans();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading fans..." />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Fans</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header with Add Button */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Fans</h1>
          <p className={styles.subtitle}>
            Volleyball enthusiasts and supporters
          </p>
        </div>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          <span>Add Fan</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.totalStat}>
          <span className={styles.statValue}>{fans?.length || 0}</span>
          <span className={styles.statLabel}>Total Fans</span>
        </div>
      </div>

      {/* Fans Grid */}
      {fans && fans.length > 0 ? (
        <div className={styles.grid}>
          {fans.map((fan) => (
            <CharacterCard
              key={fan.id}
              character={fan}
              onClick={() => navigate(`/characters/${fan.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>❤️</div>
          <h3>No Fans Found</h3>
          <p>No fans have been created yet. Click "Add Fan" to get started.</p>
          <button className={styles.emptyButton}>
            <Plus size={18} />
            <span>Add Your First Fan</span>
          </button>
        </div>
      )}

      {/* Add Fan Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Fan"
        size="lg">
        <FanForm
          onSuccess={() => {
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default FansPage;
