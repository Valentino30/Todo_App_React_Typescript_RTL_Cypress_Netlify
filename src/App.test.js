import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import App from "./App";
import { TodoProvider } from "./hooks/todo";

describe("App Component", () => {
  beforeEach(() => {
    render(
      <TodoProvider>
        <App />
      </TodoProvider>
    );
    const input = screen.getByRole("textbox");
    userEvent.type(input, "Football{Enter}");
  });

  it("should add a todo with a complete and delete button", async () => {
    const todo = await screen.findByText(/Football/i);
    const completeButton = await screen.findByRole("button", {
      name: /complete/i,
    });
    const deleteButton = await screen.findByRole("button", { name: /delete/i });

    expect(todo).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(completeButton).toBeInTheDocument();
  });

  it("should complete a todo", async () => {
    const completeButton = await screen.findByRole("button", {
      name: /complete/i,
    });
    await userEvent.click(completeButton);
    const todo = await screen.findByText(/Football/i);
    expect(todo).toHaveStyle("text-decoration: line-through");
  });

  it("should delete a todo", async () => {
    const deleteButton = await screen.findByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);
    const todo = screen.queryByText(/Football/i);
    expect(todo).not.toBeInTheDocument();
  });
});
