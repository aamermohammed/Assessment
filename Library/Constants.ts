
import {Logger} from "./Logger";
import {PropertyFileReader} from "./PropertyFileReader";
const chai: any = require("chai").use(require("chai-as-promised"));

export class Constants {
public log4js: any = consts.log4js;
public prop: any = consts.prop;
public expect: any = consts.expect;
public testScriptWait: number = consts.testScriptWait;
public ElementWaitType: any = consts.ElementWaitType;
public elementToWait: any = consts.elementToWait;
}

namespace consts {
  export const logLevel: string = "DEBUG";
  export const log4js: any = Logger.getInstance(logLevel);
  export const prop: any = PropertyFileReader.getInstance();
  export const expect: any = chai.expect;
  prop.setPropertyFile("Resources/Config.properties");
  export const elementToWait: number = 30000; // 30 secs;
  export const testScriptWait: number = 120000; // 15 mins or 900 secs
  export enum ElementWaitType {
    ISPRESENT = "present",
    ISDISPLAYED = "display"
  };
}