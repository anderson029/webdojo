Cypress.Commands.add('start', () =>{
    cy.viewport(1440, 900)
    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('submitLoginForm', (email, password) =>{
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('goTo', (buttonName, pageTitle) =>{
  cy.contains('button', buttonName)
      .should('be.visible')
      .click()
  cy.contains('h1', pageTitle)
    .should('be.visible')
})