const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true, //[STUDIO CODE] habilita gravação dos testes com iteração manual, gerando códigos.
    video: true // Gera evidenciando em videos
    //defaultCommandTimeout: 10000 // Timeout explícito, ajustando o tempo default do cypress para espera de elementos
  },
});
