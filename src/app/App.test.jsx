import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the landing page at the root route", () => {
    window.history.pushState({}, "", import.meta.env.BASE_URL);

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /bienvenido a pracofi/i })
    ).toBeInTheDocument();
  });
});
