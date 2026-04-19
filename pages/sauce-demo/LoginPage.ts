import{test, Locator, Page, expect} from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;  

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", { name: "Login" });

    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async navigate() {
        await this.page.goto("https://www.saucedemo.com/");
    }   

    async waitForPageToLoad() {
        await this.page.waitForLoadState('networkidle');
    }
}