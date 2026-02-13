/**
 * Student year enum
 * Maps to: com.example.haikyuuspring.model.enums.Year
 */
export enum Year {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
  NONSTUDENT = "NONSTUDENT",
}

export const getYearDisplayName = (year: Year): string => {
  const displayNames: Record<Year, string> = {
    [Year.FIRST]: "1st Year",
    [Year.SECOND]: "2nd Year",
    [Year.THIRD]: "3rd Year",
    [Year.NONSTUDENT]: "Non-Student",
  };
  return displayNames[year];
};

export const getYearNumericValue = (year: Year): number => {
  const values: Record<Year, number> = {
    [Year.FIRST]: 1,
    [Year.SECOND]: 2,
    [Year.THIRD]: 3,
    [Year.NONSTUDENT]: 0,
  };
  return values[year];
};

export const getAllYears = (): Year[] => Object.values(Year);
