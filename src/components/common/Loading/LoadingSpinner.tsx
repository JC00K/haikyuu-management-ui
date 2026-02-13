import { cn } from "@/lib/utils";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

/**
 * Loading Spinner Component
 * Displays an animated volleyball spinner
 *
 * @param size - Spinner size (sm: 20px, md: 40px, lg: 60px)
 * @param className - Additional CSS classes
 * @param text - Optional loading text
 *
 * @example
 * <LoadingSpinner size="md" text="Loading players..." />
 */
export const LoadingSpinner = ({
  size = "md",
  className,
  text,
}: LoadingSpinnerProps) => {
  return (
    <div className={cn(styles.container, className)}>
      <div className={cn(styles.spinner, styles[size])} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

/**
 * Full Page Loading Component
 * Centers spinner in full viewport
 */
export const FullPageLoading = ({ text }: { text?: string }) => {
  return (
    <div className={styles.fullPage}>
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};
