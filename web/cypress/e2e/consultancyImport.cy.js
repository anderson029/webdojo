// import consultancyData from '../fixtures/consultancy.json' [importando arquivo full]
import { personal, company } from '../fixtures/consultancy.json'

describe('Formulário de Consultoria', () => {

  before(() => {
    cy.log('Roda uma única vez antes de todos os casos de testes')
  })

  beforeEach(() => {
    cy.login()
    cy.goTo('Formulários', 'Consultoria')
  })

  it('Deve solicitar a consultoria individual', () => {
    cy.fillConsultancyForm(personal)
    cy.submitConsultancyForm()
    cy.validadeConsultancyModal()
  })

  it('Deve solicitar a consultoria In Company', () => {
    cy.fillConsultancyForm(company)
    cy.submitConsultancyForm()
    cy.validadeConsultancyModal()
  })

  it('Deve verificar os campos obrigatórios', () => {
    cy.submitConsultancyForm()

    const fieldRequire = [
      "Nome Completo",
      "Email"
    ]

    fieldRequire.forEach((require) => {
      //xpath dos campos obrigatórios = //label[text()= 'Nome Completo *']/..//p[text()='Campo obrigatório']
      cy.contains('label', require)
        .parent()
        .find('p')
        .should('be.visible')
        .should('have.text', 'Campo obrigatório')
        .and('have.class', 'text-red-400')
        .and('have.css', 'color', 'rgb(248, 113, 113)')

    })

    cy.contains('label', 'termos de uso')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Você precisa aceitar os termos de uso')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')
  })

  afterEach(() => {
    cy.log('Rodou após o teste')
  })

  after(() => {
    cy.log('Roda uma única vez depois de todos os casos de testes')
  })
})