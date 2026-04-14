import {Locator, Page} from "@playwright/test";
import {BasePage} from "../BasePage";

export class JQueryUIPage extends BasePage {
    readonly page: Page;
    readonly header: Locator
    readonly enabledMenuOption: Locator;
    readonly downloadMenuOption: Locator;
    readonly backToJQueryUILink: Locator;
    readonly pdfOption: Locator;
    readonly csvOption: Locator;
    readonly excelOption: Locator;
    
    constructor(page: Page) {       
        super(page);   
        this.page = page;

        this.header = page.getByRole('heading', { name: 'JQueryUI - Menu' });
        this.enabledMenuOption = page.getByRole('menuitem', { name: 'Enabled', exact: true });
        this.downloadMenuOption = page.getByRole('menuitem', { name: 'Downloads', exact: true });
        this.backToJQueryUILink = page.getByRole('link', { name: 'Back to JQuery UI' });
        this.pdfOption = page.getByRole('menuitem', { name: 'PDF', exact: true });
        this.csvOption = page.getByRole('menuitem', { name: 'CSV', exact: true });
        this.excelOption = page.getByRole('menuitem', { name: 'Excel', exact: true });
    }

        async downloadFile(format: 'PDF' | 'CSV' | 'Excel', savePath?: string) {
            await this.enabledMenuOption.hover();
            await this.downloadMenuOption.hover();
            const optionMap: { [key: string]: Locator } = {
                pdf: this.pdfOption,
                csv: this.csvOption,
                excel: this.excelOption,
            };

            const [ download ] = await Promise.all([
            this.page.waitForEvent('download'),
            optionMap[format.toLowerCase()].click()
            ]);
            if (savePath) {
                await download.saveAs(savePath);
                return savePath;
            }
            return download;
                //await optionMap[format.toLowerCase()].click();
            }
    }