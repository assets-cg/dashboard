const { defineConfig } = require("cypress");
const eyesPlugin = require('@applitools/eyes-cypress')
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
const path = require('path')

module.exports = eyesPlugin(defineConfig({
  env: {
    APPLITOOLS_API_KEY: "kXsyIjvqdmskOlueg99C5WrT0G1M109i6zvo7DFYtK6bV4110"
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'demo-test-report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      addMatchImageSnapshotPlugin(on, config);
      
      // implement node event listeners here
    },
  },
  
  
}));