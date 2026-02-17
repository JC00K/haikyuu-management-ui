import {
  formatHeight,
  formatJerseyNumber,
  formatDate,
  formatTime,
  truncate,
  capitalize,
  groupBy,
  sortBy,
  isDefined,
  getInitials,
  formatNumber,
  average,
  unique,
  clamp,
  isEmpty,
  toQueryString,
  parseQueryString,
  clone,
  isEmptyObject,
  generateId,
  cn,
} from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });
});

describe("formatHeight", () => {
  it("formats height with cm unit", () => {
    expect(formatHeight(175.5)).toBe("175.5 cm");
  });

  it("formats integer height", () => {
    expect(formatHeight(180)).toBe("180 cm");
  });
});

describe("formatJerseyNumber", () => {
  it("formats with leading #", () => {
    expect(formatJerseyNumber(10)).toBe("#10");
  });

  it("formats single digit", () => {
    expect(formatJerseyNumber(1)).toBe("#1");
  });

  it("formats zero", () => {
    expect(formatJerseyNumber(0)).toBe("#0");
  });
});

describe("formatDate", () => {
  it("formats Date object", () => {
    const date = new Date("2025-01-15T12:00:00");
    const result = formatDate(date);
    expect(result).toContain("Jan");
    expect(result).toContain("15");
    expect(result).toContain("2025");
  });

  it("formats date string", () => {
    const result = formatDate("2025-06-01T00:00:00");
    expect(result).toContain("Jun");
    expect(result).toContain("2025");
  });
});

describe("formatTime", () => {
  it("formats Date object to time string", () => {
    const date = new Date("2025-01-15T15:45:00");
    const result = formatTime(date);
    expect(result).toContain("3");
    expect(result).toContain("45");
    expect(result).toContain("PM");
  });

  it("formats string date to time", () => {
    const result = formatTime("2025-01-15T08:30:00");
    expect(result).toContain("8");
    expect(result).toContain("30");
    expect(result).toContain("AM");
  });
});

describe("truncate", () => {
  it("truncates long text", () => {
    expect(truncate("Hello World!", 5)).toBe("Hello...");
  });

  it("does not truncate short text", () => {
    expect(truncate("Hi", 10)).toBe("Hi");
  });

  it("handles exact length", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });
});

describe("capitalize", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("lowercases remaining letters", () => {
    expect(capitalize("hELLO")).toBe("Hello");
  });

  it("handles single character", () => {
    expect(capitalize("a")).toBe("A");
  });
});

describe("groupBy", () => {
  it("groups array items by key", () => {
    const items = [
      { name: "A", group: "x" },
      { name: "B", group: "y" },
      { name: "C", group: "x" },
    ];
    const result = groupBy(items, "group");
    expect(result["x"]).toHaveLength(2);
    expect(result["y"]).toHaveLength(1);
  });

  it("handles empty array", () => {
    const result = groupBy([], "key" as never);
    expect(result).toEqual({});
  });
});

describe("sortBy", () => {
  it("sorts ascending by default", () => {
    const items = [{ v: 3 }, { v: 1 }, { v: 2 }];
    const result = sortBy(items, "v");
    expect(result.map((i) => i.v)).toEqual([1, 2, 3]);
  });

  it("sorts descending", () => {
    const items = [{ v: 1 }, { v: 3 }, { v: 2 }];
    const result = sortBy(items, "v", "desc");
    expect(result.map((i) => i.v)).toEqual([3, 2, 1]);
  });

  it("does not mutate original array", () => {
    const items = [{ v: 3 }, { v: 1 }];
    const result = sortBy(items, "v");
    expect(result).not.toBe(items);
  });
});

describe("isDefined", () => {
  it("returns true for defined values", () => {
    expect(isDefined(0)).toBe(true);
    expect(isDefined("")).toBe(true);
    expect(isDefined(false)).toBe(true);
  });

  it("returns false for null and undefined", () => {
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });
});

describe("getInitials", () => {
  it("gets initials from full name", () => {
    expect(getInitials("Hinata Shoyo")).toBe("HS");
  });

  it("gets single initial from one name", () => {
    expect(getInitials("Hinata")).toBe("H");
  });

  it("limits to 2 characters", () => {
    expect(getInitials("A B C D")).toBe("AB");
  });
});

describe("formatNumber", () => {
  it("formats large numbers with commas", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
  });

  it("does not format small numbers", () => {
    expect(formatNumber(999)).toBe("999");
  });
});

describe("average", () => {
  it("calculates average", () => {
    expect(average([10, 20, 30])).toBe(20);
  });

  it("returns 0 for empty array", () => {
    expect(average([])).toBe(0);
  });

  it("handles single value", () => {
    expect(average([42])).toBe(42);
  });
});

describe("unique", () => {
  it("removes duplicates", () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it("handles empty array", () => {
    expect(unique([])).toEqual([]);
  });

  it("handles strings", () => {
    expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
  });
});

describe("clamp", () => {
  it("clamps value above max", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("clamps value below min", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("returns value within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
});

describe("isEmpty", () => {
  it("returns true for empty string", () => {
    expect(isEmpty("")).toBe(true);
  });

  it("returns true for whitespace", () => {
    expect(isEmpty("   ")).toBe(true);
  });

  it("returns false for non-empty string", () => {
    expect(isEmpty("hello")).toBe(false);
  });
});

describe("toQueryString", () => {
  it("converts object to query string", () => {
    expect(toQueryString({ page: 1, size: 10 })).toBe("page=1&size=10");
  });

  it("filters out null/undefined values", () => {
    expect(toQueryString({ a: 1, b: null, c: undefined })).toBe("a=1");
  });

  it("handles empty object", () => {
    expect(toQueryString({})).toBe("");
  });
});

describe("parseQueryString", () => {
  it("parses query string to object", () => {
    expect(parseQueryString("page=1&size=10")).toEqual({
      page: "1",
      size: "10",
    });
  });

  it("handles empty string", () => {
    expect(parseQueryString("")).toEqual({});
  });
});

describe("clone", () => {
  it("deep clones object", () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = clone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });
});

describe("isEmptyObject", () => {
  it("returns true for empty object", () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it("returns false for non-empty object", () => {
    expect(isEmptyObject({ a: 1 })).toBe(false);
  });
});

describe("generateId", () => {
  it("generates a string", () => {
    expect(typeof generateId()).toBe("string");
  });

  it("generates unique IDs", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });

  it("generates non-empty strings", () => {
    expect(generateId().length).toBeGreaterThan(0);
  });
});
