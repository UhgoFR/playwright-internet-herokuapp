import {expect } from '@playwright/test';
import { test } from '../../fixtures/my-fixtures';

import { 
  HomePage,             
  FileDownloaderPage,
  FileUploaderPage,
  JQueryUIPage,
} from '../../pages/internet-herokuapp';

let homePage: HomePage;
let fileDownloaderPage: FileDownloaderPage;
let fileUploaderPage: FileUploaderPage;
let jqueryUIPage: JQueryUIPage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    fileDownloaderPage = new FileDownloaderPage(page);
    fileUploaderPage = new FileUploaderPage(page);
    jqueryUIPage = new JQueryUIPage(page);
    await homePage.goto(process.env.BASE_URL ?? '');
    await homePage.waitForPageLoad();
  });

test.afterEach(async ({ page }) => {
    await page.close();
  });

test('should download files and verify their existence @fixtures-test, @heroku-app', async ({tmpDir }) => {
    await homePage.fileDownloadLink.click();
    await fileDownloaderPage.waitForPageLoad();

    // Descargar el archivo de ChromeDriver
    const chromedriverPath = await fileDownloaderPage.downloadChromedriver(tmpDir + '/chromedriver.exe');
    await expect(chromedriverPath).toBeTruthy();

    // Descargar el archivo de prueba
    const testFilePath = await fileDownloaderPage.downloadTestFile(tmpDir + '/test.txt');
    await expect(testFilePath).toBeTruthy();

    // Descargar el archivo de cotización
    const cotizacionPath = await fileDownloaderPage.downloadCotizacion(tmpDir + '/Cotizacion.pdf');
    await expect(cotizacionPath).toBeTruthy();

    // Descargar el archivo de datos aleatorios
    const randomDataPath = await fileDownloaderPage.downloadRandomData(tmpDir + '/random_data.txt');
    await expect(randomDataPath).toBeTruthy();

    // Descargar el archivo some-file
    const someFilePath = await fileDownloaderPage.downloadSomeFile(tmpDir + '/some-file.txt');
    await expect(someFilePath).toBeTruthy();
});

test('should upload a file and verify the uploaded file name @fixtures-test, @heroku-app', async ({ page }) => {
    await homePage.fileUploadLink.click();
    await fileUploaderPage.waitForPageLoad();

    const filePath = './data/uploadfile.txt'; 
    await fileUploaderPage.uploadFile(filePath);

    const uploadedFileName = await fileUploaderPage.getUploadedFileName();
    expect(uploadedFileName).toBe('uploadfile.txt');      
});

test('should download files from JQueryUI menu and verify their existence @fixtures-test, @heroku-app', async ({ tmpDir }) => {
    await homePage.jqueryUiMenusLink.click();
    await jqueryUIPage.waitForPageLoad();

    // Descargar el archivo PDF
    const pdfPath = await jqueryUIPage.downloadFile('PDF', tmpDir + '/jqueryui_menu.pdf');
    await expect(pdfPath).toBeTruthy();

    // Descargar el archivo CSV
    const csvPath = await jqueryUIPage.downloadFile('CSV', tmpDir + '/jqueryui_menu.csv');
    await expect(csvPath).toBeTruthy();

    // Descargar el archivo Excel
    const excelPath = await jqueryUIPage.downloadFile('Excel', tmpDir + '/jqueryui_menu.xlsx');
    await expect(excelPath).toBeTruthy();
});