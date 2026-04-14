import {Locator, Page} from '@playwright/test'
import {BasePage} from  '../BasePage'

export class HoversPage extends BasePage{

    readonly page:Page;
    readonly header:Locator;
    readonly figureOne:Locator;
    readonly figureTwo:Locator;
    readonly figureThree:Locator;
    readonly captionOne:Locator;
    readonly captionTwo:Locator;
    readonly captionThree:Locator;      
    readonly viewProfileOne:Locator;
    readonly viewProfileTwo:Locator;
    readonly viewProfileThree:Locator;

    constructor (page:Page) {
        super (page)
        this.page = page;

        this.header = page.getByRole('heading', {name:'Hovers'})
        this.figureOne = page.locator('.figure').nth(0);
        this.figureTwo = page.locator('.figure').nth(1);
        this.figureThree = page.locator('.figure').nth(2);
        this.captionOne = this.figureOne.locator('.figcaption');
        this.captionTwo = this.figureTwo.locator('.figcaption');
        this.captionThree = this.figureThree.locator('.figcaption');
        this.viewProfileOne = this.captionOne.getByRole('link', { name: 'View profile' });
        this.viewProfileTwo = this.captionTwo.getByRole('link', { name: 'View profile' });
        this.viewProfileThree = this.captionThree.getByRole('link', { name: 'View profile' });
    }

    async clickViewProfile(figureNumber: number): Promise<void> {
        switch (figureNumber) {
            case 1:
                await this.figureOne.hover();
                await this.viewProfileOne.click();
                break;
            case 2:
                await this.figureTwo.hover();
                await this.viewProfileTwo.click();
                break;
            case 3:
                await this.figureThree.hover();
                await this.viewProfileThree.click();
                break;
        }
    }

    async getUserName(figureNumber: number): Promise<string> {
        switch (figureNumber) {
            case 1:
                await this.figureOne.hover();
                const text1 = await this.captionOne.innerText() ?? '';
                const match1 = text1.match(/name:\s*(.+?)(?:\s*View|\s*$)/);
                return match1 ? match1[1].trim() : '';
            case 2:
                await this.figureTwo.hover();
                const text2 = await this.captionTwo.innerText() ?? '';
                const match2 = text2.match(/name:\s*(.+?)(?:\s*View|\s*$)/);
                return match2 ? match2[1].trim() : '';
            case 3:
                await this.figureThree.hover();
                const text3 = await this.captionThree.innerText() ?? '';
                const match3 = text3.match(/name:\s*(.+?)(?:\s*View|\s*$)/);
                return match3 ? match3[1].trim() : '';
            default:
                return '';
        }
    }
}