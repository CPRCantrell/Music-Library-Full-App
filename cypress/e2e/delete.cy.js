describe('Try to delete a song', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.viewport(1920,1080)
    cy.wait(1000)
    cy.get('.item').contains('DELETE ME LATER').parents('.item').find('button').contains('...').click()
    cy.get('.show').children('button').contains('Delete Song').click()
  })
})