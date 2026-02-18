import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useAlumni, useFormerPlayers } from "@/hooks/useAlumni";
import AlumniPage from "./AlumniPage";
import { Role, Year, Position, CoachingStyle } from "@/types/enums";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...(actual as object), useNavigate: () => mockNavigate };
});

vi.mock("@/hooks/useAlumni");

const mockAlumnus = {
  id: 40,
  name: "Sugawara Koushi",
  role: Role.ALUMNI,
  age: 18,
  height: 174,
  schoolId: 1,
  schoolName: "Karasuno",
  imgUrl: "",
  year: Year.NONSTUDENT,
  formerPlayer: true,
  position: Position.SETTER,
  jerseyNumber: 2,
  formerCoach: false,
  coachingStyle: CoachingStyle.NONCOACH,
};

function renderPage() {
  return render(
    <MemoryRouter>
      <AlumniPage />
    </MemoryRouter>,
  );
}

describe("AlumniPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAlumni).mockReturnValue({
      data: [mockAlumnus],
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useAlumni>);
    vi.mocked(useFormerPlayers).mockReturnValue({
      data: [mockAlumnus],
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useFormerPlayers>);
  });

  it("renders alumni cards", () => {
    renderPage();

    expect(screen.getByText("Sugawara Koushi")).toBeInTheDocument();
  });

  it("navigates to character details when a card is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText("Sugawara Koushi"));

    expect(mockNavigate).toHaveBeenCalledWith("/characters/40");
  });
});
