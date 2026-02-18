import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { usePlayers } from "@/hooks/usePlayers";
import PlayersPage from "./PlayersPage";
import { Role, Year, Position } from "@/types/enums";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...(actual as object), useNavigate: () => mockNavigate };
});

vi.mock("@/hooks/usePlayers");

const mockPlayer = {
  id: 1,
  name: "Hinata Shoyo",
  role: Role.PLAYER,
  age: 16,
  height: 162,
  schoolId: 1,
  schoolName: "Karasuno",
  imgUrl: "",
  year: Year.FIRST,
  position: Position.MIDDLE_BLOCKER,
  jerseyNumber: 10,
};

function renderPage() {
  return render(
    <MemoryRouter>
      <PlayersPage />
    </MemoryRouter>,
  );
}

describe("PlayersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePlayers).mockReturnValue({
      data: [mockPlayer],
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof usePlayers>);
  });

  it("renders player cards", () => {
    renderPage();

    expect(screen.getByText("Hinata Shoyo")).toBeInTheDocument();
  });

  it("navigates to character details when a card is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText("Hinata Shoyo"));

    expect(mockNavigate).toHaveBeenCalledWith("/characters/1");
  });
});
