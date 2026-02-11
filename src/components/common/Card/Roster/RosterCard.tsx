import { useNavigate } from "react-router-dom";
import { RosterWithId } from "@/types/dto";
import { cn } from "@/lib/utils";
import { Users, TrendingUp } from "lucide-react";
import styles from "./RosterCard.module.css";

interface RosterCardProps {
  roster: RosterWithId;
  onClick?: () => void;
  className?: string;
}

/**
 * Roster Card Component
 * Displays roster summary information in a card format
 * Shows member counts (players, coaches, management)
 *
 * Uses lucide-react:
 * - Users (roster icon)
 * - TrendingUp (members icon)
 *
 * @param roster - Roster data with ID
 * @param onClick - Optional click handler
 * @param className - Additional CSS classes
 */
export const RosterCard = ({
  roster,
  onClick,
  className,
}: RosterCardProps) => {
  const navigate = useNavigate();

  const playerCount = roster.players?.length || 0;
  const coachCount = roster.coaches?.length || 0;
  const managementCount = roster.management?.length || 0;
  const totalMembers = playerCount + coachCount + managementCount;

  // Parse colors from school (format: "White / Orange / Black")
  const colors = roster.schoolColors?.split("/").map((c) => c.trim()) || [
    "#7b1fa2",
    "#5e35b1",
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
    } else if (roster.id) {
      navigate(`/roster/${roster.id}`);
    }
  };

  return (
    <div
      className={cn(styles.card, styles.clickable, className)}
      onClick={handleClick}
      style={{
        "--primary-color": primaryColor,
        "--secondary-color": secondaryColor,
        "--color-pattern": createColorPattern(),
      } as React.CSSProperties}>
      {/* Icon Header */}
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Users size={40} />
        </div>
        <span className={styles.headerText}>{roster.schoolName}</span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Total Members */}
        <div className={styles.mainStat}>
          <div className={styles.statNumber}>{totalMembers}</div>
          <div className={styles.statLabel}>Total Members</div>
        </div>

        {/* Member Breakdown */}
        <div className={styles.breakdown}>
          <div className={styles.breakdownItem}>
            <div className={styles.breakdownDot} style={{ backgroundColor: "#1976d2" }} />
            <span className={styles.breakdownLabel}>Players</span>
            <span className={styles.breakdownValue}>{playerCount}</span>
          </div>

          <div className={styles.breakdownItem}>
            <div className={styles.breakdownDot} style={{ backgroundColor: "#d32f2f" }} />
            <span className={styles.breakdownLabel}>Coaches</span>
            <span className={styles.breakdownValue}>{coachCount}</span>
          </div>

          <div className={styles.breakdownItem}>
            <div className={styles.breakdownDot} style={{ backgroundColor: "#388e3c" }} />
            <span className={styles.breakdownLabel}>Management</span>
            <span className={styles.breakdownValue}>{managementCount}</span>
          </div>
        </div>

        {/* Empty State Message */}
        {totalMembers === 0 && (
          <div className={styles.empty}>
            <p>No members assigned yet</p>
          </div>
        )}

        {/* Roster Stats Footer */}
        {totalMembers > 0 && (
          <div className={styles.footer}>
            <div className={styles.footerIcon}>
              <TrendingUp size={16} />
            </div>
            <span>Click to manage roster</span>
          </div>
        )}
      </div>
    </div>
  );
};
