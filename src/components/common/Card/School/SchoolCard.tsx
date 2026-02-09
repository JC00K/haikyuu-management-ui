import { SchoolDTO } from "@/types/dto";
import { cn } from "@/lib/utils";
import { School, MapPin } from "lucide-react";
import styles from "./SchoolCard.module.css";

interface SchoolCardProps {
  school: SchoolDTO;
  onClick?: () => void;
  className?: string;
}

/**
 * School Card Component
 * Displays school information in a card format
 *
 * Uses lucide-react:
 * - School (school icon)
 * - MapPin (location icon)
 *
 * @param school - School lookup data
 * @param onClick - Optional click handler
 * @param className - Additional CSS classes
 */
export const SchoolCard = ({ school, onClick, className }: SchoolCardProps) => {
  // Parse colors from string (format: "Color1, Color2")
  const colors = school.colors?.split(",").map((c) => c.trim()) || [
    "#1a1a1a",
    "#FF6600",
  ];
  const primaryColor = colors[0];
  const secondaryColor = colors[1] || colors[0];

  return (
    <div
      className={cn(styles.card, onClick && styles.clickable, className)}
      onClick={onClick}
      style={
        {
          "--primary-color": primaryColor,
          "--secondary-color": secondaryColor,
        } as React.CSSProperties
      }>
      {/* Header with gradient */}
      <div className={styles.header}>
        <div className={styles.schoolIcon}>
          <School size={32} />
        </div>
        <h3 className={styles.schoolName}>{school.name}</h3>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Prefecture */}
        <div className={styles.infoRow}>
          <MapPin size={16} />
          <span>{school.prefecture || "Unknown"}</span>
        </div>

        {/* Colors */}
        <div className={styles.colorsSection}>
          <span className={styles.colorsLabel}>School Colors:</span>
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

        {/* Motto (if exists) */}
        {school.motto && <div className={styles.motto}>"{school.motto}"</div>}

        {/* Mascot (if exists) */}
        {school.mascot && (
          <div className={styles.mascot}>
            <span className={styles.mascotLabel}>Mascot:</span>
            <span className={styles.mascotValue}>{school.mascot}</span>
          </div>
        )}
      </div>
    </div>
  );
};
