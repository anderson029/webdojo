describe('Gereciamento de perfis do gitHub', () => {

  beforeEach(() => {
    cy.login()
    cy.goTo('Tabela', 'Perfis do GitHub')

  })
  it('Deve poder cadastrar um novo perfil no gitHub', () => {
    cy.get('#name').type('teste')
    cy.get('#username').type('teste')
    cy.get('#profile').type('teste')

    cy.contains('button', 'Adicionar Perfil').click()

    cy.get('#name').type('Anderson')
    cy.get('#username').type('anderson029')
    cy.get('#profile').type('QA')

    cy.contains('button', 'Adicionar Perfil').click()

    cy.contains('table tbody tr', 'anderson029')
      .should('be.visible')
      .as('trProfile')

    cy.get('@trProfile')
      .contains('Anderson')
      .should('be.visible')

    cy.get('@trProfile')
      .contains('QA')
      .should('be.visible')
  })

  it('Deve permitir excluir o perfil da lista de gitHub', () => {

    const profile = {
      name: 'Anderson Oliveira',
      username: 'anderson029',
      description: 'QA'
    }

    cy.get('#name').type(profile.name)
    cy.get('#username').type(profile.username)
    cy.get('#profile').type(profile.description)

    cy.contains('button', 'Adicionar Perfil').click()

    cy.contains('table tbody tr', profile.username)
      .should('be.visible')
      .as('trProfile')

    cy.get('@trProfile').find('button[title="Remover perfil"]').click

    cy.contains('table tbody', profile.username)
      .should('not.exist')
  })
})