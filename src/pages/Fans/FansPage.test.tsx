import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useFans } from "@/hooks/useFans";
import FansPage from "./FansPage";
import { Role, Year } from "@/types/enums";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...(actual as object), useNavigate: () => mockNavigate };
});

vi.mock("@/hooks/useFans");

const mockFan = {
  id: 30,
  name: "Yachi Hitoka",
  role: Role.FAN,
  age: 16,
  height: 149,
  schoolId: 1,
  schoolName: "Karasuno",
  imgUrl: "",
  year: Year.FIRST,
};

function renderPage() {
  return render(
    <MemoryRouter>
      <FansPage />
    </MemoryRouter>,
  );
}

describe("FansPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFans).mockReturnValue({
      data: [mockFan],
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useFans>);
  });

  it("renders fan cards", () => {
    renderPage();

    expect(screen.getByText("Yachi Hitoka")).toBeInTheDocument();
  });

  it("navigates to character details when a card is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText("Yachi Hitoka"));

    expect(mockNavigate).toHaveBeenCalledWith("/characters/30");
  });
});
