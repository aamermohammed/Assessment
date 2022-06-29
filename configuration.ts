import {Config, browser} from "protractor";
import { CommonMethods } from "./Library/CommonMethods";
import { longStackSupport } from "q";

const utils: CommonMethods = new CommonMethods();

export let config: Config = {
    // The address of a running selenium server.
   seleniumAddress: 'http://localhost:4444/wd/hub',
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
      browserName: 'chrome',
      "chromeOptions":{
        "args":[
          "--disable-infobars"
        ]
      }
    },
    
    allScriptsTimeout: utils.testScriptWait,
    getPageTimeout:  90000,
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    
    onPrepare: async () => {
      await utils.openUrl();
         },   

      cucumberOpts: {
      require: ["./Library/*.js","./StepDefinitions/*.js"],
      tags:"@Regression",
      format: 'json: Reports/results.json',      
        strict: true
  },

  specs: [
    "../features/*.feature",
],

plugins: [{
  package: 'protractor-multiple-cucumber-html-reporter-plugin',
  options:{
    automaticallyGenerateReport: true,
    removeExistingJsonReportFile: true
  }
}]
    
    };

  