import {
  Position,
  getPositionDisplayName,
  getPositionAbbreviation,
  getAllPositions,
} from "./position.enum";

describe("getPositionDisplayName", () => {
  it("returns display name for each position", () => {
    expect(getPositionDisplayName(Position.SETTER)).toBe("Setter");
    expect(getPositionDisplayName(Position.MIDDLE_BLOCKER)).toBe(
      "Middle Blocker",
    );
    expect(getPositionDisplayName(Position.WING_SPIKER)).toBe("Wing Spiker");
    expect(getPositionDisplayName(Position.OUTSIDE_HITTER)).toBe(
      "Outside Hitter",
    );
    expect(getPositionDisplayName(Position.LIBERO)).toBe("Libero");
    expect(getPositionDisplayName(Position.NONE)).toBe("None");
  });
});

describe("getPositionAbbreviation", () => {
  it("returns abbreviation for each position", () => {
    expect(getPositionAbbreviation(Position.SETTER)).toBe("S");
    expect(getPositionAbbreviation(Position.MIDDLE_BLOCKER)).toBe("MB");
    expect(getPositionAbbreviation(Position.WING_SPIKER)).toBe("WS");
    expect(getPositionAbbreviation(Position.OUTSIDE_HITTER)).toBe("OH");
    expect(getPositionAbbreviation(Position.LIBERO)).toBe("L");
    expect(getPositionAbbreviation(Position.NONE)).toBe("-");
  });
});

describe("getAllPositions", () => {
  it("returns all positions except NONE by default", () => {
    const positions = getAllPositions();
    expect(positions).not.toContain(Position.NONE);
    expect(positions).toContain(Position.SETTER);
    expect(positions).toContain(Position.MIDDLE_BLOCKER);
    expect(positions).toContain(Position.WING_SPIKER);
    expect(positions).toContain(Position.OUTSIDE_HITTER);
    expect(positions).toContain(Position.LIBERO);
    expect(positions).toHaveLength(5);
  });

  it("includes NONE when includeNone is true", () => {
    const positions = getAllPositions(true);
    expect(positions).toContain(Position.NONE);
    expect(positions).toHaveLength(6);
  });
});
