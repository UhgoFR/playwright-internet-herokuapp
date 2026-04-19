import {test, expect} from '@playwright/test';
import { HomePage, FloatingMenuPage, DataTablePage } from '../../pages/internet-herokuapp';

test.describe
('Network Reroute Tests @network-reroute, @heroku-app', () => {

  let homePage: HomePage;
  let floatingMenuPage: FloatingMenuPage;
  let dataTablePage: DataTablePage;
  let baseUrl: string = process.env.BASE_URL ?? '';

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    floatingMenuPage = new FloatingMenuPage(page);
    dataTablePage = new DataTablePage(page);
    await homePage.goto(baseUrl);
    await homePage.waitForPageLoad();
  });

  test.afterAll(async ({ page }) => {
    await page.close();
  });

  test('should navigate to the correct page after network reroute @network-reroute, @heroku-app', async ({ page }) => {
    await homePage.floatingMenuLink.click();
    await expect(floatingMenuPage.header).toBeVisible();
  });

    test('should display error message when network is rerouted to an invalid URL @network-reroute, @heroku-app', async ({ page }) => { 
    
    await page.route('**/floating_menu', route => route.fulfill({
      status: 404,
      contentType: 'text/html',
      body: '<h1>404 Not Found</h1>',
    }));
    await homePage.floatingMenuLink.click();
    await expect(page.getByText('404 Not Found')).toBeVisible();
  });

  test('Should navigate to Data Table Page and intercep the network request to modify the response @network-reroute, @heroku-app', async ({ page }) => {
        await page.route('**/tables', async route => {
        const response = await route.fetch();
        let body = await response.text();
        
        // Reemplazamos un valor específico, por ejemplo "jsmith@gmail.com" por uno falso
        body = body.replace('jsmith@gmail.com', 'mock-email@test.com');
        body = body.replace('$50.00', '$999.99');

        await route.fulfill({
            response,
            body
        });
        });
        await homePage.sortableDataTablesLink.click();
        await expect(dataTablePage.header).toBeVisible();
        // Validamos que el valor modificado se muestra en la tabla
        await expect(dataTablePage.table.getByText('mock-email@test.com')).toBeVisible();
        await expect(dataTablePage.table.getByText('$999.99')).toBeVisible();

    });
    

});
