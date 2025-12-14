Cypress.Commands.add('fillConsultancyForm', (form) => {
  cy.get('input[placeholder="Digite seu nome completo"]').type(form.name)
  cy.get('input[placeholder="Digite seu email"]').type(form.email)
  cy.get('input[placeholder="(00) 00000-0000"]')
    .type(form.phone)
    .should('have.value', '(11) 99999-1000')

  /* Exemplo de conversão de xpath para código Cypress
   label[text()="Tipo de Consultoria"]/..//select   */
  cy.contains('label', 'Tipo de Consultoria')
    .parent()
    .find('select')
    .select(form.consultancyType)

  /* //span[text()='Pessoa Física']/..//input 
  Primeira forma de realizar a conversão do xpath para cypress encadeando passo a passo
  cy.contains('span', 'Pessoa Física')
    .parent()
    .find('input')
    .check()
  */
  if (form.personType === 'cpf') {
    cy.contains('label', 'Pessoa Física')
      .find('input')
      .check()
      .should('be.checked')
      .should('exist')

    cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .should('be.not.checked')

    //Segunda forma de converter o xpath, passando o label que elemento pai e buscando por texto que esta dentro do label elemento filho
    cy.contains('label', 'CPF')
      .parent()
      .find('input')
      .type(form.document)
      .should('have.value', '730.466.530-00')
  }

  if (form.personType === 'cnpj') {
    cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .check()
      .should('be.checked')
      .should('exist')

    cy.contains('label', 'Pessoa Física')
      .find('input')
      .should('be.not.checked')

    cy.contains('label', 'CNPJ')
      .parent()
      .find('input')
      .type(form.document)
      .should('have.value', '00.000.000/0001-91')
  }

  form.discoveryChannel.forEach((channel) => {
    //span[text()="Instagram"]/../input
    cy.contains('label', channel)
      .find('input')
      .check()
      .should('be.checked')
  })

  //Upload de arquivo
  cy.get('input[type="file"]')
    .selectFile(form.file, { force: true })

  cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
    .type(form.description)

  form.techs.forEach((techs) => {
    cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
      .type(techs)
      .type('{enter}')

    //Transformando xpath em código cypress xpath= //label[text()='Tecnologias']/..//span[text()='Cypress'], verificando se a tech foi adicionada com sucesso
    cy.contains('label', 'Tecnologias')
      .parent()
      .find('span', techs)
      .should('exist');
  })

  if (form.term === true) {
    //Aceitar termos de uso xpath= //span[text()= 'Li e aceito os']/..//input
    cy.contains('label', 'termos de uso')
      .find('input')
      .check()
  }
})

Cypress.Commands.add('submitConsultancyForm', () => {
  cy.contains('button', 'Enviar formulário').click()
})

Cypress.Commands.add('validadeConsultancyModal', () => {
  // Validando mensagem de sucesso do formulário com css selector= div[class^='modal-content'] e timeout explicito
  cy.get('.modal-content', { timeout: 7000 })
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