describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'Melxi',
      name: 'Muhammad',
      password: 'test'
    }
    cy.request('POST','http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login page can be opened', function () {
    cy.contains('Login to application')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username')
      .type('Melxi')
      cy.get('#password')
        .type('test')
      cy.get('button')
        .contains('Login')
        .click()
    })

    it('users name is shown', function() {
      cy.contains('Muhammad logged in')
    })

    it('new blog can be added', function() {
      cy.contains('add blog')
        .click()
      cy.get('#title')
        .type('New blog by cypress')
      cy.get('#author')
        .type('Melxi')
      cy.get('#url')
        .type('https://fullstackopen.com')
      cy.get('button')
        .contains('create')
        .click()
      cy.contains('New blog by cypress')
    })
  })
})