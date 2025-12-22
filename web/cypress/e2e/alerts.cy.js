describe('validação de alertas em Javascript', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Alertas JS', 'JavaScript Alerts')
  })
  it('Deve validar a mensagem de alerta', () => {
    // Listener
    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('Olá QA, eu sou uma Alert Box!')
    })
    cy.contains('button', 'Mostrar Alert').click()
  })

  it('Deve confirmar e validar a mensagem positiva', () => {
    // Listener
    cy.on('window:confirm', (msg) => {
      expect(msg).to.equal('Aperta um botão!')
      return true // true simula o click no botão ok, mas nao é necessário colocar pois ja retorna verdadeiro
    })

    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('Você clicou em Ok!')
    })

    cy.contains('button', 'Mostrar Confirm').click()
  })

  it('Deve cancelar um dialogo e validar a mensagem negativa', () => {
    // Listener
    cy.on('window:confirm', (msg) => {
      expect(msg).to.equal('Aperta um botão!')
      return false // true simula o click no botão ok
    })

    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('Você cancelou!')
    })

    cy.contains('button', 'Mostrar Confirm').click()
  })

  it.only('Deve interagir com o prompt, inserir um texto e validar uma mensagem ', () => {
    // interago com janela do prompt e inseri o valor e confirma
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Anderson')
    })

    //Listener escuta a respota e interagi
    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('Olá Anderson! Boas vindas ao WebDojo!')
    })

    cy.contains('button', 'Mostrar Prompt').click()
  })
})