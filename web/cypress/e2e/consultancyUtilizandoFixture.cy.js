describe('Formulário de Consultoria',()=>{

  before(()=>{
    cy.log('Roda uma única vez antes de todos os casos de testes')
  })

  beforeEach(()=>{
    cy.login()
    cy.goTo('Formulários', 'Consultoria')
    cy.fixture('consultancy').as('consultancyData') // criando um json de massa de dados e nomeando com as(alias)
  })

  /*
  Ao utilizar fixture fora do escopo que vai ser utilizado a massa, precisa trocar a função de seta pois ela 
  não consegue obter os valores do .this, então precisa mudar para função convencional do javascript(function) 
  */
  it('Deve solicitar a consultoria individual', function(){
    
    const consultancyForm = this.consultancyData.personal

    cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name)
    cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type(consultancyForm.phone)
      .should('have.value', '(11) 99999-1000')

    /* Exemplo de conversão de xpath para código Cypress
     label[text()="Tipo de Consultoria"]/..//select   */
    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select(consultancyForm.consultancyType)

    /* //span[text()='Pessoa Física']/..//input 
    Primeira forma de realizar a conversão do xpath para cypress encadeando passo a passo
    cy.contains('span', 'Pessoa Física')
      .parent()
      .find('input')
      .check()
    */
    if (consultancyForm.personType ==='cpf') {
      cy.contains('label', 'Pessoa Física')
      .find('input')
      .check()
      .should('be.checked')
      .should('exist')

      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('be.not.checked')
    }

    if (consultancyForm.personType ==='cnpj') {
      cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .check()
      .should('be.checked')
      .should('exist')

      cy.contains('label', 'Pessoa Física')
        .find('input')
        .should('be.not.checked')
    }
      //Segunda forma de converter o xpath, passando o label que elemento pai e buscando por texto que esta dentro do label elemento filho
    cy.contains('label', 'CPF')
      .parent()
      .find('input')
      .type(consultancyForm.document)
      .should('have.value', '730.466.530-00')

    consultancyForm.discoveryChannel.forEach((channel)=>{
      //span[text()="Instagram"]/../input
      cy.contains('label', channel)
      .find('input')
      .check()
      .should('be.checked')
    })

    //Upload de arquivo
    cy.get('input[type="file"]')
      .selectFile(consultancyForm.file, {force: true})

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
      .type(consultancyForm.description)

    consultancyForm.techs.forEach((techs)=>{
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
      .type(techs)
      .type('{enter}')
    
      //Transformando xpath em código cypress xpath= //label[text()='Tecnologias']/..//span[text()='Cypress'], verificando se a tech foi adicionada com sucesso
      cy.contains('label', 'Tecnologias')
        .parent()
        .find('span', techs)
        .should('exist');
    })

    if (consultancyForm.term === true ){
      //Aceitar termos de uso xpath= //span[text()= 'Li e aceito os']/..//input
      cy.contains('label', 'termos de uso')
      .find('input')
      .check()
    }
    

    cy.contains('button', 'Enviar formulário')
      .click()

     // Validando mensagem de sucesso do formulário com css selector= div[class^='modal-content'] e timeout explicito
    cy.get('.modal-content', {timeout: 7000})
      .should('be.visible')
      .should('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

      //Validando mensagem de sucesso com contains (nao é uma boa pratica nesse caso pois verifica em toda a tela se contém o valor)
      // cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
      //   .should('be.visible')

    // CSS= div[class^='modal header']
    cy.get('.modal-header')
      .should('be.visible')
      .should('have.text', 'Sucesso!')
  })

  it('Deve solicitar a consultoria In Company',function(){
  
    const consultancyForm = this.consultancyData.company

    cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name)
    cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type(consultancyForm.phone)
      .should('have.value', '(11) 99999-1000')

    /* Exemplo de conversão de xpath para código Cypress
      label[text()="Tipo de Consultoria"]/..//select   */
    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select(consultancyForm.consultancyType)

    /* //span[text()='Pessoa Física']/..//input 
    Primeira forma de realizar a conversão do xpath para cypress encadeando passo a passo
    cy.contains('span', 'Pessoa Física')
      .parent()
      .find('input')
      .check()
    */
    if (consultancyForm.personType ==='cpf') {
      cy.contains('label', 'Pessoa Física')
      .find('input')
      .check()
      .should('be.checked')
      .should('exist')

      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('be.not.checked')
    }

    if (consultancyForm.personType ==='cnpj') {
      cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .check()
      .should('be.checked')
      .should('exist')

      cy.contains('label', 'Pessoa Física')
        .find('input')
        .should('be.not.checked')
    }
    
    cy.contains('label', 'CNPJ')
      .parent()
      .find('input')
      .type(consultancyForm.document)
      .should('have.value', '00.000.000/0001-91')

    consultancyForm.discoveryChannel.forEach((channel)=>{
      cy.contains('label', channel)
      .find('input')
      .check()
      .should('be.checked')
    })

    //Upload de arquivo
    cy.get('input[type="file"]')
      .selectFile(consultancyForm.file, {force: true})

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
      .type(consultancyForm.description)

    consultancyForm.techs.forEach((techs)=>{
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
      .type(techs)
      .type('{enter}')
    
      cy.contains('label', 'Tecnologias')
        .parent()
        .find('span', techs)
        .should('exist');
    })

    if (consultancyForm.term === true ){
      cy.contains('label', 'termos de uso')
      .find('input')
      .check()
    }

    cy.contains('button', 'Enviar formulário')
      .click()
    cy.get('.modal-content', {timeout: 7000})
      .should('be.visible')
      .should('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

    cy.get('.modal-header')
      .should('be.visible')
      .should('have.text', 'Sucesso!')
  })

  it('Deve verificar os campos obrigatórios', ()=>{
    cy.contains('button', 'Enviar formulário')
      .click()

    const fieldRequire = [
      "Nome Completo",
      "Email"
    ]

    fieldRequire.forEach((require)=>{
      //xpath dos campos obrigatórios = //label[text()= 'Nome Completo *']/..//p[text()='Campo obrigatório']
      cy.contains('label', require)
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório')
      .and('have.class','text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    })

    cy.contains('label', 'termos de uso')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Você precisa aceitar os termos de uso')
      .and('have.class','text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')
   }) 

   afterEach(()=> {
    cy.log('Rodou após o teste')
   })

  after(()=> {
    cy.log('Roda uma única vez depois de todos os casos de testes')
  })
})