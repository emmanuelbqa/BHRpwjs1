const { expect } = require('@playwright/test');

class EmployeePage {
    constructor(page) {
        this.page = page;
    }

    static employeesTab = 'xpath=//*[@id="app"]/div/div/div[1]/div[1]/div/div[2]/div/div[1]/div/div/div/a[3]/div/div/span';
    static addEmployeeButton = 'xpath=//*[@id="app"]/div/div/div[3]/div/div/div[2]/button';
    static firstNameInput = 'id=firstName';
    static lastNameInput = 'id=lastName';
    static emailInput = 'id=email';
    static emailCheckbox = 'id=registrationEmail';
    static phoneNumberInput = 'id=phoneNumber';
    static startDateInput = 'id=startDate';
    static jobTitleInput = 'id=jobTitle';
    static saveEmployeeButton = 'text="Save new employee"';
    static addAnotherEmployeeButton = 'text="Add another employee"';
    static closeButton = '[aria-label="Close modal"]';
    static employeeClassName = '.text-base.font-bold';

    async navigateToEmployeesTab() {
        await this.page.click(EmployeePage.employeesTab);
    }

    async clickAddEmployeeButton() {
        await this.page.click(EmployeePage.addEmployeeButton);
    }

    async enterEmployeeDetails(firstName, lastName, email, phoneNumber, startDate, jobTitle) {
        await this.page.fill(EmployeePage.firstNameInput, firstName);
        await this.page.fill(EmployeePage.lastNameInput, lastName);
        await this.page.fill(EmployeePage.emailInput, email);
        await this.page.check(EmployeePage.emailCheckbox);
        await this.page.fill(EmployeePage.phoneNumberInput, phoneNumber);
        await this.page.click(EmployeePage.startDateInput);
        await this.page.click(`text="${startDate}"`);
        await this.page.fill(EmployeePage.jobTitleInput, jobTitle);
    }

    async clickSaveEmployeeButton() {
        await this.page.click(EmployeePage.saveEmployeeButton);
    }

    async clickAddAnotherEmployeeButton() {
        await this.page.click(EmployeePage.addAnotherEmployeeButton);
    }

    async clickCloseButton() {
        await this.page.click(EmployeePage.closeButton);
    }

    async getEmployeeNames() {
        let attempts = 0;
        const maxAttempts = 5;
        let nameList;
        while (attempts < maxAttempts) {
            try {
                await EmployeePage.waitForSelector('//*[@class="text-base font-bold"]', { timeout: 50000 });
                nameList = await EmployeePage.$$eval('//*[@class="text-base font-bold"]', ele => ele.map(e => e.textContent));
                break;
            } catch (error) {
                attempts++;
                console.log(`Attempt ${attempts}: Failed to find element. Retrying...`);
            }
        }
        if (attempts === maxAttempts) {
            throw new Error(`Element ${'//*[@class="text-base font-bold"]'} not found after ${maxAttempts} attempts`);
        }
        return nameList;
    }
}
module.exports = EmployeePage;
