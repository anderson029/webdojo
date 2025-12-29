import addrres from "../fixtures/cep.json"

describe('CEP', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Integração', 'Consulta de CEP')
  })

  it('Deve validar a consulta de CEP', () => {
    //interceptar response da api para serviços externos, da pra simular alterando o host para portal local no C:\Windows\System32\drivers\etc, nesse caso estou alterando para 200 e simulando o valores da api
    cy.intercept('GET', `https://viacep.com.br/ws/${addrres.cep}/json/`, {
      statusCode: 200,
      body: {
        logradouro: addrres.street,
        bairro: addrres.neighborhood,
        localidade: addrres.city,
        uf:addrres.state
      }
    }).as('getCep')

    cy.get('#cep').type(addrres.cep)
    cy.contains('button', 'Buscar').click()

    cy.wait('@getCep')
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