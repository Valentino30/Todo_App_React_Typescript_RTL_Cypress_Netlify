describe("todos", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds a todo", () => {
    cy.findByRole("textbox").type("Football").type("{enter}");
    cy.findByText(/football/i).should("exist");
  });
});
