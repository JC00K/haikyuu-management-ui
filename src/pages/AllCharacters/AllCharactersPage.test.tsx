import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useCharacters } from "@/hooks/useCharacters";
import AllCharactersPage from "./AllCharactersPage";
import { Role, Year } from "@/types/enums";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...(actual as object), useNavigate: () => mockNavigate };
});

vi.mock("@/hooks/useCharacters");

const mockCharacters = [
  {
    id: 1,
    name: "Hinata Shoyo",
    role: Role.PLAYER,
    age: 16,
    height: 162,
    schoolId: 1,
    schoolName: "Karasuno",
    imgUrl: "",
    year: Year.FIRST,
  },
  {
    id: 2,
    name: "Kageyama Tobio",
    role: Role.PLAYER,
    age: 16,
    height: 181,
    schoolId: 1,
    schoolName: "Karasuno",
    imgUrl: "",
    year: Year.FIRST,
  },
];

function renderPage() {
  return render(
    <MemoryRouter>
      <AllCharactersPage />
    </MemoryRouter>,
  );
}

describe("AllCharactersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useCharacters).mockReturnValue({
      data: mockCharacters,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useCharacters>);
  });

  it("renders all character cards", () => {
    renderPage();

    expect(screen.getByText("Hinata Shoyo")).toBeInTheDocument();
    expect(screen.getByText("Kageyama Tobio")).toBeInTheDocument();
  });

  it("navigates to character details when a card is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText("Hinata Shoyo"));

    expect(mockNavigate).toHaveBeenCalledWith("/characters/1");
  });

  it("navigates to the correct character when a different card is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText("Kageyama Tobio"));

    expect(mockNavigate).toHaveBeenCalledWith("/characters/2");
  });
});
