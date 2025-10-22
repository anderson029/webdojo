const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true //habilita gravação dos testes
    //defaultCommandTimeout: 10000 // Timeout explícito, ajustando o tempo default do cypress para espera de elementos
  },
});
