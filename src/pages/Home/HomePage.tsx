// src/pages/HomePage.tsx

import { Link } from "react-router-dom";
import {
  Users,
  School,
  Trophy,
  UserCircle,
  Heart,
  GraduationCap,
  Briefcase,
  ClipboardList,
} from "lucide-react";
import { useCharacters } from "@/hooks/useCharacters";
import { usePlayers } from "@/hooks/usePlayers";
import { useCoaches } from "@/hooks/useCoaches";
import { useManagement } from "@/hooks/useManagement";
import { useFans } from "@/hooks/useFans";
import { useAlumni } from "@/hooks/useAlumni";
import { useSchools } from "@/hooks/useSchools";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import styles from "./HomePage.module.css";

/**
 * Home Page / Dashboard
 * Quick access to all main sections with counts
 *
 * Uses lucide-react icons:
 * - Users, School, Trophy, UserCircle, Heart, GraduationCap, Briefcase, ClipboardList
 */
const HomePage = () => {
  // Fetch data for counts
  const { data: characters, isLoading: loadingCharacters } = useCharacters();
  const { data: players, isLoading: loadingPlayers } = usePlayers();
  const { data: coaches, isLoading: loadingCoaches } = useCoaches();
  const { data: management, isLoading: loadingManagement } = useManagement();
  const { data: fans, isLoading: loadingFans } = useFans();
  const { data: alumni, isLoading: loadingAlumni } = useAlumni();
  const { data: schools, isLoading: loadingSchools } = useSchools();

  const isLoading =
    loadingCharacters ||
    loadingPlayers ||
    loadingCoaches ||
    loadingManagement ||
    loadingFans ||
    loadingAlumni ||
    loadingSchools;

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading dashboard..." />;
  }

  // Calculate roster count (one per school)
  const rosterCount = schools?.length || 0;

  const quickActions = [
    {
      icon: Users,
      label: "All Characters",
      description: "Browse all characters",
      count: characters?.length || 0,
      link: "/characters",
      color: "#FF6600",
    },
    {
      icon: Trophy,
      label: "Players",
      description: "View all players",
      count: players?.length || 0,
      link: "/players",
      color: "#FF6600",
    },
    {
      icon: UserCircle,
      label: "Coaches",
      description: "View all coaches",
      count: coaches?.length || 0,
      link: "/coaches",
      color: "#1976D2",
    },
    {
      icon: Briefcase,
      label: "Management",
      description: "View management staff",
      count: management?.length || 0,
      link: "/management",
      color: "#7B1FA2",
    },
    {
      icon: Heart,
      label: "Fans",
      description: "View all fans",
      count: fans?.length || 0,
      link: "/fans",
      color: "#E91E63",
    },
    {
      icon: GraduationCap,
      label: "Alumni",
      description: "View alumni members",
      count: alumni?.length || 0,
      link: "/alumni",
      color: "#795548",
    },
    {
      icon: ClipboardList,
      label: "Rosters",
      description: "Manage team rosters",
      count: rosterCount,
      link: "/rosters",
      color: "#7B1FA2",
    },
    {
      icon: School,
      label: "Schools",
      description: "View all schools",
      count: schools?.length || 0,
      link: "/schools",
      color: "#7B1FA2",
    },
  ];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroIcon}>🏐</span>
            Haikyuu!! Management System
          </h1>
          <p className={styles.heroSubtitle}>
            Manage your volleyball teams, players, and schools all in one place
          </p>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className={styles.actionsSection}>
        <h2 className={styles.sectionTitle}>Quick Access</h2>
        <div className={styles.actionsGrid}>
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.link}
                className={styles.actionCard}
                style={
                  { "--action-color": action.color } as React.CSSProperties
                }>
                <div className={styles.actionIcon}>
                  <Icon size={28} />
                </div>
                <div className={styles.actionContent}>
                  <h3 className={styles.actionTitle}>{action.label}</h3>
                  <p className={styles.actionDescription}>
                    {action.description}
                  </p>
                  <div className={styles.actionCount}>{action.count}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Getting Started Section */}
      <section className={styles.recentSection}>
        <h2 className={styles.sectionTitle}>Getting Started</h2>
        <div className={styles.helpCard}>
          <div className={styles.helpIcon}>ℹ️</div>
          <div className={styles.helpContent}>
            <h3>Welcome to Haikyuu Management System!</h3>
            <p>
              Use the navigation above or click any card to browse characters,
              players, coaches, and schools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
