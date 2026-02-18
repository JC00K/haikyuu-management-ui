import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useManagement } from "@/hooks/useManagement";
import ManagementPage from "./ManagementPage";
import { Role, Year, ManagementRole } from "@/types/enums";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...(actual as object), useNavigate: () => mockNavigate };
});

vi.mock("@/hooks/useManagement");

const mockMember = {
  id: 10,
  name: "Shimizu Kiyoko",
  role: Role.MANAGEMENT,
  age: 17,
  height: 166,
  schoolId: 1,
  schoolName: "Karasuno",
  imgUrl: "",
  year: Year.THIRD,
  managementRole: ManagementRole.MANAGER,
};

function renderPage() {
  return render(
    <MemoryRouter>
      <ManagementPage />
    </MemoryRouter>,
  );
}

describe("ManagementPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useManagement).mockReturnValue({
      data: [mockMember],
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useManagement>);
  });

  it("renders management member cards", () => {
    renderPage();

    expect(screen.getByText("Shimizu Kiyoko")).toBeInTheDocument();
  });

  it("navigates to character details when a card is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText("Shimizu Kiyoko"));

    expect(mockNavigate).toHaveBeenCalledWith("/characters/10");
  });
});
