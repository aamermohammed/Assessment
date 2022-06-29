import { browser, ElementFinder, element, by, ElementArrayFinder } from 'protractor';
import { CommonMethods } from "../Library/CommonMethods";
import { async } from "q";

export class LoginPageObject extends CommonMethods {

    emailAddressTextBox: ElementFinder = element(by.css("#inputEmail"));
    passwordTextBox: ElementFinder = element(by.css("#inputPassword"));
    loginButton: ElementFinder = element(by.css("button.btn.btn-lg.btn-primary.btn-block"));
    listGroupElements: ElementArrayFinder = element.all(by.xpath("//div[@id='test-2-div']/ul/li"));
    secondListItemLabel: ElementFinder = element(by.xpath("(//div[@id='test-2-div']/ul/li[@class='list-group-item justify-content-between'])[2]"));
    secondListItemBadgeLabel: ElementFinder = element(by.xpath("( //div[@id='test-2-div']/ul/li//span)[2]"));
    dropdownValue: ElementFinder = element(by.css("#dropdownMenuButton"));
    selectDropdownValue: ElementFinder = element(by.linkText("Option 3"));
    firstButton: ElementFinder = element(by.xpath("(//*[@class='btn btn-lg btn-primary'])[1]"));
    secondButton: ElementFinder = element(by.xpath("(//*[@class='btn btn-lg btn-secondary'])[1]"));
    testFiveButton: ElementFinder = element(by.css("button#test5-button"));  
    successMessage: ElementFinder = element(by.css("div#test5-alert"));  
    tableElement: ElementFinder;

    public successfulLogin = async (usrName: string, passWrd: string) => {
        await this.type(this.emailAddressTextBox, usrName, this.ElementWaitType.ISDISPLAYED);
        await this.type(this.passwordTextBox, passWrd, this.ElementWaitType.ISDISPLAYED);
        await this.click(this.loginButton, this.ElementWaitType.ISDISPLAYED);
    }

    public isEmailAddressTextDisplayed = async () => {
        return await this.waitUntilReady(this.emailAddressTextBox, this.ElementWaitType.ISDISPLAYED)
    }

    public isPasswordTextDisplayed = async () => {
        return await this.waitUntilReady(this.passwordTextBox, this.ElementWaitType.ISDISPLAYED)
    }

    public isLoginButtonDisplayed = async () => {
        return await this.waitUntilReady(this.loginButton, this.ElementWaitType.ISDISPLAYED)
    }

    public NumberOfListElements = async () => {
        return (await this.listGroupElements).length;
    }

    public getSecondListItemText = async () => {
        return await this.getText(this.secondListItemLabel, this.ElementWaitType.ISDISPLAYED);
    }

    public getSecondListItemBadgeText = async () => {
        return await this.getText(this.secondListItemBadgeLabel, this.ElementWaitType.ISDISPLAYED);
    }


    public getSelectedValueText = async () => {
        return await this.getText(this.dropdownValue, this.ElementWaitType.ISDISPLAYED);
    }

    public selectValueFromDropdown = async (drpdownvalue: string) => {
        await this.click(this.dropdownValue, this.ElementWaitType.ISDISPLAYED);
        await this.click(this.selectDropdownValue, this.ElementWaitType.ISDISPLAYED);
        return true;
    }

    
    public verifyFirstButtonEnabled = async () => {
        return await this.firstButton.isEnabled();     
    }

    public verifySecondButtonEnabled = async () => {
        return await this.secondButton.isEnabled();       
    }

    public clickTestFiveButton = async () => {
        await this.waitUntilReady(this.testFiveButton, this.ElementWaitType.ISDISPLAYED)
        await this.click(this.testFiveButton, this.ElementWaitType.ISDISPLAYED);           
    }

    public verifyTestFiveButtonEnabled = async () => {
        return await this.testFiveButton.isEnabled();       
    }

    public getSuccessMessageText = async () => {
        return await this.getText(this.successMessage, this.ElementWaitType.ISDISPLAYED);
    }

    public getTableElements = async (row: number, col: number) => {      
        this.tableElement= element(by.xpath("//tbody//tr["+row+"]//td["+col+"]"));  
        return await this.getText(this.tableElement, this.ElementWaitType.ISDISPLAYED);
    }

}

