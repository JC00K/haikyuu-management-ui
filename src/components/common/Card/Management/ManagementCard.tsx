import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ManagementDTO } from "@/types/dto";
import { cn, formatHeight } from "@/lib/utils";
import { getManagementRoleDisplayName } from "@/types/enums/management-role.enum";
import styles from "./ManagementCard.module.css";

interface ManagementCardProps {
  management: ManagementDTO;
  onClick?: () => void;
  className?: string;
}

/**
 * Management Card Component
 * Displays management member information with role
 *
 * @param management - Management data
 * @param onClick - Optional click handler (if not provided, navigates to detail page)
 * @param className - Additional CSS classes
 */
export const ManagementCard = ({
  management,
  onClick,
  className,
}: ManagementCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/characters/${management.id}`);
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
            src={`/api/v1/proxy/image?url=${encodeURIComponent(management.imgUrl)}`}
            alt={management.name}
            className={styles.image}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>🏐</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{management.name}</h3>

        {/* Management Role Badge */}
        <span className={styles.roleBadge}>
          {getManagementRoleDisplayName(management.managementRole)}
        </span>

        {/* Details */}
        <div className={styles.details}>
          <span className={styles.detail}>Age: {management.age}</span>
          <span className={styles.detail}>
            {formatHeight(management.height)}
          </span>
        </div>

        {/* School */}
        <div className={styles.school}>
          {management.schoolName || "No School"}
        </div>
      </div>
    </div>
  );
};
