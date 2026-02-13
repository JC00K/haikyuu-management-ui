import { type ClassValue, clsx } from "clsx";

/**
 * Utility function to merge class names
 * Uses clsx for conditional classes
 *
 * @example
 * cn('btn', isActive && 'active', className)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format height in cm with unit
 * @example formatHeight(175.5) => "175.5 cm"
 */
export function formatHeight(height: number): string {
  return `${height} cm`;
}

/**
 * Format jersey number with leading #
 * @example formatJerseyNumber(10) => "#10"
 */
export function formatJerseyNumber(number: number): string {
  return `#${number}`;
}

/**
 * Format date to readable string
 * @example formatDate(new Date()) => "Feb 6, 2026"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format time to readable string
 * @example formatTime(new Date()) => "3:45 PM"
 */
export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Truncate text to specified length
 * @example truncate("Long text here", 10) => "Long text..."
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

/**
 * Capitalize first letter
 * @example capitalize("hello") => "Hello"
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Sleep utility for delays
 * @example await sleep(1000) // Wait 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce function calls
 * @example const debouncedSearch = debounce(search, 300)
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Group array by key
 * @example groupBy(players, 'position')
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>,
  );
}

/**
 * Sort array by key
 * @example sortBy(players, 'jerseyNumber')
 */
export function sortBy<T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc",
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Check if value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Get initials from name
 * @example getInitials("Hinata Shoyo") => "HS"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format large numbers with commas
 * @example formatNumber(1234567) => "1,234,567"
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

/**
 * Calculate average from array of numbers
 * @example average([10, 20, 30]) => 20
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

/**
 * Remove duplicates from array
 * @example unique([1, 2, 2, 3]) => [1, 2, 3]
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 * @example shuffle([1, 2, 3, 4, 5])
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Clamp number between min and max
 * @example clamp(15, 0, 10) => 10
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if string is empty or only whitespace
 */
export function isEmpty(str: string): boolean {
  return !str || str.trim().length === 0;
}

/**
 * Convert object to query string
 * @example toQueryString({ page: 1, size: 10 }) => "page=1&size=10"
 */
export function toQueryString(obj: Record<string, unknown>): string {
  return Object.entries(obj)
    .filter(([, value]) => isDefined(value))
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
}

/**
 * Parse query string to object
 * @example parseQueryString("page=1&size=10") => { page: "1", size: "10" }
 */
export function parseQueryString(str: string): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(str));
}

/**
 * Deep clone object (simple version)
 */
export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object is empty
 */
export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Generate random ID
 * @example generateId() => "abc123def456"
 */
export function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
