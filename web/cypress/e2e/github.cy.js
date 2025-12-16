import perfilGitHub from "../fixtures/perfilGithub.json"

const perfisArray = Object.values(perfilGitHub)// transformando em uma array

describe('Gereciamento de perfis do gitHub', () => {

  beforeEach(() => {
    cy.login()
    cy.goTo('Tabela', 'Perfis do GitHub')
  })
  it('Deve poder cadastrar um novo perfil no gitHub', () => {
    perfisArray.forEach((perfil) => {
      cy.get('#name').type(perfil.name)
      cy.get('#username').type(perfil.username)
      cy.get('#profile').type(perfil.description)

      cy.contains('button', 'Adicionar Perfil').click()
    })

    cy.contains('table tbody tr', perfisArray[0].username)
      .should('be.visible')
      .as('trProfile')

    cy.get('@trProfile')
      .contains('Anderson')
      .should('be.visible')

    cy.get('@trProfile')
      .contains('QA')
      .should('be.visible')
  })

  it('Deve poder remover um perfil da lista de gitHub', () => {
    cy.get('#name').type(perfisArray[0].name)
    cy.get('#username').type(perfisArray[0].username)
    cy.get('#profile').type(perfisArray[0].description)

    cy.contains('button', 'Adicionar Perfil').click()

    cy.contains('table tbody tr', perfisArray[0].username)
      .should('be.visible')
      .as('trProfile')

    cy.get('@trProfile').find('button[title="Remover perfil"]').click()

    cy.contains('table tbody', perfisArray[0].username)
      .should('not.exist')
  })

  it('Deve validar o link do github', () => {
    cy.get('#name').type(perfisArray[0].name)
    cy.get('#username').type(perfisArray[0].username)
    cy.get('#profile').type(perfisArray[0].description)

    cy.contains('button', 'Adicionar Perfil').click()

    cy.contains('table tbody tr', perfisArray[0].username)
      .should('be.visible')
      .as('trProfile')

    // cy.get('@trProfile').find('a')
    // .invoke('removeAttr', 'target') // caso precise validar a próxima pagina do mesmo sistema
    // .click()

    cy.get('@trProfile').find('a')
      .should('have.attr', 'href', 'https://github.com/' + perfisArray[0].username)
      .and('have.attr', 'target', '_blank') // como nao precisamos validar o github, aqui validamos somente se hyperlink esta funcionando.
  })
})