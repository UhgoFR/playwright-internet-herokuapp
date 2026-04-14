import {Locator,Page} from '@playwright/test';
import {BasePage} from '../BasePage';

export class FileDownloaderPage extends BasePage {
    readonly page: Page;

    readonly header: Locator;
    readonly chromedriverLink: Locator;
    readonly testFileLink: Locator;
    readonly cotizacionLink: Locator;
    readonly randomDataLink: Locator;
    readonly someFileLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', { name: 'File Downloader' });
        this.chromedriverLink = page.getByRole('link', { name: 'chromedriver.exe' });
        this.testFileLink = page.getByRole('link', { name: 'test.txt', exact: true });
        this.cotizacionLink = page.getByRole('link', { name: 'Cotizacion.pdf', exact: true });
        this.randomDataLink = page.getByRole('link', { name: 'random_data.txt', exact: true });
        this.someFileLink = page.getByRole('link', { name: 'some-file.txt', exact: true });
    }

    async downloadChromedriver(savePath?: string) {
        const [ download ] = await Promise.all([
            this.page.waitForEvent('download'),
            this.chromedriverLink.click()
        ]);
        if (savePath) {
            await download.saveAs(savePath);
            return savePath;
        }
        return download;
    }

    async downloadTestFile(savePath?: string) {
        const [ download ] = await Promise.all([
            this.page.waitForEvent('download'),
            this.testFileLink.click()
        ]);
        if (savePath) {
            await download.saveAs(savePath);
            return savePath;
        }
        return download;
    }

    async downloadCotizacion(savePath?: string ) {
        const [ download ] = await Promise.all([
            this.page.waitForEvent('download'),
            this.cotizacionLink.click()
        ]);
        if (savePath) {
            await download.saveAs(savePath);
            return savePath;
        }
        return download;
    }

    async downloadRandomData(savePath?: string) {
        const [ download ] = await Promise.all([
            this.page.waitForEvent('download'),
            this.randomDataLink.click()
        ]);
        if (savePath) {
            await download.saveAs(savePath);
            return savePath;
        }
        return download;
    }

    async downloadSomeFile(savePath?: string) {
        const [ download ] = await Promise.all([
            this.page.waitForEvent('download'),
            this.someFileLink.click()
        ]);
        if (savePath) {
            await download.saveAs(savePath);
            return savePath;
        }
        return download;
    }
}   