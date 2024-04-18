class LoginPage {
    constructor(page, config) {
        this.page = page;
        this.config = config;
    }

    static emailLocator = 'id=email';
    static passwordLocator = 'id=password';
    static loginButtonLocator = `xpath=//*[text()='Log in']`;
    static secondLoginButtonLocator = `xpath=//*[text()='Login']`;

    async navigateToHomepageAndClickLogin() {
        await this.page.goto(this.config.url);
        await this.page.click(LoginPage.loginButtonLocator);
    }

    async login() {
        await this.page.fill(LoginPage.emailLocator, this.config.loginCredentials.email);
        await this.page.fill(LoginPage.passwordLocator, this.config.loginCredentials.password);
        await this.page.click(LoginPage.secondLoginButtonLocator);
    }
}
module.exports = LoginPage;
