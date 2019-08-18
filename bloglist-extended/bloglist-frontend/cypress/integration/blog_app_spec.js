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

    it('user can log out', function() {
      cy.contains('logout')
        .click()
      cy.contains('Login to application')
    })

    it('a new blog can be added', function() {
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

    it('adding blog can be canceled', function() {
      cy.contains('add blog')
        .click()
      cy.get('button')
        .contains('cancel')
        .click()
      cy.contains('add blog')
    })

    it('users page can be viewed', function() {
      cy.get('a')
        .contains('users')
        .click()
    })

    describe('when added blog', function() {
      beforeEach(function() {
        cy.contains('add blog')
          .click()
        cy.get('#title')
          .type('view added blog')
        cy.get('#author')
          .type('Melxi')
        cy.get('#url')
          .type('https://fullstackopen.com')
        cy.get('button')
          .contains('create')
          .click()
        cy.contains('view added blog')
      })

      it('blog can be viewed', function() {
        cy.get('a')
          .contains('view added blog')
          .click()
        cy.contains('view added blog')
      })

      it('blog can be liked', function() {
        cy.get('a')
          .contains('view added blog')
          .click()
        cy.get('button')
          .contains('Like')
          .click()
      })

      it('blog can be removed', function() {
        cy.get('a')
          .contains('view added blog')
          .click()
        cy.get('button')
          .contains('remove')
          .click()
      })

      it('blog can be commented', function() {
        cy.get('a')
          .contains('view added blog')
          .click()
        cy.get('#comment')
          .type('new comment')
        cy.get('button')
          .contains('comment')
          .click()
        cy.contains('new comment')
      })
    })
  })
})