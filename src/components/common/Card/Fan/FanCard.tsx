import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FanDTO } from "@/types/dto";
import { cn, formatHeight } from "@/lib/utils";
import styles from "./FanCard.module.css";

interface FanCardProps {
  fan: FanDTO;
  onClick?: () => void;
  className?: string;
}

/**
 * Fan Card Component
 * Displays fan information
 *
 * @param fan - Fan data
 * @param onClick - Optional click handler (if not provided, navigates to detail page)
 * @param className - Additional CSS classes
 */
export const FanCard = ({ fan, onClick, className }: FanCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/characters/${fan.id}`);
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
            src={`/api/v1/proxy/image?url=${encodeURIComponent(fan.imgUrl)}`}
            alt={fan.name}
            className={styles.image}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>❤️</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{fan.name}</h3>

        {/* Role Badge */}
        <span className={styles.roleBadge}>Fan</span>

        {/* Details */}
        <div className={styles.details}>
          <span className={styles.detail}>Age: {fan.age}</span>
          <span className={styles.detail}>{formatHeight(fan.height)}</span>
        </div>

        {/* School */}
        <div className={styles.school}>{fan.schoolName || "No School"}</div>
      </div>
    </div>
  );
};
