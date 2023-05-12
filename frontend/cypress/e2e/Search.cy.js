describe('test the search feature and see if it works', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.viewport(1920,1080)
    cy.get('header').get('input').type('Viva')
    cy.get('header').contains('Search').click()
    cy.get('.search-area').children('input').clear().type('m')
    cy.get('div').children('label').contains('Pop').parents('div').children('input').click()
    cy.wait(2000)
    cy.get('div').children('label').contains('Hip-Hop').parents('div').children('input').click()
    cy.wait(2000)
    cy.get('button').contains('clear').click()
    cy.wait(2000)
    cy.contains('Min Year').next('input').type('2010')
    cy.wait(2000)
    cy.get('button').contains('clear').click()
  })
})