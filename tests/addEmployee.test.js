const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const EmployeePage = require('../pages/employeePage');
const config = require('../data/config');

test('Add two Employees and Verify', async ({ page }) => {
    const loginPage = new LoginPage(page, config);
    const employeePage = new EmployeePage(page);

    // Navigate to homepage and login
    await loginPage.navigateToHomepageAndClickLogin();
    await loginPage.login();

    // Navigate to employees tab
    await employeePage.navigateToEmployeesTab();

    // Add first employee
    await employeePage.clickAddEmployeeButton();
    await employeePage.enterEmployeeDetails(config.employee1.firstName, config.employee1.lastName, config.employee1.email, config.employee1.phoneNumber, config.employee1.startDate, config.employee1.jobTitle);
    await employeePage.clickSaveEmployeeButton();

    // Add second employee
    await employeePage.clickAddAnotherEmployeeButton();
    await employeePage.enterEmployeeDetails(config.employee2.firstName, config.employee2.lastName, config.employee2.email, config.employee2.phoneNumber, config.employee2.startDate, config.employee2.jobTitle);
    await employeePage.clickSaveEmployeeButton();

    // Close success popup
    await employeePage.clickCloseButton();

    //Verify that both employee names are in the list of employee names;
    var nameList = await employeePage.getEmployeeNames();
    expect(nameList).toContain(`${config.employee1.firstName} ${config.employee1.lastName}`);
    expect(nameList).toContain(`${config.employee2.firstName} ${config.employee2.lastName}`);
});