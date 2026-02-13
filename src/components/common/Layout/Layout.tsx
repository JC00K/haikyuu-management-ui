import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import styles from "./Layout.module.css";

/**
 * Main Layout Component
 * Provides consistent structure across all pages
 *
 * Structure:
 * - Navigation (sticky header)
 * - Main content area (with Outlet for nested routes)
 * - Footer (optional)
 *
 * @example
 * <Route path="/" element={<Layout />}>
 *   <Route index element={<HomePage />} />
 * </Route>
 */
export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navigation />

      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
