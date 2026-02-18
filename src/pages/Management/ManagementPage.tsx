import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useManagement } from "@/hooks/useManagement";
import { CharacterCard } from "@/components/common/Card/Character/CharacterCard";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import { Modal } from "@/components/common/Modal/Modal";
import { ManagementForm } from "@/components/forms/ManagementForm/ManagementForm";
import { ManagementRole } from "@/types/enums";
import {
  getManagementRoleDisplayName,
  getAllManagementRoles,
} from "@/types/enums/management-role.enum";
import styles from "./ManagementPage.module.css";

/**
 * Management Page
 * Displays all management members with role filtering
 *
 * Uses lucide-react:
 * - Plus (add management button)
 */
const ManagementPage = () => {
  const navigate = useNavigate();
  const { data: management, isLoading, error } = useManagement();
  const [selectedRole, setSelectedRole] = useState<ManagementRole | "ALL">(
    "ALL",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter management by role
  const filteredManagement = management?.filter(
    (member) =>
      selectedRole === "ALL" || member.managementRole === selectedRole,
  );

  // Calculate role counts
  const roleCounts = management?.reduce(
    (acc, member) => {
      acc[member.managementRole] = (acc[member.managementRole] || 0) + 1;
      return acc;
    },
    {} as Record<ManagementRole, number>,
  );

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading management..." />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Management</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header with Add Button */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Management</h1>
          <p className={styles.subtitle}>
            Manage team administration and staff
          </p>
        </div>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          <span>Add Management</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.totalStat}>
          <span className={styles.statValue}>
            {filteredManagement?.length || 0}
          </span>
          <span className={styles.statLabel}>
            {selectedRole === "ALL"
              ? "Total Management"
              : getManagementRoleDisplayName(selectedRole)}
          </span>
        </div>

        {/* Role Breakdown */}
        <div className={styles.breakdown}>
          {getAllManagementRoles()
            .filter(
              (role) =>
                role == ManagementRole.ADVISOR ||
                role == ManagementRole.MANAGER,
            ) // Only show relevant roles
            .map((role) => (
              <div key={role} className={styles.breakdownItem}>
                <span className={styles.breakdownLabel}>
                  {getManagementRoleDisplayName(role)}:
                </span>
                <span className={styles.breakdownValue}>
                  {roleCounts?.[role] || 0}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter by Role:</label>
          <select
            value={selectedRole}
            onChange={(e) =>
              setSelectedRole(e.target.value as ManagementRole | "ALL")
            }
            className={styles.filterSelect}>
            <option value="ALL">All Roles</option>
            {getAllManagementRoles()
              .filter(
                (role) =>
                  role == ManagementRole.ADVISOR ||
                  role == ManagementRole.MANAGER,
              )
              .map((role) => (
                <option key={role} value={role}>
                  {getManagementRoleDisplayName(role)}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Management Grid */}
      {filteredManagement && filteredManagement.length > 0 ? (
        <div className={styles.grid}>
          {filteredManagement.map((member) => (
            <CharacterCard
              key={member.id}
              character={member}
              onClick={() => navigate(`/characters/${member.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>👔</div>
          <h3>No Management Found</h3>
          <p>
            {selectedRole === "ALL"
              ? 'No management members have been created yet. Click "Add Management" to get started.'
              : `No ${getManagementRoleDisplayName(selectedRole).toLowerCase()}s found.`}
          </p>
          <button className={styles.emptyButton}>
            <Plus size={18} />
            <span>Add Your First Management Member</span>
          </button>
        </div>
      )}

      {/* Add Management Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Management Member"
        size="lg">
        <ManagementForm
          onSuccess={() => {
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ManagementPage;
