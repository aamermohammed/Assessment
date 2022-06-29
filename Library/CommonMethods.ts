import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from "protractor";
import { error, isNullOrUndefined, isUndefined } from "util";
import { Constants } from "./Constants";
import { async } from "q";
import { PropertyFileReader } from "../Library/PropertyFileReader";

const propRead: PropertyFileReader = new PropertyFileReader();
const prop: any = PropertyFileReader.getInstance();

export class CommonMethods extends Constants {
  public logger: any = this.log4js.getLog(this.constructor.name);


  public getTitle = async () => {
    await browser.sleep(2000);
    return browser.driver.getTitle().then((text: string) => {
      return text;
    });
  };


  public waitUntilReady = async (element: ElementFinder, elementWaitType: string) => {
    const EC: any = protractor.ExpectedConditions;

    const _retryOnErr: any = () => {
      this.logger.debug("wait... retrying for element " + element.locator());
      return false;
    };

    switch (elementWaitType) {
      case "present":
        return browser.driver.wait(() => {
          return element.isPresent().then((isPresent: boolean) => {
            if (isPresent) {
              this.logger.info("waitUntilReady:-", "Element '", element.locator(), "' is Present.");
              return true;
            } else {
              return _retryOnErr();
            }
          }, _retryOnErr(error));
        }, this.elementToWait).then((waitRetValue: any) => {
          return waitRetValue; // usually just `true`
        }, (err: Error) => {
          const desc: string = "Element '" + element.locator() + "' Not Present. ";
          this.logger.error(err);
          this.logger.error(desc + err.message);


        });

      case "display":
        return browser.driver.wait(() => {
          return element.isDisplayed().then((isDisplayed: boolean) => {
            if (isDisplayed) {
              this.logger.info("waitUntilReady:-", "Element '", element.locator(), "' is Displayed.");
              return true;
            }
            if (!isDisplayed) {
              this.logger.warn("wait... Element '", element.locator(), "' found but hidden.");
              // return false;
            }
          }, _retryOnErr(error));
        }, this.elementToWait).then((waitRetValue: any) => {
          return waitRetValue; // usually just `true`
        }, async (err: Error) => {
          const desc: string = "Element --'" + element.locator() + "' Not Displayed. ";
          this.logger.error(err);
          this.logger.error(desc + err.message);
          this.expect.fail(0, 1, err.message);
        });
      default:
        this.logger.error("Currently '" + elementWaitType + "' Not implemented.");
        break;
    }
  };

  public click = async (locator: ElementFinder, elementWaitType: string) => {
    if (await this.waitUntilReady(locator, elementWaitType)) {
      return locator.click().then(() => {
        this.logger.info("Locator " + locator + " clicked successfully...");
        return true;
      }, (err: Error) => {
        this.logger.error("error. Unable to click..." + err.message);
        return false;
      });
    }


  };

  public type = async (locator: ElementFinder, value: any, elementWaitType: string) => {
    if (await this.waitUntilReady(locator, elementWaitType)) {
      return locator.sendKeys(value.trim().toString()).then(() => {
        this.logger.info(value + " entered successfully...");
        return true;
      }, (err: Error) => {
        this.logger.error("error. Unable to enter value..." + err.message);
        return false;
      });
    }
  };

  public clear = async (locator: ElementFinder, elementWaitType: string) => {
    if (await this.waitUntilReady(locator, elementWaitType)) {
      return locator.clear().then(() => {
        this.logger.info("Cleared successfully...");
        return true;
      }, (err: Error) => {
        this.logger.error("error. Unable to clear value..." + err.message);
        return false;
      });
    }
  };

  public openUrl = async () => {
    const baseUrl: string = prop.getPropValue("BaseURL");
    browser.driver.manage().window().maximize();
    await browser.waitForAngularEnabled(true);
    browser.ignoreSynchronization = true;
    browser.sleep(500); 
    browser.resetUrl = 'file:///';
    await browser.get("file:///"+baseUrl);      
  };

   public getText = async (locator: ElementFinder, elementWaitType: string) => {
    await this.waitUntilReady(locator, elementWaitType);
    return locator.getText().then((text: string) => {
      this.logger.info("text is :" + text);
      return text.toString().trim();
    }, (err: Error) => {
      this.logger.error("error. Unable to getText..." + err.message);
      this.expect.fail(0, 1, err.message);
      return undefined;
    });
  };

}