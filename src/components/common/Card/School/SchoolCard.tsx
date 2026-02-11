// src/components/common/Card/SchoolCard.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
 * @param school - School data (full SchoolDTO)
 * @param onClick - Optional click handler
 * @param className - Additional CSS classes
 */
export const SchoolCard = ({ school, onClick, className }: SchoolCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Parse colors from string (format: "White / Orange / Black")
  const colors = school.colors?.split("/").map((c) => c.trim()) || [
    "#1a1a1a",
    "#FF6600",
  ];
  const primaryColor = colors[0];
  const secondaryColor = colors[1] || colors[0];

  // Create stripe pattern for 3+ colors, diagonal split for 2 colors
  const createColorPattern = () => {
    if (colors.length === 2) {
      // Diagonal split: 2 triangles
      return `linear-gradient(135deg, ${colors[0]} 50%, ${colors[1]} 50%)`;
    } else if (colors.length >= 3) {
      // Diagonal stripes at 45 degree angle
      const stripeHeight = 100 / colors.length;
      const gradientStops = colors
        .map((color, index) => {
          const start = index * stripeHeight;
          const end = (index + 1) * stripeHeight;
          return `${color} ${start}%, ${color} ${end}%`;
        })
        .join(", ");
      return `linear-gradient(135deg, ${gradientStops})`;
    }
    // Fallback for single color
    return colors[0];
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/schools/${school.id}`);
    }
  };

  return (
    <div
      className={cn(styles.card, styles.clickable, className)}
      onClick={handleClick}
      style={
        {
          "--primary-color": primaryColor,
          "--secondary-color": secondaryColor,
          "--color-pattern": createColorPattern(),
        } as React.CSSProperties
      }>
      {/* Image */}
      <div className={styles.imageContainer}>
        {!imageError ? (
          <img
            src={`/api/v1/proxy/image?url=${encodeURIComponent(school.imgUrl)}`}
            alt={school.name}
            className={styles.image}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.placeholder}>
            <School size={48} />
          </div>
        )}
      </div>

      {/* Header with gradient */}
      <div className={styles.header}>
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
