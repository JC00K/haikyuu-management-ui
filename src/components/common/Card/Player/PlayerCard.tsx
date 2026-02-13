import { useState } from "react";
import { PlayerDTO } from "@/types/dto";
import { getPositionColor } from "@/lib/theme";
import {
  getPositionDisplayName,
  getPositionAbbreviation,
} from "@/types/enums/position.enum";
import { cn, formatHeight, formatJerseyNumber } from "@/lib/utils";
import styles from "./PlayerCard.module.css";

interface PlayerCardProps {
  player: PlayerDTO;
  onClick?: () => void;
  className?: string;
}

/**
 * Player Card Component
 * Extended card specifically for players
 * Shows position, jersey number, and player-specific data
 *
 * @param player - Player data
 * @param onClick - Optional click handler
 * @param className - Additional CSS classes
 */
export const PlayerCard = ({ player, onClick, className }: PlayerCardProps) => {
  const positionColor = getPositionColor(player.position);
  const positionName = getPositionDisplayName(player.position);
  const positionAbbr = getPositionAbbreviation(player.position);
  const [imageError, setImageError] = useState(false);

  // Check if image URL is valid (not null, not empty)
  const hasValidImage =
    player.imgUrl && player.imgUrl.trim() !== "" && !imageError;

  return (
    <div
      className={cn(styles.card, onClick && styles.clickable, className)}
      onClick={onClick}>
      {/* Jersey Number Badge */}
      <div
        className={styles.jerseyBadge}
        style={{ backgroundColor: positionColor }}>
        {formatJerseyNumber(player.jerseyNumber)}
      </div>

      {/* Image */}
      <div className={styles.imageContainer}>
        {hasValidImage ? (
          <img
            src={`/api/v1/proxy/image?url=${encodeURIComponent(player.imgUrl)}`}
            alt={player.name}
            className={styles.image}
            loading="lazy"
            onError={() => {
              console.error("Image failed to load for", player.name);
              setImageError(true);
            }}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>🏐</span>
          </div>
        )}

        {/* Position Badge Overlay */}
        <div
          className={styles.positionOverlay}
          style={{ backgroundColor: positionColor }}>
          {positionAbbr}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{player.name}</h3>

        {/* Position Badge */}
        <span
          className={styles.positionBadge}
          style={{ backgroundColor: positionColor }}>
          {positionName}
        </span>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Height</span>
            <span className={styles.statValue}>
              {formatHeight(player.height)}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Year</span>
            <span className={styles.statValue}>{player.year || "N/A"}</span>
          </div>
        </div>

        {/* School */}
        <div className={styles.school}>{player.schoolName || "No School"}</div>
      </div>
    </div>
  );
};
