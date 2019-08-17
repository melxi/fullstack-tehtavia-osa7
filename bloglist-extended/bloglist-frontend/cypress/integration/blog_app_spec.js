describe('Bloglist App', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('login page can be opened', function() {
    cy.contains('Login to application')
  })

  it('user can login', function() {
    cy.get('#username')
      .type('Melxi')
    cy.get('#password')
      .type('test')
    cy.get('button')
      .contains('Login')
      .click()
    cy.contains('Muhammad logged in')
  })
})