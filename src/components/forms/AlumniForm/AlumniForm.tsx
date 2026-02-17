import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateAlumni } from "@/hooks/useAlumni";
import { useSchoolLookup } from "@/hooks/useSchools";
import { Position, CoachingStyle, Year } from "@/types/enums";
import {
  getAllPositions,
  getPositionDisplayName,
} from "@/types/enums/position.enum";
import {
  getAllCoachingStyles,
  getCoachingStyleDisplayName,
} from "@/types/enums/coaching-style.enum";
import { getAllYears, getYearDisplayName } from "@/types/enums/year.enum";
import { LoadingSpinner } from "@/components/common/Loading/LoadingSpinner";
import styles from "./AlumniForm.module.css";

const alumniSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  age: z.number().min(10).max(100),
  height: z.number().min(100).max(250),
  year: z.enum(Year).optional(),
  school: z.string().optional(),
  imgUrl: z.url("Must be a valid URL").min(1, "Image URL is required"),
  formerPlayer: z.boolean(),
  position: z.enum(Position).optional(),
  jerseyNumber: z.number().min(0).max(99).optional(),
  formerCoach: z.boolean(),
  coachingStyle: z.enum(CoachingStyle).optional(),
});

type AlumniFormData = z.infer<typeof alumniSchema>;

interface AlumniFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AlumniForm = ({ onSuccess, onCancel }: AlumniFormProps) => {
  const { data: schools, isLoading: loadingSchools } = useSchoolLookup();
  const createAlumni = useCreateAlumni();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AlumniFormData>({
    resolver: zodResolver(alumniSchema),
    defaultValues: {
      formerPlayer: false,
      formerCoach: false,
      position: Position.NONE,
      coachingStyle: CoachingStyle.NONCOACH,
      year: Year.NONSTUDENT,
    },
  });

  const isFormerPlayer = useWatch({ control, name: "formerPlayer" });
  const isFormerCoach = useWatch({ control, name: "formerCoach" });

  const onSubmit = async (data: AlumniFormData) => {
    try {
      const schoolId = data.school
        ? schools?.find((s) => s.name === data.school)?.id
        : null;
      await createAlumni.mutateAsync({
        name: data.name,
        age: data.age,
        height: data.height,
        year: data.year || Year.NONSTUDENT,
        schoolId: schoolId || 0,
        imgUrl: data.imgUrl || "",
        formerPlayer: data.formerPlayer,
        position: data.formerPlayer
          ? data.position || Position.NONE
          : Position.NONE,
        jerseyNumber: data.formerPlayer ? data.jerseyNumber || 0 : 0,
        formerCoach: data.formerCoach,
        coachingStyle: data.formerCoach
          ? data.coachingStyle || CoachingStyle.NONCOACH
          : CoachingStyle.NONCOACH,
      });
      onSuccess();
    } catch (error) {
      console.error("Failed to create alumni:", error);
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
          placeholder="Enter alumni name"
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

      {/* Former Player Toggle */}
      <div className={styles.checkboxField}>
        <input
          type="checkbox"
          {...register("formerPlayer")}
          className={styles.checkbox}
          id="formerPlayer"
        />
        <label htmlFor="formerPlayer" className={styles.label}>
          Former Player
        </label>
      </div>

      {/* Conditional: Former Player Fields */}
      {isFormerPlayer && (
        <div className={styles.conditionalSection}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Position</label>
              <select {...register("position")} className={styles.select}>
                {getAllPositions().map((pos) => (
                  <option key={pos} value={pos}>
                    {getPositionDisplayName(pos)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Jersey #</label>
              <input
                type="number"
                {...register("jerseyNumber", { valueAsNumber: true })}
                className={styles.input}
                placeholder="0-99"
                min="0"
                max="99"
              />
            </div>
          </div>
        </div>
      )}

      {/* Former Coach Toggle */}
      <div className={styles.checkboxField}>
        <input
          type="checkbox"
          {...register("formerCoach")}
          className={styles.checkbox}
          id="formerCoach"
        />
        <label htmlFor="formerCoach" className={styles.label}>
          Former Coach
        </label>
      </div>

      {/* Conditional: Former Coach Fields */}
      {isFormerCoach && (
        <div className={styles.conditionalSection}>
          <div className={styles.field}>
            <label className={styles.label}>Coaching Style</label>
            <select {...register("coachingStyle")} className={styles.select}>
              {getAllCoachingStyles().map((style) => (
                <option key={style} value={style}>
                  {getCoachingStyleDisplayName(style)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

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
          {isSubmitting ? "Creating..." : "Create Alumni"}
        </button>
      </div>
    </form>
  );
};
