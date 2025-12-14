describe('Formulário de Consultoria', () => {

  before(() => {
    cy.log('Roda uma única vez antes de todos os casos de testes')
  })

  beforeEach(() => {
    cy.login()
    cy.goTo('Formulários', 'Consultoria')
    cy.fixture('consultancy').as('consultancyData') // criando um json de massa de dados e nomeando com as(alias)
  })

  /*
  Ao utilizar fixture fora do escopo que vai ser utilizado a massa, precisa trocar a função de seta pois ela 
  não consegue obter os valores do this. então precisa mudar para função convencional do javascript(function) 
  */
  it('Deve solicitar a consultoria individual', function () {
    const consultancyForm = this.consultancyData.personal

    cy.fillConsultancyForm(consultancyForm)
    cy.submitConsultancyForm()
    cy.validadeConsultancyModal()
  })

  it('Deve solicitar a consultoria In Company', function () {
    const consultancyForm = this.consultancyData.company

    cy.fillConsultancyForm(consultancyForm)
    cy.submitConsultancyForm()
    cy.validadeConsultancyModal()
  })

  it('Deve verificar os campos obrigatórios', () => {
    cy.submitConsultancyForm()

    // exemplo de código sem destruturação, outro exemplo com destruturação olhar o arquivo consultancyImport
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