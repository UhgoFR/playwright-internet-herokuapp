import {Locator,Page} from '@playwright/test';
import {BasePage} from '../BasePage';

export class FileUploaderPage extends BasePage {
    readonly page: Page;

    readonly header: Locator;
    readonly buttonChooseFile: Locator;
    readonly buttonUpload: Locator;
    readonly uploadedFileName: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.getByRole('heading', { name: 'File Uploader' });
        this.buttonChooseFile = page.locator('#file-upload');
        this.buttonUpload = page.getByRole('button', { name: 'Upload' });
        this.uploadedFileName = page.locator('#uploaded-files');
    }

    async uploadFile(filePath: string) {    
        await this.buttonChooseFile.setInputFiles(filePath);
        await this.buttonUpload.click();
    }

    async getUploadedFileName(): Promise<string> {
        await this.uploadedFileName.waitFor({ state: 'visible' });
        return await this.uploadedFileName.innerText() ?? '';
    }   
    
}