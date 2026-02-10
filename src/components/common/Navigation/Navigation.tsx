import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Users,
  School,
  UserCircle,
  Trophy,
  Briefcase,
  Heart,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./Navigation.module.css";

/**
 * Navigation Component
 * Main navigation bar with Haikyuu branding
 * Responsive with mobile menu
 *
 * Uses lucide-react for icons:
 * - Menu, X (mobile toggle)
 * - Home, Users, School, UserCircle, Trophy (nav icons)
 */
export const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/characters", label: "All Characters", icon: Users },
    { to: "/players", label: "Players", icon: Trophy },
    { to: "/coaches", label: "Coaches", icon: UserCircle },
    { to: "/management", label: "Management", icon: Briefcase },
    { to: "/fans", label: "Fans", icon: Heart },
    { to: "/alumni", label: "Alumni", icon: GraduationCap },
    { to: "/schools", label: "Schools", icon: School },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
          <span className={styles.logoIcon}>🏐</span>
          <h1 className={styles.logoText}>Haikyuu!!</h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={cn(
                    styles.navLink,
                    isActive(link.to) && styles.active,
                  )}>
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={cn(
                      styles.mobileLink,
                      isActive(link.to) && styles.activeMobile,
                    )}
                    onClick={closeMobileMenu}>
                    <Icon size={20} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};
