import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharacterCard } from "./CharacterCard";
import { Role, Year } from "@/types/enums";
import type { CharacterDTO } from "@/types/dto";

const mockCharacter: CharacterDTO = {
  id: 1,
  name: "Hinata Shoyo",
  role: Role.PLAYER,
  age: 16,
  height: 162,
  schoolId: 1,
  schoolName: "Karasuno",
  imgUrl: "",
  year: Year.FIRST,
};

describe("CharacterCard", () => {
  it("renders character name, role, age, height, and school", () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText("Hinata Shoyo")).toBeInTheDocument();
    expect(screen.getByText("PLAYER")).toBeInTheDocument();
    expect(screen.getByText(/Age: 16/)).toBeInTheDocument();
    expect(screen.getByText("162 cm")).toBeInTheDocument();
    expect(screen.getByText("Karasuno")).toBeInTheDocument();
  });

  it("calls onClick when the card is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={onClick} />);

    await user.click(screen.getByText("Hinata Shoyo"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies clickable class when onClick is provided", () => {
    const { container } = render(
      <CharacterCard character={mockCharacter} onClick={vi.fn()} />,
    );

    expect(container.firstElementChild).toHaveClass("clickable");
  });

  it("does not apply clickable class when no onClick is provided", () => {
    const { container } = render(<CharacterCard character={mockCharacter} />);

    expect(container.firstElementChild).not.toHaveClass("clickable");
  });

  it("shows 'No School' when schoolName is not provided", () => {
    render(<CharacterCard character={{ ...mockCharacter, schoolName: undefined }} />);

    expect(screen.getByText("No School")).toBeInTheDocument();
  });
});
