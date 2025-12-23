import addrres from "../fixtures/cep.json"

describe('CEP', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Integração', 'Consulta de CEP')
  })

  it('Deve validar a consulta de CEP', () => {

    cy.get('#cep').type(addrres.cep)
    cy.contains('button', 'Buscar').click()
    cy.get('#street')
      .should('have.value', addrres.street)
    cy.get('#neighborhood')
      .should('have.value', addrres.neighborhood)
    cy.get('#city')
      .should('have.value', addrres.city)
    cy.get('#state')
      .should('have.value', addrres.state)
  })
})