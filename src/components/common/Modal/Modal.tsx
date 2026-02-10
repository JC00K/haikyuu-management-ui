import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Base Modal Component
 * Reusable modal for dialogs, forms, etc.
 *
 * Uses lucide-react:
 * - X (close button)
 *
 * @param isOpen - Whether modal is visible
 * @param onClose - Function to close modal
 * @param title - Modal title
 * @param children - Modal content
 * @param size - Modal size (sm: 400px, md: 600px, lg: 800px)
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className,
}: ModalProps) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={cn(styles.modal, styles[size], className)}
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
