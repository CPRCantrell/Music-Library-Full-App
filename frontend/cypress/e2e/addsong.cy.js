describe('Add Song Button should pull up the add song form and form should be filled and sent to Api', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('button').contains('New Song').click()
    cy.get('form').as('form_test')
    cy.get('[data-cy="title"]').type("DELETE ME LATER")
    cy.get('[data-cy="run_time"]').type("3:21")
    cy.get('[data-cy="artist"]').type("MAX")
    cy.get('[data-cy="album"]').type("Colour Vision")
    cy.get('[data-cy="submit-btn"]').click()
    cy.get('button').contains('OK').click()
  })
})