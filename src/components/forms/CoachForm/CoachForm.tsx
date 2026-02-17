import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateCoach } from "@/hooks/useCoaches";
import { useSchoolLookup } from "@/hooks/useSchools";
import { CoachRole, CoachingStyle, Year } from "@/types/enums";
import {
  getAllCoachRoles,
  getCoachRoleDisplayName,
} from "@/types/enums/coach-role.enum";
import {
  getAllCoachingStyles,
  getCoachingStyleDisplayName,
} from "@/types/enums/coaching-style.enum";
import { getAllYears, getYearDisplayName } from "@/types/enums/year.enum";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import styles from "./CoachForm.module.css";

const coachSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  age: z.number().min(10).max(100),
  height: z.number().min(100).max(250),
  coachRole: z.enum(CoachRole),
  coachingStyle: z.enum(CoachingStyle),
  isRetired: z.boolean(),
  year: z.enum(Year).optional(),
  school: z.string().optional(),
  imgUrl: z.url("Must be a valid URL").min(1, "Image URL is required"),
});

type CoachFormData = z.infer<typeof coachSchema>;

interface CoachFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CoachForm = ({ onSuccess, onCancel }: CoachFormProps) => {
  const { data: schools, isLoading: loadingSchools } = useSchoolLookup();
  const createCoach = useCreateCoach();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CoachFormData>({
    resolver: zodResolver(coachSchema),
    defaultValues: {
      coachRole: CoachRole.HEAD,
      coachingStyle: CoachingStyle.DEFENSE,
      isRetired: false,
      year: Year.NONSTUDENT,
    },
  });

  const onSubmit = async (data: CoachFormData) => {
    try {
      const schoolId = data.school
        ? schools?.find((s) => s.name === data.school)?.id
        : null;
      await createCoach.mutateAsync({
        name: data.name,
        age: data.age,
        height: data.height,
        coachRole: data.coachRole,
        coachingStyle: data.coachingStyle,
        isRetired: data.isRetired,
        year: data.year || Year.NONSTUDENT,
        schoolId: schoolId || 0,
        imgUrl: data.imgUrl || "",
      });
      onSuccess();
    } catch (error) {
      console.error("Failed to create coach:", error);
    }
  };

  if (loadingSchools) {
    return <LoadingSpinner size="md" text="Loading form..." />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Name */}
      <div className={styles.field}>
        <label className={styles.label}>
          Name <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          {...register("name")}
          className={styles.input}
          placeholder="Enter coach name"
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      {/* Age & Height */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>
            Age <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className={styles.input}
            placeholder="Age"
            min="10"
            max="100"
          />
          {errors.age && (
            <span className={styles.error}>{errors.age.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Height (cm) <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            {...register("height", { valueAsNumber: true })}
            className={styles.input}
            placeholder="Height in cm"
            min="100"
            max="250"
          />
          {errors.height && (
            <span className={styles.error}>{errors.height.message}</span>
          )}
        </div>
      </div>

      {/* Coach Role & Coaching Style */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>
            Coach Role <span className={styles.required}>*</span>
          </label>
          <select {...register("coachRole")} className={styles.select}>
            {getAllCoachRoles().map((role) => (
              <option key={role} value={role}>
                {getCoachRoleDisplayName(role)}
              </option>
            ))}
          </select>
          {errors.coachRole && (
            <span className={styles.error}>{errors.coachRole.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Coaching Style <span className={styles.required}>*</span>
          </label>
          <select {...register("coachingStyle")} className={styles.select}>
            {getAllCoachingStyles().map((style) => (
              <option key={style} value={style}>
                {getCoachingStyleDisplayName(style)}
              </option>
            ))}
          </select>
          {errors.coachingStyle && (
            <span className={styles.error}>{errors.coachingStyle.message}</span>
          )}
        </div>
      </div>

      {/* Year & School */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Year</label>
          <select {...register("year")} className={styles.select}>
            {getAllYears().map((year) => (
              <option key={year} value={year}>
                {getYearDisplayName(year)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>School</label>
          <select {...register("school")} className={styles.select}>
            <option value="">No School</option>
            {schools?.map((school) => (
              <option key={school.id} value={school.name}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Is Retired */}
      <div className={styles.checkboxField}>
        <input
          type="checkbox"
          {...register("isRetired")}
          className={styles.checkbox}
          id="isRetired"
        />
        <label htmlFor="isRetired" className={styles.label}>
          Retired
        </label>
      </div>

      {/* Image URL */}
      <div className={styles.field}>
        <label className={styles.label}>
          Image URL <span className={styles.required}>*</span>
        </label>
        <input
          type="url"
          {...register("imgUrl")}
          className={styles.input}
          placeholder="https://example.com/image.jpg"
        />
        {errors.imgUrl && (
          <span className={styles.error}>{errors.imgUrl.message}</span>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
          disabled={isSubmitting}>
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Coach"}
        </button>
      </div>
    </form>
  );
};
