import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoachDTO } from "@/types/dto";
import { cn, formatHeight } from "@/lib/utils";
import { getCoachRoleDisplayName } from "@/types/enums/coach-role.enum";
import { getCoachingStyleDisplayName } from "@/types/enums/coaching-style.enum";
import styles from "./CardCard.module.css";

interface CoachCardProps {
  coach: CoachDTO;
  onClick?: () => void;
  className?: string;
}

/**
 * Coach Card Component
 * Displays coach information with coaching style and role
 *
 * @param coach - Coach data
 * @param onClick - Optional click handler (if not provided, navigates to detail page)
 * @param className - Additional CSS classes
 */
export const CoachCard = ({ coach, onClick, className }: CoachCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/characters/${coach.id}`);
    }
  };

  return (
    <div
      className={cn(styles.card, styles.clickable, className)}
      onClick={handleClick}>
      {/* Image */}
      <div className={styles.imageContainer}>
        {!imageError ? (
          <img
            src={`/api/v1/proxy/image?url=${encodeURIComponent(coach.imgUrl)}`}
            alt={coach.name}
            className={styles.image}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>🏐</span>
          </div>
        )}

        {/* Status Badge */}
        {coach.isRetired && <div className={styles.retiredBadge}>Retired</div>}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{coach.name}</h3>

        {/* Coach Role Badge */}
        <span className={styles.roleBadge}>
          {getCoachRoleDisplayName(coach.coachRole)}
        </span>

        {/* Coaching Style */}
        <div className={styles.styleInfo}>
          <span className={styles.styleLabel}>Style:</span>
          <span className={styles.styleValue}>
            {getCoachingStyleDisplayName(coach.coachingStyle)}
          </span>
        </div>

        {/* Details */}
        <div className={styles.details}>
          <span className={styles.detail}>Age: {coach.age}</span>
          <span className={styles.detail}>{formatHeight(coach.height)}</span>
        </div>

        {/* School */}
        <div className={styles.school}>{coach.schoolName || "No School"}</div>
      </div>
    </div>
  );
};
