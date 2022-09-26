describe("todos", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds, completes and deletes a todo", () => {
    cy.findByRole("textbox").type("Football").type("{enter}");
    cy.findByText(/football/i).should("exist");
    cy.findByRole("button", { name: /complete/i }).click();
    cy.findByText(/football/i).should(
      "have.css",
      "text-decoration",
      "line-through solid rgb(0, 0, 0)"
    );
    cy.findByRole("button", { name: /delete/i }).click();
    cy.findByText(/football/i).should("not.exist");
  });
});
