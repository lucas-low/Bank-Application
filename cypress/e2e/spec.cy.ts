describe('Fazz app', function() {
  it('table more navigation works', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Accounts')
    cy.contains('more').click()
    cy.contains('Accounts Details')
  })
  it('table more details works', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Accounts')
    cy.contains('more').click()
    cy.contains('Accounts Details')
    cy.url().should('include', '/accountDetails')
  })
  it('Details back button from id 150 navigation returns to 1st page works', function() {
    cy.visit('http://localhost:3000/accountDetails/150')
    cy.contains('Accounts Details')
    cy.contains('Back').click()
    cy.contains('MomCorp')
  })
})


//   it('front page contains random text', function() {
//     cy.visit('http://localhost:3000')
//     cy.contains('wtf is this app?')
//   })
//