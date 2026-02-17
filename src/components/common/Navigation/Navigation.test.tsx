import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navigation } from "./Navigation";

function renderNavigation() {
  return render(
    <ThemeProvider>
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("Navigation dark mode toggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders the theme toggle button", () => {
    renderNavigation();
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i }),
    ).toBeInTheDocument();
  });

  it("shows correct aria-label in light mode", () => {
    renderNavigation();
    const toggleBtn = screen.getByRole("button", {
      name: /switch to dark mode/i,
    });
    expect(toggleBtn).toBeInTheDocument();
  });

  it("shows correct aria-label after switching to dark mode", async () => {
    const user = userEvent.setup();
    renderNavigation();
    const toggleBtn = screen.getByRole("button", {
      name: /switch to dark mode/i,
    });
    await user.click(toggleBtn);
    expect(
      screen.getByRole("button", { name: /switch to light mode/i }),
    ).toBeInTheDocument();
  });

  it("toggles data-theme attribute on click", async () => {
    const user = userEvent.setup();
    renderNavigation();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    await user.click(
      screen.getByRole("button", { name: /switch to dark mode/i }),
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("persists theme preference to localStorage", async () => {
    const user = userEvent.setup();
    renderNavigation();
    await user.click(
      screen.getByRole("button", { name: /switch to dark mode/i }),
    );
    expect(localStorage.getItem("theme")).toBe('"dark"');
  });
});
