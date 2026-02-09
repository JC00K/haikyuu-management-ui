// src/pages/HomePage.tsx

import { Link } from "react-router-dom";
import { Users, School, Trophy, UserCircle } from "lucide-react";
import { useCharacters } from "@/hooks/useCharacters";
import { usePlayers } from "@/hooks/usePlayers";
import { useCoaches } from "@/hooks/useCoaches";
import { useSchoolLookup } from "@/hooks/useSchools";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import styles from "./HomePage.module.css";

/**
 * Home Page / Dashboard
 * Overview of the entire system with quick stats and actions
 *
 * Uses lucide-react icons:
 * - Users, School, Trophy, UserCircle, Heart, GraduationCap
 */
const HomePage = () => {
  // Fetch data for stats
  const { data: characters, isLoading: loadingCharacters } = useCharacters();
  const { data: players, isLoading: loadingPlayers } = usePlayers();
  const { data: coaches, isLoading: loadingCoaches } = useCoaches();
  const { data: schools, isLoading: loadingSchools } = useSchoolLookup();

  const isLoading =
    loadingCharacters || loadingPlayers || loadingCoaches || loadingSchools;

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading dashboard..." />;
  }

  // Calculate stats
  const stats = [
    {
      icon: Users,
      label: "Total Characters",
      value: characters?.length || 0,
      color: "#FF6600",
      link: "/characters",
    },
    {
      icon: Trophy,
      label: "Players",
      value: players?.length || 0,
      color: "#FF6600",
      link: "/players",
    },
    {
      icon: UserCircle,
      label: "Coaches",
      value: coaches?.length || 0,
      color: "#1976D2",
      link: "/coaches",
    },
    {
      icon: School,
      label: "Schools",
      value: schools?.length || 0,
      color: "#7B1FA2",
      link: "/schools",
    },
  ];

  const quickActions = [
    {
      icon: Trophy,
      label: "Add Player",
      description: "Create a new player",
      link: "/players",
      color: "#FF6600",
    },
    {
      icon: UserCircle,
      label: "Add Coach",
      description: "Create a new coach",
      link: "/coaches",
      color: "#1976D2",
    },
    {
      icon: School,
      label: "Add School",
      description: "Create a new school",
      link: "/schools",
      color: "#7B1FA2",
    },
    {
      icon: Users,
      label: "View All Characters",
      description: "Browse all characters",
      link: "/characters",
      color: "#2E7D32",
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

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <div className={styles.statsGrid}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                to={stat.link}
                className={styles.statCard}
                style={{ "--stat-color": stat.color } as React.CSSProperties}>
                <div className={styles.statIcon}>
                  <Icon size={32} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className={styles.actionsSection}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
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
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Activity Section (Placeholder for future) */}
      <section className={styles.recentSection}>
        <h2 className={styles.sectionTitle}>Getting Started</h2>
        <div className={styles.helpCard}>
          <div className={styles.helpIcon}>ℹ️</div>
          <div className={styles.helpContent}>
            <h3>Welcome to Haikyuu Management System!</h3>
            <p>
              Use the navigation above to browse characters, players, coaches,
              and schools. Click on any stat card or quick action to get
              started.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
