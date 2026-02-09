import { CharacterDTO } from "@/types/dto";
import { getRoleColor } from "@/lib/theme";
import { cn, formatHeight } from "@/lib/utils";
import styles from "./CharacterCard.module.css";

interface CharacterCardProps {
  character: CharacterDTO;
  onClick?: () => void;
  className?: string;
}

/**
 * Character Card Component
 * Displays character information in a card format
 * Reusable for all character types
 *
 * @param character - Character data
 * @param onClick - Optional click handler
 * @param className - Additional CSS classes
 */
export const CharacterCard = ({
  character,
  onClick,
  className,
}: CharacterCardProps) => {
  const roleColor = getRoleColor(character.role);

  return (
    <div
      className={cn(styles.card, onClick && styles.clickable, className)}
      onClick={onClick}>
      {/* Image */}
      <div className={styles.imageContainer}>
        {character.imgUrl ? (
          <img
            src={character.imgUrl}
            alt={character.name}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>🏐</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{character.name}</h3>

        {/* Role Badge */}
        <span
          className={styles.roleBadge}
          style={{ backgroundColor: roleColor }}>
          {character.role}
        </span>

        {/* Details */}
        <div className={styles.details}>
          <span className={styles.detail}>Age: {character.age}</span>
          <span className={styles.detail}>
            {formatHeight(character.height)}
          </span>
        </div>

        {/* School */}
        <div className={styles.school}>
          {character.schoolName || "No School"}
        </div>
      </div>
    </div>
  );
};
