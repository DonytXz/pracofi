import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Switch, useLocation } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SessionProvider, useSession } from "./SessionContext";
import ProtectedRoute from "./ProtectedRoute";
import { saveSession } from "../shared/session";

function LoginDestination() {
  const { state } = useLocation();
  return <p>Iniciar sesión para {state?.from?.pathname}</p>;
}
function TestRoute({ role = "ADMIN", child }) {
  return <MemoryRouter initialEntries={["/protected"]}><SessionProvider><Switch>
    <Route path="/login"><LoginDestination /></Route>
    <ProtectedRoute path="/protected" roles={[role]}>{child}</ProtectedRoute>
  </Switch></SessionProvider></MemoryRouter>;
}

describe("protected routes", () => {
  it.each(["missing", "partial", "corrupt"])("redirects %s storage without mounting protected content", (kind) => {
    if (kind !== "missing") localStorage.setItem("token", kind === "corrupt" ? "{broken" : '"some-token"');
    const Child = vi.fn(() => <p>Private content</p>);
    render(<TestRoute child={<Child />} />);
    expect(screen.getByText("Iniciar sesión para /protected")).toBeInTheDocument();
    expect(Child).not.toHaveBeenCalled();
  });
  it.each(["USER", "CONTADOR"])("blocks wrong-role direct access for %s before mounting content", (role) => {
    saveSession({ token: "fixture", id: "1", usuario: { nombre: "Test", role } });
    const Child = vi.fn(() => <p>Private content</p>);
    render(<TestRoute child={<Child />} />);
    expect(screen.getByRole("heading", { name: /no está disponible para tu cuenta/i })).toBeInTheDocument();
    expect(Child).not.toHaveBeenCalled();
  });
  it.each(["USER", "CONTADOR", "ADMIN"])("renders the allowed route for %s", (role) => {
    saveSession({ token: "fixture", id: "1", usuario: { nombre: "Test", role } });
    render(<TestRoute role={role} child={<p>Protected workspace</p>} />);
    expect(screen.getByText("Protected workspace")).toBeInTheDocument();
  });
  it("removes protected content immediately on logout", () => {
    saveSession({ token: "fixture", id: "1", usuario: { nombre: "Test", role: "ADMIN" } });
    function Child() {
      const { signOut } = useSession();
      return <button onClick={signOut}>Test logout</button>;
    }
    render(<TestRoute child={<Child />} />);
    fireEvent.click(screen.getByRole("button", { name: "Test logout" }));
    expect(screen.getByText("Iniciar sesión para /protected")).toBeInTheDocument();
    expect(screen.queryByText("Test logout")).not.toBeInTheDocument();
  });
});
