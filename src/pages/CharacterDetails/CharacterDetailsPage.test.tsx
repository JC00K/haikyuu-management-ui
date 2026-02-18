import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useCharacter } from "@/hooks/useCharacters";
import { usePlayer } from "@/hooks/usePlayers";
import { useCoach } from "@/hooks/useCoaches";
import { useManagementMember } from "@/hooks/useManagement";
import { useAlumniMember } from "@/hooks/useAlumni";
import CharacterDetailPage from "./CharacterDetailsPage";
import {
  Role,
  Year,
  Position,
  CoachRole,
  CoachingStyle,
  ManagementRole,
} from "@/types/enums";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...(actual as object),
    useNavigate: () => mockNavigate,
    useParams: () => ({ characterId: "1" }),
  };
});

vi.mock("@/hooks/useCharacters");
vi.mock("@/hooks/usePlayers");
vi.mock("@/hooks/useCoaches");
vi.mock("@/hooks/useManagement");
vi.mock("@/hooks/useAlumni");

const baseCharacter = {
  id: 1,
  name: "Test Character",
  age: 17,
  height: 175,
  schoolId: 1,
  schoolName: "Karasuno",
  imgUrl: "",
  year: Year.SECOND,
};

const noData = { data: undefined, isLoading: false, error: null };

function renderPage() {
  return render(
    <MemoryRouter>
      <CharacterDetailPage />
    </MemoryRouter>,
  );
}

describe("CharacterDetailsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default all subtype hooks to return no data
    vi.mocked(usePlayer).mockReturnValue(
      noData as unknown as ReturnType<typeof usePlayer>,
    );
    vi.mocked(useCoach).mockReturnValue(
      noData as unknown as ReturnType<typeof useCoach>,
    );
    vi.mocked(useManagementMember).mockReturnValue(
      noData as unknown as ReturnType<typeof useManagementMember>,
    );
    vi.mocked(useAlumniMember).mockReturnValue(
      noData as unknown as ReturnType<typeof useAlumniMember>,
    );
  });

  describe("role-specific sections", () => {
    it("displays player details for PLAYER role", () => {
      vi.mocked(useCharacter).mockReturnValue({
        data: { ...baseCharacter, role: Role.PLAYER },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCharacter>);
      vi.mocked(usePlayer).mockReturnValue({
        data: {
          ...baseCharacter,
          role: Role.PLAYER,
          position: Position.SETTER,
          jerseyNumber: 9,
          year: Year.SECOND,
        },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof usePlayer>);

      renderPage();

      expect(screen.getByText("Player Details")).toBeInTheDocument();
      expect(screen.getByText("Setter")).toBeInTheDocument();
      expect(screen.getByText("#9")).toBeInTheDocument();
      expect(screen.getByText("2nd Year")).toBeInTheDocument();
    });

    it("displays coach details for COACH role", () => {
      vi.mocked(useCharacter).mockReturnValue({
        data: { ...baseCharacter, role: Role.COACH },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCharacter>);
      vi.mocked(useCoach).mockReturnValue({
        data: {
          ...baseCharacter,
          role: Role.COACH,
          coachRole: CoachRole.HEAD,
          coachingStyle: CoachingStyle.ATTACK,
          isRetired: false,
        },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCoach>);

      renderPage();

      expect(screen.getByText("Coach Details")).toBeInTheDocument();
      expect(screen.getByText("Head Coach")).toBeInTheDocument();
      expect(screen.getByText("Attack")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("shows 'Retired' status for a retired coach", () => {
      vi.mocked(useCharacter).mockReturnValue({
        data: { ...baseCharacter, role: Role.COACH },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCharacter>);
      vi.mocked(useCoach).mockReturnValue({
        data: {
          ...baseCharacter,
          role: Role.COACH,
          coachRole: CoachRole.ASSISTANT,
          coachingStyle: CoachingStyle.DEFENSE,
          isRetired: true,
        },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCoach>);

      renderPage();

      expect(screen.getByText("Retired")).toBeInTheDocument();
    });

    it("displays management details for MANAGEMENT role", () => {
      vi.mocked(useCharacter).mockReturnValue({
        data: { ...baseCharacter, role: Role.MANAGEMENT },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCharacter>);
      vi.mocked(useManagementMember).mockReturnValue({
        data: {
          ...baseCharacter,
          role: Role.MANAGEMENT,
          managementRole: ManagementRole.MANAGER,
        },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useManagementMember>);

      renderPage();

      expect(screen.getByText("Management Details")).toBeInTheDocument();
      expect(screen.getByText("Manager")).toBeInTheDocument();
    });

    it("displays alumni details for ALUMNI role", () => {
      vi.mocked(useCharacter).mockReturnValue({
        data: { ...baseCharacter, role: Role.ALUMNI },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCharacter>);
      vi.mocked(useAlumniMember).mockReturnValue({
        data: {
          ...baseCharacter,
          role: Role.ALUMNI,
          formerPlayer: true,
          position: Position.MIDDLE_BLOCKER,
          jerseyNumber: 10,
          formerCoach: false,
          coachingStyle: CoachingStyle.NONCOACH,
        },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useAlumniMember>);

      renderPage();

      expect(screen.getByText("Alumni Details")).toBeInTheDocument();
      expect(screen.getByText("Former Player")).toBeInTheDocument();
    });

    it("shows no role-specific section for FAN role", () => {
      vi.mocked(useCharacter).mockReturnValue({
        data: { ...baseCharacter, role: Role.FAN },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCharacter>);

      renderPage();

      expect(screen.queryByText("Fan Details")).not.toBeInTheDocument();
    });
  });

  describe("general information", () => {
    beforeEach(() => {
      vi.mocked(useCharacter).mockReturnValue({
        data: { ...baseCharacter, role: Role.FAN },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCharacter>);
    });

    it("does not display Character ID", () => {
      renderPage();

      expect(screen.queryByText("Character ID")).not.toBeInTheDocument();
    });

    it("displays age in years", () => {
      renderPage();

      expect(screen.getByText("17 years")).toBeInTheDocument();
    });

    it("displays height in cm", () => {
      renderPage();

      expect(screen.getAllByText("175 cm").length).toBeGreaterThanOrEqual(1);
    });

    it("shows 'Not found' when age is null", () => {
      vi.mocked(useCharacter).mockReturnValue({
        data: { ...baseCharacter, role: Role.FAN, age: null },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCharacter>);

      renderPage();

      expect(screen.getAllByText("Not found").length).toBeGreaterThanOrEqual(1);
    });

    it("shows 'Not found' when height is null", () => {
      vi.mocked(useCharacter).mockReturnValue({
        data: { ...baseCharacter, role: Role.FAN, height: null },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCharacter>);

      renderPage();

      expect(screen.getAllByText("Not found").length).toBeGreaterThanOrEqual(1);
    });

    it("shows 'Not found' for jersey number when it is null for a player", () => {
      vi.mocked(useCharacter).mockReturnValue({
        data: { ...baseCharacter, role: Role.PLAYER },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof useCharacter>);
      vi.mocked(usePlayer).mockReturnValue({
        data: {
          ...baseCharacter,
          role: Role.PLAYER,
          position: Position.SETTER,
          jerseyNumber: null,
          year: Year.SECOND,
        },
        isLoading: false,
        error: null,
      } as unknown as ReturnType<typeof usePlayer>);

      renderPage();

      expect(screen.getByText("Not found")).toBeInTheDocument();
    });
  });
});
