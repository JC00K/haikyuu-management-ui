import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlumniDTO } from "@/types/dto";
import { cn, formatHeight } from "@/lib/utils";
import styles from "./AlumniCard.module.css";

interface AlumniCardProps {
  alumni: AlumniDTO;
  onClick?: () => void;
  className?: string;
}

/**
 * Alumni Card Component
 * Displays alumni information with former player status
 *
 * @param alumni - Alumni data
 * @param onClick - Optional click handler (if not provided, navigates to detail page)
 * @param className - Additional CSS classes
 */
export const AlumniCard = ({ alumni, onClick, className }: AlumniCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/characters/${alumni.id}`);
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
            src={`/api/v1/proxy/image?url=${encodeURIComponent(alumni.imgUrl)}`}
            alt={alumni.name}
            className={styles.image}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>🎓</span>
          </div>
        )}

        {/* Former Player Badge */}
        {alumni.formerPlayer && (
          <div className={styles.formerPlayerBadge}>Former Player</div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{alumni.name}</h3>

        {/* Role Badge */}
        <span className={styles.roleBadge}>Alumni</span>

        {/* Details */}
        <div className={styles.details}>
          <span className={styles.detail}>Age: {alumni.age}</span>
          <span className={styles.detail}>{formatHeight(alumni.height)}</span>
        </div>

        {/* School */}
        <div className={styles.school}>{alumni.schoolName || "No School"}</div>
      </div>
    </div>
  );
};
