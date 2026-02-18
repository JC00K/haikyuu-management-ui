import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useCoaches } from "@/hooks/useCoaches";
import CoachesPage from "./CoachesPage";
import { Role, Year, CoachRole, CoachingStyle } from "@/types/enums";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...(actual as object), useNavigate: () => mockNavigate };
});

vi.mock("@/hooks/useCoaches");

const mockCoach = {
  id: 20,
  name: "Ukai Keishin",
  role: Role.COACH,
  age: 26,
  height: 178,
  schoolId: 1,
  schoolName: "Karasuno",
  imgUrl: "",
  year: Year.NONSTUDENT,
  coachRole: CoachRole.HEAD,
  coachingStyle: CoachingStyle.ATTACK,
  isRetired: false,
};

function renderPage() {
  return render(
    <MemoryRouter>
      <CoachesPage />
    </MemoryRouter>,
  );
}

describe("CoachesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useCoaches).mockReturnValue({
      data: [mockCoach],
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useCoaches>);
  });

  it("renders coach cards", () => {
    renderPage();

    expect(screen.getByText("Ukai Keishin")).toBeInTheDocument();
  });

  it("navigates to character details when a card is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText("Ukai Keishin"));

    expect(mockNavigate).toHaveBeenCalledWith("/characters/20");
  });
});
