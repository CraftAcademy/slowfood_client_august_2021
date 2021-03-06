describe("user adds a product to cart", () => {
  beforeEach(() => {
    cy.intercept("GET", "**api/products", {
      fixture: "menuItems.json",
    });
    cy.intercept("POST", "**api/carts", {
      statusCode: 201,
      fixture: "successfulAddOrderResponse.json",
    }).as("firstProductRequest")
    cy.visit("/");
    cy.get("[data-cy=menu]").click();
  });

  describe('clicking add to cart button', () => {
    it('is expected to display a success message', () => {
      cy.get("[data-cy=add-to-basket-1]").click()
      cy.wait('@firstProductRequest').its('response.statusCode').should('eq', 201)
      cy.get("[data-cy=flash-message]").should("contain.text", "Insects was added to your cart!")
    });
  });

  describe('when the server responds with RecordNotFound', () => {
    it('is expected to display an error message', () => {
      cy.intercept("POST", "**api/carts", {
        statusCode: 422,
        fixture: "errorMessageProductNotFound.json",
      }).as("firstProductRequest")
      cy.get("[data-cy=add-to-basket-1]").click()
      cy.wait('@firstProductRequest').its('response.statusCode').should('eq', 422)
      cy.get("[data-cy=flash-message]").should("contain.text", "Product not found!")
    });
  })
  
});
